import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class BaseUrlService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    getBaseUrl(): string {
        return this.document.baseURI;
    }
}
