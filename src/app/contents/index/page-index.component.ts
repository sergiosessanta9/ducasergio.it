import {AfterContentInit, Component, OnInit} from '@angular/core';
import {FeatureCard} from "./header/models/feature-card";
import {Icons} from "../../components/shared/icons";
import {GlobalService} from "../../../services/global-service";

@Component({
  selector: 'page-index',
  templateUrl: './page-index.component.html',
  styleUrls: ['page-index.component.css']
})
export class PageIndexComponent implements AfterContentInit, OnInit {

  protected items = [
    new FeatureCard(
      'Team working',
      'I like working in a team and I\'m always open to discussing other ideas.',
      Icons.GroupIcon,
      'bg-amber-300 dark:bg-amber-900'),
    new FeatureCard(
      'Problem Solving',
      'I always look for the best solution to deal with any new problems.',
      Icons.ProblemSolvingIcon,
      'bg-pink-300 dark:bg-pink-900'
    ),
    new FeatureCard(
      'Creativity',
      'I consider myself very creative and with a great desire to always do something new.',
      Icons.CreativityIcon,
      'bg-sky-300 dark:bg-sky-900'),
  ];

  ngAfterContentInit(): void {
  }

  protected readonly Icons = Icons;

  showConfetti = false;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void{
    const theme = this.globalService.getTheme();
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-accent', this.globalService.getAccentColor());
    window.scrollTo(0, 0);
  }

}
