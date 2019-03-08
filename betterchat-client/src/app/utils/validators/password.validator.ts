import { AbstractControl } from '@angular/forms';

export function validatePassword(control: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = control.get('password');
  const confirmControl = control.get('repeatPassword');
  if (passwordControl.pristine && confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }
  return { noMatch: true };
}
