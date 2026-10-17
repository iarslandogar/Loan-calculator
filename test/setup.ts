// Vitest setup for the jsdom ("ui") project (spec §12.1).
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Testing Library only auto-cleans when test globals are enabled; they are not.
afterEach(() => {
  cleanup()
})

// jsdom has no matchMedia. Default: light mode, no changes.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

// Minimal dialog stubs so component tests that open the dialog don't crash.
// They prove nothing about dialog behaviour; that is tested in E2E only.
const dialogProto = HTMLDialogElement.prototype
if (typeof dialogProto.showModal !== 'function') {
  dialogProto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
}
if (typeof dialogProto.close !== 'function') {
  dialogProto.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
