import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {NavLogoComponent} from "./components/nav-bar/nav-logo/nav-logo.component";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {NavLinkComponent} from "./components/nav-bar/nav-link/nav-link.component";
import {NavDropdownComponent} from "./components/nav-bar/nav-dropdown/nav-dropdown.component";
import {NavExpandedComponent} from "./components/nav-bar/nav-expanded/nav-expanded.component";
import {NavIconLinkComponent} from "./components/nav-bar/nav-icon-link/nav-icon-link.component";
import {SvgIconComponent} from "./components/shared/svg-icon/svg-icon.component";
import {NavIconQuickAccessComponent} from "./components/nav-bar/nav-icon-quick-access/nav-icon-quick-access.component";
import {KbdComponent} from "./components/shared/kbd/kbd.component";
import {QuickAccessComponent} from "./components/shared/quick-access/quick-access.component";
import {ActionCenterComponent} from "./components/shared/quick-access/action-center/action-center.component";
import {
    ActionCenterButtonComponent
} from "./components/shared/quick-access/action-center-button/action-center-button.component";
import {PageIndexComponent} from "./contents/index/page-index.component";
import {IndexHeaderComponent} from "./contents/index/header/index-header/index-header.component";
import {HeaderTitleComponent} from "./contents/index/header/header-title/header-title.component";
import {HeaderContactComponent} from "./contents/index/header/header-contact/header-contact.component";
import {ButtonContactComponent} from "./components/shared/button-contact/button-contact.component";
import {ButtonResumeComponent} from "./components/shared/button-resume/button-resume.component";
import {AvailableForHireComponent} from "./components/shared/available-for-hire/available-for-hire.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {GlobalService} from "../services/global-service";
import {ScrollService} from "../services/scroll-service";
import {FooterDescriptionComponent} from './components/footer/footer-description/footer-description.component';
import {FooterGroupComponent} from './components/footer/footer-group/footer-group.component';
import {FooterLinkComponent} from './components/footer/footer-link/footer-link.component';
import {HeaderImageComponent} from './contents/index/header/header-image/header-image.component';
import {
    HeaderImageAnimatedComponent
} from './contents/index/header/header-image-animated/header-image-animated.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HeaderTechStackComponent} from './contents/index/header/header-tech-stack/header-tech-stack.component';
import {MarkdownComponent} from './components/markdown/markdown.component';
import {HttpClientModule} from "@angular/common/http";
import {TableOfContentsComponent} from './components/table-of-contents/table-of-contents.component';
import {
    TableOfContentsLinkComponent
} from './components/table-of-contents/table-of-contents-link/table-of-contents-link.component';
import {IsVisibleDirective} from "./utils/directives/visible-directive";
import { FeaturedCardComponent } from './contents/index/header/featured-card/featured-card.component';
import { HeaderQuoteComponent } from './contents/index/header/header-quote/header-quote.component';
import {AutoTypeDirective} from "./utils/directives/auto-type.directive";
import {MarkdownDirective} from './utils/directives/markdown.directive';
import {SafeHtmlPipe} from "./utils/pipes/safe-html-pipe";
import { ProjectsComponent } from './contents/projects/projects.component';
import { BlogComponent } from './contents/blog/blog.component';
import { TodayILearnedComponent } from './contents/today-i-learned/today-i-learned.component';
import { SectionTitleComponent } from './components/sections/section-title/section-title.component';
import { SectionContentComponent } from './components/sections/section-content/section-content.component';
import { SectionButtonComponent } from './components/sections/section-button/section-button.component';
import { AppWindowComponent } from './components/shared/app-window/app-window.component';
import { BrowserTabComponent } from './components/shared/browser-tab/browser-tab.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { GithubWireframeComponent } from './components/wireframes/github-wireframe/github-wireframe.component';
import { SkeletonsComponent } from './components/wireframes/skeletons/skeletons.component';
import { PageUnderConstructionComponent } from './components/page-under-construction/page-under-construction.component';
import {BaseUrlService} from "../services/base-url-service";
import { RequestCvComponent } from './contents/request-cv/request-cv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltertComponent } from './components/shared/altert/altert.component';
import { ApiService } from 'src/services/api-service';
import { AlertService } from 'src/services/alert-service';
import { DatePipe } from '@angular/common';
import { MediaSectionComponent } from './components/shared/media-section/media-section.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
    declarations: [
        AppComponent,
        NavLogoComponent,
        NavBarComponent,
        NavLinkComponent,
        NavDropdownComponent,
        NavExpandedComponent,
        NavIconLinkComponent,
        SvgIconComponent,
        NavIconQuickAccessComponent,
        KbdComponent,
        QuickAccessComponent,
        ActionCenterComponent,
        ActionCenterButtonComponent,
        PageIndexComponent,
        IndexHeaderComponent,
        HeaderTitleComponent,
        HeaderContactComponent,
        ButtonContactComponent,
        ButtonResumeComponent,
        AvailableForHireComponent,
        FooterComponent,
        FooterDescriptionComponent,
        FooterGroupComponent,
        FooterLinkComponent,
        HeaderImageComponent,
        HeaderImageAnimatedComponent,
        PageNotFoundComponent,
        HeaderTechStackComponent,
        MarkdownComponent,
        SafeHtmlPipe,
        TableOfContentsComponent,
        TableOfContentsLinkComponent,
        IsVisibleDirective,
        FeaturedCardComponent,
        PageIndexComponent,
        HeaderQuoteComponent,
        AutoTypeDirective,
        MarkdownDirective,
        ProjectsComponent,
        BlogComponent,
        TodayILearnedComponent,
        SectionTitleComponent,
        SectionContentComponent,
        SectionButtonComponent,
        AppWindowComponent,
        BrowserTabComponent,
        PageHeaderComponent,
        GithubWireframeComponent,
        SkeletonsComponent,
        PageUnderConstructionComponent,
        RequestCvComponent,
        AltertComponent,
        MediaSectionComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgOptimizedImage,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClipboardModule,
    ],
    providers: [
        GlobalService,
        ScrollService,
        SafeHtmlPipe,
        BaseUrlService,
        ApiService,
        AlertService,
        DatePipe
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
