import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
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

function Column({ header, width, tickets }) {
  return (
    <Wrapper width={width}>
      <Header>
        <Title bold>{header}</Title>
        <Button>+</Button>
      </Header>
      <Tickets>
        {_.map(tickets, ticket => <Ticket value={ticket} />)}
      </Tickets>
    </Wrapper>
  );
}

export default Column;