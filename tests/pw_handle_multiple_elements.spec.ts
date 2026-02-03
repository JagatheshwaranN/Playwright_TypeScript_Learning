import { test, expect } from '@playwright/test';

test('Handle multiple elements on a page', async ({ page }) => {

    // Navigate to the webpage with multiple elements
    await page.goto('https://letcode.in/elements');

    // Locate all elements with the class name 'item'
    const searchBox = await page.$("input[name='username']");
    await searchBox?.fill('JagatheshwaranN');
    await searchBox?.press("Enter");

    await page.waitForSelector('.container.mt-5 div p:nth-child(1)', { timeout: 5000 });
    const items = await page.$$('.container.mt-5 div p:nth-child(1)');
    console.log(`Total items found: ${items.length}`);

    console.log('Iterating through each item using for loop:');
    for await (const item of items) {
        const itemText = await item.textContent();
        console.log(`Processing item: ${itemText}`);
    }

    //   const repoNames = await items.map(async (item) => {
    //     return (await item.textContent())?.trim();
    //   });

    //   const resolvedRepoNames = await Promise.all(repoNames);
    //   console.log('Repository Names:', resolvedRepoNames);

    // Using Promise.all with map to fetch text content of all items concurrently
    const repoNames = await Promise.all(items.map(async (item) => {
        return (await item.textContent())?.trim();
    }));

    console.log('Repository Names:', repoNames);

});