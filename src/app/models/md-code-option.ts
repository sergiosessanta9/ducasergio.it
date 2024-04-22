export class MDCodeOptionVO {
    copy: boolean;
    footer: boolean;

    constructor(copy: boolean = true, footer: boolean = true) {
        this.copy = copy;
        this.footer = footer;
    }
    
}