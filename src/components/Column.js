import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import TextBox from './TextBox';
import Ticket from './Ticket';
import Button from './Button';
import Title from './Title';

const Wrapper = styled.div`
  width: ${props => props.width || '100%'};
  height: 100%;
  border-left: 1px solid silver;
  &:first-child {
    border-left: 0;
  }
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

function Column({ header, status, width, tickets = {}, onChange }) {
  const [innerTickets, setTnnerTickets] = useState({ ...tickets });
  const [description, setDescription] = useState('');
  const [newTicket, setNewTicket] = useState(false);

  useEffect(() => {
    if (newTicket && inputRef.current) inputRef.current.focus();
  }, [newTicket]);

  useEffect(() => {
    if (onChange) onChange(status, innerTickets);
  }, [status, onChange, innerTickets]);

  const ticketIds = Object.keys(innerTickets);

  const createTicket = () => {
    if (description) {
      setTnnerTickets(prevInnerTickets => {
        const id = (_.chain(Object.keys(prevInnerTickets))
          .map((id) => +id).max().value() || 0) + 1;
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
    setTnnerTickets(prevInnerTickets => {
      prevInnerTickets[ticket.id] = {
        ...prevInnerTickets[ticket.id],
        description: newDescription,
      };
      return { ...prevInnerTickets };
    });
  }

  const handleTicketDelete = (ticket) => {
    setTnnerTickets(prevInnerTickets => {
      delete prevInnerTickets[ticket.id];
      return { ...prevInnerTickets };
    });
  }

  const handleAddClick = () => {
    setDescription('');
    setNewTicket(true);
  }

  return (
    <Wrapper width={width}>
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