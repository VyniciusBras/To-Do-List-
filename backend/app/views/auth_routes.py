from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.models.user import UserCreate
from app.controllers import auth_controller
from app.core.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", status_code=201)
def register(user: UserCreate):
    return auth_controller.register_new_user(user)

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return auth_controller.authenticate_user(form_data)

@router.delete("/me", status_code=200)
def delete_me(current_user: dict = Depends(get_current_user)):
    return auth_controller.delete_user_account(current_user['username'])