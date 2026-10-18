// Print session-01-conversation.html to PDF with Playwright's Chromium (already a dev dependency).
// Usage: node transcripts/make_pdf.cjs   (from the repo root)
const path = require('node:path')
const { chromium } = require('@playwright/test')

;(async () => {
  const dir = __dirname
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('file://' + path.join(dir, 'session-01-conversation.html').replace(/\\/g, '/'))
  await page.pdf({
    path: path.join(dir, 'session-01-conversation.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate:
      '<div style="font-size:8px;width:100%;text-align:center;color:#5b6576">Loan EMI Calculator · development transcript · page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
    margin: { top: '16mm', bottom: '18mm', left: '14mm', right: '14mm' },
  })
  await browser.close()
})()
