import { Component } from '@angular/core';
import {NavLink} from "../../nav-bar/models/NavLink";
import {Icons} from "../../shared/icons";
import {Links} from "../../shared/links";

@Component({
  selector: 'footer-description',
  templateUrl: './footer-description.component.html',
})
export class FooterDescriptionComponent {

  protected socialLinks = [
    new NavLink('Twitter', Links.Twitter, Icons.Twitter),
    new NavLink('LinkedIn', Links.LinkedIn, Icons.LinkedIn),
    new NavLink('GitHub', Links.GitHub, Icons.GitHub),
  ];

}
