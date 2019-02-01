import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProductResponse} from './product-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private httpClient: HttpClient) {
  }

  search(search: string): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`${environment.backendUrl}/api/products?search=${search}`);
  }
}
