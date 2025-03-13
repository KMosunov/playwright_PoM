import { expect, Locator, Page } from '@playwright/test'

export class Popup {
  readonly page: Page
  readonly popupLocator: Locator

  constructor(page: Page, selector: string) {
    this.page = page
    this.popupLocator = page.locator(selector)
  }

  async checkVisible(): Promise<void> {
    await expect(this.popupLocator).toBeVisible()
  }

  async checkErrorAuthText(): Promise<void> {
    await expect(this.popupLocator).toContainText('Incorrect credentials')
  }
    async orderCreatedPopupText(): Promise<void> {
      await expect (this.popupLocator).toContainText('Order has been created!')
    }
}
