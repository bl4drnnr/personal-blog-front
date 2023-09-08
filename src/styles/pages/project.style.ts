import styled from 'styled-components';

export const ProjectTitle = styled.h1`
  padding: 0 15px;
  font-size: 64px;
`;

export const ProjectBrief = styled.h3`
  padding: 0 15px;
  font-size: 28px;
`;

export const ProjectParagraph = styled.p`
  text-indent: 50px;
  padding: 10px;

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
`;

export const SideBarTitle = styled.h3`
  padding: 5px 0;
  margin: 5px 0;
  border-top: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  
  :first-child {
    border-top: none;
    margin: 0;
    padding: 0;
  }
`;

export const SideBarParagraph = styled.p``;

export const ProjectHr = styled.hr`
  margin: 15px;
  opacity: .5;
`;

export const Container = styled.div`
  width: 45%;
  margin: 0 auto;

  &.en {
    ${ProjectTitle},
    ${ProjectBrief},
    ${ProjectParagraph},
    ${SideBarTitle},
    ${SideBarParagraph},
    b {
      color: rgb(${(props) => props.theme.colors.textColor});
      font-family: 'Charter', sans-serif;
    }
    ol, li, span {
      font-family: 'Charter', sans-serif;
    }
  }
  &.non-en {
    ${ProjectTitle},
    ${ProjectBrief},
    ${ProjectParagraph},
    ${SideBarTitle},
    ${SideBarParagraph},
    b {
      color: rgb(${(props) => props.theme.colors.textColor});
      font-family: 'Crimson', serif;
    }
    ol, li, span {
      font-family: 'Crimson', serif;
    }
  }

  @media only screen and (max-width: 1200px) {
    width: 90%;
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

  .code-block {
    font-size: 16px;
    font-family: 'Hack', sans-serif;
    padding: 2px;
    border-radius: 5px;
    background: rgb(${(props) => props.theme.colors.darkBackground});
  }
`;

export const SideBar = styled.div`
  display: block;
  float: right; 
  width: 300px;
  margin: 0 15px 30px 30px;
  
  .tech-stack-img {
    border-radius: 8px;
    margin-right: 5px;
  }
  
  @media only screen and (max-width: 1200px) {
    width: 100%;
    margin: 0 auto;
    float: none;
  }
`;

export const ImageWrapper = styled.div`
  overflow: auto;
`;

export const SideBarTableOfContents = styled.div`
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const SideBarProjectInfo = styled.div`
  border: 1px solid rgba(${(props) => props.theme.colors.textColor}, .25);
  border-radius: 8px;
  padding: 10px;
`;

export const ImageContainer = styled.div`
  margin: 30px auto 0 auto;
  &.w20 {
    width: 20%;
  }
  &.w30 {
    width: 30%;
  }
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
