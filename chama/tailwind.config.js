const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Garanta que seus arquivos estão incluídos aqui
  ],
  theme: {
    extend: {
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
  },
  plugins: [require("@tailwindcss/typography")],
};
