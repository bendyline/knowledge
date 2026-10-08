---
title: Quickstart - Create Azure API Management Instance - Visual Studio Code
description: Use this quickstart to create an Azure API Management instance with the API Management extension for Visual Studio Code.
ms.service: azure-api-management
ms.topic: quickstart
ms.date: 10/14/2025
ms.custom: mode-api, devdivchpfy22
---

# Quickstart: Create a new Azure API Management instance using Visual Studio Code


**APPLIES TO: Consumption | Developer | Basic | Standard | Premium**

This quickstart describes the steps to create a new API Management instance using the *Azure API Management Extension* for Visual Studio Code. After creating an instance, you can use the extension for common management tasks such as importing APIs in your API Management instance.


[Azure API Management](api-management-key-concepts.md) helps organizations publish APIs to external, partner, and internal developers to unlock the potential of their data and services. API Management provides the core competencies to ensure a successful API program through developer engagement, business insights, analytics, security, and protection. With API Management, create and manage modern API gateways for existing backend services hosted anywhere.



## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/vscode-create-service-instance.md)

Also, ensure that you install:

- [Visual Studio Code](https://code.visualstudio.com/)

- [Azure API Management Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-apimanagement&ssr=false#overview)

## Sign in to Azure

Launch Visual Studio Code and open the Azure extension. (If you don't see the Azure icon on the Activity Bar, make sure the *Azure API Management* extension is enabled.)

Select **Sign in to Azure...** to launch a browser window and sign in to your Microsoft account.

Sign in to Azure from the API Management extension for VS Code

## Create an API Management instance

Once you're signed in to your Microsoft account, the *Azure: API Management* Explorer pane lists your Azure subscriptions. You can enable and disable this Explorer pane in the  *Azure API Management Extension Settings*.

Right-click on the subscription you'd like to use, and select **Create API Management in Azure**.

Create API Management wizard in VS Code

In the pane that opens, supply a name for the new API Management instance. It must be globally unique within Azure and consist of 1-50 alphanumeric characters and/or hyphens. It should also start with a letter and end with an alphanumeric character.

A new API Management instance and parent resource group are created with the specified name. By default, the instance is created in the *West US* region with *Consumption* tier.

> **Tip:**
> If you enable **Advanced Creation** in the *Azure API Management Extension Settings*, you can also specify an [API Management tier](https://azure.microsoft.com/pricing/details/api-management/), Azure region, and [resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md) to deploy your API Management instance.
>
> While the *Consumption* tier usually takes less than a minute to set up, other tiers can take up to 30-40 minutes to create.

At this point, you're ready to import and publish your first API. You can do that and also do common API Management actions within the extension for Visual Studio Code. See [the tutorial](visual-studio-code-tutorial.md) for more.

Newly created API Management instance in VS Code API Management extension pane

## Clean up resources

When no longer needed, remove the API Management instance by right-clicking and selecting **Open in Portal** to [delete the API Management service](get-started-create-service-instance.md#clean-up-resources) and its resource group.

Alternately, you can select **Delete API Management** to only delete the API Management instance. This action doesn't delete its resource group.

Delete API Management instance from VS Code

## Related content

* [Import and manage APIs using the API Management Extension](visual-studio-code-tutorial.md)
