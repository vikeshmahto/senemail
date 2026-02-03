import nodemailer from "nodemailer";
import path from "path";

const subjects = [
  "Full Stack Developer | MERN, React, Node | Immediate Availability",
  "Full Stack Developer Application ",
  "Resume for Full Stack Developer Position",
  "Resume for Software Engineer",
  "Application for Software Developer",
  "Software Developer Application",
];

export async function sendMail(to: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const subject = subjects[Math.floor(Math.random() * subjects.length)];

  await transporter.sendMail({
    from: `"Vikesh Kumar Mahto" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #222; line-height: 1.6; max-width: 600px;">
        
        <p>Hi <strong>Hiring Team</strong>,</p>

        <p>
          I hope you’re doing well.
        </p>

        <p>
          My name is <strong>Vikesh Kumar Mahto</strong>, a 
          <strong>Full Stack Developer</strong> with <strong>1.5+ years</strong> of hands-on experience
          building scalable, production-ready web applications.
        </p>

        <p>
          I specialize in:
          <strong>React, Next.js, Node.js, Express, MongoDB, and AWS</strong>.
        </p>

        <p>
          In my current role as a <strong>Software Engineer</strong>, I have:
        </p>

        <ul style="padding-left: 18px;">
          <li><strong>Built</strong> end-to-end MERN features used by real customers</li>
          <li><strong>Improved</strong> performance and load speed by <strong>40–60%</strong></li>
          <li><strong>Implemented</strong> secure authentication, role-based access, and payment integrations</li>
          <li><strong>Delivered</strong> projects from idea to production in agile environments</li>
        </ul>

        <p>
          I enjoy solving real-world problems, writing clean and maintainable code, and
          taking ownership of features from start to finish.
        </p>

        <p>
          I’ve attached my resume for your review. I would really appreciate the opportunity
          to discuss how I can contribute to your engineering team.
        </p>

        <p>
          Looking forward to hearing from you.
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <p style="margin-bottom: 4px;">
          <strong>Best regards,</strong><br />
          <strong>Vikesh Kumar Mahto</strong>
        </p>

        <p style="font-size: 14px; color: #555;">
          Ranchi, India<br />
           <a href="mailto:kumarvikesh287@gmail.com">kumarvikesh287@gmail.com</a><br />
           +91 8797717751<br />
           <a href="https://linkedin.com/in/vikesh-kumar-mahto-15b5a722b">LinkedIn</a> |
          <a href="https://github.com/vikeshub">GitHub</a>
        </p>

      </div>
    `,
    headers: {
      "X-Mailer": "Nodemailer",
    },
    attachments: [
      {
        filename: "Vikesh_Kumar_Mahto_Resume.pdf",
        path: path.join(process.cwd(), "public/vikeshResume.pdf"),
      },
    ],
  });
}
