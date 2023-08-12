import {Component, ElementRef, OnInit, Pipe, PipeTransform, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as marked from 'marked';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {TTableOfContentsItem} from "../table-of-contents/models/t-table-of-contents-item";
import {GlobalService} from "../../../services/global-service";


@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }

    transform(value: any, ...args: any[]): any {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}


@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: [
        'markdown.component.scss',
        './../../../styles/md-components.scss',
        './../../../styles/md-contents.scss'
    ]
})
export class MarkdownComponent implements OnInit{

    protected markdownContent: string = '';
    protected renderedHtml: string = '';
    protected path: string = '';
    protected error: any;
    protected loaded = false;

    // For UI
    protected items: TTableOfContentsItem[] = [];
    protected title?: string;
    protected caption?: string;
    protected description?: string;

    constructor(private http: HttpClient, router: Router, private globalService: GlobalService) {
        this.path = router.url;
    }

    ngOnInit(): void {
      const theme = this.globalService.getTheme();
      document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
      document.documentElement.classList.add(theme);
        this.fetchTextFile();
        setTimeout(() => {
            this.scrollToElement(window.location.hash);
        },800);
        /*
        this.router.events.subscribe((event) => {
          const id = window.location.hash;
          if (event instanceof NavigationEnd && this.path != this.router.url) {
            document.getElementsByTagName('header')[0]?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
            this.path = this.router.url;
            this.fetchTextFile();
            this.items = [];
          }
        });
        */
    }

    protected scrollToElement(id: string) {
        console.log('i'+id)
        const element = document.getElementById(id.replaceAll('#', ''));
        if (element) {
            console.log('scroll')
            element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
    }

    fetchTextFile() {
        const hash = window.location.hash;
        this.http.get(`assets/mds${this.path.replace(hash, '')}.md`, {responseType: 'text'}).subscribe(
            (data: string) => {
                this.markdownContent = data;
                this.parseMD();
                this.error = null;
            },
            (error) => {
                this.error = `Error fetching text file: ${error}`;
            }
        );
    }

    parseAndManipulateHtml(html: string): string {

        const doc = new DOMParser().parseFromString(html, 'text/html');

        const headersToWrap = doc.querySelectorAll('h3, h1, h2, hr');

        for (let i = 0; i < headersToWrap.length; i++) {
            if (i < 7) {
                if (headersToWrap[i].tagName.toLowerCase() != 'hr') {
                    switch (headersToWrap[i].tagName.toLowerCase()) {
                        case 'h1':
                            this.title = headersToWrap[i].innerHTML;
                            break;
                        case 'h2':
                            this.description = headersToWrap[i].innerHTML;
                            break;
                        case 'h3':
                            this.caption = headersToWrap[i].innerHTML;
                            break;
                    }
                    //const headerClone = headersToWrap[i].cloneNode(true) as HTMLElement;
                    //this.renderer.appendChild(divWrapper, headerClone);
                }
                headersToWrap[i].remove();
            } else {
                if (headersToWrap[i].tagName.toLowerCase() != 'hr') {
                    const link = headersToWrap[i].children[0];
                    if (link && link.tagName.toLowerCase() == 'a') {
                        let item: TTableOfContentsItem | any;
                        switch (headersToWrap[i].tagName.toLowerCase()) {
                            case 'h1':
                            case 'h2':
                                item = new TTableOfContentsItem(link.innerHTML, 1, link.getAttribute('href'));
                                break;
                            case 'h3':
                                item = new TTableOfContentsItem(link.innerHTML, 2, link.getAttribute('href'));
                                break;
                        }
                        headersToWrap[i].id = item.id;
                        this.items.push(item);
                    }
                }
            }
        }

        return new XMLSerializer().serializeToString(doc);
    }

    private parseMD() {
        const renderer = new marked.Renderer();

        renderer.heading = (text, level) => {
            return `<h${level}>${text}</h${level}>`;
        };
        renderer.paragraph = (text) => {
            return `<p>${text}</p>`;
        };

        marked.setOptions({
            renderer: renderer,
        });

        this.renderedHtml = this.parseAndManipulateHtml(marked.parse(this.markdownContent));
        this.onLoad();
    }

    onLoad() {
        this.loaded = true;
    }

    onInnerElementVisible(id: string, isVisible: boolean) {
        if (isVisible) {
            console.log(`Element ${id} is visible`);
        } else {
            //console.log(`Element ${id} is not visible`);
        }
    }

    getItemsLinks(): string[] {
        const links:  string[] = [];

        this.items.forEach(function (item) {
            links.push(item.slug.substring(item?.slug?.indexOf('#')+1, item.slug?.length ?? 0));
        });

        return links;
    }
}
