import { HttpRequestConfigRequest } from "./HttpRequestConfigRequest";
import { NotificationConfigRequest } from "./NotificationConfigRequest";

export interface JobDetailRequest {
    groupId: number,
    taskId: number,
    name: string,
    description: string,
    cronExpression: string,
    enableNotifications: string,
    httpRequestConfigRequest: HttpRequestConfigRequest,
    notificationConfigRequest: NotificationConfigRequest,
}