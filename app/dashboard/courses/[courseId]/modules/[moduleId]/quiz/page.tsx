'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, Award } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { Spinner } from '@/components/base/Spinner';
import { useGetModuleByIdQuery, useSubmitQuizMutation } from '@/lib/api/courseApi';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';

export default function QuizPage({ params }: { params: { courseId: string; moduleId: string } }) {
  const router = useRouter();
  const { courseId, moduleId } = params;
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: module, isLoading } = useGetModuleByIdQuery({ courseId, moduleId });
  const [submitQuiz] = useSubmitQuizMutation();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ score: number; passed: boolean } | null>(null);

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
          <Spinner size="lg" label="Loading quiz..." />
        </div>
      </>
    );
  }

  if (!module || !module.quiz) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h2">Quiz not found</Typography>
        </Container>
      </>
    );
  }

  const quiz = module.quiz;

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: optionIndex });
    }
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    setResults({ score, passed });
    setSubmitted(true);

    await submitQuiz({
      userId: user.id,
      courseId,
      moduleId,
      quizId: quiz.id,
      answers: answers as any,
      score,
    });
  };

  const canSubmit = Object.keys(answers).length === quiz.questions.length;

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container size="md">
          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <Link href={ROUTES.DASHBOARD.MODULE(courseId, moduleId)}>
              <Button variant="ghost" leftIcon={<ArrowLeft size={20} />}>
                Back to Module
              </Button>
            </Link>
          </div>

          <Card>
            <Card.Header>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h2">{quiz.title}</Typography>
                <Badge variant="primary">Passing Score: {quiz.passingScore}%</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {submitted && results ? (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
                  {results.passed ? (
                    <Award size={64} style={{ color: 'var(--color-success-600)', marginBottom: 'var(--spacing-4)' }} />
                  ) : (
                    <XCircle size={64} style={{ color: 'var(--color-error-600)', marginBottom: 'var(--spacing-4)' }} />
                  )}
                  <Typography variant="h2" color={results.passed ? 'success' : 'error'}>
                    {results.passed ? 'Congratulations!' : 'Keep Trying!'}
                  </Typography>
                  <Typography variant="h3" style={{ marginTop: 'var(--spacing-4)' }}>
                    Your Score: {results.score}%
                  </Typography>
                  <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                    {results.passed
                      ? 'You have successfully passed this quiz!'
                      : `You need ${quiz.passingScore}% to pass. Review the module and try again.`}
                  </Typography>
                  <div style={{ display: 'flex', gap: 'var(--spacing-4)', justifyContent: 'center', marginTop: 'var(--spacing-8)' }}>
                    <Link href={ROUTES.DASHBOARD.COURSE_CONTENT(courseId)}>
                      <Button variant="primary">Continue Course</Button>
                    </Link>
                    {!results.passed && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setAnswers({});
                          setResults(null);
                        }}
                      >
                        Retry Quiz
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                    {quiz.questions.map((question, index) => (
                      <div key={question.id}>
                        <Typography variant="h4" style={{ marginBottom: 'var(--spacing-4)' }}>
                          {index + 1}. {question.question}
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                          {question.options?.map((option, optionIndex) => {
                            const isSelected = answers[question.id] === optionIndex;
                            return (
                              <button
                                key={optionIndex}
                                onClick={() => handleAnswerSelect(question.id, optionIndex)}
                                style={{
                                  padding: 'var(--spacing-4)',
                                  backgroundColor: isSelected ? 'var(--color-primary-50)' : 'var(--color-neutral-0)',
                                  border: isSelected ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-300)',
                                  borderRadius: 'var(--radius-md)',
                                  textAlign: 'left',
                                  cursor: 'pointer',
                                  transition: 'all var(--transition-base)',
                                }}
                              >
                                <Typography variant="body">{option}</Typography>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 'var(--spacing-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="bodySmall" color="muted">
                      {Object.keys(answers).length} of {quiz.questions.length} questions answered
                    </Typography>
                    <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit}>
                      Submit Quiz
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Container>
      </main>
    </>
  );
}
