from pydantic import BaseModel, EmailStr, Field, validator

class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    email: EmailStr | None = None
    phone: str | None = None
    password: str = Field(..., min_length=6)
    confirm_password: str
    address: str | None = None
    agree_terms: bool

    @validator("confirm_password")
    def passwords_match(cls, v, values):
        if "password" in values and v != values["password"]:
            raise ValueError("Les mots de passe ne correspondent pas")
        return v

    @validator("agree_terms")
    def must_agree(cls, v):
        if not v:
            raise ValueError("Vous devez accepter les termes et conditions")
        return v

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str | None
    phone: str | None
    address: str | None

    class Config:
        orm_mode = True
