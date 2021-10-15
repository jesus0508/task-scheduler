export interface NotificationConfigDTO {
	id: number,
	executionLimit: number,
	mainRecipients: Array<string>,
	secondaryRecipients: Array<string>,
}