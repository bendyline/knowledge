---
title: Create a Cloud Next-Generation Firewall (NGFW) by Palo Alto Networks
description: Learn how to use the Azure portal to create a Cloud NGFW (Next-Generation Firewall) by Palo Alto Networks.
author: BNandiniMSFT
ms.author: bnandini
ms.custom: references_regions
ms.topic: quickstart
ms.date: 06/27/2025

---

# QuickStart: Get started with Cloud NGFW by Palo Alto Networks

In this quickstart, you use Azure Marketplace to find and create an instance of  **Cloud NGFW by Palo Alto Networks - an Azure Native ISV Service resource**.

## Prerequisites


- An Azure account with an active subscription is required. If you don't have one, [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- The Owner or Contributor role for your Azure subscription. Only users who are assigned one of these roles can set up the partner service integration for your Azure subscription. Before you begin, [verify that you have the appropriate access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/check-access.md).


## Create a Cloud NGFW resource


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, in the search box, enter the name of the service.

1. In the **Services** search results, select the service.

1. Select the **Create** option.


In this section, you'll create a Cloud NGFW by Palo Alto Networks resource.

### Basics tab

- Set the following values on the **Basics** tab.

   Screenshot of the Basics tab of the Create Cloud NGFW page.

   | Setting | Description |
   | --- | --- |
   | **Subscription** | Select an Azure subscription for which you have owner access. |
   | **Resource group** | Specify whether you want to create a new resource group or use an existing one. A resource group is a container that holds related resources for an Azure solution. For more information, see [What is a resource group?](../../azure-resource-manager/management/manage-resource-groups-portal.md#what-is-a-resource-group) |
   | **Firewall name** | Enter a name for the firewall. |
   | **Region** | Select an appropriate region. |
   | **Marketplace Plan** | Select **Cloud NGFW by Palo Alto Networks - an Azure Native ISV Service (PAYG)**. |

### Networking tab

1. After providing the required information on the **Basics** tab, select **Next** to go to the **Networking** tab. 

1. Select either **Virtual Network** or **Virtual Wan Hub**.

1. Select the dropdown arrows to set the **Virtual Network**, **Private Subnet**, and **Public Subnet** that are associated with the Cloud NGFW deployment.

1. Under **Public IP Address Configuration**,  select either **Create new** or **Use existing**. 

1. If you select **Create new**, accept the supplied public IP address name or enter a name. If you select **Use existing**, select a public IP address name.

1. Under **Source NAT Settings**, indicate your preferred NAT settings.

### Security Policies tab

1. After setting the networking values, select **Next** to go to the **Security Policies** tab. You can set the policies for the firewall on this tab.

   Screenshot of the Security Policies tab of the Create Cloud NGFW page.

1. Under **Managed by**, select **Azure Rulestack**, **Palo Alto Networks Panorama**, or **Palo Alto Networks Strata Cloud Manager**.

1. Your options depend on the choice you made in the previous step. Indicate your choices for the required settings.

### DNS Proxy

1. After you configure the **Security Policies** values, select **Next** to go to the **DNS Proxy** tab.

   Screenshot of the DNS Proxy tab of the Create Cloud NGFW page.

1. Under **DNS Proxy**, select either **Disabled** or **Enabled**.

### Tags tab (optional)

You can optionally create tags for your resource. 

### Terms tab

Next, you must accept the terms of use for the new Cloud NGFW resource.

1. Select the **Terms** tab.

   Screenshot showing the Terms tab of the Create Cloud NGFW page.

1. Select the **I Agree** box to indicate your acceptance.
1. Select **Next** to go to the final step of creating the resource.

### Review + create tab


If the review finds no errors, the **Create** button becomes active. Select **Create**.

If the review identifies errors, a red dot appears next to each section where errors exist. To fix errors:

1. Open each section that has errors and fix the errors.

    Fields with errors are highlighted in red.

1. Select **Review + create** again.

1. Select **Create**.

The message "Deployment is in progress" appears. When the deployment is complete, the message "Your deployment is complete" appears on the upper-right corner of the Azure portal.

After the resource is created, select **Go to resource** to view your resource.


 
> **note:** 
> For information about connection errors, see [known issues for Azure Virtual WAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/whats-new.md#knownissues).
> 
> See also these references: 
> - [Azure Virtual Network FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-faq.md)
> - [Virtual WAN FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/virtual-wan-faq.md)

## Next steps

- [Manage the Cloud NGFW resource](manage.md)

- Get started with Cloud NGFW on:

  > 
  > [Azure portal](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/PaloAltoNetworks.Cloudngfw%2Ffirewalls)

  > 
  > [Azure Marketplace](https://azuremarketplace.microsoft.com/marketplace/apps/paloaltonetworks.pan_swfw_cloud_ngfw?tab=Overview)
