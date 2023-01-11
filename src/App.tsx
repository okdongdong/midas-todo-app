import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import style from './App.less';
import TodoStore, { TodoStoreContext } from './stores/TodoStore';
import AddTodo from './components/AddTodo';
import { autorun, reaction } from 'mobx';

function App() {
    const [todoStore] = useState(new TodoStore());

    useEffect(() => {
        autorun((reaction) => {
            reaction.trace();
            todoStore.todos = JSON.parse(localStorage.getItem('todos') || '[]');
        });

        reaction(
            () => todoStore.todos,
            (todos, reaction) => {
                reaction.trace();
                localStorage.setItem('todos', JSON.stringify(todos));
            },
        );
    }, []);
    return (
        <TodoStoreContext.Provider value={todoStore}>
            <div className={style.App}>
                <h1>Midas Todo App</h1>
                <AddTodo />
                <TodoList />
            </div>
        </TodoStoreContext.Provider>
    );
}

export default App;
