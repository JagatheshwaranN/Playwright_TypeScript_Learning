import { test } from '@playwright/test';

// To execute test based on grouping
// npx playwright test pw_test_group.spec.ts --grep Group1

test.describe('Group1', async() => {

    test('Test1', async ({ }) => {
        console.log('Test 1');
    })

    test('Test2', async ({ }) => {
        console.log('Test 2');
    })
})

test.describe('Group2', async() => {

    test('Test3', async ({ }) => {
        console.log('Test 3');
    })

    test('Test4', async ({ }) => {
        console.log('Test 4');
    })
})