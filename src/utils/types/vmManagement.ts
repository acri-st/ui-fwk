export enum SERVER_STATUS {
    CREATING = "CREATING",
    INSTALLING = "INSTALLING",
    RESETTING = "RESETTING",
    DELETING = "DELETING",
    SUSPENDING = "SUSPENDING",
    RESUMING = "RESUMING",

    ERROR = "ERROR",
    READY = "READY",
    SUSPENDED = "SUSPENDED",
    DELETED = "DELETED",
}


export type IServer = {
    id: string
    public_ip: string
    state: SERVER_STATUS
}


export type IMonitoringData = {
    timestamp: number;
    value: number;
}[]

export type IMetricValue = {
    name: string;
    data: IMonitoringData;
}