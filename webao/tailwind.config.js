const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Garanta que seus arquivos estão incluídos aqui
  ],
  theme: {
    extend: {
      colors: {
        // Cores do Instagram
        'insta': {
          'pink': '#d62976',
          'orange': '#fa7e1e', 
          'yellow': '#feda75',
          'purple': '#962fbf',
          'blue': '#4f5bd5',
        },
        // Gradientes do Instagram
        'gradient': {
          'insta': 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
        }
      },
      backgroundImage: {
        'gradient-insta': 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
        'gradient-insta-hover': 'linear-gradient(45deg, #fed766, #f57c00, #c2185b, #7b1fa2, #303f9f)',
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
