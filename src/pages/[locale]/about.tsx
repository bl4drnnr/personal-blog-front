import React from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Typewriter from 'typewriter-effect';

import PostFooter from '@components/PostFooter/PostFooter.component';
import DefaultLayout from '@layouts/Default.layout';
import { getStaticPaths, makeStaticProps } from '@lib/getStatic';
import {
  AboutParagraph,
  AboutTitle,
  Box,
  Timeline,
  Container,
  ImageBox,
  SharingLi,
  SharingUl,
  TimelineItem,
  TimelineItemWrapper,
  TimelineItemDescription,
  TimelineItemText,
  TestimonialGrid,
  TestimonialArticle,
  CertTitle,
  CertDescription
} from '@styles/about.style';


interface AboutProps {
  locale: string;
}

interface BadgeProps {
  src: string;
  width: number;
  height: number;
}

interface CareerPath {
  image: string;
  name: string;
  workingPeriod: string;
  description: string[];
  page: string;
}

interface Cert {
  title: string;
  link: string;
  image: string;
  description: string;
}

const About = ({ locale }: AboutProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [programmingLanguages, ] = React.useState<Array<BadgeProps>>([
    { src: 'javascript', width: 126, height: 28 },
    { src: 'typescript', width: 126, height: 28 },
    { src: 'python', width: 98, height: 28 }
  ]);
  const [frontFrameworks, ] = React.useState<Array<BadgeProps>>([
    { src: 'vuedotjs', width: 85, height: 28 },
    { src: 'nuxtdotjs', width: 85, height: 28 },
    { src: 'react', width: 85, height: 28 },
    { src: 'next.js', width: 85, height: 28 },
    { src: 'angular', width: 106, height: 28 }
  ]);
  const [backFrameworks, ] = React.useState<Array<BadgeProps>>([
    { src: 'express', width: 122, height: 28 },
    { src: 'nestjs', width: 92, height: 28 },
    { src: 'django', width: 92, height: 28 },
    { src: 'flask', width: 92, height: 28 }
  ]);

  const [otherTechs, ] = React.useState<Array<BadgeProps>>([
    { src: 'amazon-aws', width: 74, height: 28 },
    { src: 'digitalOcean', width: 130, height: 28 },
    { src: 'Cloudflare', width: 130, height: 28 },
    { src: 'docker', width: 92, height: 28 },
    { src: 'kubernetes', width: 120, height: 28 },
    { src: 'ansible', width: 100, height: 28 },
    { src: 'terraform', width: 120, height: 28 }
  ]);

  const [osTechs, ] = React.useState<Array<BadgeProps>>([
    { src: 'windows', width: 113, height: 28 },
    { src: 'linux', width: 86, height: 28 },
    { src: 'macos', width: 94, height: 28 },
    { src: 'Raspberry-Pi', width: 138, height: 28 }
  ]);

  const [careers, setCareers] = React.useState<Array<CareerPath>>([]);
  const [certs, setCerts] = React.useState<Array<Cert>>([]);

  const getImage = (item: BadgeProps) => {
    return (
      <Image
        key={item.src}
        src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/technologies-badges/${item.src}.svg`}
        className={'img'}
        alt={item.src}
        width={item.width}
        height={item.height}
      />
    );
  };

  const handleRedirect = async (path: string) => {
    await router.push(path);
  };

  React.useEffect(() => {
    const previousJobs: CareerPath[] = t(
      'pages:about.careerPath.careers', { returnObjects: true }
    );
    const allCerts: Cert[] = t(
      'pages:about.achievements.certs', { returnObjects: true }
    );

    setCerts(allCerts);
    setCareers(previousJobs);
  }, []);

  return (
    <>
      <Head>
        <title>{t('pages:home.name')} | {t('pages:about.title')}</title>
        <meta name={'keywords'} content={'mikhail bahdashych,mikhail,bahdashych,blog,cybersecurity,portfolio'} />
        <meta name={'description'} content={'Hello there! My name is Mikhail Bahdashych and this is my personal blog - place where I share my thoughts and knowledge. Hope you will find something interesting.'} />
      </Head>
      <DefaultLayout locale={locale} translation={t}>
        <Container className={locale === 'en' ? 'en' : 'non-en'}>
          <Box>
            <AboutTitle>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.thanks'))
                    .start();
                }}
              />
            </AboutTitle>
            <AboutTitle className={classNames('description')}>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.appreciating'))
                    .start();
                }}
              />
            </AboutTitle>
          </Box>
          <Box>
            <AboutParagraph>
              {t('pages:about.reasonForReading')}
            </AboutParagraph>
            <SharingUl>
              {
                Object.entries(t('pages:about.sharingKnowledge', { returnObjects: true }) as Array<string | object>)
                  .map(([key, value]) => (
                    <SharingLi
                      key={key}
                      dangerouslySetInnerHTML={{ __html: value }}
                    />
                  ))
              }
            </SharingUl>
            <AboutParagraph dangerouslySetInnerHTML={{ __html: t('pages:about.overall') }} />
          </Box>
          <Box>
            <AboutTitle>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.whatDoIKnow'))
                    .start();
                }}
              />
            </AboutTitle>
          </Box>
          <Box>
            {[...Array(2)].map((item, index) => (
              <AboutParagraph key={index}>
                {t(`pages:about.whatIKnow.p${index}`)}
              </AboutParagraph>
            ))}
            <ImageBox>
              {programmingLanguages.map((item) => ( getImage(item) ))}
            </ImageBox>
            <AboutParagraph>
              {t('pages:about.whatIKnow.p2')}
            </AboutParagraph>
            <ImageBox>
              {frontFrameworks.map((item) => ( getImage(item) ))}
            </ImageBox>
            <ImageBox>
              {backFrameworks.map((item) => ( getImage(item) ))}
            </ImageBox>
            <AboutParagraph>
              {t('pages:about.whatIKnow.p3')}
            </AboutParagraph>
            <ImageBox>
              {otherTechs.slice(0, 3).map((item) => ( getImage(item) ))}
            </ImageBox>
            <ImageBox>
              {otherTechs.slice(3).map((item) => ( getImage(item) ))}
            </ImageBox>
            <AboutParagraph>
              {t('pages:about.whatIKnow.p4')}
            </AboutParagraph>
            <ImageBox>
              {osTechs.map((item) => ( getImage(item) ))}
            </ImageBox>
            <AboutParagraph>
              {t('pages:about.whatIKnow.p5')}
            </AboutParagraph>
          </Box>
          <Box>
            <AboutTitle>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.careerPath.title'))
                    .start();
                }}
              />
            </AboutTitle>
            <Timeline>
              {careers.map((item) => (
                <TimelineItem key={item.name}>
                  <TimelineItemWrapper onClick={() => handleRedirect(item.page)}>
                    <Image
                      className={'image'}
                      src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/career/${item.image}`}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <TimelineItemDescription>
                      <TimelineItemText className={'title'}>{item.name}</TimelineItemText>
                      <TimelineItemText className={'date'}>{item.workingPeriod}</TimelineItemText>
                      {item.description.map((descItem) => (
                        <TimelineItemText key={descItem}>{descItem}</TimelineItemText>
                      ))}
                    </TimelineItemDescription>
                  </TimelineItemWrapper>
                </TimelineItem>
              ))}
            </Timeline>
          </Box>
          <Box>
            <AboutTitle>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.achievements.title'))
                    .start();
                }}
              />
            </AboutTitle>
            <TestimonialGrid>
              {certs.map((cert) => (
                <TestimonialArticle
                  key={cert.title}
                  onClick={() => handleRedirect(`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/career/${cert.link}`)}
                >
                  <Image
                    className={'image'}
                    src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/career/${cert.image}`}
                    alt={cert.title}
                    fill
                  />
                  <CertTitle>{cert.title}</CertTitle>
                  <CertDescription>{cert.description}</CertDescription>
                </TestimonialArticle>
              ))}
            </TestimonialGrid>
          </Box>
          <Box>
            <AboutTitle>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .changeDelay(75)
                    .typeString(t('pages:about.contactMe'))
                    .start();
                }}
              />
            </AboutTitle>
          </Box>
          <Box>
            <AboutParagraph>{t('pages:about.contactInfo')}</AboutParagraph>
            <PostFooter locale={locale} />
          </Box>
        </Container>
      </DefaultLayout>
    </>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default About;
