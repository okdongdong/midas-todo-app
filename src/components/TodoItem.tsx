import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoStore, { Todo } from '../stores/TodoStore';

const TodoItem = ({ id, content, checked, colorIndex }: Todo) => {
  const { toggleTodo, deleteTodo, updateTodo } = TodoStore;
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isColorUpdate, setIsColorUpdate] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>(content);
  const [newColorIndex, setNewColorIndex] = useState<number>(colorIndex);

  const toggleHandler = (id: string | undefined) => {
    if (id === undefined) return;
    toggleTodo(id);
  };

  const deleteHandler = (id: string | undefined) => {
    if (id === undefined) return;
    deleteTodo(id);
  };

  const updateHandler = (id: string | undefined) => {
    if (id === undefined || newTodo === '') return;
    if (!isUpdate) setIsUpdate(true);
    else {
      updateTodo(id, newTodo, newColorIndex);
      setIsUpdate(false);
    }
  };

  const cancelHandler = () => {
    setIsUpdate(false);
    setNewTodo(content);
  };

  useEffect(() => {
    if (newColorIndex != colorIndex && id != undefined) updateTodo(id, newTodo, newColorIndex);
  }, [newColorIndex]);

  return (
    <>
      <TodoItemContainer checked={checked}>
        <BoxContainer>
          <ColorBox colorIndex={colorIndex} onClick={() => setIsColorUpdate((prev) => !prev)} />
          <CheckBox type="checkbox" checked={checked} onChange={() => toggleHandler(id)} />
          {isColorUpdate && (
            <Palette>
              {BOX_COLORS.map((color, index) => (
                <ColorItem key={index} selected={index === newColorIndex} backgroundColor={color} onClick={() => setNewColorIndex(index)} />
              ))}
            </Palette>
          )}
        </BoxContainer>
        <ContentContainer>{isUpdate ? <Input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></Input> : <span>{content}</span>}</ContentContainer>
        <ButtonContainer>
          {isUpdate ? (
            <>
              <Button backgroundColor="#7f7" onClick={() => updateHandler(id)}>
                <Icon className="material-symbols-outlined">check</Icon>
              </Button>
              <Button onClick={() => cancelHandler()}>
                <Icon className="material-symbols-outlined">close</Icon>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => updateHandler(id)}>
                <Icon className="material-symbols-outlined">edit</Icon>
              </Button>
              <Button backgroundColor="#f66" onClick={() => deleteHandler(id)}>
                <Icon className="material-symbols-outlined">delete</Icon>
              </Button>
            </>
          )}
        </ButtonContainer>
      </TodoItemContainer>
      <hr style={{ width: '95%', border: '#eee solid 1px' }} />
    </>
  );
};

export default TodoItem;

export const BOX_COLORS = ['#9e9e9e', '#000', '#ff3535', '#ff9e35', '#fff035', '#bdff35', '#35ffbf', '#3578ff', '#8835ff', '#ff35ea'];

const TodoItemContainer = styled.div<{ checked: boolean }>`
  color: ${(props) => (props.checked ? `#ccc` : `#000`)};
  text-decoration-line: ${(props) => (props.checked ? `line-through` : `none`)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoxContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const CheckBox = styled.input`
  height: 25px;
  width: 25px;
  margin: 10px;
  background-color: #333;
  color: #333;
  accent-color: #ddd;
`;

const ColorBox = styled.div<{ colorIndex: number }>`
  background-color: ${(props) => BOX_COLORS[props.colorIndex] || `#000`};
  height: 40px;
  width: 5px;
`;

const ContentContainer = styled.div`
  min-height: 60px;
  align-items: center;
  display: flex;
`;

const Input = styled.input`
  border-width: 0 0 1px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
`;

const Button = styled.button<{ backgroundColor?: string }>`
  background-color: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  height: 100%;
`;

const Icon = styled.span`
  padding: 5px;
  margin: 5px;
`;

const Palette = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  flex-wrap: wrap;
  margin: 0 20px;
`;

const ColorItem = styled.div<{ selected?: boolean; backgroundColor: string }>`
  width: 20px;
  height: 20px;
  margin: 2px;
  border-radius: 100%;
  border: 3px ${(props) => (props.selected ? `#2f2` : `#fff`)} solid !important;
  background-color: ${(props) => props.backgroundColor} !important;
`;
