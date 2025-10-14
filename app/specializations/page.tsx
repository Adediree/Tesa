"use client";


import { useGetSpecializationsQuery } from "@/lib/api/catalogApi";
// import { ROUTES } from "@/constants/routes";
// import styles from "./page.module.css";
import ProgramLayout, {
  ProgramLayoutProps,
} from "@/components/layout/ProgramLayout/ProgramLayout";
import ProgramCard from "@/components/base/ProgramCard/ProgramCard";

// const iconMap: Record<string, React.ReactNode> = {
//   "Artificial Intelligence": <Brain size={40} />,
//   "Data Analytics": <BarChart3 size={40} />,
//   "Software Engineering": <Rocket size={40} />,
// };

export default function SpecializationsPage() {
  const programLayoutProps: ProgramLayoutProps = {
    title: "Learning Program",
    subtitle:
      "Sign up to analyze reviews, benchmark against competitors, and uncover market trends that drive business growth.",
  };

  const { data: specializations, isLoading } = useGetSpecializationsQuery();
  const data = [
    {
      title: "Artificial Intelligence",
      description: "Learn the foundations of AI and build smart systems.",
      image: "/images/ai.jpg",
    },
    {
      title: "Data Analytics",
      description: "Master data visualization, SQL, and reporting tools.",
      image: "/images/data.jpg",
    },
    {
      title: "Software Engineering",
      description: "Design and develop scalable web applications.",
      image: "/images/software.jpg",
    },
  ];

  return (
    <>
      <ProgramLayout {...programLayoutProps}>
        <ProgramCard specializations={data} />
      </ProgramLayout>
      {/* <Header />
      <main className={styles.container}>
        <Container>
          <div className={styles.header}>
            <Typography variant="h2">Explore Specializations</Typography>
            <Typography variant="bodyLarge" color="muted">
              Choose your learning path and start building expertise in
              high-demand fields
            </Typography>
          </div>

          {isLoading ? (
            <div className={styles.loading}>
              <Spinner size="lg" label="Loading specializations..." />
            </div>
          ) : (
            <div className={styles.grid}>
              {specializations?.map((spec) => (
                <Card key={spec.id} hoverable className={styles.specCard}>
                  <Card.Header noPadding>
                    <img
                      src={spec.image}
                      alt={spec.title}
                      className={styles.specImage}
                    />
                  </Card.Header>
                  <Card.Body className={styles.specContent}>
                    <div className={styles.specIcon}>
                      {iconMap[spec.title] || <Brain size={40} />}
                      <Typography variant="h4">{spec.title}</Typography>
                    </div>
                    <Typography variant="body" color="muted">
                      {spec.description}
                    </Typography>
                    <div className={styles.pathways}>
                      {spec.pathways.map((pathway) => (
                        <Badge key={pathway.id} variant="primary">
                          {pathway.level}
                        </Badge>
                      ))}
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Link href={ROUTES.CATALOG.SPECIALIZATION_DETAIL(spec.id)}>
                      <Button variant="primary" fullWidth>
                        Explore Pathways
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </main> */}
    </>
  );
}
