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
        await multiSelectDropdown.selectOption([{label:'Aquaman'}, {value:'bt'},{index: 0}]);
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

    test.only('Check Duplicate Options in Dropdown', async ({page}) => {
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

    