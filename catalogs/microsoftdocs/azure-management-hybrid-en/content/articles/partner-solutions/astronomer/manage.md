---
title: Manage an Astro resource through the Azure portal
description: This article describes management functions for Astro on the Azure portal.
author: praveenrajap
ms.author: praveenrajap
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 02/07/2025
---

# Manage an Astro resource

This article describes how to manage the settings for Astro resources.

## Resource overview 


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal search bar, enter *All resources* and select **All resources** from the results.

1. From the **Resources** list, select your resource.

   The Azure portal shows the resource with the **Overview** page open, by default.



A screenshot of an Astro resource in the Azure portal with the overview displayed in the working pane.

The *Essentials* details include:

- Resource group
- Location
- Subscription
- Subscription ID
- Tags
- Plan
- Status
- SSO Url

To manage your resource, select the links next to corresponding details.

Below the essentials, you can navigate to other details about your resource.

Select the **Go to Astro** button to create and manage your Airflow Deployments.

Select the **Getting Started Docs** link to read [Astronomer's documentation](https://www.astronomer.io/docs/astro/run-first-dag/) for more information on how to get started.

## Single sign-on

Single sign-on (SSO) is already enabled when you created your Astro  resource.

To access Astro using single sign-on, select the SSO Url link in the *Essentials* details from the Resource overview.

> **Note:**
> 
> - The first time you access this Url you might see a request to grant permissions and User consent. This step is only needed the first time you access the SSO Url.
> - If you're also seeing Admin consent screen, check your [tenant consent settings](https://learn.microsoft.com/azure/active-directory/manage-apps/configure-user-consent).

Choose a Microsoft Entra account for the single sign-on. Once consent is provided, you're redirected to the Astro portal.

## Delete an Astro resource


To delete a resource:

1. On the command bar, select **Delete**.

1. On the **Delete Resource** pane, optionally select a reason for deleting the resource.

1. In the **Enter resource name to confirm deletion** box, enter the name of the resource.

1. Select **Delete**.

1. Select **Delete** again to confirm deletion.

After the resource is deleted, all billing for that resource through Azure Marketplace stops.


## Get support

Contact [Astronomer](https://support.astronomer.io) for customer support. 

You can also request support in the Azure portal from the [resource overview](#resource-overview).  

Select **Support + Troubleshooting** > **New support request** from the service menu, then choose the link to [log a support request in the Astronomer portal](https://support.astronomer.io). 

## Next steps

[Troubleshoot Astro](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/partner-solutions/astronomer/troubleshoot.md)
