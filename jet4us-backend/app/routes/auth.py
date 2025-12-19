from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.config import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/auth", tags=["auth"])

def hash_password(password: str):
    return pwd_context.hash(password)

@router.post("/signup", response_model=UserResponse)
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    if user.email and db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    if user.phone and db.query(User).filter(User.phone == user.phone).first():
        raise HTTPException(status_code=400, detail="Téléphone déjà utilisé")

    db_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        hashed_password=hash_password(user.password),
        address=user.address
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
