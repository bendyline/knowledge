---
title: Deploy private-only Bastion
description: Learn how to deploy Bastion for a private-only scenario.
author: asudbring
ms.service: azure-bastion
ms.topic: how-to
ms.date: 03/31/2025
ms.author: allensu
ms.custom:
  - ignite-2024
  - sfi-image-nochange
# Customer intent: As a network administrator, I want to deploy Azure Bastion in a private-only mode, so that I can ensure secure access to virtual machines within my virtual network without allowing outbound access outside of the network.
---

# Deploy Bastion as private-only

This article helps you deploy Bastion as a private-only deployment. Private-only Bastion deployments lock down workloads end-to-end by creating a non-internet routable deployment of Bastion that allows only private IP address access. Private-only Bastion deployments don't allow connections to the bastion host via public IP address. In contrast, a regular Azure Bastion deployment allows users to connect to the bastion host using a public IP address. 

The following diagram shows the Azure Bastion dedicated private-only deployment architecture. Bastion is deployed to the virtual network. A user that's connected to Azure via ExpressRoute private-peering can securely connect to Bastion using the private IP address of the bastion host. Bastion can then make the connection via private IP address to a virtual machine that's within the same virtual network as the bastion host or in a peered virtual network. In a private-only Bastion deployment, Bastion doesn't allow outbound access outside of the virtual network.

Diagram showing Azure Bastion architecture.

Items to consider:


* Private-only Bastion is configured at the time of deployment and requires the Premium SKU Tier.

* You can't change from a regular Bastion deployment to a private-only deployment.

* To deploy private-only Bastion to a virtual network that already has a Bastion deployment, first remove Bastion from your virtual network, then deploy Bastion back to the virtual network as private-only. You don't need to delete and recreate the AzureBastionSubnet.

* If you want to create end-to-end private connectivity, connect using the native client instead of connecting via the Azure portal.

* If your client machine is on-premises and non-Azure, you will need to deploy an ExpressRoute or VPN and enable **IP-based connection** on the Bastion resource.

* Ensure your network security rules do not block port 443 access to the AzureBastionSubnet for inbound Virtual Network traffic.


## Prerequisites

The steps in this article assume you have the following prerequisites:

* An Azure subscription. If you don't have one, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* A [virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md) that doesn't have Azure Bastion deployment.

### <a name="values"></a>Example values

You can use the following example values when creating this configuration, or you can substitute your own.

#### Basic virtual network and virtual machine values

| Name | Value |
| --- | --- |
| **Resource group** | **TestRG1** |
| **Region** | **East US** |
| **Virtual network** | **VNet1** |
| **Address space** | **10.1.0.0/16** |
| **Subnet 1 name: FrontEnd** | **10.1.0.0/24** |
| **Subnet 2 name: AzureBastionSubnet** | **10.1.1.0/26** |

#### Bastion values

| Name | Value |
| --- | --- |
| **Name** | **VNet1-bastion** |
| **SKU** | **Premium** |
| **Instance count (host scaling)** | **2** or greater |
| **Assignment** | **Static** |

## <a name="createhost"></a>Deploy private-only Bastion

This section helps you deploy Bastion as private-only to your virtual network.

> **Important:**
> [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/bastion-pricing.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/private-only-deployment.md)

1. Sign in to the [Azure portal](https://portal.azure.com) and go to your virtual network. If you don't already have one, you can [create a virtual network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/quick-create-portal.md). If you're creating a virtual network for this exercise, you can create the AzureBastionSubnet (from the next step) at the same time you create your virtual network.

1. Create the subnet to which your Bastion resources will be deployed. In the left pane, select **Subnets  -> +Subnet** to add the *AzureBastionSubnet*.

   * The subnet must be **/26** or larger (for example, **/26**, **/25**, or **/24**) to accommodate features available with the Premium SKU.
   * The subnet must be named **AzureBastionSubnet**.

1. Select **Save** at the bottom of the pane to save your values.

1. Next, on your virtual network page, select **Bastion** from the left pane.

1. On the **Bastion** page, expand **Dedicated Deployment Options** (if that section appears). Select the **Configure manually** button. If you don't select this button, you can't see required settings to deploy Bastion as private-only.

1. On the **Create a Bastion** pane, configure the settings for your bastion host. The **Project details** values are populated from your virtual network values.

   Under **Instance details**, configure these values:

   * **Name**: The name that you want to use for your Bastion resource.

   * **Region**: The Azure public region in which the resource will be created. Choose the region where your virtual network resides.

   * **Tier**: You must select **Premium** for a private-only deployment.

   * **Instance count**: The setting for host scaling. You configure host scaling in scale unit increments. Use the slider or enter a number to configure the instance count that you want. For more information, see [Instances and host scaling](configuration-settings.md#instance) and [Azure Bastion pricing](https://azure.microsoft.com/pricing/details/azure-bastion).

1. For **Configure virtual networks** settings, select your virtual network from the dropdown list. If your virtual network isn't in the dropdown list, make sure that you selected the correct **Region** value in the previous step.

1. The **AzureBastionSubnet** will automatically populate if you already created it in the earlier steps.

1. The **Configure IP address** section is where you specify that this is a private-only deployment. You must select **Private IP address** from the options.

   When you select Private IP address, the Public IP address settings are automatically removed from the configuration screen.

   Screenshot of Azure Bastion IP address configuration settings.

1. If you plan to use ExpressRoute or VPN with Private-only Bastion, go to the **Advanced** tab. Select **IP-based connection**.

1. When you finish specifying the settings, select **Review + Create**. This step validates the values.

1. After the values pass validation, you can deploy Bastion. Select **Create**.

1. A message shows that your deployment is in process. The status appears on this page as the resources are created. It takes about 10 minutes for the Bastion resource to be created and deployed.

## Next steps

For more information about configuration settings, see [Azure Bastion configuration settings](configuration-settings.md) and the [Azure Bastion FAQ](bastion-faq.md).
