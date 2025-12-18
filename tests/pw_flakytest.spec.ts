import { test, expect } from '@playwright/test';

// To retry for specific test
// npx playwright test pw_flakytest.spec.ts --retries=3
test.only('Should handle flaky test', async ({ page }) => {
  
    await page.goto('https://the-internet.herokuapp.com/login');
    await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    await page.getByRole('button', { name: ' Login' }).click();
    await page.waitForTimeout(8000);
    await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
})