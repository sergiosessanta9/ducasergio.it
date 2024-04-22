import { ReactionVO } from "./reaction-vo";

export class BlogArticleVO {
    markdown?: string;
    url?: string;
    shares?: number;
    views?: number;
    reaction_count? : number;
    reactions?: ReactionVO[];

    constructor(markdown: string, url: string, reaction_count: number, shares: number, views: number, reactions: ReactionVO[]) {
        this.markdown = markdown;
        this.url = url;
        this.reaction_count = reaction_count;
        this.shares = shares;
        this.views = views;
        this.reactions = reactions;
    }

    
}