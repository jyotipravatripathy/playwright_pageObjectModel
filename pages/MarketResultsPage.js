class MarketResultsPage{
  /**
   *  @param {import('@playwright/test').page} page
   */
  constructor(page){
    this.page = page;
    this.url = 'https://www.epexspot.com/en/market-results?market_area=GB&auction=&delivery_date=2026-03-21&underlying_year=&modality=Continuous&sub_modality=&technology=&data_mode=table&period=&production_period=&product=30'
  
  this.table = page.locator('table.list, table.table-primary').first();
  this.rows = this.table.locator('tbody tr');
  this.cookieAcceptButton = page.locator('#cookiefirst-root button:has-text("Accept"), button:has-text("Accept All")');
  }

  async goto(){
    await this.page.goto(this.url, {waitUntil: 'domcontentloaded'});
  }
  async acceptCookiesIfPresent(){
    try{
      await this.cookieAcceptButton.waitFor({state: 'visible', timeout: 5000}) ;
      await this.cookieAcceptButton.click();
    }
    catch(e){
      console.log("Cookie banner didn't appear..");
    }
  }
    async waitForTable(){
      await this.rows.first.waitFor({state: 'visible', timeout: 10000});
    }
    async getColumnIndexes(){
      const headers = await this.table.locator('thead th').allTextContents();
      const cleanHeaders = headers.map(h => h.trim());
    
      const map = {
      low: cleanHeaders.findIndex(h => /Low/i.test(h)),
      high: cleanHeaders.findIndex(h => /High/i.test(h)),
      last: cleanHeaders.findIndex(h => /Last/i.test(h)),
      weightedAvg: cleanHeaders.findIndex(h => /Weighted Avg/i.test(h))
    };

    if (Object.values(map).includes(-1)){
      throw new Error ('Column mismatch. Found headers: [${cleanHeaders.join(', ')}] ');
    }
  }
  /*
  * Extract Market Data
  */
  
  async getMarketData(){
    try{
      const indexMap = await this.getColumnIndexes();
      const rowCount = await this.rows.count();
      const results = [];

      for(let i = 0; i < rowCount; i++){
        const row = this.rows.nth(i);
        const cells = row.locator('td');

        if (await cells.count() === 0) continue;

        results.push({
          low: (await cells.nth(indexMap.low).innerText()).trim(),
          high: (await cells.nth(indexMap.high).innerText()).trim(),
          last: (await cells.nth(indexMap.last).innerText()).trim(),
          weightedAvg: (await cells.nth(indexMap.weightedAvg).innerText()).trim(),
         });
      }
        return results;
    }catch(err)
    {
      console.error('Error extracting market data: ', err)
      throw err;
    }
  }
}
module.exports = {MarketResultsPage};