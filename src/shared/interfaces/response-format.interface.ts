export interface ResponseFormatResponse {
    traceId: string;
    statusCode: number;
    timestamp: string;
    method: string;
    path: string;
    data: any;
    api: {
        service: string;
        version: string;
        datetime: string;
        timezone: string;
    };
    client: {
        version: string;
        timezone: string;
    };
}

export interface HeaderSettingsOptions {
    withTemplate: boolean;
    clientVersion: string;
    clientTimezone: string;
}