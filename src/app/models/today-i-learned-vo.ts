export class TodayILearnedVO {
    markdown?: string;
    creation?: string;
    url?: string;

    constructor(markdown: string, creation: string, url: string) {
        this.markdown = atob(markdown);
        this.creation = creation;
        this.url = url;
    }
    
}