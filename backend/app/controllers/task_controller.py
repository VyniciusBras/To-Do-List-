from fastapi import HTTPException
from uuid import uuid4
from datetime import datetime, timezone
from app.db.memory_db import tasks_db
from app.models.task import TaskCreate

def list_tasks(current_user: dict):

    return [task for task in tasks_db.values() if task['owner'] == current_user['username']]

def create_new_task(task: TaskCreate, current_user: dict):
    task_id = str(uuid4())
    new_task = {
        "id": task_id,
        "owner": current_user['username'],
        **task.model_dump(),
        "data_criacao": datetime.now(timezone.utc)
    }
    tasks_db[task_id] = new_task
    return new_task

def update_existing_task(task_id: str, task_update: TaskCreate, current_user: dict):
    task = tasks_db.get(task_id)

    if not task or task['owner'] != current_user['username']:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    task.update(task_update.model_dump())
    return task

def delete_existing_task(task_id: str, current_user: dict):
    task = tasks_db.get(task_id)
    if not task or task['owner'] != current_user['username']:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    del tasks_db[task_id]