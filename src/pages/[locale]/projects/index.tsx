import React from 'react';

import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';

import BasicButton from '@components/BasicButton/BasicButton.component';
import BasicInput from '@components/BasicInput/BasicInput.component';
import Modal from '@components/Modal/Modal.component';
import { IProject } from '@interfaces/project.interface';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import { useGetProjectsService } from '@services/get-projects.service';
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

interface ProjectPageProps {
  locale: string;
}

const Projects = ({ locale }: ProjectPageProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [order, setOrder] = React.useState('By Created At');
  const [orderBy, setOrderBy] = React.useState('ASC');
  const [showFiltersModal, setShowFiltersModal] = React.useState(false);

  const [allProjects, setAllProjects] = React.useState<IProject[]>([]);
  const [foundProjects, setFoundProjects] = React.useState<IProject[]>([]);

  const { loading, getProjects } = useGetProjectsService();

  React.useEffect(() => {
    const orderOption = order === 'By Created At' ? 'created_at' : 'title';
    fetchProjects({
      page, pageSize, order: orderOption, orderBy, locale
    }).then(({ rows, count }) => {
      setAllProjects(rows);
    });
  }, []);

  React.useEffect(() => {
    const orderOption = order === 'By Created At' ? 'created_at' : 'title';
    fetchProjects({
      page, pageSize, order: orderOption, orderBy, locale, searchQuery
    }).then(({ rows, count }) => {
      setFoundProjects(rows);
    });
  }, [searchQuery]);

  React.useEffect(() => {
    const orderOption = order === 'By Created At' ? 'created_at' : 'title';
    fetchProjects({
      page, pageSize, order: orderOption, orderBy, locale, searchQuery
    }).then(({ rows, count }) => {
      setAllProjects(rows);
    });
  }, [order, orderBy]);

  const handleRedirect = async (path: string) => {
    await router.push(`/${locale}${path}`);
  };

  const fetchProjects = async ({
    page, pageSize, order, locale, orderBy, searchQuery
  }: {
    page: number;
    pageSize: number;
    order: string;
    locale: string;
    orderBy: string;
    searchQuery?: string
  }) => {
    return await getProjects({
      page, pageSize, order, locale, orderBy, searchQuery
    });
  };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:projects.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t} loading={loading}>
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
              value={searchQuery}
              placeholder={t('common:searchProjects')}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SettingsWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={orderBy}
                  onClick={() => setOrderBy(orderBy === 'ASC' ? 'DESC' : 'ASC')}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <BasicButton
                  text={order}
                  onClick={() => setOrder(order === 'By Created At' ? 'By Title' : 'By Created At')}
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

          {(foundProjects.length > 0 && searchQuery.length > 0) ? (
            foundProjects.map((project, index) => (
              <ProjectsWrapper
                key={index}
                className={'found-projects'}
                onClick={() => handleRedirect(`/projects/${project.slug}`)}
              >
                <FoundProjectWrapper>
                  <FlexWrapper>
                    <Image
                      className={'icon'}
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}
                      alt={'Fire'}
                      width={22}
                      height={22}
                    />
                    <Name>{project.title}</Name>
                  </FlexWrapper>
                  <Title>{project.brief}</Title>
                  <Description>{project.description}</Description>
                  <PostTags>
                    {project.projectTags.map((item, index) => (
                      <PostTag key={index}>{item}</PostTag>
                    ))}
                  </PostTags>
                </FoundProjectWrapper>
              </ProjectsWrapper>
            ))
          ) : ((foundProjects.length === 0 && searchQuery.length > 0) ? (
            <ProjectTitle>
              {t('common:projectsNotFound')}
            </ProjectTitle>
          ) : (
            allProjects.map((_, index) => {
              if ((index + 1) % 5 === 1 || index === 0) {
                return (
                  <TestimonialGrid key={index}>
                    {allProjects.slice(index, index + 5).map((project, idx) => (
                      <TestimonialArticle
                        key={idx}
                        onClick={() => handleRedirect(`/projects/${project.slug}`)}
                      >
                        <FlexWrapper>
                          <Image
                            className={'icon'}
                            src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}
                            alt={'Fire'}
                            width={22}
                            height={22}
                          />
                          <Name>{project.title}</Name>
                        </FlexWrapper>
                        <Title>{project.brief}</Title>
                        <Description>{project.description}</Description>
                        <PostTags>
                          {project.projectTags.map((item, index) => (
                            <PostTag key={index}>{item}</PostTag>
                          ))}
                        </PostTags>
                      </TestimonialArticle>
                    ))}
                  </TestimonialGrid>
                );
              }
            })
          ))}
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Projects;
