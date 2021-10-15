export interface NotificationConfigRequest {
    executionLimit: number,
    mainRecipients: Array<string>,
    secondaryRecipients: Array<string>,
}