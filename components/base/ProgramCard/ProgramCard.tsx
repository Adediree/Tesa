"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/base/Card";
import { Typography } from "@/components/base/Typography";
import { Button } from "@/components/base/Button";
import styles from "./ProgramCard.module.css";

interface Program {
  id?: string;
  title: string;
  description: string;
  image: string;
}

interface ProgramCardProps {
  specializations: Program[];
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: (id: string) => void; // 👈 optional callback
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  specializations,
  showButton = false,
  buttonText = "Learn More",
  onButtonClick,
}) => {
  return (
    <div className={styles.specializationsGrid}>
      {specializations.map((spec) => (
        <Card key={spec.title} hoverable>
          <Card.Header noPadding className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src={spec.image}
                alt={spec.title}
                fill
                className={styles.specializationImage}
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
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

          {/* 👇 Optional button section */}
          {showButton && (
            <Card.Footer>
              <Button
                variant="outline"
                fullWidth
                onClick={() => onButtonClick?.(spec.id!)} // ✅ triggers callback if provided
              >
                {buttonText}
              </Button>
            </Card.Footer>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProgramCard;
