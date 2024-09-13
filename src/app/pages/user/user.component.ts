import { Component } from '@angular/core';
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  ngOnInit() {
    if(this.authService.isLoggedIn())
      return;
    else {
      this.router.navigate(['login']);
    }
  }
  constructor(private authService: AuthService, private router: Router) {
  }
}
