import {test, expect} from '@playwright/test';

test('Should handle timeout', async ({page}) => {

    test.setTimeout(40000);
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/', {timeout: 10000});
    expect(page).toHaveTitle('Demo Web Shop');
    await page.locator('.ico-login').click({force:true});
})