import { test, expect } from '@playwright/test';

test('verify login', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  const loginHeaderLoc = page.locator('.text-xl.font-bold.text-gray-900');
  const emailTxtFldLoc = page.locator('#email');
  const passTxtFldLoc = page.locator('#password');
  const signInBtnLoc = page.locator('#login-btn');

  await expect(loginHeaderLoc).toHaveText('Sign in to EventHub');
  await expect(emailTxtFldLoc).toBeVisible();
  await expect(emailTxtFldLoc).toHaveAttribute('placeholder', 'you@email.com');
  await expect(signInBtnLoc).toBeVisible();

  await expect(passTxtFldLoc).toBeVisible();
  await expect(page).toHaveURL(/\/login/);
  await expect(loginHeaderLoc).toHaveText('Sign in to EventHub');






 
});
