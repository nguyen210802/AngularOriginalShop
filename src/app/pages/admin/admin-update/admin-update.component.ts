import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {UserRequest, UserResponse} from "../../../service/module/user.module";
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
        },
        error: (error) => {
          console.error(error);
        }
      })
    })
  }

  updateUser(){
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
