import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to hackathon!');
  });

  it('search electronics', () => {
    const searchInput = page.getSearchInput();
    searchInput.sendKeys('electronics');
    page.getSubmitButton().click();
    expect(page.getSearchResultsText()).toEqual('Search Results');
    expect(page.getProducts().count()).toEqual(4);
  });

});
