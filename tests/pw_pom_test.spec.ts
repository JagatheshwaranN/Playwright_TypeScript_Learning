import { expect, test } from "@playwright/test";

import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from "../pages/CartPage";

test.describe("E2E Test Suite", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.demoblaze.com/");
    });

    test("Add product to cart and verify", async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const cartPage = new CartPage(page);
        // Login
        await loginPage.login("testmagic", "admin@123");
        // Select Product
        const productName = "Samsung galaxy s6";
        await homePage.selectProduct(productName);
        // Add to Cart
        await homePage.addToCart();
        // Go to Cart
        await homePage.goToCart();
        // Wait for cart items to load
        await page.waitForTimeout(2000);
        // Verify Product in Cart
        const isItemInCart = await cartPage.verifyItemInCart(productName);
        // Wait for 2 seconds
        await page.waitForTimeout(2000);
        expect(isItemInCart).toBeTruthy();
        // Delete Item from Cart    
        await cartPage.deleteItemFromCart(productName);
        // Wait for 2 seconds
        await page.waitForTimeout(2000);
        const isItemStillInCart = await cartPage.verifyItemInCart(productName);
        expect(isItemStillInCart).toBeFalsy();
        // Take Screenshot
        await page.screenshot({ path: 'tests/screenshot/pom_e2e_test_screenshot.png', fullPage: true });
    });

});