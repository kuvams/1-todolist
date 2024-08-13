import React from "react";
import { Button } from "./Button";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    date?: string
}

export const TodoList = ({title, tasks, date}: TodoListPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>) : (
                <ul>
                    {tasks.map(tasks => {
                        return (
                            <li key={tasks.id}>
                                <input type="checkbox" checked={tasks.isDone}/>
                                <span>{tasks.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{date}</div>
        </div>
    )
}