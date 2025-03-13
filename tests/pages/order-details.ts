import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderDetails extends BasePage {
  readonly orderStatus: Locator
  readonly statusDescription: Locator
  constructor(page: Page) {
    super(page)
    this.orderStatus = page.locator('[class="status-list__status status-list__status_active"]')
    this.statusDescription = page.locator('[class="status-list__description status-list__description_active"]')
  }

  async checkOrderStatus(): Promise<void> {
    await expect(this.orderStatus).toBeVisible()
    await expect(this.orderStatus).toHaveText('OPEN')

  }

  async checkStatusDescription(): Promise<void> {
    await expect(this.statusDescription).toBeVisible()
    await expect(this.statusDescription).toHaveText('Order has been created')
  }

}