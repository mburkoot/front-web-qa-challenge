# Matriz de Cenários — PlayLab

## 1. Objetivo

Documentar os cenários de teste identificados na aplicação PlayLab, apresentando a cobertura selecionada para automação, os riscos protegidos, os critérios de priorização e o status de execução.

A seleção considera relevância funcional, diversidade da cobertura, estabilidade e custo de manutenção.

## 2. Critérios de classificação

**Tipos de teste**
- **Funcional positivo:** valida o comportamento esperado com entradas válidas.
- **Funcional negativo:** verifica a rejeição de entradas inválidas ou incompletas.
- **Assíncrono:** valida componentes com carregamento dinâmico.
- **Acessibilidade:** verifica propriedades relacionadas ao uso por tecnologias assistivas.
- **Responsividade:** verifica uma jornada em resolução reduzida.
- **Compatibilidade:** verifica comportamentos em diferentes motores de navegador.

**Prioridades**
- **P0 — Crítica:** cobertura essencial para a jornada.
- **P1 — Alta:** cobertura relevante para qualidade e experiência do usuário.
- **P2 — Complementar:** cobertura candidata a evoluções futuras.

## 3. Cenários selecionados para automação

| ID | Jornada | Descrição | Tipo de teste | Risco protegido | Prioridade | Automatizar? | Justificativa | Status |
|---|---|---|---|---|---|---|---|---|
| USR-03 | Gerenciamento de usuários | Pesquisar usuário existente e validar os dados retornados | Funcional positivo | Não localizar registros válidos ou apresentar resultados incorretos | P0 | Sim | Protege a funcionalidade de pesquisa e a confiabilidade dos resultados | Aprovado |
| USR-05 | Gerenciamento de usuários | Validar ordenação dos nomes apresentados na tabela | Funcional positivo | Exibir registros em sequência incorreta | P1 | Sim | Verifica a consistência da ordenação dos dados exibidos | Aprovado |
| USR-06 | Gerenciamento de usuários | Navegar entre páginas e validar a alteração dos registros | Funcional positivo | Apresentar registros incorretos ou impedir acesso a outras páginas | P1 | Sim | Verifica a navegação e a consistência dos dados paginados | Aprovado |
| FRM-01 | Formulário de cadastro | Preencher campos obrigatórios com dados válidos e validar confirmação | Funcional positivo | Rejeitar um cadastro válido ou não confirmar a operação | P0 | Sim | Protege o fluxo principal do formulário | Aprovado |
| FRM-02 | Formulário de cadastro | Submeter formulário sem preencher campos obrigatórios | Funcional negativo | Aceitar informações obrigatórias incompletas | P0 | Sim | Valida regras obrigatórias e mensagens de erro | Aprovado |
| DYN-01 | Dropdown assíncrono | Aguardar carregamento e selecionar uma categoria | Assíncrono | Interagir com opções indisponíveis ou não carregadas | P1 | Sim | Demonstra sincronização baseada em condições observáveis | Aprovado |
| A11Y-02 | Acessibilidade | Validar nomes acessíveis dos campos obrigatórios | Acessibilidade | Campos não serem identificados adequadamente por tecnologias assistivas | P1 | Sim | Verifica propriedades semânticas essenciais dos campos | Aprovado |

**Resultado:** sete cenários automatizados, aprovados na execução local em Chromium.

## 4. Cenários não selecionados

| ID | Jornada | Descrição | Tipo de teste | Risco protegido | Prioridade | Automatizar? | Justificativa | Status |
|---|---|---|---|---|---|---|---|---|
| USR-04 | Gerenciamento de usuários | Pesquisar usuário inexistente | Funcional negativo | Exibição incorreta do estado vazio | P2 | Não | Priorizadas ordenação e paginação para ampliar a diversidade da cobertura | Fora do escopo |
| USR-08 | Gerenciamento de usuários | Executar e validar uma ação disponível na tabela | Funcional | Alterações incorretas nos registros | P2 | Não | Necessita estratégia adicional de gerenciamento e isolamento de dados | Fora do escopo |
| FRM-03 | Formulário | Informar e-mail inválido | Funcional negativo | Aceitação de formato de e-mail incorreto | P2 | Não | Priorizada validação conjunta dos campos obrigatórios | Fora do escopo |
| UPL-01 | Upload | Realizar upload de arquivo permitido | Funcional positivo | Falha no processamento do arquivo | P2 | Não | Funcionalidade complementar em relação às jornadas prioritárias | Fora do escopo |
| DYN-03 | Componentes dinâmicos | Validar tabela com colunas em posições variáveis | Funcional dinâmico | Associação incorreta entre cabeçalhos e dados | P2 | Não | Cenário de evolução para ampliar a cobertura de componentes dinâmicos | Fora do escopo |
| A11Y-03 | Acessibilidade | Validar navegação por teclado | Acessibilidade | Controles inacessíveis por teclado | P2 | Não | Requer cobertura adicional além da validação pontual selecionada | Fora do escopo |

## 5. Estratégia de execução por ambiente

A suíte possui sete cenários distintos. Para ampliar a cobertura, o cenário USR-03 também é executado em outros ambientes.

| Ambiente | Cenários executados | Objetivo |
|---|---|---|
| Chromium Desktop | Todos os 7 cenários | Regressão principal |
| Firefox Desktop | USR-03 | Compatibilidade entre navegadores |
| WebKit Desktop | USR-03 | Compatibilidade entre motores de renderização |
| Chromium Mobile — 390 × 844 | USR-03 | Validação da pesquisa em resolução reduzida |

**Total:** 10 execuções de 7 cenários distintos.

A execução mobile reutiliza um teste funcional existente. Ela comprova a execução da jornada na resolução configurada, mas não substitui uma avaliação visual completa de responsividade ou testes em dispositivos físicos.

## 6. Estratégia de dados e sincronização

Os testes utilizam dados fictícios e registros disponíveis na aplicação de demonstração.

As validações são realizadas por meio de asserções específicas para os resultados esperados.

Para componentes assíncronos, são utilizadas condições observáveis da interface, evitando esperas fixas.

Os cenários são executados de forma independente, sem necessidade de uma ordem específica de execução.

## 7. Resultado e evidências

A suíte foi executada localmente com os seguintes resultados:

- 7 cenários aprovados no Chromium.
- 1 execução aprovada no Firefox.
- 1 execução aprovada no WebKit.
- 1 execução aprovada em resolução mobile.

**Resultado total: 10 execuções aprovadas.**

A pipeline do GitHub Actions também foi executada com sucesso, com disponibilização de relatório e artefatos para consulta.

## 8. Considerações finais

A cobertura foi selecionada para demonstrar diferentes capacidades de automação Front Web, sem priorizar a quantidade de testes em detrimento de sua qualidade.

A decisão de não automatizar todos os cenários identificados considera o valor funcional, o risco protegido e o custo de implementação e manutenção.

Os cenários não implementados permanecem documentados como candidatos para evolução futura da suíte.