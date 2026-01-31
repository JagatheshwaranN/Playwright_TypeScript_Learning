import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';

test('PW file upload - Single', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
    const fileUpload = page.locator('#singleFileInput');
    await fileUpload.setInputFiles('tests/upload/sample1.txt');
    await page.locator('button', { hasText: 'Upload Single File' }).click();
    const fileUploadStatus = page.locator('#singleFileStatus');
    const fileUploadMessage = await fileUploadStatus.textContent();
    expect(fileUploadMessage).toContain('sample1.txt');
    await page.waitForTimeout(2000);
});

test('PW file upload - Multiple', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');
    const fileUpload = page.locator('#multipleFilesInput');
    await fileUpload.setInputFiles(['tests/upload/sample1.txt', 'tests/upload/sample2.txt']);
    await page.locator('button', { hasText: 'Upload Multiple Files' }).click();
    const fileUploadStatus = page.locator('#multipleFilesStatus');
    const fileUploadMessage = await fileUploadStatus.textContent();
    expect(fileUploadMessage).toContain('sample1.txt');
    expect(fileUploadMessage).toContain('sample2.txt');
    await page.waitForTimeout(2000);
});

test.only('PW file upload - Drag and Drop', async () => {
    const context = await chromium.launch({ headless: false });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/upload');
    page.on('filechooser', async (fileChooser) => {
        await fileChooser.setFiles(['tests/upload/sample1.txt', 'tests/upload/sample2.txt']);
    });
    const fileUpload = page.locator('.example + div#drag-drop-upload');
    await fileUpload.click();
    await page.waitForTimeout(2000);
});

test('PW file download - Single', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
    const fileInput = page.locator('#inputText');
    await fileInput.fill('Welcome to Playwright Typescript Tutorial');
    await page.locator('#generateTxt').click();
    const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#txtDownloadLink').click()])
    const downloadPath = 'tests/download/testfile.txt';
    await download.saveAs(downloadPath);
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy();
    if (fileExists) {
        fs.unlinkSync(downloadPath);
    }
    await page.waitForTimeout(2000);
});