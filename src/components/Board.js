import React from 'react';
import styled from 'styled-components';
import Column from './Column';

const Wrapper = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 16px;
`;

const Header = styled.div`
  // background: yellow;
  height: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  justify-content: center;
  border-bottom: 1px solid silver;
`;

const Columns = styled.div`
  // background: lightgreen;
  height: 88%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
`;

function Board() {
  return (
    <Wrapper>
      <Header>Mini-Kanban Board</Header>
      <Columns>
        <Column header="To-Do" status="todo" />
        <Column header="In progress" status="ongoing" />
        <Column header="Done" status="done" />
      </Columns>
    </Wrapper>
  );
}

export default Board;