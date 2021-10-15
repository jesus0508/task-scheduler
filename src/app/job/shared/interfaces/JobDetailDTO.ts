import { CronTrigger } from "./CronTrigger";
import { Task } from "./Task";
import { Group } from "./Group";
import { HttpRequestConfigDTO } from "./HttpRequestConfigDTO";
import { NotificationConfigDTO } from "./NotificationConfigDTO";

export interface JobDetailDTO {
    id: number,
    uuid: string,
    name: string,
    description: string,
    task: Task,
    group: Group,
    cronTriggers: Array<CronTrigger>,
    enableNotifications: boolean,
    httpRequestConfig: HttpRequestConfigDTO,
    notificationConfig: NotificationConfigDTO, 
}