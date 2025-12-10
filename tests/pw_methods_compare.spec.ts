import { test, expect } from '@playwright/test';

test.describe('PW Methods Compare', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://automationbookstore.dev/');
    })

    test('Compare innertext vs textContent', async ({ page }) => {
        // textContent()
        // Returns exactly the text as it appears in the DOM, including:
        // Hidden text
        // Extra whitespace
        // Text inside <script> or <style> (if applicable)

        // innerText()
        // Returns the text as rendered by the browser, similar to what a user would see:
        // NO hidden text
        // Whitespace normalized like CSS would show it
        // Respects line breaks, layout, visibility, etc.

        const booksTitle = page.locator('//h2[contains(@id, title)]');
        const booksCount = await booksTitle.count();
        console.log("Total Books Found:", booksCount);
        for (let i = 0; i < booksCount; i++) {
            const innerTextValue = await booksTitle.nth(i).innerText();
            console.log(`Book ${i + 1} Inner Text:`, innerTextValue);
            const textContentValue = await booksTitle.nth(i).textContent();
            console.log(`Book ${i + 1} Text Content:`, textContentValue);
        }
    })

    test('Compare allInnerTexts vs AllTextContents', async ({ page }) => {
        // locator.allTextContents()
        // No layout calculation → faster, consistent
        // Returns text exactly as written in DOM
        // Includes text from hidden or collapsed elements

        // locator.allInnerTexts()
        // Triggers layout → reflects what user sees
        // Ignores invisible elements
        // Normalizes whitespace (multiple spaces → one, trims edges)

        const booksTitle = page.locator('//h2[contains(@id, title)]');
        const booksCount = await booksTitle.count();
        console.log("Total Books Found:", booksCount);
        const allInnerTexts: String[] = await booksTitle.allInnerTexts();
        console.log("All Inner Texts:", allInnerTexts);
        const allTextContents: string[] = await booksTitle.allTextContents();
        console.log("All Text Contents:", allTextContents);
    })

    test.only('Locators of all elements', async ({ page }) => {
        // locator.all() → returns an array of Locators, one for each element matched by the selector.
        // Unlike locator.nth(i), which gives dynamic locators that re-resolve every time,
        // all() gives a snapshot of locators based on the current DOM state at the moment you call it.

        const booksTitle = page.locator('//h2[contains(@id, title)]');
        const booksCount = await booksTitle.count();
        console.log("Total Books Found:", booksCount);
        const booksTitleLocators = await booksTitle.all();
        console.log("Books Title Locators:", booksTitleLocators);

        for (const locator of booksTitleLocators) {
            console.log(await locator.innerText());
        }

        for (let locator in booksTitleLocators) {
            console.log(await booksTitleLocators[locator].innerText());
        }

    })

});