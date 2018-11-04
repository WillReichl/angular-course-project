import { Directive, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') openClass;

  constructor() { }

  @HostListener('mouseenter', ['$event']) mouseover(eventData: Event) {
    this.openClass = 'open';
  }

  @HostListener('mouseleave', ['$event']) mouseleave(eventData: Event) {
    this.openClass = '';
  }

}
