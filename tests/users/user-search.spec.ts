
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



test('USR-05 - Deve ordenar usuários pelo nome', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  const tabelaUsuarios = page.getByRole('table').filter({
    has: page.getByRole('columnheader', { name: /EMAIL/i })
  });

  const colunaNome = tabelaUsuarios.getByRole('columnheader', {
    name: /^NAME\b/i
  });

  const cabecalhos = await tabelaUsuarios
    .getByRole('columnheader')
    .allTextContents();

  const indiceNome = cabecalhos.findIndex(
    texto => /^NAME\b/i.test(texto.trim())
  );

  expect(indiceNome).toBeGreaterThanOrEqual(0);

  const obterNomes = async (): Promise<string[]> => {
    const linhas = await tabelaUsuarios.locator('tbody tr').all();

    return Promise.all(
      linhas.map(async linha =>
        (await linha.getByRole('cell').nth(indiceNome).innerText()).trim()
      )
    );
  };

  const comparador = new Intl.Collator('en', {
    sensitivity: 'base'
  });

  await colunaNome.click();

  await expect.poll(async () => {
    const nomes = await obterNomes();

    return nomes.length > 1 && nomes.every(
      (nome, indice) =>
        indice === 0 ||
        comparador.compare(nomes[indice - 1], nome) <= 0
    );
  }).toBe(true);

  const nomesCrescentes = await obterNomes();

  await colunaNome.click();

  await expect.poll(async () => {
    const nomes = await obterNomes();

    return nomes.length > 1 && nomes.every(
      (nome, indice) =>
        indice === 0 ||
        comparador.compare(nomes[indice - 1], nome) >= 0
    );
  }).toBe(true);

  const nomesDecrescentes = await obterNomes();

  expect(nomesDecrescentes).not.toEqual(nomesCrescentes);
});




test('USR-06 - Deve navegar entre páginas da tabela', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  const tabelaUsuarios = page.getByRole('table').filter({
    has: page.getByRole('columnheader', { name: /EMAIL/i })
  });

  const linhasUsuarios = tabelaUsuarios.locator('tbody tr');

  await expect(linhasUsuarios).toHaveCount(5);

  const registrosPrimeiraPagina = await linhasUsuarios.allTextContents();

  await page.getByRole('button', { name: '2', exact: true }).click();

  await expect(
    page.getByText(/Showing 6-10 of 15 entries/i)
  ).toBeVisible();

  await expect(linhasUsuarios).toHaveCount(5);

  await expect.poll(
    async () => linhasUsuarios.allTextContents()
  ).not.toEqual(registrosPrimeiraPagina);
});
