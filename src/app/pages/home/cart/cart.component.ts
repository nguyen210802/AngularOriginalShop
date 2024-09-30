import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {Cart, CartItem} from "../../../module/user.module";
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
  cartItemsChecked: string[] = [];
  constructor(private userService: UserService,
              private cartService: CartService) {}
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.userService.getMyCart().subscribe({
      next: (data) => {
        this.cart = data.result;
        // this.cartItems = this.cart.cartItems;
        console.log("Cart: ", this.cart);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  searchByProductName(productName: string){
    this.cartService.getCartByProductName(productName).subscribe({
      next: (data) => {
        this.cart = data.result;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  addCart(productId: string){
    this.cartService.addCart(productId).subscribe({
      next: (data) => {
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  reduceCart(productId: string){
    this.cartService.reduceCart(productId).subscribe({
      next: (data) => {
        this.loadCart();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteCart(productId: string){
    this.cartService.deleteCart(productId).subscribe({
      next: (data) => {
        this.loadCart();
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
