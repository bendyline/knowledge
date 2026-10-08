---
title: Deploy an artifact file to Azure Container Apps
description: Use a prebuilt artifact file to deploy to Azure Container Apps.
services: container-apps
author: craigshoemaker
ms.author: cshoe
ms.service: azure-container-apps
ms.topic: quickstart
ms.date: 02/03/2025
ms.custom: ignite-2023
---

# Quickstart: Deploy an artifact file to Azure Container Apps (preview)

In this quickstart, you learn to deploy a container app from a prebuilt artifact file. The example in this article deploys a Java application using a JAR file, which includes a Java-specific manifest file. Your job is to create a backend web API service that returns a static collection of music albums. After completing this quickstart, you can continue to [Communication between microservices](communicate-between-microservices.md) to learn how to deploy a front end application that calls the API.

The following screenshot shows the output from the album API service you deploy.

Screenshot of response from albums API endpoint.

## Prerequisites

| Requirement | Instructions |
| --- | --- |
| Azure account | If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). You need the *Contributor* or *Owner* permission on the Azure subscription to proceed. <br><br>Refer to [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal?tabs=current) for details. |
| GitHub Account | Get one for [free](https://github.com/join). |
| git | [Install git](https://git-scm.com/downloads) |
| Azure CLI | Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). |
| Java | Install the [JDK](https://learn.microsoft.com/java/openjdk/install), recommend 17, or later |
| Maven | Install the [Maven](https://maven.apache.org/download.cgi). |


## Setup

To sign in to Azure from the CLI, run the following command and follow the prompts to complete the authentication process.

# [Bash](#tab/bash)

```azurecli
az login
```

# [PowerShell](#tab/powershell)

```azurepowershell
Connect-AzAccount
```

---

To ensure you're running the latest version of the CLI, run the upgrade command.

# [Bash](#tab/bash)

```azurecli
az upgrade
```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az -Scope CurrentUser -Repository PSGallery -Force
```

Ignore any warnings about modules currently in use.

---

Next, install or update the Azure Container Apps extension for the CLI.

If you receive errors about missing parameters when you run `az containerapp` commands in Azure CLI or cmdlets from the `Az.App` module in PowerShell, be sure you have the latest version of the Azure Container Apps extension installed.

# [Bash](#tab/bash)

```azurecli
az extension add --name containerapp --upgrade
```

> **Note:**
> Starting in May 2024, Azure CLI extensions no longer enable preview features by default. To access Container Apps [preview features](whats-new.md), install the Container Apps extension with `--allow-preview true`.
> ```azurecli
> az extension add --name containerapp --upgrade --allow-preview true
> ```

# [PowerShell](#tab/powershell)

```azurepowershell
Install-Module -Name Az.App
```

Make sure to update the `Az.App` module to the latest version.

```azurepowershell
Update-Module -Name Az.App
```

---

Now that the current extension or module is installed, register the `Microsoft.App` and `Microsoft.OperationalInsights` namespaces.

# [Bash](#tab/bash)

```azurecli
az provider register --namespace Microsoft.App
```

```azurecli
az provider register --namespace Microsoft.OperationalInsights
```

# [PowerShell](#tab/powershell)

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.App
```

```azurepowershell
Register-AzResourceProvider -ProviderNamespace Microsoft.OperationalInsights
```

---


## Create environment variables

Now that your Azure CLI setup is complete, you can define the environment variables that are used throughout this article.

# [Bash](#tab/bash)

Define the following variables in your bash shell.

```azurecli
RESOURCE_GROUP="album-containerapps"
LOCATION="canadacentral"
ENVIRONMENT="env-album-containerapps"
API_NAME="album-api"
SUBSCRIPTION=<YOUR_SUBSCRIPTION_ID>
```

If necessary, you can query for your subscription ID.

```azurecli
az account list --output table
```

# [PowerShell](#tab/powershell)

Define the following variables in your PowerShell console.

```powershell
$RESOURCE_GROUP="album-containerapps"
$LOCATION="canadacentral"
$ENVIRONMENT="env-album-containerapps"
$API_NAME="album-api"
$SUBSCRIPTION=<YOUR_SUBSCRIPTION_ID>
```

If necessary, you can query for your subscription ID.

```powershell
az account list --output table
```

---

## Prepare the GitHub repository

Begin by cloning the sample repository.

Use the following git command to clone the sample app into the *code-to-cloud* folder:

```git
git clone https://github.com/azure-samples/containerapps-albumapi-java code-to-cloud
```

```git
cd code-to-cloud
```

## Build a JAR file

> **Note:**
> The Java sample only supports a Maven build, which results in an executable JAR file. The build uses default settings as passing in environment variables is unsupported.

Build the project with [Maven](https://maven.apache.org/download.cgi).

# [Bash](#tab/bash)

```azurecli
mvn clean package -DskipTests
```

# [PowerShell](#tab/powershell)

```powershell
mvn clean package -DskipTests
```

---

## Run the project locally

# [Bash](#tab/bash)

```azurecli
java -jar target\containerapps-albumapi-java-0.0.1-SNAPSHOT.jar
```

# [PowerShell](#tab/powershell)

```powershell
java -jar target\containerapps-albumapi-java-0.0.1-SNAPSHOT.jar
```

---

To verify application is running, open a browser and go to `http://localhost:8080/albums`. The page returns a list of the JSON objects.

## Deploy the artifact

Build and deploy your first container app from your local JAR file with the `containerapp up` command.

This command:

- Creates the resource group
- Creates an Azure Container Registry
- Builds the container image and push it to the registry
- Creates the Container Apps environment with a Log Analytics workspace
- Creates and deploys the container app using a public container image

The `up` command uses the Docker file in the root of the repository to build the container image. The `EXPOSE` instruction in the Docker file defines the target port. A Docker file, however, isn't required to build a container app.

> **Note:**
> Note: When using `containerapp up` in combination with a Docker-less code base, use the `--location` parameter so that application runs in a location other than US East.

# [Bash](#tab/bash)

```azurecli
az containerapp up \
  --name $API_NAME \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --environment $ENVIRONMENT \
  --artifact ./target/containerapps-albumapi-java-0.0.1-SNAPSHOT.jar \
  --ingress external \
  --target-port 8080 \
  --subscription $SUBSCRIPTION
```

# [PowerShell](#tab/powershell)

```powershell
az containerapp up `
    --name $API_NAME `
    --resource-group $RESOURCE_GROUP `
    --location $LOCATION `
    --environment $ENVIRONMENT `
    --artifact ./target/containerapps-albumapi-java-0.0.1-SNAPSHOT.jar `
    --ingress external `
    --target-port 8080 `
    --subscription $SUBSCRIPTION
```

---

## Verify deployment

Copy the FQDN to a web browser. From your web browser, go to the `/albums` endpoint of the FQDN.

Screenshot of response from albums API endpoint.

## Deploy a WAR file

You can also deploy your container app from a [WAR file](java-get-started.md?tabs=war).

## Clean up resources

If you're not going to continue to use this application, you can delete the Azure Container Apps instance and all the associated services by removing the resource group.

Follow these steps to remove the resources you created:

# [Bash](#tab/bash)

```azurecli
az group delete \
  --resource-group $RESOURCE_GROUP
```

# [PowerShell](#tab/powershell)

```powershell
az group delete `
  --resource-group $RESOURCE_GROUP
```

---

> **Tip:**
> Having issues? Let us know on GitHub by opening an issue in the [Azure Container Apps repo](https://github.com/microsoft/azure-container-apps).

## Next steps

> 
> [Learn more about developing in Java on Container Apps](java-overview.md)
