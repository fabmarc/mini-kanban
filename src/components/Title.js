import styled, { css } from 'styled-components';

const Title = styled.div`
  text-align: left;
  width: calc(100% - 64px);
  padding: 16px 0 16px 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${props => props.bold &&
    css`
      font-weight: bold;
    `}
`;

export default Title;