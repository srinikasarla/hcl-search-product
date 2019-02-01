import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  getSearchResultsText() {
    return element(by.css('h2')).getText();
  }

  getSearchInput() {
    return element(by.css('.search-input'));
  }

  getSubmitButton() {
    return element(by.css('button'));
  }

  getProducts() {
    return element.all(by.css('.products'));
  }

  getProductUame() {
    return element(by.css('product_name'));
  }

  getProductUesc() {
    return element(by.css('product_desc'));
  }

  getProductUating() {
    return element(by.css('product_rating'));
  }

  getProductUategories() {
    return element(by.css('product_categories'));
  }

}
