/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    content: ['./src/**/*.{html,ts}'],
    theme: {
        screens: {
            xs: { max: '599.98px' },
            // => @media (min-width: 599.98px) { ... }
            sm: '600px',
            // => @media (min-width: 600px) { ... }
            md: '960px',
            // => @media (min-width: 960px) { ... }
            lg: '1280px',
            // => @media (min-width: 1280px) { ... }
            xlg: '1920px',
            // => @media (min-width: 1920px) { ... }
        },
        extend: {
            height: {
                'full-header-less-mobile': 'calc(100% - 56px)',
                'full-header-and-footer-less': 'calc(100% - 128px)',
                'full-drawer': 'calc(100% - 72px)',
            },
        },
    },
    plugins: [],
};
