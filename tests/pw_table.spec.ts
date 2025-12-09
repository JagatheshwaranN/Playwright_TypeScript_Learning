import {test, expect} from '@playwright/test';

test.describe('PW Table Component', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
    })

    test('Validate Static Table Content', async({page}) => {
        const table = page.locator('table[name="BookTable"]>tbody');
        const rows = table.locator('tr');
        const rowCount = await rows.count();
        console.log(`Total Rows: ${rowCount}`);

        await expect(rows).toHaveCount(7);
        const columns = table.locator('th');
        const columnCount = await columns.count();
        console.log(`Total Columns: ${columnCount}`);
        await expect(columns).toHaveCount(4);

        await rows.nth(1).locator('td').allInnerTexts().then(async(values) =>{
            expect(values[0]).toBe('Learn Selenium');
            expect(values[1]).toBe('Amit');
            expect(values[2]).toBe('Selenium');
            expect(values[3]).toBe('300');
        })

        const secondRow = rows.nth(2).locator('td');
        const secondRowData = await secondRow.allInnerTexts();
        expect(secondRowData).toEqual(['Learn Java', 'Mukesh', 'Java', '500']);
        await expect(secondRow).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

        for(let text of secondRowData ) {
            console.log(`Cell Data: ${text}`);
        }

        const allRows = await rows.all();
        console.log('--- All Table Data ---');
        console.log('BookName|Author|Subject|Price');
        for(let row of allRows.slice(1)) {
            const rowData = await row.locator('td').allInnerTexts();
            console.log(rowData.join('|'));
        }

         let totalPriceOfBooks = 0;
         for(let row of allRows.slice(1)) {
            const rowData = await row.locator('td').allInnerTexts();
            const author = rowData[1];
            if(author === 'Mukesh') {
                console.log(`Book by Mukesh found: ${rowData[0]}`);
                const price = parseInt(rowData[3]);
                totalPriceOfBooks +=price
            }
        }
        console.log(`Total Price of Books by Mukesh: ${totalPriceOfBooks}`);
    })

})