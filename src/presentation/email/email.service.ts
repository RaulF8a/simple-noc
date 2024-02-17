import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    fileName: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() { }

    async sendEmail({ to, subject, htmlBody, attachments = [] }: SendMailOptions): Promise<boolean> {

        try{
            const sendInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments,
            });

            // console.log(sendInformation);
            return true;
        }
        catch(error){
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del sistema - NOC</h3>
            <p>Se adjuntan los logs del sistema al dia de hoy.</p>
        `;
        const attachments: Attachment[] = [
            { fileName: 'logs-all.log', path: './logs/logs-all.log' },
            { fileName: 'logs-high.log', path: './logs/logs-high.log' },
            { fileName: 'logs-medium.log', path: './logs/logs-medium.log' },
        ];

        this.sendEmail({ to, subject, attachments, htmlBody });
    }
}
