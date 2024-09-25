import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  /**
   * Copies the given text to the system clipboard and returns a boolean
   * @param text The text to be copied
   * @returns true if the copy was successful, false otherwise
   */
  copyTextToClipboard(text: string): boolean {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      try {
        navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        return false;
      }
    } else {
      // Fallback for browsers that do not support the Clipboard API
      return this.fallbackCopyText(text);
    }
  }

  /**
   * Fallback method to copy text by creating a temporary textarea
   * @param text The text to be copied
   * @returns true if the copy was successful, false otherwise
   */
  private fallbackCopyText(text: string): boolean {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Make the textarea non-visible
    textarea.style.display = 'none';
    textarea.style.position = 'fixed';  // Prevent scrolling to the bottom of the page
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);

    // Select the text inside the textarea
    textarea.select();

    try {
      // Execute the copy command
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      if (successful) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      document.body.removeChild(textarea);
      return false;
    }
  }
}
