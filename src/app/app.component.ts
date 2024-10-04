import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Notifications, UserResponse} from "./module/user.module";
import {UserService} from "./service/user/user.service";
import {AuthService} from "./service/auth/auth.service";
import {CartService} from "./service/cart/cart.service";
import {NotificationService} from "./service/notification/notification.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    InfiniteScrollDirective, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user: UserResponse = <UserResponse>{};
  notifications: Notifications[] = [];
  countReadFalse: number = 0;
  countCart: number = 0;
  logined: boolean = false;
  page: number = 1;
  size: number = 10;

  constructor(private userService: UserService,
              protected authService: AuthService,
              private cartService: CartService,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.checkLogined(() => {
      this.getMyInfo();
      this.getCartCount();
      this.getNotifications();
      this.getCountReadFalse();
    });

  }

  checkLogined(callback: () => void) {
    if(!localStorage.getItem('token'))
    {
      this.logined = false;
      return;
    }
    this.authService.isLoggedIn().subscribe({
      next: (data) => {
        this.logined = data.result.valid;
        console.log("logined: ", this.logined);
        callback();
      },
      error: (error) => {
        console.error('L��i khi kiểm tra đăng nhập:', error);
        callback();
      }
    })
  }
  getMyInfo(){
    if(!this.logined)
      return;
    this.userService.getMyInfo().subscribe({
      next: (data) => {
        this.user = data.result;
      }
    })
  }

  getCartCount(){
    if(!this.logined)
      return;
    this.cartService.countCart().subscribe({
      next: (data) => {
        this.countCart = data.result;
        console.log("Cart Count: ", this.countCart);
      },
      error: (error) => {
        console.error('Loi khi lay thon bao:', error);
      }
    })
  }

  getNotifications(){
    if(!this.logined)
      return;
    this.notificationService.getNotifications(this.page, this.size).subscribe({
      next: (data) => {
        this.notifications = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        console.log("Notifications: ", this.notifications);
      },
      error: (error) => {
        console.error('Loi khi lay thong bao:', error);
      }
    })
  }

  readNotifications(notificationId: string){
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read)
      // Đánh dấu thông báo là đã đọc
      notification.read = true;
    else
      return;
    this.notificationService.readNotification(notificationId).subscribe({
      next: () => {
        this.countReadFalse -= 1;
      },
      error: (error) => {
        console.error('Loi khi doc thong bao:', error);
      }
    })
  }

  getCountReadFalse(){
    if(!this.logined)
      return;
    this.notificationService.getCountReadFalse().subscribe({
      next: (data) => {
        this.countReadFalse = data.result;
      },
      error: (error) => {
        console.error('Loi khi lay so luong thong bao:', error);
      }
    })
  }
}
