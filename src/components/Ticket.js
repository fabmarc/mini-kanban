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

function Ticket({ value = {}, onChange, onDelete }) {
  const origDescription = value.description || '';
  const [editTicket, setEditTicket] = useState(false);
  const [description, setDescription] = useState(origDescription);

  useEffect(() => {
    if (editTicket && inputRef.current) inputRef.current.focus();
  }, [editTicket]);

  if (editTicket) {
    return (
      <TextBox
        ref={inputRef}
        onBlur={() => {
          if (!description) setDescription(origDescription);
          else if (description !== origDescription) {
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
      <Title>{origDescription || '(no description)'}</Title>
      <Button onClick={() => {
        if (onDelete) onDelete(value);
      }}>-</Button>
    </Wrapper>
  );
}

export default Ticket;