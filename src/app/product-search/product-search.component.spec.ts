import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductSearchComponent} from './product-search.component';
import {ProductSearchService} from './product-search.service';
import {of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {ProductResponse} from './product-response';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let spyProductSearchService: any;
  let spyActivatedRoute: any;
  let expectedResult = [];

  beforeEach(async(() => {

    spyProductSearchService = jasmine.createSpyObj('ProductSearchService', ['search']);
    spyActivatedRoute = {
      paramMap: of({get: (searchText) => 'searchText'})
    };
    spyProductSearchService.search.and.returnValue(of(expectedResult));
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule, AppRoutingModule],
      declarations: [ProductSearchComponent],
      providers: [
        {provide: ActivatedRoute, useValue: spyActivatedRoute},
        {provide: ProductSearchService, useValue: spyProductSearchService}
      ]
    })
      .compileComponents();
    const productResponse1 = new ProductResponse();
    productResponse1.name = 'phone';
    productResponse1.description = 'description';
    productResponse1.averageRating = 3;
    productResponse1.totalRatings = 5;
    productResponse1.imageBytes = 'somebytes';
    productResponse1.categories = ['electronics', 'tv'];
    const productResponse2 = new ProductResponse();
    productResponse2.name = 'tv';
    productResponse2.description = 'description2';
    productResponse2.averageRating = 4;
    productResponse2.totalRatings = 7;
    productResponse2.imageBytes = 'somebytes2';
    productResponse2.categories = ['electronics', 'tv', 'somethingelse'];
    expectedResult = [productResponse1, productResponse2];
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service onInit', () => {
    component.ngOnInit();
    expect(spyProductSearchService.search).toHaveBeenCalledWith('searchText');
    expect(component.searchResults).toEqual(expectedResult);
  });


  it('should update results on search', () => {
    component.searchText = 'abx' + Math.random();
    component.ngOnInit();
    expect(spyProductSearchService.search).toHaveBeenCalledWith(component.searchText);
    expect(component.searchResults).toEqual(expectedResult);
  });

  it('should render products', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toEqual('Search');
    compiled.querySelector('input').value = 'tv';
    fixture.detectChanges();
    expect(compiled.querySelectorAll('.product_image')[0].attributes.getNamedItem('src').value).toEqual('data:image/png;base64,somebytes');
    expect(compiled.querySelectorAll('.product_image')[0].attributes.getNamedItem('alt').value).toEqual('phone');
    expect(compiled.querySelectorAll('.product_name')[0].textContent).toEqual('Product Name: phone');
    expect(compiled.querySelectorAll('.product_desc')[0].textContent).toEqual('Product Description: description');
    expect(compiled.querySelectorAll('.product_rating')[0].textContent).toEqual('Rating: 3/5');
    expect(compiled.querySelectorAll('.product_categories')[0].textContent).toEqual('Categories: electronics  tv  ');

    expect(compiled.querySelectorAll('.product_image')[1].attributes.getNamedItem('src').value).toEqual('data:image/png;base64,somebytes2');
    expect(compiled.querySelectorAll('.product_image')[1].attributes.getNamedItem('alt').value).toEqual('tv');
    expect(compiled.querySelectorAll('.product_name')[1].textContent).toEqual('Product Name: tv');
    expect(compiled.querySelectorAll('.product_desc')[1].textContent).toEqual('Product Description: description2');
    expect(compiled.querySelectorAll('.product_rating')[1].textContent).toEqual('Rating: 4/7');
    expect(compiled.querySelectorAll('.product_categories')[1].textContent).toEqual('Categories: electronics  tv  somethingelse  ');
  });

});
