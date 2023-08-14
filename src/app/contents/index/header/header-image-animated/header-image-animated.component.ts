import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

interface CustomAnimation {
    animation: string;
    path: string;
}

@Component({
    selector: 'header-image-animated',
    animations: [
        trigger('strokeAnimation', [
            state('hide', style({'stroke-dashoffset': 1960})),
            state('show', style({'stroke-dashoffset': 0})),
            transition('hide => show', [animate('1.5s 0.6s')]),
        ]),
    ],
    templateUrl: './header-image-animated.component.html',
})
export class HeaderImageAnimatedComponent implements OnInit{

    protected animationState: 'show' | 'hide' = 'hide';
    customAnimations: CustomAnimation[] = [];
    @Output() onComplete = new EventEmitter<any>();

    ngOnInit() {
    }

    startAnimation(){
        this.animationState = 'show';
    }

    onAnimationComplete() {
        this.onComplete.emit();
    }

}
