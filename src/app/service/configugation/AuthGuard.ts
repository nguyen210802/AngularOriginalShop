import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth/auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem("token");
  if(token == null){
    router.navigate(['/login']);
    return false;
  }
  else {
    // @ts-ignore
    if (authService.introspect(localStorage.getItem("token"))) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
};
