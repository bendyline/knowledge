---
title: Create a Relay namespace using the Azure portal | Microsoft Docs
description: This article provides a walkthrough that shows you how to create a Relay namespace using the Azure portal.
ms.topic: how-to
ms.date: 01/24/2026
---

# Create a Relay namespace using the Azure portal

A namespace is a scoping container for all your Azure Relay components. Multiple relays can reside in a single namespace, and namespaces often serve as application containers. There are currently two different ways to create a relay namespace:

1. Azure portal (this article).
2. [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md) templates.

## Create a namespace in the Azure portal

1. Sign in to the [Azure portal].
1. Select **All services** on the left menu. Select **Integration**, search for **Relays**, move the mouse over **Relays**, and then select **Create**. 

    Screenshot showing the selection of Relays -> Create button.
1. On the **Create namespace** page, follow these steps: 
    1. Choose an Azure subscription in which to create the namespace.
    1. For [Resource group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/manage-resource-groups-portal.md), choose an existing resource group in which to place the namespace, or create a new one.  
    1. Enter a name for the Relay namespace. 
    1. Select the region in which your namespace should be hosted.
    1. Select **Review + create** at the bottom of the page.

        Screenshot showing the Create namespace page.
    1. On the **Review + create** page, select **Create**. 
    1. After a few minutes, you see the **Relay** page for the namespace. 

        Screenshot showing the home page for Relay namespace.

### Get management credentials

1. On the **Relay** page, select **Shared access policies** on the left menu.
1. On the **Shared access policies** page, select **RootManageSharedAccessKey**.
1. Under **SAS Policy: RootManageSharedAccessKey**, select the **Copy** button next to **Primary Connection String**. This action copies the connection string to your clipboard for later use. Paste this value into Notepad or some other temporary location.
1. Repeat the preceding step to copy and paste the value of **Primary key** to a temporary location for later use.  

    Screenshot showing the connection info for Relay namespace.

<!--Image references-->

[connection-info]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-relay/includes/media/relay-create-namespace-portal/connection-info.png
[Azure portal]: https://portal.azure.com



## Next steps

* [Relay FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-relay/relay-faq.yml)
* [Get started with .NET](relay-hybrid-connections-dotnet-get-started.md)
* [Get started with Node](relay-hybrid-connections-node-get-started.md)
