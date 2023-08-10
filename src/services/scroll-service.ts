import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  scrollEvent = new EventEmitter<Event>();

  constructor() {}

  emitScrollEvent(event: Event) {
    this.scrollEvent.emit(event);
  }
}
