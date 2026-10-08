---
title: "Quickstart: Create a Dell PowerScale Resource"
description: Learn how to create a resource for Dell PowerScale by using the Azure portal.
author: agrimayadav
ms.author: agrimayadav
ms.topic: quickstart
ms.date: 03/24/2026

---
# Quickstart: Create a Dell PowerScale resource

This quickstart shows you how to create a Dell PowerScale resource by using the Azure portal.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).

- You must [subscribe to Azure Native Dell PowerScale](overview.md#subscribe-to-dell-powerscale).
- Before you create the Dell PowerScale resource, ensure that the required Azure resource provider **Dell.Storage** is registered. For more information, see [Register resource provider](../../azure-resource-manager/management/resource-providers-and-types.md#register-resource-provider).
- You must have a [dedicated subnet delegated](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/manage-subnet-delegation.md) to Dell PowerScale.

## Create a resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


### Basics tab

The **Basics** tab has three sections:

- **Project details**
- **Azure resource details**
- **Dell PowerScale file system details** 

Screenshot that shows the Basics tab of the Create a Dell PowerScale resource page.

Enter values for each required setting.

1. **Project details:**

    | Setting | Value |
    | --- | --- |
    | **Subscription** | Select the subscription that you want to use. |
    | **Resource group** | Select an existing resource group, or create a new one by selecting **Create new**. |

1. **Azure resource details:**

    | Setting | Value |
    | --- | --- |
    | **Resource name** | Enter a name for your resource. |
    | **Region** | Select the region in which you want to deploy the resource. |

1. **Dell PowerScale file system details:**

    | Setting | Value |
    | --- | --- |
    | **Dell Reference Number** | Enter your Dell reference number. You can request a reference number by selecting the link in the **Plan** section. |

1. Select Next to go to the **Networking** tab.

### Networking tab

The **Networking** tab has two sections:
  
- **Networking details**
- **SmartConnect FQDN**

Screenshot that shows the Networking tab of the Create a Dell PowerScale resource page.

Enter values for each required setting.

1. **Networking details:**

    | Setting | Value |
    | --- | --- |
    | **Virtual network** | Select the delegated virtual network in which to deploy the resource. |
    | **Subnet** | Select the delegated subnet in which to deploy the resource. The subnet must be delegated to **Dell.Storage/filesystems** and have at least 256 IP addresses reserved for Dell PowerScale. |

1. **SmartConnect FQDN:** 
 
    | Setting | Value |
    | --- | --- |
    | **SmartConnect service name** | Enter a fully qualified domain name to configure SmartConnect. |

1. If you want to create tags, select the **Tags** tab. See the next section. Otherwise, select the **Review + create** button at the bottom of the page.

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
> [Manage Dell PowerScale resources](manage.md)
