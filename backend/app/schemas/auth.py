from pydantic import BaseModel, EmailStr


class LogInSchema(BaseModel):
    username: str
    password: str


class SignUpSchema(BaseModel):
    email: EmailStr
    username: str
    password: str