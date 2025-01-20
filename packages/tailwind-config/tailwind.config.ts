import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
    theme: {
        colors: {
            primary: 'blue',
        },
    },
    plugins: [],
};

export default config;
