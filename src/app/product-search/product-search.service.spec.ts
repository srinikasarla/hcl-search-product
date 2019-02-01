import {TestBed} from '@angular/core/testing';

import {ProductSearchService} from './product-search.service';
import {HttpClient} from '@angular/common/http';
import {ProductResponse} from './product-response';
import {of} from 'rxjs';

describe('ProductSearchService', () => {
  let spyHttpClient: any;
  let subject: ProductSearchService;

  beforeEach(() => {
    spyHttpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: spyHttpClient}
      ]
    });
    subject = TestBed.get(ProductSearchService);
  });

  it('should be created', () => {
    const service: ProductSearchService = TestBed.get(ProductSearchService);
    expect(service).toBeTruthy();
  });

  it('should call api endpoint to get products', () => {
    const expectedResult = [new ProductResponse(), new ProductResponse()];
    spyHttpClient.get.and.returnValue(of(expectedResult));
    const result = subject.search('sometext');

    expect(spyHttpClient.get).toHaveBeenCalledWith('http://localhost:8080/api/products?search=sometext');

    result.subscribe(value => {
      expect(value).toEqual(expectedResult);
    });
  });
});
