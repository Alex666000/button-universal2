import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'ReactJS', isDone: true},
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: true},
    ])
    const [filter, setFilter] = useState<FilterValueType>('all')
    // добавляем задачу:
    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }
    // Удаление:
    let removeTask = (id: string) => {
        let filtredTasks = tasks.filter(t => t.id !== id)
        setTasks(filtredTasks)
    }
// Фильтрация по нажатию кнопки:
    //выбрали все таски где isDone === true (выбрали только "макароны") и прокидываем в пропсы:
    let tasksForTodolist = tasks
    // (Если из кнопки пришло "Active" то дуршлаг заливай isDone === true)
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    // (Если из кнопки пришло "Completed" то дуршлаг заливай isDone === false)
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    let changeFilter = (filterValue: FilterValueType) => {
        //запиши в useState ту кнопку что мы нажали то что пришло из button например "Active":
        setFilter(filterValue)
    }
//UI:
    return (
        <div className="App">
            <Todolist
                title={'Todo1'}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
