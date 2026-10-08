---
title: "Quickstart: Get started with Napster API"
description: Learn how to create a Napster API resource in the Azure portal to start building persistent multimodal AI agents with unified Azure billing.
author: shijoy
ms.author: shijoy
ms.topic: quickstart
ms.subservice: napster
ms.date: 08/26/2026
ms.custom:
  - references_regions
  - ignite-2026
#customer intent: As an Azure customer, I want to create a Napster API resource in the portal so that I can begin building persistent multimodal AI agents on Azure.
---

# Quickstart: Get started with Napster API

In this quickstart, you create an instance of Napster API in the Azure portal. You complete the Basics, Tags, and Review + create tabs to provision the resource in your Azure subscription and associate it with your Napster organization.

The resulting Azure resource connects your subscription to the Napster service and enables Azure Marketplace billing. You can then manage the resource lifecycle and access the Companion API Dashboard from Azure.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [subscribe to Napster API](overview.md#subscribe-to-napster-api).

## Create a Napster API resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


### Basics tab

The *Basics* tab has three sections:

- Project details
- Azure resource details
- Napster organization details

A screenshot of the Create a Napster API resource options inside of the Azure portal's working pane with the Basics tab displayed.

There are required fields (identified with a red asterisk) in each section that you need to fill out.

1. Enter the values for each required setting under *Project details*.

    | Field | Action |
    | --- | --- |
    | Subscription | Select a subscription from your existing subscriptions. |
    | Resource group | Use an existing resource group or create a new one. |

1. Enter the values for each required setting under *Azure resource details*.

    | Field | Action |
    | --- | --- |
    | Resource name | Specify a unique name for the resource. |
    | Region | Select a region to deploy your resource. |

1. Enter the values for each required setting under *Napster organization details*.

    | Field | Action |
    | --- | --- |
    | Organization | Provide the name of the organization. This organization is created automatically on the Napster side. |

    The remaining fields update to reflect the details of the plan you selected for this new organization.

1. Select the **Next** button at the bottom of the page.

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


## Related content

- [Manage a Napster API resource](manage.md)
