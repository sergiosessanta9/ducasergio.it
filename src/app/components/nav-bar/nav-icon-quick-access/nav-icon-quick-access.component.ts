import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icons} from "../../shared/icons";
import {GlobalService} from "../../../../services/global-service";

@Component({
    selector: 'nav-icon-quick-access',
    templateUrl: './nav-icon-quick-access.component.html',
})
export class NavIconQuickAccessComponent {

    protected readonly Icons = Icons;
    @Input() onOpenQuickAccess?: EventEmitter<any>;

    constructor(protected global: GlobalService) {}

    openQuickAccess(): void {
        this.global.isQuickAccessOpen = true;
    }
}
