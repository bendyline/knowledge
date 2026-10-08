---
title: Create a publish app GitHub workflow
description: In this quickstart, you will learn how to create a GitHub workflow to publish your .NET source code.
ms.date: 02/16/2022
ms.topic: quickstart
---

# Quickstart: Create a GitHub workflow to publish an app

In this quickstart, you will learn how to create a GitHub workflow to publish your .NET app from source code. Automatically publishing your .NET app from GitHub to a destination is referred to as a continuous deployment (CD). There are many possible destinations to publish an application, in this quickstart you'll publish to Azure.

## Prerequisites

- A [GitHub account](https://github.com/join).
- A .NET source code repository.
- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An ASP.NET Core web app.
- An Azure App Service resource.

## Add publish profile

To publish the app to Azure, open the Azure portal for the App Service instance of the application. In the resource **Overview**, select **Get publish profile** and save the **.PublishSetting* file locally.

Azure portal, App Service resource: Get publish profile

> **Warning:**
> The publish profile contains sensitive information, such as credentials for accessing your Azure App Service resource. This information should always be treated very carefully.

In the GitHub repository, navigate to **Settings** and select **Secrets** from the left navigation menu. Select **New repository secret**, to add a new secret.

GitHub / Settings / Secret: Add new repository secret

Enter `AZURE_PUBLISH_PROFILE` as the **Name**, and paste the XML content from the publish profile into the **Value** text area. Select **Add secret**. For more information, see [Encrypted secrets](github-actions-overview.md#encrypted-secrets).


## Create a workflow file

In the GitHub repository, add a new YAML file to the *.github/workflows* directory. Choose a meaningful file name, something that will clearly indicate what the workflow is intended to do. For more information, see [Workflow file](github-actions-overview.md#workflow-file).

> **Important:**
> GitHub requires that workflow composition files to be placed within the *.github/workflows* directory.

Workflow files typically define a composition of one or more GitHub Action via the `jobs.<job_id>/steps[*]`. For more information, see, [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions).


Create a new file named *publish-app.yml*, copy and paste the following YML contents into it:

[Code reference unavailable in this source snapshot: snippets/dotnet-publish-github-action/publish-app.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-publish-github-action.md)

In the preceding workflow composition:

- The `name: publish` defines the name, "publish" will appear in workflow status badges.

  [Code reference unavailable in this source snapshot: snippets/dotnet-publish-github-action/publish-app.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-publish-github-action.md)

- The `on` node signifies the events that trigger the workflow:

  [Code reference unavailable in this source snapshot: snippets/dotnet-publish-github-action/publish-app.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-publish-github-action.md)

  - Triggered when a `push` occurs on the `production` branch.

- The `env` node defines named environment variables (env var).

  [Code reference unavailable in this source snapshot: snippets/dotnet-publish-github-action/publish-app.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-publish-github-action.md)

  - The environment variable `AZURE_WEBAPP_NAME` is assigned the value `DotNetWeb`.
  - The environment variable `AZURE_WEBAPP_PACKAGE_PATH` is assigned the value `'.'`.
  - The environment variable `DOTNET_VERSION` is assigned the value `'6.0.401'`. The environment variable is later referenced to specify the `dotnet-version` of the `actions/setup-dotnet@v3` GitHub Action.

- The `jobs` node builds out the steps for the workflow to take.

  [Code reference unavailable in this source snapshot: snippets/dotnet-publish-github-action/publish-app.yml](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/devops/dotnet-publish-github-action.md)

  - There is a single job, named `publish` that will run on the latest version of Ubuntu.
  - The `actions/setup-dotnet@v3` GitHub Action is used to set up the .NET SDK with the specified version from the `DOTNET_VERSION` environment variable.
  - The [`dotnet restore`](../core/tools/dotnet-restore.md) command is called.
  - The [`dotnet build`](../core/tools/dotnet-build.md) command is called.
  - The [`dotnet publish`](../core/tools/dotnet-publish.md) command is called.
  - The [`dotnet test`](../core/tools/dotnet-test.md) command is called.
  - The `azure/webapps-deploy@v2` GitHub Action deploys the app with the given `publish-profile` and `package`.
    - The `publish-profile` is assigned from the `AZURE_PUBLISH_PROFILE` repository secret.


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


### Example publish workflow status badge

| Passing | Failing | No status |
| --- | --- | --- |
| GitHub: publish passing badge | GitHub: publish failing badge | GitHub: publish no-status badge |

## See also

- [dotnet restore](../core/tools/dotnet-restore.md)
- [dotnet build](../core/tools/dotnet-build.md)
- [dotnet test](../core/tools/dotnet-test.md)
- [dotnet publish](../core/tools/dotnet-publish.md)

## Next steps

> 
> [Quickstart: Create a CodeQL GitHub workflow](dotnet-secure-github-action.md)
