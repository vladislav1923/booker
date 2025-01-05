import { describe, it, expect, jest } from '@jest/globals';

jest.spyOn(global.console, 'log');

describe('@repo/trpc', () => {
    it('mock test', () => {
        expect(true).toBeTruthy();
    });
});
