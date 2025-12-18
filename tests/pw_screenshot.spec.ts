import { test, expect } from '@playwright/test';

// Global screenshot option can be provided from playwright.config.ts file

test('Should handle different types of screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const timestamp = Date.now();
    // Viewport screenshot
    await page.screenshot({ path: 'tests/screenshot/' + 'view_image_' + timestamp + '.png' });

    // Fullpage screenshot
    await page.screenshot({ path: 'tests/screenshot/' + 'full_image_' + timestamp + '.png', fullPage: true });

    // Element screenshot
    await page.locator('img[alt="Browsers (Chromium, Firefox, WebKit)"]').screenshot({ path: 'tests/screenshot/' + 'element_image_' + timestamp + '.png' })
    await page.waitForTimeout(2000);
})


/**
 * Using Config
 * Using Command
 * Using Programmatical
 */
// To generate trace
// npx playwright test pw_screenshot.spec.ts --headed --trace on
// npx playwright show-trace tests/trace/trace.zip [Programmatically created trace]

test.only('Should handle trace', async ({ page, context }) => {
    context.tracing.start({
        screenshots: true,
        snapshots: true,
    })
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
    await context.tracing.stop({path:'tests/trace/trace.zip'})
})