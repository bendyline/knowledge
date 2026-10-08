---
title: Troubleshoot Azure IoT Edge devices from the Azure portal
description: Use the troubleshooting page in the Azure portal to monitor IoT Edge devices and modules
author: sethmanheim
ms.author: sethm
ms.date: 05/09/2025
ms.topic: concept-article
ms.service: azure-iot-edge
services: iot-edge
ms.custom: sfi-image-nochange
---

# Troubleshoot IoT Edge devices from the Azure portal


**Applies to:** IoT Edge 1.6 checkmark IoT Edge 1.6

> **Important:**
> IoT Edge 1.6 LTS is the [supported release](support.md#releases). IoT Edge 1.5 LTS support ends on November 10, 2026; IoT Edge 1.4 LTS reached end of life on November 12, 2024. If you're using an earlier release, see [Update IoT Edge](how-to-update-iot-edge.md).

IoT Edge lets you monitor and troubleshoot modules in the Azure portal. The troubleshooting page wraps the IoT Edge agent's direct methods, letting you retrieve logs from deployed modules and restart them remotely. This article explains how to access and filter device and module logs in the Azure portal.

## Access the troubleshooting page

You can access the troubleshooting page in the portal through either the IoT Edge device details page or the IoT Edge module details page.

1. Sign in to the [Azure portal](https://portal.azure.com), and go to your IoT hub.

1. In the left pane, select **Devices** under **Device management**.

1. Select the IoT Edge device that you want to monitor from the list of devices.

1. On the device details page, select **Troubleshoot** from the menu.

   Screenshot of the Troubleshoot tab on the Azure portal device details page.

   Or, select the runtime status of the module you want to inspect.

   Screenshot of the Runtime status column on the Azure portal device details page.

1. From the device details page, select the name of a module to open the module details page. Then, select **Troubleshoot** from the menu.

   Screenshot of the Troubleshoot tab on the Azure portal module details page.

## View module logs in the portal

On the **Troubleshoot** page of your device, you can view and download logs from any of the running modules on your IoT Edge device.

This page has a maximum limit of 1,500 log lines, and logs longer than this are truncated. If the logs are too large, the attempt to get module logs fails. In that case, change the time range filter to retrieve less data or use direct methods to [retrieve logs from IoT Edge deployments](how-to-retrieve-iot-edge-logs.md) to gather larger log files.

Use the dropdown menu to choose which module to inspect.

Screenshot showing how to choose a module from the dropdown menu that you want to inspect.

By default, this page shows the last 15 minutes of logs. Select the **Time range** filter to view different logs. Use the slider to select a time window within the last 60 minutes, or select **Enter time instead** to choose a specific datetime window.

Screenshot showing how to choose a time or time range from the time range popup filter.

After you get the logs and set your time filter for the module you want to troubleshoot, use the **Find** filter to retrieve specific lines from the logs. Filter for warnings, errors, or a specific term or phrase. 

Screenshot showing how to use a dotnet regex pattern to search the logs, using the Find filter.

The **Find** feature supports plaintext searches and [.NET regular expressions](https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-language-quick-reference) for complex searches.

You can download the module logs as a text file. The downloaded log file reflects any active filters you applied to the logs.

>**Tip:**
>The CPU utilization on a device temporarily spikes as it gathers logs in response to a portal request. This behavior is expected, and the utilization stabilizes after the task is complete.

## Restart modules

The **Troubleshoot** page lets you restart a module. Selecting this option sends a command to the IoT Edge agent to restart the selected module. Restarting a module doesn't affect your ability to retrieve logs from before the restart.

Screenshot of how to restart a module from the Troubleshoot page.

## Next steps

Find more tips for [troubleshooting your IoT Edge device](troubleshoot.md) or learn about [common issues and resolutions](troubleshoot-common-errors.md).

If you have more questions, create a [support request](https://portal.azure.com/#create/Microsoft.Support) for help.
