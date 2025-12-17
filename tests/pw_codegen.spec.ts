import { test, expect, devices } from '@playwright/test';

// npx playwright codegen -o tests/pw_codegen.spec.ts
test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.locator('#flash')).toContainText('You logged out of the secure area! ×');
});


// npx playwright codegen -o tests/pw_codegen.spec.ts --device "iPhone 15"
test.use({
  ...devices['iPhone 15'],
});

test('test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: ' Login' })).toBeVisible();
});

// npx playwright codegen -o tests/pw_codegen.spec.ts --browser firefox
// npx playwright codegen -o tests/pw_codegen.spec.ts --viewport-size "1280,720"

// To debug the automation script
// npx playwright test pw_codegen.spec.ts --headed --debug