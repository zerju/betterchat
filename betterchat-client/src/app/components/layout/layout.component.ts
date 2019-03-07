import { AuthState } from 'src/app/core/state/auth.state';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from '../../core/state/layout.state';
import { PlatformState } from 'src/app/core/state/platform.state';
import { GetPlatformAction } from 'src/app/core/actions/platfrom.action';
import { CloseSidebar } from 'src/app/core/actions/layout.action';
import { IUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(LayoutState.getSidenavState) sidenavState$: Observable<boolean>;
  @Select(PlatformState.isMobile) isMobileState$: Observable<boolean>;
  @Select(AuthState.getUser) user$: Observable<IUser>;

  onMobile: boolean;

  constructor(private store: Store) {
    this.isMobileState$.subscribe(isMobile => {
      this.onMobile = isMobile;
      if (isMobile) {
        this.store.dispatch(new CloseSidebar());
      }
    });
    this.store.dispatch(new GetPlatformAction());
  }

  ngOnInit() {}
}
