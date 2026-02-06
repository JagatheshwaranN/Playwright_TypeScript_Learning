import { chromium, expect, test } from '@playwright/test';

test('should handle HTTP Basic Authentication', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext(
       {
        httpCredentials: {
            username: 'admin',
            password: 'admin'
       }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    const header = page.locator('h3');
    await expect(header).toHaveText('Basic Auth');
    await page.waitForTimeout(2000); // Just to observe the result
});