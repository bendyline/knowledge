---
title: "Quickstart: Get started with Apache Airflow on Astro"
description: Learn how to create an Astro resource in the Azure portal.
author: praveenrajap
ms.author: praveenrajap
ms.topic: quickstart
ms.date: 02/07/2025
ms.custom:
  - references_regions
  - ignite-2023
---

# Quickstart: Get started with Apache Airflow on Astro

In this quickstart, you create an instance of Apache Airflow on Astro.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [subscribe to Apache Airflow on Astro](overview.md#subscribe-to-apache-airflow-on-astro).

## Create an Astro resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


### Basics tab

The *Basics* tab has three sections:

- Project details
- Azure resource details
- Astro organization details

A screenshot of the Create an Astro Organization options inside of the Azure portal's working pane with the Basics tab displayed.

There are required fields (identified with a red asterisk) in each section that you need to fill out.

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

1. Enter the values for each required setting under *Astro organization details*.

    | Field | Action |
    | --- | --- |
    | Organization | Choose to create a new organization, or associate your resource with an existing organization. |
    | Workspace Name | Choose a name for your workspace. |

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


## Next steps

[Manage an Astro resource](manage.md)
