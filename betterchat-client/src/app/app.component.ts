import { GetSavedUserAction, GetFriendsAction } from './core/actions/auth.action';
import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { IUser } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themeClass: string;

  constructor(private overlayContainer: OverlayContainer, private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetFriendsAction());
    this.themeClass = 'default-theme';
    document.body.classList.add(this.themeClass);
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) =>
      item.includes('-theme')
    );
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.themeClass);
  }
}
