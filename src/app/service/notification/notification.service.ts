import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ApiResponse, PageResponse} from "../../app.module";
import {Notifications} from "../../module/user.module";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = 'http://localhost:8080/users/notifications';
  constructor(private http: HttpClient, private router: Router) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getNotifications(page: number, size: number): Observable<ApiResponse<PageResponse<Notifications>>>{
    return this.http.get<any>(`${this.url}`, {
      params: {
        page: page,
        size: size,
      },
      headers: this.getHeaders()});
  }

  getCountReadFalse(): Observable<ApiResponse<number>>{
    return this.http.get<any>(`${this.url}/countReadFalse`, {headers: this.getHeaders()});
  }

  readNotification(notificationId: string): Observable<ApiResponse<Number>>{
    return this.http.put<any>(`${this.url}/read`, notificationId, {headers: this.getHeaders()});
  }
}
