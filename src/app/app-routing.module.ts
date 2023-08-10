import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageIndexComponent} from "./contents/page-index/page-index.component";
import {KbdComponent} from "./components/shared/kbd/kbd.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {MarkdownComponent} from "./components/markdown/markdown.component";

const routes: Routes = [
  {
    path: '',
    component: PageIndexComponent,
    children: [
      {
        path: 'test',  // child route path
        title: 'Test',
        component: KbdComponent,  // child route component that the router renders
      },
    ],
  },
  {
   path: 'work',
   children: [
     {
       path: 'contact',
       title: 'Contact',
       component: MarkdownComponent
     },
     {
       path: 'experience',
       title: 'Experience',
       component: MarkdownComponent
     },
     {
       path: 'studio',
       title: 'Studio',
       component: MarkdownComponent
     },
     {
       path: 'skills-and-tools',
       title: 'Skills and Tools',
       component: MarkdownComponent
     }
   ]
  },
  { path: '**', component: PageNotFoundComponent }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
