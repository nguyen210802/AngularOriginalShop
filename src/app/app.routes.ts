import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    loadChildren: () => import("./pages/user/user.module").then(m => m.UserModule)
  },
  {
    path: 'admin',
    loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
