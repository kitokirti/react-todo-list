import React, { useState } from 'react';
import Todo from './todo';
import TodoForm from './todoForm';

//get the data from localstorage
const getLocalItems = ()=>{
    let list = localStorage.getItem('todos');
    if(list){
        return JSON.parse(localStorage.getItem('todos'));
    }
    else{
        return [];
    }
}

function TodoList() {
    const [todos, setTodos] = useState(getLocalItems());

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodo = [todo, ...todos];

        setTodos(newTodo);
        console.log(...todos);
    }

    //edit todo
    const updateTodo = (todoId, newValue)=> {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
        return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)))
}

//removetodo
const removeTodo = id => {
    const removeArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removeArr);
}


//complete todos
const completeTodo = id => {
    let updatedTools = todos.map(todo => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
        return todo;
    });
    setTodos(updatedTools);
}

return (
    <div>
        <h1>What's your plan for today?</h1>
        <TodoForm onSubmit={addTodo} />
        <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
        />
    </div>
)
}

export default TodoList
