import { CronTrigger } from "./CronTrigger";
import { Task } from "./Task";
import { Group } from "./Group";
import { JobSettingDTO } from "./JobSettingDTO";

export interface JobDetailInfoDTO {
    id: number,
    uuid: string,
    name: string,
    description: string,
    task: Task,
    jobGroup: Group,
    cronTriggers: Array<CronTrigger>,
    restJobDetailInfo: JobSettingDTO
}