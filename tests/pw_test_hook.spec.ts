import { test } from '@playwright/test';


test.beforeAll('Before All', async () => {
    console.log('Before All..')
})

test.afterAll('After All', async () => {
    console.log('After All..')
})

test.beforeEach('Before Each', async () => {
    console.log('Before Each..')
})

test.afterEach('After Each', async () => {
    console.log('After Each..')
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
