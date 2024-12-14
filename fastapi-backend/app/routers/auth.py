from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from app.models.user import User
from app.core.database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix='/api', tags=['API'])

class LogInData(BaseModel):
    username: str
    password: str


class SignupData(BaseModel):
    email: EmailStr
    username: str
    password: str


@router.post('/login')
async def login(data: LogInData, db: Session = Depends(get_db)):
    # user = db.query(User).filter(User.username == data.username).first()
    # if not user or not разхэш парола:
    #     raise HTTPException(status_code=400, detail="invalid data")

    return {'username': data.username, 'password': data.password, 'msg': 'successfully log in'}


@router.post('/signup')
async def signup(data: SignupData, db: Session = Depends(get_db)):
    # if db.query(User).filter((User.email == data.email) | (User.username == data.username)).first():
    #     raise HTTPException(status_code=400, detail='user already exists')

    # hashed_password = хэш парола
    # new_user = User(email=data.email, username=data.username, hashed_password=hashed_password)
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)

    return {'email': data.email, 'username': data.username, 'password': data.password, 'msg': 'successfully registred'}
