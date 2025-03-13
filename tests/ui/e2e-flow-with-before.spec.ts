import { test } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.checkVisible()
  await loginPage.passwordField.checkVisible()
  await loginPage.signInButton.checkVisible()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkDisabled(true)
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(8))
  await loginPage.signInButton.checkDisabled(false)
  await loginPage.signInButton.click()
  await loginPage.authErrorPopup.checkVisible()
  await loginPage.authErrorPopup.checkErrorAuthText()
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.nameField.checkVisible()
  await orderCreationPage.phoneField.checkVisible()
  await orderCreationPage.commentField.checkVisible()
  await orderCreationPage.logOutButton.checkVisible()
  await orderCreationPage.logOutButton.checkDisabled(false)
  //await orderCreationPage.createOrderTitle.checkVisible()
  //await orderCreationPage.privacyPolicyLink.checkVisible()
  //await orderCreationPage.privacyPolicyLink.click()
  // verify at least few elements on the order creation page
})

test('login and create order', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  //await orderCreationPage.createOrderButton.checkDisabled(false)
  await orderCreationPage.nameField.fill(faker.internet.username())
  await orderCreationPage.phoneField.fill(faker.phone.number())
  await orderCreationPage.commentField.fill(faker.word.words(5))
  //await orderCreationPage.createOrderButton.click()
  //await orderCreationPage.orderCreatedPopup.checkVisible()
  //await orderCreationPage.orderCreatedPopup.orderCreatedPopupText()
  //await orderCreationPage.popupOkButton.checkDisabled(false)
  //await orderCreationPage.popupOkButton.click()

  // implement test
})
