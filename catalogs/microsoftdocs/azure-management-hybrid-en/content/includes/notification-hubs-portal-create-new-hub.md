---
 title: include file
 description: include file
 services: notification-hubs
 author: sethmanheim
 ms.service: azure-notification-hubs
 ms.topic: include
 ms.date: 02/21/2024
 ms.author: sethm
 ms.custom: include file
---

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
