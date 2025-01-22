import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
    theme: {
        extends: {
            colors: {
                primary: 'blue',
                'primary-foreground': '#fff',
            },
        },
    },
    plugins: [],
};

export default config;
