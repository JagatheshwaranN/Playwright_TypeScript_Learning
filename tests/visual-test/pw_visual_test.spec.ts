import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {

    test('should match the baseline screenshot - approach 1', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        expect(await page.screenshot()).toMatchSnapshot('playwright-dev.png');
    });

    test('should match the baseline screenshot - approach 2', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await expect(page).toHaveScreenshot();
    });

    test('should display the correct UI elements - approach 1', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        const playwright = page.locator('.highlight_gXVj');
        expect(await playwright.screenshot()).toMatchSnapshot('playwright.png');
    });

    test('should display the correct UI elements - approach 2', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await expect(page.locator('img[alt="Playwright logo"]')).toHaveScreenshot('playwright-dev-logo.png');
    });

});