import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";

export class PhoneValidator {

    static mobileUniqueness(userService) : AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise( (resolve, reject) => {
                userService.mobileValidation(control.value)
                .subscribe(result => {
                    if(result['_body'] == 'true') return resolve({ mobileExists: true});

                    resolve(null);
                })
            })
        } 
    }

    static isValidPhone(control: AbstractControl) : ValidationErrors | null {
        if (!(control.value as string).match(/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/i)) 
            return { isValidPhone: true};
        return null;
    }
}