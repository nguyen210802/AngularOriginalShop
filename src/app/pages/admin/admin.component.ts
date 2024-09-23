import { Component } from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {UserResponse} from "../../service/module/user.module";
import {NgForOf, NgIf} from "@angular/common";
import {Params, Router, RouterOutlet} from "@angular/router";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgForOf, InfiniteScrollDirective, NgIf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  currentPage = 1;
  pageSize = 20;
  totalPages = 2;
  loaded: boolean = false;
  constructor(private adminService: AdminService, private authService: AuthService, private router: Router) {}

  users: UserResponse[] =[];
  ngOnInit() {
    this.checkLogined(() => {
      // Các hành động tiếp theo sau khi đã kiểm tra đăng nhập
      this.loadUsers();
    });
  }

  checkLogined(callback: () => void) {
    if(!localStorage.getItem('token')) {
      callback();
      return;
    }
    this.authService.isLoggedIn().subscribe({
      next: (data) => {
        console.log("checklogined: ");
        callback();
      },
      error: (error) => {
        console.error('Lỗi khi kiểm tra đăng nhập:', error);
        callback();
      }
    });
  }

  loadUsers(){
    if (this.currentPage <= this.totalPages){
      this.adminService.getAllUsers(this.currentPage, this.pageSize).subscribe({
        next: (data) => {
          console.log("user: ", data.result.data);
          this.users = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
          this.totalPages = data.result.totalPages;
          this.pageSize += this.pageSize;
          this.loaded = true;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }

  onScroll() {
    this.loadUsers();
  }

  userDetailClick(id: string){
    const param: Params = {id: id.toString()}
    this.router.navigate(['admin/detail'], {queryParams: param});
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
