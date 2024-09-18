import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Product} from "../../service/module/user.module";
import {ProductService} from "../../service/product/product.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";
import {ProductImageService} from "../../service/product-image/product-image.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] =[];
  currentPage = 1;
  totalPages = 0;
  pageSize = 2;
  totalElements = 0;
  loading = false; // Trạng thái để chỉ định việc đang load thêm sản phẩm
  logined: boolean = false;

  constructor(private productService: ProductService,
              protected authService: AuthService,
              private productImageService: ProductImageService,
              private router: Router) {}

  ngOnInit() {
    this.loadProduct(() => {
      this.loadImage();
    });
    this.checkLogined();
  }

  checkLogined(){
    if(!localStorage.getItem('token'))
    {
      this.logined = false;
      return;
    }
    this.authService.isLoggedIn().subscribe({
      next: (data) => {
        this.logined = data.result.valid;
        console.log("logined: ", this.logined)
      }
    })
  }

  loadProduct(callback: () => void) {
    if (this.loading) return;
    this.loading = true;
    this.productService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        this.currentPage++;
        this.totalPages = data.result.totalPages;
        this.totalElements = data.result.totalElements;
        this.loading = false;
        callback();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  loadImage(){
    for(let product of this.products){
      this.productImageService.getMainImage(product.id).subscribe(
        (data) => {
          product.image = data.result.image;
        },
        error => {
          console.error('Error fetching product images', error);
        }
      );
    }
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
}
