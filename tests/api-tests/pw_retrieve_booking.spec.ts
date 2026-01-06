import { test, expect } from '@playwright/test';

test.describe('Retrieve Booking API Tests', () => {
    let bookingId: number = 1027;
    let firstname: string;
    let lastname: string;
    test('Retrieve the created booking', async ({ request }) => {
        const response = await request.get(`/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('firstname');
        expect(responseBody).toHaveProperty('lastname');
        expect(response.ok()).toBeTruthy();
        console.log(responseBody);
        firstname = responseBody.firstname;
        lastname = responseBody.lastname;
    });

    test('Retrieve the booking details using query parameters', async ({ request }) => {
        const response = await request.get(`/booking`, {
            params: {
                firstname: firstname,
                lastname: lastname
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
        const bookingIds = responseBody.map((booking: { bookingid: number; }) => booking.bookingid);
        expect(bookingIds).toContain(bookingId);
        console.log(responseBody);
    });

});