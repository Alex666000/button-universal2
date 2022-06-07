import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from './App';
import Button from './components/Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filterValue: FilterValueType) => void
    addTask: (newTitle: string) => void
}

const Todolist = (props: TodolistPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    // связываем кнопку и инпут
    const onRemoveTaskHandler = (tId: string) => {
      props.removeTask(tId)
    }
    const addTaskHandler = () => {
        props.addTask(newTitle)
        //после того как отправили newTitle зануляем:
        setNewTitle('')
    }  // связываем кнопку и инпут
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)  // связываем кнопку и инпут
    }
// когда по Enter добавляем в список:
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
            setNewTitle('')
        }
    }
    const onChangeFilterHandler = (value: FilterValueType) => {
        props.changeFilter(value)
    }

    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                <input
                    type="text"
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    value={newTitle}/>
           {/* ----------  ЗАМЕНИЛИ КНОПКУ УНИВЕРСАЛЬНОЙ КНОПКОЙ:-------------*/}
                {/*<button onClick={addTaskHandler}>+</button>*/}
                <Button name={'+'} callback={addTaskHandler} />

                       </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
{/*
              --------- ЗАМЕНИЛИ КНОПКУ УНИВЕРСАЛЬНОЙ КНОПКОЙ:-----------------------
*/}                            {/*<button onClick={ () => onRemoveTaskHandler(t.id)}>x</button>*/}
                            <Button name={'x'} callback={ () => {onRemoveTaskHandler(t.id)}} />
                        </li>)
                })}
            </ul>
            <div>
{/* ЗАМЕНИЛИ КОД С КНОПКАМИ УНИВЕРСАЛЬНОЙ КНОПКОЙ ПРОКИДЫВАНИЕМ УНИВЕРСАЛЬНОГО КОЛБЕКА:*/}
                {/*<button onClick={() => onChangeFilterHandler('all')}>All</button>
                <button onClick={() => onChangeFilterHandler('active')}>Active</button>
                <button onClick={() => onChangeFilterHandler('completed')}>Completed</button>*/}

                <Button name={'all'} callback={ () => onChangeFilterHandler('all')}/>
                <Button name={'active'} callback={ () => onChangeFilterHandler('active')}/>
                <Button name={'completed'} callback={ () => onChangeFilterHandler('completed')}/>
            </div>
        </div>
    );
}

export default Todolist