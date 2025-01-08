from pydantic import BaseModel


class APIKeySchema(BaseModel):
    apikey: str
    apisecret: str
