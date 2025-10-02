'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CirclePlay as PlayCircle, CircleCheck as CheckCircle, Clock, BookOpen, Lock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { Spinner } from '@/components/base/Spinner';
import { useGetCourseByIdQuery } from '@/lib/api/catalogApi';
import { useGetModulesByCourseIdQuery, useGetCourseProgressQuery } from '@/lib/api/courseApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';

export default function CoursePlayerPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const { courseId } = params;
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(courseId);
  const { data: modules, isLoading: modulesLoading } = useGetModulesByCourseIdQuery(courseId);
  const { data: progress } = useGetCourseProgressQuery(
    { userId: user?.id || '', courseId },
    { skip: !user?.id }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (courseLoading || modulesLoading) {
    return (
      <>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Spinner size="lg" label="Loading course..." />
        </div>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h2">Course not found</Typography>
        </Container>
      </>
    );
  }

  const completedModules = progress?.completedModules || [];
  const completionPercentage = progress?.completionPercentage || 0;

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-8)' }}>
            <Card>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <div>
                    <Typography variant="h2">{course.title}</Typography>
                    <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                      {course.description}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                    <Badge variant="primary">{course.level}</Badge>
                    <Typography variant="bodySmall" color="muted">
                      <Clock size={16} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
                      {course.duration}
                    </Typography>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                      <Typography variant="bodySmall">Your Progress</Typography>
                      <Typography variant="bodySmall" color="primary">{completionPercentage}%</Typography>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--color-neutral-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${completionPercentage}%`, backgroundColor: 'var(--color-primary-600)', transition: 'width var(--transition-base)' }} />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div>
              <Typography variant="h3" style={{ marginBottom: 'var(--spacing-6)' }}>Course Modules</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                {modules?.map((module, index) => {
                  const isCompleted = completedModules.includes(module.id);
                  const isLocked = index > 0 && !completedModules.includes(modules[index - 1].id);

                  return (
                    <Card key={module.id} hoverable={!isLocked}>
                      <Card.Body>
                        <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
                          <div style={{ flexShrink: 0 }}>
                            {isCompleted ? (
                              <CheckCircle size={32} style={{ color: 'var(--color-success-600)' }} />
                            ) : isLocked ? (
                              <Lock size={32} style={{ color: 'var(--color-neutral-400)' }} />
                            ) : (
                              <PlayCircle size={32} style={{ color: 'var(--color-primary-600)' }} />
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <Typography variant="h4">
                              Module {index + 1}: {module.title}
                            </Typography>
                            <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                              {module.description}
                            </Typography>
                            <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-3)', alignItems: 'center' }}>
                              <Typography variant="bodySmall" color="muted">
                                <Clock size={14} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
                                {module.duration}
                              </Typography>
                              <Typography variant="bodySmall" color="muted">
                                <BookOpen size={14} style={{ display: 'inline', marginRight: 'var(--spacing-1)' }} />
                                {module.content.length} lessons
                              </Typography>
                            </div>
                          </div>
                          <div>
                            {isLocked ? (
                              <Button variant="ghost" disabled>
                                Locked
                              </Button>
                            ) : (
                              <Link href={ROUTES.DASHBOARD.MODULE(courseId, module.id)}>
                                <Button variant={isCompleted ? 'outline' : 'primary'}>
                                  {isCompleted ? 'Review' : 'Start'}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
