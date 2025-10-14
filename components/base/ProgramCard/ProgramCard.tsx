"use client";

import React from "react";
import { Card } from "@/components/base/Card";
import styles from "./ProgramCard.module.css";
import { Typography } from "@/components/base/Typography";

interface Program {
  title: string;
  description: string;
  image: string;
}

interface ProgramCardProps {
  specializations: Program[];
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  specializations,
}) => {
  return (
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
        </Card>
      ))}
    </div>
  );
};

export default ProgramCard;
