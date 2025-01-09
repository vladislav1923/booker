import PresetConfig from '@repo/jest-config/node';

const Config = {
    ...PresetConfig,
    setupFiles: ['<rootDir>/src/__mocks__/env.mock.ts'],
};

export default Config;
