import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test('Search for T-shirts using POM and verify Faded Short Sleeve T-shirts', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.searchFor('T-shirts');
  await home.expectProductVisible('Faded Short Sleeve T-shirts');
});
