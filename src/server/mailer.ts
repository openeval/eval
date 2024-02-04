import nodemailer from "nodemailer";

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
    from: env.SMTP_FROM,
  },
);

export { transporter };
