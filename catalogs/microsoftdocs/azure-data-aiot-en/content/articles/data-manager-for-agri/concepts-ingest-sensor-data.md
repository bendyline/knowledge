---
title: Ingest sensor data in Azure Data Manager for Agriculture
description: Get step-by-step guidance for ingesting sensor data.
author: BlackRider97
ms.author: ramithar
ms.service: azure-data-manager-agriculture
ms.topic: concept-article
ms.date: 06/19/2023
ms.custom: template-concept
---

# Ingest sensor data in Azure Data Manager for Agriculture

Smart agriculture, also known as precision agriculture, allows growers to maximize yields by using minimal resources such as water, fertilizer, and seeds. By deploying sensors, growers and research organizations can begin to understand crops at a micro scale, conserve resources, reduce impact on the environment, and maximize crop yield. Sensors enable important ground-truth data (such as soil moisture, rainfall, and wind speed). This data, in turn, improves the accuracy of recommendations.

Sensors are of various types:

* Location sensors, which determine latitude, longitude, and altitude
* Electrochemical sensors, which determine pH and soil nutrients
* Soil moisture sensors
* Airflow sensors, which determine the pressure required to push a predetermined amount of air into the ground at a prescribed depth
* Weather sensors

There's a large ecosystem of sensor providers that help growers to monitor and optimize crop performance. Sensor-based data also enables an understanding of the changing environmental factors.


> **Important:**
> **Microsoft Azure Data Manager for Agriculture (Preview) will be retired on September 1, 2025.**
>
> If you are actively using Azure Data Manager for Agriculture (Preview), we recommend that you pause new development and begin transition planning as soon as possible. **This preview no longer receives functional or security updates**. 
>
> Microsoft doesn't retain copies of your data. Extract your data as soon as possible; Microsoft will delete it 30 days after the retirement date. 
>
> Thank you for engaging with Azure Data Manager for Agriculture (Preview) and for leading with innovation during this early phase. 
>
> Have questions? Get answers from community experts in [Microsoft Q\&A](https://learn.microsoft.com/answers/tags/133/azure). If you have a support plan and need technical help, [create a support request](https://learn.microsoft.com/azure/azure-portal/supportability/how-to-create-azure-support-request). 


## How sensors work

Sensors are placed in a field based on its characteristics. Sensors record measurements and transfer the data to the connected node. Each node has one or more sensors connected to it. Nodes equipped with internet connectivity can push data directly to the cloud. Other nodes use an Internet of Things (IoT) agent to transfer data to the gateway.

Gateways collect all essential data from the nodes and push it securely to the cloud via cellular connectivity, Wi-Fi, or Ethernet. After the data resides in a sensor partner's cloud, the sensor partner pushes the relevant sensor data to the dedicated Azure IoT Hub endpoint that Azure Data Manager for Agriculture provides.

In addition to the preceding approach, IoT devices (sensors, nodes, and gateway) can push the data directly to the IoT Hub endpoint. In both cases, the data first reaches IoT Hub, where the next set of processing happens.  

Diagram that shows sensor data flow.

## Sensor topology

The following diagram depicts the topology of a sensor in Azure Data Manager for Agriculture. Each geometry under a party has a set of devices placed within it. A device can be either a node or a gateway, and each device has a set of sensors associated with it. Sensors send the recordings via gateway to the cloud. Sensors are tagged with GPS coordinates to help in creating a geospatial time series for all measured data.

Diagram that shows sensor topology.

## Next steps

* Learn how to [get started with pushing and consuming sensor data](how-to-set-up-sensor-as-customer-and-partner.md).
* Learn how to [get started as a customer](how-to-set-up-sensors-customer.md) to consume sensor data from a supported sensor partner like Davis Instruments.
* Learn how to [get started as a sensor partner](how-to-set-up-sensors-partner.md) to push sensor data into Azure Data Manager for Agriculture.
