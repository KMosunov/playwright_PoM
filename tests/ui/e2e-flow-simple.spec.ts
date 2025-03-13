import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFoundPage } from '../pages/order-not-found'
import { OrderFoundPage } from '../pages/order-found'
import { OrderDetails } from '../pages/order-details'

test('signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkDisabled(true)
})

test('login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkDisabled(false)
  await orderCreationPage.nameField.checkVisible();
  await orderCreationPage.phoneField.checkVisible();
  await orderCreationPage.commentField.checkVisible()
  // verify at least few elements on the order creation page
})
  test('TL-18-1 Check footer on login page', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.open()
    await loginPage.checkFooterAttached();
    await loginPage.langButtonRu.checkVisible();
    await loginPage.langButtonEn.checkVisible();
    await loginPage.privacyPolicyLink.checkVisible();
    await loginPage.cookiePolicyLink.checkVisible();
    await loginPage.tosLink.checkVisible();

  })

test('TL-18-2 Check footer on order page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterAttached();
  await orderPage.langButtonRu.checkVisible();
  await orderPage.langButtonEn.checkVisible();
  await orderPage.privacyPolicyLink.checkVisible();
  await orderPage.cookiePolicyLink.checkVisible();
  await orderPage.tosLink.checkVisible();
})

test('TL-18-3 Check footer on order not found page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const notFoundPage = new OrderNotFoundPage(page)

  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.orderNumberField.fill('1213')
  await orderPage.trackButton.click()
  await notFoundPage.checkNotFoundTitle()


  await notFoundPage.checkFooterAttached();
  await notFoundPage.langButtonRu.checkVisible();
  await notFoundPage.langButtonEn.checkVisible();
  await notFoundPage.privacyPolicyLink.checkVisible();
  await notFoundPage.cookiePolicyLink.checkVisible();
  await notFoundPage.tosLink.checkVisible();
})

test.only('TL-18-4 Check order creation and order details', async ({page}) => {
  const loginPage = new LoginPage(page)
  const foundPage = new OrderFoundPage(page)
  const orderDetails = new OrderDetails(page)

  await loginPage.open()
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)

  await orderPage.nameField.fill(faker.internet.username())
  await orderPage.phoneField.fill(faker.phone.number())
  await orderPage.commentField.fill(faker.word.words(5))
  await orderPage.createOrderButton.click()
  await orderPage.orderCreatedPopUp()
  await foundPage.checkCreatedTitle()
  await foundPage.checkTrackCodeText()

  await orderPage.orderCreatedOkButton.click()
  await orderPage.statusButton.click()
  await orderPage.statusModalVisible()

  await orderPage.orderNumberField.fill('5902')
  await orderPage.trackButton.click()

  await orderDetails.checkOrderStatus()
  await orderDetails.checkStatusDescription()

  // const codeFull = await foundPage.trackNumberTitle.innerText()
  // // //const code = codeFull.split(':')
  // console.log(codeFull)

})
