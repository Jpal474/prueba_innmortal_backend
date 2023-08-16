import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // o el proveedor de correo que vayas a utilizar
      auth: {
        user: 'jpavila447@gmail.com', // tu dirección de correo
        pass: 'khexzyjvkmnbcbue', // tu contraseña
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'jpavila447@gmail.com', // tu dirección de correo
      to,
      subject,
      html: htmlContent,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
