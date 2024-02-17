import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple.use-case';

describe('./domain/use-cases/check-service-multiple.use-case.ts', () => {
    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const callLogs = jest.fn();

    const checkService = new CheckServiceMultiple([mockRepo1, mockRepo2, mockRepo3], 
        successCallback, errorCallback);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute('https://www.google.com');
    
        expect( wasOk ).toBeTruthy();
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        expect( mockRepo1.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockRepo2.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockRepo3.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
    });
    
    test('should call errorCallback when fetch returns false', async () => {

        const wasOk = await checkService.execute('https://localhost:3001/');
    
        expect( wasOk ).toBeFalsy();
        expect( errorCallback ).toHaveBeenCalled();
        expect( successCallback ).not.toHaveBeenCalled();

        expect( mockRepo1.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockRepo2.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
        expect( mockRepo3.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity));
    });

});
