import { Page, Locator } from "@playwright/test";

export class CartPage {

    private readonly page: Page;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly deleteItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = this.page.locator('#tbodyid > tr > td:nth-child(2)');
        this.checkoutButton = this.page.locator('button[data-target="#orderModal"]');
        this.deleteItem = this.page.locator('#tbodyid>tr>td:nth-child(4)>a');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async getCatdtItemNames(): Promise<string[]> {
        const itemCount = await this.getCartItemCount();
         console.log(`Total items in cart before deletion: ${itemCount}`);
        const itemNames: string[] = [];
        for (let i = 0; i < itemCount; i++) {
            itemNames.push(await this.cartItems.nth(i).innerText());
        }
        return itemNames;
    }

    async verifyItemInCart(itemName: string): Promise<boolean> {
        const itemCount = await this.getCartItemCount();
         console.log(`Total items in cart before deletion: ${itemCount}`);
        for (let i = 0; i < itemCount; i++) {
            const currentItemName = await this.cartItems.nth(i).innerText();
            console.log(`Item in cart: ${currentItemName}`);
            if (currentItemName === itemName) {
                return true;
            }
        }
        return false;
    }

    async deleteItemFromCart(itemName: string): Promise<void> {
        const itemCount = await this.getCartItemCount();
        console.log(`Total items in cart before deletion: ${itemCount}`);
        for (let i = 0; i < itemCount; i++) {
            const currentItemName = await this.cartItems.nth(i).innerText();
            console.log(`Item in cart: ${currentItemName}`);
            if (currentItemName === itemName) {
                await this.deleteItem.nth(i).click();
                break;
            }   
        }
    }

    async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }
}   