---
title: "Quickstart: Create an Azure Native Arize AI Cloud Service resource"
description: Learn how to create a resource for Arize AI using the Azure portal.
author: shijojoy
ms.author: shijoy
ms.topic: quickstart
ms.date: 04/21/2025
ms.custom:
  - build-2025
---
# Quickstart: Create an Azure Native Arize AI Cloud Service resource

This quickstart shows you how to create an Azure Native Arize AI Cloud Service resource using the Azure portal.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [subscribe to Arize AI](overview.md#subscribe).

## Create a resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


### Basics tab

The *Basics* tab has three sections:

- Project details
- Azure Resource Details
- ArizeAI organization details

A screenshot of the Create Arize AI Resource in Azure options inside of the Azure portal's working pane with the Basics tab displayed.

There are required fields (identified with a red asterisk) in each section that you need to fill out.

1. Enter the values for each required setting under *Project details*.

    | Setting | Action |
    | --- | --- |
    | Subscription | Select your subscription. |
    | Resource group | Specify a resource group. |

1. Enter the values for each required setting under *Azure Resource Details*.

    | Setting | Action |
    | --- | --- |
    | Resource name | Specify a unique name for the resource. |
    | Region | Select the region. |

1. Enter the values for each required setting under *ArizeAI Organization Details*.

    | Setting | Action |
    | --- | --- |
    | Description | Provide a description for your organization. |

1. Select the **Next** button at the bottom of the page.

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
> [Manage your resource](manage.md)
