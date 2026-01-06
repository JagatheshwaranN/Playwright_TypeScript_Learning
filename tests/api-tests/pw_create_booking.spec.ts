import { test, expect } from '@playwright/test';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import { DateTime } from 'luxon';

test.describe('Create Booking API Tests', () => {
    let bookingId: number;
    const bookingData = {
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2026-01-05',
            checkout: '2026-01-06'
        },
        additionalneeds: 'Breakfast'
    };

    test('Create a new booking', async ({ request }) => {
        const response = await request.post('/booking', {
            data: bookingData
        });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking');
        bookingId = responseBody.bookingid;

        expect(responseBody.booking).toEqual(bookingData);
        expect(responseBody.booking).toMatchObject(bookingData);
        console.log(`Created booking with ID: ${bookingId}`);

    });

    test('Create a new booking with data from external source', async ({ request }) => {
        const externalBookingData: any = JSON.parse(fs.readFileSync('tests/data/create-booking.json', 'utf8'));

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
    });

    test.only(' Create booking with dynamic data', async ({ request }) => {
        const dynamicBookingData = {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({ min: 50, max: 500 }),
            depositpaid: faker.datatype.boolean(),
            bookingdates: {
                checkin: DateTime.now().toISODate(),
                checkout: DateTime.now().plus({ days: 2 }).toISODate(),
            },
            additionalneeds: 'Dinner'
        };

        const response = await request.post('/booking', {
            data: dynamicBookingData
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('bookingid');
        expect(responseBody).toHaveProperty('booking');
        bookingId = responseBody.bookingid;
        expect(responseBody.booking).toEqual(dynamicBookingData);
        console.log(`Created booking with ID: ${bookingId}`);
    });

});