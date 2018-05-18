import { DemoDeployPage } from './app.po';

describe('demo-deploy App', () => {
  let page: DemoDeployPage;

  beforeEach(() => {
    page = new DemoDeployPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
