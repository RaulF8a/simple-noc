import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.use-case";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { EmailService } from "./email/email.service";

// Instancias de repositorios.
const fileSystemLogRepository = new LogRepositoryImplementation( 
    new FileSystemDatasource() 
);

// Instancias de servicio.
const emailService = new EmailService();

export class Server {
    constructor() { }

    public static start(){
        console.log('Server started...');
        
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(['']);

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // let url = 'https://google.com';
        //         let url = 'http://localhost:3000';

        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             ( error ) => console.log( error ),
        //         ).execute(url);
        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );
    }
}
