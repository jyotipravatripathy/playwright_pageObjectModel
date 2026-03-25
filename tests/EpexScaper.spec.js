const { test, expect } = require('@playwright/test');
const { MarketResultsPage } = require('../pages/MarketResultsPage');
const { writeToCSV } = require('../Utils/CSV');


test.describe('EPEX spot Market Scraper (POM)', () => {

 test('Scrapes Markert data and write to CSV', async ({page}) => {
  const marketPage = new MarketResultsPage(page);
  try{
    await marketPage.goto();
    await marketPage.acceptCookiesIfPresent();
    await marketPage.waitForTable();

    const data = await marketPage.getMarketData();
    expect(data.length).toBeGreaterThan(0);
    writeToCSV(data, 'market-data.csv');
  }catch (err){
    console.error('test failed: ', err);
  }
 });
});
