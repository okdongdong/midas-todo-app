import React from 'react';
import { observer } from 'mobx-react-lite';
import TodoStore from '../stores/TodoStore';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, info } = TodoStore;
  const { total, checked, notChecked } = info;

  return (
    <TodoListContainer>
      <h2>Todo List</h2>
      {todos.length === 0 ? (
        <Message>작성된 todo가 없습니다.</Message>
      ) : (
        <>
          <InfoMessage>{`전체: ${total} (완료: ${checked} / 미완료: ${notChecked})`}</InfoMessage>
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </>
      )}
    </TodoListContainer>
  );
};

export default observer(TodoList);

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
`;

const InfoMessage = styled.h3`
  margin-top: 0;
  margin-bottom: 30px;
`;

const Message = styled.h3`
  color: #ddd;
`;
