---
title: Create a function in Azure that runs on a schedule
description: Learn how to use the Azure portal to create a function that runs based on a schedule that you define.
ms.assetid: ba50ee47-58e0-4972-b67b-828f2dc48701
ms.topic: how-to
ms.date: 05/07/2025
ms.custom:
  - mvc
  - cc996988-fb4f-47
  - devdivchpfy22
  - sfi-image-nochange
---
# Create a function in the Azure portal that runs on a schedule

Learn how to use the Azure portal to create a function that runs [serverless](https://azure.microsoft.com/solutions/serverless/) on Azure based on a schedule that you define.


>**Note:**
>In-portal editing is only supported for JavaScript, PowerShell, and C# Script functions.
>Python in-portal editing is supported only when running in the Consumption plan.
>To create a C# Script app that supports in-portal editing, you must choose a runtime **Version** that supports the **in-process model**.  
>
>When possible, you should [develop your functions locally](functions-develop-local.md).   
>
>To learn more about the limitations on editing function code in the Azure portal, see [Development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal). 


## Prerequisites

To complete this tutorial:

Ensure that you have an Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create a function app


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


Your new function app is ready to use. Next, you create a function in the new function app.

Screenshot showing successful creation of the function app.

<a name="create-function"></a>

## Create a timer triggered function

1. In your function app, select **Overview**, and then select **+ Create** under **Functions**.

   Screenshot of adding a function in the Azure portal.

1. Under **Select a template**, scroll down and choose the **Timer trigger** template.

    Screenshot of select the timer trigger page in the Azure portal.

1. In **Template details**, configure the new trigger with the settings as specified in the table below the image, and then select **Create**.

    Screenshot that shows the New Function page with the Timer Trigger template selected.

    | Setting | Suggested value | Description |
    | --- | --- | --- |
    | **Name** | Default | Defines the name of your timer triggered function. |
    | **Schedule** | 0 \*/1 \* \* \* \* | A six field [CRON expression](functions-bindings-timer.md#ncrontab-expressions) that schedules your function to run every minute. |

## Test the function

1. In your function, select **Code + Test** and expand the **Logs**.

    Screenshot of the Test the timer trigger page in the Azure portal.

1. Verify execution by viewing the information written to the logs.

    Screenshot showing the View the timer trigger page in the Azure portal.

Now, you change the function's schedule so that it runs once every hour instead of every minute.

## Update the timer schedule

1. In your function, select **Integration**. Here, you define the input and output bindings for your function and also set the schedule.

1. Select **Timer (myTimer)**.

    Screenshot of Update the timer schedule page in the Azure portal.

1. Update the **Schedule** value to `0 0 */1 * * *`, and then select **Save**.  

    Screenshot of the Update function timer schedule page in the Azure portal.

You now have a function that runs once every hour, on the hour.

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

You created a function that runs based on a schedule. For more information about timer triggers, see [Timer trigger for Azure Functions](functions-bindings-timer.md).

Now that you've created your first function, let's add an output binding to the function that writes a message to a Storage queue.

> 
> [Add messages to an Azure Storage queue using Functions](functions-integrate-storage-queue-output-binding.md)
