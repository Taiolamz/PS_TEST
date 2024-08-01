import { Lexend } from "next/font/google";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
      boxShadow: {
        "custom-box-shadow-100": "0 8px 24px -4px rgba(2, 17, 70, 0.08)",
      },
      // this was added here for the landing page
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-light": "rgba(255, 255, 255, 0.5)",
        "custom-gray": "rgba(229, 233, 235, 1)",
        "custom-bg": "rgba(246, 248, 249, 1)",
        "custom-yellow": "rgba(255, 192, 67, 1)",
        "custom-gray-scale-white": "rgba(255, 255, 255, 1)",
        "custom-transparent": "rgba(255, 255, 255, 0.08)",
        "custom-gray-scale-400": "rgba(110, 124, 135, 1)",
        "custom-dark-blue": "rgba(22, 34, 56, 1)",
        "custom-light-border": "rgba(229, 233, 235, 0.2)",
        "custom-dark-gray": "rgba(37, 44, 50, 1)",
        "custom-blue-color": "rgba(3, 38, 130, 1)",
        "custom-dark-gray-300": "rgba(30, 30, 30, 1)",
        "custom-light-gray": "rgba(244, 244, 244, 1)",
        "custom-red": "rgba(204, 9, 5, 1)",
        "custom-secondary": "rgba(90, 91, 95, 1)",
        "custom-ash": "rgba(91, 104, 113, 1)",
        "custom-divider": "rgba(229, 233, 235, 1)",
        "custom-gray-scale-300": "rgba(154, 166, 172, 1)",
        "custom-dark-gray-200": "rgba(62, 67, 69, 1)",
        "custom-hover": "rgba(4, 172, 172, 1)",
        "custom-notify-red": "rgba(241, 79, 76, 1)",
        "custom-light-gray-scale": "rgba(250, 253, 255, 1)",
        warning: "rgba(255, 192, 67, 1)",
        "custom-light-blue": "rgba(64, 148, 247, 1)",
        "custom-dark": "rgba(0, 0, 0, 1)",
        "custom-gray-2": "rgba(244, 245, 247, 1)",
        "custom-light-gray-100": "rgba(250, 250, 250, 1)",
        "modal-bg-100": "rgba(250, 253, 255, 1)",
        "light-blue-100": "rgba(0, 128, 128, 0.05)",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "rgba(0, 128, 128, 1)",
          // DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        layoutBg: "#228f8f",
        layoutHeader: "#F4F4F4",
        grayDivider: "#E5E9EB",
        grayScale: "#9AA6AC",
        grayText: "#6E7C87",
        grayDark: "#252C32",
        graySecondary: "#162238",
        danger: "#CC0905",
        pry: "#008080",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      height: {
        "screen-20": "calc(100vh - 35vh)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
