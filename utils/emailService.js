import nodemailer from "nodemailer";
import logger from "../config/logger.js";

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send lead notification email
export const sendLeadNotification = async (leadData) => {
  try {
    const transporter = createTransporter();

    const {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      budget,
      company,
      region,
      services,
      projectDetails,
    } = leadData;

    // Email content
    const subject = `New Lead Received - ${firstName} ${lastName}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          🎯 New Lead Received
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
          <p><strong>Company:</strong> ${company || "Not specified"}</p>
          <p><strong>Region:</strong> ${region}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">Project Details</h3>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Services:</strong> ${services.join(", ")}</p>
          <p><strong>Project Details:</strong></p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${projectDetails}
          </div>
        </div>
        
        <div style="background: #007bff; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <p style="margin: 0;">Please respond to this lead as soon as possible!</p>
        </div>
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
          This email was sent automatically from Nextelligentia lead management system.
        </p>
      </div>
    `;

    // Email recipients
    const recipients = [
      "sajood@nextelligentia.com",
      "marwah@nextelligentia.com",
    ];

    // Send email to each recipient
    const emailPromises = recipients.map((recipient) =>
      transporter.sendMail({
        from: `"Nextelligentia" <${process.env.EMAIL_USER}>`,
        to: recipient,
        subject: subject,
        html: htmlContent,
      })
    );

    await Promise.all(emailPromises);

    logger.info(
      `Lead notification emails sent successfully to: ${recipients.join(", ")}`
    );
    return { success: true, message: "Email notifications sent successfully" };
  } catch (error) {
    logger.error("Error sending lead notification email:", error);
    return {
      success: false,
      message: "Failed to send email notifications",
      error: error.message,
    };
  }
};

// Send welcome email to the lead (optional)
export const sendWelcomeEmail = async (leadData) => {
  try {
    const transporter = createTransporter();

    const { firstName, lastName, email } = leadData;

    const subject = `Thank you for your interest - Nextelligentia`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #007bff; text-align: center;">Thank You for Your Interest!</h2>
        
        <p>Dear ${firstName} ${lastName},</p>
        
        <p>Thank you for reaching out to Nextelligentia! We have received your project inquiry and our team will review it shortly.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #28a745; margin-top: 0;">What happens next?</h3>
          <ul>
            <li>Our team will review your project requirements</li>
            <li>We'll reach out to you within 24 hours</li>
            <li>We'll schedule a consultation to discuss your project in detail</li>
          </ul>
        </div>
        
        <p>If you have any urgent questions, feel free to contact us directly.</p>
        
        <p>Best regards,<br>
        <strong>Nextelligentia Team</strong></p>
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
          <p style="color: #666; font-size: 12px;">
            Nextelligentia Technologies<br>
            Email: info@nextelligentia.com
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Nextelligentia" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    logger.info(`Welcome email sent to: ${email}`);
    return { success: true, message: "Welcome email sent successfully" };
  } catch (error) {
    logger.error("Error sending welcome email:", error);
    return {
      success: false,
      message: "Failed to send welcome email",
      error: error.message,
    };
  }
};
