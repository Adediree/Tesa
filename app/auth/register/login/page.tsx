"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Card } from "@/components/base/Card";
import { Typography } from "@/components/base/Typography";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";
import { useRegisterMutation } from "@/lib/api/authApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";
import { registerSchema } from "@/lib/validation";
import { ROUTES } from "@/constants/routes";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage("");
        const response = await register(values).unwrap();
        dispatch(setCredentials(response));
        router.push(ROUTES.DASHBOARD.HOME);
      } catch (error: any) {
        setErrorMessage(
          error.data?.message || "Registration failed. Please try again."
        );
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Card>
          <Card.Body>
            <div className={styles.header}>
              <Typography variant="h2">Sign In</Typography>
              <Typography variant="body" color="muted">
                Continue your learning journey with Qucoon Tesa
              </Typography>
            </div>

            {errorMessage && (
              <Typography variant="bodySmall" color="error">
                {errorMessage}
              </Typography>
            )}

            <form onSubmit={formik.handleSubmit} className={styles.form}>
              {/* <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                leftIcon={<User size={18} />}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                required
              /> */}

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                leftIcon={<Mail size={18} />}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : undefined
                }
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                leftIcon={<Lock size={18} />}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
                required
              />

              {/* <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                leftIcon={<Lock size={18} />}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : undefined}
                required
              /> */}

              <Button
                type="submit"
                size="lg"
                fullWidth
                loading={isLoading}
                // leftIcon={<UserPlus size={20} />}
              >
                Sign In
              </Button>
            </form>

            <Typography variant="bodySmall" align="center">
              Don't have an account?{" "}
              <Link href={ROUTES.AUTH.REGISTER} className={styles.link}>
                Sign up
              </Link>
            </Typography>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
