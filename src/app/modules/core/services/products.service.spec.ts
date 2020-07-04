import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { ProductsService } from './products.service';
import { Product } from 'src/app/models/product';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getAllProducts', () => {
    it('Should return all products', () => {
      // Arrange
      const productsUrl = `${environment.productsUrl}/products`;  // URL to web api
      let successData: Product[];
      let errorData: any;
      const expectPoducts = [
        {
          id: 'someId',
          title: 'someTitle',
          price: 5600,
          description: 'someDescription',
          image: 'someImage'
        },
        {
          id: 'someId',
          title: 'someTitle',
          price: 17900,
          description: 'someDescription',
          image: 'someImage'
        }
      ];

      // Act
      service.getAllProducts().subscribe(products => {
        successData = products;
      }, error => {
        errorData = error;
      });

      const req = httpTestingController.expectOne(productsUrl);
      req.flush(expectPoducts);

      // Assert
      expect(req.request.method).toEqual('GET');
      expect(successData.length).toEqual(2);
      expect(errorData).toBeUndefined();
    });
  });
});


