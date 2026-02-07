import {test as basetest} from '@playwright/test';

type MyFixture = {
  variable: string;
};

const fixture = basetest.extend<MyFixture>({
  variable: 'my custom fixture',
});

export const test = fixture;
export const assert = fixture.expect;
export const desc = fixture.describe;