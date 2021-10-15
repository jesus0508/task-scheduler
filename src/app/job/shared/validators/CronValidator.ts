import { AbstractControl, ValidationErrors } from "@angular/forms";
import { isValidCronExpression } from "cron-expression-validator";

export class CronValidator {
    static isValid(control: AbstractControl): ValidationErrors | null {
        const error: ValidationErrors = { cronInvalid: true };
        if (isValidCronExpression(control.value)) {
            control.setErrors(null);
            return null;
        } else {
            control.setErrors(error);
            return error;
        }

    }
}