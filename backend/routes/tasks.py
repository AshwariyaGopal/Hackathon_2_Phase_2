from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import select, col
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID
from datetime import datetime, timezone

from db import get_session
from models import Task, TaskCreate, TaskUpdate, TaskRead
from middleware.jwt_auth import get_current_user

router = APIRouter(prefix="/tasks")

@router.post("", response_model=TaskRead, status_code=201)
async def create_task(
    *,
    session: AsyncSession = Depends(get_session),
    task_in: TaskCreate,
    current_user: dict = Depends(get_current_user)
):
    db_task = Task.model_validate(task_in, update={"user_id": current_user["id"]})
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

@router.get("", response_model=List[TaskRead])
async def list_tasks(
    *,
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user),
    status: str = Query("all", enum=["all", "pending", "completed"]),
    sort: str = Query("created_at", enum=["created_at", "title"])
):
    statement = select(Task).where(Task.user_id == current_user["id"])
    
    if status == "pending":
        statement = statement.where(Task.is_completed == False)
    elif status == "completed":
        statement = statement.where(Task.is_completed == True)
        
    if sort == "title":
        statement = statement.order_by(Task.title)
    else:
        statement = statement.order_by(Task.created_at.desc())
        
    results = await session.execute(statement)
    tasks = results.scalars().all()
    return tasks

@router.get("/{id}", response_model=TaskRead)
async def get_task(
    *,
    session: AsyncSession = Depends(get_session),
    id: UUID,
    current_user: dict = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == id, Task.user_id == current_user["id"])
    result = await session.execute(statement)
    task = result.scalar_one_or_none()
    
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{id}", response_model=TaskRead)
async def update_task(
    *,
    session: AsyncSession = Depends(get_session),
    id: UUID,
    task_in: TaskUpdate,
    current_user: dict = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == id, Task.user_id == current_user["id"])
    result = await session.execute(statement)
    db_task = result.scalar_one_or_none()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    task_data = task_in.model_dump(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    db_task.updated_at = datetime.now(timezone.utc)
    
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

@router.patch("/{id}/complete", response_model=TaskRead)
async def toggle_task_complete(
    *,
    session: AsyncSession = Depends(get_session),
    id: UUID,
    current_user: dict = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == id, Task.user_id == current_user["id"])
    result = await session.execute(statement)
    db_task = result.scalar_one_or_none()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    db_task.is_completed = not db_task.is_completed
    db_task.updated_at = datetime.now(timezone.utc)
    
    session.add(db_task)
    await session.commit()
    await session.refresh(db_task)
    return db_task

@router.delete("/{id}", status_code=204)
async def delete_task(
    *,
    session: AsyncSession = Depends(get_session),
    id: UUID,
    current_user: dict = Depends(get_current_user)
):
    statement = select(Task).where(Task.id == id, Task.user_id == current_user["id"])
    result = await session.execute(statement)
    db_task = result.scalar_one_or_none()
    
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
        
    await session.delete(db_task)
    await session.commit()
    return None