import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {AdminUpdateComponent} from "./admin-update/admin-update.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const routes :Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'detail',
    component: UserDetailComponent
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
