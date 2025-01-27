import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
    theme: {
        extends: {
            colors: {
                primaryy: 'blue',
                'primary-foreground': '#fff',
            },
        },
    },
    plugins: [],
};

export default config;
