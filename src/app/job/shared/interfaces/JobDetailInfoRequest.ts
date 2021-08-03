export interface JobDetailInfoRequest {
    groupId: number,
    taskId: number,
    name: string,
    description: string,
    cronExpression: string
    httpMethod: string,
    url: string,
    httpHeaders: Record<string, string>,
    httpBody: Record<string, string>,
}