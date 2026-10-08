---
title: Azure Stack Edge device return 
description: Learn how to wipe the data and return your Azure Stack Edge device, and then delete the resource associated with the device.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 03/20/2025
ms.author: sipastak
---

# Return your Azure Stack Edge device


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


This article describes how to wipe the data and then return your Azure Stack Edge device. After you've returned the device, you can also delete the resource associated with the device.

In this article, you learn how to:

> 
>
> * Wipe the data off the data disks on the device
> * Initiate device return in Azure portal
> * Pack up the device and schedule a pickup
> * Delete the resource in Azure portal

## Erase data from the device

To wipe the data off the data disks of your device, you need to reset your device.

Before you reset, create a copy of the local data on the device if needed. You can copy the data from the device to an Azure Storage container. 

You can initiate the device return even before the device is reset.

You can reset your device in the local web UI or in PowerShell. For PowerShell instructions, see [Reset your device](azure-stack-edge-connect-powershell-interface.md#reset-your-device).


To reset your device using the local web UI, take the following steps.

1. In the local web UI, go to **Maintenance > Device reset**.
2. Select **Reset device**.

    Reset device

3. When prompted for confirmation, review the warning. Type **Yes** and then select **Yes** to continue.

    Confirm reset  

The reset erases the data off the device data disks. Depending on the amount of data on your device, this process takes about 30-40 minutes.

## Remove Azure resources from your Azure Stack Edge device
 
In addition to resetting your device, complete the following steps to remove Azure resources associated with the device.

Delete the Azure Stack Edge resource (name of the service) associated with the Azure Stack Edge device. You can also use this step to remove the associated key vault. This step also removes the managed identity associated with the Azure Stack Edge resource. Gather key vault details before you delete the Azure Stack Edge resource.

Use the following steps to delete the Azure Stack Edge resource, its managed identity, the associated key vault, and the Azure storage account:

1. In Azure portal, go to your key vault, navigate to **Diagnostic settings**, and make note of the storage account name and the key vault name.
1. Go to your Azure Stack Edge resource and then to **Overview**. From the command bar, select **Delete**.
1. In the Delete device blade, specify the name of the device you want to delete and then select **Delete**.
1. To continue, confirm the delete operation.
1. When deleting the Azure Stack Edge resource, you'll also be prompted to remove the associated key vault. To get the key vault name, select **Security** in left navigation, and then select the key vault name to get to the key vault resource. The key vault name starts with the service name and is appended with a GUID. Select **Diagnostic settings** and also note the storage account name.
1. Delete the Azure storage account used by the key vault. Look for a Zone redundant storage account in the same scope as the Azure Stack Edge resource; manually delete the storage account.

>**Note:**
>While performing the device reset, only the data that resides locally on the device will be deleted. The data that's in the cloud won't be deleted and, if not removed, will continue to collect [charges](https://azure.microsoft.com/pricing/details/storage/). This data must be deleted separately using a cloud storage management tool like [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/).


> **Note:**
> - If you're exchanging or upgrading to a new device, we recommend that you reset your device only after you've received the new device.
> - The device reset only deletes all the local data off the device. The data that is in the cloud isn't deleted and collects [charges](https://azure.microsoft.com/pricing/details/storage/). This data needs to be deleted separately using a cloud storage management tool like [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/).

## Initiate device return

To begin the return process, take the following steps.

---

### [Azure Edge Hardware Center (Preview)](#tab/azure-edge-hardware-center) 

If you used the Azure Edge Hardware Center to order your device, follow these steps to return the device:


1. In the Azure portal, go to your Azure Edge Hardware Center order item resource. In the **Overview**, go to the top command bar in the right pane and select **Return**. The return option is only enabled after you have received a device.

    Return device 1  

1. In the **Return hardware** blade, provide the following information:

    Return device 2 

    1. From the dropdown list, select a **Reason for returning**.

    1. Provide the serial number of the device. To get the device serial number, go the local web UI of the device and then go to **Overview**.  
    
       Device serial number 1 

    1. (Optionally) Enter the **Service tag** number. The service tag number is an identifier with five or more characters, which is unique to your device. The service tag is located on the bottom-right corner of the device (as you face the device). Pull out the information tag (it is a slide-out label panel). This panel contains system information such as service tag, NIC, MAC address, and so on. 
    
       Service tag number 1

    1. To request a return shipping box, check the **Shipping box required to return the hardware unit**.you can request it. Answer **Yes** to the question **Need an empty box to return**.
    
    1. Review the **Privacy terms**, and select the checkbox by the note that you have reviewed and agree to the privacy terms.

    1. Verify the **Pickup details**. By default, these are set to your shipping address. You can add a new address or select a different one from the saved addresses for the return pickup.

        Return device 3 

    1. Select **Initiate return**.

1. Once the return request is submitted, the order item resource starts reflecting the status of your return shipment. The status progresses from **Return initiated** to **Picked up** to **Return completed**. Use the portal to check the return status of your resource at any time.

    Return device 5 

1. Once the request is initiated, the Azure Stack Edge operations team reaches out to you to help schedule the device pickup.



The next step is to package the device.


### [Portal (Classic)](#tab/azure-portal)

If you used the classic portal to order your device, follow these steps to return the device:

1. Go to your Azure Stack Edge resource in Azure portal. In the **Overview**, go to the command bar in the right pane and select **Return device**. 

    Return device 1  

2. In the **Return device** blade, under **Basic details**:

    1. Provide the serial number of the device. To get the device serial number, go the local web UI of the device and then go to **Overview**.  
    
       Device serial number 1 

    2. Enter the service tag number. The service tag number is an identifier with five or more characters, which is unique to your device. The service tag is located on the bottom-right corner of the device (as you face the device). Pull out the information tag (it is a slide-out label panel). This panel contains system information such as service tag, NIC, MAC address, and so on. 
    
       Service tag number 1

    3. From the dropdown list, choose a reason for the return.

       Return device 2 

3. Under **Shipping details**:

    1. Provide your name, company name, and full company address. Enter a work phone including the area code and an email ID for notification.
    2. If you need a return shipping box, you can request it. Answer **Yes** to the question **Need an empty box to return**.

    Return device 3

4. Review the **Privacy terms**, and select the checkbox by the note that you have reviewed and agree to the privacy terms.

5. Select **Initiate return**.

    Return device 4 

6. Once your device return details are captured, you can notify the Azure Stack Edge operations team via an email. You can use your email application assuming the email application is installed and configured. You can also copy the data to create and send an email.

    Return device 5 

7. Once the Azure Stack Edge operations team receives the email, they will send you a reverse shipment label. When you receive this label, you can schedule the device pickup with the carrier. 

---

## Pack the device

To pack the device, take the following steps.

1. Shut down the device. In the local web UI, go to **Maintenance > Power settings**.
2. Select **Shut down**. When prompted for confirmation, click **Yes** to continue. For more information, see [Manage power](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-manage-access-power-connectivity-mode.md#manage-power).
3. Unplug the power cables and remove all the network cables from the device.
4. Carefully prepare the shipment package as per the following instructions and as shown in the following diagram:

    Device packaging 

    1. Use the shipping box you requested from Azure or the original shipping box with its foam packaging. 
    1. Place the bottom foam piece in the box.
    1. Lay the device on top of the foam taking care that it sits snugly in the foam.
    1. Place the top foam piece in the package.
    1. Place the power cords in the accessory tray and the rails on the top foam piece.
    1. Seal the box and affix the shipping label that you received from Azure on the package.
   
    > **Important:**
    > If proper guidelines to prepare the return shipment aren't observed, the device could be damaged and damaged device fee may apply. Review the [Product Terms of service](https://www.microsoft.com/licensing/product-licensing/products) and the [FAQ on lost or damaged device](https://azure.microsoft.com/pricing/details/databox/edge/).
 


## Schedule a pickup

To schedule a pickup, take the following steps.

1. Schedule a pickup with your regional carrier. If returning the device in US, your carrier could be UPS or FedEx. To schedule a pickup with UPS:

    1. Call the local UPS (country/region-specific toll free number).
    2. In your call, quote the reverse shipment tracking number as shown on your printed label.
    3. If the tracking number isn't quoted, UPS will require you to pay an extra charge during pickup.

    Instead of scheduling the pickup, you can also drop off the Azure Stack Edge at the nearest drop-off location.

## Complete return

In this section, you can verify when the return is complete and then choose to delete the order. 

---

### [Azure Edge Hardware Center (Preview)](#tab/azure-edge-hardware-center)

When you initiate the return, the billing is paused. After the device is received at the Azure datacenter, the device is inspected for damage or any signs of tampering.

- If the device arrives intact and is in good shape, Azure Stack Edge operations team will contact you to confirm that the device was returned. You can choose to delete the resource associated with the device in the Azure portal.
- If the device arrives significantly damaged, charges may apply. For details, see the [FAQ on lost or damaged device](https://azure.microsoft.com/pricing/details/databox/edge/) and [Product Terms of Service](https://www.microsoft.com/licensing/product-licensing/products). 

### [Portal (Classic)](#tab/azure-portal) 

When you initiate the return, the billing is paused. After the device is received at the Azure datacenter, the device is inspected for damage or any signs of tampering.

- If the device arrives intact and is in good shape, Azure Stack Edge operations team will contact you to confirm that the device was returned. You can choose to delete the resource associated with the device in the Azure portal.
- If the device arrives significantly damaged, charges may apply. For details, see the [FAQ on lost or damaged device](https://azure.microsoft.com/pricing/details/databox/edge/) and [Product Terms of Service](https://www.microsoft.com/licensing/product-licensing/products).  


You can delete the device in the Azure portal:

- After you place an order, and before the device is prepared by Microsoft.
- After you return a device to Microsoft, and the Azure Stack Edge operations team has called to confirm that the device was returned. The operations team doesn't call until the returned device passes the physical inspection at the Azure datacenter.

If you've activated the device against another subscription or location, Microsoft will move your order to the new subscription or location within one business day. After the order is moved, you can delete this resource.


Take the following steps to delete the device and the resource in Azure portal.

1. In the Azure portal, go to your resource and then to **Overview**. From the command bar, select **Delete**.

    Select delete

2. In the **Delete device** blade, type the name of the device you want to delete and select **Delete**.

    Confirm delete

You're notified after the device and the associated resource is successfully deleted.

---

## Next steps

- Learn how to [Get a replacement Azure Stack Edge device](azure-stack-edge-replace-device.md).
