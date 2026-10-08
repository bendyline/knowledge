---
title: Set up Multiple Connections
titleSuffix: Azure API Management
description: Learn how to set up multiple connections to a configured API credential provider using the portal. 
services: api-management
ms.service: azure-api-management
ms.topic: how-to
ms.date: 10/01/2025
ms.custom: sfi-image-nochange
---

# Configure multiple connections

**APPLIES TO: All API Management tiers**



You can configure multiple connections to a credential provider in your API Management instance. For example, if you configured Microsoft Entra ID as a credential provider, you might need to create multiple connections for different scenarios and users.

In this article, you learn how to add a connection to an existing provider by using credential manager in the Azure portal. For an overview of credential manager, see [About API credentials and credential manager](credentials-overview.md).

## Prerequisites

* An API Management instance. If you don't have one, see [Create a new Azure API Management instance](get-started-create-service-instance.md).
* A configured credential provider. For example, see the steps to create a provider for [GitHub](credentials-how-to-github.md) or [Microsoft Entra ID](credentials-how-to-azure-ad.md).
 
## Create a connection

1. Sign in to the [Azure portal](https://portal.azure.com) and go to your API Management instance.
1. Under **APIs** in the sidebar menu, select **Credential manager**.
1. Select the credential provider that you want to create multiple connections for.
1. In the credential provider window, select **Overview**, then choose **+ Create connection**.

    Screenshot of creating a connection in the portal.

1. On the **Connection** tab, complete the steps for your connection. 

    

1. Enter a **Connection name**, then select **Save**.
1. Under **Step 2: Login to your connection** (for authorization code grant type), select the **Login** button. Complete steps with your identity provider to authorize access, and return to API Management. After successful login, the status of the connection changes to **Connected**.
1. Under **Step 3: Determine who will have access to this connection (Access policy)**, the managed identity member is listed. Adding other members is optional, depending on your scenario.
1. Select **Complete**.

The new connection appears in the list of connections, and shows a status of **Connected**. If you want to create another connection for the credential provider, complete the preceding steps.


## Manage credentials

You can manage credential provider settings and connections in the portal. For example, you might need to update a client secret for a credential provider.

To update provider settings:

1. Under **APIs** in the sidebar menu, select **Credential manager**.
1. Select the credential provider that you want to manage.
1. In the provider window, select **Settings**.
1. In the provider settings, make updates, and select **Save**.

    Screenshot of updating credential provider settings in the portal.

To update a connection:

1. Under **APIs** in the sidebar menu, select **Credential manager**.
1. Select the credential provider whose connection you want to update.
1. In the provider window, select **Connections**.
1. In the row for the connection you want to update, select the context (...) menu, and select from the options. For example, to manage access policies, select **Edit access policies**.

    Screenshot of updating a connection in the portal.
1. In the window that appears, make updates, and select **Save**.

## Related content

* Learn more about [configuring credential providers](credentials-configure-common-providers.md) in credential manager.
* Review [limits](credentials-overview.md#limits) for credential providers and connections.
