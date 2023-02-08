import * as nodemailer from 'nodemailer';

export class NodeMailer {
  private mailUser: string;
  private mailPassword: string;
  private mailHost: string;
  private mailPort: string;
  private transporter: any;
  constructor() {
    this.mailUser = process.env.MAIL_USER || '';
    this.mailPassword = process.env.MAIL_PASSWORD || '';
    this.mailHost = process.env.MAIL_HOST || '';
    this.mailPort = process.env.MAIL_PORT || '';

    this.transporter = nodemailer.createTransport({
      host: this.mailHost,
      port: Number(this.mailPort),
      secure: false,
      auth: {
        user: this.mailUser,
        pass: this.mailPassword,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    try {
      const mailOptions = {
        from: `"TEST NAME" <${this.mailUser}>`,
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
