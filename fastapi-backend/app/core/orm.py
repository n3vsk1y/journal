from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.routers.jwt_tokens import verify_token
from app.models.user import User


token_auth_scheme = HTTPBearer()

async def get_user(credentials: HTTPAuthorizationCredentials = Depends(token_auth_scheme), db: Session = Depends(get_db)):
    try:
        token = credentials.credentials
        payload = verify_token(token)
        user_data = payload.get("data")
        if not user_data:
            raise HTTPException(status_code=401, detail="Invalid token")

        user_id = user_data.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token data")

        query = select(User).where(User.id == user_id)
        result = await db.execute(query)
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user

    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))