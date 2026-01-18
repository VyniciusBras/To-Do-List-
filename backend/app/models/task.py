from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    status: str = "pendente"

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: str
    owner: str
    data_criacao: datetime
    
    class Config:
        from_attributes = True