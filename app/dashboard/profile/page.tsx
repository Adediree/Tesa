'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { User, Mail, Save } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Input } from '@/components/base/Input';
import { Button } from '@/components/base/Button';
import { Badge } from '@/components/base/Badge';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setCredentials } from '@/lib/redux/slices/authSlice';
import { profileSchema } from '@/lib/validation';
import { ROUTES } from '@/constants/routes';
import { getInitials } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      if (user) {
        const updatedUser = { ...user, ...values };
        dispatch(setCredentials({ user: updatedUser, token: '' }));
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    },
  });

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container size="md">
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <Typography variant="h1">Profile</Typography>
            <Typography variant="bodyLarge" color="muted">
              Manage your personal information
            </Typography>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <Card>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)', textAlign: 'center' }}>
                  <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-600)',
                    color: 'var(--color-neutral-0)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}>
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <Typography variant="h3">{user.name}</Typography>
                    <Typography variant="body" color="muted">{user.email}</Typography>
                  </div>
                  <Badge variant={user.role === 'paid' ? 'success' : 'default'}>
                    {user.role.toUpperCase()} ACCOUNT
                  </Badge>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Typography variant="h3">Personal Information</Typography>
              </Card.Header>
              <Card.Body>
                {updateSuccess && (
                  <div style={{
                    padding: 'var(--spacing-4)',
                    backgroundColor: 'var(--color-success-50)',
                    border: '1px solid var(--color-success-200)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-4)',
                  }}>
                    <Typography variant="body" color="success">
                      Profile updated successfully!
                    </Typography>
                  </div>
                )}

                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <Input
                    type="text"
                    name="name"
                    label="Full Name"
                    placeholder="Enter your name"
                    leftIcon={<User size={18} />}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
                    required
                  />

                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    leftIcon={<Mail size={18} />}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    required
                  />

                  <Button type="submit" leftIcon={<Save size={20} />}>
                    Save Changes
                  </Button>
                </form>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Typography variant="h3">Account Statistics</Typography>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-4)' }}>
                  <div>
                    <Typography variant="bodySmall" color="muted">Account Type</Typography>
                    <Typography variant="h4">{user.role === 'paid' ? 'Premium' : 'Free'}</Typography>
                  </div>
                  <div>
                    <Typography variant="bodySmall" color="muted">Member Since</Typography>
                    <Typography variant="h4">January 2024</Typography>
                  </div>
                  <div>
                    <Typography variant="bodySmall" color="muted">Courses Completed</Typography>
                    <Typography variant="h4">0</Typography>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}
