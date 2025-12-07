import {test, expect, Locator} from '@playwright/test';

test.describe('PW Dropdown Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://letcode.in/dropdowns');
  });   


    test('Normal / Single Select Dropdown', async ({ page }) => {  
        const dropdown:Locator = page.locator('#fruits');
        await expect(dropdown).toBeVisible();
        await dropdown.selectOption('Apple');
       
        await dropdown.selectOption({ label: 'Orange' });

        await dropdown.selectOption({ value: '1'});

        await dropdown.selectOption({ index: 4 });
    
        const dropdownOptions:Locator = dropdown.locator('option');
        const optionsCount = await dropdownOptions.count();
        console.log("Total Options in Dropdown:", optionsCount);
        await expect(dropdownOptions).toHaveCount(6);

        const optionTexts:string[] = await dropdownOptions.allTextContents();
        console.log("Dropdown Options Texts:", optionTexts);
        expect(optionTexts).toContain('Orange');

        const optionsValues:string[] = [];
       for(let i=0; i<optionsCount;i++){
        const optionValue = await dropdownOptions.nth(i).getAttribute('value');
        optionsValues.push(optionValue? optionValue : '');
       }
       console.log("Dropdown Options Values:", optionsValues);

       await page.waitForTimeout(2000);

    });

    test('Multi Select Dropdown', async ({page})=> {
        const multiSelectDropdown:Locator = page.locator('#superheros');
        await expect(multiSelectDropdown).toBeVisible();
        await multiSelectDropdown.selectOption([{label:'Aquaman'}, {value:'bt'}, {index: 0}]);
        await page.waitForTimeout(2000);
    })
   
    test('Dropdown Sorted Check', async ({page}) => {
        const dropdown:Locator = page.locator('#fruits > option');
        const optionsText:string[] = await dropdown.allTextContents();
        const originalOptionsText:string[] = [...optionsText];
        const sortedOptionsText:string[] = [...optionsText].sort();
        console.log("Dropdown Options Texts - Original Order:", originalOptionsText);
        console.log("Dropdown Options Texts - Sorted Order:", sortedOptionsText);
        expect(originalOptionsText).not.toEqual(sortedOptionsText);
    })

    test('Check Duplicate Options in Dropdown', async ({page}) => {
        const dropdown:Locator = page.locator('#fruits > option');
        const optionsText:string[] = await dropdown.allTextContents();
        const duplicateOptions:string[] = [];
        const optionsSet = new Set<string>();
        for(let options of optionsText) {
            if(optionsSet.has(options)) {
                duplicateOptions.push(options);
            }else{
                optionsSet.add(options);
            }
        }
        console.log("Duplicate Options in Dropdown:", duplicateOptions);
        if(duplicateOptions.length > 0) {
            console.log("There are duplicate options in the dropdown.");
        } else {
            console.log("No duplicate options found in the dropdown.");
        }
    })
});

test.describe.only('Handling Custom Dropdowns', () => {
   
    test('Auto Suggestion Dropdown', async ({page}) => {
        await page.goto('https://www.amazon.com/');
        const autoSuggestInput:Locator = page.locator('#twotabsearchtextbox');
        await expect(autoSuggestInput).toBeVisible();
        await autoSuggestInput.fill('smart');
         await page.waitForTimeout(2000);
        const autoSuggestOptions:Locator = page.locator('div.s-suggestion');
        const optionsCount = await autoSuggestOptions.count();
        console.log("Total Auto-Suggest Options:", optionsCount);
        for(let i=1; i<=optionsCount; i++) {
            const optionsText = await page.locator(`//div[@id="sac-suggestion-row-${i}"]`).textContent();
            console.log(`Option ${i}:`, optionsText?.trim());
        }
        await page.waitForTimeout(2000);
    })

    test.only('Custom Dropdown - Browser Selection', async ({page}) => {
        await page.goto('file:///C:/Users/jagat/Downloads/Dropdown.html');
        const dropdownTrigger:Locator = page.locator('.custom-select');
        await expect(dropdownTrigger).toBeVisible();
        await dropdownTrigger.click();
        const dropdownOptions :Locator = page.locator('.select-items');
        await expect(dropdownOptions).toBeVisible();
        const dropdownOptionsTexts:string[] = await dropdownOptions.locator('li').allTextContents(); 
        console.log("Custom Dropdown Options:", dropdownOptionsTexts);
        const optionToSelect = 'Safari';
        for(const optionText of dropdownOptionsTexts) {
            if(optionText === optionToSelect) {
                await dropdownOptions.locator('li', {hasText: optionText}).click();
                console.log(`Selected Option: ${optionText}`);
                break;
            }
        }
        await page.waitForTimeout(2000);
    })

})
    