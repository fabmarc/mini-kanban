import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDrop } from 'react-dnd';
import _ from 'lodash';

import TextBox from './TextBox';
import Ticket from './Ticket';
import Button from './Button';
import Title from './Title';

const Wrapper = styled.div`
  width: ${props => props.width || '100%'};
  height: 100%;
  border-left: 1px solid #c0c0c0;
  &:first-child {
    border-left: 0;
  }
  ${props => props.highlight &&
    css`
      box-shadow: 0 0 8px 8px #fffec8;
    `}
`;

const Header = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
`;

const Tickets = styled.div`
  height: calc(100% - 58px);
  padding: 16px;
`;

const inputRef = React.createRef();

function Column({ header, status, width, tickets = {}, onChange, onDrop }) {
  const [innerTickets, setInnerTickets] = useState(tickets);
  const [description, setDescription] = useState('');
  const [newTicket, setNewTicket] = useState(false);

  useEffect(() => {
    if (newTicket && inputRef.current) inputRef.current.focus();
  }, [newTicket]);

  useEffect(() => { setInnerTickets(tickets) }, [tickets]);

  useEffect(() => {
    if (onChange) onChange(status, innerTickets);
  }, [status, onChange, innerTickets]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ticket',
    drop({ ticket }) {
      onDrop(status, ticket);
    },
    canDrop({ ticket }) {
      return (status !== ticket.status);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const ticketIds = Object.keys(innerTickets);

  const createTicket = () => {
    if (description) {
      setInnerTickets((prevInnerTickets) => {
        const id = new Date().getUTCMilliseconds();
        return {
          ...prevInnerTickets,
          [id]: { id, description, status },
        };
      });
    }
    setDescription('');
    setNewTicket(false);
  }

  const handleValueChange = (event) => {
    setDescription(event.target.value);
  }

  const handleTicketChange = (ticket, newDescription) => {
    setInnerTickets((prevInnerTickets) => {
      prevInnerTickets[ticket.id] = {
        ...prevInnerTickets[ticket.id],
        description: newDescription,
      };
      return { ...prevInnerTickets };
    });
  }

  const handleTicketDelete = (ticket) => {
    setInnerTickets((prevInnerTickets) => {
      delete prevInnerTickets[ticket.id];
      return { ...prevInnerTickets };
    });
  }

  const handleAddClick = () => {
    setDescription('');
    setNewTicket(true);
  }

  return (
    <Wrapper
      ref={drop}
      width={width}
      highlight={isOver && canDrop}
    >
      <Header>
        <Title bold>{header}</Title>
        <Button onClick={handleAddClick}>+</Button>
      </Header>
      <Tickets>
        {
          newTicket &&
          <TextBox
            ref={inputRef}
            placeholder="New item..."
            onBlur={createTicket}
            value={description}
            onChange={handleValueChange}
          />
        }
        {_.map(ticketIds, ticketId => {
          return (
            <Ticket
              key={ticketId}
              value={innerTickets[ticketId]}
              onChange={handleTicketChange}
              onDelete={handleTicketDelete}
            />
          );
        })}
      </Tickets>
    </Wrapper>
  );
}

export default Column;
