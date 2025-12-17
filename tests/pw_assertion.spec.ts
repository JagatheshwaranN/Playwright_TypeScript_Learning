import {test, expect} from '@playwright/test';

test('Should handle hard assertions', async({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveTitle('Demo Web Shop2');
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
    await expect(logo).toBeVisible();
})

test('Should handle soft assertions', async({page}) => {

    await page.goto('https://demowebshop.tricentis.com/');
    await expect.soft(page).toHaveTitle('Demo Web Shop2');
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');
    const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
    await expect.soft(logo).toBeVisible();
})