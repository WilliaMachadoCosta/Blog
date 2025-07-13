const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Garanta que seus arquivos estão incluídos aqui
  ],
  theme: {
    extend: {
      colors: {
        // define cores como hex ou rgb, não oklch
        primary: '#10b981', // Exemplo
      },
      
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.blue.700"),
              textDecoration: "underline",
              fontWeight: "500",
              "&:hover": {
                color: theme("colors.blue.900"),
              },
            },
          },
        },
      }),
    },
    experimental: {
    optimizeUniversalDefaults: true,
  },
  },
  plugins: [require("@tailwindcss/typography")],
};
