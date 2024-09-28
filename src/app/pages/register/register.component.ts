import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserRequest} from "../../service/module/user.module";
import {UserService} from "../../service/user/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser: UserRequest = <UserRequest>{};
  confirmPassword: string = '';
  otp: string = '';
  otpExist: boolean = false;
  errorPhone: string = '';
  errorUsername: string = '';
  errorEmail: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}
  createUser(){
    console.log("UserRequest: ", this.newUser);
    if(this.newUser.phone == null){
      this.errorPhone = 'Phone number cannot be empty';
      return;
    }
    if(this.newUser.username == null){
      this.errorPhone = 'username cannot be empty';
      return;
    }
    if(this.newUser.email == null){
      this.errorPhone = 'Email number cannot be empty';
      return;
    }
    if(this.newUser.password != this.confirmPassword){
      this.errorMessage = "Confirm incorrect password";
      return;
    }
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.otpExist = true;
      },
      error: (error) => {
        console.error('Error occurred:', error.error);

        if (error.status === 400 && error.error.code === 1002) {
          this.errorMessage = error.error.message;
        } else
          this.errorMessage = 'An unknown error occurred. Please try again.';
      }
    });
  }

  confirmOtp(){
    this.userService.confirmOtpAndCreateUser(this.newUser, this.otp).subscribe({
      next: () => {
        this.newUser = <UserRequest>{};
        this.router.navigate(["login"]);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
