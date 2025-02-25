import { Component } from '@angular/core';
import { ProductCategory } from '../../common/product-category';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-category-menu',
  imports: [
    CommonModule,
    RouterModule // ✅ This enables [routerLink]
  ],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})


export class ProductCategoryMenuComponent {

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProductCategories();
  }
  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      (data: ProductCategory[]) => {
        // console.log('Product categories retrieved successfully! 2', JSON.stringify(data));
        this.productCategories = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
