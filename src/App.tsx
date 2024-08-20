import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

function App() {
//BLL

    const [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "TypeScript", isDone: false},
        {id: 6, title: "RTK Query", isDone: false},
    ])

    // const tasks2 = [
    //     {id: 1, title: "Hello World!", isDone: true},
    // ]

//UI
//     const date = new Date().toLocaleString();

    function taskRemover(id: number) {
        console.log(`remove ${id}`)
        setTasks1(tasks1.filter(t => t.id !== id))
    }

    const taskFilter = (filter: "all" | "active" | "completed") => {

    }

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1} taskRemover={taskRemover} taskFilter={taskFilter}/>
            {/*<TodoList title={"What to learn"} tasks={tasks2} date={date}/>*/}
        </div>
    );
}

export default App;
