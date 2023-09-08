import styled from 'styled-components';

export const Message = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  display: flex;
  font-size: 1.2em;
  line-height: 30px;
  padding-top: 30px;
  font-weight: 400;
  
  &.mess {
    padding-top: 0;
    text-indent: 50px;
    @media only screen and (max-width: 780px) {
      font-size: 1.1em;
      text-indent: 25px;
    }
  }
  
  &.link {
    .img {
      margin: 0 10px;
      filter: ${(props) => props.theme.colors.svgColor}
    }
  }
  
  &.timestamp {
    font-size: 1.1em;
    opacity: .5;
  }
`;

export const Container = styled.div`
  min-height: 350px;
  width: 100%;

  &.en {
    ${Message}, b {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    ${Message}, b {
      font-family: 'Crimson', serif;
    }
  }
`;

export const TimestampWrapper = styled.div`
  justify-content: space-evenly;
  width: 100%;
  display: flex;
`;

export const HrefLink = styled.a`
  font-family: 'Charter', sans-serif;
  color: rgb(${(props) => props.theme.colors.primaryDark});
  text-decoration: underline;
  
  &:hover {
    cursor: pointer;
  }
`;
