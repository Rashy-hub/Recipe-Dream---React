/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                special: ['Special Elite', 'cursive'],
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(12.5%)' },
                    '50%': { transform: 'translateX(-12.5%)' },
                    '100%': { transform: 'translateX(12.5%)' },
                },
            },
            animation: {
                scroll: 'scroll 20s ease-in-out infinite',
            },
            screens: {
                'header-xl': '1160px',
            },
        },
    },
    plugins: [],
}
