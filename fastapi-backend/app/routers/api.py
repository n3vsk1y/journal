from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from app.models.user import User
from app.core.database import get_db
from sqlalchemy.orm import Session

from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone

import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix='/api', tags=['API'])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')


class LogInData(BaseModel):
    username: str
    password: str


class SignupData(BaseModel):
    email: EmailStr
    username: str
    password: str


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post('/login')
async def login(data: LogInData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/signup')
async def signup(data: SignupData, db: Session = Depends(get_db)):
    if db.query(User).filter((User.email == data.email) | (User.username == data.username)).first():
        raise HTTPException(status_code=400, detail='User already exists')

    hashed_password = hash_password(data.password)
    new_user = User(email=data.email, username=data.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"msg": "User successfully registered"}
