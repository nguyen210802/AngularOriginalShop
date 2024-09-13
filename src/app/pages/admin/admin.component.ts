import { Component } from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {UserResponse} from "../../service/module/user.module";
import {NgForOf} from "@angular/common";
import {Params, Router, RouterOutlet} from "@angular/router";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgForOf, InfiniteScrollDirective],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  currentPage = 1;
  pageSize = 0;
  totalPages = 2;
  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) {}

  users: UserResponse[] =[];
  ngOnInit() {
    if(this.authService.isLoggedIn())
      return
    else
      this.router.navigate(['login']);
    this.loadUsers();
  }

  loadUsers(){
    this.pageSize += 20;
    if (this.currentPage <= this.totalPages){
      this.adminService.getAllUsers(this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          console.log("Token: ",localStorage.getItem('token'));
          console.log("user: ", data.result.data);
          this.users = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
          this.totalPages = data.result.totalPages;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onScroll() {
    this.loadUsers();
    console.log("Xin chao");
  }

  updateClick(id: string){
    const param: Params = {id: id.toString()}
    this.router.navigate(['admin/update'], {queryParams: param});
  }

  deleteUser(id: string){
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
        console.log('User deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  logoutClick(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
