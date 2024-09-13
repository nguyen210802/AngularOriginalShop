import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Authenticated, AuthenticationRequest} from "../../service/module/user.module";
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
  errorUsername: string = '';
  errorPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  registerClick(){
    this.router.navigate(['register']);
  }

  onSubmit() {
    if(this.authRequest.username == null){
      this.errorUsername = 'Tai khoan khong duoc trong!';
      return;
    }
    else if( this.authRequest.username.length < 5){
      this.errorUsername = 'Tên tài khoản phải có ít nhất 5 ký tự';
      return;
    }
    else
      this.errorUsername = '';

    if(this.authRequest.password == null){
      this.errorPassword = 'Mật khẩu không duoc trong!';
      return;
    }
    else if(this.authRequest.password.length < 5){
      this.errorPassword = 'Mật khẩu phải có ít nhất 5 ký tự';
      return;
    }
    else
      this.errorPassword = '';

    this.authService.login(this.authRequest).subscribe({
      next: (data) => {
        console.log()
        if (data.result.authenticated) {
          if(this.authService.checkAuthentication(Authenticated.ADMIN.toString()))
            this.router.navigate(['/admin']);
          else if(this.authService.checkAuthentication(Authenticated.USER.toString()))
            this.router.navigate(['/home']);
        }
        else {
          this.errorMessage = "Tài khoản hoặc mật khẩu không chính xác";
        }
      },
      error: (error) => {
        this.errorMessage = 'Có lỗi xảy ra khi đăng nhập';
      }
    });
  }
}
