---
title: Move Azure VMware Solution subscription to another subscription
description: This article describes how to move Azure VMware Solution subscription to another subscription. You might move your resources for various reasons, such as billing.  
ms.topic: how-to
ms.service: azure-vmware
ms.date: 03/13/2026
ms.custom:
  - subject-moving-resources
  - engagement-fy23
  - sfi-image-nochange
# Customer intent: As an Azure service administrator, I want to move my Azure VMware Solution subscription to another subscription.
---

# Move Azure VMware Solution subscription to another subscription

This article describes how to move an Azure VMware Solution subscription to another subscription. You might move your subscription for various reasons, like billing.

## Prerequisites

You should have at least contributor rights on both **source** and **target** subscriptions.

>**Important:**
>Virtual network and virtual network gateway can't be moved from one subscription to another. Additionally, moving your subscriptions has no effect on the management and workloads, like the vCenter Server, NSX-T Data Center, vSAN, and workload virtual machines.

## Prepare and move

1. In the Azure portal, select the private cloud you want to move.

   Screenshot that shows the overview details of the selected private cloud.

1. From a command prompt, ping the components and workloads to verify that they're pinging from the same subscription.  

   Screenshot shows the ping command and the results of the ping.

1. Select the **Subscription (change)** link.

   Screenshot shows the private cloud details.

1. Provide the subscription details for **Target** and select **Next**.

   Screenshot of the target resource.

1. Confirm the validation of the resources you selected to move. During the validation, you see *Pending validation* under **Validation status**.

   Screenshot shows the resource being moved.

1. Once the validation is successful, select **Next** to start the migration of your private cloud.

   &#x20;Screenshot shows the validation status of Succeeded.

1. Select the check box indicating you understand that the tools and scripts associated don't work until you update them to use the new resource IDs. Then select **Move**.

   Screenshot showing the summary of the selected resource being moved.

## Verify the move

A notification appears once the resource move is complete.

Screenshot of the notification after the resources move is complete.

The new subscription appears in the private cloud Overview.

Screenshot showing a new subscription.

## Next steps

Learn more about:

- [Move Azure VMware Solution across regions](move-azure-vmware-solution-across-regions.md)
- [Move guidance for networking resources](../azure-resource-manager/management/move-limitations/networking-move-limitations.md)
- [Move guidance for virtual machines](../azure-resource-manager/management/move-limitations/virtual-machines-move-limitations.md)
- [Move guidance for App Service resources](../azure-resource-manager/management/move-limitations/app-service-move-limitations.md)
