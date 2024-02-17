import { envs } from '../../../src/config/plugins/envs.plugin';

describe('./config/plugins/envs.plugin.ts', () => { 

    test('should return env options', () => {
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'gamingjuicecontact@gmail.com',
            MAILER_SECRET_KEY: 'gpmmpyrcavhldnpm',
            PROD: false,
            MONGO_URL: 'mongodb://raul:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'raul',
            MONGO_PASS: '123456789'
        });
    });
    
    test('should return error if env not found', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try{
            await import('../../../src/config/plugins/envs.plugin');

            expect( true ).toBeFalsy();
        }   
        catch(error){
            expect( `${error}` ).toContain('"PORT" should be a valid integer')
        }
    });

});
