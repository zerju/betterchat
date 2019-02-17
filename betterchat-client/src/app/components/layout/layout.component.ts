import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LayoutState } from '../../core/state/layout.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Select(LayoutState.getSidenavState) sidenavState$: Observable<boolean>;

  constructor() {}

  ngOnInit() {}
}
