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
import styles from "./page.module.css";
import DashboardLayout from "@/components/layout/Dashboard.tsx/dashboardLayout";
import { ModernSelect, ModernSelectOption } from "qucoon-components";
import { Courses } from "@/components/mockData/page";

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

  // 🧩 find course in mock data
  const course = Courses.find((c) => c.id === id);

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

  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const handleEnroll = () => {
    setEnrollSuccess(true);
    setTimeout(() => {
      router.push(`/dashboard/course-content/${id}`);
    }, 1000);
  };

  const programmes: ModernSelectOption[] = [
    {
      label: "Tesa",
      value: "Tesa",
    },

    {
      label: "QSA",
      value: "QSA",
    },

    {
      label: "Empowa",
      value: "Empowa",
    },
  ];
  const specialization: ModernSelectOption[] = [
    {
      label: "Cloud",
      value: "Cloud",
    },

    {
      label: "AI",
      value: "AI",
    },

    {
      label: "Software Engineering",
      value: "Software Engineering",
    },
  ];

  return (
    <>
      <Header />
      <div className={styles.overallContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            paddingTop: "32px",
            paddingBottom: "22px",
            paddingLeft: "24px",
            paddingRight: "16px",
          }}
        >
          {" "}
          <div className={styles.programmeSelector}>
            <p>Select Programme:</p>{" "}
            <ModernSelect
              placeholderLabel="Select Programme"
              // onOptionSelect={}
              selectOptions={programmes}
              size="small"
              // label="Top Keywords"
              style={{ fontSize: "16px", color: "#667085", border: "none" }}
            />
          </div>
          <div className={styles.programmeSelector}>
            <p>Specialization:</p>{" "}
            <ModernSelect
              placeholderLabel="Select Specialization"
              // onOptionSelect={}
              selectOptions={specialization}
              size="small"
              // label="Top Keywords"
              style={{ fontSize: "16px", color: "#667085", border: "none" }}
            />
          </div>
        </div>
        <DashboardLayout>
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
                      >
                        Enroll Now
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </div>

              <div className={styles.modules}>
                <Typography variant="h2">Course Content</Typography>
                {course.modules.map((module, index) => (
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
        </DashboardLayout>
      </div>
    </>
  );
}
