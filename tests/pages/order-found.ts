import { BasePage } from './base-page'
import { expect, Locator, Page } from '@playwright/test'

export class OrderFoundPage extends BasePage {
  readonly orderCreatedTitle: Locator
  readonly trackNumberTitle: Locator
  constructor(page: Page) {
    super(page)
    this.orderCreatedTitle = page.locator('h3.notification-popup__text')
    this.trackNumberTitle = page.locator('span.notification-popup__text')
  }

  async checkCreatedTitle(): Promise<void> {
    await expect(this.orderCreatedTitle).toBeVisible()
    await expect(this.orderCreatedTitle).toHaveText('Order has been created!')

  }

  async checkTrackCodeText(): Promise<void> {
    await expect(this.trackNumberTitle).toBeVisible()
    await expect(this.trackNumberTitle).toContainText('Tracking code:')
  }


//   async getTrackingCode(): Promise<void> {
//     const trackingCodeInnerCode = this.trackNumberTitle()
//   }
//
//   static getTrack(): Promise<string> {
//
//
//   }
//
//   public class Main {
//   public static void main(String[] args) {
//   String userInfo = "135|bender|bender@gmail.com";
//   System.out.println(getUserEmail(userInfo));
//
// // }
//
// static String getUserEmail(String userInfo) {
//   String[] data = userInfo.split("\\|");
//   return data[2];
// }
// }


}