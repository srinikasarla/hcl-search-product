import {Component, Input, OnInit} from '@angular/core';
import {ProductSearchService} from './product-search.service';
import {ProductResponse} from './product-response';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.sass']
})
export class ProductSearchComponent implements OnInit {

  @Input()
  searchText: string;
  searchResults: ProductResponse[];

  constructor(private route: ActivatedRoute,
              private productSearchService: ProductSearchService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.searchText = params.get('searchText');
        this.search();
      });
  }

  search() {
    this.productSearchService.search(this.searchText).subscribe(res => {
      this.searchResults = res;
    });
  }
}
