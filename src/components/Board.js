import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
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
  border-bottom: 1px solid #c0c0c0;
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
  const [allTickets, setAllTickets] = useState(tickets);
  const statuses = Object.keys(columns);
  console.log('Board');
  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Header>Mini-Kanban Board</Header>
        <Columns>
          {_.map(statuses, status => (
            <Column
              key={status}
              width={`${100 / statuses.length}%`}
              tickets={allTickets[status]}
              header={columns[status]}
              status={status}
              onChange={(status, tickets) => {
                if (onChange) onChange(status, tickets);
                setAllTickets((prevAllTickets) => {
                  prevAllTickets[status] = tickets;
                  return prevAllTickets;
                });
              }}
              onDrop={(newStatus, ticket) => {
                setAllTickets((prevAllTickets) => {
                  delete prevAllTickets[ticket.status][ticket.id];
                  return {
                    ...prevAllTickets,
                    [newStatus]: {
                      ...prevAllTickets[newStatus],
                      [ticket.id]: { ...ticket, status: newStatus }
                    },
                    [ticket.status]: {
                      ...prevAllTickets[ticket.status],
                    },
                  };
                });
              }}
            />
          ))}
        </Columns>
      </Wrapper>
    </DndProvider>
  );
}

export default Board;
