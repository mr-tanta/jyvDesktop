import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
  Img,
} from '@react-email/components';
import * as React from 'react';

interface BetaWelcomeEmailProps {
  name: string;
  email: string;
  company?: string;
  role: string;
  tier: string;
  isAdmin?: boolean;
}

export const BetaWelcomeEmail = ({
  name,
  email,
  company,
  role,
  tier,
  isAdmin = false,
}: BetaWelcomeEmailProps) => {
  const previewText = isAdmin 
    ? `New Beta Application - ${tier} Tier`
    : `Thank you for applying to the JyvDesktop Beta Program`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src="https://your-domain.com/logo.png"
              width="150"
              height="40"
              alt="JyvDesktop"
              style={logo}
            />
          </Section>

          {/* Gradient Banner */}
          <Section style={banner}>
            <Heading style={h1}>
              {isAdmin ? 'New Beta Application Received' : 'Welcome to JyvDesktop Beta'}
            </Heading>
          </Section>

          <Section style={section}>
            {isAdmin ? (
              // Admin Email Content
              <>
                <Text style={text}>
                  A new beta application has been received for the <span style={highlight}>{tier}</span> tier.
                </Text>

                <Text style={text}>
                  <strong>Applicant Details:</strong>
                </Text>

                <Section style={detailSection}>
                  <Text style={detailText}>
                    Name: {name}
                    <br />
                    Email: {email}
                    <br />
                    {company && (
                      <>
                        Company: {company}
                        <br />
                      </>
                    )}
                    Role: {role}
                  </Text>
                </Section>

                <Hr style={hr} />

                <Text style={text}>
                  Please review this application in the admin dashboard:
                </Text>

                <Link
                  href="https://admin.jyvstream.com/beta-applications"
                  style={button}
                >
                  Review Application
                </Link>
              </>
            ) : (
              // Applicant Email Content
              <>
                <Text style={text}>
                  Hi {name},
                </Text>

                <Text style={text}>
                  Thank you for applying to the JyvDesktop Beta Program! We're excited about your interest in helping us shape the future of audio enhancement technology.
                </Text>

                <Section style={featureSection}>
                  <Text style={featureTitle}>What's Next?</Text>
                  <Text style={text}>
                    1. Our team will review your application for the <span style={highlight}>{tier}</span> tier
                    <br />
                    2. You'll receive a decision within 2-3 business days
                    <br />
                    3. If selected, you'll get immediate access to the beta
                  </Text>
                </Section>

                <Section style={featureSection}>
                  <Text style={featureTitle}>Beta Program Benefits</Text>
                  <ul style={featureList}>
                    <li>Early access to cutting-edge features</li>
                    <li>Direct channel to our development team</li>
                    <li>Influence product development</li>
                    <li>Exclusive beta community access</li>
                  </ul>
                </Section>

                <Hr style={hr} />

                <Text style={text}>
                  Have questions? Check out our FAQ or reach out to our beta support team.
                </Text>

                <Link
                  href="https://jyvstream.com"
                  style={secondaryButton}
                >
                  View Beta FAQ
                </Link>
              </>
            )}

            <Text style={footer}>
              {isAdmin 
                ? 'This is an automated message from the JyvDesktop Beta Program.'
                : '© 2025 JyvStream. All rights reserved.'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default BetaWelcomeEmail;

const main = {
  backgroundColor: '#000000',
  color: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '0 0 48px',
  maxWidth: '600px',
};

const header = {
  padding: '20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const banner = {
  background: 'linear-gradient(to right, #10B981, #059669)',
  padding: '32px 20px',
  textAlign: 'center' as const,
  borderRadius: '12px 12px 0 0',
};

const section = {
  padding: '32px 24px',
  backgroundColor: '#111111',
  borderRadius: '0 0 12px 12px',
  border: '1px solid rgba(255,255,255,0.1)',
  borderTop: 'none',
};

const h1 = {
  color: '#FFFFFF',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '24px',
};

const detailSection = {
  backgroundColor: 'rgba(16,185,129,0.1)',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid rgba(16,185,129,0.2)',
  marginTop: '16px',
};

const detailText = {
  ...text,
  margin: '0',
};

const featureSection = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '24px',
};

const featureTitle = {
  color: '#10B981',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '12px',
};

const featureList = {
  ...text,
  paddingLeft: '20px',
  margin: '12px 0',
};

const highlight = {
  color: '#10B981',
  fontWeight: '600',
};

const button = {
  display: 'inline-block',
  backgroundColor: '#10B981',
  color: '#000000',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 24px',
  borderRadius: '6px',
  marginTop: '16px',
};

const secondaryButton = {
  ...button,
  backgroundColor: 'transparent',
  color: '#10B981',
  border: '1px solid #10B981',
};

const hr = {
  borderColor: 'rgba(255,255,255,0.1)',
  margin: '32px 0',
};

const footer = {
  ...text,
  color: '#666666',
  fontSize: '12px',
  marginTop: '32px',
  textAlign: 'center' as const,
}; 