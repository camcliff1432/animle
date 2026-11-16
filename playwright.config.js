import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 60000,
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4183", trace: "off" },
  // Tests run against the production build, with its content security policy in place.
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4183",
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
    { name: "small-phone", use: { ...devices["Pixel 7"], viewport: { width: 360, height: 640 } } }
  ]
});
