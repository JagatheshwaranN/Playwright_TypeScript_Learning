import { test, expect, Locator } from '@playwright/test';
import { hash } from 'crypto';
import { cp } from 'fs';

test.describe('PW Table', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    })

    test('Validate Static Table Content', async ({ page }) => {
        const table = page.locator('table[name="BookTable"]>tbody');
        const rows = table.locator('tr');
        const rowCount = await rows.count();
        console.log(`Total Rows: ${rowCount}`);

        await expect(rows).toHaveCount(7);
        const columns = table.locator('th');
        const columnCount = await columns.count();
        console.log(`Total Columns: ${columnCount}`);
        await expect(columns).toHaveCount(4);

        await rows.nth(1).locator('td').allInnerTexts().then(async (values) => {
            expect(values[0]).toBe('Learn Selenium');
            expect(values[1]).toBe('Amit');
            expect(values[2]).toBe('Selenium');
            expect(values[3]).toBe('300');
        })

        const secondRow = rows.nth(2).locator('td');
        const secondRowData = await secondRow.allInnerTexts();
        expect(secondRowData).toEqual(['Learn Java', 'Mukesh', 'Java', '500']);
        await expect(secondRow).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

        for (let text of secondRowData) {
            console.log(`Cell Data: ${text}`);
        }

        const allRows = await rows.all();
        console.log('--- All Table Data ---');
        console.log('BookName|Author|Subject|Price');
        for (let row of allRows.slice(1)) {
            const rowData = await row.locator('td').allInnerTexts();
            console.log(rowData.join('|'));
        }

        let totalPriceOfBooks = 0;
        for (let row of allRows.slice(1)) {
            const rowData = await row.locator('td').allInnerTexts();
            const author = rowData[1];
            if (author === 'Mukesh') {
                console.log(`Book by Mukesh found: ${rowData[0]}`);
                const price = parseInt(rowData[3]);
                totalPriceOfBooks += price
            }
        }
        console.log(`Total Price of Books by Mukesh: ${totalPriceOfBooks}`);
    })

    test('Handle Dynamic Table', async ({ page }) => {
        const table: Locator = page.locator('#taskTable > tbody');
        const totalRows = table.locator('tr');
        const rowCount = await totalRows.count();
        console.log(`Total Rows in Dynamic Table: ${rowCount}`);
        const totalColumns = totalRows.nth(0).locator('td');
        const columnCount = await totalColumns.count();
        console.log(`Total Columns in Dynamic Table: ${columnCount}`);
        const allRows = await totalRows.all();
        
        let cpuUsage = ''
        for(let row of allRows) {
            const rowData = await row.locator('td').allInnerTexts();
            const processName = rowData[0];
            if(processName === 'Chrome') {
                console.log(`Process Found: ${processName}`);
                cpuUsage = await row.locator('td',{hasText:'%'}).innerText();
                console.log(`CPU Usage of ${processName}: ${cpuUsage}`);
            }
        }
        const displayedCpuUsage = await page.locator('.chrome-cpu').innerText();
        expect(cpuUsage).toBe(displayedCpuUsage);
        if(displayedCpuUsage.includes(cpuUsage)) {
            console.log('CPU Usage matches with the table data.');
        } else {
            console.log('CPU Usage does not match with the table data.');
        }

        await page.waitForTimeout(5000);
    })

})

test.describe.only('PW Pagination Table', () => {
    test.beforeEach(async ({ page }) => {  
        await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    })

    test('Validate Table with Pagination', async ({ page }) => {   
        const table: Locator = page.locator('#example > tbody');
        const totalRows = table.locator('tr');
        const rowCount = await totalRows.count();
        console.log(`Total Rows on First Page: ${rowCount}`);
        const totalColumns = totalRows.nth(0).locator('td');
        const columnCount = await totalColumns.count();
        console.log(`Total Columns: ${columnCount}`);

        let hasNextPage = true;
        const nextButton = page.locator('button[aria-label="Next"]');
        
        while(hasNextPage) {
            const allRows = await totalRows.all();
            for(let row of allRows) {
                const rowData = await row.locator('td').allInnerTexts();
                console.log(rowData.join('|'));
            }
            await page.waitForTimeout(2000);
            console.log('--- Navigating to Next Page ---');
            const isDisabled = await nextButton.getAttribute('class');
            console.log(`Next Button Class Attribute: ${isDisabled}`);
            if(isDisabled?.includes('disabled')) {
                hasNextPage = false;
            } else {
                await nextButton.click();     
            }   
        }
    })

    test('Entries update per page', async ({ page }) => {   
        const entriesSelect = page.locator('select[id="dt-length-0"]');
        await entriesSelect.selectOption('25');
        await page.waitForTimeout(2000);
        const table: Locator = page.locator('#example > tbody');
        const totalRows = table.locator('tr');
        const rowCount = await totalRows.count();
        console.log(`Total Rows after selecting 25 entries: ${rowCount}`);
        expect(rowCount).toBe(25);
    })

    test.only('Search Functionality in Table', async ({ page }) => {   
        const searchInput = page.locator('input[id="dt-search-0"]');
        await searchInput.fill('Serge Baldwin');
        await page.waitForTimeout(2000);
        const table: Locator = page.locator('#example > tbody');
        const totalRows = table.locator('tr');
        const rowCount = await totalRows.count();
        console.log(`Total Rows after search: ${rowCount}`);
        expect(rowCount).toBeGreaterThan(0);    
        if(rowCount > 0) {
            const firstRow = totalRows.nth(0).locator('td');
            const firstRowData = await firstRow.allInnerTexts();
            console.log(`First Row Data after search: ${firstRowData.join('|')}`);
            expect(firstRowData).toContain('Serge Baldwin');
        }else{
            console.log('No matching records found.');
        }
    })

}) 