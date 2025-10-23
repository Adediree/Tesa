"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/base/Button";
import styles from "./RecruiterCard.module.css";

interface Program {
  id?: string;
  image?: string; // 👈 optional
}

interface RecruiterCardProps {
  specializations: Program[];
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: (id: string) => void;
}

const RecruiterCard: React.FC<RecruiterCardProps> = ({
  specializations,
  showButton = false,
  buttonText = "Register",
  onButtonClick,
}) => {
  return (
    <div className={styles.recruiterContainer}>
      <Button
        variant="outline"
        // onClick={() => onButtonClick?.(spec.id!)}
        style={{ width: "fit-content" }}
      >
        {buttonText}
      </Button>
      <div className={styles.specializationsGrid}>
        {specializations.map((spec) => {
          return (
            <>
              {spec.image && (
                <div
                  key={spec.id || spec.image}
                  className={styles.imageContainer}
                >
                  <Image
                    src={spec.image}
                    alt="Program image"
                    fill
                    className={styles.specializationImage}
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RecruiterCard;
