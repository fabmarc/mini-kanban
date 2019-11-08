import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  // background: lightyellow;
  width: 100%;
  height: 100%;
  border-left: 1px solid silver;
  &:first-child {
    border-left: 0;
  }
`;

const Header = styled.div`
  // background: yellow;
  height: 12%;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  // background: lightblue;
  text-align: left;
  width: 100%;
  padding: 16px;
`;

const Button = styled.button`
  // background: lightblue;
  width: 32px;
  height: 32px;
  float: right;
  margin: 16px;
  border-radius: 5px;
`;

function Column({ header }) {
  return (
    <Wrapper>
      <Header>
        <Title>{header}</Title>
        {/* <Action><button style={{ width: 32, height: 32 }}>+</button></Action> */}
        <Button>+</Button>
      </Header>
    </Wrapper>
  );
}

export default Column;