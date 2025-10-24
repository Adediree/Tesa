"use client";

import { useRouter } from "next/navigation";
import { useGetSpecializationsQuery } from "@/lib/api/catalogApi";
import ProgramLayout, {
  ProgramLayoutProps,
} from "@/components/layout/ProgramLayout/ProgramLayout";
import ProgramCard from "@/components/base/ProgramCard/ProgramCard";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";

export default function SpecializationsPage() {
  const router = useRouter();

  const programLayoutProps: ProgramLayoutProps = {
    title: "Learning Program",
    subtitle:
      "Choose from the pool of Univaciti programs and start learning when and how you choose to",
  };

  const { data: specializations, isLoading } = useGetSpecializationsQuery();

  const data = [
    {
      id: "tesa",
      title: "Tesa",
      description:
        "For beginners who need intensive courses in specialized skills.",
      image: "/TesaImage.jpg",
    },
    {
      id: "qsa",
      title: "Startup Accelerator",
      description:
        "For beginners who need intensive courses in specialized skills.",
      image: "/QSAImage.png",
    },
    {
      id: "empowa",
      title: "Empowa",
      description:
        "For beginners who need intensive courses in specialized skills.",
      image: "/EmpowaImage.png",
    },
    {
      id: "empowa",
      title: "Empowa",
      description:
        "For beginners who need intensive courses in specialized skills.",
      image: "/EmpowaImage.png",
    },
  ];

  // 👇 callback to handle navigation
  const handleNavigateToSpecialization = (id: string) => {
    router.push(ROUTES.CATALOG.SPECIALIZATION_DETAIL(id));
  };

  return (
    <main className={styles.mainContainer}>
      <ProgramLayout {...programLayoutProps}>
        <ProgramCard
          specializations={data}
          showButton={true}
          buttonText="More"
          onButtonClick={handleNavigateToSpecialization} // ✅ added this
        />
      </ProgramLayout>
    </main>
  );
}
{
  /* <Header />
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
      </main> */
}
