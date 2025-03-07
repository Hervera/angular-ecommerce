import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(private productService: ProductService, 
    private cartService: CartService, 
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }
  handleProductDetails() {

    // get the "id" param string. convert string to a number using the "+" symbol
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart() {
    // Add the product to the shopping cart
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }
}
