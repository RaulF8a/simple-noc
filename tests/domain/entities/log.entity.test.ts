import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('./domain/entities/log.entity.ts', () => {
    const dataObj = {
        origin: 'log.entity.test.ts',
        message: 'Hola Mundo',
        level: LogSeverityLevel.high,
    };

    test('should create a LogEntity instance', () => {
        const log = new LogEntity(dataObj);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instance from JSON', () => {
        const json = '{"message":"Service https://google.com working.","level":"low","createdAt":"2024-02-16T21:26:35.276Z","origin":"check-service.use-case.ts"}';

        const log = LogEntity.fromJson(json);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( 'Service https://google.com working.' );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.origin ).toBe( 'check-service.use-case.ts' );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instance from object', () => {
        const log = LogEntity.fromObject(dataObj);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.createdAt ).toBeInstanceOf( Date );
    });

});
