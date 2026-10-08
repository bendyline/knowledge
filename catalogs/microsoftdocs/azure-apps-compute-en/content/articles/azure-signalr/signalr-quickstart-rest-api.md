---
title: Quickstart - Azure SignalR Service REST API
description: Learn how to use REST API with Azure SignalR Service following samples. Find details of REST API specification.
author: vicancy
ms.service: azure-signalr-service
ms.topic: quickstart
ms.date: 06/03/2026
ms.author: lianwei
ms.custom: mode-api
---
# Quickstart: Broadcast real-time messages from console app

Azure SignalR Service provides [REST API](https://github.com/Azure/azure-signalr/blob/dev/docs/rest-api.md) to support server-to-client communication scenarios such as broadcasting. You can choose any programming language that can make REST API calls. You can post messages to all connected clients, a specific client by name, or a group of clients.

In this quickstart, you learn how to send messages from a command-line app to connected client apps in C#.


> **Important:**
> Raw connection strings appear in this article for demonstration purposes only.
>
> A connection string includes the authorization information required for your application to access Azure SignalR Service. The access key inside the connection string is similar to a root password for your service. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection string using Microsoft Entra ID](concept-connection-string.md#use-microsoft-entra-id) and [authorize access with Microsoft Entra ID](signalr-concept-authorize-azure-active-directory.md).
>
> Avoid distributing access keys to other users, hard-coding them, or saving them anywhere in plain text that is accessible to others. Rotate your keys if you believe they may have been compromised.


## Prerequisites

This quickstart can be run on macOS, Windows, or Linux.

* [.NET Core SDK](https://dotnet.microsoft.com/download)
* A text editor or code editor of your choice.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/quickstarts-free-trial-note.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/signalr-quickstart-rest-api.md)

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Sign in to Azure

Sign in to the [Azure portal](https://portal.azure.com) using your Azure account.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).


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

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Clone the sample application

While the service is being deployed, let's get the code ready. First, clone the [sample app from GitHub](https://github.com/aspnet/AzureSignalR-samples.git). Next, set the SignalR Service connection string to the app. Finally, run the application locally.

1. Open a git terminal window. Change to a folder where you want to clone the sample project.

1. Run the following command to clone the sample repository. This command creates a copy of the sample app on your computer.

    ```bash
    git clone https://github.com/aspnet/AzureSignalR-samples.git
    ```
Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Build and run the sample

This sample is a console app showing the use of Azure SignalR Service. It provides two modes:

- Server Mode: use simple commands to call Azure SignalR Service REST API.
- Client Mode: connect to Azure SignalR Service and receive messages from server.

You also learn how to generate an access token to authenticate with Azure SignalR Service.

### Build the executable file

We use macOS osx.10.13-x64 as example. You can find [reference](https://learn.microsoft.com/dotnet/core/rid-catalog) on how to build on other platforms.

```bash
cd AzureSignalR-samples/samples/Serverless/

dotnet publish -c Release -r osx.10.13-x64
```

### Start a client


Raw connection strings appear in this article for demonstration purposes only. In production environments, always protect your access keys. Use Azure Key Vault to manage and rotate your keys securely and [secure your connection string using Microsoft Entra ID](concept-connection-string.md#use-microsoft-entra-id) and [authorize access with Microsoft Entra ID](signalr-concept-authorize-azure-active-directory.md).


```bash
cd bin/Release/netcoreapp2.1/osx.10.13-x64/

Serverless client <ClientName> -c "<ConnectionString>" -h <HubName>
```

### Start a server

```bash
cd bin/Release/netcoreapp2.1/osx.10.13-x64/

Serverless server -c "<ConnectionString>" -h <HubName>
```

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Run the sample without publishing

You can also run the following command to start a server or client

```bash
# Start a server
dotnet run -- server -c "<ConnectionString>" -h <HubName>

# Start a client
dotnet run -- client <ClientName> -c "<ConnectionString>" -h <HubName>
```

### Use user-secrets to specify Connection String

You can run `dotnet user-secrets set Azure:SignalR:ConnectionString "<ConnectionString>"` in the root directory of the sample. After that, you don't need the option `-c "<ConnectionString>"` anymore.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Usage

After the server started, use the command to send message:

```
send user <User Id>
send users <User List>
send group <Group Name>
send groups <Group List>
broadcast
```

You can start multiple clients with different client names.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## <a name="usage"> </a> Integration with non-Microsoft services

The Azure SignalR service allows non-Microsoft services to integrate with the system.

### Definition of technical specifications

See [REST API Versions](signalr-reference-data-plane-rest-api.md#rest-api-versions) for all supported API versions and specifications.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Clean up resources

If you're not going to continue to use this app, delete all resources created by this quickstart with the following steps so you don't incur any charges:

1. In the Azure portal, select **Resource groups** on the far left, and then select the resource group you created. Alternatively, you may use the search box to find the resource group by its name.

1. In the window that opens, select the resource group, and then click **Delete resource group**.

1. In the new window, type the name of the resource group to delete, and then click **Delete**.

Having issues? Try the [troubleshooting guide](signalr-howto-troubleshoot-guide.md) or [let us know](https://aka.ms/asrs/qsapi).

## Next steps

In this quickstart, you learned how to use REST API to broadcast real-time message from SignalR Service to clients. Next, learn more about how to develop and deploy Azure Functions with SignalR Service binding, which is built on top of REST API.

> 
> [Develop Azure Functions using Azure SignalR Service bindings](signalr-quickstart-azure-functions-csharp.md)
