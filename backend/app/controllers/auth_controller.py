from fastapi import HTTPException, status
from app.db.memory_db import users_db, tasks_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import UserCreate


def register_new_user(user: UserCreate):

    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Usuário já existe!")
    
    hashed_password = get_password_hash(user.password)
    users_db[user.username] = {
        "username": user.username,
        "hashed_password": hashed_password
    }
    return {"msg": "Usuário registrado com sucesso"}

def authenticate_user(form_data):
    user = users_db.get(form_data.username)
    
    if not user or not verify_password(form_data.password, user['hashed_password']):
        raise HTTPException(status_code=400, detail="Usuário ou senha incorretos!")
    
    access_token = create_access_token(data={"sub": user['username']})
    return {"access_token": access_token, "token_type": "bearer"}

def delete_user_account(username: str):

    if username in users_db:
        del users_db[username]
    
    tasks_to_remove = [tid for tid, task in tasks_db.items() if task['owner'] == username]
    for tid in tasks_to_remove:
        del tasks_db[tid]
        
    return {"msg": "Conta e tarefas excluídas com sucesso!"}