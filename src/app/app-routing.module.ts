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

const routes: Routes = [
    {
        path: '',
        component: PageIndexComponent,
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'blog',
        component: PageUnderConstructionComponent
    },
    {
        path: 'today-i-learned',
        component: PageUnderConstructionComponent
    },
    {
        path: 'work',
        children: [
            {
                path: 'skills-and-tools',
                component: MarkdownComponent
            },
            {
                path: 'experience',
                component: MarkdownComponent
            },
            {
                path: 'skills-and-tools',
                component: MarkdownComponent
            },
            {
                path: 'studio',
                component: MarkdownComponent
            },
            {
                path: 'contact',
                component: MarkdownComponent
            },
        ]
    },
    {path: '**', component: PageNotFoundComponent}
    // Add more routes as needed
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
