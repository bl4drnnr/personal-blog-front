import React, { RefObject } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CodeHighlighter from '@components/CodeHighlighter/CodeHighlighter.component';
import { IProject } from '@interfaces/project.interface';
import DefaultLayout from '@layouts/Default.layout';
import { isItemCode, isItemList, isItemParagraph, isItemPicture, isItemTitle } from '@lib/checkType';
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
import { generateLists } from '@utils/GenerateList.util';
import { generateTableOfContents } from '@utils/GenerateToC.util';

interface ProjectProps {
  project: IProject;
  locale: string;
}

const Project = ({ project, locale }: ProjectProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  return (
    <>
      <Head>
        <title>Mikhail Bahdashcyh | {project.title}</title>
        <meta name={'keywords'} content={project.tags} />
        <meta name={'description'} content={project.description} />
        <meta charSet={'utf-8'} />
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <Container className={locale === 'en' ? 'en' : 'non-en'}>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectBrief>{project.brief}</ProjectBrief>
          <ProjectHr />

          <SideBar>
            <SideBarTableOfContents>
              {generateTableOfContents(project.toc)}
            </SideBarTableOfContents>

            <SideBarProjectInfo>
              <SideBarTitle>{t('projects:brief')}</SideBarTitle>
              <SideBarParagraph>{project.briefDescription}</SideBarParagraph>

              <SideBarTitle>{t('projects:projectPage')}</SideBarTitle>
              {
                Object.entries(project.projectPages)
                  .map(([key, value]) => (
                  <SideBarParagraph key={value.link}>
                    <a className={'inline-link en'} href={value.link}>{value.text}</a>
                  </SideBarParagraph>
                ))
              }

              <SideBarTitle>{t('projects:license')}</SideBarTitle>
              <SideBarParagraph>{t('projects:licensedBy')} {project.license}</SideBarParagraph>

              <SideBarTitle>{t('projects:techStack')}</SideBarTitle>
              <ImageWrapper>
                {
                  project.techStack
                    .map((item, index) => (
                      <Image
                        key={index}
                        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/technologies-badges/${item.src}.svg`}
                        className={'tech-stack-img'}
                        width={item.width}
                        height={item.height}
                        alt={item.src}
                      />
                    ))
                }
              </ImageWrapper>
            </SideBarProjectInfo>
          </SideBar>


          {
            project.content
              .map((item, index) => (
                <div key={index}>
                  {isItemParagraph(item) ? (
                    <ProjectParagraph
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  ) : isItemTitle(item) ? (
                    <ProjectParagraph
                      className={item.type}
                    >{item.content}</ProjectParagraph>
                  ) : isItemCode(item) ? (
                    <CodeHighlighter
                      language={item.lang}
                      code={item.content}
                    />
                  ) : isItemList(item) ? (
                    generateLists(item.items, locale, item.type, item.style)
                  ) : isItemPicture(item) ? (
                      <ImageContainer className={item.width}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${project.slug}/${item.resource}`}
                          alt={item.resource as string}
                          className={'image'}
                          fill
                        />
                      </ImageContainer>
                    ) : null
                  }
                </div>
              ))
          }
        </Container>
      </DefaultLayout>
    </>
  );
};

export async function getStaticPaths() {
  const headers = new Headers();

  headers.set('Authorization', 'Basic ' + Buffer.from(
    process.env.DATA_API_USERNAME + ':' + process.env.DATA_API_PASSWORD
  ).toString('base64'));

  const res = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/projects/get-all-slugs`,
    { headers }
  );

  const slugs = await res.json();

  const languages = ['pl', 'ru', 'en'];

  const paths: { params: { projectName: string; locale: string; }; }[] = [];

  languages.forEach((lang: string) => {
    slugs.forEach((slug: string) => {
      paths.push({
        params: { projectName: slug, locale: lang }
      });
    });
  });

  return { paths, fallback: false };
}


export async function getStaticProps({ params }: { params: any }) {
  const { locale, projectName } = params;
  const ns = ['common', 'components', 'pages', 'projects'];

  const headers = new Headers();

  headers.set('Authorization', 'Basic ' + Buffer.from(
    process.env.DATA_API_USERNAME + ':' + process.env.DATA_API_PASSWORD
  ).toString('base64'));

  const res = await fetch(
    `${process.env.LOCAL_DATA_API_URL}/projects/get-by-slug?language=${locale}&slug=${projectName}`,
    { headers }
  );
  const project = await res.json();

  return { props: { project, locale, ...(await serverSideTranslations(locale, ns)) } };
}


export default Project;
