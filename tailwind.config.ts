import type { Config } from "tailwindcss";

/** Cores = tokens de src/styles/tokens.css (gerados de assets/design-tokens.json). Canais RGB em globals.css. */
const v = (name: string) => `rgb(var(--rgb-${name}) / <alpha-value>)`;

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        primary: v("primary"),
        secondary: v("secondary"),
        accent: v("accent"),
        text: v("text"),
        muted: v("muted"),
        paper: v("paper"),
        "paper-2": v("paper-2"),
        ink: v("ink"),
        "ink-muted": v("ink-muted"),
        "primary-deep": v("primary-deep"),
        whatsapp: v("whatsapp"),
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      screens: { xs: "420px" },
      keyframes: {
        pulseLine: { "0%": { transform: "translateX(-100%)" }, "100%": { transform: "translateX(400%)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: { pulseLine: "pulseLine 3.2s cubic-bezier(.4,0,.2,1) infinite" },
    },
  },
  plugins: [],
} satisfies Config;
