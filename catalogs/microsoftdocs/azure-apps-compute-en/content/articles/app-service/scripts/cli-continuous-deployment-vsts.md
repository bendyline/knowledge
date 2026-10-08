---
title: Continuous Deployment from Azure Repos
description: Learn how to use the Azure CLI to automate deployment and management of your App Service app. This sample shows how to set up CI/CD from Azure Repos.
author: msangapu-msft
tags: azure-service-management

ms.assetid: 389d3bd3-cd8e-4715-a3a1-031ec061d385
ms.devlang: azurecli
ms.topic: sample
ms.date: 12/08/2025
ms.author: msangapu
ms.custom: mvc, devx-track-azurecli
ms.service: azure-app-service
---
# Set up continuous deployment from an Azure DevOps repository using Azure CLI

This sample script creates an app in App Service with its related resources, and then sets up continuous deployment from an Azure DevOps repository.

## Prerequisites

* An Azure subscription. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-continuous-deployment-vsts.md)

* An Azure DevOps repository with application code, for which you have administrative permissions.

* A [personal access token (PAT)](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) for your Azure DevOps organization.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-continuous-deployment-vsts.md)

## Sample script

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-launch-cloud-shell-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-continuous-deployment-vsts.md)

### Create the web app

Use the following commands to create the web app.

[Code reference unavailable in this source snapshot: ~/azure_cli_scripts/app-service/deploy-vsts-continuous/deploy-vsts-continuous-webapp-only.sh](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-continuous-deployment-vsts.md)

### Configure continuous deployment from Azure DevOps

Create the following variables containing information from your Azure DevOps Services (formerly Visual Studio Team Services, or VSTS).

```azurecli
gitrepo=<Replace with your Azure DevOps Services repo URL>
token=<Replace with an Azure DevOps Services personal access token>
```

Configure continuous deployment from Azure DevOps Services. The `--git-token` parameter is required only once per Azure account; Azure remembers the token.

```azurecli
az webapp deployment source config --name $webapp --resource-group $resourceGroup \
--repo-url $gitrepo --branch main --git-token $token
```

## Clean up resources

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/cli-clean-up-resources.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/scripts/cli-continuous-deployment-vsts.md)

```azurecli
az group delete --name $resourceGroup
```

## Sample reference

This script uses the following commands. Each command in the table links to command-specific documentation.

| Command | Notes |
| --- | --- |
| [`az group create`](https://learn.microsoft.com/cli/azure/group#az-group-create) | Creates a resource group in which all resources are stored. |
| [`az appservice plan create`](https://learn.microsoft.com/cli/azure/appservice/plan#az-appservice-plan-create) | Creates an App Service plan. |
| [`az webapp create`](https://learn.microsoft.com/cli/azure/webapp#az-webapp-create) | Creates an App Service app. |
| [`az webapp deployment source config`](https://learn.microsoft.com/cli/azure/webapp/deployment/source#az-webapp-deployment-source-config) | Associates an App Service app with a Git or Mercurial repository. |

## Related content

- [Azure CLI documentation](https://learn.microsoft.com/cli/azure)
- [CLI samples for Azure App Service](../samples-cli.md)
