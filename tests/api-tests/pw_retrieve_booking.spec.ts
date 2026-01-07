import { test, expect } from '@playwright/test';
import fs from 'fs';

test.describe('Retrieve Booking API Tests', () => {
    let bookingId: number;
    let firstname: string;
    let lastname: string;
    test('Retrieve the created booking', async ({ request }) => {
        const externalBookingData: any = JSON.parse(fs.readFileSync('tests/data/create-booking.json', 'utf8'));

        let response = await request.post('/booking', {
            data: externalBookingData
        });
        expect(response.status()).toBe(200);

        let responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking');
        bookingId = responseBody.bookingid;

        expect(responseBody.booking).toEqual(externalBookingData);
        console.log(`Created booking with ID: ${bookingId}`);
        console.log(`Created Booking Details: ${JSON.stringify(responseBody)}`);

        // Retrieve booking by ID
        response = await request.get(`/booking/${bookingId}`);
        expect(response.status()).toBe(200);
        responseBody = await response.json();
        expect(responseBody).toHaveProperty('firstname');
        expect(responseBody).toHaveProperty('lastname');
        expect(response.ok()).toBeTruthy();
        console.log(`Retrieved Booking Details: ${JSON.stringify(responseBody)}`);
        firstname = responseBody.firstname;
        lastname = responseBody.lastname;

        // Retrieve booking by first and last name
        response = await request.get(`/booking`, {
            params: {
                firstname: firstname,
                lastname: lastname
            }
        });
        expect(response.status()).toBe(200);
        responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
        const bookingIds = responseBody.map((booking: { bookingid: number; }) => booking.bookingid);
        expect(bookingIds).toContain(bookingId);
        console.log(responseBody);
    });

});