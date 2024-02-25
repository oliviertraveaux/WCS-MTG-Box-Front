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
            colors: {
                'primary-color': {
                    50: '#e2eaee',
                    100: '#b6cad4',
                    200: '#86a7b7',
                    300: '#55849a',
                    400: '#306985',
                    500: '#0c4f6f',
                    600: '#0a4867',
                    700: '#083f5c',
                    800: '#063652',
                    900: '#032640',
                },
                'secondary-color': {
                    50: '#f7efea',
                    100: '#ebd7cb',
                    200: '#debda9',
                    300: '#d0a386',
                    400: '#c68f6c',
                    500: '#bc7b52',
                    600: '#b6734b',
                    700: '#ad6841',
                    800: '#a55e38',
                    900: '#974b28',
                },
            },
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};
