import { expect, Page, test } from '@playwright/test';

let page: Page;

test.beforeAll('Launch Application', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://the-internet.herokuapp.com/login');
})

test.afterAll('Close Application', async () => {
    await page.close();
})

test.beforeEach('Login to Application', async () => {
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
})

test.afterEach('Logout from Application', async () => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area! ×');
})

test.describe('Group1', async () => {

    test('Verify logged into Application', async ({ }) => {
        await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
        await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
    })
})

