import { test, expect } from '@playwright/test';

test.describe('API Authentication Types', () => {
    const apiEndpoint = 'https://example.com/api/protected-resource';

    test.only('should authenticate using API Key', async ({ request }) => {
        // https://api.nettoolkit.com/v1/account/test-api-keys - To get API Key
        const apiKey = 'test_uyeG7D6zqqDxwfo6kPKkUJCJaXzLP6IJFVrFpWyy';
        const response = await request.get("https://api.nettoolkit.com/v1/geo/tiles/12/1171/1566?type=raster", {
            headers: {
                'X-NTK-KEY': apiKey
            }
        });
        expect(response.status()).toBe(200);
    });

    test('should authenticate using Bearer Token', async ({ request }) => {
        const bearerToken = 'mysecretkey';
        const response = await request.get("https://httpbin.org/bearer", {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody).toHaveProperty('authenticated', true);
    });

    test('should authenticate using Basic Auth', async ({ request }) => {
        const username = 'user';
        const password = 'pass';
        const response = await request.get("https://httpbin.org/basic-auth/user/pass", {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody).toHaveProperty('authenticated', true);
    });

})