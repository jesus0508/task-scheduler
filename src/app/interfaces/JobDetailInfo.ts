import { CronTrigger } from "./CronTrigger";
import { Task } from "./Task";
import { JobGroup } from "./JobGroup";

export interface JobDetailInfo {
    id: number,
    uuid: string,
    name: string,
    description: string,
    task: Task,
    jobGroup: JobGroup,
    triggers: Array<CronTrigger>,
    additions: Record<string, string>
}