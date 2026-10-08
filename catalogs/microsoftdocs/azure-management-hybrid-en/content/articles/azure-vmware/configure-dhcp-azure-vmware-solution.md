---
title: Configure DHCP for Azure VMware Solution
description: Learn how to configure DHCP by using either NSX Manager to host a DHCP server or use a third-party external DHCP server.
ms.topic: how-to
ms.service: azure-vmware
ms.date: 05/13/2026
ms.custom:
  - engagement-fy23
  - sfi-image-nochange
# Customer intent: As an Azure service administrator, I want to configure DHCP by using either NSX Manager to host a DHCP server or use a third-party external DHCP server.
---

# Configure DHCP for Azure VMware Solution


<!-- Used in tutorial-network-checklist.md and configure-dhcp-azure-vmware-solution.md -->

Applications and workloads running in a private cloud environment require name resolution and DHCP services for lookup and IP address assignments. A proper DHCP and DNS infrastructure are required to provide these services. You can configure a virtual machine to provide these services in your private cloud environment.  

Use the DHCP service built-in to NSX-T Data Center or use a local DHCP server in the private cloud instead of routing broadcast DHCP traffic over the WAN back to on-premises.

> **Important:**
> If you advertise a default route to the Azure VMware Solution, then you must allow the DNS forwarder to reach the configured DNS servers and they must support public name resolution.


In this article, learn how to use NSX Manager to configure DHCP for Azure VMware Solution in one of the following ways: 


- [Use the Azure portal to create a DHCP server or relay](#use-the-azure-portal-to-create-a-dhcp-server-or-relay)

- [Use NSX to host your DHCP server](#use-nsx-to-host-your-dhcp-server)

- [Use a third-party external DHCP server](#use-a-third-party-external-dhcp-server)

>**Tip:**
>If you want to configure DHCP using a simplified view of NSX operations, see [Configure DHCP for Azure VMware Solution](configure-dhcp-azure-vmware-solution.md).


>**Important:**
>For clouds created on or after July 1, 2021, the simplified view of NSX operations must be used to configure DHCP on the default Tier-1 Gateway in your environment.
>
>DHCP doesn't work for virtual machines (VMs) on the VMware HCX L2 stretch network when the DHCP server is in the on-premises datacenter. NSX, by default, blocks all DHCP requests from traversing the L2 stretch. For the solution, see the [Configure DHCP on L2 stretched VMware HCX networks](configure-l2-stretched-vmware-hcx-networks.md) procedure.

## Use the Azure portal to create a DHCP server or relay

You can create a DHCP server or relay directly from Azure VMware Solution in the Azure portal. The DHCP server or relay connects to the Tier-1 gateway created when you deployed Azure VMware Solution. All the segments where you gave DHCP ranges are part of this DHCP. After you create a DHCP server or DHCP relay, you must define a subnet or range on segment level to consume it.

1. In your Azure VMware Solution private cloud, under **Workload Networking**, select **DHCP** > **Add**.

2. Select either **DHCP Server** or **DHCP Relay** and then provide a name for the server or relay and three IP addresses. 

   >**Note:**
   >For DHCP relay, you only require one IP address for a successful configuration.

   Screenshot showing how to add a DHCP server or DHCP relay in Azure VMware Solutions.

4. Complete the DHCP configuration by [providing DHCP ranges on the logical segments](tutorial-nsx-t-network-segment.md#use-azure-portal-to-add-an-nsx-network-segment) and then select **OK**.

## Use NSX to host your DHCP server

If you want to use NSX to host your DHCP server, create a DHCP server and a relay service. Next add a network segment and specify the DHCP IP address range.

### Create a DHCP server

1. In NSX Manager, select **Networking** > **Networking Profiles** > **DHCP**, then select **Add DHCP Profile**.

1. Select **Add DHCP Profile**, enter a name, and select **Save**.

   > **Note:**
   > An IP address isn't required so if none is entered, NSX Manager sets one.

   Screenshot showing how to add a DHCP Profile in NSX Manager.

1. Under **Networking** > **Tier-1 Gateways**, select the gateway where the segments are connected that DHCP is required. Edit the Tier-1 Gateway by clicking on the three ellipses and choose **Edit**.

1. Select **Set DHCP Configuration**, select **DHCP Server** then, select the DHCP Server Profile created earlier. Select **Save**, then **Close Editing**.

   Screenshot showing how to edit the NSX Tier-1 Gateway for using a DHCP server.

1. Navigate to **Networking** > **Segments** and find the segment where DHCP is required. Select on **Edit** then **Set DHCP Config**. 
   
1. Select **Gateway DHCP Server** for DHCP Type, add a DHCP range, and select **Apply**.

   Screenshot showing how to add a subnet to the NSX Tier-1 Gateway for using a DHCP server.

   > **Note:**
   > The DHCP Server's IP address and DHCP Ranges it manages needs to be different when using the Gateway DHCP Server option. 

### Add a network segment


<!-- Used in configure-dhcp-azure-vmware-solution.md and tutorial-nsx-t-network-segment.md -->

1. In NSX Manager, select **Networking** > **Segments**, and then select **Add Segment**. 

   Screenshot showing how to add a new segment in NSX Manager.

1. Enter a name for the segment.

1. Select the Tier-1 Gateway (TNTxx-T1) as the **Connected Gateway** and leave the **Type** as Flexible.

1. Select the preconfigured overlay **Transport Zone** (TNTxx-OVERLAY-TZ) and then select **Set Subnets**. 

   Screenshot showing the Segments details for adding a new NSX network segment.

1. Enter the gateway IP address and then select **Add**. 

   >**Important:**
   >The IP address needs to be on a non-overlapping RFC1918 address block, which ensures connection to the VMs on the new segment.

   Screenshot showing the IP address of the gateway for the new segment.

1. Select **Apply** and then **Save**.

1. Select **No** to decline the option to continue configuring the segment. 


### Specify the DHCP IP address range
 
When you create a relay to a DHCP server, you need to specify the DHCP IP address range.

>**Note:**
>The IP address range shouldn't overlap with the IP range used in other virtual networks in your subscription and on-premises networks.

1. In NSX Manager, select **Networking** > **Segments**. 
   
1. Select the vertical ellipsis on the segment name and select **Edit**.
   
1. Select **Set Subnets** to specify the DHCP IP address for the subnet. 
   
   Screenshot showing how to set the subnets to specify the DHCP IP address  for using a DHCP server.
      
1. Modify the gateway IP address if needed, and enter the DHCP range IP. 
      
   Screenshot showing the gateway IP address and DHCP ranges for using a DHCP server.
      
1. Select **Apply**, and then **Save**. The segment gets assigned a DHCP server pool.
      
   Screenshot showing that the DHCP server pool assigned to segment for using a DHCP server.

## Use a third-party external DHCP server

If you want to use a third-party external DHCP server, create a DHCP relay service in NSX Manager. You need to specify the DHCP IP address range.

>**Important:**
>For clouds created on or after July 1, 2021, the simplified view of NSX operations must be used to configure DHCP on the default Tier-1 Gateway in your environment.

### Create a DHCP relay service

Use a DHCP relay for any non-NSX-based DHCP service. For example, a VM running DHCP in Azure VMware Solution, Azure IaaS, or on-premises.

1. In NSX Manager, select **Networking** > **DHCP**, and then select **Add Server**.

1. Select **DHCP Relay** for the **Server Type**, provide the server name and IP address, and select **Save**.

   Screenshot showing how to create a DHCP relay service in NSX Manager.

1. Select **Tier 1 Gateways**, select the vertical ellipsis on the Tier-1 gateway, and then select **Edit**.

   Screenshot showing how to edit the NSX Tier-1 Gateway.

1. Select **No IP Allocation Set** to define the IP address allocation.

   Screenshot showing how to add a subnet to the NSX Tier-1 Gateway.

1. For **Type**, select **DHCP Server**. 
   
1. For the **DHCP Server**, select **DHCP Relay**, and then select **Save**.

1. Select **Save** again and then select **Close Editing**.

### Specify the DHCP IP address range

When you create a relay to a DHCP server, you need to specify the DHCP IP address range.

>**Note:**
>The IP address range shouldn't overlap with the IP range used in other virtual networks in your subscription and on-premises networks.

1. In NSX Manager, select **Networking** > **Segments**. 
   
1. Select the vertical ellipsis on the segment name and select **Edit**.
   
1. Select **Set Subnets** to specify the DHCP IP address for the subnet. 
   
   Screenshot showing how to set the subnets to specify the DHCP IP address.
      
1. Modify the gateway IP address if needed, and enter the DHCP range IP. 
      
   Screenshot showing the gateway IP address and DHCP ranges.
      
1. Select **Apply**, and then **Save**. The segment gets assigned a DHCP server pool.
      
   Screenshot showing that the DHCP server pool gets assigned to a segment.

## Next steps

If you want to send DHCP requests from your Azure VMware Solution VMs to a non-NSX DHCP server, see the [Configure DHCP on L2 stretched VMware HCX networks](configure-l2-stretched-vmware-hcx-networks.md) procedure.
