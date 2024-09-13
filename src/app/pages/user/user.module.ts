import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {MyProductComponent} from "./my-product/my-product.component";

const routes : Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'products',
    component: MyProductComponent
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
