import { expect, test } from '@playwright/test';


// test.only('Test1', async ({ page }) => {
//     console.log('Test 1');
//     await page.goto('https://www.google.com/');
//     await expect(page).toHaveTitle('Google');
// })

test('Test1', async ({ page }) => {
    console.log('Test 1');
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

test.skip('Test2', async ({ page }) => {
    console.log('Test 2');
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

test('Test3', async ({ page, browserName }) => {
    console.log('Test 3');
    test.skip(browserName === 'chromium', "Skipping test based on condition")
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

test.fail('Test4', async ({ page }) => {
    console.log('Test 4');
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google1');
})

test.fixme('Test5', async ({ page }) => {
    console.log('Test 5');
    await page.goto('https://www.google.com/');
})

test('Test6', async ({ page }) => {
    console.log('Test 6');
    test.slow();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle('Google');
})

