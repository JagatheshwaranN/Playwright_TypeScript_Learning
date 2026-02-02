import { test, expect, chromium } from '@playwright/test';

test.describe('Window Handle Tests', () => {

    test('Handle single page window', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/window');

        // Open a new window
        const [newWindow] = await Promise.all([
            context.waitForEvent('page'),
            await page.click('#home')
        ]);

        await newWindow.waitForLoadState();
        expect(newWindow.url()).toContain("test");
        await newWindow.click('"Click"');
        await newWindow.waitForURL('**/button');
        expect(newWindow.url()).toContain("button");
        await page.bringToFront();
        await page.click('"Work-Space"');
        expect(page.url()).toContain("test");
        await newWindow.close();
        await context.close();
    });

    test('Handle multiple page windows', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/window');
        // Open multiple new windows
        const [multiWindow] = await Promise.all([
            context.waitForEvent('page'),
            page.click('#multi')
        ]);
        await multiWindow.waitForLoadState();
        const allWindows = multiWindow.context().pages();
        console.log(`Total pages: ${allWindows.length}`);

        for (const window of allWindows) {
            console.log(`Page URL: ${window.url()}`);
        }

        await allWindows[1].bringToFront();
        allWindows[1].on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
        await allWindows[1].click('id=accept');
        await allWindows[1].waitForTimeout(2000);
        await context.close();
    });

});
