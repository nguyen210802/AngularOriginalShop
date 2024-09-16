import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgIf} from "@angular/common";
import {Product, ProductRequest, UserRequest} from "../../../../service/module/user.module";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    FormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  request: ProductRequest = <ProductRequest>{};
  images: ImagePreview[] = [];

  constructor(private productService: ProductService, private router: Router) {
  }

  onFilesSelected(event: Event): void {
    const fileList = (event.target as HTMLInputElement).files;
    if (fileList) {
      this.images = []; // Clear previous selections
      Array.from(fileList).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.images.push({
            src: e.target?.result as string,
            file: file
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  createProduct(){
    this.request.images = this.images.map(image => image.src as string);
    // this.images.map(image => this.request.images.push(image.src as string));
    console.log("image: ", this.request.images)
    this.productService.createProduct(this.request).subscribe({
      next: () => {
        this.request = <ProductRequest>{};
        this.images = [];
        // this.router.navigate(["/user/myProducts"]);
      },
      error: (error) => {
        console.error(error);
      }
    });
    // console.log("Image: ",this.images);
    // console.log("Product: ",this.request);
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }
}

interface ImagePreview {
  src: string | ArrayBuffer | null;
  file: File;
}
