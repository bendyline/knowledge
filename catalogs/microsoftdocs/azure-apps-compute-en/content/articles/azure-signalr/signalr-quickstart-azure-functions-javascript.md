---
title: Azure SignalR Service serverless quickstart - JavaScript
description: A quickstart for using Azure SignalR Service and Azure Functions to create an App showing GitHub star count using JavaScript.
author: vicancy
ms.author: lianwei
ms.date: 04/19/2023
ms.topic: quickstart
ms.service: azure-signalr-service
ms.devlang: javascript
ms.custom: devx-track-js, mode-api
---
# Quickstart: Create a serverless app with Azure Functions and SignalR Service using JavaScript

 In this article, you use Azure SignalR Service, Azure Functions, and JavaScript to build a serverless application to broadcast messages to clients.


> **Important:**
> Raw connection strings appear in this article for demonstration purposes only.
>
> A connection string includes the authorization information required for your application to access Azure SignalR Service. The access key inside the connection string is similar to a root password for your service. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection string using Microsoft Entra ID](concept-connection-string.md#use-microsoft-entra-id) and [authorize access with Microsoft Entra ID](signalr-concept-authorize-azure-active-directory.md).
>
> Avoid distributing access keys to other users, hard-coding them, or saving them anywhere in plain text that is accessible to others. Rotate your keys if you believe they may have been compromised.


## Prerequisites

This quickstart can be run on macOS, Windows, or Linux.

| Prerequisite | Description |
| --- | --- |
| An Azure subscription | If you don't have a subscription, create an [Azure free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) |
| A code editor | You need a code editor such as [Visual Studio Code](https://code.visualstudio.com/). |
| [Azure Functions Core Tools](https://github.com/Azure/azure-functions-core-tools#installing) | Requires version 4.0.5611 or higher to run Node.js v4 programming model. |
| [Node.js LTS](https://nodejs.org/en/download/package-manager/) | See supported node.js versions in the [Azure Functions JavaScript developer guide](../azure-functions/functions-reference-node.md#node-version). |
| [Azurite](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-use-azurite.md) | SignalR binding needs Azure Storage. You can use a local storage emulator when a function is running locally. |
| [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) | Optionally, you can use the Azure CLI to create an Azure SignalR Service instance. |

## Create an Azure SignalR Service instance


 In this section, you create a basic Azure SignalR instance to use for your app. The following steps use the Azure portal to create a new instance, but you can also use the Azure CLI. For more information, see the [**az signalr create**](https://learn.microsoft.com/cli/azure/signalr?view=azure-cli-latest#az-signalr-create\&preserve-view=true) command in the [Azure SignalR Service CLI Reference](https://learn.microsoft.com/cli/azure/service-page/azure%20signalr?view=azure-cli-latest\&preserve-view=true).

1. Sign in to the [Azure portal](https://portal.azure.com).
1. In the upper-left side of the page, select **+ Create a resource**.
1. On the **Create a resource** page, in the **Search services and marketplace** text box, enter **signalr** and then select **SignalR Service** from the list.
1. On the **SignalR Service** page, select **Create**.
1. On the **Basics** tab, you enter the essential information for your new SignalR Service instance. Enter the following values:

| Field | Suggested Value | Description |
| --- | --- | --- |
| **Subscription** | Choose your subscription | Select the subscription you want to use to create a new SignalR Service instance. |
| **Resource group** | Create a resource group named *SignalRTestResources* | Select or create a resource group for your SignalR resource. It's useful to create a new resource group for this tutorial instead of using an existing resource group. To free resources after completing the tutorial, delete the resource group. <br /><br /> Deleting a resource group also deletes all of the resources that belong to the group. This action can't be undone. Before you delete a resource group, make certain that it doesn't contain resources you want to keep.<br /><br />For more information, see [Using resource groups to manage your Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md). |
| **Resource name** | *testsignalr* | Enter a unique resource name to use for the SignalR resource. If *testsignalr* is already taken in your region, add a digit or character until the name is unique. <br /><br />The name must be a string of 1 to 63 characters and contain only numbers, letters, and the hyphen (`-`) character. The name can't start or end with the hyphen character, and consecutive hyphen characters aren't valid. |
| **Region** | Choose your region | Select the appropriate region for your new SignalR Service instance.<br /><br />Azure SignalR Service isn't currently available in all regions. For more information, see [Azure SignalR Service region availability](https://azure.microsoft.com/global-infrastructure/services/?products=signalr-service) |
| **Pricing tier** | Select **Change** and then choose **Free (Dev/Test Only)**. Choose **Select**  to confirm your choice of pricing tier. | Azure SignalR Service has three pricing tiers: Free, Standard, and Premium. Tutorials use the **Free** tier, unless noted otherwise in the prerequisites.<br /><br />For more information about the functionality differences between tiers and pricing, see [Azure SignalR Service pricing](https://azure.microsoft.com/pricing/details/signalr-service/) |
| **Service mode** | Choose the appropriate service mode | Use **Default** when you host the SignalR hub logic in your web apps and use SignalR service as a proxy. Use **Serverless** when you use Serverless technologies such as Azure Functions to host the SignalR hub logic.<br /><br /> **Classic** mode is only for backward compatibility and isn't recommended to use.<br /><br />For more information, see [Service mode in Azure SignalR Service](concept-service-mode.md). |

You don't need to change the settings on the **Networking** and **Tags** tabs for the SignalR tutorials.

6. Select the **Review + create** button at the bottom of the **Basics** tab.
1. On the **Review + create** tab, review the values and then select **Create**. It takes a few moments for deployment to complete.
1. When the deployment is complete, select the **Go to resource** button.
1. On the SignalR resource page, select **Keys** from the menu on the left, under **Settings**.
1. Copy the **Connection string** for the primary key. You need this connection string to configure your app later in this tutorial.

## Setup function project

Make sure you have Azure Functions Core Tools installed.

1. Open a command line.
1. Create project directory and then change into it. 
1. Run the Azure Functions `func init` command to initialize a new project.

  ```bash
  func init --worker-runtime javascript --language javascript --model V4
  ```
  
## Create the project functions

After you initialize a project, you need to create functions. This project requires three functions: 

- `index`: Hosts a web page for a client.
- `negotiate`: Allows a client to get an access token.
- `broadcast`: Uses a time trigger to periodically broadcast messages to all clients.

When you run the `func new` command from the root directory of the project, the Azure Functions Core Tools creates the function source files storing them in a folder with the function name.  You edit the files as necessary replacing the default code with the app code.

### Create the index function

1. Run the following command to create the `index` function.

    ```bash
    func new -n index -t HttpTrigger
    ```

1. Edit *src/functions/httpTrigger.js* and replace the contents with the following json code:

    [Code reference unavailable in this source snapshot: ~/azuresignalr-samples/samples/QuickStartServerless/javascript/v4-programming-model/src/functions/index.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-functions-javascript.md)


### Create the negotiate function

1. Run the following command to create the `negotiate` function.

    ```bash
    func new -n negotiate -t HttpTrigger
    ```

1. Edit *src/functions/negotiate.js* and replace the contents with the following json code:

    [Code reference unavailable in this source snapshot: ~/azuresignalr-samples/samples/QuickStartServerless/javascript/v4-programming-model/src/functions/negotiate.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-functions-javascript.md)

### Create a broadcast function.

1. Run the following command to create the `broadcast` function.

    ```bash
    func new -n broadcast -t TimerTrigger
    ```

1. Edit *src/functions/broadcast.js* and replace the contents with the following code:
  
    [Code reference unavailable in this source snapshot: ~/azuresignalr-samples/samples/QuickStartServerless/javascript/v4-programming-model/src/functions/broadcast.js](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-functions-javascript.md)

### Create the index.html file

The client interface for this app is a web page. The `index` function reads HTML content from the *content/index.html* file.

1. Create a folder called `content` in your project root folder.
1. Create the file *content/index.html*.
1. Copy the following content to the *content/index.html* file and save it:

    [Code reference unavailable in this source snapshot: ~/azuresignalr-samples/samples/QuickStartServerless/javascript/v4-programming-model/src/content/index.html](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-azure-functions-javascript.md)

### Setup Azure Storage

Azure Functions requires a storage account to work. Choose either of the two following options:

* Run the free [Azure Storage Emulator](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-use-azurite.md).
* Use the Azure Storage service. This may incur costs if you continue to use it.

#### [Local emulation](#tab/storage-azurite) 

1. Start the Azurite storage emulator:

    ```bash
    azurite -l azurite -d azurite\debug.log
    ```

1. Make sure the `AzureWebJobsStorage` in *local.settings.json* set to `UseDevelopmentStorage=true`.

#### [Azure Blob Storage](#tab/azure-blob-storage) 

Update the project to use the Azure Blob Storage connection string.

```bash
func settings add AzureWebJobsStorage "<storage-connection-string>"
```

---

### Add the SignalR Service connection string to the function app settings

You're almost done now. The last step is to set the SignalR Service connection string in Azure Function app settings.

1. In the Azure portal, go to the SignalR instance you deployed earlier.
1. Select **Keys** to view the connection strings for the SignalR Service instance.

    Screenshot of Azure SignalR service Keys page.

1. Copy the primary connection string, and execute the command.

    
Raw connection strings appear in this article for demonstration purposes only. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection string using Microsoft Entra ID](concept-connection-string.md#use-microsoft-entra-id) and [authorize access with Microsoft Entra ID](signalr-concept-authorize-azure-active-directory.md).


    ```bash
    func settings add AzureSignalRConnectionString "<signalr-connection-string>"
    ```
  
### Run the Azure Function app locally

Run the Azure Function app in the local environment:

  ```bash
  func start
  ```

After the Azure Function is running locally, go to `http://localhost:7071/api/index`. The page displays the current star count for the GitHub Azure/azure-signalr repository. When you star or unstar the repository in GitHub, you'll see the refreshed count every few seconds.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know.](https://aka.ms/asrs/qscsharp)

## Clean up resources

If you're not going to continue to use this app, delete all resources created by this quickstart with the following steps so you don't incur any charges:

1. In the Azure portal, select **Resource groups** on the far left, and then select the resource group you created. Alternatively, you may use the search box to find the resource group by its name.

1. In the window that opens, select the resource group, and then click **Delete resource group**.

1. In the new window, type the name of the resource group to delete, and then click **Delete**.

## Sample code

You can get all code used in the article from GitHub repository: 

* [aspnet/AzureSignalR-samples](https://github.com/aspnet/AzureSignalR-samples/tree/main/samples/QuickStartServerless/javascript/v4-programming-model).

## Next steps

In this quickstart, you built and ran a real-time serverless application in localhost. Next, learn more about how to bi-directional communicating between clients and Azure Function with SignalR Service.

> 
> [SignalR Service bindings for Azure Functions](../azure-functions/functions-bindings-signalr-service.md)

> 
> [Bi-directional communicating in Serverless](https://github.com/aspnet/AzureSignalR-samples/tree/main/samples/BidirectionChat)

> 
> [Deploy Azure Functions with VS Code](https://learn.microsoft.com/azure/developer/javascript/tutorial-vscode-serverless-node-01)
