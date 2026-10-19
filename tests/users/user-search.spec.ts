
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


test('USR-04 - Deve retornar nenhum usuário para pesquisa inexistente', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  const campoPesquisa = page.getByPlaceholder('Search users...');
  await campoPesquisa.fill('UsuarioInexistente12345');

  const tabelaUsuarios = page.getByRole('table').filter({
    has: page.getByRole('columnheader', { name: 'EMAIL' })
  });

  await expect(campoPesquisa).toHaveValue('UsuarioInexistente12345');
  await expect(
    tabelaUsuarios.getByRole('cell', { name: /@example\.com/i })
  ).toHaveCount(0);
});