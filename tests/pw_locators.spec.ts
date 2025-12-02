import {test, expect, Locator} from '@playwright/test';


    test("Using PW Locators to locate an element", async ({page}) => {

        await page.goto("https://demo.nopcommerce.com/");

        // Using Locator to find the logo by its alt text
        const logo:Locator = page.getByAltText("nopCommerce demo store");
        await expect(logo).toBeVisible();

        // Using Locator to find the "Log in" link by its text
        const loginLink:Locator = page.getByText("Log in");
        await expect(loginLink).toBeVisible();
        await expect(page.getByText("Log i")).toBeVisible(); // Partial text match
        await expect(page.getByText(/log\sIn/i)).toBeVisible(); // Regex text match

        // Using Locator to find the "Register" link by its role and name
        const registerLink:Locator = page.getByRole('link', {name: 'Register'});
        await expect(registerLink).toBeVisible();
        registerLink.click();
        await expect(page).toHaveURL(/register/);

        // Using Locator to find the "Company name" input field by its label
        const companyNameInput:Locator = page.getByLabel("Company name:");
        await companyNameInput.fill("AlphaTech");
        await expect(companyNameInput).toHaveValue("AlphaTech");

        // Using Locator to find the search input field by its placeholder
        const searchInput:Locator = page.getByPlaceholder("Search store");
        await searchInput.fill("Laptop");
        await expect(searchInput).toHaveValue("Laptop");

        await page.goto("file:///D:/Environments/VisualStudio/Playwright_Learning/tests/files/app.html");

        // Using Locator to find the "Home" link by its title attribute
        const homepageLink:Locator = page.getByTitle("Home page link");
        await expect(homepageLink).toBeVisible();
        await expect(homepageLink).toHaveText("Home");

        // Using Locator to find the email element by its test ID
        const emailId:Locator = page.getByTestId("profile-email");
        await expect(emailId).toHaveText("john.doe@example.com");   


    });