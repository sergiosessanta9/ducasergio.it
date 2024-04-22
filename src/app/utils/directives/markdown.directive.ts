import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, Renderer2 } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import * as marked from 'marked';
import * as yaml from 'js-yaml';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-java';
import * as jschardet from 'jschardet';
import { TTableOfContentsItem } from "../../components/table-of-contents/models/t-table-of-contents-item";
import { SafeHtmlPipe } from "../pipes/safe-html-pipe";
import { ApiService } from 'src/services/api-service';
import { IMetadata } from 'src/app/models/interfaces/imetadata';
import { BlogArticleVO } from 'src/app/models/blog-article-vo';
import { IArticle } from 'src/app/models/interfaces/iarticle';
import { MDCodeOptionVO } from 'src/app/models/md-code-option';

@Directive({
  selector: '[appMarkDown]'
})
export class MarkdownDirective implements OnInit {

  @Input() data?: string;

  private content: string = '';
  private html: string = '';
  private path: string = '';
  private error: any;

  /*
  private metadata: IMetadata = {
    title: "",
    description: "",
    caption: null,
    date: null,
    lang: null,
    tags: null,
    category: null,
    tableOfContents: [],
  };
  */

  private article: IArticle = {
    metadata: {
      title: "",
      description: "",
      caption: null,
      date: null,
      lang: null,
      tags: null,
      category: null,
      tableOfContents: [],
    },
    data: null
  };

  @Output() onLoad = new EventEmitter<any>();

  constructor(
    private http: HttpClient, 
    private el: ElementRef, 
    private renderer: Renderer2, 
    private safeHtmlPipe: SafeHtmlPipe, 
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    router: Router,
     ) {
    this.path = router.url;
  }

  ngOnInit(): void {
    this.fetchTextFile();
  }

  private fetchTextFile() {
    if (this.data){
      this.article.data = this.data;
      this.setData(this.data);
    } else {
      if (this.path.includes('blog')) {
        this.api.getBlog(this.activatedRoute.snapshot.paramMap.get('blog-id')).subscribe(
          (data: BlogArticleVO) => {
            this.article.data = data;
            this.setData(data.markdown ?? "");
          },
          (error) => {
            this.err(error);
          }
        );
      } else {
        const hash = window.location.hash;
        this.http.get(`assets/mds${this.path.replace(hash, '')}.md`, { responseType: 'text' }).subscribe(
          (data: string) => {
            this.setData(data);
          },
          (error) => {
            this.err(error);
          }
        );
      }
    }
  }

  private setData(data: string){
    this.content = data;
    this.parse();
    this.error = null;
  }

  private err(error: any) {
    this.error = `Error fetching text file: ${error}`;
    //console.log(this.error);
    this.onLoad.emit(null);
  }

  private parse() {
    const renderer = new marked.Renderer();

    // Estrai il front matter
    const matcher = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/;
    const match = this.content.match(matcher);

    if (match) {
      this.article.metadata = yaml.load(match[1]) as IMetadata;
      this.article.metadata.tableOfContents = [];
      this.content = this.content.slice(match[0].length);
    }

    renderer.link = (href, title, text) => {
      if (href.endsWith("::blank")) {
        return `<a class="inline-flex items-center gap-[0.25rem] truncate" href="${href.replaceAll("::blank", "").trim()}" target="_blank">${text}
          <svg class="h-[14px] w-[14px] mt-[2px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd"></path></svg>
        </a>`
      }
      return `<a class="inline-flex items-center gap-[0.25rem]" href="${href.trim()}">${text}</a>`;
    };

    renderer.table = (header: string, body: string) => {
      return `<div class="mdx-table">
                <table>
                  <thead>${header}</thead>
                  <tbody>${body}</tbody>
                </table>
              </div>`;
    };

    renderer.image = function(href: string, title: string, text: string) {
      return `<div class="relative">
                <div class="absolute -inset-8 z-[-1] rounded-[20%] bg-[length:180%_180%] bg-center opacity-25 blur-2xl hidden dark:block" style="background-image: url(&quot;${href}&quot;);"></div>
                <img class="mt-4 md:mt-0" src="${href}" alt="${text}">
              </div>`;
    };

    this.renderCode(renderer);

    marked.setOptions({
      renderer: renderer,
    });

    this.html = this.parseAndManipulateHtml(marked.parse(this.content));

    this.onLoad.emit(this.article);

    const sanitizedHtml = this.safeHtmlPipe.transform(this.html);
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.html);

  }

  private renderCode(render: marked.Renderer){
    render.code = (code, language: string) => {
      // Custom rendering of code blocks
      //console.log(language);
      const split = language.split("::");
      let options;
      if (split.length > 1) {
          try {
              options = JSON.parse(split[1]);
          } catch (e) {
              console.error('Failed to parse options', e);
              options = new MDCodeOptionVO();
          }
      } else {
          options = new MDCodeOptionVO();
      }
      language = split[0];
      let lines = 0;

      const validLanguage = Prism.languages[language];
      const highlighted = validLanguage ? Prism.highlight(code, validLanguage, language) : code;
      const wrappedLines = highlighted.split('\n').map(line =>{ 
        lines++;
        return`<span class="code-line">${line}</span>`
      }).join('\n');

      return `<div class="mdx-code">` 
                +
                (options.copy 
                  ?
                  `<button type="button" class="mdx-code__copy-button" title="Copy to Clipboard" aria-label="Copy to Clipboard">
                    <div class="mdx-code__copy-button-message">Copied!</div>
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                      <rect x="9" y="3" width="6" height="4" rx="2"></rect>
                      <path d="M9 12h6"></path><path d="M9 16h6"></path>
                    </svg>
                  </button>`
                  : "")
                +
                `<div class="mdx-code__content">
                  <pre>
                    <code class="language-${language} code-highlight">${wrappedLines}</code>
                  </pre>
                </div>`
                +
                (options.footer 
                  ?
                  `<div class="mdx-code__footer">
                    <div class="mdx-code__footer-item ${options.upper ? 'uppercase' : 'capitalize'}">${language}</div>
                    <div class="mdx-code__footer-item hidden sm:flex">Lines: ${lines}</div>
                    <div class="mdx-code__footer-item uppercase">UTF-8</div>
                  </div>`
                  : "")
                +
              `</div>`;
              //<div class="mdx-code__footer-item uppercase">${jschardet.detect(code).encoding}</div>
    };
  }

  private parseAndManipulateHtml(html: string): string {

    const doc = new DOMParser().parseFromString(html, 'text/html');

    const headersToWrap = doc.querySelectorAll('h1, h2, h3, hr');

    for (let i = 0; i < headersToWrap.length; i++) {
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
          this.article.metadata?.tableOfContents?.push(item);
        }
      }
    }

    return new XMLSerializer().serializeToString(doc);
  }

}
