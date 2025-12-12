import { test, expect } from '@playwright/test';

test.describe('PW Frames', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://ui.vision/demo/webtest/frames/');
    });

    test('Should interact with elements inside an iframe', async ({ page }) => {
        const frameLocator = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_1.html' });
        if (frameLocator) {
            const textField = frameLocator.locator('input[name="mytext1"]');
            await textField.fill('Hello from Playwright');
            await page.waitForTimeout(2000);
        } else {
            throw new Error('Frame not found');
        }
        await page.waitForTimeout(2000);
    });

    test('Handle frame using frame locator', async ({ page }) => {
        const frameLocator = page.frameLocator('frame[src="frame_2.html"]');
        const textField = frameLocator.locator('input[name="mytext2"]');
        await textField.fill('Frame Locator Text');
        await page.waitForTimeout(2000);
    });


    test.only('Should interact with elements inside nested iframes', async ({ page }) => {
        const outerFrame = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });
        if (outerFrame) {
            const innerFrame = outerFrame.childFrames().find(frame => frame.url().includes('docs.google.com'));
            if (innerFrame) {
                const checkbox = innerFrame.locator('span', { hasText: 'Web Testing' });
                await checkbox.click();
            } else {
                throw new Error('Inner Frame not found');
            }
        } else {
            throw new Error('Outer Frame not found');
        }
        await page.waitForTimeout(2000);
    });

});