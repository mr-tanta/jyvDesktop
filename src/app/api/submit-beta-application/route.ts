import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import BetaWelcomeEmail from '@/emails/BetaWelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      role,
      useCase,
      experience,
      systemSpecs,
      feedback,
      tier
    } = body;

    // Send email to admin
    const adminEmailHtml = await render(
      BetaWelcomeEmail({
        name,
        email,
        company,
        role,
        tier,
        isAdmin: true
      })
    );

    // Send email to applicant
    const applicantEmailHtml = await render(
      BetaWelcomeEmail({
        name,
        email,
        company,
        role,
        tier,
        isAdmin: false
      })
    );

    // Send both emails
    const [adminEmail, applicantEmail] = await Promise.all([
      resend.emails.send({
        from: 'JyvDesktop Beta <jyysteam@tantainnovatives.com>',
        to: 'sir.tanta@gmail.com',
        subject: `New Beta Application - ${tier.toUpperCase()} Tier`,
        html: adminEmailHtml,
        text: `
          New Beta Application
          
          Tier: ${tier}
          Name: ${name}
          Email: ${email}
          Company: ${company || 'N/A'}
          Role: ${role}
          
          Use Case:
          ${useCase}
          
          Experience:
          ${experience || 'N/A'}
          
          System Specifications:
          ${systemSpecs}
          
          Additional Comments:
          ${feedback || 'N/A'}
        `,
      }),
      resend.emails.send({
        from: 'JyvDesktop Beta <jyysteam@tantainnovatives.com>',
        to: email,
        subject: 'Welcome to JyvDesktop Beta Program',
        html: applicantEmailHtml,
        text: `
          Hi ${name},

          Thank you for applying to the JyvDesktop Beta Program! We're excited about your interest in helping us shape the future of audio enhancement technology.

          What's Next?
          1. Our team will review your application for the ${tier} tier
          2. You'll receive a decision within 2-3 business days
          3. If selected, you'll get immediate access to the beta

          Have questions? Visit our FAQ at https://jyvstream.com/beta-faq or reach out to our beta support team.

          Best regards,
          The JyvDesktop Team
        `,
      }),
    ]);

    if (adminEmail.error || applicantEmail.error) {
      throw new Error('Failed to send one or more emails');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error submitting application' },
      { status: 500 }
    );
  }
} 