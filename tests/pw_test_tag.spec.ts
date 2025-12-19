import { test } from '@playwright/test';

// To execute test based on tagging
// npx playwright test pw_test_tag.spec.ts --grep "@sanity"
// npx playwright test pw_test_tag.spec.ts --grep-invert "@sanity"
// npx playwright test pw_test_tag.spec.ts --grep "(?=.*@sanity)(?=.*@functional)"
// npx playwright test pw_test_tag.spec.ts --grep "@sanity|@functional"
// npx playwright test pw_test_tag.spec.ts --grep "@sanity" --grep-invert "@functional"

test('@sanity Test1', async ({ }) => {
    console.log('Sanity Test - traditional');
})

test('@sanity @functional Test2', async ({ }) => {
    console.log('Sanity & Functional Test - traditional');
})

test('Test3', { tag: '@sanity' }, async ({ }) => {
   console.log('Sanity Test - modern');
})

test('Test4', { tag: ['@sanity', '@functional'] }, async ({ }) => {
    console.log('Sanity & Functional Test - modern');
})

test('Test5', { tag: ['@regression'] }, async ({ }) => {
    console.log('Regression Test - modern');
})