import {useState, KeyboardEvent} from "react";
import {Button} from "./Button";
import {TaskType} from "../App";

export type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    taskAdder: (title: string) => void
    taskRemover: (id: string) => void
    taskChangeStatus: (id: string) => void
}
type FilterType = "all" | "active" | "completed"


export const TodoList = (props: TodoListPropsType) => {
    const {title, tasks, taskAdder, taskRemover, taskChangeStatus} = props
    const [newTaskTitleInput, setNewTaskTitleInput] = useState<string>("")

    const addButtonIsDisabled = newTaskTitleInput.length === 0

    const onCLickNewTaskInputHandler = () => {
        taskAdder(newTaskTitleInput)
        setNewTaskTitleInput("")
    }
    const onKeyUpNewTaskInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !addButtonIsDisabled) {
            onCLickNewTaskInputHandler()
        }
    }

    const [filter, setFilter] = useState<FilterType>("all")
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }


    return (
        <div>
            <h3>{title}</h3>
            <input
                value={newTaskTitleInput}
                onChange={(e) => setNewTaskTitleInput(e.target.value)}
                onKeyUp={event => onKeyUpNewTaskInputHandler(event)}
            />
            <Button
                isDisabled={addButtonIsDisabled}
                title={"+"}
                onClickHandler={() => onCLickNewTaskInputHandler()}
            />
            <ul>{filteredTasks.map((task: TaskType) => {
                return (
                    <li key={task.id}>
                        <input type={"checkbox"} checked={task.isDone} onClick={() => taskChangeStatus(task.id)}/>
                        {task.title}
                        <Button title={"x"} onClickHandler={() => taskRemover(task.id)}/>
                    </li>)
            })}
            </ul>
            <Button title={"All"} onClickHandler={() => {
                setFilter("all")
            }}/>
            <Button title={"Active"} onClickHandler={() => {
                setFilter("active")
            }}/>
            <Button title={"Completed"} onClickHandler={() => {
                setFilter("completed")
            }}/>
        </div>
    )
}