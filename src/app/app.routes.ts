import { Routes } from '@angular/router';
// import * as path from "node:path";
import {AdminComponent} from "./pages/admin/admin.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
