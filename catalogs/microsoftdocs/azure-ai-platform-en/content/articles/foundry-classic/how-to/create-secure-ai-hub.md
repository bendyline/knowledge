---

title: "Create a secure hub (classic)"
description: "Create a Microsoft Foundry hub inside a managed virtual network. The managed virtual network secures access to managed resources such as computes. (classic)"
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.custom:
  - build-2024
  - hub-only
  - dev-focus
ms.topic: how-to
ai-usage: ai-assisted
ms.date: 12/23/2025
ms.reviewer: meerakurup 
ms.author: sgilley
author: sdgilley
# Customer intent: As an administrator, I want to create a secure hub and project with a managed virtual network so that I can secure access to the Microsoft Foundry hub and project resources.

---

# How to create a secure Microsoft Foundry hub and project with a managed virtual network (classic)


**Applies only to:**  **Foundry (classic) portal**. This article isn't available for the new Foundry portal. [Learn more about the new portal](../../foundry/what-is-foundry.md).


> **Note:**
> Links in this article might open content in the new Microsoft Foundry documentation instead of the Foundry (classic) documentation you're viewing now.




> **Important:**
>
> This article provides legacy support for hub-based projects. It will not work for **Foundry projects**. See [How do I know which type of project I have?](../what-is-foundry.md#how-do-i-know-which-type-of-project-i-have)
>


You can secure your [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) hub, projects, and managed resources by using a managed virtual network. By using a managed virtual network, you can only allow inbound access through a private endpoint for your hub. You can configure outbound access to allow either all outbound access or only allowed outbound that you specify. For more information, see [Managed virtual network](configure-managed-network.md).

> **Important:**
> The managed virtual network doesn't provide inbound connectivity for your clients. Your clients must connect through an Azure Virtual Network that you manage, and then access the hub through the private endpoint you create. For more information, see the [Connect to the hub](#connect-to-the-hub) section. 

## Prerequisites

- 
An Azure account with an active subscription. If you don't have one, create a [free Azure account, which includes a free trial subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

- **RBAC requirements**: You must have the **Owner** or **Contributor** role on your Azure subscription or resource group to create a hub and configure network settings. To use a private endpoint, you also need **Network Contributor** or **Owner** permissions on the Azure Virtual Network.
- An Azure Virtual Network that you use to securely connect to Azure services. For example, you might use [Azure Bastion](https://learn.microsoft.com/azure/bastion/bastion-overview), [VPN Gateway](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-about-vpngateways), or [ExpressRoute](https://learn.microsoft.com/azure/expressroute/expressroute-introduction) to connect to the Azure Virtual Network from your on-premises network. If you don't have an Azure Virtual Network, you can create one by following the instructions in [Create a virtual network](https://learn.microsoft.com/azure/virtual-network/quick-create-portal).

## Create a hub

1. From the [Azure portal](https://portal.azure.com), search for `Foundry`. From the left menu, select **AI Hubs**, and then select **+ Create** and **Hub**.

    Screenshot of the Foundry portal.

1. Enter your hub name, subscription, resource group, and location details. For **Azure AI services base models**, select an existing Foundry resource or create a new one. Foundry resources include multiple API endpoints for Speech, Content Safety, and Azure OpenAI. 
    
    Screenshot of the option to set hub basic information.

1. Select the **Storage** tab. Select an existing **Storage account** and **Credential store** resource or create new ones. Optionally, choose an existing **Application insights**, and **Container Registry** for logs and docker images.

    Screenshot of the Create a hub with the option to set storage resource information.

1. Select the **Inbound access** tab to configure network isolation for inbound traffic to the hub. Set **Public network access** to **Disabled**, and then use **+ Add** to add a private endpoint for the hub to an Azure Virtual Network that your clients connect to. The private endpoint allows your clients to connect to the hub over a private connection. For more information, see [Private endpoints](https://learn.microsoft.com/azure/private-link/private-endpoint-overview).
 
    Screenshot of the inbound access tab with public network access disabled.

1. Select the **Outbound access** tab to configure the managed virtual network that Foundry uses to secure its hub and projects. Select **Private with Internet Outbound**, which allows compute resources to access the public internet for resources such as Python packages.
    
    > **Tip:**
    > To provision the virtual network during hub creation, select **Provision managed virtual network**. If you don't select this option, the network isn't provisioned until you create a compute resource. For more information, see [Managed virtual network](configure-managed-network.md#manually-provision-a-managed-vnet).

    Screenshot of the Create a hub with the option to set network isolation information.

1. Select **Review + create**, and then select **Create** to create the hub. Once the hub is created, any projects or compute instances created from the hub inherit the network configuration.

## Verify your hub is secure

After your hub is created, verify that the network configuration is correct:

1. In the [Azure portal](https://portal.azure.com), navigate to your Foundry hub resource.

1. From the left menu, select **Networking**.

1. Verify the following settings:
   - **Inbound access**: **Public network access** should be **Disabled**
   - **Inbound access**: A private endpoint should exist in your Azure Virtual Network
   - **Outbound access**: Should show **Private with Internet Outbound** configuration

If any settings are incorrect, you can modify them by selecting the appropriate tab and updating the configuration.

## Connect to the hub

The managed virtual network doesn't directly provide access to your clients. Instead, your clients connect to an Azure Virtual Network that *you* manage, and then access the hub through the private endpoint you created in the previous steps. This design ensures that hub resources are protected from direct internet access while allowing your secure infrastructure to reach the hub.

You can use multiple methods to connect clients to the Azure Virtual Network. The following table lists common ways that clients connect to an Azure Virtual Network:

| Method | Description |
| --- | --- |
| [Azure VPN gateway](https://learn.microsoft.com/azure/vpn-gateway/vpn-gateway-about-vpngateways) | Connects on-premises networks to an Azure Virtual Network over a private connection. Connection is made over the public internet. |
| [ExpressRoute](https://azure.microsoft.com/services/expressroute/) | Connects on-premises networks into the cloud over a private connection. Connection is made using a connectivity provider. |
| [Azure Bastion](https://learn.microsoft.com/azure/bastion/bastion-overview) | Connects to a virtual machine inside the Azure Virtual Network by using your web browser. |

## Next steps

- [Create a project](create-projects.md)
- [Learn more about Foundry](../what-is-foundry.md)
- [Learn more about Foundry hubs](../concepts/ai-resources.md)
