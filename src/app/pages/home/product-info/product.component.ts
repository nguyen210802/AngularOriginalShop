import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ProductService} from "../../../service/product/product.service";
import {Product} from "../../../service/module/user.module";
import {NgForOf, NgIf} from "@angular/common";
import {ProductImageService} from "../../../service/product-image/product-image.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    NgForOf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product = <Product>{};
  isAddCart: boolean = false;
  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private productImageService: ProductImageService) {}

  ngOnInit() {
    this.loadProduct(() => {
      this.loadMainImage();
    })
  }

  loadProduct(callback: () => void){
    this.route.params.subscribe(params => {
      const productId = params['productId'];  // Lấy path variable từ URL
      this.productService.getById(productId).subscribe({
        next: (data) => {
          this.product = data.result;
          console.log("product: ", this.product);
          callback();
        },
        error: (error) => {
          console.error(error);
          callback();
        }
      });
    });
  }

  loadMainImage(){
    this.product.mainImage = this.product.images[0];
    for(let image of this.product.images){
      if(image.mainImage){
        this.product.mainImage = image;
        break;
      }
    }
  }

  addCart(){
    console.log("Add Cart");
    this.productService.addCart(this.product.id).subscribe({
      next: (data) => {
        this.isAddCart = true;
        console.log("Add to cart success");
      },
      error: (error) => {
        console.error("Error add to cart: ", error);
      }
    })
  }

  refreshIsAddCart(){
    this.isAddCart = false;
  }
}
