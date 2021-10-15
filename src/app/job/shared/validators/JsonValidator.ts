import { AbstractControl, ValidationErrors } from "@angular/forms";

export class JsonValidator {
    static isJson(control: AbstractControl): ValidationErrors | null {
        const error: ValidationErrors = { jsonInvalid: true };
        const value = control.value?.trim().length > 0 ? control.value : null;
        try {
            JSON.parse(value);
        } catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    }
}