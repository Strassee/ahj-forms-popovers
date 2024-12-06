import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(50000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: true, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('test for show popover', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.app');
    const popovers = await page.$('.popovers');
    const button = await popovers.$('.btn');
    await button.click();
    await page.waitForSelector('.tooltip');
  });

  test('test for unshow popover', async () => {
    const popovers = await page.$('.popovers');
    const button = await popovers.$('.btn');
    await button.click();
    await page.waitForSelector('.tooltip', { hidden: true });
  });
});
