import { test, expect } from '@playwright/test';

const searchItems: string[] = ['Laptop', 'Gift Card', 'Smartphone', 'Monitor'];

// for(const item of searchItems) {
//     test(`Search Item Test - ${item}`, async({page})=> {
//         await page.goto('https://demowebshop.tricentis.com/');
//         await page.locator('#small-searchterms').fill(item);
//         await page.locator('.button-1.search-box-button').click();
//         const productTitle =  page.locator('.product-title').nth(0);
//         await expect(productTitle).toContainText(item);
//         await page.waitForTimeout(2000);
//     });
// }

// searchItems.forEach((item) => {
//     test(`Search Item Test - ${item}`, async ({ page }) => {
//         await page.goto('https://demowebshop.tricentis.com/');
//         await page.locator('#small-searchterms').fill(item);
//         await page.locator('.button-1.search-box-button').click();
//         const productTitle = page.locator('.product-title').nth(0);
//         await expect(productTitle).toContainText(item);
//         await page.waitForTimeout(2000);
//     });
// })

// test.describe("Search Items - Parameterization", async () => {
//     searchItems.forEach((item) => {
//         test(`Search Item Test - ${item}`, async ({ page }) => {
//             await page.goto('https://demowebshop.tricentis.com/');
//             await page.locator('#small-searchterms').fill(item);
//             await page.locator('.button-1.search-box-button').click();
//             const productTitle = page.locator('.product-title').nth(0);
//             await expect(productTitle).toContainText(item);
//             await page.waitForTimeout(2000);
//         });
//     })
// })

const loginData: string[][] = [
    ['tomsmith', 'SuperSecretPassword!', 'valid'],
    ['tomsmit', 'SuperSecretPassword!', 'invalid'],
    ['tomsmith', 'SuperSecretPassword', 'invalid'],
    ['', '', 'invalid']
]

for (const [email, password, validCheck] of loginData) {

    test.describe('Login Test using Datadriven', async () => {

        test(`Login Test for ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://the-internet.herokuapp.com/login');
            await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
            await page.getByRole('textbox', { name: 'Username' }).click();
            await page.getByRole('textbox', { name: 'Username' }).fill(email);
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(password);
            await page.getByRole('button', { name: ' Login' }).click();
            if (validCheck === 'valid') {
                await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
                await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
            } else {
                await expect(page.locator('.flash.error')).toBeVisible();
            }
            await page.waitForTimeout(2000);
        })
    })
}