import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="search_query"]');
    this.searchButton = page.locator('button[name="submit_search"]');
  }

  async goto() {
    await this.page.goto('http://www.automationpractice.pl/index.php');
    await this.page.waitForLoadState('networkidle');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.searchButton.click(),
    ]);
  }

  productLocatorByName(name: string) {
    // Use first() to avoid strict-mode errors when multiple elements match the text
    return this.page.locator('a.product-name', { hasText: name }).first();
  }

  async expectProductVisible(name: string) {
    await expect(this.productLocatorByName(name)).toBeVisible();
  }
}
