export interface JobDetailInfoDTO {
    groupId: number,
    taskId: number,
    name: string,
    description: string,
    cronExpression: string,
    additions?: {
        entity: string,
        office: boolean,
        agent: boolean,
        atm: boolean,
    }
}