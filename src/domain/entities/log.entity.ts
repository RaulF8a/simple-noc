
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {
    public level: LogSeverityLevel; 
    public message: string; 
    public createdAt: Date;
    public origin: string;

    constructor( { message, level, createdAt = new Date(), origin }: LogEntityOptions) {
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }
    
    static fromJson = (jsonData: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(jsonData);

        const log = new LogEntity({
            message, 
            level, 
            createdAt,
            origin,
        });

        return log;
    }
}
