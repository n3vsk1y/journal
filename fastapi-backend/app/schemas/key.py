from pydantic import BaseModel


class APIKeySchema(BaseModel):
    api_key: str
    api_secret: str
