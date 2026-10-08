---
title: Quickstart - Create Azure API Management Instance - ARM Template
description: Use this quickstart to create an Azure API Management instance in the Developer tier by using an Azure Resource Manager template (ARM template).
services: azure-resource-manager
ms.service: azure-api-management
ms.topic: quickstart-arm
ms.date: 10/17/2025
ms.custom:
  - subject-armqs
  - mode-arm
  - devx-track-arm-template
  - sfi-image-nochange
---

# Quickstart: Create a new Azure API Management service instance using an ARM template

**APPLIES TO: All API Management tiers**



This quickstart describes how to use an Azure Resource Manager template (ARM template) to create an Azure API Management instance. You can also use ARM templates for common management tasks such as importing APIs in your API Management instance.


[Azure API Management](api-management-key-concepts.md) helps organizations publish APIs to external, partner, and internal developers to unlock the potential of their data and services. API Management provides the core competencies to ensure a successful API program through developer engagement, business insights, analytics, security, and protection. With API Management, create and manage modern API gateways for existing backend services hosted anywhere.



[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/resource-manager-quickstart-introduction.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-arm-template.md)

If your environment meets the prerequisites and you're familiar with using ARM templates, select the **Deploy to Azure** button. The template opens in the Azure portal.

Button to deploy the Resource Manager template to Azure.

## Prerequisites

If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Review the template

The template used in this quickstart is from [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/azure-api-management-create/).

[Code reference unavailable in this source snapshot: ~/quickstart-templates/quickstarts/microsoft.apimanagement/azure-api-management-create/azuredeploy.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/quickstart-arm-template.md)

The following resource is defined in the template:

- **[Microsoft.ApiManagement/service](https://learn.microsoft.com/azure/templates/microsoft.apimanagement/service)**

More Azure API Management template samples can be found in [Azure Quickstart Templates](https://azure.microsoft.com/resources/templates/?resourceType=Microsoft.Apimanagement&pageNumber=1&sort=Popular).

## Deploy the template

1. Select the following image to sign in to Azure and open a template. The template creates an API Management service instance with an automatically generated name.

    Button to deploy the Resource Manager template to Azure.

    In this example, the instance is configured in the Developer tier, an economical option to evaluate Azure API Management. This tier isn't for production use. For more information about scaling the API Management tiers, see [upgrade and scale](upgrade-and-scale.md).

1. Select or enter the following values.
    - **Subscription**: select an Azure subscription.
    - **Resource group**: select **Create new**, enter a unique name for the resource group, and then select **OK**.
    - **Region**: select a location for the resource group. Example: **Central US**.
    - **Publisher Email**: enter an email address for receiving notifications.
    - **Publisher Name**: enter a name you choose for the API publisher.
    - **Sku**: accept the default value of **Developer**. Alternatively, choose another value.
    - **Sku Count**: accept the default value.
    - **Location**: accept the generated location for the API Management service.

    API Management template properties

1. Select **Review + Create**, then review the terms and conditions. If you agree, select **Create**.

    > **Tip:**
    >  It can take between 30 and 40 minutes to create and activate an API Management service in the Developer tier. Times vary by tier.

1. After the instance is successfully created, you get a notification:

    Deployment notification

 The Azure portal is used to deploy the template. In addition to the Azure portal, you can use the Azure PowerShell, Azure CLI, and REST API. To learn other deployment methods, see [Deploy templates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/templates/deploy-cli.md).

## Review deployed resources

Use the Azure portal to check the deployed resources, or use tools such as the Azure CLI or Azure PowerShell to list the deployed resources.

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**, and select the service instance you created.
1. Review the properties of your service on the **Overview** page.

Service overview page

When your API Management service instance is online, you're ready to use it. Start with the tutorial to [import and publish](import-and-publish.md) your first API.

## Clean up resources

If you plan to continue working with subsequent tutorials, you might want to leave the API Management instance in place. When no longer needed, delete the resource group, which deletes the resources in the resource group.

1. In the [Azure portal](https://portal.azure.com), search for and select **Resource groups**. You can also select **Resource groups** on the **Home** page.
1. On the **Resource groups** page, select your resource group.
1. On the resource group page, select **Delete resource group**.

    Delete resource group

1. Type the name of your resource group, and then select **Delete**.

## Next steps

> 
> [Tutorial: Import and publish your first API](import-and-publish.md)
