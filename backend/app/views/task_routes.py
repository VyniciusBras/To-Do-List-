from fastapi import APIRouter, Depends
from typing import List
from app.models.task import TaskCreate, TaskResponse
from app.core.auth import get_current_user
from app.controllers import task_controller

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/", response_model=List[TaskResponse])
def get_tasks(current_user: dict = Depends(get_current_user)):
    return task_controller.list_tasks(current_user)

@router.post("/", response_model=TaskResponse, status_code=201)
def create_task(task: TaskCreate, current_user: dict = Depends(get_current_user)):
    return task_controller.create_new_task(task, current_user)

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: str, task: TaskCreate, current_user: dict = Depends(get_current_user)):
    return task_controller.update_existing_task(task_id, task, current_user)

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: str, current_user: dict = Depends(get_current_user)):
    return task_controller.delete_existing_task(task_id, current_user)