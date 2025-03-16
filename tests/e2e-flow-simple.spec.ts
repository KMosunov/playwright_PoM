import { test } from '@playwright/test'
import { LoginPage } from './pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../config/env-data'
import { OrderNotFoundPage } from './pages/order-not-found'
import { OrderDetails } from './pages/order-details'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('TL-18-1 SignIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.checkVisible()
  await loginPage.passwordField.checkVisible()
  await loginPage.signInButton.checkVisible()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkDisabled(true)
})

test('TL-18-2 Error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(8))
  await loginPage.signInButton.checkDisabled(false)
  await loginPage.signInButton.click()
  await loginPage.authErrorPopup.checkVisible()
  await loginPage.authErrorPopup.checkErrorAuthText()
  await loginPage.authErrorCloseButton.checkVisible()
  await loginPage.authErrorCloseButton.click()
})

test('TL-18-3 Login with correct credentials and verify order creation page', async ({}) => {
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.checkDisabled(false)
  await orderPage.nameField.checkVisible()
  await orderPage.phoneField.checkVisible()
  await orderPage.commentField.checkVisible()
  await orderPage.logOutButton.checkVisible()
  await orderPage.logOutButton.checkDisabled(false)
})

test('TL-18-4 Check order creation', async () => {
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.nameField.fill(faker.internet.username())
  await orderPage.phoneField.fill(faker.phone.number())
  await orderPage.commentField.fill(faker.word.words(5))
  await orderPage.createOrderButton.click()
  await orderPage.orderCreatedModal.checkVisible()
  await orderPage.checkCreatedTitle()
  await orderPage.checkTrackCodeText()
  await orderPage.orderCreatedOkButton.click()
  await orderPage.orderCreatedOkButton.checkDisabled(false)
})
test('TL-18-5 Check order not found', async ({ page }) => {
  const orderNotFoundPage = new OrderNotFoundPage(page)
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.checkStatusCodeTitle()
  await orderPage.orderNumberField.checkVisible()
  await orderPage.trackButton.checkDisabled(false)
  await orderPage.orderNumberField.fill('101010101')
  await orderPage.trackButton.click()
  await orderNotFoundPage.checkNotFoundTitle()
})

test('TL-18-6 Check order details', async ({ page }) => {
  const orderDetails = new OrderDetails(page)
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.orderNumberField.fill('5902')
  await orderPage.trackButton.click()
  await orderDetails.checkOrderStatus()
  await orderDetails.checkStatusDescription()
})

test('TL-18-7 Check footer on login page', async () => {
  await loginPage.checkFooterAttached()
  await loginPage.langButtonRu.checkVisible()
  await loginPage.langButtonEn.checkVisible()
  await loginPage.privacyPolicyLink.checkVisible()
  await loginPage.cookiePolicyLink.checkVisible()
  await loginPage.tosLink.checkVisible()
})

test('TL-18-8 Check footer on order page', async () => {
  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.checkFooterAttached()
  await orderPage.langButtonRu.checkVisible()
  await orderPage.langButtonEn.checkVisible()
  await orderPage.privacyPolicyLink.checkVisible()
  await orderPage.cookiePolicyLink.checkVisible()
  await orderPage.tosLink.checkVisible()
})

test('TL-18-9 Check footer on order not found page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const notFoundPage = new OrderNotFoundPage(page)

  await loginPage.open()

  const orderPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderPage.statusButton.click()
  await orderPage.orderNumberField.fill('1213989898')
  await orderPage.trackButton.click()

  await notFoundPage.checkNotFoundTitle()
  await notFoundPage.checkFooterAttached()
  await notFoundPage.langButtonRu.checkVisible()
  await notFoundPage.langButtonEn.checkVisible()
  await notFoundPage.privacyPolicyLink.checkVisible()
  await notFoundPage.cookiePolicyLink.checkVisible()
  await notFoundPage.tosLink.checkVisible()
})
