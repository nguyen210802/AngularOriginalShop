import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserRequest, UserResponse} from "../module/user.module";
import {ApiResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/users';

  constructor(private http : HttpClient) { }
  getUsers(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  createUser(user: UserRequest): Observable<ApiResponse<UserResponse>> {
    return this.http.post<any>(`${this.url}/registration`, user);
  }
}
