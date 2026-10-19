
import { test, expect } from '@playwright/test';

test('USR-03 - Deve filtrar usuários pelo nome', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  const campoPesquisa = page.getByPlaceholder('Search users...');
  await campoPesquisa.fill('Alice');

  const linhaUsuario = page.getByRole('row', { name: /Alice Johnson/ });

  await expect(linhaUsuario).toBeVisible();
  await expect(linhaUsuario).toContainText('alice@example.com');
  await expect(page.getByRole('row', { name: /Bob Smith/ })).toHaveCount(0);
});
