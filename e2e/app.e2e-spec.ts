import { CityweatherPage } from './app.po';

describe('cityweather App', () => {
  let page: CityweatherPage;

  beforeEach(() => {
    page = new CityweatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
