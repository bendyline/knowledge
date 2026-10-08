---
title: Launch your First Java Application in Azure Container Apps Using a GitHub Repository
description: Learn how to deploy a Java project in Azure Container Apps using a GitHub Repository.
services: container-apps
author: KarlErickson
ms.author: karler
ms.reviewer: hangwan
ms.service: azure-container-apps
ms.custom: devx-track-java, devx-track-extended-java
ms.topic: quickstart
ms.date: 03/05/2025
---

# Quickstart: Launch your first Java application in Azure Container Apps using a GitHub Repository

This article shows you how to deploy the Spring PetClinic sample application to Azure Container Apps using a GitHub repository.


There are several options available for deploying Java applications, including the following options:

- Deployment from a local file system or from a code repository.
- Deployment using Maven or an IDE.
- Deployment using a WAR file, a JAR file, or directly from source code.

By the end of this tutorial, you deploy a web application that you can manage through the Azure portal. The following screenshot shows the home page of the PetClinic application deployed to Azure Container Apps:

Screenshot of the home page of the PetClinic app.

## Prerequisites

- An Azure subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The `Contributor` or `Owner` permission on the Azure subscription. For more information, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal?tabs=current).
- [A GitHub account](https://github.com/join).
- [Git](https://git-scm.com/downloads)
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
- The Azure Container Apps CLI extension, version 0.3.47 or higher. Use the following command to install the latest version: `az extension add --name containerapp --upgrade --allow-preview`
- [The Java Development Kit](https://learn.microsoft.com/java/openjdk/install), version 17 or later.
- [Apache Maven](https://maven.apache.org/download.cgi)


## Prepare the project

Use the **Fork** button on the [Azure Container Apps Java Samples](https://github.com/Azure-Samples/azure-container-apps-java-samples.git) repo page to fork the repo to your personal GitHub account. When the fork is complete, copy the fork's URL for use in the next section.

## Deploy the project

Deploy the project by using the following steps:

1. Set the necessary environment variables by using the following commands:

    ```bash
    export RESOURCE_GROUP="pet-clinic-container-apps"
    export LOCATION="canadacentral"
    export ENVIRONMENT="env-pet-clinic-container-apps"
    export CONTAINER_APP_NAME="pet-clinic"
    export REPO_URL="<URL-of-your-GitHub-repo-fork>"
    ```

1. Sign in to Azure from the CLI if you aren't already signed in. For more information, see the [Setup](quickstart-code-to-cloud.md?tabs=bash%2Cjava#setup) section of [Quickstart: Build and deploy from local source code to Azure Container Apps](quickstart-code-to-cloud.md).

1. Build and deploy your Spring Boot app by using the following command:

    ```azurecli
    az containerapp up \
        --resource-group $RESOURCE_GROUP \
        --name $CONTAINER_APP_NAME \
        --location $LOCATION \
        --environment $ENVIRONMENT \
        --context-path ./spring-petclinic \
        --repo $REPO_URL
    ```

    This command performs the following tasks:

    - Creates the resource group.
    - Creates an Azure container registry.
    - Builds the container image and pushes it to the registry.
    - Creates the Container Apps environment with a Log Analytics workspace.
    - Creates and deploys the container app by using the built container image.

The project is now deployed. When you push new code to the repository, a GitHub Action performs the following tasks:

- Builds the container image and pushes it to the Azure container registry.
- Deploys the container image to the created container app.


## Verify the app status

After the deployment finishes, go to the Azure portal **Overview** page of your container app and select **Application Url** to see the application running in the cloud.

## Clean up resources

If you plan to continue working with more quickstarts and tutorials, you might want to leave these resources in place. When you no longer need the resources, you can remove them to avoid Azure charges, by using the following command:

```azurecli
az group delete --name $RESOURCE_GROUP
```


## Related content

- [Quickstart: Launch your first Java microservice application with managed Java components in Azure Container Apps](java-microservice-get-started.md)
- [Build environment variables for Java in Azure Container Apps (preview)](java-build-environment-variables.md)
