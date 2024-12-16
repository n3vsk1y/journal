from fastapi import APIRouter, HTTPException, Depends
from app.models.user import User
from app.core.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.schemas.auth import LogInSchema, SignUpSchema
from passlib.context import CryptContext

from app.routers.jwt_tokens import create_access_token, create_refresh_token, verify_token
from fastapi.responses import JSONResponse
from fastapi import Request

router = APIRouter(prefix='/api', tags=['API'])

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


@router.post('/login')
async def login(data: LogInSchema, db: Session = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == data.username))  
    user = result.scalars().first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail='Invalid username or password')

    access_token = create_access_token(
        data={'user_id': str(user.id), 'username': user.username}
    )
    refresh_token = create_refresh_token(
        data={'user_id': str(user.id), 'username': user.username}
    )

    response = JSONResponse(content={
        'access_token': access_token,
        'token_type': 'bearer',
    })

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="Strict",
    )

    return response


@router.post('/signup')
async def signup(data: SignUpSchema, db: Session = Depends(get_db)):
    result = await db.execute(select(User).where(User.username == data.username))  
    user = result.scalars().first()
    if user:
        raise HTTPException(status_code=400, detail='User already exists')

    hashed_password = hash_password(data.password)
    new_user = User(email=data.email, username=data.username,
                    hashed_password=hashed_password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    access_token = create_access_token(
        data={'user_id': str(new_user.id), 'username': new_user.username}
    )
    refresh_token = create_refresh_token(
        data={'user_id': str(new_user.id), 'username': new_user.username}
    )

    response = JSONResponse(content={
        'access_token': access_token,
        'token_type': 'bearer',
    })

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="Strict",
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
