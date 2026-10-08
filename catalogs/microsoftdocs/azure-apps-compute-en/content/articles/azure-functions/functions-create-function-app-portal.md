---
title: Create a function app in the Azure portal
description: Learn how to create a function app for serverless execution in Azure Functions using the Azure portal.
ms.topic: how-to
ms.date: 08/03/2026
zone_pivot_groups: functions-hosting-plan
---

# Create a function app in the Azure portal

This article shows you how to use the Azure portal to create a function app that's hosted in Azure Functions. These hosting plan options, which support dynamic, event-driven scaling, are featured:

| Hosting option | Description |
| --- | --- |
| [Flex Consumption plan](flex-consumption-plan.md) | Linux-only plan that provides rapid horizontal scaling with support for managed identities, virtual networking, and pay-as-you-go billing. |
| [Premium plan](functions-premium-plan.md) | Provides longer execution times, more control over CPU and memory, and support for containers and virtual networks. |
| [Consumption plan](consumption-plan.md) | Legacy dynamic hosting plan that supports Windows apps. |
| [Dedicated (App Service) plan](dedicated-plan.md) | Not covered in this article. See [Create an App Service app in the Azure portal](../app-service/quickstart-custom-container.md). |
| [Container Apps](../container-apps/functions-container-apps.md) | Not covered in this article. See [Create a function app on Azure Container Apps](../container-apps/functions-container-apps.md). |

The Flex Consumption plan is the recommended plan for hosting serverless compute resources in Azure.

Choose your preferred hosting plan at the [top](#top) of the article. For more information about all supported hosting options, see [Azure Functions hosting options](functions-scale.md).  



**Applies to: flex-consumption-plan,consumption-plan,premium-plan**


## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-function-app-portal.md)

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com) by using your Azure account.

## Create a function app

You must have a function app to host the execution of your functions. A function app lets you group functions as a logical unit for easier management, deployment, scaling, and sharing of resources. 

Use these steps to create your function app and related Azure resources in the Azure portal. 



**Applies to: flex-consumption-plan**


1. In the [Azure portal](https://portal.azure.com), from the menu or the **Home** page, select **Create a resource**.

1. Select **Get started** and then **Create** under **Function App**.

1. Under **Select a hosting option**, choose **Flex Consumption** > **Select**.   

1. On the **Basics** page, use the function app settings as specified in the following table:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Subscription** | Your subscription | The subscription in which you create your new function app. |
    | **[Resource Group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | *myResourceGroup* | Name for the new resource group in which you create your function app. |
    | **Function App name** | Globally unique name | Name that identifies your new function app. Valid characters are `a-z` (case insensitive), `0-9`, and `-`. |
    | **Region** | Preferred region | Select a [region](https://azure.microsoft.com/regions/) that's near you or near other services that your functions can access. Unsupported regions aren't displayed. For more information, see [View currently supported regions](flex-consumption-how-to.md#view-currently-supported-regions). |
    | **Runtime stack** | Preferred language | Choose one of the supported language runtime stacks. In-portal editing using Visual Studio Code for the Web is currently only available for Node.js, PowerShell, and Python apps. C# class library and Java functions must be [developed locally](functions-develop-local.md#local-development-environments). |
    | **Version** | Language version | Choose a supported version of your language runtime stack. |
    | **Instance size** | Default | Determines the amount of instance memory allocated for each instance of your app. For more information, see [Instance sizes](flex-consumption-plan.md#instance-sizes). |

1. On the **Storage** page, accept the default behavior of creating a new [default host storage account](storage-considerations.md) or choose to use an existing storage account.


6. On the **Monitoring** page, make sure that **Enable Application Insights** is selected. Accept the default to create a new Application Insights instance, or else choose to use an existing instance. When you create an Application Insights instance, you're also asked to select a Log Analytics **Workspace**.

7. On the **Authentication** page, change the **Authentication type** to **Managed identity** for all resources. With this option, a user-assigned managed identity is also created that your app uses to access these Azure resources using Microsoft Entra ID authentication. Managed identities with Microsoft Entra ID provides the highest level of security for connecting to Azure resources.   

8. Accept the default options in the remaining tabs and then select **Review + create** to review the app configuration you chose.

9. When you're satisfied, select **Create** to provision and deploy the function app and related resources.

10. Select the **Notifications** icon in the upper-right corner of the portal and watch for the **Deployment succeeded** message.

11. Select **Go to resource** to view your new function app. You can also select **Pin to dashboard**. Pinning makes it easier to return to this function app resource from your dashboard.

    Screenshot of deployment notification.

**Applies to: consumption-plan**


1. From the Azure portal menu or the **Home** page, select **Create a resource**.

1. In the **New** page, select **Function App**.

1. Under **Select a hosting option**, select **Consumption** > **Select** to create your app in the default **Consumption** plan. In this [serverless](https://azure.microsoft.com/overview/serverless-computing/) hosting option, you pay only for the time your functions run. [Premium plan](functions-premium-plan.md) also offers dynamic scaling. When you run in an App Service plan, you must manage the [scaling of your function app](functions-scale.md). 

1. On the **Basics** page, use the function app settings as specified in the following table:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Subscription** | Your subscription | The subscription under which you create your new function app. |
    | **[Resource Group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | *myResourceGroup* | Name for the new resource group in which you create your function app. You should create a new resource group because there are [known limitations when creating new function apps in an existing resource group](functions-scale.md#limitations-for-creating-new-function-apps-in-an-existing-resource-group). |
    | **Function App name** | Globally unique name | Name that identifies your new function app. Valid characters are `a-z` (case insensitive), `0-9`, and `-`. To guarantee a unique app name, you can optionally enable **Secure unique default hostname**, which is currently in preview. |
    | **Runtime stack** | Preferred language | Choose a runtime that supports your favorite function programming language. In-portal editing is only available for JavaScript, PowerShell, Python, TypeScript, and C# script.<br/>To create a C# Script app that supports in-portal editing, you must choose a runtime **Version** that supports the **in-process model**.<br/>C# class library and Java functions must be [developed locally](functions-develop-local.md#local-development-environments). |
    | **Version** | Version number | Choose the version of your installed runtime. |
    | **Region** | Preferred region | Select a [region](https://azure.microsoft.com/regions/) that's near you or near other services that your functions can access. |
    | **Operating system** | Windows | An operating system is preselected for you based on your runtime stack selection, but you can change the setting if necessary. In-portal editing is only supported on Windows. |

1. Accept the default options in the remaining tabs, including the default behavior of creating a new storage account on the **Storage** tab and a new Application Insight instance on the **Monitoring** tab. You can also choose to use an existing storage account or Application Insights instance.

1. Select **Review + create** to review the app configuration you chose, and then select **Create** to provision and deploy the function app.

1. Select the **Notifications** icon in the upper-right corner of the portal and watch for the **Deployment succeeded** message.

1. Select **Go to resource** to view your new function app. You can also select **Pin to dashboard**. Pinning makes it easier to return to this function app resource from your dashboard.

    Screenshot of deployment notification.


**Applies to: premium-plan**


1. From the Azure portal menu or the **Home** page, select **Create a resource**.

1. In the **New** page, select **Compute** > **Function App**.

1. Under **Select a hosting option**, select **Functions Premium** > **Select** to create your app in a [Premium plan](functions-premium-plan.md). In this [serverless](https://azure.microsoft.com/overview/serverless-computing/) hosting option, you pay only for the time your functions run. To learn more about different hosting plans, see [Overview of plans](functions-scale.md#overview-of-plans). 

1. On the **Basics** page, use the function app settings as specified in the following table:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Subscription** | Your subscription | The subscription under which this new function app is created. |
    | **[Resource Group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | *myResourceGroup* | Name for the new resource group in which to create your function app. |
    | **Function App name** | Globally unique name | Name that identifies your new function app. Valid characters are `a-z` (case insensitive), `0-9`, and `-`. To guarantee a unique app name, you can optionally enable **Secure unique default hostname**, which is currently in preview. |
    | **Do you want to deploy code or container image?** | Code | Option to publish code files or a Docker container. |
    | **Operating system** | Preferred OS | Choose either Linux or Windows. |
    | **Runtime stack** | Preferred language | Choose a runtime that supports your favorite function programming language. |
    | **Version** | Supported language version | Choose a supported version of your function programming language. |
    | **Region** | Preferred region | Choose a [region](https://azure.microsoft.com/regions/) near you or near other services your functions access. |

1. Under **Environment details** for either **Windows Plan** or **Linux Plan**, select **Create new**, **Name** your App Service plan, and select a **Pricing plan**. The default pricing plan is **EP1**, where EP stands for _elastic premium_. To learn more, see the [list of Premium SKUs](functions-premium-plan.md#available-instance-skus). When running JavaScript functions on a Premium plan, you should choose an instance that has fewer vCPUs. For more information, see [Choose single-core Premium plans](functions-reference-node.md#considerations-for-javascript-functions). 

1. Unless you want to enable [**Zone Redundancy**](https://learn.microsoft.com/azure/reliability/reliability-functions), keep the default value of **Disabled**.    

1. Select **Next: Storage**. On the **Storage** page, create the default host [storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md) required by your function app. Storage account names must be between 3 and 24 characters in length and only can contain numbers and lowercase letters. You can also use an existing account, which must meet the [storage account requirements](storage-considerations.md#storage-account-requirements).

1. Unless you're enabling virtual network integration, select **Next: Monitoring** to skip the **Networking** tab. On the **Monitoring** page, enter the following settings:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | Enable Application Insights | Yes | Enables built-in Application Insight integration for monitoring your functions code. |
    | **[Application Insights](functions-monitoring.md)** | Default | Creates an Application Insights resource of the same *App name* in the nearest supported region. By expanding this setting, you can change the **New resource name** or choose a different **Location** in an [Azure geography](https://azure.microsoft.com/global-infrastructure/geographies/) to store your data. |

1. Select **Review + create** to accept the defaults for the remaining pages and review the app configuration selections.

1. On the **Review + create** page, review your settings, and then select **Create** to provision and deploy the function app.

1. Select the **Notifications** icon in the upper-right corner of the portal and watch for the **Deployment succeeded** message.

1. Select **Go to resource** to view your new function app. You can also select **Pin to dashboard**. Pinning makes it easier to return to this function app resource from your dashboard.

    Deployment notification



**Applies to: dedicated-plan**



> **Note:**
> The content in this article isn't relevant to the currently selected hosting plan. To choose a different plan, use the selector at the top of this article. For a comparison of all hosting plans, see [Azure Functions hosting options](functions-scale.md).


Create function apps in the Dedicated (App Service) plan by using the standard App Service creation flow. For guidance, see [Create an App Service app in the Azure portal](../app-service/quickstart-custom-container.md).



**Applies to: container-apps**



> **Note:**
> The content in this article isn't relevant to the currently selected hosting plan. To choose a different plan, use the selector at the top of this article. For a comparison of all hosting plans, see [Azure Functions hosting options](functions-scale.md).


Function apps hosted on Azure Container Apps use a different creation flow. For guidance, see [Create a function app on Azure Container Apps](../container-apps/functions-container-apps.md).



## Next steps


You can now deploy a code project to the function app resources you created in Azure. 

You can create, verify, and deploy a code project to your new function app from these local environments:

### [Command prompt](#tab/core-tools)

1. [Create the local code project](functions-run-local.md#create-your-local-project)
1. [Verify locally](functions-run-local.md#run-a-local-function)
1. [Publish to Azure](functions-run-local.md#publish)

### [Visual Studio Code](#tab/vs-code)

1. [Create the local code project](functions-develop-vs-code.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs-code.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs-code.md#republish-project-files)
 
### [Visual Studio](#tab/vs)

1. [Create the local code project](functions-develop-vs.md#create-an-azure-functions-project)
1. [Verify locally](functions-develop-vs.md#run-functions-locally)
1. [Publish to Azure](functions-develop-vs.md#publish-to-azure)

---
