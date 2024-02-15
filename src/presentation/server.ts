import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";

// Instancias de repositorios.
const fileSystemLogRepository = new LogRepositoryImplementation( 
    new FileSystemDatasource() 
);

export class Server {
    constructor() { }

    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // let url = 'https://google.com';
                let url = 'http://localhost:3000';

                new CheckService(
                    fileSystemLogRepository,
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error ),
                ).execute(url);
                // new CheckService().execute('http://localhost:3000');
            }
        );
    }
}
