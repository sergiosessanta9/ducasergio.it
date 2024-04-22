export class TodayILearnedVO {
    markdown?: string;
    creation_date?: string;
    url?: string;

    constructor(markdown: string, creation_date: string, url: string) {
        this.markdown = atob(markdown);
        this.creation_date = creation_date;
        this.url = url;
    }
    
}