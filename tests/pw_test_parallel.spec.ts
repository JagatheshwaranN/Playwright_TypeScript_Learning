import { test } from '@playwright/test';

// npx playwright test pw_test_parallel.spec.ts --workers=5

test.describe.configure({
    'mode': 'serial' // parallel
})

test('Test1', async ({ }) => {
    console.log('Test 1');
})

test('Test2', async ({ }) => {
    console.log('Test 2');
})

test('Test3', async ({ }) => {
    console.log('Test 3');
})

test('Test4', async ({ }) => {
    console.log('Test 4');
})

test('Test5', async ({ }) => {
    console.log('Test 5');
})