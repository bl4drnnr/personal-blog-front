import React from 'react';

import Head from 'next/head';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import BasicButton from '@components/BasicButton/BasicButton.component';
// import BasicInput from '@components/BasicInput/BasicInput.component';
// import Modal from '@components/Modal/Modal.component';
// import { OrderBy } from '@custom-types/order-by.type';
// import { Order } from '@custom-types/order.type';
// import { OrderOptions } from '@enums/order-option.enum';
// import { IInitFetchProjects } from '@interfaces/init-fetch-projects.interface';
// import { IProjectPreview } from '@interfaces/project-preview.interface';
import DefaultLayout from '@layouts/Default.layout';
// import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import { useGetProjectsService } from '@services/get-projects.service';
// import {
//   Container,
//   Title,
//   FlexWrapper,
//   Name,
//   Description,
//   ProjectsWrapper,
//   ProjectTitle,
//   TestimonialArticle,
//   TestimonialGrid,
//   InputWrapper,
//   SettingsWrapper,
//   PostTag,
//   PostTags,
//   FoundProjectWrapper,
//   ButtonWrapper
// } from '@styles/projects.style';

interface ProjectPageProps {
  locale: string;
}

const Projects = ({ locale }: ProjectPageProps) => {
  const { t } = useTranslation();
  // const router = useRouter();
  //
  // const [searchQuery, setSearchQuery] = React.useState('');
  // const [page, setPage] = React.useState(0);
  // const [pageSize, setPageSize] = React.useState(10);
  // const [order, setOrder] = React.useState<Order>('By creation date');
  // const [orderBy, setOrderBy] = React.useState<OrderBy>('ASC');
  // const [showFiltersModal, setShowFiltersModal] = React.useState(false);
  //
  // const [allProjects, setAllProjects] = React.useState<IProjectPreview[]>([]);
  // const [foundProjects, setFoundProjects] = React.useState<IProjectPreview[]>([]);
  //
  const { loading, getProjects } = useGetProjectsService();

  // React.useEffect(() => {
  //   initFetchProjects({
  //       q: searchQuery,
  //       o: order,
  //       oBy: orderBy
  //     }).then();
  // }, []);

  // const handleRedirect = async (path: string) => {
  //   await router.push(`/${locale}${path}`);
  // };
  //
  // const initFetchProjects = async ({
  //   q, o, oBy
  // }: IInitFetchProjects) => {
  //   const orderOption = o === 'By creation date'
  //     ? OrderOptions.CREATED_AT
  //     : OrderOptions.TITLE;
  //
  //   setSearchQuery(q);
  //   setOrderBy(oBy);
  //   setOrder(o);
  //
  //   fetchProjects({
  //     page,
  //     pageSize,
  //     locale,
  //     orderBy: oBy,
  //     searchQuery: q,
  //     order: orderOption
  //   }).then(({ rows }) => {
  //     if (q && rows.length) setFoundProjects(rows);
  //     else setAllProjects(rows);
  //   });
  // };
  //
  // const fetchProjects = async ({
  //   page, pageSize, order, locale, orderBy, searchQuery
  // }: {
  //   page: number;
  //   pageSize: number;
  //   order: string;
  //   locale: string;
  //   orderBy: string;
  //   searchQuery?: string
  // }) => {
  //   return await getProjects({
  //     page, pageSize, order, locale, orderBy, searchQuery
  //   });
  // };

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:projects.title')}</title>
      </Head>
      <DefaultLayout locale={locale} translation={t} loading={loading}>
        {/*<Container className={locale === 'en' ? 'en' : 'non-en'}>*/}
        {/*  <InputWrapper>*/}
        {/*    <BasicInput*/}
        {/*      locale={locale}*/}
        {/*      value={searchQuery}*/}
        {/*      placeholder={t('common:searchProjects')}*/}
        {/*      onChange={(e) => initFetchProjects({*/}
        {/*        q: e.target.value,*/}
        {/*        o: order,*/}
        {/*        oBy: orderBy*/}
        {/*      })}*/}
        {/*    />*/}
        {/*    <SettingsWrapper>*/}
        {/*      <ButtonWrapper>*/}
        {/*        <BasicButton*/}
        {/*          text={orderBy}*/}
        {/*          onClick={() => initFetchProjects({*/}
        {/*            q: searchQuery,*/}
        {/*            o: order,*/}
        {/*            oBy: orderBy === 'ASC' ? 'DESC' : 'ASC',*/}
        {/*          })}*/}
        {/*        />*/}
        {/*      </ButtonWrapper>*/}
        {/*      <ButtonWrapper>*/}
        {/*        <BasicButton*/}
        {/*          text={order}*/}
        {/*          onClick={() => initFetchProjects({*/}
        {/*            q: searchQuery,*/}
        {/*            o: order === 'By creation date' ? 'By title' : 'By creation date',*/}
        {/*            oBy: orderBy*/}
        {/*          })}*/}
        {/*        />*/}
        {/*      </ButtonWrapper>*/}
        {/*      <ButtonWrapper>*/}
        {/*        <BasicButton*/}
        {/*          text={'Show filters'}*/}
        {/*          onClick={() => setShowFiltersModal(!showFiltersModal)}*/}
        {/*        />*/}
        {/*      </ButtonWrapper>*/}

        {/*      {showFiltersModal && (*/}
        {/*        <Modal*/}
        {/*          onClose={() => setShowFiltersModal(false)}*/}
        {/*          header={'Filters'}*/}
        {/*          description={''}*/}
        {/*        >*/}
        {/*          <p>Test</p>*/}
        {/*        </Modal>*/}
        {/*      )}*/}
        {/*    </SettingsWrapper>*/}
        {/*  </InputWrapper>*/}

        {/*  {(foundProjects.length > 0 && searchQuery.length > 0) ? (*/}
        {/*    foundProjects.map((project, index) => (*/}
        {/*      <ProjectsWrapper*/}
        {/*        key={index}*/}
        {/*        className={'found-projects'}*/}
        {/*        onClick={() => handleRedirect(`/projects/${project.slug}`)}*/}
        {/*      >*/}
        {/*        <FoundProjectWrapper>*/}
        {/*          <FlexWrapper>*/}
        {/*            <Image*/}
        {/*              className={'icon'}*/}
        {/*              src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}*/}
        {/*              alt={'Fire'}*/}
        {/*              width={22}*/}
        {/*              height={22}*/}
        {/*            />*/}
        {/*            <Name>{project.title}</Name>*/}
        {/*          </FlexWrapper>*/}
        {/*          <Title>{project.brief}</Title>*/}
        {/*          <Description>{project.description}</Description>*/}
        {/*          <PostTags>*/}
        {/*            {project.projectTags.map((item, index) => (*/}
        {/*              <PostTag key={index}>{item}</PostTag>*/}
        {/*            ))}*/}
        {/*          </PostTags>*/}
        {/*        </FoundProjectWrapper>*/}
        {/*      </ProjectsWrapper>*/}
        {/*    ))*/}
        {/*  ) : ((foundProjects.length === 0 && searchQuery.length > 0) ? (*/}
        {/*    <ProjectTitle>*/}
        {/*      {t('common:projectsNotFound')}*/}
        {/*    </ProjectTitle>*/}
        {/*  ) : (*/}
        {/*    allProjects.map((_, index) => {*/}
        {/*      if ((index + 1) % 5 === 1 || index === 0) {*/}
        {/*        return (*/}
        {/*          <TestimonialGrid key={index}>*/}
        {/*            {allProjects.slice(index, index + 5).map((project, idx) => (*/}
        {/*              <TestimonialArticle*/}
        {/*                key={idx}*/}
        {/*                onClick={() => handleRedirect(`/projects/${project.slug}`)}*/}
        {/*              >*/}
        {/*                <FlexWrapper>*/}
        {/*                  <Image*/}
        {/*                    className={'icon'}*/}
        {/*                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/icons/fire.png`}*/}
        {/*                    alt={'Fire'}*/}
        {/*                    width={22}*/}
        {/*                    height={22}*/}
        {/*                  />*/}
        {/*                  <Name>{project.title}</Name>*/}
        {/*                </FlexWrapper>*/}
        {/*                <Title>{project.brief}</Title>*/}
        {/*                <Description>{project.description}</Description>*/}
        {/*                <PostTags>*/}
        {/*                  {project.projectTags.map((item, index) => (*/}
        {/*                    <PostTag key={index}>{item}</PostTag>*/}
        {/*                  ))}*/}
        {/*                </PostTags>*/}
        {/*              </TestimonialArticle>*/}
        {/*            ))}*/}
        {/*          </TestimonialGrid>*/}
        {/*        );*/}
        {/*      }*/}
        {/*    })*/}
        {/*  ))}*/}
        {/*</Container>*/}
      </DefaultLayout>
    </>
  );
};

// const getStaticProps = makeStaticProps();
// export { getStaticPaths, getStaticProps };

export default Projects;
