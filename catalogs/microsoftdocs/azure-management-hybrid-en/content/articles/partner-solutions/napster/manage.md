---
title: Manage a Napster API resource in Azure
description: Learn how to manage your Napster API resource in the Azure portal, including resource overview, single sign-on setup, and deletion steps.
author: shijoy
ms.author: shijoy
ms.topic: how-to
ms.subservice: napster
ms.custom:
  - ignite-2026
ms.date: 08/26/2026
#customer intent: As an Azure administrator, I want to manage the lifecycle of my Napster API resource so that I can configure access, monitor it, and delete it when no longer needed.
---

# Manage a Napster API resource

This article describes how to manage the settings for your Napster API resource in the Azure portal. You learn how to navigate the resource overview, use single sign-on to access the Companion API Dashboard, and delete a resource.

Because Napster API is an Azure native integration, you manage its resource lifecycle alongside your other Azure resources. The Azure portal provides access to subscription and billing details, resource status, single sign-on, and support.

## Resource overview


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal search bar, enter *All resources* and select **All resources** from the results.

1. From the **Resources** list, select your resource.

   The Azure portal shows the resource with the **Overview** page open, by default.



A screenshot of a Napster API resource in the Azure portal with the overview displayed in the working pane.

The *Essentials* details include:

- Resource group
- Location
- Subscription
- Subscription ID
- Tags
- Plan
- Status
- SSO URL

To manage your resource, select the links next to corresponding details.

Below the essentials, you can navigate to other details about your resource.

Select the **Go to Napster API** button to create and manage your AI Omniagents.

Select the **Getting Started Docs** link to read [Napster's documentation](https://developers.napster.com) for more information on how to get started.

## Single sign-on

Single sign-on (SSO) is already enabled when you create your Napster API resource.

To access the Napster API by using single sign-on, select the SSO URL link in the *Essentials* details from the Resource overview.

> **Note:**
>
> - The first time you access this URL, you might see a request to grant permissions and user consent. This step is only needed the first time you access the SSO URL.
> - If you're also seeing the Admin consent screen, check your [tenant consent settings](https://learn.microsoft.com/entra/identity/enterprise-apps/configure-user-consent).

Choose a Microsoft Entra account for the single sign-on. After you provide consent, you're redirected to the Companion API Dashboard.

## Delete a Napster API resource


To delete a resource:

1. On the command bar, select **Delete**.

1. On the **Delete Resource** pane, optionally select a reason for deleting the resource.

1. In the **Enter resource name to confirm deletion** box, enter the name of the resource.

1. Select **Delete**.

1. Select **Delete** again to confirm deletion.

After the resource is deleted, all billing for that resource through Azure Marketplace stops.


## Get support

To contact support about the Napster API, select **Help + support** in the left pane of the Azure portal and select the Napster API service.

On the left side of the Napster API service, find the **Help** button, and then select **Support + Troubleshooting**.

Next, select the **Contact Napster API - An Azure Native ISV Service Support** button.

Alternatively, reach out directly to the Napster help center at [help.napster.com](https://help.napster.com).

## Related content

- [Napster API resources and developer tools](tools.md)
