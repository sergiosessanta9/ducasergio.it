import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  private themeKey = 'app-theme';
  private accentKey = 'data-accent';

  public isQuickAccessOpen: boolean = false;
  public theme: 'dark' | 'light' = 'light';
  public isScrolled = false;

  setTheme(theme: string) {
    localStorage.setItem(this.themeKey, theme);
    document.documentElement.classList.add(theme);
    this.hangeThemeColor(theme);
    
  }

  setAccentColor(accent: string) {
    localStorage.setItem(this.accentKey, accent);
    document.documentElement.setAttribute('data-accent', accent);
  }

  getTheme(): string {
    return localStorage.getItem(this.themeKey) || 'light';
  }

  getAccentColor(): string {
    return localStorage.getItem(this.accentKey) || 'blue';
  }

  private hangeThemeColor(color: string) {
    const metaThemeColor = document .querySelector("meta[name=theme-color]");
    metaThemeColor?.setAttribute("content", color==='light' ? '#f1f5f9' : '#0c1223');
  }
}
