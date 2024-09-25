import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Links } from '../links';
import { BlogArticleVO } from 'src/app/models/blog-article-vo';
import { ReactionVO } from 'src/app/models/reaction-vo';
import { ErrorVO } from 'src/app/models/error-vo';
import { ApiService } from 'src/services/api-service';
import { ActivatedRoute } from '@angular/router';
import { AnimationVO } from 'src/app/models/animation-vo';
import { ClipboardService } from 'src/services/clipboard.service';

@Component({
  selector: 'app-media-section',
  templateUrl: './media-section.component.html',
  animations: [
    trigger('showIn', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10%)' }),
        animate('100ms ease-in')
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'translateY(10%)' }))
      ]),
    ]),
    trigger('animateEmoji', [
      state('in', style({ opacity: 1, transform: 'translateX(0px) translateY(0px) translateZ(0px)'})),
      transition(':enter', [
        animate('1.2s ease-out', style({ opacity: 0, transform: 'translateX({{x}}) translateY(-180px) translateZ(0px)'}))
      ], { params: { x: '0px' } }),
      transition(':leave', [
        animate('10ms ease-in', style({ opacity: 0 }))
      ]),
    ]),
  ],
})

export class MediaSectionComponent implements OnInit {

  @Input() article?: BlogArticleVO | any;
  

  currentUrl = window.location.href;
  shareOpen = false;
  insightOpen = false;
  twitterLink = Links.TwitterShare;
  blogId?: string | any;
  whatsappEnabled = false;
  public transform: string = '';
  trnaistionX = '-30px'

  animations: AnimationVO[] = [];

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private clipboardService: ClipboardService) {
    this.blogId = this.activatedRoute.snapshot.paramMap.get('blog-id');
  }

  ngOnInit(): void {
    this.article?.reactions?.forEach( (a: ReactionVO) => {
      this.animations.push(new AnimationVO(false, 0, 0));
    });
  }

  animateElement(reaction: ReactionVO, index: number, el: PointerEvent | any) {
    
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      reaction.hover = false;
    }
    
    let parent = el.target;
    if (el.target.children.length - 1 < 10 && !reaction.easterEgg) {
      let icon = document.createElement('img');
      icon.setAttribute('alt', 'Claps');
      icon.setAttribute('data-nimg', '1');
      icon.setAttribute('src', 'data:image/jpeg;base64,' + reaction.animated_icon);
      icon.width = 48;
      icon.height = 48;
      icon.decoding = 'async';
      icon.className = 'h-full w-full absolute animoji';
      icon.style.color = 'transparent';
      icon.style.opacity = '1';
      icon.style.transition = 'all 1.1s ease-out';
      icon.style.transform = 'translateX(0px) translateY(0px) translateZ(0px) scale(1.2)';

      const emoji = document.createElement('div');
      emoji.className = 'pointer-events-none absolute h-10 w-10 select-none opacity-2';
      
      emoji.appendChild(icon);
      parent.appendChild(emoji);
      
      //parent.insertBefore(emoji, parent.childNodes[0] );

      setTimeout(() => {
        const movement = Math.random() * 100 - 50;
        icon.style.transform = `translateX(${movement}px) translateY(-200px) translateZ(0px) scale(1)`;
      }, 50);

      setTimeout(()=>{
        icon.style.opacity = '0';
      }, 100);
      
    
      setTimeout(() => {
          emoji.remove();
      }, 5000);
      
      this.reactBlog(reaction); 
    } else {
      reaction.easterEgg = true;
      //parent.childNodes[0].removeAttribute('src');
      //parent.childNodes[0].setAttribute('src', 'data:image/jpeg;base64,' + reaction.animated_icon);
    }
  }
  /*
  <div class="pointer-events-none absolute h-10 w-10 select-none" style="opacity: 0.0569833; transform: translateX(9.39375px) translateY(-200.437px) translateZ(0px);"><img alt="Claps" src="/assets/emojis/clapping-hands-animated.png" width="48" height="48" decoding="async" data-nimg="1" class="h-full w-full" style="color: transparent;"></div>
  */

  reactBlog(reaction: ReactionVO) {
    this.insightOpen = false;
    this.api.reactBlog(this.blogId, reaction.id).subscribe(
      (data: ErrorVO | any) => {
        if (data) {
          if (data.code == 0) {
            reaction.amount++;
            this.article.reaction_count++;
            //reaction.animation.animate = true;
          }
        }
      }
    );
  }

  resetAnimation(index: number){
    this.animations[index].animate = false;
  }

  shareBlog(url: string | null) {
    /*
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      
    }else{

    }*/
    this.shareOpen = false;
    if (url) {
      window.open(url, "_blank");
    } else {
      this.clipboardService.copyTextToClipboard(this.currentUrl);
    }
    this.api.shareBlog(this.blogId).subscribe(
      (data: ErrorVO | any) => {
        if (data) {
          if (data.code == 0) {
            this.article.shares++;
          }
        }
      }
    );
  }

}
