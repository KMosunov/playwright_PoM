import { expect, Locator, Page } from '@playwright/test'
import { Input } from '../atoms/Input'
import { Button } from '../atoms/Button'
import { BasePage } from './base-page'

export class OrderPage extends BasePage{
  readonly statusButton: Button
  readonly nameField: Input
  readonly phoneField : Input
  readonly commentField: Input
  readonly createOrderButton: Button
  readonly statusModal: Locator
  readonly orderNumberField: Input
  readonly trackButton: Button
  readonly orderCreatedModal: Locator
  readonly orderCreatedOkButton: Button
  readonly orderCreatedCloseButton: Button


  //readonly createOrderTitle: Title
  //readonly privacyPolicyLink: Link
  // add more locators here

  constructor(page: Page) {
    super (page)
    this.statusButton = new Button(page, '[data-name="openStatusPopup-button"]')//page.getByTestId('openStatusPopup-button')
    this.nameField = new Input(page, '#name')
    this.phoneField = new Input(page, '#phone')
    this.commentField = new Input(page, '#comment')
    this.createOrderButton = new Button(page, '[data-name="createOrder-button"]')

    this.statusModal = page.getByTestId('searchOrder-popup')
    this.orderNumberField = new Input(page, '[data-name="searchOrder-popup"] input')
    this.trackButton = new Button(page, '[data-name="searchOrder-popup"] button.order-search-popup__button')
    this.orderCreatedModal = page.locator('[data-name="orderSuccessfullyCreated-popup"]')
    this.orderCreatedOkButton = new Button(page, '[data-name="orderSuccessfullyCreated-popup-ok-button"]')
    this.orderCreatedCloseButton = new Button(page, '[data-name="orderSuccessfullyCreated-popup-close-button"]')

  }

  async orderCreatedPopUp(): Promise<void> {
    await expect(this.orderCreatedModal).toBeVisible()
}

async statusModalVisible(): Promise<void> {
    await expect(this.statusModal).toBeVisible()
}

}
