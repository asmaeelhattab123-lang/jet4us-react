from pydantic import BaseModel
from datetime import datetime

class FlightBase(BaseModel):
    departure_city: str
    arrival_city: str
    departure_time: datetime
    arrival_time: datetime
    seats_left: int
    seats_total: int
    price: float
    status: str

class FlightResponse(FlightBase):
    id: int
    date: str
    fromTime: str
    toTime: str
    fromCity: str
    toCity: str
    duration: str
    image: str

    class Config:
       from_attributes = True
