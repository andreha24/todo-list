import React, { useState, useRef, useEffect } from 'react';
import pencil from 'assets/img/pencil.png';

import './index.css';

const TodoItem = ({ title, id, deleteTodoItem, setTodoItems }) => {
    const inputRef = useRef(null);
    const [toggleDone, setToggleDone] = useState(true);
    const [toggleEdit, setToggleEdit] = useState(false);
    const [todoTitle, setTodoTitle] = useState(title);
    const [inputValue, setInputValue] = useState(title);

    const changeState = () => {
        if (toggleEdit) {
            return
        }

        setToggleDone(!toggleDone);

        setTodoItems(prevItems => prevItems.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isDone: !item.isDone,
                }
            }

            return item;
        }))
    }


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const editTodoItem = (event) => {
        event.preventDefault();
        setTodoTitle(inputRef.current.value)
        setToggleEdit(!toggleEdit);
    }

    useEffect(() => {
        if (toggleEdit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [toggleEdit]);

    return (
        <>
            <div className='todo-item' onClick={changeState}>
                {
                    toggleEdit ?
                        <form>
                            <div>
                                <input
                                    type="text"
                                    className='todo-item-edit'
                                    ref={inputRef}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="submit" onClick={editTodoItem}>
                                Save changes
                            </button>
                        </form>
                        :
                        <span className={toggleDone ? '' : 'is-done'}> {todoTitle} </span>
                }
                <div className='todo-item-btns' onClick={e => e.stopPropagation()}>
                    <img
                        src={pencil}
                        alt="edit-todo"
                        onClick={() => setToggleEdit(!toggleEdit)}
                    />
                    <img
                        src="/garbage.png"
                        alt="garbage"
                        onClick={() => deleteTodoItem(id)}
                    />
                </div>
            </div>
        </>
    );
};

export default TodoItem;
