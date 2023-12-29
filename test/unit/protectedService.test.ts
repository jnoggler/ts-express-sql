import { expect, test, describe } from 'vitest'

import {createPrivateContent} from '../../src/api/protected/protectedService';

describe('Protected service tests', () => {
    test('Test private content response', () => {
        const response = createPrivateContent();
        expect(response).toBe('Top Secret!');
    });
});

