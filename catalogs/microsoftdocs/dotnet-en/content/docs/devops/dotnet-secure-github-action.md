---
title: Create a security scan GitHub workflow
description: In this quickstart, you will learn how to create a CodeQL GitHub workflow to automate the discovery of vulnerabilities in your .NET codebase.
ms.date: 02/16/2022
ms.topic: quickstart
---

# Quickstart: Create a security scan GitHub workflow

In this quickstart, you will learn how to create a CodeQL GitHub workflow to automate the discovery of vulnerabilities in your .NET codebase.

> In CodeQL, code is treated as data. Security vulnerabilities, bugs, and other errors are modeled as queries that can be executed against databases extracted from code.
>
> - [GitHub CodeQL: About](https://codeql.github.com/docs/codeql-overview/about-codeql)


## Prerequisites

- A [GitHub account](https://github.com/join).
- A .NET source code repository.



## Create a workflow file

In the GitHub repository, add a new YAML file to the *.github/workflows* directory. Choose a meaningful file name, something that will clearly indicate what the workflow is intended to do. For more information, see [Workflow file](github-actions-overview.md#workflow-file).

> **Important:**
> GitHub requires that workflow composition files to be placed within the *.github/workflows* directory.

Workflow files typically define a composition of one or more GitHub Action via the `jobs.<job_id>/steps[*]`. For more information, see, [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions).


Create a new file named *codeql-analysis.yml*, copy and paste the following YML contents into it:

[Code reference unavailable in this source snapshot: snippets/dotnet-secure-github-action/codeql-analysis.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-secure-github-action.md)

In the preceding workflow composition:

- The `name: CodeQL` defines the name, "CodeQL" will appear in workflow status badges.

  [Code reference unavailable in this source snapshot: snippets/dotnet-secure-github-action/codeql-analysis.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-secure-github-action.md)

- The `on` node signifies the events that trigger the workflow:

  [Code reference unavailable in this source snapshot: snippets/dotnet-secure-github-action/codeql-analysis.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-secure-github-action.md)

  - Triggered when a `push` or `pull_request` occurs on the `main` branch where any files changed ending with the *.cs* or *.csproj* file extensions.
  - As a cron job (on a schedule)&mdash;to run at 8:00 UTC every Thursday.

- The `jobs` node builds out the steps for the workflow to take.

  [Code reference unavailable in this source snapshot: snippets/dotnet-secure-github-action/codeql-analysis.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-secure-github-action.md)

  - There is a single job, named `analyze` that will run on the latest version of Ubuntu.
  - The `strategy` defines C# as the `language`.
  - The `github/codeql-action/init@v1` GitHub Action is used to initialize CodeQL.
  - The `github/codeql-action/autobuild@v1` GitHub Action builds the .NET project.
  - The `github/codeql-action/analyze@v1` GitHub Action performs the CodeQL analysis.

For more information, see [GitHub Actions: Configure code scanning](https://docs.github.com/code-security/secure-coding/automatically-scanning-your-code-for-vulnerabilities-and-errors/configuring-code-scanning).


## Create a workflow status badge

It's common nomenclature for GitHub repositories to have a *README.md* file at the root of the repository directory. Likewise, it's nice to report the latest status for various workflows. All workflows can generate a status badge, which are visually appealing within the *README.md* file. To add the workflow status badge:

1. From the GitHub repository select the **Actions** navigation option.
1. All repository workflows are displayed on the left-side, select the desired workflow and the ellipsis (**...**) button.

    - The ellipsis (**...**) button expands the menu options for the selected workflow.

1. Select the **Create status badge** menu option.

    GitHub: Create status badge

1. Select the **Copy status badge Markdown** button.

    GitHub: Copy status badge Markdown

1. Paste the Markdown into the *README.md* file, save the file, commit and push the changes.

For more, see [Adding a workflow status badge](https://docs.github.com/actions/managing-workflow-runs/adding-a-workflow-status-badge).


### Example CodeQL workflow status badge

| Passing | Failing | No status |
| --- | --- | --- |
| GitHub: CodeQL passing badge | GitHub: CodeQL failing badge | GitHub: CodeQL no-status badge |

## See also

- [Secure coding guidelines](../standard/security/secure-coding-guidelines.md)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-dotnet](https://github.com/actions/setup-dotnet)

## Next steps

> 
> [Tutorial: Create a GitHub Action with .NET](create-dotnet-github-action.md)
