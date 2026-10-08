---
author: ggailey777
ms.service: azure-functions
ms.custom:
  - build-2024
ms.date: 11/14/2025
ms.author: glenga
ms.topic: include
---

1. In the [Azure portal](https://portal.azure.com), from the menu or the **Home** page, select **Create a resource**.

1. Select **Get started** and then **Create** under **Function App**.

1. Under **Select a hosting option**, choose **Flex Consumption** > **Select**.   

1. On the **Basics** page, use the function app settings as specified in the following table:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Subscription** | Your subscription | The subscription in which you create your new function app. |
    | **[Resource Group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | *myResourceGroup* | Name for the new resource group in which you create your function app. |
    | **Function App name** | Globally unique name | Name that identifies your new function app. Valid characters are `a-z` (case insensitive), `0-9`, and `-`. |
    | **Region** | Preferred region | Select a [region](https://azure.microsoft.com/regions/) that's near you or near other services that your functions can access. Unsupported regions aren't displayed. For more information, see [View currently supported regions](../articles/azure-functions/flex-consumption-how-to.md#view-currently-supported-regions). |
    | **Runtime stack** | Preferred language | Choose one of the supported language runtime stacks. In-portal editing using Visual Studio Code for the Web is currently only available for Node.js, PowerShell, and Python apps. C# class library and Java functions must be [developed locally](../articles/azure-functions/functions-develop-local.md#local-development-environments). |
    | **Version** | Language version | Choose a supported version of your language runtime stack. |
    | **Instance size** | Default | Determines the amount of instance memory allocated for each instance of your app. For more information, see [Instance sizes](../articles/azure-functions/flex-consumption-plan.md#instance-sizes). |

1. On the **Storage** page, accept the default behavior of creating a new [default host storage account](../articles/azure-functions/storage-considerations.md) or choose to use an existing storage account.


6. On the **Monitoring** page, make sure that **Enable Application Insights** is selected. Accept the default to create a new Application Insights instance, or else choose to use an existing instance. When you create an Application Insights instance, you're also asked to select a Log Analytics **Workspace**.

7. On the **Authentication** page, change the **Authentication type** to **Managed identity** for all resources. With this option, a user-assigned managed identity is also created that your app uses to access these Azure resources using Microsoft Entra ID authentication. Managed identities with Microsoft Entra ID provides the highest level of security for connecting to Azure resources.   

8. Accept the default options in the remaining tabs and then select **Review + create** to review the app configuration you chose.

9. When you're satisfied, select **Create** to provision and deploy the function app and related resources.

10. Select the **Notifications** icon in the upper-right corner of the portal and watch for the **Deployment succeeded** message.

11. Select **Go to resource** to view your new function app. You can also select **Pin to dashboard**. Pinning makes it easier to return to this function app resource from your dashboard.

    Screenshot of deployment notification.
