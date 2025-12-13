import { test, expect } from '@playwright/test';


test('Should perform mouse hover action', async ({ page }) => {

    await page.goto('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    const hoverElement = page.locator('#hover');
    await hoverElement.hover();
    const hoverResult = page.locator('#move-status');
    await expect(hoverResult).toBeVisible();
    await expect(hoverResult).toHaveText('hovered');
    await page.waitForTimeout(2000);
});

test('Should perform mouse right-click action', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');
    const rightClickButton = page.locator('#rightClickBtn');
    await rightClickButton.click({ button: 'right' });
    const rightClickMessage = page.locator('#rightClickMessage');
    await expect(rightClickMessage).toBeVisible();
    await expect(rightClickMessage).toHaveText('You have done a right click');
    await page.waitForTimeout(2000);
});

test('Should perform mouse double-click action', async ({ page }) => {

    await page.goto('https://demoqa.com/buttons');
    const doubleClickBUtton = page.locator('#doubleClickBtn');
    await doubleClickBUtton.dblclick();
    const doubleClickMessage = page.locator('#doubleClickMessage');
    await expect(doubleClickMessage).toBeVisible();
    await expect(doubleClickMessage).toHaveText('You have done a double click');
    await page.waitForTimeout(2000);
});

test('Should perform mouse drag & drop action', async ({ page }) => {

    await page.goto('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    let sourceElemnt = page.locator('#draggable');
    let targetElement = page.locator('#droppable');
    await sourceElemnt.hover();
    await page.mouse.down();
    await targetElement.hover();
    await page.mouse.up();
    let hoverResult = page.locator('#drop-status');
    await expect(hoverResult).toBeVisible();
    await expect(hoverResult).toHaveText('dropped');
    await page.waitForTimeout(5000);

    await page.reload();
    sourceElemnt = page.locator('#draggable');
    targetElement = page.locator('#droppable');
    sourceElemnt.dragTo(targetElement);
    hoverResult = page.locator('#drop-status');
    await expect(hoverResult).toBeVisible();
    await expect(hoverResult).toHaveText('dropped');
    await page.waitForTimeout(2000);
});

test('Should perform mouse scrolling automatically on page', async ({ page }) => {

    await page.goto('https://playwright.dev/');
    const footer = page.locator('.footer__copyright');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveText('Copyright © 2025 Microsoft');
    await page.waitForTimeout(2000);
});


test('Should perform mouse scrolling automatically on table', async ({ page }) => {

    await page.goto('https://datatables.net/examples/basic_init/scroll_y.html');
    const table = page.locator('#example tbody');
    const cell = table.locator('td', { hasText: 'Zorita Serrano' });
    await expect(cell).toBeVisible();
    await expect(cell).toHaveText('Zorita Serrano');
    await page.waitForTimeout(2000);
});

test.only('Should perform mouse infinite scrolling', async ({ page }) => {
    test.slow();
    await page.goto('https://www.booksbykilo.in/new-books');
    let previousHeight = 0;
    let isBookFound = false;
    while (true) {
        const bookTitles = await page.locator('#divItemCard > div > h3').allInnerTexts();

        if (bookTitles.includes('World History')) {
            console.log('Book Found');
            isBookFound = true;
            expect(isBookFound).toBeTruthy();
            break;
        }

        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await page.waitForTimeout(3000);

        let currentHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        })
        console.log("Previous Height of the page: ", previousHeight);
        console.log("Current Height of the page: ", currentHeight);
        if (currentHeight === previousHeight) {
            break;
        }
        previousHeight = currentHeight;
    }
    console.log('Reached end of the page');

    if (!isBookFound) {
        console.log('Book not found');
    }
});
