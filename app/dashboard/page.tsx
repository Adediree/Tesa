'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Trophy, Target } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { Spinner } from '@/components/base/Spinner';
import { useGetUserEnrollmentsQuery, useGetCourseProgressQuery } from '@/lib/api/courseApi';
import { useGetCourseByIdQuery } from '@/lib/api/catalogApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';
import { calculatePercentage } from '@/lib/utils';
import styles from './page.module.css';

function EnrolledCourse({ courseId, userId }: { courseId: string; userId: string }) {
  const { data: course } = useGetCourseByIdQuery(courseId);
  const { data: progress } = useGetCourseProgressQuery({ userId, courseId });

  if (!course) return null;

  const completionPercentage = progress?.completionPercentage || 0;

  return (
    <Card>
      <Card.Body>
        <div className={styles.courseCard}>
          <img src={course.image} alt={course.title} className={styles.courseImage} />
          <div className={styles.courseContent}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Typography variant="h4">{course.title}</Typography>
              <Badge variant="primary">{course.level}</Badge>
            </div>
            <Typography variant="bodySmall" color="muted">
              {course.instructor}
            </Typography>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-2)' }}>
                <Typography variant="bodySmall">Progress</Typography>
                <Typography variant="bodySmall" color="primary">
                  {completionPercentage}%
                </Typography>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${completionPercentage}%` }} />
              </div>
            </div>
            <Link href={ROUTES.DASHBOARD.COURSE_CONTENT(courseId)}>
              <Button variant="primary">Continue Learning</Button>
            </Link>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: enrollments, isLoading } = useGetUserEnrollmentsQuery(user?.id || '', {
    skip: !user?.id,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <>
        <Header />
        <div className={styles.emptyState}>
          <Spinner size="lg" label="Loading..." />
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Container>
          <div className={styles.header}>
            <Typography variant="h1">Welcome back, {user.name}!</Typography>
            <Typography variant="bodyLarge" color="muted">
              Continue your learning journey
            </Typography>
          </div>

          <div className={styles.grid}>
            <div className={styles.courses}>
              <Typography variant="h3">My Courses</Typography>

              {isLoading ? (
                <Spinner size="md" label="Loading courses..." />
              ) : enrollments && enrollments.length > 0 ? (
                enrollments.map((enrollment) => (
                  <EnrolledCourse
                    key={enrollment.id}
                    courseId={enrollment.courseId}
                    userId={user.id}
                  />
                ))
              ) : (
                <Card>
                  <Card.Body>
                    <div className={styles.emptyState}>
                      <BookOpen size={64} style={{ color: 'var(--color-neutral-400)' }} />
                      <Typography variant="h4">No courses yet</Typography>
                      <Typography variant="body" color="muted">
                        Start learning by enrolling in a course
                      </Typography>
                      <Link href={ROUTES.CATALOG.SPECIALIZATIONS}>
                        <Button variant="primary">Explore Courses</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>

            <div className={styles.sidebar}>
              <Card className={styles.statCard}>
                <Card.Body>
                  <Typography variant="h5">Courses Enrolled</Typography>
                  <div className={styles.statValue}>{enrollments?.length || 0}</div>
                </Card.Body>
              </Card>

              <Card className={styles.statCard}>
                <Card.Body>
                  <Typography variant="h5">Account Type</Typography>
                  <Badge variant={user.role === 'paid' ? 'success' : 'default'}>
                    {user.role.toUpperCase()}
                  </Badge>
                  {user.role === 'free' && (
                    <Link href={ROUTES.MARKETING.PRICING}>
                      <Button variant="outline" size="sm" fullWidth>
                        Upgrade to Premium
                      </Button>
                    </Link>
                  )}
                </Card.Body>
              </Card>

              <Card className={styles.statCard}>
                <Card.Body>
                  <Typography variant="h5">Quick Actions</Typography>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <Link href={ROUTES.DASHBOARD.LIVE_CLASSES}>
                      <Button variant="ghost" fullWidth style={{ justifyContent: 'flex-start' }}>
                        Live Classes
                      </Button>
                    </Link>
                    <Link href={ROUTES.DASHBOARD.SETTINGS}>
                      <Button variant="ghost" fullWidth style={{ justifyContent: 'flex-start' }}>
                        Settings
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
