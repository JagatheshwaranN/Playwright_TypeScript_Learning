import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// npm install csv-parse
const csvPath = 'tests/data/login.csv';
const csvData = fs.readFileSync(csvPath, 'utf-8');

const records: any = parse(csvData, {
    columns: true,
    skip_empty_lines: true
});

test.describe('Login Test using Datadriven', () => {

    for (const data of records) {

        test(`Login Test for: "${data.email}" and "${data.password}"`, async ({ page }) => {

            await page.goto('https://the-internet.herokuapp.com/login');
            await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();

            await page.getByRole('textbox', { name: 'Username' }).fill(data.email);
            await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
            await page.getByRole('button', { name: ' Login' }).click();

            if (data.validCheck === 'valid') {
                await expect(page.locator('#flash'))
                    .toContainText('You logged into a secure area!');
                await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
            } else {
                await expect(page.locator('.flash.error')).toBeVisible();
            }
        });
    }
});
