import styled from 'styled-components';

const CreditsWrapper = styled.div`
  padding: 20px;
  text-align: center; 
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
  }
`;

export default function Credits(props) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <CreditsWrapper {...props}>
      <a href="http://www.maxfleishman.com/">Ilustração por <b>Max Fleishman</b></a>
    </CreditsWrapper>
  );
}