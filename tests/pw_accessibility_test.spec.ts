import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// npm install  @axe-core/playwright

test.describe('Accessibility tests', () => {
  test('should print accessibility scan results on the main page', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    console.log(accessibilityScanResults);
  });

  test('should have no accessibility violations on the main page', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations.length).toEqual(2);
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should check for specific accessibility tags on the main page', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    console.log(accessibilityScanResults);
    expect(accessibilityScanResults.violations.length).toEqual(0);
  });

  test('should attach accessibility scan results to the test report', async ({page}, testInfo) => {
    await page.goto('https://playwright.dev/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json',
    });
  });

  test('should disable specific accessibility rules on the main page', async ({page}) => {
    await page.goto('https://playwright.dev/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast', 'region'])
    //   .disableRules(['duplicate-id'])
      .analyze();
    console.log(accessibilityScanResults);
    expect(accessibilityScanResults.violations.length).toEqual(2);
  });

  test.only('should have no accessibility violations on the example todo app', async ({page}) => {
    await page.goto('https://www.w3.org/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations.length).toEqual(0);
  });

});