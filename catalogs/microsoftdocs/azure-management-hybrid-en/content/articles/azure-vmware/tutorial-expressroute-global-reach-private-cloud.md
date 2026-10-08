---
title: Peer on-premises environments to Azure VMware Solution
description: In this tutorial, learn how to create ExpressRoute Global Reach peering to a private cloud in Azure VMware Solution.
ms.topic: tutorial
ms.custom: engagement-fy23
ms.service: azure-vmware
ms.date: 3/16/2026
# Customer intent: "As a network engineer, I want to establish ExpressRoute Global Reach peering between my on-premises environment and Azure VMware Solution, so that I can ensure seamless connectivity and data flow between my private cloud and local infrastructure."
---

# Tutorial: Peer on-premises environments to Azure VMware Solution

After you deploy your Azure VMware Solution private cloud, connect it to your on-premises environment. ExpressRoute Global Reach connects your on-premises environment to your Azure VMware Solution private cloud. The ExpressRoute Global Reach connection is established between the private cloud ExpressRoute circuit and an existing ExpressRoute connection to your on-premises environments.

Diagram illustrating ExpressRoute Global Reach connecting on-premises network to Azure VMware Solution private cloud.

>**Note:**
>You can connect through VPN, but that's out of scope for this quick start guide.

In this article, you'll:

> 
> * Create an ExpressRoute auth key in the on-premises ExpressRoute circuit
> * Peer the private cloud with your on-premises ExpressRoute circuit
> * Verify on-premises network connectivity

Once you completed this section, follow the next steps provided at the end of this tutorial.

## Prerequisites

- Review the documentation on how to [enable connectivity in different Azure subscriptions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-howto-set-global-reach-portal.md).  

- A separate, functioning ExpressRoute circuit for connecting on-premises environments to Azure, which is _circuit 1_ for peering.

- Ensure that all gateways, including the ExpressRoute provider's service, support 4-byte Autonomous System Number (ASN). Azure VMware Solution uses 4-byte public ASNs for advertising routes.

>**Note:**
>If advertising a default route to Azure (0.0.0.0/0), ensure a more specific route containing your on-premises networks is advertised in addition to the default route to enable management access to Azure VMware Solution. A single 0.0.0.0/0 route gets discarded by Azure VMware Solution's management network to ensure successful operation of the service.

## Create an ExpressRoute auth key in the on-premises ExpressRoute circuit

The circuit owner creates an authorization, which creates an authorization key to be used by a circuit user to connect their virtual network gateways to the ExpressRoute circuit. An authorization is valid for only one connection.

> **Note:**
> Each connection requires a separate authorization.

1. From **ExpressRoute circuits** in the left navigation, under Settings, select **Authorizations**.

1. Enter the name for the authorization key and select **Save**.

   Screenshot of selecting Authorizations and entering a name for the authorization key.

   Once created, the new key appears in the list of authorization keys for the circuit.

1. Copy the authorization key and the ExpressRoute ID to use them in the next step to complete the peering.

## Peer private cloud to on-premises

Now that you created an authorization key for the private cloud ExpressRoute circuit, you can peer it with your on-premises ExpressRoute circuit. The peering is done from the on-premises ExpressRoute circuit in the **Azure portal**. You use the resource ID (ExpressRoute circuit ID) and authorization key of your private cloud ExpressRoute circuit to finish the peering.

1. From the private cloud, under Manage, select **Connectivity** > **ExpressRoute Global Reach** > **Add**.

    Screenshot of the ExpressRoute Global Reach tab in the Azure VMware Solution private cloud.

1. Enter the ExpressRoute ID and the authorization key created in the previous section.

   Screenshot of the dialog for entering ExpressRoute ID and authorization key.

1. Select **Create**. The new connection shows in the on-premises cloud connections list.

>**Tip:**
>You can delete or disconnect a connection from the list by selecting **More**.  
>
>Screenshot showing how to disconnect or delete an on-premises connection in Azure VMware Solution interface.

## Verify on-premises network connectivity

In your **on-premises edge router**, you should now see where the ExpressRoute connects the NSX-T Data Center network segments and the Azure VMware Solution management segments.

>**Important:**
>Everyone has a different environment, some need to allow these routes to propagate back into the on-premises network.  

## Next steps

Continue to the next tutorial to install VMware HCX add-on in your Azure VMware Solution private cloud.

> 
> [Install VMware HCX](install-vmware-hcx.md)
