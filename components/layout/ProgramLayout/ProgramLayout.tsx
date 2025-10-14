"use client";
import { Typography } from "qucoon-components";
import Image from "next/image";
import { Header } from "../Header";
import { Footer } from "../Footer/Footer";
import { Container } from "../Container";
import styles from "./ProgramLayout.module.css";
import ProgramCard from "@/components/base/ProgramCard/ProgramCard";

interface Specialization {
  title: string;
  description: string;
  image: string;
}

export type ProgramLayoutProps = {
  img?: string;
  title?: string;
  subtitle?: string;
  text?: string;
  logo?: string;
  // specializations?: Specialization[];
  mainContainerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
const ProgramLayout = ({
  children,
  img,
  title,
  text,
  subtitle,
  logo,
  // specializations = [],
  mainContainerProps,
  ...props
}: ProgramLayoutProps) => {
  return (
    <>
      <Header />
      <main className={styles.body}>
        <Container>
          <div>
            <div>
              <Typography>{title}</Typography>
              <Typography>{subtitle}</Typography>
              <Typography>{text}</Typography>
            </div>
            {children}
            {/* <ProgramCard specializations={specializations} /> */}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ProgramLayout;
