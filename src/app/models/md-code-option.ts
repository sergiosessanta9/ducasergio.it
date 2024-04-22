export class MDCodeOptionVO {
    copy: boolean;
    footer: boolean;
    upper: boolean;

    constructor(copy: boolean = true, footer: boolean = true, upper: boolean = true) {
        this.copy = copy;
        this.footer = footer;
        this.upper = upper;
    }
    
}