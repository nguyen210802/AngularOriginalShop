import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Product, UserResponse} from "./module/user.module";
import {ProductService} from "./service/product/product.service";
import {UserService} from "./service/user/user.service";
import {AuthService} from "./service/auth/auth.service";
import {CartService} from "./service/cart/cart.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    InfiniteScrollDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user: UserResponse = <UserResponse>{};
  countCart: number = 0;
  logined: boolean = false;

  constructor(private productService: ProductService,
              private userService: UserService,
              protected authService: AuthService,
              private cartService: CartService,
              private router: Router) {}

  ngOnInit() {
    this.checkLogined(() => {
      this.getMyInfo();
      this.getCartCount();
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
        console.error('L��i khi l�y số l�n hàng trong gi��:', error);
      }
    })
  }
}
