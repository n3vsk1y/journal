from pydantic import BaseModel


class APIKeySchema(BaseModel):
    apikey: str
    apisecret: str


class TradeRequestSchema(BaseModel):
    symbol: str
    start_time: int
    end_time: int
