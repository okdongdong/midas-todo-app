import React from 'react';
import TodoList from './components/TodoList';
import './App.css';
import styled from 'styled-components';

function App() {
  return (
    <div className="App">
      <AppContainer>
        <h1>Midas Todo App</h1>
        <TodoList />
      </AppContainer>
    </div>
  );
}

export default App;

const AppContainer = styled.div`
  margin: auto;
`;
