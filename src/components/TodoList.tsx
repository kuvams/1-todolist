import {Button} from "./Button";
import {useState} from "react";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    taskRemover: (id: number) => void
}
type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type FilterType = "all" | "active" | "completed"

export const TodoList = ({title, tasks, date = undefined, taskRemover}: TodoListPropsType) => {
    const [filter, setFilter] = useState<FilterType>("all")
    const taskFilter = (filter: FilterType) => {
        setFilter(filter)
    }
    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>{title}</h3>
            <input></input>
            <Button title={"+"} onCLickHandler={() => {}}/>
            {filteredTasks.length === 0 && <div>пусто</div>}
            <ul>
                {filteredTasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            {t.title}
                            <Button title={"x"} onCLickHandler={() => taskRemover(t.id)}/>
                        </li>
                    )
                })}
            </ul>
            <Button title={"All"} onCLickHandler={() => {
                taskFilter('all')
            }}/>
            <Button title={"Active"} onCLickHandler={() => {
                taskFilter('active')
            }}/>
            <Button title={"Completed"} onCLickHandler={() => {
                taskFilter('completed')
            }}/>
            {date && <div>{date}</div>}
        </div>
    )
}