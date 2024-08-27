import "./App.css"
import React, {useState} from "react";
import {v1} from "uuid";
import {TodoList} from "./components/TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "React", isDone: false },
    ])
    const taskAdder = (title: string) => {
        const newTask : TaskType = { id: v1(), title: title, isDone: false };
        setTasks([newTask, ...tasks])
    }
    const taskRemover = (id: string) => {
        const newTasks = tasks.filter((task: TaskType) => task.id !== id)
        setTasks(newTasks)
    }
    const taskChangeStatus = (id: string) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                task.isDone = !task.isDone
            }
            return task
        })
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <TodoList
                tasks={tasks}
                title={"What to learn"}
                taskAdder={taskAdder}
                taskRemover={taskRemover}
                taskChangeStatus={taskChangeStatus}
            />
        </div>
    );
}