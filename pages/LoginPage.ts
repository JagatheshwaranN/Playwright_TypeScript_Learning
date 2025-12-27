import { Page, Locator } from "@playwright/test";
class LoginPage {

    private readonly page: Page;
    private readonly loginLink: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = this.page.locator('#login2');
        this.usernameInput = this.page.locator('#loginusername');
        this.passwordInput = this.page.locator('#loginpassword');
        this.loginButton = this.page.locator('button[onclick="logIn()"]');
    }

    async clickLoginLink(): Promise<void> {
        await this.loginLink.click();
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string) {
        await this.clickLoginLink();
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}