import React from 'react';
import './App.css';
import {TodoList, TaskType} from "./components/TodoList";

function App() {
    const tasks1 : TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ];
    const tasks2 : TaskType[] = [
        {id: 1, title: 'Hello world', isDone: true},
    ]
    return (
        <div className='App'>
            <TodoList
                title="What to learn"
                tasks={tasks1}
                date={'12.08.2024'}
            />
            <TodoList
                title="Songs"
                tasks={tasks2}
            />
        </div>
    );
}

export default App;
