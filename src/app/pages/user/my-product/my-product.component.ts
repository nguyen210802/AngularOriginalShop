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
    this.loadProduct(() => {
      this.loadMainImage();
    });
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

  loadProduct(callBack: () => void) {
    if (this.loading) return;
    this.loading = true;
    this.productService.getMyProduct(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = Array.isArray(data.result.data) ? data.result.data : [data.result.data];
        console.log("Products: ", this.products)
        this.currentPage++;
        this.totalPages = data.result.totalPages;
        this.totalElements = data.result.totalElements;
        this.loading = false;
        callBack();
      },
      error: (error) => {
        console.error('There was an error!', error);
        callBack();
      }
    })
  }

  loadMainImage(){
    for(let product of this.products){
      console.log("load For Product");
      product.mainImage = product.images[0];
      for(let image of product.images){
        if(image.mainImage){
          product.mainImage = image;
          console.log("MainImage: ",image);
          console.log("ProductId: ",product.id);
          break;
        }
        else {
          console.log("Image Else: ", image)
        }
      }
    }
  }

  createProductClick(){
    return this.router.navigate(['/createProduct']);
  }

  protected readonly Symbol = Symbol;
}
