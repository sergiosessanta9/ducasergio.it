import {Component, Input} from '@angular/core';
import {SvgIconComponent} from "../../../../components/shared/svg-icon/svg-icon.component";
import {Icons} from "../../../../components/shared/icons";
import {FeatureCard} from "../models/feature-card";

@Component({
  selector: 'featured-card',
  templateUrl: './featured-card.component.html',
})
export class FeaturedCardComponent {
  @Input() card?: FeatureCard;
}
