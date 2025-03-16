import { Locator, Page } from '@playwright/test'

export class BaseModal {
  readonly page: Page
  readonly closeButton: Locator

  protected constructor(page: Page, selector: string) {
    this.page = page
    this.closeButton = page.locator(selector)
  }
}
