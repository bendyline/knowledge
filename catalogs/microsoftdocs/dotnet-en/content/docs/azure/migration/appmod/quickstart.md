---
title: Assess and migrate a .NET project with GitHub Copilot modernization for .NET
ms.reviewer: alexwolf
description: Assess and migrate your .NET project with GitHub Copilot. Learn how to evaluate migration readiness and start modernizing your app effectively.
ms.topic: quickstart
ms.custom: devx-track-dotnet
ms.date: 01/26/2026
zone_pivot_groups: copilot-modernization-migrate
#customer intent: As a .NET developer, I want to assess my project's migration readiness so that I can identify potential challenges and plan the modernization process effectively.
---

# Quickstart: Assess and migrate a .NET project with GitHub Copilot modernization for .NET

In this quickstart, you assess and migrate a .NET project by using GitHub Copilot modernization for .NET. You complete the following tasks:

- Assess a sample project (Contoso University)
- Start the migration process

**Applies to: visualstudio**


## Prerequisites


- Windows Operating System.
- [Visual Studio 2026](https://visualstudio.microsoft.com/downloads/) (or Visual Studio 2022 version 17.14.17 and newer).
- [.NET desktop development workload](https://learn.microsoft.com/visualstudio/install/modify-visual-studio?view=visualstudio\&preserve-view=true#change-workloads-or-individual-components) with the following optional components enabled:

  - GitHub Copilot
  - GitHub Copilot modernization agent

- GitHub Copilot Subscription (paid or free).

- [Signed in to Visual Studio using a GitHub account](https://learn.microsoft.com/visualstudio/ide/work-with-github-accounts) with [Copilot access](https://docs.github.com/copilot/get-started/plans#ready-to-choose-a-plan).

  > **Important:**
  > If you change subscriptions, you must restart Visual Studio.

- Code must be written in C#.

> **Note:**
> These prerequisites apply to Visual Studio. For other development environments, see [Install GitHub Copilot modernization](install.md).


## Assess app readiness

GitHub Copilot modernization for .NET assessment helps you find app readiness challenges, learn their impact, and see recommended migration tasks. Each migration task includes references to set up Azure resources, add configurations, and make code changes. Follow these steps to start your migration:

1. Clone the [.NET migration copilot samples](https://github.com/Azure-Samples/dotnet-migration-copilot-samples) repository to your computer.

1. In Visual Studio, open the **Contoso University** solution from the samples repository.

1. In Solution Explorer, right-click the solution node and select **Modernize**.

    Screenshot that shows the modernize option in the context menu.

1. The GitHub Copilot Chat window opens with a welcome message and predefined options. Select **Migrate to Azure** from the available choices and send it to Copilot.

    Screenshot that shows the welcome message with migration options.

    > **Tip:**
    > Instead of steps 3 and 4, you can open **GitHub Copilot Chat** directly and send `@Modernize Migrate to Azure` to start the assessment and migration flow.

1. A new Copilot chat session opens and shows the welcome message. The assessment starts automatically and analyzes your project for migration readiness.

    Screenshot that shows assessment in progress with status indicators.

1. When the assessment finishes, you see a comprehensive assessment report UI page and a list of migration tasks in the chat window.

    Screenshot that shows the generated assessment report with detailed findings.

## App migrations

GitHub Copilot modernization for .NET includes [predefined tasks](predefined-tasks.md) for common migration scenarios and follows Microsoft's best practices.

### Start a migration task

Start a migration task in one of the following ways:

**Option 1. Run from the Assessment Report**

Select the **Run Task** button in the Assessment Report from the previous step to start a migration task.

**Option 2. Send in Copilot Chat**

Send the migration task number (for example, 1.1) or its name in the chat.

Screenshot of sending a message in Copilot Chat to start a migration task.

### Plan and progress tracker generation

- When you start the migration, GitHub Copilot starts a session named "Modernization: migrate from `<source technology>` to `<target technology>`" in agent mode with predefined prompts.
- The tool creates two files in the `.appmod/.migration` folder:
  - `plan.md`: The overall migration plan.
  - `progress.md`: A progress tracker that GitHub Copilot updates as it completes tasks.
- Edit these files to customize your migration before you continue.

### Start code remediation

- If you're satisfied with the plan and progress tracker, enter a prompt to start the migration process, such as:

    ```console
    The plan and progress tracker look good to me. Go ahead with the migration.
    ```

- GitHub Copilot starts the migration process and might ask for your approval to use knowledge base tools in the Model Context Protocol (MCP) server. Grant permission when prompted.
- Copilot follows the plan and progress tracker to:
  - Manage dependencies.
  - Apply configuration changes.
  - Make code changes.
  - Build the solution, fix all compilation and configuration errors, and ensure a successful build.
  - Fix security vulnerabilities.

## Default chat messages

GitHub Copilot modernization for .NET provides default chat message options to streamline your workflow.

Screenshot that shows default chat message options in the Copilot Chat.

Choose one of the predefined options and send it in the chat:

- **Run modernization assessment**: Starts a new assessment of your application to identify migration readiness issues and Azure compatibility challenges.
- **View assessment report**: Opens the previous assessment report and shows a summary of migration tasks based on the results. If no previous assessment exists, it runs a new assessment first.
- **Browse top migration tasks**: Shows recommended migration tasks and common modernization scenarios, regardless of any specific assessment results.

> **Tip:**
> These default messages help you quickly navigate common workflows without typing custom prompts. You can also enter your own messages to interact with Copilot for specific questions or needs.

## Next steps

- [Working with assessment](working-with-assessment.md)
- [Predefined Tasks](predefined-tasks.md)
- [Frequently Asked Questions](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/migration/appmod/faq.yml)



**Applies to: vscode**


## Prerequisites

- A GitHub account with an active [GitHub Copilot](https://github.com/features/copilot) subscription under any plan.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/). Must be version 1.101 or later.

  - [GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/overview). For setup instructions, see [Set up GitHub Copilot in Visual Studio Code](https://code.visualstudio.com/docs/copilot/setup). Be sure to sign in to your GitHub account within Visual Studio Code.
  - [GitHub Copilot modernization](https://marketplace.visualstudio.com/items?itemName=vscjava.migrate-java-to-azure). Restart Visual Studio Code after installation.

- A .NET development environment to build and test the project.

## Assess app readiness

GitHub Copilot modernization for .NET assessment helps you find app readiness challenges, learn their impact, and see recommended migration tasks. Each migration task includes references to set up Azure resources, add configurations, and make code changes. Follow these steps to start your migration:

1. Clone the [.NET migration copilot samples](https://github.com/Azure-Samples/dotnet-migration-copilot-samples) repository to your computer.

1. In Visual Studio Code, open the **Contoso University** solution from the samples repository.

1. Open the **GitHub Copilot modernization** extension.

1. In the **QUICKSTART** section, select **Start Assessment**. The **Assessment reports** page opens.

1. Select **Run Assessment** in the upper-right corner of the page.

    Screenshot of run a task in tasks section to start a migration task.

1. The assessment starts automatically and analyzes your project for migration readiness.

    Screenshot of run a task analyzing your project for migration readiness.

1. When the assessment finishes, you see a comprehensive assessment report UI page and a list of migration tasks in the chat window.

    Screenshot of run an assessment report UI page and a list of migration tasks.

## App migrations

GitHub Copilot modernization for .NET includes [predefined tasks](predefined-tasks.md) for common migration scenarios and follows Microsoft's best practices.

### Chat-based migration (recommended)

Chat-based migration is the recommended way to start a migration. The `AppModernization-DotNet` custom agent is optimized for application modernization tasks. This agent lets you use simple, natural language prompts to perform complex migration scenarios.

Complete the following steps to select the custom agent and start the migration:

1. Make sure you have a .NET project open in Visual Studio Code.

1. Select the chat icon in the **Activity Bar** to open the Copilot chat window.

1. In the chat window, locate the agent selector dropdown menu at the top of the chat input box. Select **AppModernization-DotNet** from the list. This custom agent is designed for .NET application modernization and migration scenarios.

   Screenshot of selecting the .NET custom agent in the chat window.

1. Enter a prompt using the format `migrate from <source> to <target>` in the chat window. For example:

   ```text
   migrate from rabbitmq to Azure service bus
   ```

1. The agent analyzes your code, creates a migration plan, makes code changes, runs validations, and generates a summary. Select **Continue** to proceed through each step and **Keep** to accept the changes.

### Start a migration task from the UI

You can also start a migration task from the UI:

**Option 1. Run from the Assessment Report**

Select the **Run Task** button in the Assessment Report from the previous step to start a migration task.

**Option 2. Apply a predefined task**

Run the specific task in the **TASKS - .NET** section. For example, the **Migrate Database to Azure Database for PostgreSQL** task under **Database Tasks** updates your database connection, configurations, dependencies, and data access code to use Azure Database for PostgreSQL.

Screenshot of running a specific predefined task.

### Plan and progress tracker generation

When you start the migration, GitHub Copilot starts a session in agent mode.

The tool creates two files in the `.github/appmod/code-migration/<target-branch-name>` folder:

- `plan.md`: The overall migration plan.
- `progress.md`: A progress tracker that GitHub Copilot updates as it completes tasks.

Edit these files to customize your migration before you continue.

Screenshot of plan generation during a migration task.

### Start code remediation

When you're satisfied with the plan and progress tracker, enter **continue** to start the migration.

GitHub Copilot starts the migration process and might ask for your approval to use knowledge base tools in the Model Context Protocol (MCP) server. Grant permission when prompted.

Copilot follows the plan and progress tracker to:

- Manage dependencies.
- Apply configuration changes.
- Make code changes.
- Build the project, fix all compilation and configuration errors, and ensure a successful build.
- Fix security vulnerabilities.

Repeatedly select or enter **Continue** to confirm the use of tools or commands and wait for the code changes to finish.

> **Note:**
> In Visual Studio Code, modernization uses the `AppModernization-DotNet` custom agent with Claude Sonnet 4.5 by default for best results when updating .NET code to migrate to Azure. It falls back to the 'auto' model if Sonnet 4.5 isn't available to you. You can configure the custom agent to [modify the 'model' setting](https://code.visualstudio.com/docs/copilot/customization/custom-agents#_custom-agent-file-structure) by selecting **Configure Custom Agents** from the **Agent** menu. Alternatively, you can use the language model picker in the chat window to switch models for the current chat session.

### Validation iteration

After the code changes finish, the migration tool starts a validation and fix iteration loop. This loop includes the following five steps:

1. Detect Common Vulnerabilities and Exposures (CVEs) in current dependencies and fix them.
1. Build the project and resolve any build errors.
1. Analyze the code for functional consistency.
1. Analyze the project for unit test failures and automatically generate a plan to fix them until the tests pass.
1. Analyze the code for migration items missed in the initial code migration and fix them.

After all processes complete, the migration tool generates a summary. Review the code changes and confirm them by selecting **Keep**.



**Applies to: copilot-cli**


## Prerequisites

- A GitHub account with an active [GitHub Copilot](https://github.com/features/copilot) subscription under any plan.
- [Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) installed.

## Install the plugin

1. In a terminal, run `copilot` to start Copilot CLI.

    ```bash
    copilot
    ```

1. Add the marketplace and install the plugin:

    ```text
    /plugin marketplace add microsoft/github-copilot-modernization
    /plugin install github-copilot-modernization@github-copilot-modernization
    ```

1. Verify the plugin is installed:

    ```text
    /plugin list
    ```

    You should see `github-copilot-modernization` in the list.

## Assess app readiness

GitHub Copilot modernization assessment helps you find app readiness challenges, learn their impact, and see recommended migration tasks.

1. Clone the [.NET migration copilot samples](https://github.com/Azure-Samples/dotnet-migration-copilot-samples) repository to your computer.

1. Navigate to the **Contoso University** project folder:

    ```bash
    cd dotnet-migration-copilot-samples/ContosoUniversity
    ```

1. Start Copilot CLI with the modernization agent:

    ```bash
    copilot --agent=github-copilot-modernization:modernize
    ```

    > **Important:**
    > You must select the `github-copilot-modernization:modernize` agent before running any modernization prompts. If you're already in a Copilot CLI session, use `/agent` and select `github-copilot-modernization:modernize` from the list.

1. Ask the agent to assess the application:

    ```text
    copilot> modernize my application
    ```

    The agent automatically starts the assessment phase and analyzes your project for migration readiness—including dependencies, frameworks, and Azure migration opportunities.

1. When the assessment finishes, the agent presents a summary of findings and asks: **"Proceed to planning?"**

## Migrate your app

After reviewing the assessment, continue through the planning and execution phases.

### Full modernization (assess → plan → execute)

The agent runs the complete workflow automatically when you confirm each phase:

1. **Assessment** → Review findings → Confirm to proceed.
1. **Planning** → The agent generates a migration plan (`plan.md`) → Review and confirm.
1. **Execution** → The agent routes tasks to specialized executor agents that apply code changes, run builds, and validate results.

The agent handles everything—just confirm at each checkpoint.

### Specific migration task

If you already know what you want to migrate, skip the assessment and go straight to execution:

```text
copilot> migrate from local SQL Server to Azure SQL Database
```

For multiple tasks, list them:

```text
copilot> migrate from RabbitMQ to Azure Service Bus and upgrade to .NET 9
```

### Unattended execution

For fully autonomous execution without prompts, use the `--allow-all` flag:

```bash
copilot --agent=github-copilot-modernization:modernize --allow-all
```

### Enterprise playbook

To embed modernization policies, place Markdown files in the `.github/modernize/playbook/` directory. During the planning phase, playbook constraints merge with assessment results—playbook policies take precedence over assessment recommendations.

For more information, see [Migrate .NET apps to Azure using GitHub Copilot modernization in Copilot CLI](copilot-cli-support.md#define-enterprise-modernization-policies).

### Validation

After the agent applies code changes, it runs validation checks:

1. Builds the project and resolves any build errors.
1. Detects Common Vulnerabilities and Exposures (CVEs) in dependencies and fixes them.
1. Runs tests and fixes any failures.

After all validation checks pass, the agent generates a summary. Review the results and verify:

```bash
dotnet build
dotnet test
```



## Next Steps

- [Predefined Tasks](predefined-tasks.md)
- [GitHub Copilot modernization FAQ](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/azure/migration/appmod/faq.yml)
