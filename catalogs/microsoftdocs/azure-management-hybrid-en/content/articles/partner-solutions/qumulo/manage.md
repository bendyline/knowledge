---
title: Manage Azure Native Qumulo
description: Learn how to manage your Azure Native Qumulo settings.
author: Reshmi-Sriram
ms.author: reshmisriram
ms.topic: how-to 
ms.date: 03/09/2025
ms.custom:
  - ignite-2023
---


# Manage Azure Native Qumulo

This article describes how to manage the settings for an Azure Native Qumulo resource.

## Resource overview 


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal search bar, enter *All resources* and select **All resources** from the results.

1. From the **Resources** list, select your resource.

   The Azure portal shows the resource with the **Overview** page open, by default.



A screenshot of a Qumulo resource in the Azure portal with the overview displayed in the working pane.

The *Essentials* details include:

- Resource group
- Location
- Subscription
- Subscription ID
- Tags
- Qumulo Core Web UI Login
- Service type
- Availability Zone
- Virtual network/subnet
- Status

To manage your resource, select the links next to corresponding details.

Below the essentials, you can navigate to other details about your resource.

## Manage a resource

### Manage IP addresses

To get IP addresses to manage your Qumulo file system or to mount your file system for data access, select **Qumulo config** > **IP addresses** from the service menu.

### Customize performance

To increase or decrease the performance capacity for an Azure Native Qumulo (ANQ) resource, select **Pre-provisioned performance** in **Essentials**.

In the pane that opens, select the performance level you want, and then select **Save**.


## Delete a resource


To delete a resource:

1. On the command bar, select **Delete**.

1. On the **Delete Resource** pane, optionally select a reason for deleting the resource.

1. In the **Enter resource name to confirm deletion** box, enter the name of the resource.

1. Select **Delete**.

1. Select **Delete** again to confirm deletion.

After the resource is deleted, all billing for that resource through Azure Marketplace stops.


## Get support

You can request support from the Azure portal, or go to the [Qumulo support page](https://aka.ms/partners/Qumulo/Support).


Begin by signing in to the [Azure portal](https://portal.azure.com/).

1. In the Azure portal, go to the resource.
1. From the service menu, select **Support + troubleshooting** > **New Support Request**.
    A support request appears in the working pane.
1. Select the partner's link to log a support request.


## Related content

- [Troubleshoot Azure Native Qumulo](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/partner-solutions/qumulo/troubleshoot.md)
