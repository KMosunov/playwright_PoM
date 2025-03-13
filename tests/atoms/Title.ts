import { expect, Locator, Page } from '@playwright/test'

export class Title {
  readonly page: Page
  readonly titleLocator: Locator

  constructor(page: Page, selector: string) {
    this.page = page
    this.titleLocator = page.locator(selector)
  }

  async checkVisible(): Promise<void> {
    await expect(this.titleLocator).toBeVisible()
  }

}
