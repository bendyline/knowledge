---
title: Create Azure Native Dynatrace Service resource
description: This article describes how to use the Azure portal to create an instance of Dynatrace.
author: praveenrajap
ms.author: praveenrajap
ms.topic: quickstart
ms.date: 12/01/2025

---

# Quickstart: Get started with Dynatrace

In this quickstart, you create a new instance of Dynatrace. 

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [configure your environment](configure-prerequisites.md).
- You must [subscribe to Dynatrace](overview.md#subscribe-to-dynatrace).

## Create a Dynatrace resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


> **Note:** 
> The steps in this article are for creating a new Dynatrace environment.  See [link to an existing Dynatrace environment](link-to-existing-resources.md) if you have an existing Dynatrace environment you'd prefer to link your Azure subscription to.

### Basics tab

The *Basics* tab has four sections:

- Project details
- Azure resource details
- Dynatrace details
- User account information
 
A screenshot of the Create a Dynatrace resource in Azure options inside of the Azure portal's working pane with the Basics tab displayed.

There are required fields (identified with a red asterisk) that you need to fill out.

1. Enter the values for each required setting under *Project details*.

    | Field | Action |
    | --- | --- |
    | Subscription | Select a subscription from your existing subscriptions. |
    | Resource group | Use an existing resource group or create a new one. |

1. Enter the values for each required setting under *Azure Resource details*.

    | Field | Action |
    | --- | --- |
    | Resource name | Specify a unique name for the resource. |
    | Region | Select a region to deploy your resource. |

1. Enter the values for each required setting under *Dynatrace details*.

    | Field | Action |
    | --- | --- |
    | User name | Specify a user name. |
    | Company name | Specify your company's name. |

1. Select **Next: Metrics and Logs**. 

### Metrics and logs tab (optional)

If you wish, you can configure resources to send metrics/logs to Dynatrace. For more information, see [Monitor & Observe Azure resources with Azure Native Integrations](../metrics-logs.md).

- Select **Enable metrics collection** to set up monitoring of platform metrics.
- Select **Subscription activity logs** to send subscription-level logs to Dynatrace.
- Select **Azure resource logs** to send Azure resource lots to Dynatrace. 

After you finish configuring metrics and logs, select **Next**.

### Single sign-on tab (optional)


If your organization uses Microsoft Entra ID as its identity provider, you can establish single sign-on from the Azure portal:

1. Select the checkbox.

    The Azure portal retrieves the appropriate application from Microsoft Entra ID.

1. Select the app name.

1. Select **Next**.


### Tags tab (optional)


Optionally, you can create tags for your resource. Then select **Review + create**.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.


## Next step

> 
> [Manage Dynatrace resources](manage.md)
