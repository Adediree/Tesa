"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { Container } from "../Container";
import { Button } from "@/components/base/Button";
import { useAppSelector } from "@/lib/redux/hooks";
import { ROUTES } from "@/constants/routes";
import { getInitials } from "@/lib/utils";
import styles from "./Header.module.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const navLinks = [
    { href: ROUTES.CATALOG.SPECIALIZATIONS, label: "Programmes" },
    { href: ROUTES.MARKETING.ABOUT, label: "Certifications" },
    { href: ROUTES.MARKETING.PRICING, label: "Recruitment" },
    { href: ROUTES.MARKETING.CONTACT, label: "Community" },
  ];

  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.container}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            <GraduationCap size={32} />
            <span>Univaciti</span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.navLinkActive : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            {isAuthenticated && user ? (
              <Link href={ROUTES.DASHBOARD.HOME}>
                <button className={styles.userMenu}>
                  <div className={styles.avatar}>{getInitials(user.name)}</div>
                  <span>{user.name}</span>
                </button>
              </Link>
            ) : (
              <>
                <Link href={ROUTES.AUTH.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.AUTH.REGISTER}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.navLinkActive : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
