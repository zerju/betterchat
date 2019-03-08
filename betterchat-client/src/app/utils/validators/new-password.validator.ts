import { AbstractControl } from '@angular/forms';

export function newPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = control.get('password');
  const confirmControl = control.get('repeatPassword');
  const currentPassControl = control.get('currentPassword');
  if (
    (passwordControl.value == null || passwordControl.value === '') &&
    (confirmControl.value == null || confirmControl.value === '') &&
    (currentPassControl.value == null || currentPassControl.value === '')
  ) {
    return null;
  }
  if (
    passwordControl.value != null &&
    passwordControl.value !== '' &&
    (confirmControl.value != null && confirmControl.value !== '') &&
    (currentPassControl.value == null || currentPassControl.value === '')
  ) {
    return { notValid: true };
  }
  if (passwordControl.pristine || confirmControl.pristine || currentPassControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value && currentPassControl.value) {
    return null;
  }
  return { notValid: true };
}
