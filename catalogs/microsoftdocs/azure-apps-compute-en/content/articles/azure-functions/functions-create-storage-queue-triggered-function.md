---
title: Create a function in Azure triggered by queue messages 
description: Use Azure Functions to create a serverless function that is invoked by messages submitted to a queue in Azure.
ms.assetid: 361da2a4-15d1-4903-bdc4-cc4b27fc3ff4
ms.topic: how-to
ms.date: 09/18/2024
ms.custom:
  - mvc
  - cc996988-fb4f-47
  - sfi-image-nochange
---
# Create a function triggered by Azure Queue storage

Learn how to create a function that is triggered when messages are submitted to an Azure Storage queue.


>**Note:**
>In-portal editing is only supported for JavaScript, PowerShell, and C# Script functions.
>Python in-portal editing is supported only when running in the Consumption plan.
>To create a C# Script app that supports in-portal editing, you must choose a runtime **Version** that supports the **in-process model**.  
>
>When possible, you should [develop your functions locally](functions-develop-local.md).   
>
>To learn more about the limitations on editing function code in the Azure portal, see [Development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal). 


## Prerequisites

- An Azure subscription. If you don't have one, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create an Azure Function app


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


Next, you create a function in the new function app.

<a name="create-function"></a>

## Create a Queue triggered function

1. In your function app, select **Overview**, and then select **+ Create** under **Functions**.

1. Under **Select a template**, scroll down and choose the **Azure Queue Storage trigger** template.

1. In **Template details**, configure the new trigger with the settings as specified in this table, then select **Create**:

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Job type** | Append to app | You only see this setting for a Python v2 app. |
    | **Name** | Unique in your function app | Name of this queue triggered function. |
    | **Queue name** | myqueue-items | Name of the queue to connect to in your Storage account. |
    | **Storage account connection** | AzureWebJobsStorage | You can use the storage account connection already being used by your function app, or create a new one. |

    Azure creates the Queue Storage triggered function based on the provided values. Next, you connect to your Azure storage account and create the **myqueue-items** storage queue.

## Create the queue

1. Return to the **Overview** page for your function app, select your **Resource group**, then find and select the storage account in your resource group.

1. In the storage account page, select **Data storage** > **Queues** > **+ Queue**. 

1. In the **Name** field, type `myqueue-items`, and then select **Create**.

1. Select the new **myqueue-items** queue, which you use to test the function by adding a message to the queue.

## Test the function

1. In a new browser window, return to your function app page and select **Log stream**, which displays real-time logging for your app.
    
1. In the **myqueue-items** queue, select **Add message**, type "Hello World!" in **Message text**, and select **OK**.

1. Go back to your function app logs and verify that the function ran to process the message from the queue.

1. Back in your storage queue, select **Refresh** and verify that the message has been processed and is no longer in the queue.

## Clean up resources

Other quickstarts in this collection build upon this quickstart. If you plan to work with subsequent quickstarts, tutorials, or with any of the services you've created in this quickstart, don't clean up the resources.

*Resources* in Azure refer to function apps, functions, storage accounts, and so forth. They're grouped into *resource groups*, and you can delete everything in a group by deleting the group.

You've created resources to complete these quickstarts. You might be billed for these resources, depending on your [account status](https://azure.microsoft.com/account/) and [service pricing](https://azure.microsoft.com/pricing/). If you don't need the resources anymore, here's how to delete them:


1. In the Azure portal, go to the **Resource group** page. 

   To get to that page from the function app page, select the **Overview** tab, and then select the link under **Resource group**.

   Screenshot that shows select the resource group to delete from the function app page.

   To get to that page from the dashboard, select **Resource groups**, and then select the resource group that you used for this article.

1. In the **Resource group** page, review the list of included resources, and verify that they're the ones you want to delete.

1. Select **Delete resource group** and follow the instructions.

   Deletion might take a couple of minutes. When it's done, a notification appears for a few seconds. You can also select the bell icon at the top of the page to view the notification.



## Next steps

You have created a function that runs when a message is added to a storage queue. For more information about Queue storage triggers, see [Azure Functions Storage queue bindings](functions-bindings-storage-queue.md).

Now that you have a created your first function, let's add an output binding to the function that writes a message back to another queue.

> 
> [Add messages to an Azure Storage queue using Functions](functions-integrate-storage-queue-output-binding.md)
