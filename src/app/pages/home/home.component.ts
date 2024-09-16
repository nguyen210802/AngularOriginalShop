import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Product} from "../../service/module/user.module";
import {ProductService} from "../../service/product/product.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";
import {ProductImageService} from "../../service/product-image/product-image.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: Product[] =[];
  images: any[] = [];
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
    this.loadProduct();
    this.checkLogined();
  }

  checkLogined(){
    this.authService.isLoggedIn().subscribe({
      next: (data) => {
        console.log("login: ", data.result.valid)
        this.logined = data.result.valid;
      }
    })
  }

  loadProduct() {
    if (this.loading) return;
    this.loading = true;
    this.productService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        this.loadImage();
        this.currentPage++;
        this.totalPages = data.result.totalPages;
        this.totalElements = data.result.totalElements;
        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  loadImage(){
    for(let product of this.products){
      this.productImageService.getProductImages(product.id).subscribe(
        (data) => {
          // console.log("image: ",data.result[0].image);
          product.image = data.result[0]?.image;
        },
        error => {
          console.error('Error fetching product images', error);
        }
      );
    }
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
