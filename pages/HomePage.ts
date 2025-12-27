import {Page, Locator} from "@playwright/test";

export class HomePage {

    private readonly page: Page;
    private readonly productTiles: string;
    private readonly addToCartButton: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTiles = '.card-block > .card-title > a';
        this.addToCartButton = this.page.locator('.btn.btn-success.btn-lg');
        this.cartLink = this.page.locator('#cartur');
    }

    async selectProduct(productName: string): Promise<void> {
        const productLocator = this.page.locator(this.productTiles).filter({ hasText: productName });
        await productLocator.click();
    }

    async addToCart(): Promise<void> {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        }); 
        await this.addToCartButton.click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }
}