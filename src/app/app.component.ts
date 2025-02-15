import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Make sure this is a standalone component
  imports: [ProductListComponent],
  providers: [ProductService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
