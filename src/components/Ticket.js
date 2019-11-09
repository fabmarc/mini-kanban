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

  const saveTicket = () => {
    if (!description) setDescription(origDescription);
    else if (description !== origDescription) {
      if (onChange) onChange(value, description);
      setDescription(description);
    }
    setEditTicket(false);
  }

  const handleValueChange = (event) => {
    setDescription(event.target.value);
  }

  const handleDeleteClick = () => {
    if (onDelete) onDelete(value);
  }

  const handleDoubleClick = () => {
    setEditTicket(true);
  }

  if (editTicket) {
    return (
      <TextBox
        ref={inputRef}
        onBlur={saveTicket}
        value={description}
        onChange={handleValueChange}
      />
    );
  }
  return (
    <Wrapper onDoubleClick={handleDoubleClick}>
      <Title>{origDescription || '(no description)'}</Title>
      <Button onClick={handleDeleteClick}>-</Button>
    </Wrapper>
  );
}

export default Ticket;