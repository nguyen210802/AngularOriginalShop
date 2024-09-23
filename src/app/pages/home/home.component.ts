import { Component } from '@angular/core';
import {Params, Router, RouterOutlet} from "@angular/router";
import {Product, UserResponse} from "../../service/module/user.module";
import {ProductService} from "../../service/product/product.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";
import {ProductImageService} from "../../service/product-image/product-image.service";
import {FormsModule} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {CartService} from "../../service/cart/cart.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    InfiniteScrollDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: UserResponse = <UserResponse>{};
  products: Product[] =[];
  currentPage = 1;
  totalPages = 0;
  pageSize = 12;
  totalElements = 0;
  countCart: number = 0;
  loading = false;
  logined: boolean = false;

  constructor(private productService: ProductService,
              private userService: UserService,
              protected authService: AuthService,
              private cartService: CartService,
              private router: Router) {}

  ngOnInit() {
    this.loadProduct(() => {
      this.loadMainImages();
    });
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
    this.userService.getMyInfo().subscribe({
      next: (data) => {
        this.user = data.result;
      }
    })
  }

  getCartCount(){
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

  loadProduct(callback: () => void) {
    if (this.loading) return;
    this.loading = true;
    this.productService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        this.totalPages = data.result.totalPages;
        this.pageSize += this.pageSize;
        this.totalElements = data.result.totalElements;
        this.loading = false;
        callback();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  onScroll(){
    this.loadProduct(() => {
      this.loadMainImages();
    });
  }


  loadMainImages(){
    for(let product of this.products){
      product.mainImage = product.images[0];
    }
  }

  productClick(productId: string){
    this.router.navigate([`${productId}`]);
  }

  searchProduct(){
    console.log("Search Product");
  }

  loginClick(){
    this.router.navigate(['login']);
  }
  registerClick(){
    this.router.navigate(['register']);
  }

  userClick(){
    this.router.navigate(['user']);
  }

  orderClick(){
    console.log("Order Click");
  }

  logoutClick(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
