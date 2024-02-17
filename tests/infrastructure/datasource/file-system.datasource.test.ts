import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from '../../../src/infrastructure/datasource/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('./infrastructure/datasource/file-system.datasource.ts ', () => {
    const logPath = path.join(__dirname, '../../../logs');
    
    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
    });

    test('should create log files if they do not exist', () => {
        new FileSystemDatasource();

        const files = fs.readdirSync( logPath );

        expect( files ).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
    });

    test('should save a log in logs-all.log', () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf8');

        expect( allLogs ).toContain( JSON.stringify(log) );
    });
    
    test('should save a log in logs-all.log and logs-medium.log', () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf8');
        const mediumLogs = fs.readFileSync(`${ logPath }/logs-medium.log`, 'utf8');

        expect( allLogs ).toContain( JSON.stringify(log) );
        expect( mediumLogs ).toContain( JSON.stringify(log) );
    });
    
    test('should save a log in logs-all.log and logs-high.log', () => {
        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts',
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${ logPath }/logs-all.log`, 'utf8');
        const highLogs = fs.readFileSync(`${ logPath }/logs-high.log`, 'utf8');

        expect( allLogs ).toContain( JSON.stringify(log) );
        expect( highLogs ).toContain( JSON.stringify(log) );
    });

    test('should return all logs', async () => {
        const logDatasource = new FileSystemDatasource();
        
        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'low',
            origin: 'file-system.datasource.test.ts',
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'medium',
            origin: 'file-system.datasource.test.ts',
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'high',
            origin: 'file-system.datasource.test.ts',
        });

        await logDatasource.saveLog( logLow );
        await logDatasource.saveLog( logMedium );
        await logDatasource.saveLog( logHigh );
    });
});
