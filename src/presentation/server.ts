import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple.use-case";
import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.use-case";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasource/postgres-log.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

// Instancias de repositorios.
const fsLogRepository = new LogRepositoryImplementation( 
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImplementation( 
    new MongoLogDataSource(),
);

const postgresLogRepository = new LogRepositoryImplementation( 
    new PostgresLogDataSource(),
);

// Instancias de servicio.
const emailService = new EmailService();

export class Server {
    constructor() { }

    public static async start(){
        console.log('Server started...');
        
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckServiceMultiple(
                    [ fsLogRepository, postgresLogRepository, mongoLogRepository ],
                    () => console.log(`${envs.SERVICE_URL} is ok`),
                    ( error ) => console.log( error ),
                ).execute(envs.SERVICE_URL);
            }
        );
        
        CronService.createJob(
            '00 00 00 * * *',
            () => {
                new SendEmailLogs(
                    emailService,
                    postgresLogRepository
                ).execute(['logs-email@google.com']);
            }
        );
    }
}
