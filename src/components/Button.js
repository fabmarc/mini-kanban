import styled from 'styled-components';

const Button = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 5px;
  margin: 16px;
  background-color: ${props => props.background || '#ffffff'};
`;

export default Button;