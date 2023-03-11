import React, { RefObject } from 'react';

// import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import CodeHighlighter from '@components/CodeHighlighter/CodeHighlighter.component';
import DefaultLayout from '@layouts/Default.layout';
import { makeStaticProps } from '@lib/getStatic';
import { getProjectService } from '@services/project/get-project/get-project.service';
import {
  Container,
  ImageContainer,
  ImageWrapper,
  ProjectBrief,
  ProjectHr,
  ProjectParagraph,
  ProjectTitle,
  SideBar,
  SideBarParagraph,
  SideBarProjectInfo,
  SideBarTableOfContents,
  SideBarTitle
} from '@styles/project.style';
import { generateLists } from '@utils/GeneraeList.util';

interface BadgeProps {
  src: string;
  width: number;
  height: number;
}

interface ProjectProps {
  locale: string;
  projectName: string;
}

interface ProjectContentObject {
  type?: string | undefined;
  lang?: string | undefined;
  content?: string | undefined;
  resource?: string | undefined;
  width?: string | undefined;
  style?: string | undefined;
  items?: Array<any>
}

interface TechStackProps {
  src: string;
  width: number;
  height: number;
}

interface ProjectPageProps {
  link: string;
  text: string;
}

const Project = ({ projectName }: ProjectProps) => {
  // const { t } = useTranslation();
  const router = useRouter();

  // const [listTocRefs, setListTocRefs] = React.useState<RefObject<unknown>[]>([]);
  // const [refNames, setRefNames] = React.useState<Array<string>>([]);
  //
  // const getRefByName = (refName: string | undefined): any => {
  //   let matchingRef = null;
  //   refNames.forEach((item, index) => {
  //     if (item === refName && !refName.includes('.')) {
  //       matchingRef = listTocRefs[index];
  //     } else {
  //       const splitRefName = refName?.split('.');
  //       if (splitRefName && splitRefName[splitRefName.length - 1] === item) {
  //         matchingRef = listTocRefs[index];
  //       }
  //     }
  //   });
  //   return matchingRef;
  // };
  //
  // const generateTableOfContents = (toc: any, parentKeyName?: string) => {
  //   const CreateTableOfContents = ({ toc, parentKeyName }: { toc: any, parentKeyName?: string }): JSX.Element => {
  //     return (
  //       <ol className={'table-of-contents-ol'}>
  //         {Object.entries(toc).map(([key, value]: any) => {
  //           const keyName = parentKeyName ? `${parentKeyName}.${key}` : key;
  //           if (typeof value === 'string') {
  //             return (
  //               <li
  //                 className={'table-of-contents-li'}
  //                 key={key}
  //                 onClick={() => scrollTo(getRefByName(t(`${projectName}:toc.${keyName}`) as string))}
  //               >
  //                 {t(`${projectName}:toc.${keyName}`)}
  //               </li>
  //             );
  //           } else {
  //             return (
  //               <li
  //                 className={'table-of-contents-li'}
  //                 key={key}
  //               >
  //                 <span onClick={() => scrollTo(getRefByName(keyName))}>{key}</span>
  //                 {generateTableOfContents(value, keyName)}
  //               </li>
  //             );
  //           }
  //         })}
  //       </ol>
  //     );
  //   };
  //
  //   return <CreateTableOfContents toc={toc} parentKeyName={parentKeyName} />;
  // };
  //
  // const scrollTo = (ref: any) => {
  //   if (ref && ref.current) ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // };
  //
  // const isArticleCode = (object: any) => {
  //   return 'lang' in object;
  // };
  //
  // React.useEffect(() => {
  //   // @ts-ignore
  //   const availableprojects = process.env.NEXT_PUBLIC_AVAILABLE_PROJECTS.split(',');
  //   if (!availableprojects.includes(projectName)) handleRedirect('/404').then();
  //
  //   let quantityOfTitles = 0;
  //   const allRefs: Array<string> = [];
  //
  //   const contentObj: ProjectContentObject[] = t(`${projectName}:content`, { returnObjects: true });
  //
  //   contentObj.forEach((item: ProjectContentObject | string) => {
  //     if (
  //       typeof item !== 'string' &&
  //       (item.type === 'title' || item.type === 'subtitle' || item.type === 'subsubtitle')
  //     ) {
  //       quantityOfTitles += 1;
  //       allRefs.push(item.content as string);
  //     }
  //   });
  //
  //   setListTocRefs(Array(quantityOfTitles).fill(null).map(() => React.createRef()));
  //
  //   setRefNames(allRefs);
  // }, [t]);
  //
  // const handleRedirect = async (path: string) => {
  //   await router.push(`/${locale}${path}`);
  // };

  return (
    <>
      {/*<Head>*/}
      {/*  <title>{t('pages:home.name')} | {t(`${projectName}:title`)}</title>*/}
      {/*  <meta name={'keywords'} content={t(`${projectName}:tags`) as string} />*/}
      {/*  <meta name={'description'} content={t(`${projectName}:description`) as string} />*/}
      {/*  <meta charSet={'utf-8'} />*/}
      {/*</Head>*/}
      {/*<DefaultLayout locale={locale} translation={t}>*/}
      {/*  <Container className={locale === 'en' ? 'en' : 'non-en'}>*/}
      {/*    <ProjectTitle>{t(`${projectName}:title`)}</ProjectTitle>*/}
      {/*    <ProjectBrief>{t(`${projectName}:brief`)}</ProjectBrief>*/}
      {/*    <ProjectHr />*/}

      {/*    <SideBar>*/}
      {/*      <SideBarTableOfContents>*/}
      {/*        {generateTableOfContents(t(`${projectName}:toc`, { returnObjects: true }))}*/}
      {/*      </SideBarTableOfContents>*/}

      {/*      <SideBarProjectInfo>*/}
      {/*        <SideBarTitle>{t('projects:brief')}</SideBarTitle>*/}
      {/*        <SideBarParagraph>{t(`${projectName}:briefDescription`)}</SideBarParagraph>*/}

      {/*        <SideBarTitle>{t('projects:projectPage')}</SideBarTitle>*/}
      {/*        {*/}
      {/*          Object.entries(t(`${projectName}:projectPages`,*/}
      {/*            { returnObjects: true }) as ProjectPageProps[]*/}
      {/*          ).map(([key, value]) => (*/}
      {/*            <SideBarParagraph key={value.link}>*/}
      {/*              <a className={'inline-link en'} href={value.link}>{value.text}</a>*/}
      {/*            </SideBarParagraph>*/}
      {/*          ))*/}
      {/*        }*/}

      {/*        <SideBarTitle>{t('projects:license')}</SideBarTitle>*/}
      {/*        <SideBarParagraph>{t('projects:licensedBy')} {t(`${projectName}:license`)}</SideBarParagraph>*/}

      {/*        <SideBarTitle>{t('projects:techStack')}</SideBarTitle>*/}
      {/*        <ImageWrapper>*/}
      {/*          {*/}
      {/*            (t(`${projectName}:techStack`, { returnObjects: true }) as TechStackProps[])*/}
      {/*              .map((item: TechStackProps, index) => (*/}
      {/*                <Image*/}
      {/*                  key={index}*/}
      {/*                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/technologies-badges/${item.src}.svg`}*/}
      {/*                  className={'tech-stack-img'}*/}
      {/*                  width={item.width}*/}
      {/*                  height={item.height}*/}
      {/*                  alt={item.src}*/}
      {/*                />*/}
      {/*              ))*/}
      {/*          }*/}
      {/*        </ImageWrapper>*/}
      {/*      </SideBarProjectInfo>*/}
      {/*    </SideBar>*/}


      {/*    {*/}
      {/*      (t(`${projectName}:content`, { returnObjects: true }) as ProjectContentObject[])*/}
      {/*        .map((item: ProjectContentObject | string, index) => (*/}
      {/*          <div key={index}>*/}
      {/*            {typeof item === 'string' ? (*/}
      {/*              <ProjectParagraph*/}
      {/*                dangerouslySetInnerHTML={{ __html: item }}*/}
      {/*              />*/}
      {/*            ) : (item.type === 'title' || item.type === 'subtitle' || item.type === 'subsubtitle') ? (*/}
      {/*              <ProjectParagraph*/}
      {/*                className={item.type}*/}
      {/*                ref={getRefByName(item.content)}*/}
      {/*              >{item.content}</ProjectParagraph>*/}
      {/*            ) : ((isArticleCode(item)) ? (*/}
      {/*              <CodeHighlighter*/}
      {/*                language={item.lang}*/}
      {/*                code={item.content}*/}
      {/*              />*/}
      {/*            ) : ((item.type === 'list-bullet' || item.type === 'list-numeric') ? (*/}
      {/*              generateLists(item.items, locale, item.type, item.style)*/}
      {/*            ) : (*/}
      {/*              ((item.type === 'picture') ? (*/}
      {/*                <ImageContainer className={`${item.width}`}>*/}
      {/*                  <Image*/}
      {/*                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${projectName}/${item.resource}`}*/}
      {/*                    alt={item.resource as string}*/}
      {/*                    className={'image'}*/}
      {/*                    fill*/}
      {/*                  />*/}
      {/*                </ImageContainer>*/}
      {/*              ) : (<></>))*/}
      {/*              )*/}
      {/*            ))}*/}
      {/*          </div>*/}
      {/*        ))*/}
      {/*    }*/}
      {/*  </Container>*/}
      {/*</DefaultLayout>*/}
    </>
  );
};

// export const getServerSideProps = async (ctx: any) => {
//   const staticProps = await makeStaticProps()(ctx);
//   const props = staticProps.props;
//
//   return {
//     props: {
//       ...props
//     }
//   };
// };

export async function getStaticPaths() {
  // @ts-ignore
  const languages = process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(',');
  // @ts-ignore
  const projects = process.env.NEXT_PUBLIC_AVAILABLE_PROJECTS.split(',');

  const paths: { params: { projectName: string; locale: string; }; }[] = [];
  languages.forEach((lang) => {
    projects.forEach((project) => {
      paths.push({
        params: { projectName: project, locale: lang }
      });
    });
  });

  return { paths, fallback: true };
}


export async function getStaticProps({ params }: { params: any }) {
  const { locale, projectName } = params;

  const { getProject } = getProjectService();
  const project = await getProject({ slug: projectName, locale });

  return { props: { project } };
}


export default Project;
