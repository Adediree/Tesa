"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  User,
  BookOpen,
  Video,
  Microscope,
  Users as UsersIcon,
  FileText,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/base/Typography";
import { Card } from "@/components/base/Card";
import { Badge } from "@/components/base/Badge";
import { Button } from "@/components/base/Button";
import { Spinner } from "@/components/base/Spinner";
import { useGetCourseByIdQuery } from "@/lib/api/catalogApi";
import {
  useGetModulesByCourseIdQuery,
  useEnrollInCourseMutation,
} from "@/lib/api/courseApi";
import { useAppSelector } from "@/lib/redux/hooks";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";

const contentIconMap: Record<string, React.ReactNode> = {
  video: <Video size={16} />,
  lab: <Microscope size={16} />,
  live: <UsersIcon size={16} />,
  reading: <FileText size={16} />,
};

export default function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const { data: course, isLoading } = useGetCourseByIdQuery(id);
  const { data: modules } = useGetModulesByCourseIdQuery(id);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [enrollInCourse, { isLoading: isEnrolling }] =
    useEnrollInCourseMutation();
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const handleEnroll = async () => {
    if (!isAuthenticated || !user) {
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    try {
      await enrollInCourse({
        userId: user.id,
        courseId: id,
        pathwayId: "pathway-id",
      }).unwrap();
      setEnrollSuccess(true);
      setTimeout(() => {
        router.push(ROUTES.DASHBOARD.COURSE_CONTENT(id));
      }, 1000);
    } catch (error) {
      console.error("Enrollment failed", error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className={styles.loading}>
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

  return (
    <>
      <Header />
      <main className={styles.container}>
        <Container>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <Badge variant="primary">{course.level}</Badge>
              <Typography variant="h1">{course.title}</Typography>
              <Typography variant="bodyLarge" color="muted">
                {course.description}
              </Typography>

              <div className={styles.courseMeta}>
                <div className={styles.metaItem}>
                  <User size={20} />
                  <Typography variant="body">
                    Instructor: {course.instructor}
                  </Typography>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={20} />
                  <Typography variant="body">
                    Duration: {course.duration}
                  </Typography>
                </div>
                <div className={styles.metaItem}>
                  <BookOpen size={20} />
                  <Typography variant="body">
                    Modules: {course.moduleIds.length}
                  </Typography>
                </div>
              </div>
            </div>

            <Card className={styles.enrollCard}>
              <Card.Body>
                <img
                  src={course.image}
                  alt={course.title}
                  className={styles.heroImage}
                />
                {enrollSuccess ? (
                  <Button variant="secondary" fullWidth disabled>
                    Enrolled Successfully!
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleEnroll}
                    loading={isEnrolling}
                  >
                    {isAuthenticated ? "Enroll Now" : "Sign In to Enroll"}
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>

          <div className={styles.modules}>
            <Typography variant="h2">Course Content</Typography>
            {modules?.map((module, index) => (
              <Card key={module.id} className={styles.moduleCard}>
                <Card.Body>
                  <div className={styles.moduleHeader}>
                    <div className={styles.moduleInfo}>
                      <Typography variant="h4">
                        Module {index + 1}: {module.title}
                      </Typography>
                      <Typography variant="body" color="muted">
                        {module.description}
                      </Typography>
                    </div>
                    <Badge variant="default">{module.duration}</Badge>
                  </div>

                  <div className={styles.moduleContent}>
                    {module.content.map((item) => (
                      <div key={item.id} className={styles.contentItem}>
                        {contentIconMap[item.type]}
                        <Typography variant="bodySmall">
                          {item.title}
                        </Typography>
                      </div>
                    ))}
                    {module.quiz && (
                      <div className={styles.contentItem}>
                        <BookOpen size={16} />
                        <Typography variant="bodySmall">
                          {module.quiz.title}
                        </Typography>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </>
  );
}
