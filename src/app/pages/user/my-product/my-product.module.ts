import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateProductComponent} from "./create-product/create-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {MyProductComponent} from "./my-product.component";

const routes: Routes = [
  {
    path: '',
    component: MyProductComponent
  },
  {
    path: 'create',
    component: CreateProductComponent
  },
  {
    path: 'update',
    component: UpdateProductComponent
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
export class MyProductModule { }
