import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorVO } from 'src/app/models/error-vo';
import { BlogVO } from 'src/app/models/blog-vo';
import { BlogArticleVO } from 'src/app/models/blog-article-vo';
import { TodayILearnedVO } from 'src/app/models/today-i-learned-vo';
import { CurrentDate } from 'src/app/models/current-date';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }

  sendEmail(first_name: string, last_name: string, email: string): Observable<any> {
    return this.http.get<ErrorVO>(`/api/mail_service.php?name=${first_name} ${last_name}&email=${email}`);
  }

  getBlogs(): Observable<BlogVO[]> {
    return this.http.get<BlogVO[]>(`/api/blogs.php`);
    //return this.http.get<BlogVO[]>(`/api/blogs.php`);
  }

  getBlog(id: string | null): Observable<BlogArticleVO> {
    return this.http.get<BlogArticleVO>(`/api/blogs.php?blog=${id}`);
    //return this.http.get<BlogArticleVO>(`/api/blogs.php?blog=${id}`);
  }

  reactBlog(blog: string | null, reaction: number | null): Observable<ErrorVO[]> {
    return this.http.get<ErrorVO[]>(`/api/blogs.php?blog=${blog}&action=rate&reaction=${reaction}`);
  }

  shareBlog(blog: string | null): Observable<any> {
    return this.http.get<ErrorVO>(`/api/blogs.php?blog=${blog}&action=share`);
  }

  getTILs(): Observable<TodayILearnedVO[]> {
    return this.http.get<TodayILearnedVO[]>(`/api/tils.php`);
    //return this.http.get<TodayILearnedVO[]>(`/api/tils.php`);
  }

  getDate(): Observable<CurrentDate> {
    return this.http.get<CurrentDate>(`/api/timeUtils.php`);
  }

}
