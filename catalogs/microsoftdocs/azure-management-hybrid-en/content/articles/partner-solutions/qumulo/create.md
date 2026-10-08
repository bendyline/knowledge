---
title: Get started with Azure Native Qumulo Scalable File Service
description: Learn how to create an Azure Native Qumulo Scalable File Service resource in the Azure portal.
author: Reshmi-Sriram
ms.author: reshmisriram
ms.topic: quickstart
ms.custom:
  - ignite-2023
ms.date: 03/09/2026
---

# Quickstart: Get started with Qumulo Scalable File Service

In this quickstart, you create an instance of Qumulo Scalable File Service.

When you create the service instance, the following entities are also created and mapped to a Qumulo file system namespace: 

- A delegated subnet that enables the Qumulo service to inject service endpoints (eNICs) into your virtual network.
- A managed resource group that has internal networking and other resources required for the Qumulo service.
- A Qumulo resource in the region of your choosing. This entity stores and manages your data.
- A Software as a Service (SaaS) resource, based on the plan that you select in Azure Marketplace offer for Qumulo. This resource is used for billing.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [subscribe to Qumulo](overview.md#subscribe-to-qumulo).
- A [virtual network](https://learn.microsoft.com/azure/virtual-network/manage-subnet-delegation?tabs=manage-subnet-delegation-portal) with a [delegated subnet](https://learn.microsoft.com/azure/virtual-network/manage-subnet-delegation?tabs=manage-subnet-delegation-portal) with at least 256 IP Addresses delegated to `Qumulo.Storage/fileSystems`.
- For custom roles, you also need *write* access to the resource groups for your delegated subnet and Qumulo file system namespace.

> **Important:**
> For successful creation of a Qumulo service, custom role-based access control (RBAC) roles need to have the following permissions in the subnet and Qumulo service resource groups:
>
> - Qumulo.Storage/\*
> - Microsoft.Network/virtualNetworks/subnets/join/action

## Create a Qumulo resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


4. On the **Basics** tab, enter the values for each required field (identified with a red asterisk):

   | Field | Action |
   | --- | --- |
   | **Subscription** | Select a subscription from your existing subscriptions. |
   | **Resource group** | Use an existing resource group or create a new one. |
   | **Resource name** | Specify a unique name for the resource. |
   | **Region** | Select an Azure region for your resource. |
   | **Password** | Create a password for your administrator account. |
   | **Confirm password** | Confirm the password you created for your administrator account. |
   | **Storage class** | Choose the storage class for your resource. |
   | **Availability Zone** | Choose the availability zone for your resource. |
   | **Pre-provisioned performance** | Select the pre-provisioned performance for your resource. The default is *Elastic Pay-as-you-go*, or you can provision dedicated capacity during resource creation. |

   > **Note:**
   > If you select *Hot ZRS* as your storage class, you don't need to specify an availability zone.

5. If needed, select the **Change plan** link to change your billing plan. The remaining fields update to reflect your selected plan.

6. Select **Next** to continue to the **Networking** tab and enter the values for each required setting:

   | Field | Action |
   | --- | --- |
   | **Virtual network** | Choose the virtual network for your resource. |
   | **Subnet** | Choose the Qumulo-delegated subnet for your resource. |

7. Optionally, select the **Tags** tab to add tags to your resource.

8. Select **Review + Create** to validate and create your resource. If the review identifies errors, go back to fix them and then select **Review + Create** again.

9. When validation passes, select **Create**. A deployment notification appears. When the deployment is complete, select **Go to resource** to view your new Qumulo resource.

## Next step

> 
> [Manage a resource](manage.md)
