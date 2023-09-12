import styled from 'styled-components';

export const Container = styled.div`
  &.en {
    p, li, ul {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    p, li, ul {
      font-family: 'Crimson', serif;
      font-size: 1.1em;
    }
  }
`;

export const Box = styled.div`
  width: 45%;
  margin: 50px auto 0 auto;

  @media only screen and (max-width: 780px) {
    width: 90%;
    margin: 50px auto 0 auto;
  }
`;

export const SharingUl = styled.ul`
  margin-left: 20px;
`;

export const SharingLi = styled.li`
  font-family: 'Charter', sans-serif;
  margin: 15px 0;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 1.1em;
  font-weight: 200;
`;

export const AboutTitle = styled.h3`
  font-weight: 100;
  font-size: 72px;
  color: rgb(${(props) => props.theme.colors.textColor});
  text-align: center;
  
  &.description {
    font-size: 32px;
    
    @media only screen and (max-width: 780px) {
      font-size: 24px;
    }
  }

  @media only screen and (max-width: 780px) {
    font-size: 52px;
  }
`;

export const AboutParagraph = styled.p`
  margin: 10px 0;
  font-weight: 100;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 1.1em;
  text-indent: 25px;
`;

export const ImageBox = styled.div`
  text-align: center;
  
  .img {
    margin: 0 3px;
  }
`;

export const Timeline = styled.div`
  margin: 50px 0;
`;

export const TimelineItem = styled.div`
  padding-bottom: 25px;
  position: relative;
  display: flex;
  background: linear-gradient(
          rgb(${(props) => props.theme.colors.primaryDark}),
          rgb(${(props) => props.theme.colors.primaryDark})
  ) left 9px top 19px/2px 100% no-repeat;
  margin-bottom: -2px;

  &::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    color: rgb(${(props) => props.theme.colors.primaryDark});
    background: rgb(${(props) => props.theme.colors.primaryDark}) content-box;
    padding: 4px;
    margin-right: 35px;
    border: 2px solid rgb(${(props) => props.theme.colors.primaryDark});
    border-radius: 50%;
    width: 8px;
    height: 8px;
  }
`;

export const TimelineItemWrapper = styled.div`
  width: 100%;
  margin-top: 35px;
  display: flex;
  padding: 10px;
  border-radius: 8px;
  transition: .2s;
  border: 1px solid rgba(0, 0, 0, 0);
  
  &:hover {
    cursor: pointer;
    border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  }
  
  .image {
    border-radius: 8px;
    border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  }
`;

export const TimelineItemDescription = styled.div`
  padding-left: 20px;
`;

export const TimelineItemText = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin: 10px 0;
  
  &.title {
    font-weight: 900;
    margin: 0;
  }
  &.date {
    font-weight: 500;
    opacity: .5;
    margin: 5px 0;
  }
`;


export const TestimonialGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-auto-columns: 1fr;

  grid-template-columns: repeat(3, 1fr);

  padding-block: 2rem;
  width: min(95%, 70rem);
  margin-inline: auto;

  @media only screen and (max-width: 1600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const TestimonialArticle = styled.article`
  font-size: 0.8125rem;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 2.5rem 3.75rem 3rem -3rem hsl(217 19% 35% / 0.25);
  cursor: pointer;
  transition: .2s;
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);

  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primaryLight});
  }
  
  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
    border-radius: 0.5rem;
    border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  }
`;

export const CertTitle = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  text-align: center;
  margin: 10px 0;
`;

export const CertDescription = styled.p`
  color: rgba(${(props) => props.theme.colors.textColor}, .5);
`;
