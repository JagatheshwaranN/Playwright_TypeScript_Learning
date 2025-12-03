import {test, expect, Locator} from '@playwright/test';

test.describe('CSS Locators', () => {
  
test.beforeEach(async ({page}) => {
    await page.goto('https://letcode.in/edit');
  })


test('should locate elements by id', async ({page}) => {
  console.log("Count:", await page.locator('#fullName').count());
  const element:Locator = page.locator('#fullName');
  await expect(element).toBeVisible();
  await element.fill('laptop');
})

test('should locate elements by class', async({page})=>{
    const element:Locator = page.locator('.card-footer-item.button.is-primary');
    await expect(element).toBeVisible();
})

test('should locate elements by attribute', async({page})=>{
    const element:Locator = page.locator('.input[id="dontwrite"]');
    await expect(element).toBeVisible();
})

test('should locate elements by attribute starts with', async({page})=>{
    const element:Locator = page.locator('input[id^="dont"]');
    await expect(element).toBeVisible();    
})

test('should locate elements by attribute ends with', async({page})=>{
    const element:Locator = page.locator('input[id$="write"]');
    await expect(element).toBeVisible();      
})

test('should locate elements by attribute contains', async({page})=>{
    const element:Locator = page.locator('input[id*="ontw"]');
    await expect(element).toBeVisible();       
})

test('should locate elements by multiple attributes', async({page})=>{
    const element:Locator = page.locator('input[id="join"][class="input"]');
    await expect(element).toBeVisible();        
})

test('should locate elements by descendant selector', async({page})=>{
    const element:Locator = page.locator('div.control > #getMe');
    await expect(element).toBeVisible();          
})

test('should locate elements by negation selector', async({page})=>{
    const element:Locator = page.locator('input[id="join"]:not([class="input1"])');
    await expect(element).toBeVisible();   
})         

});