'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import { Mail, MessageSquare, User, Send } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Typography } from '@/components/base/Typography';
import { Card } from '@/components/base/Card';
import { Input } from '@/components/base/Input';
import { Button } from '@/components/base/Button';
import { contactSchema } from '@/lib/validation';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: async (values) => {
      console.log('Contact form submitted:', values);
      setSubmitted(true);
      setTimeout(() => {
        formik.resetForm();
        setSubmitted(false);
      }, 3000);
    },
  });

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--spacing-12)', paddingBottom: 'var(--spacing-20)' }}>
        <Container size="md">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
            <Typography variant="h1">Contact Us</Typography>
            <Typography variant="bodyLarge" color="muted" style={{ marginTop: 'var(--spacing-4)' }}>
              Have questions? We&apos;d love to hear from you.
            </Typography>
          </div>

          <Card>
            <Card.Body>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--spacing-8)' }}>
                  <Typography variant="h3" color="success">
                    Thank you for contacting us!
                  </Typography>
                  <Typography variant="body" color="muted" style={{ marginTop: 'var(--spacing-2)' }}>
                    We&apos;ll get back to you as soon as possible.
                  </Typography>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                  <Input
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Your name"
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
                    label="Email"
                    placeholder="your@email.com"
                    leftIcon={<Mail size={18} />}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
                    required
                  />

                  <Input
                    type="text"
                    name="subject"
                    label="Subject"
                    placeholder="What is this about?"
                    leftIcon={<MessageSquare size={18} />}
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.subject && formik.errors.subject ? formik.errors.subject : undefined}
                    required
                  />

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-neutral-700)' }}>
                      Message <span style={{ color: 'var(--color-error-500)' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      placeholder="Your message..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-3) var(--spacing-4)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: 'var(--line-height-normal)',
                        color: 'var(--color-neutral-900)',
                        backgroundColor: 'var(--color-neutral-0)',
                        border: `1px solid ${formik.touched.message && formik.errors.message ? 'var(--color-error-500)' : 'var(--color-neutral-300)'}`,
                        borderRadius: 'var(--radius-md)',
                        outline: 'none',
                        resize: 'vertical',
                        minHeight: '120px',
                      }}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-error-600)' }}>
                        {formik.errors.message}
                      </span>
                    )}
                  </div>

                  <Button type="submit" size="lg" fullWidth leftIcon={<Send size={20} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </Card.Body>
          </Card>
        </Container>
      </main>
    </>
  );
}
