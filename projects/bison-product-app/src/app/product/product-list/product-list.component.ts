import {Component, inject} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {

  private router = inject(Router);
  protected products: Product[];

  constructor(productService: ProductService) {
    this.products = productService.getProducts();
  }

  protected onOpenProduct(id: string): void {
    this.router.navigate(['products', id]);
  }
}
