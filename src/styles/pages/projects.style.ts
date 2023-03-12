import styled from 'styled-components';

export const ProjectsWrapper = styled.div`
  width: 45%;
  margin: 100px auto 0 auto;

  @media only screen and (max-width: 780px) {
    width: 90%;
  }

  &.found-projects {
    margin: 25px auto 0 auto;
  }
`;

export const ProjectTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  text-align: center;
  font-size: 64px;
  font-weight: 100;

  @media only screen and (max-width: 780px) {
    font-size: 52px;
  }
`;

export const ProjectsDescription = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 24px;
  font-weight: 100;
  text-align: center;
  
  &.margins {
    margin: 25px 0;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Name = styled.h2`
  font-family: "Charter", sans-serif;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1;
`;

export const Container = styled.div`
  width: 100%;
  &.en {
    p, li, ul {
      font-family: "Charter", sans-serif;
    }
  }
  &.non-en {
    p, li, ul {
      font-family: 'Crimson', serif;
    }
  }
`;

export const InputWrapper = styled.div`
  width: 35%;
  margin: 0 auto;

  @media only screen and (max-width: 780px) {
    width: 90%;
  }
`;

export const TestimonialGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-auto-columns: 1fr;
  grid-template-areas:
   'one'
   'two'
   'three'
   'four'
   'five';

  padding-block: 2rem;
  width: min(95%, 70rem);
  margin-inline: auto;

  @media screen and (min-width: 33em) {
    grid-template-areas:
      "one one"
      "two three"
      "five five"
      "four four";
  }

  @media screen and (min-width: 38em) {
    grid-template-areas:
     'one one'
     'two five'
     'three five'
     'four four';
  }

  @media screen and (min-width: 54em) {
    grid-template-areas:
      "one one two"
      "five five five"
      "three four four";
  }

  @media screen and (min-width: 75em) {
    grid-template-areas:
      "one one two five"
      "three four four five";
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

  :hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primaryLight});
  }
  
  :nth-child(1) {
    grid-area: one;
  }
  :nth-child(2) {
    grid-area: two;
  }
  :nth-child(3) {
    grid-area: three;
  }
  :nth-child(4) {
    grid-area: four;
  }
  :nth-child(5) {
    grid-area: five;
  }
`;


export const Title = styled.p`
  font-family: "Charter", sans-serif;
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 1rem;
  line-height: 1.2;
  margin: 0.5rem 0;
`;

export const Description = styled.p`
  font-family: "Charter", sans-serif;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const SettingsWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 15px 0;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  :nth-child(2) {
    margin: 0 5px;
  }
`;

export const PostTags = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
`;

export const PostTag = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  background: rgba(${(props) => props.theme.colors.darkBackground});
  margin: 3px;
  padding: 5px;
  border-radius: 5px;
  
  :first-child {
    margin-left: 0;
  }
`;

export const FoundProjectWrapper = styled.div`
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  padding: 20px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: .2s;

  :hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primaryLight});
  }
`;

