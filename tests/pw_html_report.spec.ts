import { test, expect } from '@playwright/test';

// npx playwright test pw_html_report.spec.ts --reporter=html

test.describe('HTML Report Test Suite', async () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demowebshop.tricentis.com/');
    })

    test('Logo Visibility Test', async ({ page }) => {
        const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
        await expect(logo).toBeVisible();
    });

    test('Title Verification Test', async ({ page }) => {
        await expect(page).toHaveTitle(/Demo Web Shop/);
    });

    test('Search Functionality Test', async ({ page }) => {
        await page.locator('#small-searchterms').fill('Laptop');
        await page.locator('.button-1.search-box-button').click();
        const productTitle = page.locator('.product-title').nth(0);
        await expect(productTitle).toContainText('Laptop');
    });
})