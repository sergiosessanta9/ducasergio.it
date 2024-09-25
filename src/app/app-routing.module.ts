import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageIndexComponent} from "./contents/index/page-index.component";
import {KbdComponent} from "./components/shared/kbd/kbd.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {MarkdownComponent} from "./components/markdown/markdown.component";
import {ProjectsComponent} from "./contents/projects/projects.component";
import {TodayILearnedComponent} from "./contents/today-i-learned/today-i-learned.component";
import {BlogComponent} from "./contents/blog/blog.component";
import {PageUnderConstructionComponent} from "./components/page-under-construction/page-under-construction.component";
import { RequestCvComponent } from './contents/request-cv/request-cv.component';

const routes: Routes = [
    {
        path: '',
        component: PageIndexComponent,
        title: "Sergio Duca",
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        title: "Project - Sergio Duca",
        data: {title: 'Projects'}
    },
    {
        path: 'blog',
        component: BlogComponent,
        title: "Personal Blog - Sergio Duca",
        data: {title: 'Personal Blog'}
    },
    {
        path: 'blog/:blog-id',
        component: MarkdownComponent,
        title: "Personal Blog - Sergio Duca",
        data: {title: 'Personal Blog'}
    },
    {
        path: 'today-i-learned',
        component: TodayILearnedComponent,
        title: "Today I Learned - Sergio Duca",
        data: {title: 'Today I Learned'}
    },
    {
        path: 'credits',
        title: "Credits - Sergio Duca",
        component: MarkdownComponent
    },
    {
        path: 'request-cv',
        title: "Request CV - Sergio Duca",
        component: RequestCvComponent
    },
    {
        path: 'work',
        children: [
            {
                path: 'skills-and-tools',
                component: MarkdownComponent,
                title: "Skills and Tools - Sergio Duca",
                data: {title: 'Skills and Tools'}
            },
            {
                path: 'experience',
                component: MarkdownComponent,
                title: "Experience - Sergio Duca",
                data: {title: 'Experience'}
            },
            {
                path: 'studio',
                component: MarkdownComponent,
                title: "Studio - Sergio Duca",
                data: {title: 'Studio'}
            },
            {
                path: 'contact',
                component: MarkdownComponent,
                title: "Contact - Sergio Duca",
                data: {title: 'Contact'}
            },
            {
                path: '**', 
                component: PageNotFoundComponent,
                title: "404",
                data: {title: '404'}
            }
        ]
    },
    {
        path: '**', 
        component: PageNotFoundComponent,
        title: "404",
        data: {title: '404'}
    }
    // Add more routes as needed
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
