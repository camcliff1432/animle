import { defineConfig } from "vite";

// The content security policy is added to production builds only, because the
// dev server needs a websocket and inline scripts for hot reload.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'none'"
].join("; ");

export default defineConfig({
  base: "./",
  plugins: [{
    name: "animle-csp",
    apply: "build",
    transformIndexHtml: (html) => html.replace(
      "<!--csp-->",
      // The artifact host applies its own policy, so the artifact build carries none.
      process.env.WG_ARTIFACT ? "" : `<meta http-equiv="Content-Security-Policy" content="${CSP}" />`
    )
  }],
  // Keep fonts as files so the policy never needs to allow data: fonts.
  build: { assetsInlineLimit: 0 },
  server: { port: 5183, strictPort: true },
  preview: { port: 4183, strictPort: true },
  test: { include: ["tests/**/*.test.js"] }
});
