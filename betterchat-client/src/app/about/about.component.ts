import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../core/state/auth.state';
import { Observable } from 'rxjs';
import { IUser } from '../core/models/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  @Select(AuthState.getUser) user$: Observable<IUser>;
  constructor() {}

  ngOnInit() {}
}
