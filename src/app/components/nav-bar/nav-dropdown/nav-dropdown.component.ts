import {Component, Input} from '@angular/core';
import {NavLink} from "../models/NavLink";
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import {Icons} from "../../shared/icons";

const animationDuration:number = 0.18;

@Component({
    selector: 'nav-dropdown',
    templateUrl: './nav-dropdown.component.html',
    animations: [
        trigger('dropdownAnimation', [
            state('hide', style({opacity: 0, display: 'none', transform: 'translateY(-16px)'})),
            state('show', style({opacity: 1, display: 'block', transform: 'translateY(0)'})),
            transition('hide => show', [animate(`${animationDuration}s ease-in`)]),
            transition('show => hide', [animate(`${animationDuration}s ease-out`)]),
        ]),
        trigger('menuItemAnimation', [
            state('hide', style({opacity: 0, transform: 'translateY(-8px)'})),
            state('show', style({opacity: 1, transform: 'translateY(0)'})),
            transition('hide => show', [animate(`${animationDuration}s ease-in`)]),
            transition('show => hide', [animate(`${animationDuration}s ease-out`)]),
        ]),
    ],
})
export class NavDropdownComponent {
    @Input() title!: string;
    @Input() items!: NavLink[];

    isOpen = false;
    animationState: 'hide' | 'show' = 'hide';

    toggleDropdown() {
        this.isOpen = !this.isOpen;
        this.animationState = this.isOpen ? 'show' : 'hide';
    }

    protected readonly Icons = Icons;
}
