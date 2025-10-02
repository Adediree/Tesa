'use client';

import Link from 'next/link';
import { Clock, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Badge } from '@/components/base/Badge';
import { Button } from '@/components/base/Button';
import { Spinner } from '@/components/base/Spinner';
import { useGetSpecializationByIdQuery, useGetCoursesQuery } from '@/lib/api/catalogApi';
import { ROUTES } from '@/constants/routes';
import styles from './page.module.css';

export default function SpecializationDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: specialization, isLoading } = useGetSpecializationByIdQuery(id);
  const { data: courses } = useGetCoursesQuery({ specializationId: id });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.loading}>
          <Spinner size="lg" label="Loading..." />
        </div>
      </>
    );
  }

  if (!specialization) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h2">Specialization not found</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Container>
          <div className={styles.hero}>
            <img src={specialization.image} alt={specialization.title} className={styles.heroImage} />
            <Typography variant="h1">{specialization.title}</Typography>
            <Typography variant="bodyLarge" color="muted">
              {specialization.description}
            </Typography>
          </div>

          <div className={styles.pathways}>
            {specialization.pathways.map((pathway) => {
              const pathwayCourses = courses?.filter((c) => pathway.courseIds.includes(c.id)) || [];

              return (
                <div key={pathway.id} className={styles.pathway}>
                  <div className={styles.pathwayHeader}>
                    <Typography variant="h2">{pathway.title}</Typography>
                    <Badge variant="primary">{pathway.level}</Badge>
                  </div>
                  <Typography variant="body" color="muted">
                    {pathway.description}
                  </Typography>

                  {pathwayCourses.length > 0 && (
                    <div className={styles.coursesGrid}>
                      {pathwayCourses.map((course) => (
                        <Card key={course.id} hoverable className={styles.courseCard}>
                          <Card.Header noPadding>
                            <img src={course.image} alt={course.title} className={styles.courseImage} />
                          </Card.Header>
                          <Card.Body className={styles.courseContent}>
                            <Typography variant="h4">{course.title}</Typography>
                            <Typography variant="bodySmall" color="muted">
                              {course.description}
                            </Typography>
                            <div className={styles.courseMeta}>
                              <Typography variant="caption">
                                <User size={14} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
                                {course.instructor}
                              </Typography>
                              <Typography variant="caption">
                                <Clock size={14} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
                                {course.duration}
                              </Typography>
                              <Badge variant="secondary">{course.level}</Badge>
                            </div>
                          </Card.Body>
                          <Card.Footer>
                            <Link href={ROUTES.CATALOG.COURSE_DETAIL(course.id)}>
                              <Button variant="outline" fullWidth>
                                View Course
                              </Button>
                            </Link>
                          </Card.Footer>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </main>
    </>
  );
}
