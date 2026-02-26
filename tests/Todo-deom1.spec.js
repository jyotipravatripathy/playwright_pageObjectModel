import { test, expect } from '@playwright/test';
import {HomePage} from '../pages/homePage'

test('test To-do app @Sanity', async ({ page }) => {

  const Home = new HomePage(page);
  await Home.gotoHomePage();
  await Home.enterText('test3');
  await Home.selectCheckBox();
  
  
  // await page.goto('https://todomvc.com/examples/react/dist/');
  // await page.getByTestId('text-input').click();
  // await page.getByTestId('text-input').fill('Buy groceries');
  // await page.getByTestId('text-input').press('Enter');
  // await page.getByTestId('text-input').fill('go for walk');
  // await page.getByTestId('text-input').press('Enter');
  // await page.getByTestId('text-input').fill('rest');
  // await page.getByTestId('text-input').press('Enter');
  // await page.getByTestId('text-input').fill('play');
  // await page.getByTestId('text-input').press('Enter');
  // await page.getByRole('listitem').filter({ hasText: 'go for walk' }).getByTestId('todo-item-toggle').check();
  // await page.getByRole('listitem').filter({ hasText: 'Buy groceries' }).getByTestId('todo-item-toggle').check();
  // await expect(page.getByRole('listitem').filter({ hasText: 'rest' }).getByTestId('todo-item-toggle')).toBeVisible();
  // await page.getByRole('listitem').filter({ hasText: 'rest' }).getByTestId('todo-item-toggle').check();
  // await expect(page.getByTestId('todo-list')).toContainText('Buy groceries');
  // await page.getByText('rest').click();
  // await expect(page.locator('.to-do-list li')).toHaveCount(1);
});