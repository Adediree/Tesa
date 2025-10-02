'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CircleCheck as CheckCircle, ChevronRight, Video, Microscope, FileText, Users as UsersIcon } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { Spinner } from '@/components/base/Spinner';
import { useGetCourseByIdQuery } from '@/lib/api/catalogApi';
import { useGetModuleByIdQuery, useCompleteContentMutation } from '@/lib/api/courseApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';

export default function ModuleViewerPage({ params }: { params: { courseId: string; moduleId: string } }) {
  const router = useRouter();
  const { courseId, moduleId } = params;
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: course } = useGetCourseByIdQuery(courseId);
  const { data: module, isLoading } = useGetModuleByIdQuery({ courseId, moduleId });
  const [completeContent] = useCompleteContentMutation();
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [completedContent, setCompletedContent] = useState<string[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Spinner size="lg" label="Loading module..." />
        </div>
      </>
    );
  }

  if (!module) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h2">Module not found</Typography>
        </Container>
      </>
    );
  }

  const currentContent = module.content[currentContentIndex];
  const isLastContent = currentContentIndex === module.content.length - 1;
  const hasQuiz = !!module.quiz;

  const handleContentComplete = async () => {
    if (currentContent && !completedContent.includes(currentContent.id)) {
      setCompletedContent([...completedContent, currentContent.id]);
      await completeContent({
        userId: user.id,
        courseId,
        moduleId,
        contentId: currentContent.id,
      });
    }
  };

  const handleNext = () => {
    handleContentComplete();
    if (!isLastContent) {
      setCurrentContentIndex(currentContentIndex + 1);
    }
  };

  const contentIcons: Record<string, React.ReactNode> = {
    video: <Video size={24} />,
    lab: <Microscope size={24} />,
    reading: <FileText size={24} />,
    live: <UsersIcon size={24} />,
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-8)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-900)', minHeight: '100vh' }}>
        <Container size="xl">
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <Link href={ROUTES.DASHBOARD.COURSE_CONTENT(courseId)}>
              <Button variant="ghost" leftIcon={<ArrowLeft size={20} />} style={{ color: 'var(--color-neutral-0)' }}>
                Back to Course
              </Button>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)' }}>
            <div>
              <Card style={{ backgroundColor: 'var(--color-neutral-800)', color: 'var(--color-neutral-0)' }}>
                <Card.Body>
                  {currentContent && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-4)' }}>
                        <div style={{ color: 'var(--color-primary-400)' }}>
                          {contentIcons[currentContent.type] || <Video size={24} />}
                        </div>
                        <Typography variant="h3" style={{ color: 'var(--color-neutral-0)' }}>
                          {currentContent.title}
                        </Typography>
                        {completedContent.includes(currentContent.id) && (
                          <CheckCircle size={24} style={{ color: 'var(--color-success-500)' }} />
                        )}
                      </div>

                      <div style={{ backgroundColor: 'var(--color-neutral-900)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-8)', marginBottom: 'var(--spacing-6)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {currentContent.type === 'video' && (
                          <div style={{ textAlign: 'center' }}>
                            <Video size={64} style={{ color: 'var(--color-neutral-500)', marginBottom: 'var(--spacing-4)' }} />
                            <Typography variant="body" style={{ color: 'var(--color-neutral-400)' }}>
                              Video Player: {currentContent.title}
                            </Typography>
                            <Typography variant="bodySmall" style={{ color: 'var(--color-neutral-500)', marginTop: 'var(--spacing-2)' }}>
                              Video content would be embedded here
                            </Typography>
                          </div>
                        )}
                        {currentContent.type === 'lab' && (
                          <div style={{ textAlign: 'center' }}>
                            <Microscope size={64} style={{ color: 'var(--color-neutral-500)', marginBottom: 'var(--spacing-4)' }} />
                            <Typography variant="body" style={{ color: 'var(--color-neutral-400)' }}>
                              Interactive Lab: {currentContent.title}
                            </Typography>
                            <Typography variant="bodySmall" style={{ color: 'var(--color-neutral-500)', marginTop: 'var(--spacing-2)' }}>
                              Lab environment would be loaded here
                            </Typography>
                          </div>
                        )}
                        {currentContent.type === 'reading' && (
                          <div style={{ padding: 'var(--spacing-6)', maxWidth: '800px' }}>
                            <Typography variant="body" style={{ color: 'var(--color-neutral-300)', lineHeight: '1.8' }}>
                              This is a reading material placeholder. In a real implementation, this would contain
                              formatted text content, images, code examples, and other educational materials.
                              The content would be rich and interactive, with the ability to take notes,
                              highlight important sections, and bookmark for later review.
                            </Typography>
                          </div>
                        )}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentContentIndex(Math.max(0, currentContentIndex - 1))}
                          disabled={currentContentIndex === 0}
                        >
                          Previous
                        </Button>
                        {isLastContent && hasQuiz ? (
                          <Link href={ROUTES.DASHBOARD.QUIZ(courseId, moduleId)}>
                            <Button variant="primary" rightIcon={<ChevronRight size={20} />}>
                              Take Quiz
                            </Button>
                          </Link>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={handleNext}
                            rightIcon={<ChevronRight size={20} />}
                            disabled={isLastContent && !hasQuiz}
                          >
                            {isLastContent ? 'Complete Module' : 'Next'}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>

            <Card style={{ backgroundColor: 'var(--color-neutral-800)' }}>
              <Card.Header>
                <Typography variant="h4" style={{ color: 'var(--color-neutral-0)' }}>
                  {module.title}
                </Typography>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                  {module.content.map((content, index) => (
                    <button
                      key={content.id}
                      onClick={() => setCurrentContentIndex(index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-3)',
                        padding: 'var(--spacing-3)',
                        backgroundColor: currentContentIndex === index ? 'var(--color-primary-900)' : 'transparent',
                        border: currentContentIndex === index ? '1px solid var(--color-primary-600)' : '1px solid var(--color-neutral-700)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        transition: 'all var(--transition-base)',
                      }}
                    >
                      <div style={{ color: completedContent.includes(content.id) ? 'var(--color-success-500)' : 'var(--color-neutral-400)' }}>
                        {completedContent.includes(content.id) ? (
                          <CheckCircle size={20} />
                        ) : (
                          contentIcons[content.type] || <Video size={20} />
                        )}
                      </div>
                      <Typography variant="bodySmall" style={{ color: currentContentIndex === index ? 'var(--color-neutral-0)' : 'var(--color-neutral-300)' }}>
                        {index + 1}. {content.title}
                      </Typography>
                    </button>
                  ))}
                  {hasQuiz && (
                    <Link href={ROUTES.DASHBOARD.QUIZ(courseId, moduleId)}>
                      <Button variant="outline" fullWidth style={{ marginTop: 'var(--spacing-2)' }}>
                        Module Quiz
                      </Button>
                    </Link>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}
