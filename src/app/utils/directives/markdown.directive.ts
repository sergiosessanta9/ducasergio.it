import {Directive, ElementRef, EventEmitter, OnInit, Output, Pipe, PipeTransform, Renderer2} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import * as marked from 'marked';
import {TTableOfContentsItem} from "../../components/table-of-contents/models/t-table-of-contents-item";
import {SafeHtmlPipe} from "../pipes/safe-html-pipe";

@Directive({
  selector: '[appMarkDown]'
})
export class MarkdownDirective implements OnInit {
  private content: string = '';
  private html: string = '';
  private path: string = '';
  private error: any;

  protected tableOfContentsItems: TTableOfContentsItem[] = [];
  protected title?: string;
  protected caption?: string;
  protected description?: string;

  @Output() onLoad = new EventEmitter<any>();

  constructor(private http: HttpClient, private el: ElementRef, private renderer: Renderer2, private safeHtmlPipe: SafeHtmlPipe, router: Router) {
    this.path = router.url;
  }

  ngOnInit(): void {
    this.fetchTextFile();
  }

  private fetchTextFile() {
    const hash = window.location.hash;
    this.http.get(`assets/mds${this.path.replace(hash, '')}.md`, {responseType: 'text'}).subscribe(
      (data: string) => {
        this.content = data;
        this.parse();
        this.error = null;
      },
      (error) => {
        this.error = `Error fetching text file: ${error}`;
        this.onLoad.emit(null);
      }
    );
  }

  private parse() {
    const renderer = new marked.Renderer();

    renderer.heading = (text: any, level: any) => {
      return `<h${level}>${text}</h${level}>`;
    };
    renderer.paragraph = (text: any) => {
      return `<p>${text}</p>`;
    };

    marked.setOptions({
      renderer: renderer,
    });

    this.html = this.parseAndManipulateHtml(marked.parse(this.content));

    this.onLoad.emit({
      'title': this.title,
      'caption': this.caption,
      'description': this.description,
      'tableOfContents': this.tableOfContentsItems
    });

    const sanitizedHtml = this.safeHtmlPipe.transform(this.html);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.html);

  }

  private parseAndManipulateHtml(html: string): string {

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
            this.tableOfContentsItems.push(item);
          }
        }
      }
    }

    return new XMLSerializer().serializeToString(doc);
  }

}
