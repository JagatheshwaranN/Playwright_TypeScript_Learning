import { test, expect } from '@playwright/test';
import fs from 'fs';

const jsonPath = "tests/data/login.json";
const loginData:any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Login Test using Datadriven', async () => {

    for (const {email, password, validCheck} of loginData) {

        test(`Login Test for ${email} and ${password}`, async ({ page }) => {
            await page.goto('https://the-internet.herokuapp.com/login');
            await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
            await page.getByRole('textbox', { name: 'Username' }).click();
            await page.getByRole('textbox', { name: 'Username' }).fill(email);
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(password);
            await page.getByRole('button', { name: ' Login' }).click();
            if (validCheck === 'valid') {
                await expect(page.locator('#flash')).toContainText('You logged into a secure area! ×');
                await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
            } else {
                await expect(page.locator('.flash.error')).toBeVisible();
            }
            await page.waitForTimeout(2000);
        })
    }
})