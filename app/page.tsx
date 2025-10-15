import Link from "next/link";
import {
  BookOpen,
  Users,
  Award,
  Rocket,
  Brain,
  ChartBar as BarChart3,
  Video,
  Microscope,
  Clock,
  CircleCheck as CheckCircle,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/base/Typography";
import { Button } from "@/components/base/Button";
import { Card } from "@/components/base/Card";
import { Badge } from "@/components/base/Badge";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";
import Image from "next/image";
import { Footer } from "@/components/layout/Footer/Footer";
const HeroImage = "/hero-image.jpg";

export default function Home() {
  const stats = [
    { label: "Active Learners", value: "50,000+" },
    { label: "Expert Instructors", value: "200+" },
    { label: "Course Hours", value: "1,000+" },
    { label: "Success Rate", value: "94%" },
  ];

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with years of real-world experience in AI, Data Science, and Software Engineering",
    },
    {
      icon: <Video size={32} />,
      title: "HD Video Content",
      description:
        "High-quality video lectures with downloadable resources, code samples, and supplementary materials",
    },
    {
      icon: <Microscope size={32} />,
      title: "Hands-On Labs",
      description:
        "Practice with real-world projects in our cloud-based labs with pre-configured environments",
    },
    {
      icon: <Users size={32} />,
      title: "Live Classes",
      description:
        "Join interactive sessions with instructors and fellow learners for Q&A and collaborative learning",
    },
    {
      icon: <Award size={32} />,
      title: "Industry Certificates",
      description:
        "Earn recognized credentials and showcase your achievements to potential employers",
    },
    {
      icon: <Globe size={32} />,
      title: "Global Community",
      description:
        "Connect with learners worldwide, share knowledge, and grow your professional network",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Path",
      description:
        "Select from our specializations in AI, Data Analytics, or Software Engineering based on your goals",
    },
    {
      step: "2",
      title: "Learn at Your Pace",
      description:
        "Access video lectures, hands-on labs, and live classes anytime, anywhere on any device",
    },
    {
      step: "3",
      title: "Build Your Portfolio",
      description:
        "Complete real-world projects and build a portfolio that showcases your skills to employers",
    },
    {
      step: "4",
      title: "Earn Your Certificate",
      description:
        "Complete pathways and earn industry-recognized certificates to advance your career",
    },
  ];

  const specializations = [
    {
      title: "Learning",
      description:
        "Hop on any of the specialization course and learn on your own terms",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Brain size={40} />,
    },
    {
      title: "Certification",
      description:
        "Get validated to receive validation recruiters are looking for",
      image:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <BarChart3 size={40} />,
    },
    {
      title: "Recruitment",
      description: "Get access to the pool of certified professionals",
      image:
        "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: <Rocket size={40} />,
    },
  ];

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroContent}>
              {/* <Badge
              variant="primary"
              style={{ marginBottom: "var(--spacing-10)" }}
            >
              🎓 Trusted by 50,000+ Learners Worldwide
            </Badge> */}
              <Typography variant="h1" className={styles.heroTitle}>
                Get an accelerated skill, from Novis to Expertise. Get
                certified, get validated
              </Typography>
              <Image
                src={HeroImage}
                alt={""}
                width={450}
                height={350}
                style={{
                  borderRadius: "8px",
                  // borderRadius: "50%",
                  // objectFit: "cover",
                }}
              />
              {/* <Typography variant="bodyLarge" className={styles.heroDescription}>
              Join Qucoon Tesa and transform your career with industry-leading
              education. Learn from experts, build real-world projects, and earn
              recognized certifications that employers value. Start free today.
            </Typography> */}
              {/* <div className={styles.heroCta}>
              <Link href={ROUTES.AUTH.REGISTER}>
                <Button size="lg" leftIcon={<Rocket size={20} />}>
                  Start Learning Free
                </Button>
              </Link>
              <Link href={ROUTES.CATALOG.SPECIALIZATIONS}>
                <Button variant="outline" size="lg">
                  Browse Courses
                </Button>
              </Link>
            </div> */}
              {/* <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <Typography
                    variant="h3"
                    color="primary"
                    // style={{ fontSize: "2rem", fontWeight: "600" }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="bodySmall" color="muted">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div> */}
            </div>
          </Container>
        </section>

        {/* <section className={styles.features}>
          <Container>
            <div className={styles.sectionHeader}>
              <Typography variant="h2">
                Everything You Need to Succeed
              </Typography>
              <Typography variant="bodyLarge" color="muted">
                Comprehensive learning tools and resources designed for your
                success
              </Typography>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature) => (
                <Card key={feature.title}>
                  <Card.Body>
                    <div key={feature.title} className={styles.featureCard}>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <Typography variant="h4">{feature.title}</Typography>
                      <Typography variant="body" color="muted">
                        {feature.description}
                      </Typography>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Container>
        </section> */}

        {/* <section className={styles.howItWorks}>
          <Container>
            <div className={styles.sectionHeader}>
              <Typography variant="h2">How It Works</Typography>
              <Typography variant="bodyLarge" color="muted">
                Your journey from beginner to professional in 4 simple steps
              </Typography>
            </div>
            <div className={styles.stepsGrid}>
              {howItWorks.map((step) => (
                <div key={step.step} className={styles.stepCard}>
                  <div className={styles.stepNumber}>{step.step}</div>
                  <Typography variant="h4">{step.title}</Typography>
                  <Typography variant="body" color="muted">
                    {step.description}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </section> */}

        <section className={styles.specializations}>
          <Container>
            {/* <div className={styles.sectionHeader}>
              <Typography variant="h2">Choose Your Path</Typography>
              <Typography variant="bodyLarge" color="muted">
                Explore our specializations and start your learning journey
              </Typography>
            </div> */}
            <div className={styles.specializationsGrid}>
              {specializations.map((spec) => (
                <Card key={spec.title} hoverable>
                  <Card.Header noPadding>
                    <img
                      src={spec.image}
                      alt={spec.title}
                      className={styles.specializationImage}
                    />
                  </Card.Header>
                  <Card.Body>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--spacing-3)",
                      }}
                    >
                      {/* {spec.icon} */}
                      <Typography variant="h4">{spec.title}</Typography>
                    </div>
                    <Typography
                      variant="body"
                      color="muted"
                      style={{ marginTop: "var(--spacing-3)" }}
                    >
                      {spec.description}
                    </Typography>
                  </Card.Body>
                  {/* <Card.Footer>
                    <Link href={ROUTES.CATALOG.SPECIALIZATIONS}>
                      <Button variant="outline" fullWidth>
                        Learn More
                      </Button>
                    </Link>
                  </Card.Footer> */}
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
