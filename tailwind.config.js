/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontSize: {
                xxs: ["0.7rem"],
            },
        },
        screens: {
            md: "768px",
            lg: "1025px",
        },
    },
    plugins: [],
};
