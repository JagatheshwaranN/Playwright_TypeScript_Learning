import { test, expect } from '@playwright/test';
import fs from 'fs';


test.describe('Update Booking API Tests', () => {
    let bookingId: number;

    test('Create a new booking and update with data from external source', async ({ request }) => {
        const externalBookingData: any = readDataFromJson('tests/data/create-booking.json');

        const response = await request.post('/booking', {
            data: externalBookingData
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking');
        bookingId = responseBody.bookingid;

        expect(responseBody.booking).toEqual(externalBookingData);
        console.log(`Created booking with ID: ${bookingId}`);

        const tokenData: any = readDataFromJson('tests/data/token.json');

        const authResponse = await request.post('/auth', {
            data: tokenData
        });
        expect(authResponse.status()).toBe(200);
        const authResponseBody = await authResponse.json();
        expect(authResponseBody).toHaveProperty('token');
        const token = authResponseBody.token;

        const updatedBookingData = {
            firstname: 'John',
            lastname: 'Smith',
            totalprice: 222,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-01-05',
                checkout: '2026-01-06'
            },
            additionalneeds: 'Lunch'
        };
        const updateResponse = await request.put(`/booking/${bookingId}`, {
            data: updatedBookingData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        });
        expect(updateResponse.status()).toBe(200);
        const updatedResponseBody = await updateResponse.json();
        expect(updatedResponseBody).toEqual(updatedBookingData);
        console.log(`Updated booking with ID: ${bookingId}`);
        console.log(`Updated Booking Details: ${JSON.stringify(updatedResponseBody)}`);
    });

    function readDataFromJson(path: string): any {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
});
