import { chromium, expect, test } from '@playwright/test';

test.describe('Relative Locators in Playwright', () => {

    test('should locate element below another element', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://github.com/login');
        await page.fill("input:below(label:has-text('Username or email address'))", "test@example.com");
        await page.waitForTimeout(3000); // Just for demonstration purposes
    });

    test('should locate element above another element', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://github.com/login');
        await page.fill("input:above(label:has-text('Password'))", "test@example.com");
        await page.waitForTimeout(3000); // Just for demonstration purposes
    });

    test('should locate element to the left of another element', async () => { 
       const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://automationbookstore.dev/');
        const element = await page.$("li:left-of(:text('Advanced Selenium in Java'))");
        const text = await element?.innerText();
        expect(text).toContain('Java For Testers');
        console.log(text);
        await page.waitForTimeout(3000); // Just for demonstration purposes
    }); 

    test('should locate element to the right of another element', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://automationbookstore.dev/');
        const element = await page.$("li:right-of(:text('Java For Testers'))");
        const text = await element?.innerText();
        expect(text).toContain('Advanced Selenium in Java');
        console.log(text);
        await page.waitForTimeout(3000); // Just for demonstration purposes
    });

    test('should locate element near another element', async () => {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://github.com/login');
        await page.click("a:near(:text('password'))");
        expect(page.url()).toBe("https://github.com/password_reset");
        await page.waitForTimeout(3000); // Just for demonstration purposes
    });

});