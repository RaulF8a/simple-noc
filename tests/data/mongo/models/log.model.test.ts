import { MongoDatabase } from '../../../../src/data/mongo/init';
import { envs } from '../../../../src/config/plugins/envs.plugin';
import { LogModel } from '../../../../src/data/mongo/models/log.model';
import mongoose from 'mongoose';

describe('./data/mongo/models/log.model.ts', () => {
    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        })
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should return LogModel' , async () => {
        const logData = {
            origin: 'log.model.test.ts',
            message: 'test-message',
            level: 'low',
        };

        const log = await LogModel.create( logData );

        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            id: expect.any(String),
            createdAt: expect.any(Date),
        }) );

        await LogModel.findByIdAndDelete( log.id );
    });

    test('should return the schema object', () => {
        const schema = LogModel.schema.obj;

        expect( schema ).toEqual( expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            level: {
                type: expect.any(Function),
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },
            createdAt: expect.any(Object),
            origin: expect.any(Function)
        }) );
        
    });

});
