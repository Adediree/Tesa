'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, BookOpen, Video, TrendingUp, Activity } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Button } from '@/components/base/Button';
import { useAppSelector } from '@/lib/redux/hooks';
import { ROUTES } from '@/constants/routes';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push(ROUTES.HOME);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const stats = [
    {
      label: 'Total Users',
      value: '50,234',
      icon: <Users size={24} />,
      change: '+12.5%',
      href: ROUTES.ADMIN.USERS,
    },
    {
      label: 'Active Courses',
      value: '142',
      icon: <BookOpen size={24} />,
      change: '+3.2%',
      href: ROUTES.ADMIN.COURSES,
    },
    {
      label: 'Live Classes',
      value: '28',
      icon: <Video size={24} />,
      change: '+8.1%',
      href: ROUTES.ADMIN.LIVE_CLASSES,
    },
    {
      label: 'Completion Rate',
      value: '87%',
      icon: <TrendingUp size={24} />,
      change: '+2.3%',
      href: ROUTES.ADMIN.ANALYTICS,
    },
  ];

  const recentActivity = [
    { user: 'John Doe', action: 'Completed AI Fundamentals', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'Enrolled in Data Analytics', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'Started Python Basics', time: '6 hours ago' },
    { user: 'Sarah Williams', action: 'Earned ML Certificate', time: '8 hours ago' },
  ];

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)', backgroundColor: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <Container>
          <div style={{ marginBottom: 'var(--spacing-8)' }}>
            <Typography variant="h1">Admin Dashboard</Typography>
            <Typography variant="bodyLarge" color="muted">
              Manage your platform and monitor performance
            </Typography>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-12)' }}>
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card hoverable>
                  <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Typography variant="bodySmall" color="muted">{stat.label}</Typography>
                        <Typography variant="h2" style={{ marginTop: 'var(--spacing-2)' }}>{stat.value}</Typography>
                        <Typography variant="caption" color="success" style={{ marginTop: 'var(--spacing-1)' }}>
                          {stat.change} from last month
                        </Typography>
                      </div>
                      <div style={{ color: 'var(--color-primary-600)' }}>{stat.icon}</div>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-6)' }}>
            <Card>
              <Card.Header>
                <Typography variant="h3">Quick Actions</Typography>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--spacing-3)' }}>
                  <Link href={ROUTES.ADMIN.COURSES}>
                    <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                      <BookOpen size={20} style={{ marginRight: 'var(--spacing-2)' }} />
                      Manage Courses
                    </Button>
                  </Link>
                  <Link href={ROUTES.ADMIN.USERS}>
                    <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                      <Users size={20} style={{ marginRight: 'var(--spacing-2)' }} />
                      Manage Users
                    </Button>
                  </Link>
                  <Link href={ROUTES.ADMIN.LIVE_CLASSES}>
                    <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                      <Video size={20} style={{ marginRight: 'var(--spacing-2)' }} />
                      Schedule Live Class
                    </Button>
                  </Link>
                  <Link href={ROUTES.ADMIN.ANALYTICS}>
                    <Button variant="outline" fullWidth style={{ justifyContent: 'flex-start' }}>
                      <Activity size={20} style={{ marginRight: 'var(--spacing-2)' }} />
                      View Analytics
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <Typography variant="h3">Recent Activity</Typography>
              </Card.Header>
              <Card.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  {recentActivity.map((activity, index) => (
                    <div key={index} style={{ paddingBottom: 'var(--spacing-4)', borderBottom: index !== recentActivity.length - 1 ? '1px solid var(--color-neutral-200)' : 'none' }}>
                      <Typography variant="body">{activity.user}</Typography>
                      <Typography variant="bodySmall" color="muted">{activity.action}</Typography>
                      <Typography variant="caption" color="muted">{activity.time}</Typography>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </main>
    </>
  );
}
