import PropTypes from 'prop-types';
import styled from 'styled-components';

const PlayButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: 20px;
  border: 0;
  width: 30%;
  margin: 0 0 10px 0;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover {
    opacity: .5;
  }
`;

export default PlayButton;