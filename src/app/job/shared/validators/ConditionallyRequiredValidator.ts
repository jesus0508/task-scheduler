import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export class ConditionallyRequiredValidator {
    static required(control: AbstractControl): ValidationErrors | null {
        const error: ValidationErrors = { isRequired: true };
        const taskId = control.parent?.get('jobDetailForm.taskId')?.value;
        if(taskId === 3) {
            return Validators.required(control);
        }
        control.setErrors(null);
        return null;
    }
}