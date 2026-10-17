import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Stamps the commit into index.html so the deploy workflow can wait until
// GitHub Pages serves the new build before running the smoke tests (spec §14).
function buildId(): Plugin {
  return {
    name: 'build-id',
    transformIndexHtml: (html) =>
      html.replace(
        '</head>',
        `  <meta name="build-id" content="${process.env.GITHUB_SHA ?? 'local'}" />\n  </head>`,
      ),
  }
}

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), buildId()],
  preview: { port: 4173, strictPort: true },
})
