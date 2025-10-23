import Link from "next/link";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/base/Typography";
import { Card } from "@/components/base/Card";
import { Button } from "@/components/base/Button";
import { Badge } from "@/components/base/Badge";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";
import ProgramLayout, {
  ProgramLayoutProps,
} from "@/components/layout/ProgramLayout/ProgramLayout";
import RecruiterCard from "@/components/base/RecruiterCard/RecruiterCard";

export default function PricingPage() {
  const programLayoutProps: ProgramLayoutProps = {
    title: "Certifications",
    subtitle:
      "Validate your skillset with Univaciti certification courses. Specializations are in cloud engineering, cloud solutions architecture, software engineering, AI Solution",
    text: "Select a specialization to view the details",
  };

  const data = [
    {
      id: "artificial",
      // title: "Artificial Intelligence",
      // description: "Learn the foundations of AI and build smart systems.",
      image: "/pepsi-logo.jpg",
    },
    {
      id: "artificial",

      // title: "Data Analytics",
      // description: "Master data visualization, SQL, and reporting tools.",
      image: "/union-bank.jpg",
    },
    {
      id: "artificial",

      // title: "Software Engineering",
      // description: "Design and develop scalable web applications.",
      image: "/stanbic.jpg",
    },
    {
      id: "artificial",

      // title: "Software Engineering",
      // description: "Design and develop scalable web applications.",
      image: "/polaris.jpg",
    },
    {
      id: "artificial",

      // title: "Software Engineering",
      // description: "Design and develop scalable web applications.",
      image: "/firstbank.jpg",
    },
  ];

  // const plans = [
  //   {
  //     name: "Free",
  //     price: "$0",
  //     period: "forever",
  //     description: "Perfect for getting started",
  //     features: [
  //       "Access to 3 beginner courses",
  //       "Basic course materials",
  //       "Community forum access",
  //       "Course completion certificates",
  //     ],
  //     cta: "Get Started",
  //     href: ROUTES.AUTH.REGISTER,
  //     popular: false,
  //   },
  //   {
  //     name: "Premium",
  //     price: "$29",
  //     period: "per month",
  //     description: "For serious learners",
  //     features: [
  //       "Unlimited access to all courses",
  //       "All learning materials & labs",
  //       "Live class participation",
  //       "Priority support",
  //       "Pathway completion certificates",
  //       "Career guidance sessions",
  //       "Exclusive webinars",
  //     ],
  //     cta: "Start Learning",
  //     href: ROUTES.AUTH.REGISTER,
  //     popular: true,
  //   },
  //   {
  //     name: "Enterprise",
  //     price: "Custom",
  //     period: "contact us",
  //     description: "For teams and organizations",
  //     features: [
  //       "Everything in Premium",
  //       "Dedicated account manager",
  //       "Custom learning paths",
  //       "Team analytics dashboard",
  //       "Bulk licenses",
  //       "API access",
  //       "White-label options",
  //     ],
  //     cta: "Contact Sales",
  //     href: ROUTES.MARKETING.CONTACT,
  //     popular: false,
  //   },
  // ];

  return (
    <>
      <main className={styles.mainContainer}>
        <ProgramLayout {...programLayoutProps}>
          <RecruiterCard
            specializations={data}
            showButton={true}
            buttonText="Register"
          />
        </ProgramLayout>
      </main>

      {/* <Header />
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
              alignItems: "center",
              textAlign: "center",
              marginBottom: "var(--spacing-12)",
            }}
          >
            <Typography variant="h1">Choose Your Plan</Typography>
            <Typography
              variant="bodyLarge"
              color="muted"
              style={{ marginTop: "var(--spacing-4)" }}
            >
              Start free, upgrade when you&apos;re ready
            </Typography>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "var(--spacing-6)",
              // justifyContent: "space-between",
            }}
          >
            {plans.map((plan) => (
              <Card key={plan.name} style={{ position: "relative" }}>
                {plan.popular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "var(--spacing-4)",
                      right: "var(--spacing-4)",
                    }}
                  >
                    <Badge variant="primary">Most Popular</Badge>
                  </div>
                )}
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--spacing-6)",
                      // justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Typography variant="h4">{plan.name}</Typography>
                      <Typography variant="bodySmall" color="muted">
                        {plan.description}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "var(--spacing-2)",
                          marginTop: "var(--spacing-4)",
                        }}
                      >
                        <Typography variant="h1" color="primary">
                          {plan.price}
                        </Typography>
                        <Typography variant="body" color="muted">
                          /{plan.period}
                        </Typography>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--spacing-3)",
                      }}
                    >
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          style={{
                            display: "flex",
                            gap: "var(--spacing-2)",
                            alignItems: "center",
                          }}
                        >
                          <Check
                            size={20}
                            style={{
                              color: "var(--color-success-600)",
                              flexShrink: 0,
                            }}
                          />
                          <Typography variant="body">{feature}</Typography>
                        </div>
                      ))}
                    </div>

                    <Link href={plan.href}>
                      <Button
                        variant={plan.popular ? "primary" : "outline"}
                        size="lg"
                        fullWidth
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </main> */}
    </>
  );
}
