import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as marked from 'marked';
import {filter} from "rxjs";
import {ActivatedRoute, NavigationEnd, Route, Router} from "@angular/router";

@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./../../../styles/md-components.scss', './../../../styles/md-contents.scss',] // Import your custom CSS styles
})
export class MarkdownComponent implements OnInit {
    markdownContent: string = '';
    renderedHtml: string = '';
    path: string = '';

    constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef, private router: Router) {
        this.path = router.url;
        /*
        this.getRoutes('', this.router.config);
        if (this.routes.indexOf(router.url) > -1){
            console.log('Gino');
        } else {
            console.log('Pino')
        }*/
    }

    getRoutes(parent: String, config: Route[]) {
        for (let i = 0; i < config.length; i++) {
            const route = config[i];
            //this.routes?.push(parent + '/' + route.path);
            //console.log(parent + '/' + route.path);
            if (route.children) {
                const currentPath = route.path ? parent + '/' + route.path : parent;
                this.getRoutes(currentPath, route.children);
            }
        }
    }

    ngOnInit(): void {
        this.fetchTextFile();
    }

    fetchTextFile() {
        this.http.get(`assets/mds${this.path}.md`, {responseType: 'text'}).subscribe(
            (data: string) => {
                this.markdownContent = data;
                this.parseMD();

            },
            (error) => {
                console.error('Error fetching text file:', error);
            }
        );
    }

    parseAndManipulateHtml(html: string): string {

        const doc = new DOMParser().parseFromString(html, 'text/html');

        const headersToWrap = doc.querySelectorAll('h3, h1, h2, hr');
        const headerWrapper = this.renderer.createElement('header');
        const divWrapper = this.renderer.createElement('div');
        divWrapper.classList.add('content-wrapper');
        const classes = 'background-grid background-grid--fade-out border-divider-light z-[900] mb-10 border-b pt-32 pb-10 md:mb-0 md:border-none md:pb-20 md:pt-40 dark:border-divider-dark'.split(' ');

        for (let i = 0; i < classes.length; i++) {
            headerWrapper.classList.add(classes[i]);
        }

        for (let i = 0; i < 7; i++) {
            if (headersToWrap[i].tagName.toLowerCase() != 'hr') {
                const headerClone = headersToWrap[i].cloneNode(true);
                this.renderer.appendChild(divWrapper, headerClone);
            }
            headersToWrap[i].remove();
        }

        this.renderer.appendChild(headerWrapper, divWrapper);
        doc.body.insertBefore(headerWrapper, doc.body.firstChild);

        // Convert the modified document back to string
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
            renderer: renderer
        });

        this.renderedHtml = this.parseAndManipulateHtml(marked.parse(this.markdownContent));
    }
}
