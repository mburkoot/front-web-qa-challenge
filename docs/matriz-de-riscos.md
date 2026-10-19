# Matriz de Riscos — PlayLab

## 1. Objetivo

Identificar e priorizar os principais riscos funcionais, técnicos, de experiência do usuário e de acessibilidade da aplicação PlayLab, orientando a seleção dos cenários automatizados.

A análise considera o impacto de uma possível falha, a relevância da funcionalidade, o valor da automação e o custo de implementação e manutenção.

## 2. Critérios de priorização

A classificação foi realizada de forma qualitativa, sem utilização de fórmula numérica.

### Impacto

- **Alto:** falha que compromete uma funcionalidade essencial ou impede a conclusão de uma jornada importante.
- **Médio:** falha que prejudica a utilização ou a confiabilidade de uma funcionalidade, sem necessariamente impedir toda a jornada.
- **Baixo:** falha pontual ou de menor impacto sobre a utilização da aplicação.

### Prioridade

- **P0 — Crítica:** cobertura essencial, priorizada na primeira implementação.
- **P1 — Alta:** cobertura relevante para qualidade, consistência e experiência do usuário.
- **P2 — Complementar:** cobertura que pode ser considerada em evoluções futuras.

A prioridade considera não apenas o impacto, mas também a abrangência da falha, a diversidade da cobertura, o valor da automação e o custo de manutenção.

## 3. Matriz de riscos

| ID | Jornada | Cenário | Risco protegido | Impacto | Prioridade | Automatizar? | Justificativa |
|---|---|---|---|---|---|---|---|
| USR-03 | Gerenciamento de usuários | Pesquisar usuário existente | Não localizar registros válidos ou apresentar dados incorretos | Alto | P0 | Sim | Funcionalidade essencial para localização e consulta de usuários |
| USR-05 | Gerenciamento de usuários | Ordenar registros por nome | Apresentar registros fora da sequência esperada | Médio | P1 | Sim | Garante consistência na organização das informações apresentadas |
| USR-06 | Gerenciamento de usuários | Navegar entre páginas | Impedir acesso aos registros de outras páginas | Alto | P1 | Sim | Protege a navegação e o acesso aos dados paginados |
| USR-04 | Gerenciamento de usuários | Pesquisar usuário inexistente | Apresentar resultados incorretos ou estado vazio inadequado | Médio | P2 | Não | Cenário válido, mas preterido para ampliar a cobertura com ordenação e paginação |
| USR-08 | Gerenciamento de usuários | Executar e validar uma ação disponível na tabela | Falha na execução ou na confirmação de uma ação sobre um usuário | Alto | P2 | Não | Requer análise adicional do comportamento da ação e estratégia de isolamento dos dados |
| FRM-01 | Formulário | Submeter dados válidos | Impedir a conclusão de um cadastro válido | Alto | P0 | Sim | Protege o fluxo positivo de cadastro |
| FRM-02 | Formulário | Submeter campos obrigatórios vazios | Aceitar informações incompletas | Alto | P0 | Sim | Verifica regras obrigatórias e rejeição de entradas inválidas |
| FRM-03 | Formulário | Informar e-mail inválido | Aceitar formato de e-mail incorreto | Médio | P2 | Não | Cobertura complementar às validações obrigatórias já selecionadas |
| DYN-01 | Componente assíncrono | Carregar opções dinamicamente | Interagir com opções indisponíveis ou não carregadas | Alto | P1 | Sim | Protege a sincronização e a seleção após carregamento assíncrono |
| A11Y-01 | Acessibilidade | Validar nomes acessíveis dos campos | Campos não serem identificados corretamente por tecnologias assistivas | Alto | P1 | Sim | Verifica a identificação semântica de controles essenciais |
| RSP-02 | Responsividade | Executar pesquisa em resolução mobile | Funcionalidade não operar adequadamente em tela reduzida | Médio | P1 | Sim — reutilização do USR-03 | Reexecuta a pesquisa em viewport de 390 × 844, sem criar um novo cenário funcional |
| CMP-01 | Compatibilidade | Executar pesquisa em Firefox e WebKit | Diferenças entre motores de navegador comprometerem a pesquisa | Médio | P1 | Sim — reutilização do USR-03 | Amplia a cobertura entre navegadores sem adicionar cenários funcionais |
| UPL-01 | Upload | Realizar upload de arquivo permitido | Falha no envio ou na validação do arquivo | Médio | P2 | Não | Funcionalidade complementar fora do escopo inicial |
| INT-01 | Interações | Realizar drag and drop | Componente não responder corretamente à interação | Médio | P2 | Não | Menor prioridade em relação às jornadas selecionadas |

*Observação: CMP-01 e INT-01 são identificadores internos adotados nesta matriz. RSP-02 e CMP-01 representam variações de execução do USR-03, não cenários funcionais adicionais.*

## 4. Riscos técnicos transversais

| Risco | Impacto | Estratégia de mitigação |
|---|---|---|
| Seletores frágeis | Alto | Priorizar roles, identificadores específicos e localização por contexto |
| Sincronização inadequada | Alto | Utilizar asserções com espera automática e condições observáveis |
| Testes intermitentes | Alto | Evitar esperas fixas, investigar falhas e preservar traces |
| Dependência entre testes | Alto | Manter cenários independentes e evitar compartilhamento de estado |
| Incompatibilidade entre navegadores | Médio | Executar cenários representativos em diferentes motores |
| Dificuldade de diagnóstico | Médio | Gerar relatórios HTML, screenshots e evidências de falha |
| Dependência de dados de demonstração | Médio | Documentar as premissas e evoluir para dados controlados quando necessário |

## 5. Justificativa da cobertura

Foram selecionados **sete cenários automatizados**, contemplando gerenciamento de usuários, formulários, componentes assíncronos e acessibilidade.

A estratégia priorizou a diversidade de comportamentos, reduzindo a concentração de testes em uma única funcionalidade.

### Gerenciamento de usuários

Foram priorizados pesquisa, ordenação e paginação por representarem comportamentos diferentes da tabela.

O cenário USR-04, que verifica o resultado de uma pesquisa inexistente, foi inicialmente considerado e implementado. Durante a revisão da cobertura, decidiu-se substituí-lo por cenários que ampliassem a diversidade de funcionalidades testadas.

O risco de aceitar entradas inválidas continuou contemplado por meio do cenário negativo FRM-02.

### Formulários

Foram selecionados os fluxos positivo e negativo porque protegem riscos complementares:

- **FRM-01:** verifica a aceitação de dados válidos e a confirmação da operação.
- **FRM-02:** verifica a rejeição de informações obrigatórias incompletas e a apresentação das mensagens de validação.

### Componentes assíncronos

O cenário DYN-01 foi selecionado para validar o carregamento de opções e a interação após a disponibilização dos dados, utilizando sincronização baseada em estados observáveis da interface.

### Acessibilidade

O cenário A11Y-01 verifica os nomes acessíveis dos campos obrigatórios do formulário.

Essa validação representa uma cobertura inicial de acessibilidade, mas não substitui testes manuais nem uma auditoria completa baseada nas WCAG.

### Responsividade e compatibilidade

O cenário USR-03 é reutilizado em diferentes configurações:

- Chromium Desktop.
- Firefox Desktop.
- WebKit Desktop.
- Chromium em viewport de 390 × 844 pixels.

Essa estratégia amplia a cobertura técnica sem aumentar desnecessariamente a quantidade de cenários funcionais.

**Resultado: sete cenários distintos e dez execuções configuradas.**

## 6. Cenários não automatizados

Os cenários classificados como fora do escopo não foram considerados irrelevantes.

Sua exclusão da primeira implementação está relacionada à priorização, à diversidade da cobertura e ao custo de implementação e manutenção.

Entre os cenários candidatos para evolução futura estão:

- Pesquisa sem resultados e validação do estado vazio.
- Ações de edição e exclusão de usuários.
- Validações adicionais de formulários.
- Upload de arquivos.
- Tabelas com dados e estruturas variáveis.
- Interações avançadas, como drag and drop.
- Navegação por teclado e outras verificações de acessibilidade.

A seleção desses cenários deverá considerar a evolução da aplicação e os riscos identificados em novas análises.

## 7. Revisão e manutenção dos riscos

A matriz deverá ser revisada quando ocorrerem:

- Alterações relevantes nas funcionalidades ou regras de negócio.
- Mudanças na estrutura ou comportamento dos componentes.
- Novos requisitos de acessibilidade e responsividade.
- Falhas recorrentes identificadas na execução automatizada.
- Alterações nos dados ou ambientes de teste.
- Necessidade de ampliar a cobertura funcional.

A priorização poderá ser ajustada conforme novas informações sobre impacto, probabilidade de falha e custo de manutenção.

## 8. Considerações finais

A análise de riscos orientou a implementação de uma suíte de escopo controlado, priorizando comportamentos relevantes e diferentes aspectos da qualidade Front Web.

A decisão de não automatizar todos os cenários identificados foi intencional, buscando equilibrar cobertura, estabilidade, legibilidade e sustentabilidade da solução.

Os riscos não cobertos permanecem documentados para apoiar futuras decisões de evolução da automação.