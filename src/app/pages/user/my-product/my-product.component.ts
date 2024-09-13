import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-my-product',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './my-product.component.html',
  styleUrl: './my-product.component.css'
})
export class MyProductComponent {

}
