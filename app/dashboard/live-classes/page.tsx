'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Users, Video, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { Spinner } from '@/components/base/Spinner';
import { useGetLiveClassesQuery, useRegisterForLiveClassMutation } from '@/lib/api/liveClassApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';
import { formatDate, formatTimeFromNow } from '@/lib/utils';

export default function LiveClassesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: liveClasses, isLoading } = useGetLiveClassesQuery({});
  const [registerForClass] = useRegisterForLiveClassMutation();
  const [registeredClasses, setRegisteredClasses] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleRegister = async (classId: string) => {
    try {
      await registerForClass({ userId: user.id, classId }).unwrap();
      setRegisteredClasses([...registeredClasses, classId]);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const now = new Date();
  const upcomingClasses = liveClasses?.filter((c) => new Date(c.scheduledAt) > now) || [];
  const pastClasses = liveClasses?.filter((c) => new Date(c.scheduledAt) <= now) || [];

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container>
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <Typography variant="h1">Live Classes</Typography>
            <Typography variant="bodyLarge" color="muted">
              Join interactive sessions with instructors and fellow learners
            </Typography>
          </div>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--spacing-12)' }}>
              <Spinner size="lg" label="Loading classes..." />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
              <div>
                <Typography variant="h3" style={{ marginBottom: 'var(--spacing-6)' }}>
                  Upcoming Classes
                </Typography>
                {upcomingClasses.length === 0 ? (
                  <Card>
                    <Card.Body>
                      <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
                        <Calendar size={48} style={{ color: 'var(--color-neutral-400)', marginBottom: 'var(--spacing-4)' }} />
                        <Typography variant="h4">No upcoming classes</Typography>
                        <Typography variant="body" color="muted">
                          Check back soon for new live sessions
                        </Typography>
                      </div>
                    </Card.Body>
                  </Card>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)' }}>
                    {upcomingClasses.map((liveClass) => {
                      const isRegistered = registeredClasses.includes(liveClass.id);
                      const isFull = liveClass.maxParticipants ? liveClass.enrolledUsers.length >= liveClass.maxParticipants : false;
                      const startDate = new Date(liveClass.scheduledAt);
                      const isStartingSoon = startDate.getTime() - now.getTime() < 30 * 60 * 1000;

                      return (
                        <Card key={liveClass.id}>
                          <Card.Body>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ flex: 1 }}>
                                  <Typography variant="h4">{liveClass.title}</Typography>
                                  <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                                    {liveClass.description}
                                  </Typography>
                                </div>
                                {isStartingSoon && (
                                  <Badge variant="error">Starting Soon</Badge>
                                )}
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                  <Calendar size={16} style={{ color: 'var(--color-neutral-500)' }} />
                                  <Typography variant="bodySmall">{formatDate(liveClass.scheduledAt, 'PPP')}</Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                  <Clock size={16} style={{ color: 'var(--color-neutral-500)' }} />
                                  <Typography variant="bodySmall">
                                    {formatDate(liveClass.scheduledAt, 'p')} - {liveClass.duration}
                                  </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                  <Users size={16} style={{ color: 'var(--color-neutral-500)' }} />
                                  <Typography variant="bodySmall">
                                    {liveClass.enrolledUsers.length} / {liveClass.maxParticipants || 'unlimited'} registered
                                  </Typography>
                                </div>
                              </div>

                              <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                                {isRegistered ? (
                                  <>
                                    <Badge variant="success">Registered</Badge>
                                    {isStartingSoon && (
                                      <Button variant="primary" leftIcon={<Video size={20} />} rightIcon={<ExternalLink size={16} />}>
                                        Join Class
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <Button
                                    variant="primary"
                                    onClick={() => handleRegister(liveClass.id)}
                                    disabled={isFull}
                                  >
                                    {isFull ? 'Class Full' : 'Register'}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>

              {pastClasses.length > 0 && (
                <div>
                  <Typography variant="h3" style={{ marginBottom: 'var(--spacing-6)' }}>
                    Past Classes
                  </Typography>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)' }}>
                    {pastClasses.slice(0, 5).map((liveClass) => (
                      <Card key={liveClass.id}>
                        <Card.Body>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <Typography variant="h4">{liveClass.title}</Typography>
                              <Typography variant="bodySmall" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                                {formatDate(liveClass.scheduledAt, 'PPP p')}
                              </Typography>
                            </div>
                            <Button variant="outline" size="sm" leftIcon={<Video size={16} />}>
                              Watch Recording
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
