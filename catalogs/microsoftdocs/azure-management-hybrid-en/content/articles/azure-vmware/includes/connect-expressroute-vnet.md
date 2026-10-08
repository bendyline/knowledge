---
title: Connect ExpressRoute to a virtual network gateway
description: Steps to connect ExpressRoute to a virtual network gateway.
ms.topic: include
ms.service: azure-vmware
ms.date: 1/03/2024
author: suzizuber
ms.author: v-szuber
ms.custom: engagement-fy23
# Customer intent: "As a network administrator, I want to connect ExpressRoute to a virtual network gateway, so that I can establish a secure and dedicated network connection to enhance performance and reliability for my applications."
---

<!-- Used in deploy-azure-vmware-solution.md and tutorial-configure-networking.md -->

1. Request an ExpressRoute authorization key:

   
<!-- used in tutorial-expressroute-global-reach-private-cloud.md and create-ipsec-tunnel.md -->

1. In the Azure portal, go to the Azure VMware Solution private cloud.

1. Under **Manage**, select **Connectivity**.

1. Select the **ExpressRoute** tab, and then select **+ Request an authorization key**.

   Screenshot that shows selections for requesting an ExpressRoute authorization key.

1. Provide a name for the authorization key, and then select **Create**.

   It can take about 30 seconds to create the key. After the key is created, it appears in the list of authorization keys for the private cloud.

   Screenshot that shows the ExpressRoute Global Reach authorization key.

1. Copy the authorization key and the ExpressRoute ID. You need them to complete the peering. The authorization key disappears after some time, so copy it as soon as it appears.


1. Go to the virtual network gateway that you plan to use, and then select **Connections** > **+ Add**.

1. On the **Add connection** pane, provide the following values, and then select **OK**.

   | Field | Value |
   | --- | --- |
   | **Name** | Enter a name for the connection. |
   | **Connection type** | Select **ExpressRoute**. |
   | **Redeem authorization** | Ensure that this checkbox is selected. |
   | **Virtual network gateway** | The value is prepopulated with the virtual network gateway that you intend to use. |
   | **Authorization key** | Paste the authorization key that you copied earlier. |
   | **Peer circuit URI** | Paste the ExpressRoute ID that you copied earlier. |

   Screenshot that shows the pane for adding an ExpressRoute connection to a virtual network gateway.

A status of **Succeeded** indicates that you finished creating the connection between your ExpressRoute circuit and your virtual network.

Screenshot that shows a successful virtual network gateway connection.
