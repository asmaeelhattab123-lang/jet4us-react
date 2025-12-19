from datetime import datetime, timedelta
from app.config import SessionLocal
from app.models.flight import Flight
from app.config import Base, engine

# Crée les tables si elles n'existent pas
Base.metadata.create_all(bind=engine)

db = SessionLocal()

flights_data = [
    {
        "departure_city": "Marrakech",
        "arrival_city": "London",
        "departure_time": datetime(2025, 12, 24, 19, 45),
        "arrival_time": datetime(2025, 12, 24, 23, 0),
        "seats_left": 4,
        "seats_total": 7,
        "price": 50.0,
        "status": "open"
    },
    {
        "departure_city": "Rabat",
        "arrival_city": "Paris",
        "departure_time": datetime(2025, 12, 8, 9, 0),
        "arrival_time": datetime(2025, 12, 8, 12, 15),
        "seats_left": 2,
        "seats_total": 8,
        "price": 68.0,
        "status": "confirmed"
    },
    # ajoute d'autres vols ici
]

for f in flights_data:
    flight = Flight(**f)
    db.add(flight)

db.commit()
print(f"{len(flights_data)} vols insérés avec succès !")
db.close()
