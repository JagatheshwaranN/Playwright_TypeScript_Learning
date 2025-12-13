import { test, expect, chromium, webkit, firefox } from '@playwright/test';

test.describe('Browser Context Tests', () => {

    test('Should create a new browser context and navigate to a page', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://example.com');
        const title = await page.title();
        expect(title).toBe('Example Domain');
        await page.waitForTimeout(2000);
        await context.close();
    });


    test('Should handle multiple pages in a single browser context', async ({ browser }) => {
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        await page1.goto('https://example.com');
        await page2.goto('https://example.org');
        const title1 = await page1.title();
        const title2 = await page2.title();
        expect(title1).toBe('Example Domain');
        expect(title2).toBe('Example Domain');
        await page1.waitForTimeout(2000);
        await page2.waitForTimeout(2000);
        await context.close();
    });

    test('Should create a browser context using chromium and navigate to pages', async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page1 = await context.newPage();
        const page2 = await context.newPage();
        await page1.goto('https://example.com');
        await page2.goto('https://example.org');
        const title1 = await page1.title();
        const title2 = await page2.title();
        expect(title1).toBe('Example Domain');
        expect(title2).toBe('Example Domain');
        await page1.waitForTimeout(2000);
        await page2.waitForTimeout(2000);
        await context.close();
    });

    test('Should handle multiple tabs in a single browser context', async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://testautomationpractice.blogspot.com/');

        // Open multiple tabs
        const [newPage] = await Promise.all([context.waitForEvent('page'),
        page.locator('button', { hasText: 'New Tab' }).click()]);

        await newPage.waitForLoadState();
        const pages = context.pages();
        expect(pages.length).toBe(2);

        console.log('Parent Page Title:', await page.title());
        console.log('New Tab Title:', await newPage.title());

        for (const p of pages) {
            console.log('Page Title:', await p.title());
            await p.waitForTimeout(2000);
        }
    });

    test('Should handle multiple popup windows in a single browser context', async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://testautomationpractice.blogspot.com/');

        // Open multiple popup windows
        const [newPage] = await Promise.all([context.waitForEvent('page'),
        page.locator('#PopUp').click()]);

        await newPage.waitForLoadState();
        const popupWindows = context.pages();
        expect(popupWindows.length).toBe(3);

        console.log('Parent Page Title:', await popupWindows[0].title());
        console.log('New Popup Window 1 Title:', await popupWindows[1].title());
        console.log('New Popup Window 2 Title:', await popupWindows[2].title());

        for (const p of popupWindows) {
            console.log('Page Title:', await p.title());
            await p.waitForTimeout(2000);
        }
    });

    test.only(' Should handle authentication in a browser context', async ({ browser }) => {
        const context = await browser.newContext({
            httpCredentials:
                { username: 'admin', password: 'admin' }
        });
        const page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/basic_auth');
        const content = await page.textContent('div.example p');
        expect(content).toContain('Congratulations! You must have the proper credentials.');
        await page.waitForTimeout(2000);
        await context.close();
    });


});