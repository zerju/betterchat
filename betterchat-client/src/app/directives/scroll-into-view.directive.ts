import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective implements AfterViewInit {
  private _scrollIntoView: boolean;
  @Input('appScrollIntoView')
  set scrollIntoView(f: boolean) {
    this._scrollIntoView = f;
  }

  constructor(private _el: ElementRef) {}

  ngAfterViewInit() {
    console.log(this._scrollIntoView);
    if (this._scrollIntoView) {
      this._el.nativeElement.scrollIntoView(false);
    }
  }
}
