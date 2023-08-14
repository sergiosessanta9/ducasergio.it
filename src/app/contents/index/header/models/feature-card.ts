import {Icons} from "../../../../components/shared/icons";

export class FeatureCard{
  title? :string;
  text? :string;
  icon?: Icons;
  style?: string;

  constructor(title: string, text: string, icon: Icons ,style?: string) {
    this.title = title;
    this.text = text;
    this.icon = icon;
    this.style = style;
  }
}
