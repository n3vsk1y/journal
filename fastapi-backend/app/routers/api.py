from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, Depends, Request
from app.models.user import User
from app.models.keys import APIKey
from app.core.database import get_db
from app.core.orm import get_user
from app.schemas.auth import LogInSchema, SignUpSchema
from app.schemas.key import APIKeySchema
from sqlalchemy import or_
from sqlalchemy.orm import Session
from sqlalchemy.future import select

from app.routers.hash import hash_password, verify_password

from app.routers.jwt_tokens import create_access_token, create_refresh_token, verify_token
from fastapi.responses import JSONResponse

router = APIRouter(prefix='/api', tags=['API'])


@router.post('/login')
async def login(data: LogInSchema, db: Session = Depends(get_db)):
    query = select(User).where(User.username == data.username)
    result = await db.execute(query)
    user = result.scalars().first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=404, detail='Invalid username or password')

    data={
        'user_id': str(user.id),
        'email': user.email, 
        'username': user.username,
        'bio': user.bio,
        'avatar_url': user.avatar_url,
    }

    access_token = create_access_token(data=data)
    refresh_token = create_refresh_token(data=data)

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
        max_age=30 * 24 * 60 * 60, # кука живет 30 дней
        expires=expires,
        path="/",
    )

    return response


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

    data={
        'user_id': str(new_user.id),
        'email': new_user.email, 
        'username': new_user.username,
        'bio': new_user.bio,
        'avatar_url': new_user.avatar_url,
    }

    access_token = create_access_token(data=data)
    refresh_token = create_refresh_token(data=data)

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
        max_age=30 * 24 * 60 * 60, # кука живет 30 дней
        expires=expires,
        path="/",
    )

    return response


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


@router.get("/check_api_keys")
async def check_api_keys(db: Session = Depends(get_db), current_user = Depends(get_user)):
    query = select(APIKey).where(APIKey.user_id==current_user.id)
    result = await db.execute(query)
    api_keys = result.scalars().first()
    if not api_keys:
        return {"exist": False}
    return {"exist": True, "api_key": api_keys.api_key, "api_secret": api_keys.api_secret}


@router.post("/setapikeys")
async def save_settings(keys: APIKeySchema, db: Session = Depends(get_db), current_user = Depends(get_user)):
    try:
        is_exist = await check_api_keys(db=db, current_user=current_user)
        if is_exist['exist']:
            return {"message": "Keys already exist"}

        new_keys = APIKey(user_id=current_user.id, api_key=keys.apikey, api_secret=keys.apisecret)
        db.add(new_keys)
        await db.commit()
        await db.refresh(new_keys)

        return {"message": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save settings: {e}")