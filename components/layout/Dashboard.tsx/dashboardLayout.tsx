"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NavBar } from "./Sidebar";
import { ROUTES } from "@/constants/routes";

export type DashboardLayoutProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const DashboardLayout = ({ children, ...props }: DashboardLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // 🔑 Single active state for ALL navbars
  const [activeLink, setActiveLink] = useState<string>("");
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const navLinks = [
    {
      name: "Home",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Courses",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Structure",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Time-Table",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Internship",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Fees",
      path: ROUTES.CATALOG.COURSES,
    },
    {
      name: "Funding",
      path: ROUTES.CATALOG.COURSES,
    },
    //   {
    //     name: "Source Comparison",
    //     path: RouteConstant.dashboardSection.sourceComparison.path,
    //     icon: <SourceIcon />,
    //   },
    //   {
    //     name: "Keywords & Topics",
    //     path: RouteConstant.dashboardSection.keywordsTopics.path,
    //     icon: <KeywordIcon />,
    //   },
    //   {
    //     name: "All Feedback",
    //     path: RouteConstant.dashboardSection.allFeedback.path,
    //     icon: <FeedbackIcon />,
    //   },
    // ];

    // const AiInsightsLinks = [
    //   {
    //     name: "AI Summaries",
    //     path: RouteConstant.dashboardSection.AISummary.path,
    //     icon: <SummariesIcon />,
    //   },
    //   { name: "Churn Prediction", path: "", icon: <PredictionIcon /> },
    //   { name: "Customer Personas", path: "", icon: <CustomerIcon /> },
    // ];
    // const IntegrationLinks = [
    //   { name: "Manage Sources", path: "", icon: <ManageSourcesIcon /> },
    //   { name: "Web Forms & Surveys", path: "", icon: <WebFormIcon /> },
    // ];
    // const SettingsLinks = [
    //   { name: "API Access", path: "", icon: <ApiAccessIcon /> },
    //   { name: "Billing & plan", path: "", icon: <BillingIcon /> },
  ];

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "flex-start",
        height: "100vh",
      }}
      {...props}
    >
      {/* Sidebar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "8px",
          paddingTop: "32px",
          backgroundColor: "white",
          overflowY: "auto",
          height: "100%",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <NavBar
          links={navLinks}
          title="INSIGHTS & ANALYTICS"
          logoSrc="/Voxera-Logo-Black-1.svg"
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          onNavigate={(path) => router.push(path)}
        />
      </div>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          height: "100%",
          position: "relative",
          overflow: "auto",
          backgroundColor: "var(--color-white)",
          borderLeft: "1px solid #4B556338",
        }}
      >
        <style jsx>{`
          main::-webkit-scrollbar {
            display: none; /* ✅ hides scrollbar in Chrome/Safari */
          }
        `}</style>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
