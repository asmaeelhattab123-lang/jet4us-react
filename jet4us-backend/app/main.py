# app/main.py
from fastapi import FastAPI
from app.config import Base, engine

app = FastAPI(title="Jet4Us Backend")

# Créer toutes les tables
Base.metadata.create_all(bind=engine)

# Route racine
@app.get("/")
def read_root():
    return {"message": "Backend Jet4Us opérationnel !"}

    
from fastapi import FastAPI
from app.routes import flight

app = FastAPI(title="Jet4Us Backend")

app.include_router(flight.router)
