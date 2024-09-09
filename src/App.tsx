import "./App.css"
import {v1} from "uuid";
import React, {useState} from "react";
import {Todolist} from "./components/Todolist";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])
    const taskRemover = (id: string) => {
        let newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
    }
    const taskAdder = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const taskStatusChanger = (id: string, status: boolean) => {
        let newTasks = tasks.map(task => {
            if (task.id === id) {
                task.isDone = status
            }
            return task
        })
        setTasks(newTasks)
    }



return (
    <div className={'App'}>
        <Todolist
            taskRemover={taskRemover}
            taskAdder={taskAdder}
            taskStatusChanger={taskStatusChanger}
            taskList={tasks}
        />
    </div>
)
}