---
title: Create a Java function in Azure Functions using IntelliJ 
description: Learn how to use IntelliJ to create an HTTP-triggered Java function and then run it in a serverless environment in Azure.
author: KarlErickson
ms.author: karler
ms.reviewer: jialuogan
ms.topic: quickstart
ms.date: 06/18/2026
ms.devlang: java
ms.custom:
  - mvc
  - devcenter
  - devx-track-java
  - devx-track-extended-java
  - sfi-image-nochange
---

# Create your first Java function in Azure using IntelliJ

This article shows you how to use Java and IntelliJ to create an Azure function.

Specifically, this article shows you:

- How to create an HTTP-triggered Java function in an IntelliJ IDEA project.
- Steps for testing and debugging the project in the integrated development environment (IDE) on your own computer.
- Instructions for deploying the function project to Azure Functions.

<!-- TODO ![Access a Hello World function from the command line with cURL](media/functions-create-java-maven/hello-azure.png) -->

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure supported Java Development Kit (JDK)](https://learn.microsoft.com/azure/developer/java/fundamentals/java-support-on-azure), version 8, 11, 17 or 21. (Java 21 is currently supported on Linux only)
- An [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) Ultimate Edition or Community Edition installed
- [Maven 3.5.0+](https://maven.apache.org/download.cgi)
- Latest [Function Core Tools](https://github.com/Azure/azure-functions-core-tools)

## Install plugin and sign in

To install the Azure Toolkit for IntelliJ and then sign in, follow these steps:

1. In IntelliJ IDEA's **Settings/Preferences** dialog (Ctrl+Alt+S), select **Plugins**. Then, find the **Azure Toolkit for IntelliJ** in the **Marketplace** and select **Install**. After it's installed, select **Restart** to activate the plugin.

   Azure Toolkit for IntelliJ plugin in Marketplace.

2. To sign in to your Azure account, open the **Azure Explorer** sidebar, and then select the **Azure Sign In** icon in the bar on top (or from the IDEA menu, select **Tools > Azure > Azure Sign in**).

   The IntelliJ Azure Sign In command.

3. In the **Azure Sign In** window, select **OAuth 2.0**, and then select **Sign in**. For other sign-in options, see [Sign-in instructions for the Azure Toolkit for IntelliJ](https://learn.microsoft.com/azure/developer/java/toolkit-for-intellij/sign-in-instructions).

   The Azure Sign In window with device login selected.

4. In the browser, sign in with your account and then go back to IntelliJ. In the **Select Subscriptions** dialog box, select the subscriptions that you want to use, then select **Select**.

   The Select Subscriptions dialog box.

## Create your local project

To use Azure Toolkit for IntelliJ to create a local Azure Functions project, follow these steps:

1. Open IntelliJ IDEA's **Welcome** dialog, select **New Project** to open a new project wizard, then select **Azure Functions**.

   Create function project.

1. Select **Http Trigger**, then select **Next** and follow the wizard to go through all the configurations in the following pages. Confirm your project location, then select **Finish**. IntelliJ IDEA then opens your new project.

   Create function project finish.

## Run the project locally

To run the project locally, follow these steps:

> **Important:**
> You must have the JAVA_HOME environment variable set correctly to the JDK directory that is used during code compiling using Maven. Make sure that the version of the JDK is at least as high as the `Java.version` setting.

1. Navigate to *src/main/java/org/example/functions/HttpTriggerJava.java* to see the code generated. Beside line 17, you should see a green **Run** button. Select it and then select **Run 'Functions-azur...'**. You should see your function app running locally with a few logs.

   Local run project.

   Local run project output.

1. You can try the function by accessing the displayed endpoint from browser, such as `http://localhost:7071/api/HttpTriggerJava?name=Azure`.

   Local run function test result.

1. The log is also displayed in your IDEA. Stop the function app by selecting **Stop**.

   Local run function test log.

## Debug the project locally

To debug the project locally, follow these steps:

1. Select the **Debug** button in the toolbar. If you don't see the toolbar, enable it by choosing **View** > **Appearance** > **Toolbar**.

   Local debug function app button.

1. Select line 20 of the file *src/main/java/org/example/functions/HttpTriggerJava.java* to add a breakpoint. Access the endpoint `http://localhost:7071/api/HttpTriggerJava?name=Azure` again and you should find that the breakpoint is hit. You can then try more debug features like **Step**, **Watch**, and **Evaluation**. Stop the debug session by selecting **Stop**.

   Local debug function app break.

## Create the function app in Azure

Use the following steps create a function app and related resources in your Azure subscription:

1. In Azure Explorer in your IDEA, right-click **Function App** and then select **Create**.

1. Select **More Settings** and provide the following information at the prompts:

   | Prompt | Selection |
   | --- | --- |
   | **Subscription** | Choose the subscription to use. |
   | **Resource Group** | Choose the resource group for your function app. |
   | **Name** | Specify the name for a new function app. Here you can accept the default value. |
   | **Platform** | Select **Windows-Java 17** or another platform as appropriate. |
   | **Region** | For better performance, choose a [region](https://azure.microsoft.com/regions/) near you. |
   | **Hosting Options** | Choose the hosting options for your function app. |
   | **Plan** | Choose the App Service plan pricing tier you want to use, or select **+** to create a new App Service plan. |

   > **Important:**
   > To create your app in the Flex Consumption plan, select **Flex Consumption**. The [Flex Consumption plan](flex-consumption-plan.md) is currently in preview.

1. Select **OK**. A notification is displayed after your function app is created.

## Deploy your project to Azure

To deploy your project to Azure, follow these steps:

1. Select and expand the Azure icon in IntelliJ Project explorer, then select **Deploy to Azure -> Deploy to Azure Functions**.

   Deploy project to Azure.

1. You can select the function app from the previous section. To create a new one, select **+** on the **Function** line. Type in the function app name and choose the proper platform. Here, you can accept the default value. Select **OK** and the new function app you created is automatically selected. Select **Run** to deploy your functions.

   Create function app in Azure.

   Deploy function app to Azure log.

## Manage function apps from IDEA

To manage your function apps with **Azure Explorer** in your IDEA, follow these steps:

1. Select **Function App** to see all your function apps listed.

   View function apps in explorer.

1. Select one of your function apps, then right-click and select **Show Properties** to open the detail page.

   Show function app properties.

1. Right-click your **HttpTrigger-Java** function app, then select **Trigger Function in Browser**. You should see that the browser is opened with the trigger URL.

   Screenshot shows a browser with the U R L.

## Add more functions to the project

To add more functions to your project, follow these steps:

1. Right-click the package **org.example.functions** and select **New -> Azure Function Class**.

   Add functions to the project entry.

1. Fill in the class name **HttpTest** and select **HttpTrigger** in the create function class wizard, then select **OK** to create. In this way, you can create new functions as you want.

   Screenshot shows the Create Function Class dialog box.

   Add functions to the project output.

## Cleaning up functions

Select one of your function apps using **Azure Explorer** in your IDEA, then right-click and select **Delete**. This command might take several minutes to run. When it's done, the status refreshes in **Azure Explorer**.

Screenshot shows Delete selected from a context menu.

## Next steps

You've created a Java project with an HTTP triggered function, run it on your local machine, and deployed it to Azure. Now, extend your function by continuing to the following article:

> 
> [Adding an Azure Storage queue output binding](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/functions-add-output-binding-storage-queue-java.md)
