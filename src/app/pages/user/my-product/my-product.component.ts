import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../../module/user.module";
import {ProductService} from "../../../service/product/product.service";
import {AuthService} from "../../../service/auth/auth.service";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@Component({
  selector: 'app-my-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    NgIf,
    InfiniteScrollDirective
  ],
  templateUrl: './my-product.component.html',
  styleUrl: './my-product.component.css'
})
export class MyProductComponent {
  products: Product[] =[];
  currentPage = 1;
  totalPages = 0;
  pageSize = 12;
  totalElements = 0;
  loading = false; // Trạng thái để chỉ định việc đang load thêm sản phẩm
  logined: boolean = false;

  constructor(private productService: ProductService,
              protected authService: AuthService) {}

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

    if(this.totalPages != 0 && this.currentPage == this.totalPages)
      return;

    this.productService.getMyProduct(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        console.log("Products: ", this.products)
        this.totalPages = data.result.totalPages;
        this.totalElements = data.result.totalElements;
        this.pageSize += this.pageSize;
        this.loading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }

  onScroll(){
    this.loadProduct();
  }

  deleteProduct(productId: string){
    this.productService.deleteProduct(productId).subscribe({
      next: (data) => {
        this.totalPages = 0;
        this.loadProduct();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    })
  }
}
