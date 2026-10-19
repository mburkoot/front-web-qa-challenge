# Estratégia de Testes — PlayLab

## 1. Objetivo

Definir uma estratégia de automação Front Web para a aplicação PlayLab, priorizando cenários de maior relevância funcional, estabilidade, facilidade de manutenção e capacidade de diagnóstico.

## 2. Escopo

A automação contempla:

- Pesquisa, ordenação e paginação da tabela de usuários.
- Submissão válida do formulário de cadastro.
- Validação de campos obrigatórios não preenchidos.
- Carregamento e seleção de opções assíncronas.
- Validação de nomes acessíveis dos campos obrigatórios.
- Execução seletiva em diferentes navegadores e resolução mobile.
- Integração contínua por meio do GitHub Actions.

## 3. Fora do escopo

Nesta primeira implementação, não serão automatizados:

- Exclusão e edição de usuários.
- Upload de arquivos.
- Drag and drop e demais interações avançadas.
- Fluxos completos de autenticação e compras.
- Testes de carga, estresse e segurança.
- Avaliação completa de acessibilidade segundo WCAG.

Esses cenários poderão ser avaliados em futuras evoluções, considerando risco e necessidade de cobertura.

## 4. Riscos identificados

### Riscos funcionais
- Pesquisa retornar registros incorretos.
- Ordenação não respeitar a sequência esperada.
- Paginação não apresentar os registros correspondentes.
- Formulário aceitar dados obrigatórios incompletos.
- Formulário rejeitar entradas válidas.

### Riscos técnicos
- Seletores frágeis diante de alterações da interface.
- Falhas intermitentes causadas por carregamentos assíncronos.
- Diferenças de comportamento entre navegadores.
- Dependência de dados fixos.
- Instabilidade de rede ou ambiente de execução.

### Riscos de experiência do usuário
- Funcionalidades indisponíveis em resoluções menores.
- Ausência de feedback após operações.
- Dificuldade para localizar registros.

### Riscos de acessibilidade
- Campos sem nomes acessíveis.
- Controles não identificáveis por tecnologias assistivas.
- Possíveis problemas de navegação por teclado não contemplados nesta suíte.

## 5. Critérios de priorização

Os cenários foram selecionados considerando impacto funcional, probabilidade de falha, valor da automação e custo de manutenção.

- **P0 — Crítica:** funcionalidades essenciais cuja falha compromete uma jornada importante.
- **P1 — Alta:** funcionalidades relevantes para a experiência e consistência da aplicação.
- **P2 — Média ou baixa:** cenários complementares que podem ser incorporados futuramente.

A priorização é qualitativa, sem utilização de fórmula numérica.

## 6. Estratégia de automação

A implementação utiliza Playwright com TypeScript e Node.js.

Foram priorizados:

- Testes independentes.
- Seletores semânticos, IDs e atributos específicos.
- Asserções relacionadas ao comportamento esperado.
- Sincronização por condições observáveis.
- Ausência de esperas fixas.
- Organização dos arquivos por funcionalidade.

A estrutura foi mantida simples, evitando abstrações que não apresentassem benefício significativo para o tamanho atual da suíte.

## 7. Cobertura automatizada

| ID | Cenário | Prioridade |
|---|---|---|
| USR-03 | Pesquisa de usuário existente | P0 |
| USR-05 | Ordenação por nome | P1 |
| USR-06 | Paginação da tabela | P1 |
| FRM-01 | Cadastro com dados válidos | P0 |
| FRM-02 | Validação de campos obrigatórios | P0 |
| DYN-01 | Carregamento assíncrono de opções | P1 |
| A11Y-01 | Validação de nomes acessíveis | P1 |

## 8. Navegadores e resoluções

- **Chromium:** execução completa dos sete cenários.
- **Firefox:** execução seletiva de pesquisa de usuários.
- **WebKit:** execução seletiva de pesquisa de usuários.
- **Mobile Chromium:** execução da pesquisa em viewport de 390 × 844 pixels.

A execução seletiva foi escolhida para equilibrar cobertura de compatibilidade e tempo de execução.

A configuração mobile verifica o comportamento em uma resolução reduzida, não substituindo testes em dispositivos físicos.

## 9. Critérios de entrada e saída

### Entrada
- Aplicação acessível.
- Ambiente de execução configurado.
- Dependências e navegadores instalados.
- Cenários e resultados esperados definidos.

### Saída
- Cenários prioritários implementados.
- Testes executados e resultados analisados.
- Pipeline executada.
- Relatórios e evidências disponibilizados.
- Limitações conhecidas documentadas.

## 10. Frequência de execução

- **Pull Requests:** regressão automatizada para identificar problemas antes da integração.
- **Push na main:** execução da suíte após alterações integradas.
- **Sob demanda:** execução manual para investigação e validação de alterações.

## 11. Evidências e diagnóstico

O Playwright gera relatório HTML e pode capturar screenshots de falha e traces durante novas tentativas.

O GitHub Actions executa a automação e disponibiliza os artefatos produzidos para consulta.

## 12. Limitações conhecidas

- A suíte cobre uma seleção de funcionalidades, não a aplicação inteira.
- Alguns cenários utilizam dados de demonstração existentes.
- A ordenação é validada sobre os registros apresentados na página.
- A validação automatizada de acessibilidade é pontual e não substitui uma auditoria completa.
- A execução mobile utiliza viewport reduzido.
- Falhas externas de rede podem afetar a execução.

## 13. Próximos passos

- Expandir a cobertura de gerenciamento de usuários.
- Implementar dados de teste mais flexíveis.
- Ampliar validações de acessibilidade.
- Avaliar testes de regressão visual.
- Aumentar a cobertura entre navegadores conforme risco.
- Monitorar e reduzir possíveis testes intermitentes.
