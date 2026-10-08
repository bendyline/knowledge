---
title: Tutorial - Add an NSX network segment in Azure VMware Solution
description: Learn how to add an NSX network segment to use for virtual machines (VMs) in vCenter Server.
ms.topic: tutorial
ms.service: azure-vmware
ms.date: 4/02/2026
ms.custom:
  - engagement-fy23
  - sfi-image-nochange
# Customer intent: "As a VMware administrator, I want to add an NSX network segment in the Azure VMware Solution, so that I can manage virtual machines efficiently and ensure proper connectivity within my cloud environment."
---

# Tutorial: Add an NSX network segment in Azure VMware Solution 

After deploying Azure VMware Solution, you can configure an NSX network segment from NSX Manager or the Azure portal. Once configured, the segments are visible in Azure VMware Solution, NSX Manager, and vCenter Server. NSX comes pre-provisioned by default with an NSX Tier-0 gateway in **Active/Active** mode and a default NSX Tier-1 gateway in **Active/Standby** mode. These gateways let you connect the segments (logical switches) and provide East-West and North-South connectivity.

>**Tip:**
>The Azure portal presents a simplified view of NSX operations a VMware administrator needs regularly and targeted at users not familiar with NSX Manager.


In this tutorial, you learn how to:

> 
> * Add network segments using either NSX Manager or the Azure portal
> * Verify the new network segment

## Prerequisites

An Azure VMware Solution private cloud with access to the vCenter Server and NSX Manager interfaces. For more information, see the [Configure networking](tutorial-configure-networking.md) tutorial.


## Use Azure portal to add an NSX network segment


<!-- Used in configure-dhcp-azure-vmware-solution.md and tutorial-nsx-t-network-segment.md -->


>**Note:**
>If you plan to use DHCP, you'll need to [configure a DHCP server or DHCP relay](configure-dhcp-azure-vmware-solution.md) before you can configure an NSX network segment. 

1. In your Azure VMware Solution private cloud, under **Workload Networking**, select **Segments** > **Add**. 

2. Provide the details for the new logical segment and select **OK**.

   Screenshot showing how to add a new NSX segment in the Azure portal.

   - **Segment name** - Name of the segment that is visible in vCenter Server.

   - **Subnet gateway** - Gateway IP address for the segment's subnet with a subnet mask. VMs are attached to a logical segment, and all VMs connecting to this segment belong to the same subnet.  Also, all VMs attached to this logical segment must carry an IP address from the same segment.

   - **DHCP** (optional) - DHCP ranges for a logical segment. You must configure a [DHCP server or DHCP relay](configure-dhcp-azure-vmware-solution.md) to consume DHCP on Segments.    

   >**Note:**
   >The **Connected gateway** is selected by default and is read-only.  It shows Tier-1 Gateway and type of segment information. 
   >
   >- **T1** - Name of the Tier-1 Gateway in NSX Manager. A private cloud comes with an NSX Tier-0 Gateway in Active/Active mode and a default NSX Tier-1 Gateway in Active/Standby mode.  Segments created through the Azure VMware Solution console only connect to the default Tier-1 Gateway, and the workloads of these segments get East-West and North-South connectivity. You can only create more Tier-1 Gateways through NSX Manager. Tier-1 Gateways created from the NSX Manager console are not visible in the Azure VMware Solution console. 
   >
   >- **Type** - Overlay segment supported by Azure VMware Solution.

The segment is now visible in Azure VMware Solution, NSX Manager, and vCenter Server.


## Use NSX Manager to add network segment

The virtual machines (VMs) created in vCenter Server are placed onto the network segments created in NSX and are visible in vCenter Server.


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


## Verify the new network segment

Verify the presence of the new network segment. In this example, **ls01** is the new network segment.

1. In NSX Manager, select **Networking** > **Segments**.

    Screenshot shows the confirmation and status of the new network segment is present in NSX.

1. In vCenter Server, select **Networking** > **SDDC-Datacenter**.

    Screenshot shows the confirmation that the new network segment is present in vCenter Server.

## Next steps

In this tutorial, you created an NSX network segment to use for VMs in vCenter Server.

You can now perform the following actions:

- [Configure and manage DHCP for Azure VMware Solution](configure-dhcp-azure-vmware-solution.md)
- [Create a Content Library to deploy VMs in Azure VMware Solution](deploy-vm-content-library.md) 
- [Peer on-premises environments to a private cloud](tutorial-expressroute-global-reach-private-cloud.md)


<!-- LINKS - external-->

<!-- LINKS - internal -->
