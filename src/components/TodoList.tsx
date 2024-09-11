import {TaskType} from "../App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export type TodolistPropsType = {
    todoListTitle: string
    todoListRemover: (todolistID: string) => void
    todoListId: string

    taskList: Array<TaskType>
    taskRemover: (todolistID: string, taskId: string) => void
    taskAdder: (todolistID: string, title: string) => void
    taskStatusChanger: (todolistID: string, taskId: string, status: boolean) => void
}
export type filterType = 'all' | 'active' | 'completed'


export const Todolist = (props: TodolistPropsType) => {
    const {taskList, todoListTitle, todoListId} = props
    const [error, setError] = useState<null | string>(null)

    const [filter, setFilter] = useState<filterType>('all')
    let filteredTaskList = taskList
    if (filter === 'active') {
        filteredTaskList = taskList.filter(task => !task.isDone)
    } else if (filter === 'completed') {
        filteredTaskList = taskList.filter(task => task.isDone)
    }
    const filterChangeHandler = (filter: filterType) => {
        setFilter(filter)
    }

    const [newTaskInput, setNewTaskInput] = useState<string>('')
    const taskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskInput(e.currentTarget.value)
        if (e.currentTarget.value.trim().length > 10) {
            setError('The character limit has been exceeded.')
        }
    }
    const newTaskInputEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            taskAddHandler()
        }
    }
    const taskAddHandler = () => {
        if (error !== null) return
        if (newTaskInput.trim().length < 1) {
            setError('The name cannot be empty.')
        } else {
            props.taskAdder(todoListId, newTaskInput.trim())
        }
        setNewTaskInput('')
    }
    const taskRemoveHandler = (taskId: string) => {
        props.taskRemover(todoListId, taskId)
    }
    const taskStatusChangeHandler = (taskId: string, status: boolean) => {
        props.taskStatusChanger(todoListId, taskId, !status)
    }

    const todoListRemoveHandler = () => {
        props.todoListRemover(todoListId)
    }

    return (
        <div className='todoList'>
            <h3>{todoListTitle}
                <button onClick={todoListRemoveHandler}>x</button>
            </h3>
            <div>
                <input
                    className={error === null ? 'newTaskTitleInput' : 'errorNewTaskTitleInput'}
                    value={newTaskInput}
                    onChange={taskInputHandler}
                    onKeyUp={newTaskInputEnterHandler}
                />
                <button disabled={error !== null || newTaskInput.length === 0} onClick={taskAddHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {filteredTaskList.length === 0 && <span>Тасок нет</span>}
                {filteredTaskList.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? 'taskCompleted' : 'task'}>
                            <input
                                type={"checkbox"}
                                checked={task.isDone}
                                onChange={() => taskStatusChangeHandler(task.id, task.isDone)}
                            />
                            <span>{task.title}</span>
                            <button onClick={() => taskRemoveHandler(task.id)}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={filter === 'all' ? 'filterBtnActive' : ''}
                    onClick={() => filterChangeHandler('all')}
                >
                    All
                </button>
                <button
                    className={filter === 'active' ? 'filterBtnActive' : ''}
                    onClick={() => filterChangeHandler('active')}
                >
                    Active
                </button>
                <button
                    className={filter === 'completed' ? 'filterBtnActive' : ''}
                    onClick={() => filterChangeHandler('completed')}
                >
                    Completed
                </button>
            </div>
        </div>
    )
}