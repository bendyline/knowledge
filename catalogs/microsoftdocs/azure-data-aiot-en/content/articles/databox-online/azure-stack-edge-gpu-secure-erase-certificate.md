---
title: Erase data from your Azure Stack Edge
description: Describes the process to erase data from an Azure Stack Edge device and generate a certificate of proof that data has been removed.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 04/10/2024
ms.author: sipastak
---
# Erase data from your Azure Stack Edge


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


This article provides steps to reset an Azure Stack Edge device. The reset operation generates a Secure Erase Certificate that verifies details about your device in an erase record. You can also manually generate a Secure Erase Certificate.

The Secure Erase Certificate includes software version details about the device and disk-by-disk details including data erasure type, data erasure method, and erasure verification method. 
 
The following erase types are supported:

| Data erasure type | Description |
| --- | --- |
| CryptoErase | Sanitizes the encryption key, leaving the data on disk unrecoverable. |
| BlockErase | Deletes all user data from the disk. |
| CryptoAndBlockErase | Performs a crypto erase followed by a block erase. |

## Reset the Azure Stack Edge device

1. In Azure portal for your Azure Stack Edge device, select **Device reset** in the left-hand navigation, then select **Reset device**.

   Screenshot that shows the Azure portal option to reset an Azure Stack Edge device.

1. On the Confirm device reset dialog, type **Yes** and then select **Yes** to confirm the reset operation.

   Screenshot that shows the Azure portal option to confirm device reset for an Azure Stack Edge device.

1. Azure Stack Edge device reset operation generates a Secure Erase Certificate:

   [Screenshot of the Secure Erase Certificate following reset of an Azure Stack Edge device.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/media/azure-stack-edge-gpu-secure-erase-certificate/azure-stack-edge-secure-erase-certificate.png#lightbox)

## Download the Secure Erase Certificate for your device

Use the following steps to download a Secure Erase Certificate for your device after device reset:

1. On the Azure portal, select **Support** and then select **Secure erase certificate** from the **Support package options** dropdown.
1. Select **Secure erase certificate**.

   Screenshot of the Support package options dropdown menu for generating a Secure Erase Certificate following reset of an Azure Stack Edge device.

1. Select **Create Support package** > **Download Support package** to download the certificate.

## Next steps

 - [What is Azure Stack Edge Pro 2?](azure-stack-edge-pro-2-overview.md)
