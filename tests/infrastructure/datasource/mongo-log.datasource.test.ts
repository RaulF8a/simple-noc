import { MongoDatabase } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDataSource } from '../../../src/infrastructure/datasource/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo';

describe('./infrastructure/datasource/mongo-log.datasource.ts', () => {
    const logDataSource = new MongoLogDataSource();
    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'mongo-log.datasource.test.ts',
    });

    beforeAll(async () => {
        MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async () => {
        LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should create a log', async () => {
        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(log);

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith("Mongo Log created: ", expect.any(String));
    });

    // test('should get logs', async () => {
    //     await logDataSource.saveLog(log);

    //     const logs = await logDataSource.getLogs( LogSeverityLevel.low );

    //     expect( logs.length ).toBe(8);
    // });

});
