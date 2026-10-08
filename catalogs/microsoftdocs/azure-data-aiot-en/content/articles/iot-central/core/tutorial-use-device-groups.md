---
title: Tutorial - Use Azure IoT Central device groups
description: Tutorial - Learn how to use device groups to analyze telemetry from  devices in your Azure IoT Central application.
author: dominicbetts
ms.author: dobett
ms.date: 08/07/2025
ms.topic: tutorial
ms.service: azure-iot-central
services: iot-central

#customer intent: As an operator, I want configure device groups so that I can analyze my device telemetry.
---

# Tutorial: Use device groups to analyze device telemetry

In this tutorial, you learn how to use device groups to analyze device telemetry in your Azure IoT Central application.

A device group is a list of devices that are grouped together because they match some specified criteria. Device groups help you manage, visualize, and analyze devices at scale by grouping devices into smaller, logical groups. For example, you can create a device group to list all the air conditioner devices in Seattle to enable a technician to find the devices for which they're responsible.

In this tutorial, you learn how to:

> 
> * Create a device group
> * Use a device group to analyze device telemetry

## Prerequisites

To complete the steps in this tutorial, you need:


- An active Azure subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

- An IoT Central application created from the **Custom application** template. To learn more, see [Create an IoT Central application](howto-create-iot-central-application.md) and [How do I get information about my application?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/core/howto-get-app-info.md)


## Add and customize a device template

Add a device template from the featured device templates list. This tutorial uses the **Onset Hobo MX-100 Temp Sensor** device template:

1. To add a new device template, select **+ New** on the **Device templates** page.

1. On the **Select type** page, scroll down until you find the **Onset Hobo MX-100 Temp Sensor** tile in the **Featured device templates** section.

1. Select the **Onset Hobo MX-100 Temp Sensor** tile, and then select **Next: Review**.

1. On the **Review** page, select **Create**.

The name of the template you created is **Hobo MX-100**. The model includes the **Hobo MX-100** and **IotDevice** components. Components define the capabilities of a Hobo MX-100 device.

Add two cloud properties to the **Hobo MX-100** model in the device template:

1. Select **+ Add capability** and then use the information in the following table to add two cloud properties to your device template:

    | Display name | Capability type | Semantic type | Schema |
    | --- | --- | --- | --- |
    | Last Service Date | Cloud property | None | Date |
    | Customer Name | Cloud property | None | String |

1. Select **Save** to save your changes.

To manage the device, add a new form to the device template:

1. Select the **Views** node, and then select the **Editing device and cloud data** tile to add a new view.

1. Change the form name to **Manage device**.

1. Select the **Customer Name** and **Last Service Date** cloud properties. Then select **Add section**.

1. Select **Save** to save your new form.

Now publish the device template.

## Create simulated devices

Before you create a device group, add at least five simulated devices based on the **Hobo MX-100** device template to use in this tutorial:

Screenshot showing five simulated sensor controller devices.

For four of the simulated sensor devices, use the **Manage device** view to set the customer name to *Contoso* and select **Save**.

Screenshot that shows how to set the Customer Name cloud property.

## Create a device group

1. Select **Device groups** on the left pane to navigate to device groups page.

1. Select **+ New**.

1. Name your device group *Contoso devices*. You can also add a description. A device group can only contain devices from a single device template and organization. Choose the **Hobo MX-100** device template to use for this group.

    > **Tip:**
    > If your application [uses organizations](howto-create-organizations.md), select the organization that your devices belong to. Only devices from the selected organization are visible. Also, only users associated with the organization or an organization higher in the hierarchy can see the device group.

1. To customize the device group to include only the devices belonging to **Contoso**, select **+ Filter**. Select the **Customer Name** property, the **Equals** comparison operator, and **Contoso** as the value. You can add multiple filters and devices that meet **all** the filter criteria are placed in the device group. The device group you create is accessible to anyone who has access to the application, so anyone can view, modify, or delete the device group.

    > **Tip:**
    > The device group is a dynamic query. Every time you view the list of devices, there might be different devices in the list. The list depends on which devices currently meet the criteria of the query.

1. Choose **Save**.

Screenshot that shows the device group query configuration.

> **Note:**
> For Azure IoT Edge devices, select Azure IoT Edge templates to create a device group.

## Data explorer

You can use **Data explorer** with a device group to analyze the telemetry from the devices in the group. For example, you can plot the average temperature reported by all the Contoso environmental sensors.

To analyze the telemetry for a device group:

1. Choose **Data explorer** on the left pane and select **Create a query**.

1. Select the **Contoso devices** device group you created. Then add the **Temperature** telemetry type.

    To select an aggregation type, use the ellipsis icons next to the telemetry types. The default is **Average**. Use **Group by** to change how the aggregate data is shown. For example, if you split by device ID you see a plot for each device when you select **Analyze**.

1. Select **Analyze** to view the average telemetry values.

    You can customize the view, change the time period shown, and export the data as CSV or view data as table.

    Screenshot that shows how to export data for the Contoso devices.

To learn more about analytics, see [How to use data explorer to analyze device data](howto-create-analytics.md).

## Clean up resources


If you don't plan to complete any further IoT Central quickstarts or tutorials, you can delete your IoT Central application:

1. In your IoT Central application, navigate to **Application > Management**.
1. Select **Delete** and then confirm your action.
