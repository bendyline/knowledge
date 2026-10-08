---
title: Create a build validation GitHub workflow
description: In this quickstart, you will learn how to create a GitHub workflow to validate .NET app compilation.
ms.date: 02/16/2022
ms.topic: quickstart
---

# Quickstart: Create a build validation GitHub workflow

In this quickstart, you will learn how to create a GitHub workflow to validate the compilation of your .NET source code in GitHub. Compiling your .NET code is one of the most basic validation steps that you can take to help ensure the quality of updates to your code. If code doesn't compile (or build), it's an easy deterrent and should be a clear sign that the code needs to be fixed.


## Prerequisites

- A [GitHub account](https://github.com/join).
- A .NET source code repository.



## Create a workflow file

In the GitHub repository, add a new YAML file to the *.github/workflows* directory. Choose a meaningful file name, something that will clearly indicate what the workflow is intended to do. For more information, see [Workflow file](github-actions-overview.md#workflow-file).

> **Important:**
> GitHub requires that workflow composition files to be placed within the *.github/workflows* directory.

Workflow files typically define a composition of one or more GitHub Action via the `jobs.<job_id>/steps[*]`. For more information, see, [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions).


Create a new file named *build-validation.yml*, copy and paste the following YML contents into it:

[Code reference unavailable in this source snapshot: snippets/dotnet-build-github-action/build-validation.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-build-github-action.md)

In the preceding workflow composition:

- The `name: build` defines the name, "build" will appear in workflow status badges.

  [Code reference unavailable in this source snapshot: snippets/dotnet-build-github-action/build-validation.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-build-github-action.md)

- The `on` node signifies the events that trigger the workflow:

  [Code reference unavailable in this source snapshot: snippets/dotnet-build-github-action/build-validation.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-build-github-action.md)

  - Triggered when a `push` or `pull_request` occurs on the `main` branch where any files changed ending with the *.cs* or *.csproj* file extensions.

- The `env` node defines named environment variables (env var).

  [Code reference unavailable in this source snapshot: snippets/dotnet-build-github-action/build-validation.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-build-github-action.md)

  - The environment variable `DOTNET_VERSION` is assigned the value `'6.0.401'`. The environment variable is later referenced to specify the `dotnet-version` of the `actions/setup-dotnet@v3` GitHub Action.

- The `jobs` node builds out the steps for the workflow to take.

  [Code reference unavailable in this source snapshot: snippets/dotnet-build-github-action/build-validation.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-build-github-action.md)

  - There is a single job, named `build-<os>` where the `<os>` is the operating system name from the `strategy/matrix`. The `name` and `runs-on` elements are dynamic for each value in the `matrix/os`. This will run on the latest versions of Ubuntu, Windows, and macOS.
  - The `actions/setup-dotnet@v3` GitHub Action is required to set up the .NET SDK with the specified version from the `DOTNET_VERSION` environment variable.
  - (Optionally) Additional steps may be required, depending on your .NET workload. They're omitted from this example, but you may need additional tools installed to build your apps.
    - For example, when building an ASP.NET Core Blazor WebAssembly application with Ahead-of-Time (AoT) compilation you'd install the corresponding workload before running restore/build/publish operations.

    ```yaml
    - name: Install WASM Tools Workload
      run: dotnet workload install wasm-tools
    ```

    For more information on .NET workloads, see [`dotnet workload install`](../core/tools/dotnet-workload-install.md).

  - The [`dotnet restore`](../core/tools/dotnet-restore.md) command is called.
  - The [`dotnet build`](../core/tools/dotnet-build.md) command is called.

In this case, think of a workflow file as a composition that represents the various steps to build an application. Many [.NET CLI commands](../core/tools/index.md) are available, most of which could be used in the context of a GitHub Action.


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


### Example build workflow status badge

| Passing | Failing | No status |
| --- | --- | --- |
| GitHub: build passing badge | GitHub: build failing badge | GitHub: build no-status badge |

## See also

- [dotnet restore](../core/tools/dotnet-restore.md)
- [dotnet build](../core/tools/dotnet-build.md)
- [actions/checkout](https://github.com/actions/checkout)
- [actions/setup-dotnet](https://github.com/actions/setup-dotnet)

## Next steps

> 
> [Quickstart: Create a .NET test GitHub workflow](dotnet-test-github-action.md)
