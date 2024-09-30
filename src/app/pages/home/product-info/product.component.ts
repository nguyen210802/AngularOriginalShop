import { Component } from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {ProductService} from "../../../service/product/product.service";
import {Product} from "../../../module/user.module";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../../service/cart/cart.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    NgForOf,
    NgClass
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product = <Product>{};
  isAddCart: boolean = false;
  selectedImage = 0;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService) {}

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    this.route.params.subscribe(params => {
      const productId = params['productId'];  // Lấy path variable từ URL
      this.productService.getById(productId).subscribe({
        next: (data) => {
          this.product = data.result;
          console.log("product: ", this.product);
        },
        error: (error) => {
          console.error(error);
        }
      });
    });
  }

  addCart(){
    console.log("Add Cart");
    this.cartService.addCart(this.product.id).subscribe({
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
