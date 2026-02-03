import {chromium, expect, test} from "@playwright/test";

test('Launch Local Browser', async () => {
    const browser = await chromium.launch({
        headless: false,
        channel: 'chrome', // Use 'chrome' for Google Chrome, 'msedge' for Microsoft Edge
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // Specify the path to the browser executable
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
    await page.waitForTimeout(2000);
    await context.close();
});