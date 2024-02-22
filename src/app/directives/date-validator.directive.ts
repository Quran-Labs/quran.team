import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[ngxDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateValidatorDirective,
    multi: true
  }]
})
export class DateValidatorDirective implements Validator {
    validate(control: AbstractControl) : {[key: string]: any} | null {
      if (control.value && (control.value<150 || control.value>1445)) {
        return { 'dateInvalid': true };
      }
      return null;
    }
}
