const { _electron: electron } = require('playwright')
import {test, expect, Page} from '@playwright/test';


test('example test', async () => {
  const electronApp = await electron.launch({ args: ['main.js'] })
  const isPackaged = await electronApp.evaluate(async ({ app }) => {
    // This runs in Electron's main process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.isPackaged;
  });

  expect(isPackaged).toBe(false);

  // Wait for the first BrowserWindow to open
  // and return its Page object
  const page: Page = await electronApp.firstWindow()

  await page.type("#name", "Eli");
  await page.type("#mail", "myemail@123.com");
  await page.type("#pwd", "Password");

  await page.selectOption("#card", "mc");
  await page.type("#number", "1234123412341234");
  await page.type("#expiration", "03/03");

  await page.screenshot({ path: 'before.png' })

  await page.click("button:has-text('Validate')")

  await page.screenshot({ path: 'after.png' })

  // close app
  await electronApp.close()
});