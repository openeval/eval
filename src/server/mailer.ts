import nodemailer from "nodemailer";

import { siteConfig } from "~/config/site";
import { env } from "~/env.mjs";

const transporter = nodemailer.createTransport(
  {
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  },
  {
    from: `"${siteConfig.name}" <${env.SMTP_FROM}>`,
  },
);

export { transporter };
