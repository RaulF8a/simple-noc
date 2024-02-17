import mongoose from 'mongoose';
import { MongoDatabase } from '../../../src/data/mongo/init';

describe('./data/mongo/init.ts', () => {

    afterAll(() => {
        mongoose.connection.close();
    });

    test('should connect to mongodb', async () => {
        const connected = await MongoDatabase.connect({
            dbName: process.env.DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
        });

        expect( connected ).toBe( true );
    });

    test('should throw an error', async () => {
        try{
            const connected = await MongoDatabase.connect({
                dbName: process.env.DB_NAME!,
                mongoUrl: 'nan',
            });
    
            expect( false ).toBe( true );
        }
        catch(error){

        }
    });

});
