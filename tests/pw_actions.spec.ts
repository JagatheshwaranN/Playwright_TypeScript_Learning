import {test, expect, Locator} from '@playwright/test';

test.describe('PW Actions', () => {
  let exampleLocator: Locator;  
    test.beforeEach(async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    })

    test('Text Input Actions', async ({page}) => {
       const textInput: Locator = page.locator('#name');
         await expect(textInput).toBeVisible();
         await expect(textInput).toBeEnabled();
         await textInput.getAttribute('maxlength').then(value => {
            console.log("Max Length Attribute:", value);
         });
    }); 
    
});