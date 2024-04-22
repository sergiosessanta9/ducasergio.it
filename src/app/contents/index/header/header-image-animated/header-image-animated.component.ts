import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'header-image-animated',
    animations: [
        /*
        trigger('strokeAnimation', [
            state('hide', style({'stroke-dashoffset': 1960})),
            state('show', style({'stroke-dashoffset': 0})),
            transition('hide => show', [animate('1.5s 0.6s')]),
        ]),*/
        trigger('strokeAnimation', [
            state('in', style({'stroke-dashoffset': 0})),
            transition(':enter', [
                style({'stroke-dashoffset': 1960}),
              animate('1.5s 500ms')
            ]),
          ])
    ],
    templateUrl: './header-image-animated.component.html',
})
export class HeaderImageAnimatedComponent implements OnInit{
    
    @Output() onComplete = new EventEmitter<any>();

    ngOnInit() {
    }

    onAnimationComplete() {
        this.onComplete.emit();
    }

}
