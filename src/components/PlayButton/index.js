import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: 50%;
  border: 0;
  width: 50px;
  height: 50px;
  margin: 0 auto 10px auto;
  padding: 0 0 0 3px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PlayButton;