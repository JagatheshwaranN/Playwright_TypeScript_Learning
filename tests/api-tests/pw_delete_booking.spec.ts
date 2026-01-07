import { test, expect } from '@playwright/test';
import fs from 'fs';


test.describe('Delete Booking API Tests', () => {
    let bookingId: number;

    test('Create a new booking and delete it with data from external source', async ({ request }) => {
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

        
        const deleteResponse = await request.delete(`/booking/${bookingId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        });
        expect(deleteResponse.status()).toBe(201);
        expect(deleteResponse.statusText()).toBe('Created');
        console.log(`Deleted booking with ID: ${bookingId}`);
        const getResponse = await request.get(`/booking/${bookingId}`);
        expect(getResponse.status()).toBe(404);
        console.log(`Verified deletion of booking with ID: ${bookingId}`);  
    });

    function readDataFromJson(path: string): any {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
});
