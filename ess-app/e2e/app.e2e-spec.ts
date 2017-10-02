import { EssAppPage } from './app.po';

describe('ess-app App', () => {
  let page: EssAppPage;

  beforeEach(() => {
    page = new EssAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
