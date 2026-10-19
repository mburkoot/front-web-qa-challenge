import { test, expect } from '@playwright/test';

test('A11Y-02 - Deve associar nomes acessíveis aos campos obrigatórios', async ({ page }) => {
  await page.goto('https://playwrightlab.github.io/');

  const campoNome = page.locator('#fullName');
  const campoEmail = page.getByTestId('input-email');
  const campoSenha = page.getByPlaceholder('Min 8 characters');

  await expect(campoNome).toHaveAccessibleName(/Full Name/i);
  await expect(campoEmail).toHaveAccessibleName(/Email Address/i);
  await expect(campoSenha).toHaveAccessibleName(/Password/i);
});