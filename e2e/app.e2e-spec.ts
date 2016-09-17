import { MemeMarketPage } from './app.po';

describe('meme-market App', function() {
  let page: MemeMarketPage;

  beforeEach(() => {
    page = new MemeMarketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
