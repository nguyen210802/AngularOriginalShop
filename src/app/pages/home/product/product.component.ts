import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {ProductService} from "../../../service/product/product.service";
import {Product} from "../../../service/module/user.module";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product = <Product>{};
  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
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
    this.productService.addCart(this.product.id).subscribe({
      next: (data) => {
        console.log("Add to cart success");
      },
      error: (error) => {
        console.error("Error add to cart: ", error);
      }
    })
  }
}
