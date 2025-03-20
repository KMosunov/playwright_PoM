import { expect, Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { BasePage } from './base-page'
import { Popup } from '../atoms/Popup'

export class OrderPage extends BasePage {
  readonly statusButton: Button
  readonly nameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly createOrderButton: Button
  readonly orderCreatedModal: Popup
  readonly orderCreatedOkButton: Button
  readonly orderCreatedCloseButton: Button
  readonly orderCreatedTitle: Locator
  readonly trackNumberTitle: Locator
  readonly statusModal: Popup
  readonly statusTitle: Locator
  readonly orderNumberField: Input
  readonly trackButton: Button

  constructor(page: Page) {
    super(page)
    this.nameField = new Input(page, '#name')
    this.phoneField = new Input(page, '#phone')
    this.commentField = new Input(page, '#comment')
    this.createOrderButton = new Button(page, '[data-name="createOrder-button"]')
    this.orderCreatedModal = new Popup(page, '[data-name="orderSuccessfullyCreated-popup"]')
    this.orderCreatedTitle = page.locator('h3.notification-popup__text')
    this.trackNumberTitle = page.locator('span.notification-popup__text')
    this.orderCreatedOkButton = new Button(
      page,
      '[data-name="orderSuccessfullyCreated-popup-ok-button"]',
    )
    this.orderCreatedCloseButton = new Button(
      page,
      '[data-name="orderSuccessfullyCreated-popup-close-button"]',
    )
    this.statusButton = new Button(page, '[data-name="openStatusPopup-button"]')
    this.statusModal = new Popup(page, 'searchOrder-popup')
    this.statusTitle = page.locator('.order-search-popup__label')
    this.orderNumberField = new Input(page, '[data-name="searchOrder-popup"] input')
    this.trackButton = new Button(page, 'button.order-search-popup__button')
  }
  async checkCreatedTitle(): Promise<void> {
    await expect(this.orderCreatedTitle).toBeVisible()
    await expect(this.orderCreatedTitle).toHaveText('Order has been created!')
  }

  async checkTrackCodeText(): Promise<void> {
    await expect(this.trackNumberTitle).toBeVisible()
    await expect(this.trackNumberTitle).toContainText('Tracking code:')
  }

  async checkStatusCodeTitle(): Promise<void> {
    await expect(this.statusTitle).toBeVisible()
    await expect(this.statusTitle).toContainText('Enter the tracking code')
  }

  async getOrderNumber(): Promise<number> {
    const orderNumber = await this.trackNumberTitle.innerText()
    return Number(orderNumber.split(':')[1])
  }
}
