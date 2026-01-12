import nodemailer from "nodemailer";
import path from "path";

export async function sendMail(to: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject: "Full Stack Developer | MERN, React, Node | Immediate Availability",
    text: `
Hi HR,

I hope you’re doing well.

I’m Vikesh Kumar Mahto, a Full Stack Developer with 1.5+ years of hands-on experience building scalable, production-ready web applications using React, Next.js, Node.js, Express, MongoDB, and AWS.

Currently, I’m working as a Software Engineer where I:

• Built end-to-end MERN features used by real customers

• Improved performance and load speed by 40–60%

• Implemented secure authentication, role-based access, and payment integrations

• Delivered projects from idea to production in agile environments

I enjoy solving real-world problems, writing clean code, and taking ownership of features. I believe my skills and mindset would allow me to add value to your engineering team from day one.

I’ve attached my resume for your review. I’d really appreciate the opportunity to discuss how I can contribute to your team.

Looking forward to hearing from you.

Best regards,
Vikesh Kumar Mahto
Ranchi, India
kumarvikesh287@gmail.com
+91 8797717751
LinkedIn: linkedin.com/in/vikesh-kumar-mahto-15b5a722b
GitHub: github.com/vikeshub
`,
    attachments: [
      {
        filename: "vikeshResume.pdf",
        path: path.join(process.cwd(), "public/vikeshResume.pdf"),
      },
    ],
  });
}
