import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './TodoList.less';
import { useTodoStore } from '../stores/TodoStore';
import TodoItem from './TodoItem';

const TodoList = observer(() => {
    const { todos, info } = useTodoStore();
    const { total, checked, notChecked } = info;

    return (
        <div className={styles.todoListContainer}>
            <h2>Todo List</h2>
            {todos.length === 0 ? (
                <h3 className={styles.message}>작성된 todo가 없습니다.</h3>
            ) : (
                <>
                    <h3 className={styles.infoMessage}>{`전체: ${total} (완료: ${checked} / 미완료: ${notChecked})`}</h3>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} {...todo} />
                    ))}
                </>
            )}
        </div>
    );
});

export default TodoList;
