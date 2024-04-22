export class TodayILearnedVO {
    markdown?: string;
    creation_date?: string;
    format_date?: string;
    url?: string;

    constructor(markdown: string, creation_date: string, format_date: string, url: string) {
        this.markdown = atob(markdown);
        this.creation_date = creation_date;
        this.format_date = format_date;
        this.url = url;
    }
    
}