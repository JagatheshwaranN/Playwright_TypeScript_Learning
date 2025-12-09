import {test, expect} from '@playwright/test';

test.describe('PW Table Component', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    })


})