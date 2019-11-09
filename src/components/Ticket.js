import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TextBox from './TextBox';
import Button from './Button';
import Title from './Title';

const Wrapper = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 1px solid silver;
  margin-bottom: 8px;
`;

const inputRef = React.createRef();

function Ticket({ value, onChange, onDelete }) {
  const [description, setDescription] = useState((value && value.description) || '');
  const [editTicket, setEditTicket] = useState(false);

  useEffect(() => {
    if (editTicket && inputRef.current) inputRef.current.focus();
  }, [editTicket]);

  if (editTicket) {
    return (
      <TextBox
        ref={inputRef}
        onBlur={() => {
          if (!description) setDescription(value.description);
          else if (description !== value.description) {
            if (onChange) onChange(value, description);
            setDescription(description);
          }
          setEditTicket(false);
        }}
        value={description}
        onChange={event => {
          setDescription(event.target.value);
        }}
      />
    );
  }
  return (
    <Wrapper onDoubleClick={() => {
      setEditTicket(true);
    }}>
      <Title>{value.description}</Title>
      <Button onClick={() => {
        if (onDelete) onDelete(value);
      }}>-</Button>
    </Wrapper>
  );
}

export default Ticket;