import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    //during editing, we need the text to be present.
    
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = e => {
        //set the input
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        //clearing the text
        setInput('');
    }

    return (
        <form className='todo-form' onSubmit={handleSubmit}>

            {/*for editig, we need to render a new box */}
            {props.edit ? (
                <>
                    <input
                        type='text'
                        className='todo-input edit'
                        placeholder='Update your item'
                        value={input}
                        name='text'
                        onChange={handleChange}
                        ref={inputRef}
                    />
                    <button className='todo-button edit'>Update</button>
                </>
            ) :
                (
                    <>
                        <input
                            type='text'
                            className='todo-input'
                            placeholder='Add a todo'
                            value={input}
                            name='text'
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        <button className='todo-button'>Add todo</button>
                    </>
                )}

        </form>
    )
}

export default TodoForm;
