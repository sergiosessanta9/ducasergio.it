export class BlogVO {
    id: number;
    url: string;
    title: string;
    subtitle: string;
    pinned: boolean;
    creation: string;
    language: string;
    views: number;
    shares: number;

    constructor(id: number, url: string, title: string, subtitle: string, pinned: boolean, creation: string, language: string, views: number, shares: number) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.subtitle = subtitle;
        this.pinned = pinned;
        this.creation = creation;
        this.language = language;
        this.views = views;
        this.shares = shares;
    }

    
}