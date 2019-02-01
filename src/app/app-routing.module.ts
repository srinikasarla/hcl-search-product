import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductSearchComponent} from './product-search/product-search.component';


const routes: Routes = [
  {path: '', component: ProductSearchComponent},
  {path: 'search/:searchText', component: ProductSearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
