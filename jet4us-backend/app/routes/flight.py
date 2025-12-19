from fastapi import APIRouter, Query, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.models.flight import Flight
from app.schemas.flight import FlightResponse
from app.config import get_db

router = APIRouter(prefix="/flights", tags=["Fly Now"])

# Mapping automatique ville → image
CITY_IMAGE = {
    "Marrakech": "marrakech.jpg",
    "Rabat": "rabat.png",
    "Paris": "paris2.png",
    "Dubai": "dubai1.png",
    "Barcelona": "barcelone.png",
    "London": "london1.png",
    "Madrid": "madrid.png"
}

def format_flight(f: Flight):
    duration = f.arrival_time - f.departure_time
    hours = duration.seconds // 3600
    minutes = (duration.seconds % 3600) // 60
    return FlightResponse(
        id=f.id,
        date=f.departure_time.strftime("%d.%m.%Y"),
        fromTime=f.departure_time.strftime("%H:%M"),
        toTime=f.arrival_time.strftime("%H:%M"),
        fromCity=f.departure_city,
        toCity=f.arrival_city,
        duration=f"{hours}h {minutes}min",
        seatsLeft=f.seats_left,
        seatsTotal=f.seats_total,
        price=f"{f.price:.2f} USD",
        status=f.status,
        image=CITY_IMAGE.get(f.arrival_city, "default.jpg")
    )

@router.get("/", response_model=list[FlightResponse])
def get_flights(
    fromCity: str = Query(None),
    toCity: str = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Flight).filter(Flight.status == "confirmed")
    if fromCity:
        query = query.filter(Flight.departure_city == fromCity)
    if toCity:
        query = query.filter(Flight.arrival_city == toCity)
    flights = query.all()
    return [format_flight(f) for f in flights]
