---
title: Move Azure Notification Hubs resources from one region to another 
description: Learn how to move Azure Notification Hubs resources to a different Azure region. 
author: sethmanheim
ms.author: sethm
ms.service: azure-notification-hubs
ms.topic: how-to
ms.date: 09/07/2021
ms.custom: template-how-to
---

# Move resources between Azure regions

This article describes how to move Azure Notification Hubs resources to a different Azure region. At a high level, the process is:

1. Create a destination namespace with a different name.
1. Export the registrations from the previous namespace.
1. Import the registrations into the new namespace in the desired region.

## Overview

In some scenarios, you might need to move service resources between Azure regions for various business reasons. They might move to a newly available region, you might want to deploy features or services available only in a specific region, move due to internal policy or compliance requirements, or to solve capacity issues.

Azure Notification Hubs namespace names are unique, and registrations are per hub, so to perform such a move, you must create a new hub in the desired region, then move the registrations along with all other relevant data to the newly created namespace.

## Create a Notification Hubs namespace with a different name

Follow these steps to create a new Notification Hubs namespace. Fill in all the required information in the **Basics** tab, including the desired destination region for the namespace.


1. Sign in to the [Azure portal](https://portal.azure.com).

1. Select **All services** on the left menu.
    A screenshot showing select All Services for an existing namespace.

1. Type **Notification Hubs** in the **Filter services** text box. Select the star icon next to the service name to add the service to the **FAVORITES** section on the left menu. Select **Notification Hubs**.

      A screenshot showing how to filter for notification hubs.

1. On the **Notification Hubs** page, select **Create** on the toolbar.

      A screenshot showing how to create a new notification hub.

1. In the **Basics** tab on the **Notification Hub** page, do the following steps:

    1. In **Subscription**, select the name of the Azure subscription you want to use, and then select an existing resource group, or create a new one.  

    1. Enter a unique name for the new namespace in **Namespace Details**. 

    1. A namespace contains one or more notification hubs, so type a name for the hub in **Notification Hub Details**.

    1. Select a value from the **Location** drop-down list box. This value specifies the location in which you want to create the hub.

       Screenshot showing notification hub details.

    1. Review the [**Availability Zones**](https://learn.microsoft.com/azure/reliability/reliability-notification-hubs?toc=/azure/notification-hubs/toc.json) option. If you choose a region that has availability zones, the check box is selected by default. Availability Zones is a paid feature, so an extra fee is added to your tier.

    1. Choose a **Disaster recovery** option: **None**, **Paired recovery region**, or **Flexible recovery region**. If you choose **Paired recovery region**, the failover region is displayed. If you select **Flexible recovery region**, use the drop-down to choose from a list of recovery regions. 

       Screenshot showing availability zone details.

    1. Select **Create**.

1. When the deployment is complete select **Go to resource**.


Once the new namespace has been created, ensure that you set the PNS credentials in the new namespace and create equivalent policies in the new namespace.

## Export/import registrations

Once the new namespace has been created in the region to which you want to move the resource, export all the registrations in bulk and import them into the new namespace. To do so, see [Export and import Azure Notification Hubs registrations in bulk](export-modify-registrations-bulk.md).

## Delete the previous namespace (optional)

After completing the registration export from your old namespace to the new namespace, if desired you can delete the old namespace.

1. Go to the existing namespace in the previous region.

2. Click **Delete**, and then re-enter the namespace name in the **Delete namespace** pane.

3. Click **Delete** at the bottom of the **Delete namespace** pane.

## Next steps

The following articles are examples of other services that have a region-move article in place.

- [Move NSGs to another region](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/move-across-regions-nsg-portal.md)
- [Move public IP addresses to another region](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/move-across-regions-publicip-portal.md)
- [Move a storage account to another region](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-move.md?tabs=azure-portal\&toc=%2fazure%2fstorage%2fblobs%2ftoc.json)
- [Move resources across regions (from resource group)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/resource-mover/move-region-within-resource-group.md)
