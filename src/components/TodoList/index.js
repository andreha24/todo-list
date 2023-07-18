import React, {useState, useCallback} from 'react';
import {CSSTransition} from "react-transition-group";
import { nanoid } from 'nanoid'

import TodoItem from "./TodoItem";

import './index.css'

const TodoList = ({changeMode}) => {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [action, setAction] = useState('');
    

    const [todoItems, setTodoItems] = useState([
        {
            id: nanoid(),
            title: 'first todo',
            isDone: false,
        },
        {
            id: nanoid(),
            title: 'second todo',
            isDone: false,
        },
        {
            id: nanoid(),
            title: 'third todo',
            isDone: false,
        }
    ]);

    const deleteAllCompleted = () => {
        setTodoItems(todoItems.filter(item => !item.isDone));
    }

    const onChange = (event) => {
        setAction(event.target.value);
    }

    const closeErrorModal = () => {
        setShowErrorModal(false);
    }

    const addTodo = (event) => {
        event.preventDefault();

        if (action === '') {
            setShowErrorModal(true);
            return;
        }

        const checkDuplicate = todoItems.map(elem => elem.title).indexOf(action);

        if (checkDuplicate === -1) {
            setTodoItems([...todoItems, { id: nanoid(), title: action, isDone: false }]);
        } else {
            alert('Todo already created with this value!');
        }

        setAction('');
    }

    const deleteTodo = useCallback((id) => {
        const updatedTodoItems = todoItems.filter(item => item.id !== id);
        setTodoItems(updatedTodoItems);
    }, [todoItems]);

    const calculateProgress = () => {
        const resolvedItems = todoItems.filter(({ isDone }) => isDone).length;
        return resolvedItems ? `${resolvedItems/todoItems.length * 100}%` : '0';
    };



    return (
        <>
            <CSSTransition
                in={showErrorModal}
                timeout={500}
                classNames="modal"
                unmountOnExit
            >
                <div className="modal">
                    <span className="close" onClick={closeErrorModal}>X</span>
                    <span>You need to write something!</span>
                </div>
            </CSSTransition>

            <div className={showErrorModal ? 'todo-wrapper blur' : 'todo-wrapper'}>
                <button onClick={changeMode} >Change Theme</button>

                <h1>TODOLIST</h1>
                <div className='todo-container'>
                    <form>
                        <div>
                            <input
                                type="text"
                                value={action}
                                onChange={onChange}
                                placeholder='what needs to be done?'
                                className='todo-adding-input'
                            />
                        </div>

                        <button type="submit" onClick={addTodo} className='add-button'>Add new todo</button>
                    </form>

                    {todoItems.length ?
                        <>
                            <div className='todo-list'>
                                {
                                    todoItems.map(({ title, id }) => (
                                            <TodoItem
                                                title={title}
                                                key={id}
                                                id={id}
                                                deleteTodoItem={deleteTodo}
                                                setTodoItems={setTodoItems}
                                            />
                                    ))
                                }
                            </div>

                            <button onClick={deleteAllCompleted} className='remove-completed-btn'>Remove all completed todos</button>

                            <h3>Your Progress:</h3>
                            <div className="progressbar-wrapper">
                                <span className='progressbar-num'>{todoItems.filter(({ isDone }) => isDone).length}/{todoItems.length}</span>
                                <div style={{
                                    width: calculateProgress(),
                                    backgroundColor: "green",
                                    height: '30px',
                                    transition: '0.7s'
                                }}>

                                </div>
                            </div>


                        </>
                        :

                        <h2>your todo is empty</h2>
                    }
                </div>
            </div>
        </>
    );
};

export default TodoList;