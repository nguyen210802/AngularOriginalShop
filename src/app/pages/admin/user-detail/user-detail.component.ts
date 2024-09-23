import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {UserRequest, UserResponse} from "../../../service/module/user.module";
import {AdminService} from "../../../service/admin/admin.service";

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  userResponse: UserResponse = <UserResponse>{};

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.adminService.getUser(params['id']).subscribe({
        next: (data) => {
          this.userResponse = data.result;
          console.log("UserResponse: ", this.userResponse)
        },
        error: (error) => {
          console.error(error);
        }
      })
    })
  }

  userHomeClick(){
    this.router.navigate(['admin']);
  }
}
