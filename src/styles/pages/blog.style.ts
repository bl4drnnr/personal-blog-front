import styled from 'styled-components';

export const BlogIntroWrapper = styled.div`
  width: 45%;
  margin: 100px auto 0 auto;

  @media only screen and (max-width: 780px) {
    width: 90%;
  }
  
  &.found-posts {
    margin: 25px auto 0 auto;
  }
`;

export const BlogPostsTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  text-align: center;
  font-size: 64px;
  font-weight: 100;

  @media only screen and (max-width: 780px) {
    font-size: 52px;
  }
`;

export const InputWrapper = styled.div`
  width: 45%;
  margin: 0 auto;

  @media only screen and (max-width: 780px) {
    width: 90%;
  }
`;


export const AllPostsWrapper = styled.div`
  width: 100%;

  &.en {
    p, h3, li, ul {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    p, h3, li, ul {
      font-family: 'Crimson', serif;
    }
    p, li, ul {
      font-family: 'Crimson', serif;
      font-size: 1.2em;
    }
  }
  
  .icon {
    margin: 0 3px;
  }
`;

export const FoundPostWrapper = styled.div`
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  padding: 20px;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: .2s;

  &:hover {
    border: 1px solid rgba(${(props) => props.theme.colors.primaryLight});
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

  @media only screen and (max-width: 1200px) {
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
`;

export const PostTitle = styled.h3`
  text-align: center;
  font-size: 24px; !important;
  font-weight: 600;
  color: rgb(${(props) => props.theme.colors.textColor});
`;

export const PostTimestamp = styled.p`
  text-align: center;
  margin: 10px 0;
  color: rgb(${(props) => props.theme.colors.textColor}, .5);
`;

export const PostDescription = styled.p`
  font-size: 1.1em;
  text-indent: 50px;
  font-weight: 300;
  color: rgb(${(props) => props.theme.colors.textColor}, .75);
`;

export const SettingsWrapper = styled.div`
  position: relative;
  display: flex;
  margin: 15px 0;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  &:nth-child(2) {
    margin: 0 5px;
  }
  &:nth-child(3) {
    margin-right: 5px;
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
