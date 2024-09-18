import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {CartComponent} from "./cart/cart.component";

const routes : Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'myProducts',
    // component: MyProductComponent
    loadChildren: () => import('./my-product/my-product.module').then(m => m.MyProductModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
