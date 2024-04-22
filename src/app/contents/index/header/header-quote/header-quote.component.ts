import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Icons} from "../../../../components/shared/icons";

@Component({
  selector: 'header-quote',
  templateUrl: './header-quote.component.html',
  styleUrls: ['./header-quote.component.scss']
})
export class HeaderQuoteComponent implements OnInit, AfterContentInit {

  protected readonly Icons = Icons;
  protected showQuote = false;
  protected showLine = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {

  }

}
