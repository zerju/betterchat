import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { IMessage } from './../core/models/message.model';

@Directive({
  selector: '[appMessageImage]'
})
export class MessageImageDirective implements OnInit {
  private _messages: IMessage[];
  @Input('appMessageImage')
  set messages(mes: IMessage[]) {
    this._messages = mes;
  }

  private _index: number;
  @Input()
  set index(i: number) {
    this._index = i;
  }

  constructor(private _el: ElementRef) {}

  ngOnInit() {
    const isFirst =
      this._index > 0 &&
      this._messages[this._index - 1].from.id !==
        this._messages[this._index].from.id;
    this._el.nativeElement.style.visibility =
      isFirst || this._index === 0 ? 'visible' : 'hidden';
  }
}
