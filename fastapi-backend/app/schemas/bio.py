from pydantic import BaseModel


class BioSchema(BaseModel):
    new_bio: str