import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  budget: z.string().optional(),
  details: z.string().min(1, "Project details are required"),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { name, email, company, budget, details } = data;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dodoxtechstudio@gmail.com",
        pass: "fpsifaohidtwayql",
      },
    });

    const mailOptions = {
      from: `"DodoX Tech" <dodoxtechstudio@gmail.com>`,
      to: "dodoxtechstudio@gmail.com",
      replyTo: email,
      subject: `New Project Inquiry from ${name}`,
      text: `
You have a new project inquiry from your website contact form.

Details:
- Name: ${name}
- Email: ${email}
- Company: ${company || "Not provided"}
- Budget: ${budget || "Not provided"}

Project Details:
${details}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #030712; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Company:</td>
              <td style="padding: 8px 0;">${company || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Budget:</td>
              <td style="padding: 8px 0;">${budget || "N/A"}</td>
            </tr>
          </table>
          <h3 style="color: #030712; margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Project Details</h3>
          <p style="white-space: pre-wrap; line-height: 1.5; color: #374151;">${details}</p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Failed to send contact email:", error);
      throw new Error("Failed to send email. Please try again later.");
    }
  });
