import { Component, OnInit, Renderer2, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input()
  sizePx = 64;

  @ViewChild('spinner')
  spinner: ElementRef;

  constructor(private _renderer: Renderer2, private _element: ElementRef) {}

  ngOnInit() {
    this._renderer.setStyle(this.spinner.nativeElement, 'width', this.sizePx + 'px');
    this._renderer.setStyle(this.spinner.nativeElement, 'height', this.sizePx + 'px');
    this._renderer.setStyle(this._element.nativeElement, 'width', this.sizePx + 'px');
    this._renderer.setStyle(this._element.nativeElement, 'height', this.sizePx + 'px');
    for (const child of this.spinner.nativeElement.childNodes) {
      this._renderer.setStyle(child, 'width', this.sizePx * 0.8 + 'px');
      this._renderer.setStyle(child, 'height', this.sizePx * 0.8 + 'px');
      this._renderer.setStyle(child, 'margin', this.sizePx * 0.15 + 'px');
      this._renderer.setStyle(child, 'border-width', this.sizePx * 0.09 + 'px');
    }
  }
}
