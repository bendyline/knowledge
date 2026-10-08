---
title: Monitor your Azure Data Box Gateway device | Microsoft Docs 
description: Describes how to use the Azure portal and local web UI to monitor your Azure Data Box Gateway.
services: databox
author: stevenmatthew

ms.service: azure-data-box-gateway
ms.topic: how-to
ms.date: 10/20/2020
ms.author: shaas
# Customer intent: "As a data administrator, I want to monitor my Azure Data Box Gateway's performance and metrics, so that I can ensure optimal capacity and transaction management for cloud data operations."
---
# Monitor your Azure Data Box Gateway

This article describes how to monitor your Azure Data Box Gateway. To monitor your device, you can use Azure portal or the local web UI. Use the Azure portal to view device events, configure and manage alerts, and view metrics.

In this article, you learn how to:

> 
>
> * View device events and the corresponding alerts
> * View capacity and transaction metrics for your device
> * Configure and manage alerts

## View device events


Take the following steps in the Azure portal to view a device event. 

1. In the Azure portal, go to your resource and then go to **Monitoring > Device events**.
2. Select an event, and view the alert details. Take appropriate action to resolve the alert condition.

    Select event and view details


## View metrics


You can also view the metrics to monitor the performance of the device and in some instances for troubleshooting device issues.

Take the following steps in the Azure portal to create a chart for selected device metrics.

1. For your resource in the Azure portal, go to **Monitoring > Metrics** and select **Add metric**.

    Add metric

2. The resource is automatically populated.  

    Current resource

    To specify another resource, select the resource. On **Select a resource** blade, select the subscription, resource group, resource type, and the specific resource for which you want to show the metrics and select **Apply**.

    Choose another resource

3. From the dropdown list, select a metric to monitor your device. For a full list of these metrics, see [Metrics on your device](#metrics-on-your-device).

4. When a metric is selected from the dropdown list, aggregation can also be defined. Aggregation refers to the actual value aggregated over a specified span of time. The aggregated values can be the average, minimum, or maximum value. Select the Aggregation from Avg, Max, or Min.

    View chart

5. If the metric you selected has multiple instances, then the splitting option is available. Select **Apply splitting**, and then select the value by which you want to see the breakdown.

    Apply splitting

6. If you now want to see the breakdown only for a few instances, you can filter the data. For example, in this case, if you want to see the network throughput only for the two connected network interfaces on your device, you could filter those interfaces. Select **Add filter** and specify the network interface name for filtering.

    Add filter

7. You could also pin the chart to dashboard for easy access.

    Pin to dashboard

8. To export chart data to an Excel spreadsheet or get a link to the chart that you can share, select the share option from the command bar.

    Export data



### Metrics on your device

This section describes the monitoring metrics on your device. The metrics can be:

* Capacity metrics. The capacity metrics are related to the capacity of the device.

* Transaction metrics. The transaction metrics are related to the read and write operations to Azure Storage.

A full list of the metrics is shown in the following table:

| Capacity metrics | Description |
| --- | --- |
| **Available capacity** | Refers to the size of the data that can be written to the device. In other words, this is the capacity that can be made available on the device. <br></br>You can free up the device capacity by deleting the local copy of files that have a copy on both the device as well as the cloud. |
| **Total capacity** | Refers to the total bytes on the device to write data to. This is also referred to as the total size of the local cache. <br></br> You can now increase the capacity of an existing virtual device by adding a data disk. Add a data disk through the hypervisor management for the VM and then restart your VM. The local storage pool of the Gateway device will expand to accommodate the newly added data disk. <br></br>For more information, go to [Add a hard drive for Hyper-V virtual machine](https://www.youtube.com/watch?v=EWdqUw9tTe4). |

| Transaction metrics | Description |
| --- | --- |
| **Cloud bytes uploaded (device)** | Sum of all the bytes uploaded across all the shares on your device |
| **Cloud bytes uploaded (share)** | Bytes uploaded per share. This can be: <br></br> Avg, which is the (Sum of all the bytes uploaded per share / Number of shares),  <br></br>Max, which is the maximum number of bytes uploaded from a share <br></br>Min, which is the minimum number of bytes uploaded from a share |
| **Cloud download throughput (share)** | Bytes downloaded per share. This can be: <br></br> Avg, which is the (Sum of all bytes read or downloaded to a share / Number of shares) <br></br> Max, which is the maximum number of bytes downloaded from a share<br></br> and Min, which is the minimum number of bytes downloaded from a share |
| **Cloud read throughput** | Sum of all the bytes read from the cloud across all the shares on your device |
| **Cloud upload throughput** | Sum of all the bytes written to the cloud across all the shares on your device |
| **Cloud upload throughput (share)** | Sum of all bytes written to the cloud from a share / # of shares is average, max, and min per share |
| **Read throughput (network)** | Includes the system network throughput for all the bytes read from the cloud. This view can include data that is not restricted to shares. <br></br>Splitting will show the traffic over all the network adapters on the device. This includes adapters that are not connected or enabled. |
| **Write throughput (network)** | Includes the system network throughput for all the bytes written to the cloud. This view can include data that is not restricted to shares. <br></br>Splitting will show the traffic over all the network adapters on the device. This includes adapters that are not connected or enabled. |

## Manage alerts


Configure alert rules to inform you of alert conditions related to the consumption of resources on your device. You can configure alert rules to monitor your device for alert conditions. For more detailed information on alerts, go to [Create, view, and manage metric alerts in Azure monitor](https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-metric).


## Next steps

Learn how to [Manage bandwidth](data-box-gateway-manage-bandwidth-schedules.md).
