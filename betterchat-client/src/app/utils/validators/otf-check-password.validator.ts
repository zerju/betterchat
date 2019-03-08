import { IUserExists } from './../../core/models/user-exists.model';
import { environment } from './../../../environments/environment';

import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

export function otfCheckPasswordValidator(http: HttpClient): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    const value = control.value;
    if (value == null || value === '') {
      return of(null);
    }
    return http.post<any>(`${API_URL}/auth/check-password`, { password: value }).pipe(
      map((res: any) => (res.correctPassword ? null : { incorrect: value })),
      catchError(err => of(err))
    );
  };
}
