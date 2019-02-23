import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logged-out-toolbar',
  templateUrl: './logged-out-toolbar.component.html',
  styleUrls: ['./logged-out-toolbar.component.scss']
})
export class LoggedOutToolbarComponent implements OnInit {
  @Input()
  pageName: string;

  constructor() {}

  ngOnInit() {}
}
