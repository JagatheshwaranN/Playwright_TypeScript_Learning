import { test, expect } from '@playwright/test';

test('GET product and validate response', async ({ request }) => {
  const url = 'https://fakestoreapi.com/products/1';

  // 2. Send GET request
  const response = await request.get(url);

  // 3. Verify status is 200
  expect(response.status()).toBe(200);

  // Parse body
  const data = await response.json();
  // 4. Validate required keys exist
  expect(data).toBeTruthy();
  expect(data.id).toBeDefined();
  expect(data.title).toBeDefined();
  expect(data.price).toBeDefined();
  expect(data.category).toBeDefined();
  expect(data.description).toBeDefined();

  // Basic type checks (useful even if Ajv not available)
  expect(typeof data.id).toBe('number');
  expect(typeof data.title).toBe('string');
  expect(typeof data.price).toBe('number');
  expect(typeof data.category).toBe('string');
  expect(typeof data.description).toBe('string');

  // 5. Optional JSON Schema validation using Ajv (if installed). If Ajv isn't available we skip this step
  const productSchema = {
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      description: { type: 'string' },
    },
    required: ['id', 'title', 'price', 'category', 'description'],
    additionalProperties: true,
  } as const;

  try {
    // dynamic import so test still runs if ajv is not installed
    // to enable schema validation: npm i -D ajv
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AjvModule = await import('ajv');
    const Ajv = (AjvModule as any).default ?? AjvModule;
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(productSchema as any);
    const valid = validate(data);
    // If invalid, include the validation errors in the failure message
    expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors)}`).toBeTruthy();
  } catch (e) {
    // If Ajv isn't installed or import failed, just log and continue.
    // We already did basic type checks above.
    // eslint-disable-next-line no-console
    console.log('Ajv not available or failed to load — skipping JSON Schema validation. To enable install: npm i -D ajv');
  }

  // 6. Log product title and price
  // eslint-disable-next-line no-console
  console.log(`Product title: ${data.title}`);
  // eslint-disable-next-line no-console
  console.log(`Product price: ${data.price}`);
});
