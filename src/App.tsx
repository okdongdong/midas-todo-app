import React, { useState } from 'react';
import TodoList from './components/TodoList';
import style from './App.less';
import TodoStore, { TodoStoreContext } from './stores/TodoStore';
import AddTodo from './components/AddTodo';

function App() {
    const [todoStore] = useState(new TodoStore());

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
