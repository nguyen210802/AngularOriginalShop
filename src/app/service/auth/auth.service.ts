import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthenticationRequest, AuthenticationResponse} from "../module/user.module";
import {Observable, tap} from "rxjs";
import {ApiResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/auth/token';
  constructor(private http: HttpClient, private router: Router) { }

  login(request: AuthenticationRequest): Observable<ApiResponse<AuthenticationResponse>>{
    return this.http.post<any>(this.url, request).pipe(
      tap(data => {
        if (data.result.authenticated) {
          localStorage.setItem('token', data.result.token);
        }
      })
    )
  }

  getDecodedToken(): any{
    const token = localStorage.getItem('token');
    return token? JSON.parse(atob(token.split('.')[1])) : null;
  }

  checkAuthentication(auth: string): boolean{
    const decodedToken = this.getDecodedToken();
    return !!(decodedToken && decodedToken.scope === auth);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    console.log("Token: ",localStorage.getItem('token'))
    return !!localStorage.getItem('token');
  }
}
