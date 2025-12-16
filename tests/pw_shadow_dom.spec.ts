import {test, expect} from '@playwright/test';


test('Should handle Shadow DOM', async({page})=> {

    await page.goto('https://books-pwakit.appspot.com/');
    const bookSearch = page.locator('#input');
    await bookSearch.fill('Playwright automation');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    const foundBooks = await page.locator('h2.title').all();
    expect(foundBooks.length).toBe(7);
    await page.waitForTimeout(2000);
})