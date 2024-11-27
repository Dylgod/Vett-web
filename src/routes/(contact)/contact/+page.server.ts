import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';
import Mailgun from 'mailgun.js';
import formData from 'form-data';
import mjml2html from 'mjml';
import { fail } from '@sveltejs/kit';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions
const validateName = (name: string, field: string) => {
    if (!name || name.length < 2) {
        return `${field} must be at least 2 characters long`;
    }
    return null;
};

const validateEmail = (email: string) => {
    if (!email) {
        return 'Email is required';
    }
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
};

const validateMessage = (message: string) => {
    if (!message || message.length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return null;
};

const getContactEmailTemplate = (firstname: string, lastname: string, email: string, message: string) => `
<mjml>
  <mj-head>
    <mj-title>New Contact Form Submission</mj-title>
    <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" />
    <mj-attributes>
      <mj-all font-family="Inter, Arial, sans-serif" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#5b5b5b">
    <mj-section background-color="#1e293b" padding-bottom="0">
      <mj-column>
        <mj-text color="#ffffff" font-size="24px" font-weight="600" padding-bottom="30px">
          New Contact Request
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding="20px">
      <mj-column>
        <mj-text font-size="16px" color="#333333" font-weight="600" padding-bottom="20px">
          Contact Details:
        </mj-text>

        <mj-text font-size="14px" color="#666666">
          <strong>Name:</strong> ${firstname} ${lastname}
        </mj-text>
        
        <mj-text font-size="14px" color="#666666">
          <strong>Email:</strong> ${email}
        </mj-text>

        <mj-divider border-color="#e5e7eb" padding="20px 0" />

        <mj-text font-size="16px" color="#333333" font-weight="600" padding-bottom="20px">
          Message:
        </mj-text>

        <mj-text font-size="14px" color="#666666" line-height="1.6">
          ${message}
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#f5f5f5">
      <mj-column>
        <mj-text align="center" color="#666666" font-size="12px">
          This message was sent from your website contact form.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const actions = {
    sendContactEmail: async ({ request }) => {
        try {
            const page_formData = await request.formData();

            const firstname = page_formData.get('first-name')?.toString() || '';
            const lastname = page_formData.get('last-name')?.toString() || '';
            const email = page_formData.get('email')?.toString() || '';
            const message = page_formData.get('message')?.toString() || '';

            // Validate all inputs
            const firstNameError = validateName(firstname, 'First name');
            const lastNameError = validateName(lastname, 'Last name');
            const emailError = validateEmail(email);
            const messageError = validateMessage(message);

            // If there are any validation errors, return them
            if (firstNameError || lastNameError || emailError || messageError) {
                return fail(400, {
                    success: false,
                    message: "Error with form values",
                });
            }

            const DOMAIN = MAILGUN_DOMAIN || '';
            const FROM_EMAIL = `Contact <${email}>`;

            // Generate email HTML from MJML template
            const mjmlTemplate = getContactEmailTemplate(firstname, lastname, email, message);
            const { html } = mjml2html(mjmlTemplate);

            // Setup mailgun
            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: 'api',
                key: MAILGUN_API_KEY || ''
            });

            // Send email
            const emailResult = await mg.messages.create(DOMAIN, {
                from: FROM_EMAIL,
                to: "support@vett.dev",
                subject: 'Contact Page Message',
                html: html
            });

            return {
                success: true,
                message: 'Your message has been sent!'
            };
        } catch (error) {
            
            return fail(500, {
                success: false,
                message: 'Failed to send email. Please try again later.'
            });
        }
    }
}