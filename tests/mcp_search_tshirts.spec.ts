import { test, expect } from '@playwright/test';

test('Search for T-shirts and verify Faded Short Sleeve T-shirts is listed', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('http://www.automationpractice.pl/index.php');
  await page.waitForLoadState('networkidle');

  // 2. Search for 'T-shirts'
  // The search input has name="search_query" on this site and the search button has name="submit_search"
  await page.fill('input[name="search_query"]', 'T-shirts');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('button[name="submit_search"]'),
  ]);

  // 3. Verify the "Faded Short Sleeve T-shirts" is present in results
  const productLocator = page.locator('h5').filter({ hasText: 'Faded Short Sleeve T-shirts' }).first();
  await expect(productLocator).toBeVisible();
});
