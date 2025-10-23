"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/base/Typography";
import { Button } from "@/components/base/Button";
import styles from "./ProgramCard.module.css";
import { ProgramCardEdit } from "../ProgramCardEdit/Card";

interface Program {
  id?: string;
  title: string;
  description: string;
  image?: string; // 👈 made optional
}

interface ProgramCardProps {
  specializations: Program[];
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: (id: string) => void;
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
        <ProgramCardEdit key={spec.title} hoverable>
          <ProgramCardEdit.Header noPadding className={styles.imageWrapper}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-3)",
                paddingTop: "var(--spacing-3)",
                paddingBottom: "var(--spacing-2)",
              }}
            >
              <Typography variant="h4">{spec.title}</Typography>
            </div>

            {/* ✅ Only show image if provided */}
            {spec.image && (
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
            )}
          </ProgramCardEdit.Header>

          <ProgramCardEdit.Body>
            <Typography
              variant="body"
              style={{ marginTop: "var(--spacing-3)" }}
            >
              {spec.description}
            </Typography>
          </ProgramCardEdit.Body>

          {showButton && (
            <ProgramCardEdit.Footer className={styles.cardFooter}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onButtonClick?.(spec.id!)}
                style={{ marginLeft: "auto" }}
              >
                {buttonText}
              </Button>
            </ProgramCardEdit.Footer>
          )}
        </ProgramCardEdit>
      ))}
    </div>
  );
};

export default ProgramCard;
