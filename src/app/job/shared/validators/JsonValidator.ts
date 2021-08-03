import { AbstractControl, ValidationErrors } from "@angular/forms";

export class JsonValidator {
    static isJson(control: AbstractControl) : ValidationErrors | null{
        const error: ValidationErrors = { jsonInvalid: true };
        try {
            JSON.parse(control.value);
        } catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    }
}