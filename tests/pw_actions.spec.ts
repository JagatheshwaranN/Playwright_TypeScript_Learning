import { test, expect, Locator } from '@playwright/test';

test.describe('PW Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
  })

  test('Text Input Actions - Get Attribute', async ({ page }) => {
    const textInput: Locator = page.locator('#name');
    await expect(textInput).toBeVisible();
    await expect(textInput).toBeEnabled();
    await textInput.getAttribute('maxlength').then(value => {
      console.log("Max Length Attribute:", value);
    });
  });

  test('Text Input Actions - Get Input Value', async ({ page }) => {
    const fitstNameInput: Locator = page.locator("#name");
    await expect(fitstNameInput).toBeVisible();
    await fitstNameInput.fill("Playwright");
    const inputValue = await fitstNameInput.inputValue();
    console.log("Input Value:", inputValue);
    expect(inputValue).toBe("Playwright");
  });

  test('Text Input Actions - Get Input Value by Locate Element Approach 2', async ({ page }) => {
    const fitstNameInput = await page.$("#name");
    await fitstNameInput?.fill("Playwright");
    const inputValue = await fitstNameInput?.inputValue();
    console.log("Input Value:", inputValue);
    expect(inputValue).toBe("Playwright");
  });

    test('Text Input Actions - Clear Input Value', async ({ page }) => {
    const fitstNameInput = await page.$("#name");
    await fitstNameInput?.fill("Playwright");
    const inputValue = await fitstNameInput?.inputValue();
    console.log("Input Value:", inputValue);
    expect(inputValue).toBe("Playwright");
    await fitstNameInput?.fill("");
    const clearedValue = await fitstNameInput?.inputValue();
    console.log("Cleared Input Value:", clearedValue);
    expect(clearedValue).toBe("");
  });


  test('Radio Button Actions - Check Selected State', async ({ page }) => {
    const maleRadio: Locator = page.locator('#male');
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    const isSelectedBefore = await maleRadio.isChecked();
    console.log("Is Male Radio Selected Before Click:", isSelectedBefore);
    await maleRadio.check();
    const isSelectedAfter = await maleRadio.isChecked();
    console.log("Is Male Radio Selected After Click:", isSelectedAfter);
    expect(isSelectedAfter).toBe(true);
  });

  test('Checkbox Actions - Check Selected State', async ({ page }) => {
    const sundayCheckbox: Locator = page.getByLabel('Sunday');
    await expect(sundayCheckbox).toBeVisible();
    await expect(sundayCheckbox).toBeEnabled();
    const isCheckedBefore = await sundayCheckbox.isChecked();
    console.log("Is Sunday Checkbox Selected Before Click:", isCheckedBefore);
    await sundayCheckbox.check();
    const isCheckedAfter = await sundayCheckbox.isChecked();
    console.log("Is Sunday Checkbox Selected After Click:", isCheckedAfter);
    await expect(sundayCheckbox).toBeChecked();
    expect(isCheckedAfter).toBe(true);

    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (const day of days) {
      const dayCheckbox: Locator = page.getByLabel(day);
      const isDayCheckedBefore = await dayCheckbox.isChecked();
      console.log(`Is ${day} Checkbox Selected Before Click:`, isDayCheckedBefore);
      await dayCheckbox.check();
      const isDayCheckedAfter = await dayCheckbox.isChecked();
      console.log(`Is ${day} Checkbox Selected After Click:`, isDayCheckedAfter);
      await expect(dayCheckbox).toBeChecked();
      expect(isDayCheckedAfter).toBe(true);
    }

    const daysToMap: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = daysToMap.map(index => page.getByLabel(index));

    for (const checkbox of checkboxes.slice(-3)) {
      await checkbox.uncheck();
      expect(checkbox).not.toBeChecked();
    }

    for (const checkbox of checkboxes) {
      if (await checkbox.isChecked()) {
        await checkbox.uncheck();
        expect(checkbox).not.toBeChecked();
      } else {
        await checkbox.check();
        expect(checkbox).toBeChecked();
      }
    }
    await page.waitForTimeout(5000);
  });

});