import { chromium, expect, test } from '@playwright/test';

test('should skip login with context', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        // Set the storage state to skip login
        storageState: 'tests/data/auth.json'
    });
    const page = await context.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.waitForTimeout(2000); // Just to observe the result

    // const storeContext = page.context();
    // storeContext.storageState({ path: 'tests/data/auth.json' });
});