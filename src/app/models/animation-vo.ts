export class AnimationVO {
    animate: boolean;
    translateX: number;
    translateY: number;

    constructor(animate: boolean, translateX: number, translateY: number) {
        this.animate = animate;
        this.translateX = translateX;
        this.translateY = translateY;
    }

    
}