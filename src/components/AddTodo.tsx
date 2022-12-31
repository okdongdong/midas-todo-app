import React, { useState } from 'react';
import styled from 'styled-components';
import TodoStore from '../stores/TodoStore';
import { BOX_COLORS } from './TodoItem';

const AddTodo = () => {
  const { addTodo } = TodoStore;

  const [newTodo, setNewTodo] = useState<string>('');
  const [colorIndex, setColorIndex] = useState<number>(3);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return;

    addTodo({ content: newTodo, checked: false, colorIndex });
    setNewTodo('');
  };

  return (
    <>
      <h2>Add Todo</h2>
      <Form onSubmit={onSubmitHandler}>
        <ColorItem backgroundColor={BOX_COLORS[colorIndex]} onClick={() => setIsOpen((prev) => !prev)} />
        <Input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="todo를 작성해주세요." />
        <Button>
          <Icon className="material-symbols-outlined">add</Icon>
        </Button>
      </Form>
      <Palette open={isOpen}>
        {BOX_COLORS.map((color, index) => (
          <ColorItem key={index} selected={index === colorIndex} backgroundColor={color} onClick={() => setColorIndex(index)} />
        ))}
      </Palette>
    </>
  );
};

export default AddTodo;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 30%;
  height: 40px;
  border-width: 0 0 1px 0;
  margin: 0 20px;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Palette = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? `flex` : `none`)};
  justify-content: center;
`;

const ColorItem = styled.div<{ selected?: boolean; backgroundColor: string }>`
  width: 20px;
  height: 20px;
  margin: 10px;
  border-radius: 100%;
  border: 3px ${(props) => (props.selected ? `#2f2` : `#fff`)} solid;
  background-color: ${(props) => props.backgroundColor};
`;

const Icon = styled.span`
  padding: 5px;
  margin: 5px;
`;
