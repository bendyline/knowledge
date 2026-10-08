---
title: "Quickstart: Create an Everpure Cloud Azure Native resource"
description: Learn how to create an Everpure Cloud resource by using the Azure portal.
author: agrimayadav
ms.author: agrimayadav
ms.topic: quickstart
ms.date: 08/28/2026

---
# Quickstart: Create an Everpure Cloud Azure Native resource

This quickstart shows you how to create an Everpure Cloud resource by using the Azure portal.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [Subscribe to Everpure Cloud Azure Native](overview.md#subscribe-to-everpure-cloud-azure-native).
- A dedicated [subnet](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/manage-subnet-delegation.md) delegated to *PureStorage.Block/storagePools*. The subnet requires a minimum size of **/27**.

## Create a resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


### Basics tab

The **Basics** tab has four sections:

- Project Details
- Instance Details
- Billing Details
- Company Details

A screenshot of the Create Everpure Cloud Azure Native options in the Azure portal, with the Basics tab displayed.

Enter values for each required setting.

1. **Project Details:**

    | Setting | Value |
    | --- | --- |
    | Subscription | Select your subscription. |
    | Resource group | Specify a resource group. |

1. **Instance Details:**

    | Setting | Value |
    | --- | --- |
    | Resource name | Specify a unique name for the resource. |
    | Region | Select the region. |

1. **Company Details:**

    | Setting | Value |
    | --- | --- |
    | Company Name | Provide your company's name. |
    | Address Line 1 | Provide your company's address. |
    | State | Select a state from the dropdown. |
    | Zip | Provide your company's zip code. |
    | First Name | Provide your first name. |
    | Last Name | Provide your last name. |

1. Select **Next** to add tags, or select **Review and create**.

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


> **Important:**
> After you create the Everpure Cloud resource, you need to [create a storage pool](manage.md#create-a-storage-pool) to use and manage your storage volumes.

## Next step

> 
> [Manage Everpure Cloud Azure Native resources](manage.md)
