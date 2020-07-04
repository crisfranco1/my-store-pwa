import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { ProductsService } from '../../../core/services/products.service';
import { Product } from 'src/app/models/product';
import { throwError } from 'rxjs';
import { Content } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productsService.getProductById(productId).subscribe(
      product => { this.product = product; },
      error => {
        console.error(error);
      }
    );
  }

  getFile() {
    this.productsService.getFile().subscribe(content => {
      console.log(content);
    });
  }

}
