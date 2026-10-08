---
title: Create an HTTP endpoint using Azure Functions in the portal
description: Learn how to use an HTTP trigger to create a function app with an HTTP endpoint using the Azure portal.
ms.topic: how-to
ms.date: 05/08/2025
ms.custom: 
  - devx-track-csharp
  - mvc
  - devcenter
  - cc996988-fb4f-47
  - devdivchpfy22
  - devx-track-extended-java
  - devx-track-js
  - devx-track-python
  - build-2024
  - devx-track-ts
zone_pivot_groups: programming-languages-set-functions-no-go
---

# Create an HTTP endpoint using Azure Functions in the portal

Azure Functions lets you run your code in a serverless environment without having to first create a virtual machine (VM) or publish a web application. In this article, you learn how to use Azure Functions to create a "hello world" HTTP trigger function in the Azure portal. 

Choose your preferred programming language at the top of the article.

**Applies to: programming-language-csharp**

>**Note:**
>Editing your C# function code in the Azure portal is currently only supported for [C# script (.csx) functions](functions-reference-csharp.md). To learn more about the limitations on editing function code in the Azure portal, see [Development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal). 
>
> You should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Visual Studio](functions-create-your-first-function-visual-studio.md)
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-csharp)
+ [Terminal/command prompt](how-to-create-function-azure-cli.md?pivots=programming-language-csharp)

**Applies to: programming-language-java**

>**Note:**
>Editing your Java function code in the Azure portal isn't currently supported. For more information, see [Development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal). 
> 
> You should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Eclipse](functions-create-maven-eclipse.md)
>+ [Gradle](functions-create-first-java-gradle.md)
>+ [IntelliJ IDEA](functions-create-maven-intellij.md) 
+ [Maven](how-to-create-function-azure-cli.md?pivots=programming-language-java)
>+ [Quarkus](functions-create-first-quarkus.md)
>+ [Spring Cloud](https://learn.microsoft.com/azure/developer/java/spring-framework/getting-started-with-spring-cloud-function-in-azure?toc=/azure/azure-functions/toc.json)
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-java) 

**Applies to: programming-language-javascript**

>**Note:**
>Because of [development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal), you should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-javascript)
+ [Terminal/command prompt](how-to-create-function-azure-cli.md?pivots=programming-language-javascript)

**Applies to: programming-language-python**

>**Note:**
>Because of [development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal), you should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-python)
+ [Terminal/command prompt](how-to-create-function-azure-cli.md?pivots=programming-language-python)

**Applies to: programming-language-typescript**

>**Note:**
>Editing your TypeScript function code in the Azure portal isn't currently supported. For more information, see [Development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal). 
> 
> You should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-typescript)
+ [Terminal/command prompt](how-to-create-function-azure-cli.md?pivots=programming-language-typescript)

**Applies to: programming-language-powershell**

>**Note:**
>Because of [development limitations in the Azure portal](functions-how-to-use-azure-function-app-settings.md#development-limitations-in-the-azure-portal), you should instead [develop your functions locally](functions-develop-local.md) and publish to a function app in Azure. Use one of the following links to get started with your chosen local development environment:
>+ [Visual Studio Code](how-to-create-function-vs-code.md?pivot=programming-language-powershell)
+ [Terminal/command prompt](how-to-create-function-azure-cli.md?pivots=programming-language-powershell)


Please review the [known issues](recover-python-functions.md#development-issues-in-the-azure-portal) for development of Azure Functions using Python in the Azure portal.

## Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-create-http-endpoint.md)

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com) with your Azure account.

## Create a function app

You must have a function app to host the execution of your functions. A function app lets you group functions as a logical unit for easier management, deployment, scaling, and sharing of resources. 

Use these steps to create your function app and related Azure resources, whether or not you're able to edit your code in the Azure portal. 
**Applies to: programming-language-csharp**

To be able to create a C# script app that you can edit in the portal, choose **8 (LTS), in-process model** for .NET **Version**.



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


Next, create a function in the new function app.

**Applies to: programming-language-python,programming-language-javascript,programming-language-powershell,programming-language-csharp**

## <a name="create-function"></a>Create an HTTP trigger function

1. In your function app, select **Overview**, and then select **+ Create** under **Functions**. If you don't see the **+ Create** button, you must instead [create your functions locally](functions-develop-local.md).

1. Under **Select a template**, scroll down and choose the **HTTP trigger** template.

1. In **Template details**, use `HttpExample` for **New Function**, select **Anonymous** from the **[Authorization level](functions-bindings-http-webhook-trigger.md#http-auth)** drop-down list, and then select **Create**.

    Azure creates the HTTP trigger function. Now, you can run the new function by sending an HTTP request.

**Applies to: programming-language-java,programming-language-csharp,programming-language-typescript,programming-language-python**

## Create your functions locally

If you aren't able to create your function code in the portal, you can instead create a local project and publish the function code to your new function app.

1. In your function app, select **Overview**, and then in **Create functions in your preferred environment** under **Functions**.

1. Choose your preferred local development environment and follow the steps in the linked article to create and publish your first Azure Functions project. 

    >**Tip:**
    >When publishing your new project, make sure to use the function app and related resources you just created. 


## Test the function

> **Tip:**
> The **Code + Test** functionality in the portal works even for functions that are read-only and can't be edited in the portal.

1. On the **Overview** page for your new function app, select your new HTTP triggered function in the **Functions** tab.

1. In the left menu, expand **Developer**, select **Code + Test**, and then select **Test/Run**.

1. In the **Test/Run** dialog, select **Run**. 

    An HTTP POST request is sent to your new function with a payload that contains the `name` value of `Azure`. You can also test the function by selecting **GET** for **HTTP method** and adding a `name` parameter with a value of `YOUR_NAME`. 

    >**Tip:**
    >To test in an external browser, instead select **Get function URL**, copy the **default (Function key)** value, add the query string value `&name=<YOUR_NAME>` to the end of this URL, and then submit the URL in the address bar of your web browser.

1. When your function runs, trace information is written to the logs. To see the trace output, return to the **Code + Test** page in the portal and expand the **Logs** arrow at the bottom of the page. Call your function again to see the trace output written to the logs.


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

Now that you've created your first function, let's add an output binding to the function that writes a message to a Storage queue.

> 
> [Add messages to an Azure Storage queue using Functions](functions-integrate-storage-queue-output-binding.md)
