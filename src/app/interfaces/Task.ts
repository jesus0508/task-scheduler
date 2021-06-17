export interface Task {
    id: number,
    name: string,
    description: string,
    groupName: string,
    state: string,
    cronExpression: string
}