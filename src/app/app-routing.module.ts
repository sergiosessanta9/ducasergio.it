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
    ],
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
     {
       path: '**',
       component: PageNotFoundComponent
     },
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
