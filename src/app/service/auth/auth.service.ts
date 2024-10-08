import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  AuthenticationRequest,
  AuthenticationResponse,
  IntrospectRequest,
  IntrospectResponse, RefreshTokenRequest
} from "../../module/user.module";
import {Observable, tap} from "rxjs";
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
          localStorage.setItem('refreshToken', data.result.refreshToken);
        }
      })
    )
  }

  refreshLogin(): Observable<ApiResponse<AuthenticationResponse>>{
    const refreshToken = localStorage.getItem('refreshToken');
    const request = new RefreshTokenRequest(refreshToken || '');
    console.log("Request: ", request);
    return this.http.post<any>(`${this.url}/refresh-token`, request).pipe(
      tap(data => {
        console.log("authenticated: ", data.result.authenticated)
        if (data.result.authenticated) {
          localStorage.setItem('token', data.result.token);
          localStorage.setItem('refreshToken', data.result.refreshToken);
        }
      })
    )
  }

  loginWithGoogle(): Observable<ApiResponse<AuthenticationResponse>> {
    return this.http.post<ApiResponse<AuthenticationResponse>>(`${this.url}/loginWithGoogle`, {}).pipe(
      tap((data: ApiResponse<AuthenticationResponse>) => {
        if (data.result?.authenticated) {
          localStorage.setItem('token', data.result.token);
        }
      }),
    );
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
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
  }

  introspect(token: string): Observable<ApiResponse<IntrospectResponse>>{
    this.introspectRequest.token = token;
    return this.http.post<any>(`${this.url}/introspect`, this.introspectRequest);
  }
}
