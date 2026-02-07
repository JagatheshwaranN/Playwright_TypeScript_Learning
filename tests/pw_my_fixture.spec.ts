import { assert } from './fixture/my-fixture';
import { test } from './fixture/my-fixture';

test('my fixture test', async ({ variable }) => {
    let val = variable.toUpperCase()
    assert(val).toBe('MY CUSTOM FIXTURE');
});