import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';
import * as HijriJS from 'hijri-js';

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
      var current_year = HijriJS.initialize().today().year;
      if (control.value && (control.value<150 || control.value>current_year)) {
        return { 'dateInvalid': true };
      }
      return null;
    }
}
