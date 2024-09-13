import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminUpdateComponent} from "./admin-update/admin-update.component";

const routes :Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'update',
    component: AdminUpdateComponent
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
export class AdminModule { }
