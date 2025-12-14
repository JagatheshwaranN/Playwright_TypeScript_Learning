import { test, expect } from '@playwright/test';

test('PW Keyboard actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');

    const input1 = page.locator('#input1');

    await input1.focus();
    await page.keyboard.insertText('welcome');
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.waitForTimeout(2000);

})

test.only('PW Keyboard actions using press', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');

    const input1 = page.locator('#input1');

    await input1.focus();
    await page.keyboard.insertText('welcome');
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Control+V');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Control+V');

    await page.waitForTimeout(2000);

})