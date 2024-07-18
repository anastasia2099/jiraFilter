import('chromedriver');
const {Builder, By, until} = require ("selenium-webdriver");

describe("add toDo test", function(){
    it ("succsessfuly adds a toDo application", async function(){
        let driver = await new Builder().forBrowser("chrome").build();

        try {
            await driver.get('https://jira.ringcentral.com/');
            // set breakpoint for pass 2Auth
            await driver.findElement(By.xpath("//*[@id='find_link']")).click();
            await driver.wait(until.elementLocated(By.id('issues_manage_filters_link_lnk')), 5000);
            await driver.findElement(By.id('issues_manage_filters_link_lnk')).click();
            await sleep(3000);
            await driver.findElement(By.id('my-filters-tab')).click();
            let noFavoriteFilters = await driver.findElements(By.className('fav-link aui-icon aui-icon-small disabled aui-iconfont-unstar'));
            for (let i = 0; i < noFavoriteFilters.length; i++) {
                await sleep(5000);
                let getID = (await driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div/main/table[1]/tbody/tr[*]/td[1]//*[@class='favourite-status']/div[1]//a[contains(@class,'disabled')]")).getAttribute('id')).split('fav_a_mf_owned_SearchRequest_')[1];
                await driver.wait(until.elementLocated(By.xpath(`//*[@aria-controls='${getID}_operations']`)), 30000);
                await driver.findElement(By.xpath(`//*[@aria-controls='${getID}_operations']`)).click();
                await driver.wait(until.elementLocated(By.id(`delete_${getID}`)), 30000);
                await driver.findElement(By.id(`delete_${getID}`)).click();
                await driver.wait(until.elementLocated(By.id('delete-filter-submit')), 30000);
                await driver.findElement(By.id('delete-filter-submit')).click();
            }
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        } finally {
            await driver.quit();
        }
    })
})