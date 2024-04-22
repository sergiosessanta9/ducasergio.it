import { AnimationVO } from "./animation-vo";

export class ReactionVO {
    id: number;
    title: string;
    amount: number;
    normal_icon: string;
    animated_icon: string;
    easteregg_icon: string;
    hover: boolean;
    easterEgg: boolean;

    constructor(id: number, title: string, amount: number, normal_icon: string, animated_icon: string, easteregg_icon: string, hover: boolean = false, easterEgg: boolean) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.normal_icon = normal_icon;
        this.animated_icon = animated_icon;
        this.easteregg_icon = easteregg_icon;
        this.hover = hover;
        this.easterEgg = easterEgg;
    }

    
}