import {test, expect, Locator} from '@playwright/test';

test.describe('XPath Locators Section 1', () => {
    const testUrl = 'https://www.selenium.dev/selenium/web/inputs.html';
 test.beforeEach(async ({page}) => {
        await page.goto(testUrl);
    })

    test('Locate element using XPath', async({page})=> {
    const inputLocator: Locator = page.locator('//input[@name="no_type"]');
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toHaveValue('input with no type');
})

test('Locate element using XPath with contains()', async({page})=> {
    const inputLocator: Locator = page.locator('//input[contains(@name,"number")]');
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toHaveValue('42');

})

test('Locate element using XPath with starts-with()', async({page})=> {
    const inputLocator: Locator = page.locator('//input[starts-with(@name,"num")]');
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toHaveValue('42')
})

test('Locate element using XPath with and/or operators', async({page})=> {
    const inputLocator: Locator = page.locator('//input[@name="no_type" and @value="input with no type"]');
    await expect(inputLocator).toBeVisible();
    await expect(inputLocator).toHaveValue('input with no type')
})

test('Locate elements using XPath', async({page})=> {
    const inputLocator: Locator = page.locator('//input[contains(@name,"input")]');
    console.log("Count:", await inputLocator.count());
    await expect(inputLocator.first()).toBeVisible();
    await expect(inputLocator.first()).toHaveValue('42')
    await expect(inputLocator.last()).toHaveValue('hidden')
    await expect(inputLocator.nth(3)).toHaveValue('qwerty')
})

});

test.describe('XPath Locators Section 2', () => {
    const testUrl = 'https://demo.automationtesting.in/Register.html';
 test.beforeEach(async ({page}) => {
        await page.goto(testUrl);
    })

    test('Locate element using XPath', async({page})=> {
    const radioLoctor: Locator = page.locator('//label[@class="checks"]');
    console.log("Count:", await radioLoctor.count());
    await radioLoctor.allTextContents().then(texts => {
        console.log("Radio Button Texts:", texts);
    });

    const firstRadio: Locator = radioLoctor.first();
    await expect(firstRadio).toBeVisible();
    await firstRadio.textContent().then(text => {
        console.log("First Radio Button Text:", text);  
    });
})

test('Locate checkbox using XPath with text()', async({page})=> {
    const registerText: Locator = page.locator('//h2[text()="Register"]');
    await expect(registerText).toBeVisible();
})

test('Locate element using XPath with position()', async({page})=> {    
    const buttonLocator: Locator = page.locator('//div//button[@class="btn btn-primary" and position()=2]');
    await expect(buttonLocator).toBeVisible();
})

});