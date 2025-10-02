import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/base/Typography";
import { Card } from "@/components/base/Card";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Target size={40} />,
      title: "Our Mission",
      description:
        "To democratize high-quality education in AI, Data Analytics, and Software Engineering, making it accessible to learners worldwide.",
    },
    {
      icon: <Users size={40} />,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of real-world experience in their respective fields.",
    },
    {
      icon: <Award size={40} />,
      title: "Quality Content",
      description:
        "Comprehensive, up-to-date curriculum designed to prepare you for real-world challenges.",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Career Growth",
      description:
        "Gain the skills and credentials needed to advance your career in high-demand tech fields.",
    },
  ];

  return (
    <>
      <Header />
      <main
        style={{
          paddingTop: "var(--spacing-12)",
          paddingBottom: "var(--spacing-20)",
          paddingLeft: "var(--spacing-12)",
          paddingRight: "var(--spacing-12)",
        }}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-12)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <Typography variant="h1">About Qucoon Tesa</Typography>
              <Typography
                variant="bodyLarge"
                color="muted"
                style={{ marginTop: "var(--spacing-4)" }}
              >
                Empowering the next generation of tech professionals through
                world-class education
              </Typography>
            </div>

            <Card>
              <Card.Body>
                <Typography variant="body">
                  Qucoon Tesa is a leading online learning platform dedicated to
                  providing high-quality education in Artificial Intelligence,
                  Data Analytics, and Software Engineering. We believe that
                  everyone deserves access to world-class education that can
                  transform their career and life.
                </Typography>
                <Typography
                  variant="body"
                  style={{ marginTop: "var(--spacing-4)" }}
                >
                  Our comprehensive learning paths are designed by industry
                  experts and updated regularly to reflect the latest trends and
                  technologies. Whether you&apos;re a beginner starting your
                  tech journey or an experienced professional looking to
                  upskill, we have the right program for you.
                </Typography>
              </Card.Body>
            </Card>

            <div>
              <Typography
                variant="h2"
                style={{
                  marginBottom: "var(--spacing-8)",
                  textAlign: "center",
                }}
              >
                What We Stand For
              </Typography>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--spacing-6)",
                }}
              >
                {values.map((value) => (
                  <Card key={value.title}>
                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          gap: "var(--spacing-4)",
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ color: "var(--color-primary-600)" }}>
                          {value.icon}
                        </div>
                        <div>
                          <Typography variant="h4">{value.title}</Typography>
                          <Typography
                            variant="body"
                            color="muted"
                            style={{ marginTop: "var(--spacing-2)" }}
                          >
                            {value.description}
                          </Typography>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
