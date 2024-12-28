import uuid
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

class APIKey(Base):
    __tablename__ = 'apikey'

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id', ondelete='CASCADE'))
    api_key: Mapped[String | None] = mapped_column(String, nullable=True)
    api_secret: Mapped[String | None] = mapped_column(String, nullable=True)

    user: Mapped['User'] = relationship('User', uselist=False, back_populates='apikey')