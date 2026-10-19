# Engenharia de Qualidade Front Web — PlayLab

Automação de testes Front Web desenvolvida com **Playwright, TypeScript e Node.js**, utilizando a aplicação [PlayLab — Playwright Practice Arena](https://playwrightlab.github.io/).

O projeto apresenta uma estratégia de testes orientada a riscos, priorizando cobertura funcional, estabilidade, legibilidade, manutenção e capacidade de diagnóstico.

## 1. Objetivo

Implementar uma suíte de automação Front Web que demonstre boas práticas de engenharia de qualidade, incluindo:

- Análise de riscos e priorização de cenários.
- Automação de jornadas funcionais.
- Validação de componentes dinâmicos e assíncronos.
- Testes negativos e de acessibilidade.
- Execução em múltiplos navegadores e resolução mobile.
- Integração contínua com GitHub Actions.
- Geração de relatórios e evidências.

A proposta prioriza a relevância dos cenários e a sustentabilidade da solução, em vez da quantidade de testes implementados.

## 2. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Playwright | Framework de automação Front Web |
| TypeScript | Linguagem de desenvolvimento dos testes |
| Node.js | Ambiente de execução |
| npm | Gerenciamento de dependências |
| Git e GitHub | Versionamento e colaboração |
| GitHub Actions | Integração contínua |
| Playwright HTML Reporter | Relatórios e evidências |

## 3. Escopo implementado

Foram implementados **7 cenários automatizados**, distribuídos entre gerenciamento de usuários, formulários, componentes assíncronos e acessibilidade.

| ID | Cenário | Cobertura |
|---|---|---|
| USR-03 | Pesquisa de usuário existente | Validar filtragem e dados retornados |
| USR-05 | Ordenação de usuários | Validar ordenação crescente e decrescente por nome |
| USR-06 | Paginação | Validar a navegação e alteração dos registros |
| FRM-01 | Cadastro válido | Validar confirmação após submissão de dados válidos |
| FRM-02 | Campos obrigatórios vazios | Validar mensagens de erro e rejeição de dados incompletos |
| DYN-01 | Dropdown assíncrono | Validar carregamento e seleção de categoria |
| A11Y-01 | Nomes acessíveis | Validar a identificação acessível de campos obrigatórios |

A seleção foi definida considerando impacto, prioridade, diversidade da cobertura e custo de manutenção.

As justificativas completas estão disponíveis na [estratégia de testes](docs/estrategia-de-testes.md), na [matriz de riscos](docs/matriz-de-riscos.md) e na [matriz de cenários](docs/matriz-de-cenarios.md).

## 4. Estrutura do projeto

```text
front-web-qa-challenge/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── docs/
│   ├── estrategia-de-testes.md
│   ├── matriz-de-riscos.md
│   └── matriz-de-cenarios.md
├── tests/
│   ├── accessibility/
│   │   └── form-accessibility.spec.ts
│   ├── dynamic/
│   │   └── delayed-dropdown.spec.ts
│   ├── forms/
│   │   └── registration.spec.ts
│   └── users/
│       └── user-search.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

Os testes estão organizados por funcionalidade, facilitando sua localização, execução e manutenção.

A arquitetura foi mantida intencionalmente simples, evitando abstrações prematuras e preservando a clareza dos cenários.

## 5. Pré-requisitos

Para executar o projeto localmente, são necessários:

- Node.js em versão LTS compatível.
- npm.
- Git.
- Navegadores gerenciados pelo Playwright.
- Conexão com a internet para acessar a aplicação de testes.

## 6. Instalação

Clone o repositório:

```bash
git clone https://github.com/mburkoot/front-web-qa-challenge.git
```

Acesse a pasta:

```bash
cd front-web-qa-challenge
```

Instale as dependências:

```bash
npm ci
```

Instale os navegadores:

```bash
npx playwright install
```

Em ambientes Linux de CI, utilize a instalação dos navegadores com as dependências do sistema, conforme o workflow do GitHub Actions.

**Observação para Windows:** caso o PowerShell bloqueie os scripts do npm ou npx, os comandos podem ser executados por `npm.cmd` e `npx.cmd`.

## 7. Execução dos testes

### Executar a suíte completa

```bash
npx playwright test
```

### Executar somente no Chromium

```bash
npx playwright test --project=chromium
```

### Executar no Firefox

```bash
npx playwright test --project=firefox
```

### Executar no WebKit

```bash
npx playwright test --project=webkit
```

### Executar em resolução mobile

```bash
npx playwright test --project=mobile-chromium
```

### Executar um cenário específico

```bash
npx playwright test --project=chromium --grep "USR-03"
```

### Executar com interface visual do navegador

```bash
npx playwright test --project=chromium --headed
```

### Listar os testes disponíveis

```bash
npx playwright test --list
```

## 8. Estratégia de navegadores e responsividade

A execução foi distribuída da seguinte maneira:

| Projeto | Cenários | Configuração |
|---|---:|---|
| Chromium | 7 | Desktop |
| Firefox | 1 | Desktop |
| WebKit | 1 | Desktop |
| Mobile Chromium | 1 | 390 × 844 px |
| **Total** | **10 execuções** | **7 cenários distintos** |

A suíte principal é executada integralmente no Chromium. Os demais projetos reutilizam o cenário USR-03 para uma verificação seletiva de compatibilidade.

A estratégia busca equilibrar cobertura entre navegadores e custo de execução.

A configuração mobile utiliza uma viewport reduzida, sem substituir testes em dispositivos físicos ou uma análise visual completa de responsividade.

## 9. Estratégia de seletores

A automação prioriza localizadores sustentáveis e legíveis.

Foram utilizados:

- `getByRole()` para localizar elementos por papéis acessíveis.
- `getByTestId()` quando a aplicação fornece identificadores de teste.
- `getByPlaceholder()` quando o atributo identifica adequadamente o elemento.
- IDs específicos em situações de ambiguidade.
- Localização por contexto para componentes como tabelas.

Durante a implementação, foram identificados campos com placeholders repetidos. Nesses casos, os localizadores foram ajustados para evitar ambiguidades.

Foram evitados XPath absoluto e seletores baseados exclusivamente em posições fixas.

## 10. Estratégia de sincronização

Os testes utilizam mecanismos nativos de espera e asserção do Playwright.

A abordagem inclui:

- Asserções com espera automática, como `toBeVisible()` e `toBeEnabled()`.
- `expect.poll()` para aguardar condições específicas.
- Validação de alterações observáveis na interface.
- Verificação do estado final após as interações.

No cenário DYN-01, a automação aguarda o carregamento das opções antes de realizar a seleção.

Não foram utilizadas esperas fixas com `waitForTimeout()` como mecanismo de sincronização.

## 11. Estratégia de dados de teste

Foram utilizados dados fictícios e registros disponíveis na aplicação PlayLab.

Os testes foram implementados de forma independente, sem compartilhamento intencional de estado entre os cenários.

Os formulários utilizam informações fictícias, enquanto os testes da tabela consultam os registros de demonstração.

Como parte da suíte depende de dados predefinidos, alterações futuras nesses registros poderão exigir manutenção das asserções.

Em uma evolução do projeto, poderá ser adotada uma estratégia de preparação de dados por API, fixtures ou outros mecanismos de controle do ambiente.

## 12. Integração contínua — GitHub Actions

A automação está integrada ao GitHub Actions por meio do workflow:

`.github/workflows/playwright.yml`

A pipeline contempla:

1. Checkout do repositório.
2. Configuração do Node.js.
3. Instalação das dependências.
4. Instalação dos navegadores.
5. Execução automatizada dos testes.
6. Publicação dos relatórios e evidências.

A execução é configurada para eventos de push e Pull Request direcionados à branch `main`, além de permitir acionamento manual.

O workflow utiliza cache de dependências e preserva os artefatos produzidos pela execução quando aplicável.

## 13. Relatórios e evidências

O Playwright utiliza o HTML Reporter para apresentar o resultado da execução.

Para abrir o relatório localmente:

```bash
npx playwright show-report
```

As configurações também permitem:

- Captura de screenshots em caso de falha.
- Coleta de traces na primeira repetição de testes com falha.
- Consulta aos resultados individuais de cada cenário.

No GitHub Actions, os artefatos são disponibilizados na página da execução do workflow, permitindo consultar relatórios e arquivos de diagnóstico gerados.

Os arquivos temporários de execução não são versionados desnecessariamente no repositório.

## 14. Estratégia de versionamento

O desenvolvimento foi organizado em branches por responsabilidade:

- `feature/user-table-tests`
- `feature/form-tests`
- `feature/dynamic-a11y-mobile`
- `feature/mobile-ci`
- `docs/documentacao-final`

Foram utilizados commits incrementais e Pull Requests para organizar a evolução e integração das alterações.

A branch `main` concentra a versão integrada do projeto.

## 15. Limitações conhecidas

A solução possui limitações consideradas na definição do escopo:

- A cobertura é seletiva e não contempla todas as funcionalidades da PlayLab.
- Os testes da tabela dependem de registros de demonstração.
- A ordenação é validada sobre os registros exibidos na página, não sobre todo o conjunto paginado.
- A paginação utiliza expectativas relacionadas à quantidade atual de registros.
- A execução em outros navegadores é restrita a um cenário representativo.
- A validação de acessibilidade verifica nomes acessíveis, mas não constitui uma auditoria completa de conformidade com WCAG.
- A execução mobile utiliza uma resolução simulada.
- A disponibilidade da aplicação externa e possíveis falhas de rede podem influenciar a execução.

Essas limitações estão documentadas para orientar futuras melhorias.

## 16. Uso de Inteligência Artificial

Durante o desenvolvimento deste projeto, utilizei o **ChatGPT (OpenAI)** como ferramenta de apoio técnico, incluindo geração de código, sugestões de implementação, análise de cenários e elaboração da documentação.

### Atividades realizadas com apoio de IA

- Geração de versões iniciais dos testes automatizados em Playwright e TypeScript.
- Sugestões de seletores, asserções e estratégias de sincronização.
- Apoio na configuração de execução mobile, múltiplos navegadores e GitHub Actions.
- Geração inicial de partes da estratégia de testes, matrizes de riscos e cenários e README.
- Sugestões de melhorias na organização e legibilidade do código.

### Revisão, validação e ajustes

As implementações sugeridas foram submetidas a execuções locais e verificações do comportamento da aplicação.

Durante esse processo, foram identificados e tratados:

- **Seletores ambíguos:** substituição de localizadores que apresentavam erros de `strict mode violation` por IDs e `data-testid` específicos.
- **Cobertura funcional:** revisão da seleção de cenários, substituindo o teste negativo de pesquisa por ordenação e paginação.
- **Organização da suíte:** identificação e remoção de um teste de acessibilidade duplicado.
- **Sincronização:** utilização de asserções com espera automática e `expect.poll()`, evitando esperas fixas.
- **Execução:** validação local dos testes e acompanhamento da execução no GitHub Actions.

### Decisões técnicas e participação manual

Realizei a exploração manual da aplicação para identificar os comportamentos de pesquisa, ordenação, paginação, formulários e componentes assíncronos.

Também participei da revisão dos cenários, da identificação de falhas durante as execuções, da escolha de ajustes nos seletores e da organização do versionamento com branches, commits e Pull Requests.

A decisão de manter uma arquitetura simples, sem abstrações desnecessárias, considerou o escopo reduzido da suíte e a facilidade de manutenção.

### Considerações

A IA teve participação significativa na geração inicial de código e documentação. As sugestões foram revisadas durante o desenvolvimento e validadas por meio de execuções práticas.

A utilização da ferramenta não elimina a necessidade de compreender, manter e evoluir a solução, sendo a responsabilidade técnica pelo projeto de quem o entrega.

## 17. Próximos passos

Entre as possíveis evoluções estão:

- Ampliar a cobertura das ações de gerenciamento de usuários.
- Implementar cenários de upload e interações avançadas.
- Melhorar o gerenciamento e a geração de dados de teste.
- Expandir a validação de acessibilidade.
- Avaliar testes visuais para componentes críticos.
- Ampliar a cobertura entre navegadores.
- Monitorar a estabilidade da suíte e investigar possíveis testes intermitentes.

## 18. Considerações finais

O projeto foi desenvolvido com foco em qualidade, estabilidade, manutenibilidade e clareza das decisões técnicas.

A estratégia adotada demonstra a aplicação de princípios de engenharia de qualidade, desde a análise e priorização dos riscos até a automação, integração contínua e geração de evidências.

O objetivo foi construir uma solução de escopo controlado, capaz de evoluir conforme novas necessidades de cobertura e manutenção.
