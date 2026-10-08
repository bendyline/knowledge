---
title: Create a test validation GitHub workflow
description: In this quickstart, you will learn how to create a GitHub workflow to test your .NET source code.
ms.date: 02/16/2022
ms.topic: quickstart
---

# Quickstart: Create a test validation GitHub workflow

In this quickstart, you will learn how to create a GitHub workflow to test your .NET source code. Automatically testing your .NET code within GitHub is referred to as continuous integration (CI), where pull requests or changes to the source trigger workflows to exercise. Along with [building the source code](dotnet-build-github-action.md), testing ensures that the compiled source code functions as the author intended. More often than not, unit tests serve as immediate feedback-loop to help ensure the validity of changes to source code.


## Prerequisites

- A [GitHub account](https://github.com/join).
- A .NET source code repository.



## Create a workflow file

In the GitHub repository, add a new YAML file to the *.github/workflows* directory. Choose a meaningful file name, something that will clearly indicate what the workflow is intended to do. For more information, see [Workflow file](github-actions-overview.md#workflow-file).

> **Important:**
> GitHub requires that workflow composition files to be placed within the *.github/workflows* directory.

Workflow files typically define a composition of one or more GitHub Action via the `jobs.<job_id>/steps[*]`. For more information, see, [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions).


Create a new file named *build-and-test.yml*, copy and paste the following YML contents into it:

[Code reference unavailable in this source snapshot: snippets/dotnet-test-github-action/build-and-test.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-test-github-action.md)

In the preceding workflow composition:

- The `name: build and test` defines the name, "build and test" will appear in workflow status badges.

  [Code reference unavailable in this source snapshot: snippets/dotnet-test-github-action/build-and-test.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-test-github-action.md)

- The `on` node signifies the events that trigger the workflow:

  [Code reference unavailable in this source snapshot: snippets/dotnet-test-github-action/build-and-test.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-test-github-action.md)

  - Triggered when a `push` or `pull_request` occurs on the `main` branch where any files changed ending with the *.cs* or *.csproj* file extensions.

- The `env` node defines named environment variables (env var).

  [Code reference unavailable in this source snapshot: snippets/dotnet-test-github-action/build-and-test.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-test-github-action.md)

  - The environment variable `DOTNET_VERSION` is assigned the value `'6.0.401'`. The environment variable is later referenced to specify the `dotnet-version` of the `actions/setup-dotnet@v3` GitHub Action.

- The `jobs` node builds out the steps for the workflow to take.

  [Code reference unavailable in this source snapshot: snippets/dotnet-test-github-action/build-and-test.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-test-github-action.md)

  - There is a single job, named `build-<os>` where the `<os>` is the operating system name from the `strategy/matrix`. The `name` and `runs-on` elements are dynamic for each value in the `matrix/os`. This will run on the latest versions of Ubuntu, Windows, and macOS.
  - The `actions/setup-dotnet@v3` GitHub Action is used to setup the .NET SDK with the specified version from the `DOTNET_VERSION` environment variable.
  - The [`dotnet restore`](../core/tools/dotnet-restore.md) command is called.
  - The [`dotnet build`](../core/tools/dotnet-build.md) command is called.
  - The [`dotnet test`](../core/tools/dotnet-test.md) command is called.


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


### Example test workflow status badge

| Passing | Failing | No status |
| --- | --- | --- |
| GitHub: test passing badge | GitHub: test failing badge | GitHub: test no-status badge |

## See also

- [dotnet restore](../core/tools/dotnet-restore.md)
- [dotnet build](../core/tools/dotnet-build.md)
- [dotnet test](../core/tools/dotnet-test.md)
- [Unit testing .NET apps](../core/testing/index.md)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-dotnet](https://github.com/actions/setup-dotnet)

## Next steps

> 
> [Quickstart: Create a GitHub workflow to publish your .NET app](dotnet-publish-github-action.md)
