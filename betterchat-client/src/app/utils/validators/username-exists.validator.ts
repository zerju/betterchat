import { IUserExists } from './../../core/models/user-exists.model';
import { environment } from './../../../environments/environment';

import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

export function existUsernameValidator(
  http: HttpClient,
  currentUsername?: string
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    const value = control.value;
    if (currentUsername && currentUsername === value) {
      return of(null);
    }
    return http
      .get<IUserExists>(`${API_URL}/auth/user-exists?username=${value}`)
      .pipe(map((res: IUserExists) => (res.userExists ? { exists: value } : null)));
  };
}
