import "./App.css"
import {v1} from "uuid";
import React, {useState} from "react";
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
}
export type TasksArrayType = {
    [key: string] : Array<TaskType>
}

export const App = () => {
    // BLL
    const todolistID_1 = v1()
    const todolistID_2 = v1()

    // TodoLists
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn'},
        {id: todolistID_2, title: 'What to buy'},
    ])
    const todoListRemover = (todolistID: string) => {
        setTodoLists(todoLists.filter(todoList => todoList.id !== todolistID))
    }
    const todoListAdder = (title: string) => {
        const newTodoList: TodolistType = {id: v1(), title: title}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }


    // Tasks
    const [tasks, setTasks] = useState<TasksArrayType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ],
        })
    const taskRemover = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: [...tasks[todolistID].filter(task => task.id !== taskId)]})
    }
    const taskAdder = (todolistID: string, title: string) => {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})
    }
    const taskStatusChanger = (todolistID: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [todolistID]: [...tasks[todolistID].map(task => task.id === taskId ? {... task, isDone: status} : task)]})
    }



return (
    <div className={'App'}>
        {todoLists.map(todolist => {
            return (
                <Todolist
                    todoListRemover={todoListRemover}
                    todoListId={todolist.id}
                    key={todolist.id}
                    todoListTitle={todolist.title}
                    taskRemover={taskRemover}
                    taskAdder={taskAdder}
                    taskStatusChanger={taskStatusChanger}
                    taskList={tasks[todolist.id]}
                />
            )})}
        <button onClick={() => todoListAdder('Новый список задач')}>+</button>
    </div>)
}