import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { CronService } from "./cron/cron-service";

export class Server {
    constructor() { }

    public static start(){
        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                let url = 'https://google.com';

                new CheckService(
                    () => console.log(`${url} is ok`),
                    ( error ) => console.log( error ),
                ).execute(url);
                // new CheckService().execute('http://localhost:3000');
            }
        );
    }
}
