import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductsService } from '@core/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss']
})
// tslint:disable-next-line: component-class-suffix
export class ProductsContainer implements OnInit {

  products: Product[] = [];

  showProductId(productId: string) {
    console.log(productId);
  }

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getAllProducts().subscribe(products => this.products = products);
  }

}
