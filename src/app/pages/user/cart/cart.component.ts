import { Component } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {Cart} from "../../../service/module/user.module";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: Cart = <Cart>{};
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.userService.getMyCart().subscribe({
      next: (data) => {
        this.cart = data.result;
        console.log("Cart: ", this.cart);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
