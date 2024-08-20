import {Button} from "./Button";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
    taskRemover: (id: number) => void
    taskFilter: (filter: "all" | "active" | "completed" ) => void
}
type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const TodoList = ({title, tasks, date = undefined, taskRemover}: TodoListPropsType) => {


    return (
        <div>
            <h3>{title}</h3>
            <input></input><Button title={"+"}/>
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            {t.title}
                            <Button title={"x"} id={t.id} onCLickHandler={taskRemover}/>
                        </li>
                    )
                })}
            </ul>
            <Button title={"All"}/>
            <Button title={"Active"}/>
            <Button title={"Completed"}/>
            {date && <div>{date}</div>}
        </div>
    )
}