import PresetConfig from '@repo/jest-config/node';

const Config = {
    ...PresetConfig,
    setupFilesAfterEnv: ['<rootDir>/src/__tests__/mocks/prisma.mock.ts'],
};

export default Config;
