import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import {PageIndexComponent} from "./contents/page-index/page-index.component";
import {IndexHeaderComponent} from "./contents/page-index/header/index-header/index-header.component";
import {HeaderTitleComponent} from "./contents/page-index/header/header-title/header-title.component";
import {HeaderContactComponent} from "./contents/page-index/header/header-contact/header-contact.component";
import {ButtonContactComponent} from "./components/shared/button-contact/button-contact.component";
import {ButtonResumeComponent} from "./components/shared/button-resume/button-resume.component";
import {AvailableForHireComponent} from "./components/shared/available-for-hire/available-for-hire.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {NgOptimizedImage} from "@angular/common";
import {GlobalService} from "../services/global-service";
import {ScrollService} from "../services/scroll-service";
import { FooterDescriptionComponent } from './components/footer/footer-description/footer-description.component';
import { FooterGroupComponent } from './components/footer/footer-group/footer-group.component';
import { FooterLinkComponent } from './components/footer/footer-link/footer-link.component';
import { HeaderImageComponent } from './contents/page-index/header/header-image/header-image.component';
import { HeaderImageAnimatedComponent } from './contents/page-index/header/header-image-animated/header-image-animated.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { HeaderTechStackComponent } from './contents/page-index/header/header-tech-stack/header-tech-stack.component';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { HttpClientModule} from "@angular/common/http";


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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  providers: [
    GlobalService,
    ScrollService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
