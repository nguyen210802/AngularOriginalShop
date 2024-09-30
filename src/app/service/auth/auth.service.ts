import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  AuthenticationRequest,
  AuthenticationResponse,
  IntrospectRequest,
  IntrospectResponse
} from "../../module/user.module";
import {Observable, of, tap} from "rxjs";
import {ApiResponse} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/auth';
  introspectRequest: IntrospectRequest = <IntrospectRequest>{};
  constructor(private http: HttpClient, private router: Router) { }


  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(request: AuthenticationRequest): Observable<ApiResponse<AuthenticationResponse>>{
    return this.http.post<any>(`${this.url}/login`, request).pipe(
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

  isLoggedIn(): Observable<ApiResponse<IntrospectResponse>>{
    const token = localStorage.getItem('token');
    if(!token)
      this.introspectRequest.token = '';
    else
      this.introspectRequest.token = token;
    return this.http.post<any>(`${this.url}/introspect`, this.introspectRequest);
  }
}
