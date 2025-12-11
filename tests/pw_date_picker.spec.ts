import { test, expect, Page } from '@playwright/test';

test.describe('PW Date Picker', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com');
    });

    test('Should render the date picker component', async ({ page }) => {
        const datePicker = page.locator('#datepicker');
        await expect(datePicker).toBeVisible();
    });

    test('Should select a date from the date picker', async ({ page }) => {
        const datePicker = page.locator('#datepicker');
        await datePicker.click();

        const dateToSelect = '15';
        const monthToSelect = 'February';
        const yearToSelect = '2026';

        await newFunction(dateToSelect, monthToSelect, yearToSelect, page);
        await expect(datePicker).toHaveValue('02/15/2026');
        await page.waitForTimeout(2000);
    })

    async function newFunction(dateToSelect: string, monthToSelect: string, yearToSelect: string, page: Page) {
        const monthMap: { [key: string]: number } = {
            'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
            'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11,'December': 12 };
        const targetMonth = monthMap[monthToSelect];
        const targetYear = Number(yearToSelect);
        while (true) {
            const displayedMonth = monthMap[await page.locator('.ui-datepicker-month').innerText()];
            const displayedYear = Number(await page.locator('.ui-datepicker-year').innerText());


            if (displayedMonth === targetMonth && displayedYear === targetYear) {
                break;
            }

            if (displayedYear < targetYear || (displayedYear === targetYear && displayedMonth < targetMonth)) {
                await page.locator('.ui-datepicker-next').click();
            } else {
                await page.locator('.ui-datepicker-prev').click();
            }
        }
        await page.locator(`.ui-datepicker-calendar td a:text-is("${dateToSelect}")`).click();
    }

    test.only('Date picker with Month and Year dropdowns', async ({ page }) => {
        const yearToSelect = 2025;
        const monthToSelect = 'Apr';
        const dateToSelect = '10';
        const datePicker = page.locator('#txtDate');
        await datePicker.click();
        const monthDropdown = page.locator('.ui-datepicker-month');
        const yearDropdown = page.locator('.ui-datepicker-year');
        await monthDropdown.selectOption(monthToSelect);
        await yearDropdown.selectOption(yearToSelect.toString());
        await page.locator(`.ui-datepicker-calendar td a:text-is("${dateToSelect}")`).click();
        await expect(datePicker).toHaveValue('10/04/2025');
        await page.waitForTimeout(2000);
    })

});