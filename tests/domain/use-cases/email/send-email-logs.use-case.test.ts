import { LogEntity } from '../../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs.use-case';

describe('./use-cases/email/send-email-logs.use-case.ts', () => {
    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    };
    const mockRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockRepository,
    );

    test('should call sendEmail and sendLog', async () => {
        const result = await sendEmailLogs.execute('raul@gmail.com');

        expect( result ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
    });
    
    // test('should log in case of error', async () => {
    //     mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    //     const result = await sendEmailLogs.execute('raul@gmail.com');

    //     expect( result ).toBe( false );
    //     expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
    //     expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
    // });

});
