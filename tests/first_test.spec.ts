import {test, expect} from "@playwright/test"

test("Verify Page Title", async ({page})=> {
    await page.goto("https://playwright.dev/");
    let pageTitle = await page.title();
    console.log("Page Title: ", pageTitle);
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");
})

test("Verify Page URL", async ({page})=> {
    await page.goto("https://playwright.dev/");
    let pageURL = page.url();
    console.log("Page URL: ", pageURL);
    await expect(page).toHaveURL(/playwright/);
})