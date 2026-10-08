---
title: "Quickstart: Create Azure API Management Instance using the Portal"
description: Use this quickstart to create a new Azure API Management instance by using the Azure portal.
ms.service: azure-api-management
ms.topic: quickstart
ms.date: 03/27/2026
ms.custom:
  - mvc
  - mode-portal
  - devdivchpfy22
  - sfi-image-nochange
---

# Quickstart: Create a new Azure API Management instance by using the Azure portal

**APPLIES TO: All API Management tiers**



This quickstart describes the steps for creating a new API Management instance by using the Azure portal. After creating an instance, you can use the Azure portal for common management tasks such as importing APIs in your API Management instance.


[Azure API Management](api-management-key-concepts.md) helps organizations publish APIs to external, partner, and internal developers to unlock the potential of their data and services. API Management provides the core competencies to ensure a successful API program through developer engagement, business insights, analytics, security, and protection. With API Management, create and manage modern API gateways for existing backend services hosted anywhere.



## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/get-started-create-service-instance.md)

## Create a new instance

1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **Create a resource**. You can also select **Create a resource** on the Azure **Home** page.
   
   Screenshot showing the Azure portal.

1. On the **Create a resource** page, select **Integration** > **API Management**.

   Screenshot showing the Create a resource screen with API Management highlighted.
   
1. On the **Create API Management** page, on the **Basics** tab, enter settings.

   Screenshot showing the basic settings to create an API Management instance.
   
   | Setting | Description |
   | --- | --- |
   | **Subscription** | The subscription under which this new service instance will be created. |
   | **Resource group** | Select a new or existing resource group. A resource group is a logical container into which Azure resources are deployed and managed. |
   | **Region** | Select a geographic region near you from the available API Management service locations. |
   | **Resource name** | A unique name for your API Management instance. The name can't be changed later. The service name refers to both the service and the corresponding Azure resource. <br/><br/> The service name is used to generate a default domain name: *\<name\>.azure-api.net.* If you would like to configure a custom domain name later, see [Configure a custom domain](configure-custom-domain.md). |
   | **Organization name** | The name of your organization. This name is used in many places, including the title of the developer portal and sender of notification emails. |
   | **Administrator email** | The email address to which all system notifications from **API Management** are sent. |
   | **Pricing tier** | Select a [tier](api-management-features.md) with the features you need. The **Basic v2** tier is an economical choice for development and testing scenarios and is deployed in a few minutes. |
   | **Units** | The number of units of capacity for the selected pricing tier. For evaluating API Management, you can accept the default value of *1* unit. |

1. On the **Monitor + secure** tab, optionally select one or more recommended add-in services to use with API Management. These services incur extra costs. For example, select **Log Analytics** to define a Log Analytics workspace you can target for API Management logs. 

1. On the **Networking** tab, optionally select one or more networking options that are supported in your service tier to secure inbound or outbound traffic to API Management.

1. On the **Managed identity** tab, optionally enable a system-assigned managed identity for your instance. This is recommended for many scenarios to connect API Management to other Azure services.

1. On the **Tags** tab, optionally add one or more name-value pairs to help you categorize your Azure resources.

1. Select **Review + create**. After validation completes, select **Create**.

    > **Tip:**
    > The time to create and activate an API Management service depends on the service tier. To quickly find a newly created service, select **Pin to dashboard**.

## Go to your API Management instance

1. In the [Azure portal](https://portal.azure.com), search for and select **API Management services**:

    Screenshot that shows API Management services in the search results.

1. On the **API Management services** page, select your API Management instance:

    Screenshot that shows an API Management instance on the API Management services page.

Review the properties of your service on the **Overview** page.

   Screenshot showing the overview section of your API Management instance.

When your API Management service instance is online, you're ready to use it. Start with the tutorial to [import and publish your first API](import-and-publish.md).

## Clean up resources

When no longer needed, you can remove the resource group and all the related resources by following these steps:

1. In the Azure portal, search for and select **Resource groups**. You can also select **Resource groups** on the **Home** page. 

   Screenshot showing Resource groups in the portal search bar.

1. On the **Resource groups** page, select your resource group.

   Screenshot showing your resource groups.

1. On the resource group page, select **Delete resource group**.
   
1. Type the name of your resource group, and then select **Delete**.

   Screenshot showing the button to delete your resource group.

## Next step

> 
> [Import and publish your first API](import-and-publish.md)
