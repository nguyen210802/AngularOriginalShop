import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {UserRequest, UserResponse} from "../../../module/user.module";
import {AdminService} from "../../../service/admin/admin.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-update',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.css'
})
export class AdminUpdateComponent {
  userResponse: UserResponse = <UserResponse>{};
  userRequest: UserRequest = <UserRequest>{};

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.adminService.getUser(params['id']).subscribe({
        next: (data) => {
          this.userResponse = data.result;

          this.userRequest.username = this.userResponse.username;
          this.userRequest.email = this.userResponse.email;

          console.log("UserResponse: ", this.userResponse)
        },
        error: (error) => {
          console.error(error);
        }
      })
    })
  }

  updateUser(){
    console.log("UserRequest: ", this.userRequest)
    this.adminService.updateUser(this.userResponse.id, this.userRequest).subscribe({
      next: () => {
        this.userRequest = <UserRequest>{};
        this.router.navigate(["admin"]);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  userHomeClick(){
    this.router.navigate(['admin']);
  }
}
