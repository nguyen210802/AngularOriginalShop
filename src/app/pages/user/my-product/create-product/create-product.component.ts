import { Component } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ProductRequest} from "../../../../module/user.module";
import {FormsModule} from "@angular/forms";
import {ProductService} from "../../../../service/product/product.service";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    FormsModule,
    NgForOf
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
      // this.images = []; // Clear previous selections
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
    this.productService.createProduct(this.request).subscribe({
      next: () => {
        this.router.navigate(["/user/myProducts"]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  cancelClick(){
    this.router.navigate(["/user/myProducts"]);
  }
}

interface ImagePreview {
  src: string | ArrayBuffer | null;
  file: File;
}
