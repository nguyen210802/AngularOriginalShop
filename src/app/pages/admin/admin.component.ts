import { Component } from '@angular/core';
import {AdminService} from "../../service/admin/admin.service";
import {UserResponse} from "../../service/module/user.module";
import {NgForOf} from "@angular/common";
import {Params, Route, Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, NgForOf],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private adminService: AdminService, private router: Router) {}

  users: UserResponse[] =[];
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.adminService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.result;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  updateClick(id: string){
    const param: Params = {id: id.toString()}
    this.router.navigate(['admin/update'], {queryParams: param});
  }

  deleteUser(id: string){
    this.adminService.deleteUser(id).subscribe({
      next: () => {
        // Cập nhập danh sách người dùng
        this.loadUsers();
        console.log('User deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }
}
