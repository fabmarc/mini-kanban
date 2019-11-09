import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Column from './Column';

const Wrapper = styled.div`
  height: 100vh;
  padding: 16px;
`;

const Header = styled.div`
  height: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  font-weight: bold;
  justify-content: center;
  border-bottom: 1px solid silver;
`;

const Columns = styled.div`
  height: calc(100% - 58px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

function Board({ columns, tickets, onChange }) {
  const statuses = Object.keys(columns);
  return (
    <Wrapper>
      <Header>Mini-Kanban Board</Header>
      <Columns>
        {_.map(statuses, status => (
          <Column
            key={status}
            onChange={onChange}
            tickets={tickets[status]}
            width={`${100 / statuses.length}%`}
            header={columns[status]}
            status={status}
          />
        ))}
      </Columns>
    </Wrapper>
  );
}

export default Board;