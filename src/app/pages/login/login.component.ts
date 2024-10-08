import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Authenticated, AuthenticationRequest} from "../../module/user.module";
import {AuthService} from "../../service/auth/auth.service";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthenticationRequest = <AuthenticationRequest>{};
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    console.log(localStorage.getItem('token'))
    this.checkLogined();
  }

  checkLogined() {
    if(!localStorage.getItem('token'))
      return;
    // @ts-ignore
    this.authService.introspect(localStorage.getItem('token')).subscribe({
      next: (data) => {
        if(data.result.valid)
          this.router.navigate(['']);
      },
      error: (error) => {
        console.error('L��i khi kiểm tra đăng nhập:', error);
      }
    })
  }

  registerClick(){
    this.router.navigate(['register']);
  }

  onSubmit() {

    this.authService.login(this.authRequest).subscribe({
      next: (data) => {
        console.log()
        if (data.result.authenticated) {
          if(this.authService.checkAuthentication(Authenticated.ADMIN.toString()))
            this.router.navigate(['/admin']);
          else if(this.authService.checkAuthentication(Authenticated.USER.toString()))
            this.router.navigate(['']);
        }
        else {
          this.errorMessage = "Tài khoản hoặc mật khẩu không chính xác";
        }
      },
      error: (error) => {
        this.errorMessage = 'Có lỗi xảy ra khi đăng nhập: '+ error;
      }
    });
  }
}
