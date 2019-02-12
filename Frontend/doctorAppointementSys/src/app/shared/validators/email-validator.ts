import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";

export class EmailValidator {
    static emailUniqueness(userService) : AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise( (resolve, reject) => {
                userService.emailVerification(control.value)
                  .subscribe(result => {
                      if(result['_body'] == 'true') return resolve({ emailExists: true});
                      resolve(null);
                  })
              })
        } 
    }
}