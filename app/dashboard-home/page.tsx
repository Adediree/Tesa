"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Typography } from "@/components/base/Typography";
import DashboardLayout from "@/components/layout/Dashboard.tsx/dashboardLayout";
import { ModernSelect, ModernSelectOption } from "qucoon-components";
import { Courses } from "@/components/mockData/page";
import styles from "../courses/[id]/page.module.css";

export default function DashboardHome() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  // Dropdown data (purely UI-based)
  const programmes: ModernSelectOption[] = [
    { label: "Tesa", value: "Tesa" },
    { label: "QSA", value: "QSA" },
    { label: "Empowa", value: "Empowa" },
  ];

  const specializations: ModernSelectOption[] = [
    { label: "Cloud Engineering", value: "cloud-engineering" },
    { label: "Software Engineering", value: "software-engineering" },
  ];

  // Local states
  const [selectedProgramme, setSelectedProgramme] = useState("Tesa");
  const [selectedSpecialization, setSelectedSpecialization] =
    useState("cloud-engineering");
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  // Effect to load appropriate course
  useEffect(() => {
    // If courseId exists in URL, use it
    if (courseId) {
      const found = Courses.find((c) => c.id === courseId);
      if (found) {
        setSelectedCourse(found);
        return;
      }
    }

    // Otherwise use dropdown-based selection
    const fallback = Courses.find((c) => c.id === selectedSpecialization);
    setSelectedCourse(fallback || null);
  }, [courseId, selectedSpecialization]);

  return (
    <>
      <Header />
      <div className={styles.overallContainer}>
        {/* Sticky Selectors */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            paddingTop: "32px",
            paddingBottom: "22px",
            paddingLeft: "24px",
            paddingRight: "16px",
          }}
        >
          <div className={styles.programmeSelector}>
            <p>Select Programme:</p>
            <ModernSelect
              placeholderLabel="Select Programme"
              selectOptions={programmes}
              size="small"
              value={selectedProgramme}
              onOptionSelect={(value: string) => setSelectedProgramme(value)}
              style={{ fontSize: "16px", color: "#667085", border: "none" }}
            />
          </div>

          <div className={styles.programmeSelector}>
            <p>Specialization:</p>
            <ModernSelect
              placeholderLabel="Select Specialization"
              selectOptions={specializations}
              size="small"
              value={selectedSpecialization}
              onOptionSelect={(value: string) =>
                setSelectedSpecialization(value)
              }
              style={{ fontSize: "16px", color: "#667085", border: "none" }}
            />
          </div>
        </div>

        {/* Dashboard Layout */}
        <DashboardLayout>
          {!selectedCourse ? (
            <div style={{ padding: "2rem" }}>
              <Typography variant="bodyLarge" color="muted">
                No course selected.
              </Typography>
            </div>
          ) : (
            <div style={{ padding: "2rem" }}>
              <Typography variant="h1">{selectedCourse.title}</Typography>
              <Typography variant="bodyLarge" color="muted">
                {selectedCourse.description}
              </Typography>
              <Typography
                variant="bodySmall"
                color="muted"
                style={{ marginTop: "1rem" }}
              >
                Duration: {selectedCourse.duration} | Level:{" "}
                {selectedCourse.level}
              </Typography>
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                style={{
                  marginTop: "1rem",
                  width: "320px",
                  borderRadius: "12px",
                }}
              />
            </div>
          )}
        </DashboardLayout>
      </div>
    </>
  );
}
