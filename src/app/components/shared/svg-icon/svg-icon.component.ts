import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Icons} from "../icons";
import {data} from "autoprefixer";

@Directive({
  selector: 'svg-icon'
})
export class SvgIconComponent implements OnInit {
  @Input() data?: any;
  @Input() icon?: Icons;
  @Input() className?: string = 'h-5 w-5';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.data) {
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.data);
    } else if (this.icon){
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.icon);
    }

    const svg = this.el.nativeElement.querySelector('svg');

    if (this.className && svg) {
      let classes = this.className.split(' ');
      for (let i = 0; i < classes.length; i++) {
        this.renderer.addClass(svg, classes[i]);
      }
    }
  }
}
