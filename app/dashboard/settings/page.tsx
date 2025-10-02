'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Mail, Globe, Moon, Sun, Lock, CreditCard } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.AUTH.LOGIN);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSaveNotifications = () => {
    console.log('Saving notification preferences...');
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container size="md">
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <Typography variant="h1">Settings</Typography>
            <Typography variant="bodyLarge" color="muted">
              Manage your account preferences and settings
            </Typography>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
            <Card>
              <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                  <Bell size={24} />
                  <Typography variant="h3">Notifications</Typography>
                </div>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--color-neutral-200)' }}>
                    <div>
                      <Typography variant="body">Email Notifications</Typography>
                      <Typography variant="bodySmall" color="muted">
                        Receive updates about your courses via email
                      </Typography>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: emailNotifications ? 'var(--color-primary-600)' : 'var(--color-neutral-300)',
                        transition: 'var(--transition-base)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: emailNotifications ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: 'var(--transition-base)',
                          borderRadius: 'var(--radius-full)',
                        }} />
                      </span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--color-neutral-200)' }}>
                    <div>
                      <Typography variant="body">Push Notifications</Typography>
                      <Typography variant="bodySmall" color="muted">
                        Get notified about live classes and deadlines
                      </Typography>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: pushNotifications ? 'var(--color-primary-600)' : 'var(--color-neutral-300)',
                        transition: 'var(--transition-base)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: pushNotifications ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: 'var(--transition-base)',
                          borderRadius: 'var(--radius-full)',
                        }} />
                      </span>
                    </label>
                  </div>

                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                  <Globe size={24} />
                  <Typography variant="h3">Preferences</Typography>
                </div>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--spacing-4)', borderBottom: '1px solid var(--color-neutral-200)' }}>
                    <div>
                      <Typography variant="body">Language</Typography>
                      <Typography variant="bodySmall" color="muted">
                        Choose your preferred language
                      </Typography>
                    </div>
                    <select style={{
                      padding: 'var(--spacing-2) var(--spacing-4)',
                      fontSize: 'var(--font-size-base)',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-neutral-0)',
                    }}>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="body">Dark Mode</Typography>
                      <Typography variant="bodySmall" color="muted">
                        Switch between light and dark theme
                      </Typography>
                    </div>
                    <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '24px' }}>
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: darkMode ? 'var(--color-primary-600)' : 'var(--color-neutral-300)',
                        transition: 'var(--transition-base)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: darkMode ? '26px' : '3px',
                          bottom: '3px',
                          backgroundColor: 'white',
                          transition: 'var(--transition-base)',
                          borderRadius: 'var(--radius-full)',
                        }} />
                      </span>
                    </label>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                  <Lock size={24} />
                  <Typography variant="h3">Security</Typography>
                </div>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Typography variant="body">Password</Typography>
                      <Typography variant="bodySmall" color="muted">
                        Change your password
                      </Typography>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {user.role === 'free' && (
              <Card>
                <Card.Header>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                    <CreditCard size={24} />
                    <Typography variant="h3">Subscription</Typography>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <Typography variant="body" color="muted">
                      Upgrade to Premium to unlock all courses, live classes, and exclusive content.
                    </Typography>
                    <Link href={ROUTES.MARKETING.PRICING}>
                      <Button variant="primary">Upgrade to Premium</Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}
