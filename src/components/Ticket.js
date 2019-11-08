import React from 'react';
import styled from 'styled-components';
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

const TextBox = styled.input`
  height: 58px;
  display: flex;
  width: 100%;
  align-items: center;
  border-radius: 5px;
  border: 1px solid silver;
  margin-bottom: 8px;
  font-size: inherit;
  padding: 16px;
`;

function Ticket({ value }) {
  return (
    value.edit ?
      <TextBox
        placeholder="New item..."
        value={value.description}
      /> :
      <Wrapper>
        <Title>{value.description}</Title>
        <Button>-</Button>
      </Wrapper>
  );
}

export default Ticket;