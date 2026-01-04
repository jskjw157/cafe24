/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                pirata: ['"Pirata One"', 'cursive'],
            },
            colors: {
                // Add specific colors if needed, but for now we follow the existing design
            }
        },
    },
    plugins: [],
}
