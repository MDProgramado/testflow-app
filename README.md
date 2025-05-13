# TestflowApp

O *TaskFlow – Gerenciador de Tarefas de Produção e Manutenção* é um sistema simples de gerenciamento de tarefas que visa otimizar e organizar a execução de tarefas diárias em uma fábrica ou ambiente industrial. Ele facilita a visualização e o acompanhamento de tarefas, tanto para operadores quanto para técnicos de manutenção, com o objetivo de *aumentar a eficiência e minimizar falhas ou atrasos* no processo de produção.

### Funcionalidades do TestflowApp

#### 1. *Cadastro e Acompanhamento de Tarefas*

Cada tarefa tem:

* *Título*: Nome da tarefa.
* *Descrição*: Detalhes ou instruções sobre o que precisa ser feito.
* *Status*: Indicadores de progresso, como "Pendente", "Em Progresso" ou "Concluída".
* *Responsável*: Atribuição de tarefas para um operador ou técnico.
* *Prazo de Conclusão*: Quando a tarefa precisa ser finalizada.

#### 2. *Interface Simples e Intuitiva*

A aplicação pode ter:

* *Dashboard*: Um painel com tarefas pendentes e concluídas, além de gráficos simples de desempenho.
* *Lista de Tarefas*: Exibição de todas as tarefas programadas, com filtros por status, operador ou prazo.
* *Formulário de Tarefa*: Para criar ou editar tarefas, permitindo adicionar descrições detalhadas e definir o status e responsável.

#### 3. *Notificações e Alertas*

* *Notificações* para lembrar os operadores sobre tarefas pendentes ou quando o prazo está se aproximando.
* *Alertas* quando o número de tarefas ou o tempo de atraso ultrapassar um limite crítico.

#### 4. *Relatórios e Performance*

* *Relatório de Tarefas Concluídas*: Para que supervisores possam monitorar a produtividade de cada operador e o tempo médio de execução das tarefas.
* *Gráficos de Desempenho: Gráficos simples usando **Chart.js* ou *ngx-charts*, como total de tarefas concluídas por dia, tempo médio de execução, etc.


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
