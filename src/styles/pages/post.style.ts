import styled from 'styled-components';

export const ArticleTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 72px;
  text-align: center;
  &.intro {
    font-size: 24px;
    font-weight: 100;
    margin: 75px 0;

    @media only screen and (max-width: 780px) {
      font-size: 1.2em;
      margin: 25px 0;
    }
  }

  @media only screen and (max-width: 780px) {
    font-size: 48px;
  }
`;

export const PostParagraph = styled.p`
  color: rgb(${(props) => props.theme.colors.textColor});
  font-size: 1.2em;
  line-height: 30px;
  padding-top: 30px;
  text-indent: 50px;
  font-weight: 400;

  &.title {
    font-weight: 900;
    text-indent: 0;
    margin-top: 30px;
    font-size: 32px;
  }

  &.subtitle {
    font-weight: 700;
    text-indent: 0;
    font-size: 24px;
  }

  &.subsubtitle {
    text-indent: 0;
    font-weight: 600;
    font-size: 1.2em;
  }

  @media only screen and (max-width: 780px) {
    font-size: 1.1em;
    text-indent: 25px;
  }
`;

export const ArticleBodyWrapper = styled.div`
  width: 45%;
  margin: 100px auto 0 auto;
  @media only screen and (max-width: 780px) {
    width: 90%;
  }

  &.en {
    ${PostParagraph} {
      font-family: 'Charter', sans-serif;
    }
    b {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    ${PostParagraph} {
      font-family: 'Crimson', serif;
    }
    b {
      font-family: 'Crimson', serif;
    }
  }

  .code-block {
    font-size: 16px;
    font-family: 'Hack', sans-serif;
    padding: 2px;
    border-radius: 5px;
    background: rgb(${(props) => props.theme.colors.darkBackground});
  }

  .table-of-contents-ul {
    font-size: 1.1em;
    color: rgb(${(props) => props.theme.colors.primaryDark});
    text-decoration: underline;
    margin-bottom: 0.6em;
    transition: .2s;
    margin-left: 20px;

    &:hover {
      cursor: pointer;
    }
  }

  .table-of-contents-li {
    font-size: 1em;
    color: rgb(${(props) => props.theme.colors.primaryDark});
    text-decoration: underline;
    display: table;
    counter-increment: item;
    margin-bottom: 0.6em;
    transition: .2s;

    &:hover {
      cursor: pointer;
    }
      
    li:first-child {
      margin-top: 0.6em;
    }
      
    &::before {
      content: counters(item, ".") ". ";
      display: table-cell;
      padding-right: 0.6em;
    }
  }

  .table-of-contents-ol {
    list-style-type: none;
    counter-reset: item;
    margin: 0;
    padding: 0;
  }

  .blog-post-ul, .blog-post-ol {
    white-space: pre-line;
    color: rgb(${(props) => props.theme.colors.textColor});
    margin: 20px 0 0 50px;
    &.no-margin {
      margin: 0 0 20px 20px
    }
  }

  .blog-post-li {
    font-size: 18px;
    line-height: 30px;
    font-weight: 400;

    @media only screen and (max-width: 780px) {
      font-size: 1em;
    }
    &.en {
      font-family: 'Charter', sans-serif;
    }
    &.non-en {
      font-family: 'Crimson', serif;
    }
  }
`;

export const TableOfContentsContainer = styled.div`
  &.contact-and-references {
    margin-top: 30px;
    a {
      font-size: 1em;
    }
  }
  &.en {
    h1, ol, li, span, a {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    h1, ol, li, span, a {
      font-family: 'Crimson', serif;
    }
  }
`;

export const TableOfContentsTitle = styled.h1`
  color: rgb(${(props) => props.theme.colors.textColor});
  margin-bottom: 20px;
`;

export const ImageContainer = styled.div`
  margin: 30px auto 0 auto;
  &.w50 {
    width: 50%;
  }
  &.w60 {
    width: 60%;
  }
  &.w70 {
    width: 70%;
  }
  &.w80 {
    width: 80%;
  }
  &.w90 {
    width: 90%;
  }
  &.w100 {
    width: 100%;
  }

  > div {
    position: unset !important;
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }
`;
