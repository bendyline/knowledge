
<!-- Used in introduction.md and concepts-networking.md -->

Azure VMware Solution offers a private cloud environment accessible from on-premises sites and Azure-based resources. Services such as Azure ExpressRoute, VPN connections, or Azure Virtual WAN deliver the connectivity. However, these services require specific network address ranges and firewall ports for enabling the services.

When you deploy a private cloud, private networks for management, provisioning, and vMotion get created. You use these private networks to access VMware vCenter Server and VMware NSX Manager and virtual machine vMotion or deployment.


<!-- Used in articles\azure-vmware\introduction.md and articles\azure-vmware\concepts-networking.md 

articles\azure-vmware\includes\azure-vmware-solution-networking-description.md

-->

[ExpressRoute Global Reach](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-global-reach.md) is used to connect private clouds to on-premises environments. It connects circuits directly at the Microsoft Edge level. The connection requires a virtual network (vNet) with an ExpressRoute circuit to on-premises in your subscription.  The reason is that vNet gateways (ExpressRoute Gateways) can't transit traffic, which means you can attach two circuits to the same gateway, but it doesn't send the traffic from one circuit to the other.

Each Azure VMware Solution environment is its own ExpressRoute region (its own virtual MSEE device), which lets you connect Global Reach to the 'local' peering location.  It allows you to connect multiple Azure VMware Solution instances in one region to the same peering location. 

>**Note:**
>For locations where ExpressRoute Global Reach isn't enabled, for example, because of local regulations, you have to build a routing solution using Azure IaaS VMs. For some examples, see [Azure Cloud Adoption Framework - Network topology and connectivity for Azure VMware Solution](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/azure-vmware/eslz-network-topology-connectivity).


Virtual machines deployed on the private cloud are accessible to the internet through the [Azure Virtual WAN public IP](../enable-public-ip-nsx-edge.md) functionality. For new private clouds, internet access is disabled by default. 


## Original source metadata

```text
---
title: Azure VMware Solution networking and connectivity
description: Azure VMware Solution networking and connectivity description.
ms.topic: include
ms.service: azure-vmware
ms.custom: engagement-fy23
ms.date: 5/15/2024
author: suzizuber
ms.author: v-szuber
ms.custom: engagement-fy23
# Customer intent: "As a network administrator, I want to configure and manage connectivity between my on-premises environment and Azure VMware Solution, so that I can ensure seamless operation of our virtual machines and efficient resource management."
---
```
