import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {UserRequest} from "../../service/module/user.module";
import {UserService} from "../../service/user/user.service";
import {routes} from "../../app.routes";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser: UserRequest = <UserRequest>{};

  constructor(private userService: UserService, private router: Router) {}
  createUser(){
    this.userService.createUser(this.newUser).subscribe({
      next: () => {
        this.newUser = <UserRequest>{};
        this.router.navigate(["login"]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
