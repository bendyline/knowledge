---
title: Deploy the NVIDIA DeepStream module on Ubuntu VM on Azure Stack Edge Pro with GPU | Microsoft Docs
description: Learn how to deploy the NVIDIA Deepstream module on an Ubuntu virtual machine that is running on your Azure Stack Edge Pro GPU device.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 06/28/2022
ms.author: sipastak
ms.custom: sfi-image-nochange
---

# Deploy the NVIDIA DeepStream module on Ubuntu VM on Azure Stack Edge Pro with GPU


**APPLIES TO:** Yes for Pro - GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro R&nbsp;&nbsp;

This article walks you through deploying NVIDIA’s DeepStream module on an Ubuntu VM running on your Azure Stack Edge device. The DeepStream module is supported only on GPU devices. 

## Prerequisites

Before you begin, make sure you have:

- Deployed an IoT Edge runtime on a GPU VM running on an Azure Stack Edge device. For detailed steps, see [Deploy IoT Edge on an Ubuntu VM on Azure Stack Edge](azure-stack-edge-gpu-deploy-iot-edge-linux-vm.md).

## Get module from IoT Edge Module Marketplace

1. In the [Azure portal](https://portal.azure.com), go to **Device management** > **IoT Edge**.
1. Select the IoT Hub device that you configured while deploying the IoT Edge runtime.

    Screenshot of the Azure portal, IoT Edge, IoT Hub device.

1. Select **Set modules**.

    Screenshot of the Azure portal, IoT Hub, set modules page.

1. Select **Add** > **Marketplace Module**.

    Screenshot of the Azure portal, Marketplace Module, Add Marketplace Module selection.

1. Search for **NVIDIA DeepStream SDK 5.1 for x86/AMD64** and then select it. 

    Screenshot of the Azure portal, IoT Edge Module Marketplace, modules options.

1. Select **Review + Create**, and then select **Create module**.

## Verify module runtime status

1. Verify that the module is running.  

     Screenshot of the Azure portal, modules runtime status.

1. Verify that the module provides the following output in the troubleshooting page of the IoT Edge device on IoT Hub:

    Screenshot of the Azure portal, NVIDIA DeepStream SDK log file output.

After a certain period of time, the module runtime will complete and quit, causing the module status to return an error. This error condition is expected behavior.

Screenshot of the Azure portal, NVIDIA DeepStream SDK module runtime status with error condition.

## Next steps

[Troubleshoot IoT Edge issues](azure-stack-edge-gpu-troubleshoot-iot-edge.md).
