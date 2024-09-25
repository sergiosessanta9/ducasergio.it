import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TTableOfContentsItem } from "../table-of-contents/models/t-table-of-contents-item";
import { GlobalService } from "../../../services/global-service";
import { Router } from "@angular/router";
import { IMetadata } from 'src/app/models/interfaces/imetadata';
import { DatePipe } from '@angular/common';
import { IArticle } from 'src/app/models/interfaces/iarticle';
import { ClipboardService } from 'src/services/clipboard.service';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  /*
  styleUrls: [
    './../../../styles/md-components.scss',
    './../../../styles/md-contents.scss'
  ]
  */
})
export class MarkdownComponent implements OnInit {

  protected path: string = '';
  protected error = false;
  protected loaded = false;

  @ViewChild('markdown', { static: true }) markdown?: ElementRef;

  // For UI
  protected article?: IArticle;
  showMediaSection = false;

  constructor(
    router: Router,
    private clipboardService: ClipboardService,
    private globalService: GlobalService,
    private datePipe: DatePipe,
  ) {
    this.path = router.url;
  }

  ngOnInit(): void {
    const theme = this.globalService.getTheme();
    document.documentElement.setAttribute('data-accent', this.article?.metadata.accent != null ? this.article?.metadata.accent : this.globalService.getAccentColor());
    document.documentElement.classList.add(theme);
    setTimeout(() => {
      this.scrollToElement(window.location.hash);
    }, 800);
  }

  protected scrollToElement(id: string) {
    const element = document.getElementById(id.replaceAll('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  onLoad(data: any) {
    if (data) {
      this.article = data;
      this.showMediaSection = this.path.includes('blog') || this.path.includes('today-i-learned');
      if (this.article?.metadata.accent) {
        this.markdown?.nativeElement.setAttribute('data-accent', this.article?.metadata.accent);
      }


      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }

      this.loaded = true;

    } else {
      this.error = true;
    }
  }

  handleClick(event: any) {
    const target = event.target as HTMLElement;
    let parent: any;

    if (target.classList.contains('mdx-code__copy-button')) {
      parent = target.parentElement;
    } else if (target.parentElement?.classList.contains('mdx-code__copy-button')) {
      parent = target.parentElement?.parentElement;
    } else if (target.parentElement?.parentElement?.classList.contains('mdx-code__copy-button')){
      parent = target.parentElement?.parentElement?.parentElement;
    }

    if (parent) {
      const messageElement = parent.querySelector('.mdx-code__copy-button-message');
      const codeElement = parent.querySelector('code');

      // Ensure both message and code elements exist
      if (messageElement && codeElement) {
        // Remove existing 'copied' class if present
        if (messageElement.classList.contains('mdx-code__copy-button-message-copied')) {
          messageElement.classList.remove('mdx-code__copy-button-message-copied');
        }

        // Add 'copied' class for the feedback message
        messageElement.classList.add('mdx-code__copy-button-message-copied');

        // Copy the code content to the clipboard
        if (navigator.clipboard) {

        }
        //this.clipboardService.copy(this.extractCodeText(codeElement.textContent || ''));

        // Remove the 'copied' class after 1 second
        if (this.clipboardService.copyTextToClipboard(this.extractCodeText(codeElement.textContent || ''))) {
          setTimeout(() => {
            messageElement.classList.remove('mdx-code__copy-button-message-copied');
          }, 1000);
        }

      }
  
    }
  }

  private extractCodeText(code: string): string {
    // This function now extracts the code directly from the code block
    const regex = /```(.*?)```/s; // Use 's' flag to match across multiple lines if needed
    const match = code.match(regex);

    // Remove the first and last lines if they are backticks or language indicators
    const lines = match ? match[1].trim().split('\n') : code.split('\n');
    return lines.join('\n');
  }

}
