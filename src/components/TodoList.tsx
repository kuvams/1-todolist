import {TaskType} from "../App";
import {ChangeEvent, useState} from "react";

export type TodolistPropsType = {
    taskRemover: (id: string) => void
    taskAdder: (title: string) => void
    taskStatusChanger: (id: string, status: boolean) => void
    taskList: Array<TaskType>
}
export type filterType = 'all' | 'active' | 'completed'


export const Todolist = (props: TodolistPropsType) => {
    const {taskList} = props

    const [newTaskInput, setNewTaskInput] = useState<string>('')
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


    const taskInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskInput(e.currentTarget.value)
        if (e.currentTarget.value.trim().length > 10) {
            setError('The character limit has been exceeded.')
        }
    }

    const taskAddHandler = () => {
        if (error !== null) return
        if (newTaskInput.trim().length < 1) {
            setError('The name cannot be empty.')
        } else {
            props.taskAdder(newTaskInput.trim())
        }
        setNewTaskInput('')
    }
    const taskRemoveHandler = (id: string) => {
        props.taskRemover(id)
    }
    const taskStatusChangeHandler = (id: string, status: boolean) => {
        props.taskStatusChanger(id, !status)
    }

    return (
        <div>
            <h3>What to learn:</h3>
            <div>
                <input
                    className={error === null ? '' : 'error'}
                    value={newTaskInput}
                    onChange={taskInputHandler}
                    onKeyUp={(e) => e.key === 'Enter' ? taskAddHandler() : undefined}
                />
                <button disabled={error !== null || newTaskInput.length === 0} onClick={taskAddHandler}>+</button>
                {error && <div style={{color: "red"}}>{error}</div>}
            </div>
            <ul>
                {filteredTaskList.map(task => {
                    return (
                        <li key={task.id} className={task.isDone ? 'taskCompleted' : ''}>
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