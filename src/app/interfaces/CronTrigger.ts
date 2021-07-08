export interface CronTrigger {
    nextFireTime: string,
    previousFireTime: string,
    state: string,
    createdAt: string,
    startTime: string,
    endTime: string,
    cronExpression: string
}