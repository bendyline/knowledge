---
title: Tutorial - Azure IoT smart-meter monitoring
description: This tutorial shows you how to deploy and use an application template for monitoring smart meters in Azure IoT Central.
author: dominicbetts
ms.author: dobett
ms.date: 10/14/2024
ms.topic: tutorial
ms.service: azure-iot-central
services: iot-central
ms.custom: sfi-image-nochange
---

# Tutorial: Deploy and walk through an application template for monitoring smart meters

Smart meters not only enable automated billing, but also advanced metering use cases such as real-time readings and bidirectional communication. 

An application template enables utilities and partners to monitor smart meter status, telemetry, and define alarms and notifications. The template provides sample commands, such as disconnecting a meter and updating software. You can export the meter data to other business applications and use the data to develop custom solutions.

The application's key functionality includes:

- Sample device model for meters
- Meter info and live status
- Meter readings such as energy, power, and voltage
- Meter command samples
- Built-in visualization and dashboards
- Extensibility for custom solution development

In this tutorial, you learn how to:

- Create an application for monitoring smart meters.
- Walk through the application.

## Application architecture

Diagram of the architecture of a smart-meter application.

The architecture of the application consists of the following components. Some solutions might not require every component listed here.

### Smart meters and connectivity

A smart meter records and communicates energy consumption data to utilities for monitoring and other use cases, such as billing and demand response.

Typically, a meter uses a gateway or bridge to connect to an Azure IoT Central application. To learn more about bridges, see [Use the Azure IoT Central device bridge to connect other IoT clouds to Azure IoT Central](../core/howto-build-iotc-device-bridge.md).

### Azure IoT Central platform

When you build an Internet of Things (IoT) solution, Azure IoT Central simplifies the build process and helps reduce the burden and costs of IoT management, operations, and development. With Azure IoT Central, you can easily connect, monitor, and manage your IoT assets at scale.

After you connect your smart meters to Azure IoT Central, the application template uses built-in features such as device models, commands, and dashboards. The application template also uses the Azure IoT Central storage for warm path scenarios such as near real-time meter data monitoring, analytics, rules, and visualizations.

### IoT Central extensibility options

The Azure IoT Central platform provides two extensibility options: data export and APIs. Customers and partners can choose between these options to customize their solutions for their specific needs.

For example, a partner might configure data export to continuously send data to Azure Data Lake Storage. That partner can then use Data Lake Storage for long-term data retention and other scenarios for cold path storage, such batch processing, auditing, and reporting.

## Prerequisites

To complete this tutorial, you need an active Azure subscription. If you don't have one, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

## Create an application for monitoring smart meters

To create your IoT Central application:

1. Navigate to the [Create IoT Central Application](https://portal.azure.com/#create/Microsoft.IoTCentral) page in the Azure portal. If prompted, sign in with your Azure account.

1. Enter the following information:

    | Field | Description |
    | --- | --- |
    | Subscription | The Azure subscription you want to use. |
    | Resource group | The resource group you want to use.  You can create a new resource group or use an existing one. |
    | Resource name | A valid Azure resource name. |
    | Application URL | The URL subdomain for your application. The URL for an IoT Central application looks like `https://yoursubdomain.azureiotcentral.com`. |
    | Template | **Smart Meter Analytics** |
    | Region | The Azure region you want to use. |
    | Pricing plan | The pricing plan you want to use. |

1. Select **Review + create**. Then select **Create**.


When the app is ready, you can navigate to it from the Azure portal:

Screenshot that shows the IoT Central application resource in the Azure portal. The application URL is highlighted.

To learn more, see [Create an Azure IoT Central application](../core/howto-create-iot-central-application.md).


## Walk through the application

The following sections walk you through the key features of the application.

### Dashboard

After you deploy the application template, it comes with a sample smart meter, a device model, and a dashboard.

Adatum is a fictitious energy company that monitors and manages smart meters. The dashboard for monitoring smart meters shows properties, data, and sample commands for meters. The dashboard enables operators and support teams to proactively perform the following activities before they become support incidents:

- Review the latest meter info and its installed [location](../core/howto-use-location-data.md) on the map.
- Proactively check the meter network and connection status.
- Monitor minimum and maximum voltage readings for network health.
- Review the energy, power, and voltage trends to catch any anomalous patterns.
- Track the total energy consumption for planning and billing purposes.
- Perform command and control operations, such as reconnecting a meter and updating a firmware version. In the template, the command buttons show the possible functionalities and don't send real commands.

Screenshot that shows the dashboard for monitoring smart meters.

### Devices

The application comes with a sample smart-meter device. You can see available devices by selecting **Devices** on the left menu.

Screenshot that shows smart-meter devices.

Select the link for sample device **SM0123456789** to see the device details. You can update the writable properties of the device on the **Update Properties** page, and then visualize the updated values on the dashboard.

Screenshot that shows the properties of a smart-meter device.

### Device template

Select **Device templates** on the left menu to see the model of the smart meter. The model has a predefined interface for data, properties, commands, and views.

Screenshot that shows a template for a smart-meter device.

## Customize your application

As an administrator, you can change settings to customize the user experience in your application.

Select **Customization** > **Appearance**, and then:

- To set the masthead logo image, select **Change**.
- To set the browser icon image that appears on browser tabs, select **Change**.
- Under **Browser colors**, you can replace the default browser colors by adding HTML hexadecimal color codes. For more information about color notation for HEX values, see the W3Schools [HTML Colors](https://www.w3schools.com/html/html_colors.asp) tutorial.

You can change the application image on the **Application** > **Management** page.

## Clean up resources


If you don't plan to continue using this application, you can delete it:

1. In your Azure IoT Central application, go to **Application** > **Management**.
1. Select **Delete**, and then confirm your action.


## Next steps

> [Tutorial: Deploy and walk through a solar panel application template](tutorial-solar-panel-app.md)
