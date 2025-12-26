import { test, expect, Page } from '@playwright/test';

const baseUrl = 'http://localhost:5173/';

async function gotoHomeEn(page: Page) {
  await page.addInitScript(() => {
    globalThis.localStorage.setItem('i18nextLng', 'en');
  });
  await page.goto(baseUrl);
}



test('Unit - has title (small test)', async ({ page }) => {
    await gotoHomeEn(page);
    await page.getAttribute("h1","products");
});



test('Unit - sidebar toggles open/close', async ({ page }) => {
  await gotoHomeEn(page);

  const sidebar = page.locator('.sidebar');

  await page.getByRole('button', { name: 'Filter' }).click();
  await expect(sidebar).toHaveClass(/open/);

  await page.locator('.close-btn').click();
  await expect(sidebar).not.toHaveClass(/open/);
});



test('Component - search loads product table', async ({ page }) => {
  await gotoHomeEn(page);

  await page.getByRole('button', { name: 'Search' }).click();
  const firstDataRow = page.getByRole('row').nth(1);
  await expect(firstDataRow).toBeVisible();
});



test('Integration - open first product and go back', async ({ page }) => {
  await gotoHomeEn(page);

  await page.getByRole('button', { name: 'Search' }).click();
  const firstDataRow = page.getByRole('row').nth(1);
  await expect(firstDataRow).toBeVisible();

  await firstDataRow.getByRole('button', { name: 'View' }).click();
  const productContainer = page.locator('.product_data').first();
  await expect(productContainer).toBeVisible();
  await expect(productContainer.locator('h2')).toBeVisible();

  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('row').nth(1)).toBeVisible();
});




// Full flow test
test('Full Flow', async ({ page }) => {
  await gotoHomeEn(page);
  await page.getByRole('button', { name: 'עברית' }).click();
  await page.getByRole('button', { name: 'סינון' }).click();
  await page.locator('.close-btn').click();
  await page.getByRole('button', { name: 'ערכת צבע כהה' }).click();
  await page.getByRole('button', { name: 'חפש' }).click();

  const firstDataRow = page.getByRole('row').nth(1);
  await expect(firstDataRow).toBeVisible();
  await firstDataRow.getByRole('button', { name: 'צפה' }).click();

  await page.getByRole('button', { name: 'חזור' }).click();
  await page.getByRole('button', { name: 'Page 3' }).click();
  const page3FirstRow = page.getByRole('row').nth(1);
  await expect(page3FirstRow).toBeVisible();
  await page3FirstRow.getByRole('button', { name: 'צפה' }).click();
});
