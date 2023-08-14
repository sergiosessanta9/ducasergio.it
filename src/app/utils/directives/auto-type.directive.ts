import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  OnInit,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appAutoType]'
})
export class AutoTypeDirective implements AfterViewInit, OnDestroy {
  @Input() typingSpeed: number = 50;
  @Input() delay: number = 0;

  private texts: any[] = [];
  private textElements: HTMLElement[] = [];
  private animationTimeout: any;
  private currentElementIndex = 0;
  private currentTextIndex = 0;

  @Output() animationStart = new EventEmitter<void>();
  @Output() animationEnd = new EventEmitter<void>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.findTextElements(this.el.nativeElement);
    this.initializeTextElements();
    setTimeout(() => {
      this.startAnimation();
    }, this.delay);
  }

  ngOnDestroy() {
    clearTimeout(this.animationTimeout);
  }

  private findTextElements(element: HTMLElement) {
    if (element.children.length === 0) {
      this.textElements.push(element);
    } else {
      const childrenArray = Array.from(element.children) as HTMLElement[];
      childrenArray.forEach(child => {
        this.findTextElements(child);
      });
    }
  }

  private initializeTextElements() {
    this.textElements.forEach(textElement => {
      this.texts.push(textElement.textContent || '');
      textElement.textContent = '';
    });
  }

  private startAnimation() {
    if (this.currentElementIndex < this.textElements.length) {
      const currentTextElement = this.textElements[this.currentElementIndex];
      const originalText = this.texts[this.currentElementIndex];
      this.animateText(currentTextElement, originalText);
    }
  }

  private animateText(textElement: HTMLElement, text: string) {
    this.animationStart.emit();
    if (this.currentTextIndex < text.length) {
      const currentText = text.substring(0, this.currentTextIndex + 1);
      this.renderer.setProperty(textElement, 'textContent', currentText);
      this.currentTextIndex++;
      this.animationTimeout = setTimeout(() => {
        this.animateText(textElement, text);
      }, this.typingSpeed);
    } else {
      this.currentElementIndex++;
      this.currentTextIndex = 0;
      this.animationTimeout = setTimeout(() => {
        this.startAnimation();
      }, this.typingSpeed);

      if (this.currentElementIndex === this.textElements.length) {
        this.animationEnd.emit();
      }
    }
  }
}
