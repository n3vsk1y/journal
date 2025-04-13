import json
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends, Request

from app.models.user import User
from app.models.keys import APIKey
from app.core.database import get_db
from app.core.orm import get_user
from app.core.bingx_request import get_trades

from app.schemas.auth import LogInSchema, SignUpSchema
from app.schemas.bingx import APIKeySchema, TradeRequestSchema
from app.schemas.bio import BioSchema

from sqlalchemy import or_
from sqlalchemy.orm import Session
from sqlalchemy.future import select

from app.routers.hash import hash_password, verify_password

from app.routers.jwt_tokens import create_access_token, create_refresh_token, verify_token
from fastapi.responses import JSONResponse

router = APIRouter(prefix='/api', tags=['API'])


def create_response_with_tokens(user_data: dict):
    access_token = create_access_token(data=user_data)
    refresh_token = create_refresh_token(data=user_data)

    response = JSONResponse(content={
        'access_token': access_token,
        'token_type': 'bearer',
    })

    expires = datetime.now(timezone.utc) + timedelta(days=30)

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="None",
        max_age=30 * 24 * 60 * 60,  # кука живет 30 дней
        expires=expires,
        path="/",
    )

    return response


@router.post('/login')
async def login(data: LogInSchema, db: Session = Depends(get_db)):
    query = select(User).where(User.username == data.username)
    result = await db.execute(query)
    user = result.scalars().first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=404, detail='Invalid username or password')

    user_data = {
        'user_id': str(user.id),
        'email': user.email,
        'username': user.username,
        'bio': user.bio,
        'avatar_url': user.avatar_url,
    }

    return create_response_with_tokens(user_data)


@router.post('/signup')
async def signup(data: SignUpSchema, db: Session = Depends(get_db)):
    query = select(User).where(or_(User.username == data.username, User.email == data.email))
    result = await db.execute(query)
    user = result.scalars().first()
    if user:
        raise HTTPException(status_code=409, detail='User already exists')

    hashed_password = hash_password(data.password)
    new_user = User(email=data.email, username=data.username,
                    hashed_password=hashed_password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    user_data = {
        'user_id': str(new_user.id),
        'email': new_user.email,
        'username': new_user.username,
        'bio': new_user.bio,
        'avatar_url': new_user.avatar_url,
    }

    return create_response_with_tokens(user_data)


@router.post('/refresh')
async def refresh_token(request: Request):
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        raise HTTPException(status_code=401, detail='Refresh token not found')

    try:
        payload = verify_token(refresh_token)
        user_data = payload['data']
        access_token = create_access_token(data=user_data)
        return {'access_token': access_token, 'token_type': 'bearer'}
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/setbio")
async def save_bio(bio_update: BioSchema, db: Session = Depends(get_db), current_user = Depends(get_user)):
    try:
        current_user.bio = bio_update.new_bio
        await db.commit()
        await db.refresh(current_user)
        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save settings: {e}")
    

@router.post("/setapikeys")
async def save_settings(keys: APIKeySchema, db: Session = Depends(get_db), current_user = Depends(get_user)):
    try:
        query = select(APIKey).where(APIKey.user_id == current_user.id)
        result = await db.execute(query)
        api_keys = result.scalars().first()
        if api_keys:
            return {"message": "Keys already exist"}

        new_keys = APIKey(user_id=current_user.id, api_key=keys.apikey, api_secret=keys.apisecret)
        db.add(new_keys)
        await db.commit()
        await db.refresh(new_keys)

        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save settings: {e}")
    

@router.post("/delapikeys")
async def delete_api_keys(db: Session = Depends(get_db), current_user=Depends(get_user)):
    try:
        query = select(APIKey).filter(APIKey.user_id == current_user.id)
        result = await db.execute(query)
        api_keys = result.scalars().first()
        if api_keys:
            await db.delete(api_keys)
            await db.commit()
            return {"message": "success"}
        return {"message": "keys not found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete API keys: {e}")


@router.post("/gettrades")
async def get_trades_from_exchange(filters: TradeRequestSchema, db:  Session = Depends(get_db), current_user = Depends(get_user)):
    try:
        query = select(APIKey).where(APIKey.user_id == current_user.id)
        result = await db.execute(query)
        api_keys = result.scalars().first()

        if not api_keys:
            raise HTTPException(status_code=404, detail="API keys not found")

        trades = get_trades(
            api_key=api_keys.api_key,
            api_secret=api_keys.api_secret,
            symbol=filters.symbol,
            start_time=filters.start_time * 1000,
            end_time=filters.end_time * 1000,
        )

        return {"message": "success", "data": trades}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch trades: {e}")


@router.post("/trades")
async def get_trades_test(api_key: str, api_secret: str, symbol: str, start_time: int, end_time: int):
    trades = get_trades(
        api_key=api_key,
        api_secret=api_secret,
        symbol=symbol,
        start_time=start_time * 1000,
        end_time=end_time * 1000,
    )

    print(f'trades: {trades}')
