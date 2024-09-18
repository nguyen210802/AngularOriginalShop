import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../../service/module/user.module";
import {ProductService} from "../../../service/product/product.service";
import {AuthService} from "../../../service/auth/auth.service";
import {ProductImageService} from "../../../service/product-image/product-image.service";

@Component({
  selector: 'app-my-product',
  standalone: true,
    imports: [
        RouterOutlet,
        NgForOf,
        NgIf
    ],
  templateUrl: './my-product.component.html',
  styleUrl: './my-product.component.css'
})
export class MyProductComponent {
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
    this.productService.getMyProduct(this.currentPage, this.pageSize).subscribe({
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
      this.productImageService.getMainImage(product.id).subscribe(
        (data) => {
          // console.log("image: ",data.result[0].image);
          product.image = data.result?.image;
        },
        error => {
          console.error('Error fetching product images', error);
        }
      );
    }
  }

  createProductClick(){
    return this.router.navigate(['/createProduct']);
  }

  protected readonly Symbol = Symbol;
}
