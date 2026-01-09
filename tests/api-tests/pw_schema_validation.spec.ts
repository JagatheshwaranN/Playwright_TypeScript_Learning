import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

// npm install -D @playwright/test ajv
test.describe('API Schema Validation', () => {

    test('should validate API response against JSON schema', async ({ request }) => {
        const ajv = new Ajv();
        const schema = {
            "type": "object",
            "properties": {
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                }
            },
            "required": [
                "firstName",
                "lastName",
                "city",
                "state"
            ]
        };
        const response = await request.get('https://mocktarget.apigee.net/json');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const validate = ajv.compile(schema);
        const valid = validate(responseBody);
        if (!valid) {
            console.log(validate.errors);
        }
        expect(valid).toBe(true);
    });
});