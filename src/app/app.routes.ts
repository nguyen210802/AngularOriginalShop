import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {RoleGuard} from "./service/configugation/RoleGuard";
import {Authenticated} from "./service/module/user.module";
import {authGuard} from "./service/configugation/AuthGuard";

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
    loadChildren: () => import("./pages/user/user.module").then(m => m.UserModule),
    canActivate: [RoleGuard, authGuard],
    data: {role: Authenticated.USER.toString()}
  },
  {
    path: 'admin',
    loadChildren: () => import("./pages/admin/admin.module").then(m => m.AdminModule),
    canActivate: [RoleGuard, authGuard],
    data: {role: Authenticated.ADMIN.toString()}
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
