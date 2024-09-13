import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../../app.module";
import {UserRequest, UserResponse} from "../module/user.module";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url =  'http://localhost:8080/admin';

  constructor(private http : HttpClient) { }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllUsers() : Observable<ApiResponse<UserResponse[]>>{
    return this.http.get<any>(`${this.url}/getAll`);
  }

  getUser(id : string) : Observable<ApiResponse<UserResponse>>{
    return this.http.get<any>(`${this.url}/${id}`, { headers: this.getHeaders() });
  }

  updateUser( id: string, user: UserRequest): Observable<ApiResponse<UserResponse>> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const params = new HttpParams().set('id', id);
    return this.http.put<any>(this.url+ "/update",user, {headers: this.getHeaders(), params});
  }

  deleteUser(id: string) : Observable<ApiResponse<void>>{
    const params =new HttpParams().set('id', id);
    return this.http.delete<any>(this.url+"/delete", {params, headers: this.getHeaders()})
  }
}
