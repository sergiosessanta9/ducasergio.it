import {Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {TTableOfContentsItem} from "../../components/table-of-contents/models/t-table-of-contents-item";

@Directive({
    selector: '[appIsVisible]'
})
export class IsVisibleDirective implements OnInit, OnDestroy {

    @Input() watchedElementIds: TTableOfContentsItem[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.observeElementsVisibility();
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.observeElementsVisibility();
    }

    private observeElementsVisibility() {
        this.watchedElementIds.forEach(item => {
            const element = window.document.getElementById(item.id);
            if (element) {
                item.visible = this.isElementVisible(element);
            }
        });
    }

    private isElementVisible(element: HTMLElement | null) {
        const rect = element?.getBoundingClientRect();
        if (rect){
            const windowHeight = window.innerHeight;
            return rect.top >= 0 && rect.bottom <= windowHeight;
        }
        return false;
    }
    ngOnDestroy() {
    }
}
