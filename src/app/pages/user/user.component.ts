import { Component } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router, RouterOutlet} from "@angular/router";
import {UserService} from "../../service/user/user.service";
import {UserResponse} from "../../module/user.module";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userResponse: UserResponse = <UserResponse>{};

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.myInfo();
  }

  myInfo(){
    this.userService.getMyInfo().subscribe({
      next: (data) => {
        this.userResponse = data.result;
        console.log("UserResponse: ",this.userResponse);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
