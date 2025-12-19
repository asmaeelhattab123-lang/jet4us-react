from sqlalchemy import Column, Integer, String, Float, DateTime
from app.config import Base
from datetime import datetime

class Flight(Base):
    __tablename__ = "flights"

    id = Column(Integer, primary_key=True, index=True)
    departure_city = Column(String, nullable=False)
    arrival_city = Column(String, nullable=False)
    departure_time = Column(DateTime, nullable=False)
    arrival_time = Column(DateTime, nullable=False)
    seats_left = Column(Integer, default=0)
    seats_total = Column(Integer, default=0)
    price = Column(Float, nullable=False)
    status = Column(String, default="confirmed")  # confirmed / open
