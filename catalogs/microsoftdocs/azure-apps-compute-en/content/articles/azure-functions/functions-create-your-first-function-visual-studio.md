---
title: "Quickstart: Create your first C# function in Azure using Visual Studio"
description: "In this quickstart, you learn how to use Visual Studio to create and publish a C# HTTP triggered function to Azure Functions."
ms.assetid: 82db1177-2295-4e39-bd42-763f6082e796
ms.topic: quickstart
ms.date: 05/01/2025
ms.devlang: csharp
ms.custom: devx-track-csharp, mvc, devcenter, vs-azure, 23113853-34f2-4f, mode-ui, ai-video-demo
ai-usage: ai-assisted
---

# Quickstart: Create your first C# function in Azure using Visual Studio

Azure Functions lets you use Visual Studio to create local C# function projects and then easily publish this project to run in a scalable serverless environment in Azure. If you prefer to develop your C# apps locally using Visual Studio Code, you should instead consider the [Visual Studio Code-based version](how-to-create-function-vs-code.md?pivot=programming-language-csharp) of this article.

By default, this article shows you how to create C# functions that run on .NET 8 in an [isolated worker process](dotnet-isolated-process-guide.md). Function apps that run in an isolated worker process are supported on all versions of .NET that are supported by Functions. For more information, see [Supported versions](dotnet-isolated-process-guide.md#supported-versions).

In this article, you learn how to:

> 
> * Use Visual Studio to create a C# class library project.
> * Create a function that responds to HTTP requests.
> * Run your code locally to verify function behavior.
> * Deploy your code project to Azure Functions.

Completing this quickstart incurs a small cost of a few USD cents or less in your Azure account.

This video shows you how to create a C# function in Azure.
> [!VIDEO efa236ad-db85-4dfc-9f1e-b353c3b09498]

The steps in the video are also described in the following sections.

## Prerequisites

+ [Visual Studio 2022](https://visualstudio.microsoft.com/vs/). Make sure to select the **Azure development** workload during installation.

+ [Azure subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/guides/developer/azure-developer-guide.md#understanding-accounts-subscriptions-and-billing). If you don't already have an account, [create a free one](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create a function app project

The Azure Functions project template in Visual Studio creates a C# class library project that you can publish to a function app in Azure. You can use a function app to group functions as a logical unit for easier management, deployment, scaling, and sharing of resources.

1. From the Visual Studio menu, select **File** > **New** > **Project**.

1. In **Create a new project**, enter *functions* in the search box, choose the **Azure Functions** template, and then select **Next**.

1. In **Configure your new project**, enter a **Project name** for your project, and then select **Next**. The function app name must be valid as a C# namespace, so don't use underscores, hyphens, or any other nonalphanumeric characters.

1. For the remaining **Additional information** settings, 
     
    | Setting | Value | Description |
    | --- | --- | --- |
    | **Functions worker** | **.NET 8.0 Isolated (Long Term Support)** | Your functions run on .NET 8 in an isolated worker process. |
    | **Function** | **HTTP trigger** | This value creates a function triggered by an HTTP request. |
    | **Use Azurite for runtime storage account (AzureWebJobsStorage)** | Enable | Because a function app in Azure requires a storage account, one is assigned or created when you publish your project to Azure. An HTTP trigger doesn't use an Azure Storage account connection string; all other trigger types require a valid Azure Storage account connection string. When you select this option, the [Azurite emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-use-azurite.md?tabs=visual-studio) is used. |
    | **Authorization level** | **Anonymous** | The created function can be triggered by any client without providing a key. This authorization setting makes it easy to test your new function. For more information, see [Authorization level](functions-bindings-http-webhook-trigger.md#http-auth). |
    
     Screenshot of Azure Functions project settings.
    
    Make sure you set the **Authorization level** to **Anonymous**. If you choose the default level of **Function**, you're required to present the [function key](function-keys-how-to.md) in requests to access your function endpoint in Azure.

2. Select **Create** to create the function project and HTTP trigger function.

Visual Studio creates a project and class that contains boilerplate code for the HTTP trigger function type. The boilerplate code sends an HTTP response that includes a value from the request body or query string. The `HttpTrigger` attribute specifies that the function is triggered by an HTTP request.

## Rename the function

The `Function` method attribute sets the name of the function, which by default is generated as `Function1`. Since the tooling doesn't let you override the default function name when you create your project, take a minute to create a better name for the function class, file, and metadata.

1. In **File Explorer**, right-click the Function1.cs file and rename it to `HttpExample.cs`.

1. In the code, rename the Function1 class to `HttpExample`.

1. In the method named `Run`, rename the `Function` method attribute to `HttpExample`.

Your function definition should now look like the following code:

```csharp
[Function("HttpExample")]
public IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
{
    _logger. LogInformation("C# HTTP trigger function processed a request.");
    return new OkObjectResult("Hello, functions");
}
```

Now that you've renamed the function, you can test it on your local computer.

## Run the function locally

Visual Studio integrates with Azure Functions Core Tools so that you can test your functions locally using the full Azure Functions runtime.


1. To run your function, press <kbd>F5</kbd> in Visual Studio. You might need to enable a firewall exception so that the tools can handle HTTP requests. Authorization levels are never enforced when you run a function locally.

2. Copy the URL of your function from the Azure Functions runtime output.

    Azure local runtime

3. Paste the URL for the HTTP request into your browser's address bar and run the request. The following image shows the response in the browser to the local GET request returned by the function: 

    Function localhost response in the browser

4. To stop debugging, press <kbd>Shift</kbd>+<kbd>F5</kbd> in Visual Studio.


After you've verified that the function runs correctly on your local computer, it's time to publish the project to Azure.

## Publish the project to Azure

Visual Studio can publish your local project to Azure. Before you can publish your project, you must have a function app in your Azure subscription. If you don't already have a function app in Azure, Visual Studio can help you create one before you publish your project. In this article, you create a function app that runs on Linux in a Flex Consumption plan, which is the recommended plan for event-driven and secure serverless functions.


1. In **Solution Explorer**, right-click the project and then select **Publish**.

1. On the **Publish** page, make the following selections:
   - On **Target**, select **Azure**, and then select **Next**.
   - On **Specific target**, select **Azure Function App**, and then select **Next**.  
   - On **Functions instance**, select **Create new**.

   Screenshot of the Publish page. In the Functions instance section, a resource group is visible, and Create new is highlighted.

1. Create a new instance by using the values specified in the following table:

   | Setting | Value | Description |
   | --- | --- | --- |
   | **Name** | A globally unique name | The name must uniquely identify your new function app. Accept the suggested name or enter a new name. The following characters are valid: `a-z`, `0-9`, and `-`. |
   | **Subscription name** | The name of your subscription | The function app is created in an Azure subscription. Accept the default subscription or select a different one from the list. |
   | **[Resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md)** | The name of your resource group | The function app is created in a resource group. Select **New** to create a new resource group. You can also select an existing resource group from the list. |
   | **[Plan Type](functions-scale.md)** | **Flex Consumption** | When you publish your project to a function app that runs in a [Flex Consumption plan](flex-consumption-plan.md), you might pay only for executions of your functions app. Other hosting plans can incur higher costs.<blockquote>**IMPORTANT:**<br/>When creating a Flex Consumption plan, you must first select **App service plan** and then reselect **Flex Consumption** to clear an issue with the dialog.</blockquote> |
   | **Operating system** | **Linux** | The Flex Consumption plan currently requires Linux. |
   | **Location** | The location of the app service | Select a location in an [Azure region supported by the Flex Consumption plan](flex-consumption-how-to.md#view-currently-supported-regions). When an unsupported region is selected, the **Create** button is grayed-out. |
   | **Instance memory size** | **2048** | The [memory size of the virtual machine instances](flex-consumption-plan.md#instance-sizes) in which the app runs is unique to the Flex Consumption plan. |
   | **[Azure Storage](storage-considerations.md)** | A general-purpose storage account | The Functions runtime requires a Storage account. Select **New** to configure a general-purpose storage account. You can also use an existing account that meets the [storage account requirements](storage-considerations.md#storage-account-requirements). |
   | **[Application Insights](functions-monitoring.md)** | An Application Insights instance | You should turn on Application Insights integration for your function app. Select **New** to create a new instance, either in a new or in an existing Log Analytics workspace. You can also use an existing instance. |

   Screenshot of the Function App Create new dialog. Fields for the name, subscription, resource group, plan, and other settings are filled in.

1. Select **Create** to create a function app and its related resources in Azure. The status of resource creation is shown in the lower-left corner of the window.

1. Select **Finish**. The **Publish profile creation progress** window appears. When the profile is created, select **Close**.

1. On the publish profile page, select **Publish** to deploy the package that contains your project files to your new function app in Azure.

   When deployment is complete, the root URL of the function app in Azure is shown on the publish profile page.

1. On the publish profile page, go to the **Hosting** section. Select the ellipsis (**...**), and then select **Open in Azure portal**. The new function app Azure resource opens in the Azure portal.

    Screenshot of the publish profile page. In the Hosting section, the ellipsis shortcut menu is open, and Open in Azure portal is highlighted.


## Verify your function in Azure

1. In the Azure portal, you should be in the **Overview** page for your new functions app. 

1. Under **Functions**, select your new function named **HttpExample**, then in the function page select **Get function URL** and then the **Copy to clipboard icon**. 

1. In the address bar in your browser, paste the URL you copied and run the request.

    The URL that calls your HTTP trigger function is in the following format:

    `https://<APP_NAME>.azurewebsites.net/api/HttpExample?name=Functions`

1. Go to this URL and you see a response in the browser to the remote GET request returned by the function, which looks like the following example:

    Function response in the browser

## Clean up resources

*Resources* in Azure refer to function apps, functions, storage accounts, and so forth. They're grouped into *resource groups*, and you can delete everything in a group by deleting the group.

You created Azure resources to complete this quickstart. You could be billed for these resources, depending on your [account status](https://azure.microsoft.com/account/) and [service pricing](https://azure.microsoft.com/pricing/). Other quickstarts in this collection build upon this quickstart. If you plan to work with subsequent quickstarts, tutorials, or with any of the services you've created in this quickstart, don't clean up the resources.


Use the following steps to delete the function app and its related resources to avoid incurring any further costs.

1. In the Visual Studio Publish dialogue, in the Hosting section, select **Open in Azure portal**. 

1. In the function app page, select the **Overview** tab and then select the link under **Resource group**.

   Select the resource group to delete from the function app page

2. In the **Resource group** page, review the list of included resources, and verify that they're the ones you want to delete.
 
3. Select **Delete resource group**, and follow the instructions.

   Deletion may take a couple of minutes. When it's done, a notification appears for a few seconds. You can also select the bell icon at the top of the page to view the notification.

## Next steps

In this quickstart, you used Visual Studio to create and publish a C# function app in Azure with a simple HTTP trigger function.

To learn more about working with C# functions that run in an isolated worker process, see the [Guide for running C# Azure Functions in an isolated worker process](dotnet-isolated-process-guide.md). Check out [.NET supported versions](functions-dotnet-class-library.md#supported-versions) to see other versions of supported .NET versions in an isolated worker process.

Advance to the next article to learn how to add an Azure Storage queue binding to your function:
> 
> [Add an Azure Storage queue binding to your function](functions-add-output-binding-storage-queue-vs.md?tabs=isolated-process)
