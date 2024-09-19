import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Cart, CartItem} from "../../../service/module/user.module";
import {UserService} from "../../../service/user/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ProductImageService} from "../../../service/product-image/product-image.service";
import {ProductService} from "../../../service/product/product.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = <Cart>{};
  cartItems: CartItem[] = [];
  constructor(private userService: UserService,
              private productImageService: ProductImageService,
              private productService: ProductService) {}
  ngOnInit(): void {
    this.loadCart(() => {
      this.loadMainImage();
    });
  }

  loadCart(callback: () => void){
    this.userService.getMyCart().subscribe({
      next: (data) => {
        this.cart = data.result;
        this.cartItems = this.cart.cartItems;
        console.log("Cart: ", this.cart);
        console.log("CartItems: ", this.cartItems);
        callback();
      },
      error: (error) => {
        console.error(error);
        callback();
      }
    });
  }
  loadMainImage(){
    for(let cartItem of this.cartItems){
      cartItem.product.mainImage = cartItem.product.images[0];
      for(let image of cartItem.product.images){
        if(image.mainImage){
          cartItem.product.mainImage = image;
          break;
        }
      }
    }
  }

  deleteCart(productId: string){
    this.productService.deleteCart(productId).subscribe({
      next: (data) => {
        this.cart = data.result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
