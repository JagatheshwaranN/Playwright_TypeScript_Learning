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

    // test('should locate element to the left of another element', async ({page}) => { 
    //     const referenceElement = page.locator('text=Reference Element');
    //     const targetElement = page.locator('text=Target Element').toLeftOf(referenceElement);  
    //     await expect(targetElement).toBeVisible();
    // }); 

    // test('should locate element to the right of another element', async ({page}) => {
    //     const referenceElement = page.locator('text=Reference Element');
    //     const targetElement = page.locator('text=Target Element').toRightOf(referenceElement);  
    //     await expect(targetElement).toBeVisible();
    // });

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