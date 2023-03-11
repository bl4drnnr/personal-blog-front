import React from 'react';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import BasicButton from '@components/BasicButton/BasicButton.component';
import BasicInput from '@components/BasicInput/BasicInput.component';
import Modal from '@components/Modal/Modal.component';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  Container,
  Title,
  FlexWrapper,
  Name,
  Description,
  ProjectsDescription,
  ProjectsWrapper,
  ProjectTitle,
  TestimonialArticle,
  TestimonialGrid,
  InputWrapper,
  SettingsWrapper,
  PostTag,
  PostTags, FoundProjectWrapper, ButtonWrapper
} from '@styles/projects.style';

interface ProjectProps {
  title: string;
  brief: string;
  description: string;
  link: string;
  icon: string;
  searchTags: string[];
}

interface ProjectPageProps {
  locale: string;
}

const Projects = ({ locale }: ProjectPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchString, setSearchString] = React.useState('');
  const [nameSort, setNameSort] = React.useState('');
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);

  const [allProjects, setAllProjects] = React.useState<ProjectProps[]>([]);
  const [foundProjects, setFoundProjects] = React.useState<ProjectProps[]>([]);

  // React.useEffect(() => {
  //   // @ts-ignore
  //   const allAvailableProjects = process.env.NEXT_PUBLIC_AVAILABLE_PROJECTS.split(',');
  //   const projects: ProjectProps[] = [];
  //
  //   allAvailableProjects.forEach((project) => {
  //     projects.push({
  //       title: t(`${project}:title`),
  //       brief: t(`${project}:brief`),
  //       description: t(`${project}:description`),
  //       link: `/projects/${project}`,
  //       icon: 'fire.png',
  //       searchTags: t(`${project}:searchTags`, { returnObjects: true }),
  //     });
  //   });
  //
  //   setAllProjects(projects);
  // }, []);

  React.useEffect(() => {
    const foundSearchProjects: ProjectProps[] = [];

    allProjects.forEach((project) => {
      if (
        (searchString && project.title.toLowerCase().includes(searchString.toLowerCase())) ||
        (searchString && project.searchTags.join(',').includes(searchString.toLowerCase()))
      ) {
        foundSearchProjects.push(project);
      }
    });

    setFoundProjects(foundSearchProjects);
  }, [searchString]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const sortByName = (sortType: string) => {
    const currentProjects = allProjects;

    if (sortType !== '' && sortType === 'A -> Z') {
      setNameSort('Z -> A');
      currentProjects.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      setNameSort('A -> Z');
      currentProjects.sort((a, b) => a.title.localeCompare(b.title));
    }

    setAllProjects(currentProjects);
  };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:projects.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <ProjectsWrapper>
          <ProjectTitle>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(75)
                  .typeString(t('pages:projects.description'))
                  .start();
              }}
            />
          </ProjectTitle>
          <ProjectsDescription className={'margins'}>
            {t('pages:projects.description2')}
          </ProjectsDescription>
        </ProjectsWrapper>

        <Container className={locale === 'en' ? 'en' : 'non-en'}>
          <InputWrapper>
            <BasicInput
              locale={locale}
              value={searchString}
              placeholder={t('common:searchProjects')}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <SettingsWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={nameSort !== '' ? nameSort : 'A-Z'}
                  onClick={() => sortByName(nameSort)}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={'Show filters'}
                  onClick={() => setShowFiltersModal(!showFiltersModal)}
                />
              </ButtonWrapper>

              {showFiltersModal && (
                <Modal
                  onClose={() => setShowFiltersModal(false)}
                  header={'Filters'}
                  description={''}
                >
                  <p>Test</p>
                </Modal>
              )}
            </SettingsWrapper>
          </InputWrapper>

          {foundProjects.length > 0 ? (
            foundProjects.map((project, index) => (
              <ProjectsWrapper
                key={index}
                className={'found-projects'}
                onClick={() => handleRedirect(project.link)}
              >
                <FoundProjectWrapper>
                  <FlexWrapper>
                    <Image
                      className={'icon'}
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${project.icon}`}
                      alt={'Fire'}
                      width={22}
                      height={22}
                    />
                    <Name>{project.title}</Name>
                  </FlexWrapper>
                  <Title>{project.brief}</Title>
                  <Description>{project.description}</Description>
                  <PostTags>
                    {/*{project.searchTags.map((item, index) => (*/}
                    {/*  <PostTag key={index}>{item}</PostTag>*/}
                    {/*))}*/}
                  </PostTags>
                </FoundProjectWrapper>
              </ProjectsWrapper>
            ))
          ) : ((foundProjects.length === 0 && searchString.length > 0) ? (
            <ProjectTitle>
              {t('common:projectsNotFound')}
            </ProjectTitle>
          ) : (
            <></>
            // allProjects.map((_, index) => {
            //   if ((index + 1) % 5 === 1 || index === 0) {
            //     return (
            //       <TestimonialGrid>
            //         {allProjects.slice(index, index + 5).map((project, idx) => (
            //           <TestimonialArticle
            //             key={idx}
            //             onClick={() => handleRedirect(project.link)}
            //           >
            //             <FlexWrapper>
            //               <Image
            //                 className={'icon'}
            //                 src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/${project.icon}`}
            //                 alt={'Fire'}
            //                 width={22}
            //                 height={22}
            //               />
            //               <Name>{project.title}</Name>
            //             </FlexWrapper>
            //             <Title>{project.brief}</Title>
            //             <Description>{project.description}</Description>
            //             <PostTags>
            //               {project.searchTags.map((item, index) => (
            //                 <PostTag key={index}>{item}</PostTag>
            //               ))}
            //             </PostTags>
            //           </TestimonialArticle>
            //         ))}
            //       </TestimonialGrid>
            //     );
            //   }
            // })
          ))}
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Projects;
