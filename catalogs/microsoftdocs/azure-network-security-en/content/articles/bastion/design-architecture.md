---
title: 'About Azure Bastion design and architecture'
description: Learn about the different architectures available with Azure Bastion.
author: asudbring
ms.topic: concept-article
ms.date: 03/14/2025
ms.author: allensu
ms.service: azure-bastion
# Customer intent: "As a cloud architect, I want to understand the different deployment architectures of Azure Bastion, so that I can select the appropriate configuration to enhance security and manage RDP/SSH connectivity to my virtual machines."
---

# Design architecture for Azure Bastion

Azure Bastion offers multiple deployment architectures, depending on the selected SKU and option configurations. For most SKUs, Bastion is deployed to a virtual network and supports virtual network peering. Specifically, Azure Bastion manages RDP/SSH connectivity to VMs created in the local or peered virtual networks.

RDP and SSH are some of the fundamental means through which you can connect to your workloads running in Azure. Exposing RDP/SSH ports over the Internet isn't desired and is seen as a significant threat surface. This is often due to protocol vulnerabilities. To contain this threat surface, you can deploy bastion hosts (also known as jump-servers) at the public side of your perimeter network. Bastion host servers are designed and configured to withstand attacks. Bastion servers also provide RDP and SSH connectivity to the workloads sitting behind the bastion, and also further inside the network.

The SKU you select when you deploy Bastion determines the architecture and the available features. You can upgrade to a higher SKU to support more features, but you can't downgrade a SKU after deploying. Certain architectures, such as [Private-only](#private-only) and [Bastion Developer](#developer), must be configured at the time of deployment.

## <a name="basic"></a>Deployment - Basic SKU and higher

Diagram showing Azure Bastion architecture.

When working with the Basic SKU or higher, Bastion uses the following architecture and workflow.

* The Bastion host is deployed in the virtual network that contains the AzureBastionSubnet subnet that has a minimum /26 prefix.
* The user connects to the Azure portal using any HTML5 browser and selects the virtual machine to connect to. A public IP address is not required on the Azure VM.
* The RDP/SSH session opens in the browser with a single click.

For some configurations, the user can connect to the virtual machine via the native operating system client.

For configuration steps, see:

* [Deploy Bastion from the Azure portal](quickstart-host-portal.md)

## <a name="developer"></a>Deployment - Bastion Developer

Diagram that shows the Azure Bastion Developer architecture.


When you connect with Bastion Developer, the deployment requirements are different than when you deploy using other SKUs. Typically when you create a bastion host, a host is deployed to the AzureBastionSubnet in your virtual network. The Bastion host is dedicated for your use, whereas Bastion Developer isn't. Because the Bastion Developer resource isn't dedicated, the features for Bastion Developer are limited. You can always upgrade Bastion Developer to a specific [SKU](bastion-sku-comparison.md) if you need to support more features. See [Upgrade a SKU](upgrade-sku.md).

For more information about Bastion Developer, see [Deploy Bastion from the Azure portal](quickstart-host-portal.md).

## <a name="private-only"></a>Deployment - Private-only

Diagram showing Azure Bastion private-only architecture.

Private-only Bastion deployments lock down workloads end-to-end by creating a non-internet routable deployment of Bastion that allows only private IP address access. Private-only Bastion deployments don't allow connections to the bastion host via public IP address. In contrast, a regular Azure Bastion deployment allows users to connect to the bastion host using a public IP address..

The diagram shows the Bastion private-only deployment architecture. A user connected to Azure via ExpressRoute private-peering can securely connect to Bastion using the private IP address of the bastion host. Bastion can then make the connection via private IP address to a virtual machine that's within the same virtual network as the bastion host. In a private-only Bastion deployment, Bastion doesn't allow outbound access outside of the virtual network.

Considerations:


* Private-only Bastion is configured at the time of deployment and requires the Premium SKU Tier.

* You can't change from a regular Bastion deployment to a private-only deployment.

* To deploy private-only Bastion to a virtual network that already has a Bastion deployment, first remove Bastion from your virtual network, then deploy Bastion back to the virtual network as private-only. You don't need to delete and recreate the AzureBastionSubnet.

* If you want to create end-to-end private connectivity, connect using the native client instead of connecting via the Azure portal.

* If your client machine is on-premises and non-Azure, you will need to deploy an ExpressRoute or VPN and enable **IP-based connection** on the Bastion resource.

* Ensure your network security rules do not block port 443 access to the AzureBastionSubnet for inbound Virtual Network traffic.


For more information about private-only deployments, see [Deploy Bastion as private-only](private-only-deployment.md).

## Next steps

* [Deploy Bastion from the Azure portal](quickstart-host-portal.md)
* [Deploy Bastion from the Azure portal](quickstart-host-portal.md)
* [Deploy Bastion as private-only](private-only-deployment.md)
