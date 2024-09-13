import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {Product} from "../../service/module/user.module";
import {ProductService} from "../../service/product/product.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../service/auth/auth.service";

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
  currentPage = 1;
  totalPages = 0;
  pageSize = 2;
  totalElements = 0;
  loading = false; // Trạng thái để chỉ định việc đang load thêm sản phẩm

  constructor(private productService: ProductService, protected authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    if (this.loading) return;

    this.loading = true;

    this.productService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        console.log("Logined: ", this.authService.isLoggedIn());
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
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

  setupObserver(): void {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && this.products.length < this.totalElements) {
        this.loadProduct(); // Tải thêm sản phẩm khi cuộn đến cuối danh sách
      }
    });

    // observer.observe(this.loadMoreTrigger.nativeElement);
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
