import React from 'react';
import styles from './AddTodo.less';
import { Todo, useTodoStore } from '../stores/TodoStore';
import Palette from './Palette';
import { observer } from 'mobx-react';

const AddTodo = observer(() => {
    const { addTodo, newTodo, colorIndex, setNewTodo, paletteOpen, togglePaletteOpen, boxColor } = useTodoStore();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newTodo) return;
        addTodo(new Todo(newTodo, colorIndex));
        setNewTodo('');
    };

    return (
        <>
            <h2>Add Todo</h2>
            <form className={styles.addForm} onSubmit={onSubmitHandler}>
                <div className={styles.paletteItem} style={{ backgroundColor: boxColor }} onClick={togglePaletteOpen} />
                <input className={styles.addInput} type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="todo를 작성해주세요." />
                <button className={styles.addButton}>
                    <span className="material-symbols-outlined">add</span>
                </button>
            </form>
            {paletteOpen && <Palette selectedColorIndex={colorIndex} />}
        </>
    );
});

export default AddTodo;
