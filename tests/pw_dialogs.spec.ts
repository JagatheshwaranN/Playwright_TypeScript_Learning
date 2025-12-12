import { test, expect } from '@playwright/test';

test.describe('PW Dialogs', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com');
    });

    test('Should handle simple alert dialog', async ({ page }) => {
        page.on('dialog', async dialog => {
            console.log(`Dialog type: ${dialog.type()}`);
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        })
        await page.locator('#alertBtn').click();
        await page.waitForTimeout(2000);
    })

     test('Should handle confirm alert dialog', async ({ page }) => {
        page.on('dialog', async dialog => {
            console.log(`Dialog type: ${dialog.type()}`);
            expect(dialog.type()).toBe('confirm');
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.dismiss();
        })
        await page.locator('#confirmBtn').click();
        const resultText = page.locator('#demo');
        await expect(resultText).toHaveText('You pressed Cancel!');
        await page.waitForTimeout(2000);
    })

    test('Should handle prompt alert dialog', async ({ page }) => {
        page.on('dialog', async dialog => {
            console.log(`Dialog type: ${dialog.type()}`);
            expect(dialog.type()).toBe('prompt');
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept('Playwright User');
        })
        await page.locator('#promptBtn').click();
        const resultText = page.locator('#demo');
        await expect(resultText).toHaveText('Hello Playwright User! How are you today?');
        await page.waitForTimeout(2000);
    })
})
