import fs from 'fs';

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource {
    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-all.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor() { 
        this.createLogFiles();
    }

    private createLogFiles = () => {
        if( !fs.existsSync(this.logPath) ){
            fs.mkdirSync(this.logPath);
        }

        // Nos ahorra tener que escribir la condicion 3 veces.
        [
            this.allLogPath,
            this.mediumLogPath,
            this.highLogPath,
        ].forEach( path => {
            if( fs.existsSync(path) ) return;

            fs.writeFileSync(path, '');
        })
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        if( content === '' ) return [];
        
        const logs = content.split('\n').map(
            log => LogEntity.fromJson(log)
        );

        return logs;
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJSON = `${ JSON.stringify(newLog) }\n`;
        
        fs.appendFileSync(this.allLogPath, logAsJSON);

        if(newLog.level === LogSeverityLevel.low) return;

        if(newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogPath, logAsJSON);
        }
        else{
            fs.appendFileSync(this.highLogPath, logAsJSON);
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel){
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogPath);

            default:
                throw new Error(`${ severityLevel } not implemented.`);
        }
    }
    
}
