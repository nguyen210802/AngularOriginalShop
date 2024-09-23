import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Cart, CartItem} from "../../../service/module/user.module";
import {UserService} from "../../../service/user/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {CartService} from "../../../service/cart/cart.service";

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
  cartItemsChecked: string[] = [];
  constructor(private userService: UserService,
              private cartService: CartService) {}
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
    }
  }

  deleteCart(productId: string){
    this.cartService.deleteCart(productId).subscribe({
      next: (data) => {
        this.loadCart(() => {
          this.loadMainImage();
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  onSelectItem(itemId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    console.log(`Item ${itemId} is ${isChecked ? 'checked' : 'unchecked'}`);
    if(isChecked){
      this.cartItemsChecked.push(itemId);
      console.log("cartItemsChecked: ", this.cartItemsChecked);
    }
    else {
      this.cartItemsChecked = this.cartItemsChecked.filter(item => item !== itemId);
      console.log("cartItemsChecked: ", this.cartItemsChecked);
    }
    // Thêm logic xử lý tại đây, ví dụ như cập nhật trạng thái của item trong giỏ hàng
  }

}
