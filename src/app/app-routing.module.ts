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
        pathMatch: 'full'
    },
    {
        path: 'projects',
        component: ProjectsComponent,
        title: "Project",
        data: {title: 'Projects'}
    },
    {
        path: 'blog',
        component: BlogComponent,
        title: "Personal Blog",
        data: {title: 'Personal Blog'}
    },
    {
        path: 'blog/:blog-id',
        component: MarkdownComponent,
        title: "Personal Blog",
        data: {title: 'Personal Blog'}
    },
    {
        path: 'today-i-learned',
        component: TodayILearnedComponent,
        title: "Today I Learned",
        data: {title: 'Today I Learned'}
    },
    {
        path: 'credits',
        component: MarkdownComponent
    },
    {
        path: 'request-cv',
        component: RequestCvComponent
    },
    {
        path: 'work',
        children: [
            {
                path: 'skills-and-tools',
                component: MarkdownComponent,
                title: "Skills and Tools",
                data: {title: 'Skills and Tools'}
            },
            {
                path: 'experience',
                component: MarkdownComponent,
                title: "Experience",
                data: {title: 'Experience'}
            },
            {
                path: 'studio',
                component: MarkdownComponent,
                title: "Studio",
                data: {title: 'Studio'}
            },
            {
                path: 'contact',
                component: MarkdownComponent,
                title: "Contact",
                data: {title: 'Contact'}
            },
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
