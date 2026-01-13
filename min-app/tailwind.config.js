/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "#1E40AF", // deeply saturated blue
                secondary: "#DBEAFE", // very light blue
                accent: "#F59E0B", // amber
                background: "#F8FAFC", // very light gray/blue
                text: "#1E293B", // slate 800
                textLight: "#64748B", // slate 500
                border: "#E2E8F0", // slate 200
            },
            fontFamily: {
                sans: ["Cairo_400Regular"],
                cairo: ["Cairo_400Regular"],
                "cairo-bold": ["Cairo_700Bold"],
                "cairo-medium": ["Cairo_500Medium"],
            },
            borderRadius: {
                lg: '8px',
                DEFAULT: '8px'
            },
            spacing: {
                xs: '8px',
                sm: '16px',
                md: '24px',
                lg: '32px',
                xl: '48px',
                xxl: '64px'
            }
        },
    },
    plugins: [],
}
