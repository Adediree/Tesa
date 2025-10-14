import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Typography } from "@/components/base/Typography";
import { Button } from "@/components/base/Button";
import { ROUTES } from "@/constants/routes";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <section className={styles.cta}>
      <Container>
        <div className={styles.ctaContent}>
          <Typography variant="h2" style={{ color: "var(--color-neutral-0)" }}>
            Ready to Start Learning?
          </Typography>
          <Typography
            variant="bodyLarge"
            style={{ color: "var(--color-neutral-100)" }}
          >
            Join thousands of learners advancing their careers with Qucoon Tesa
          </Typography>
          <Link href={ROUTES.AUTH.REGISTER}>
            <Button variant="secondary" size="lg">
              Create Free Account
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
