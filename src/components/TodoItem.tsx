import React from 'react';
import { BOX_COLORS, Todo, useTodoStore } from '../stores/TodoStore';
import classNames from 'classnames';
import styles from './TodoItem.less';
import Palette from './Palette';
import { observer } from 'mobx-react';

const TodoItem = observer((props: Todo) => {
    const { id, content, checked, colorIndex, isColorUpdate, isUpdate, tempContent } = props;
    const { toggleTodo, setTempContent, deleteTodo, updateTodo, toggleColorUpdate, toggleUpdate } = useTodoStore();

    return (
        <>
            <div className={classNames(styles.todoItemContainer, checked && styles.checked)}>
                <div className={styles.boxContainer}>
                    <div className={styles.colorBox} style={{ backgroundColor: BOX_COLORS[colorIndex] }} onClick={() => toggleColorUpdate(id)} />
                    <input className={styles.checkBox} type="checkbox" checked={checked} onChange={() => toggleTodo(id)} />
                    {isColorUpdate && <Palette todoId={id} selectedColorIndex={colorIndex} />}
                </div>
                <div className={styles.contentContainer}>
                    {isUpdate ? <input className={styles.input} type="text" value={tempContent} onChange={(e) => setTempContent(id, e.target.value)}></input> : <span>{content}</span>}
                </div>
                <div className={styles.buttonContainer}>
                    {isUpdate ? (
                        <>
                            <button className={classNames(styles.button, styles.updateButton)} onClick={() => updateTodo(id, tempContent)}>
                                <span className="material-symbols-outlined">check</span>
                            </button>
                            <button
                                className={styles.button}
                                onClick={() => {
                                    setTempContent(id, content);
                                    toggleUpdate(id);
                                }}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={styles.button} onClick={() => toggleUpdate(id)}>
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button className={classNames(styles.button, styles.deleteButton)} onClick={() => deleteTodo(id)}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
            <hr style={{ width: '95%', border: '#eee solid 1px' }} />
        </>
    );
});

export default TodoItem;
