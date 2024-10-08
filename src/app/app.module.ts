import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppModule { }

export interface ApiResponse <T>{
  code: number;
  message: string;
  result: T;
}

export interface PageResponse<T> {
  currentPage : number;
  totalPages : number;
  pageSize : number;
  totalElements : number;
  data : T;
}
