---
title: Tutorial to return Azure Data Box
description: In this tutorial, learn how to return Azure Data Box, including shipping the device, verifying data upload to Azure, and erasing data from Data Box.
services: databox
author: stevenmatthew

ms.service: azure-data-box
ms.topic: tutorial
ms.custom: references_regions
ms.date: 07/16/2024
ms.author: shaas
zone_pivot_groups: data-box-shipping

# Customer intent: As an IT admin, I need to be able to return a Data Box to upload on-premises data from my server onto Azure.
---



# Tutorial: Return Azure Data Box and verify data has been uploaded to Azure





## Return Data Box and verify data upload to Azure





This tutorial describes how to return Azure Data Box and verify the data uploaded to Azure.

In this tutorial, you will learn about topics such as:

> 
>
> * Prerequisites
> * Ship Data Box to Microsoft
> * Verify data upload to Azure
> * Erasure of data from Data Box

## Prerequisites

Before you begin, make sure:

* You've completed the [Tutorial: Prepare to ship Azure Data Box](data-box-deploy-prepare-to-ship.md).
* The data copy to the device completed and the **Prepare to ship** run was successful.



## Ship Data Box back 

Based on the region where you're shipping the device, the procedure is different. In many countries/regions, you can use Microsoft managed shipping or [self-managed shipping](#self-managed-shipping).

**Applies to: americas**


If using Microsoft managed shipping, follow these steps. 

## Shipping in Americas 

### US & Canada


Take the following steps if returning the device in US or Canada.

**If you receive the device packaged in a box, retain the box, and DO NOT discard it.**

1. Make sure the data copy to the device is complete, and the **Prepare to ship** step is completed successfully.
1. Note the tracking number. This tracking number is shown as *reference number* on the **Prepare to Ship** page of the Data Box local web UI. The tracking number is available after the **Prepare to Ship** step completes successfully. Download the shipping label from this page and paste it on the packing box. If you received a device without a box, ensure that the shipping label is displayed on the E-ink display. If the label is damaged or lost, or is not displayed on the E-ink display, contact Microsoft Support.
1. Make sure that the device is powered off and cables are removed.
1. Spool and securely place the power cord that was provided with device in the back of the device.
1. **Package the device using the original box that was used for shipping. Ensure that the return label is included.**
1. Schedule a pickup:

    If your order was delivered via FedEx, schedule a pickup with FedEx. To schedule a pickup:

    - Call the local FedEx number: 800-Go-FedEx.
    - Provide the reverse shipment tracking number as shown on your printed label.
    - Contact adbops@microsoft.com if you encounter any issues while scheduling a pickup.
    - You can also drop your Data Box Disk at your nearest FedEx drop-off location.

    If your order was delivered via UPS, schedule a pickup with UPS. To schedule a pickup: 

    - Call the local UPS (country/region-specific toll-free number). 
    - In your call, quote the reverse shipment tracking number as shown in the E-ink display or your printed label. If you don't quote the tracking number, UPS will require an additional charge during pickup.
    - If any issues are encountered while scheduling a pickup, or you're asked to pay additional fees, contact send email to adbops@microsoft.com. Instead of scheduling the pickup, you can also drop off the Data Box at the nearest drop-off location.

1. After the Data Box is picked up and scanned by your carrier, the order status in the portal updates to Picked up. A tracking ID is also displayed. 



**Applies to: europe**


If using Microsoft managed shipping, follow these steps. 

## Shipping in Europe 

### [EU](#tab/in-europe)


Take the following steps if you're returning the device in Europe.

**If you receive the device packaged in a box, retain the box, and DO NOT discard it.**

1. Make sure the data copy to the device is complete, and the **Prepare to ship** step is completed successfully.
2. Note the tracking number. This tracking number is shown as reference number on the **Prepare to Ship** page of the Data Box local web UI. The tracking number is available after the **Prepare to Ship** step completes successfully. Download the shipping label from this page and paste it on the packing box. If you received a device without a box, ensure that the shipping label is displayed on the E-ink display. If the label is damaged or lost, or is not displayed on the E-ink display, [contact Microsoft Support](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/data-box-disk-contact-microsoft-support.md).
3. Make sure that the device is powered off and cables are removed.
4. Spool and securely place the power cord that was provided with device in the back of the device.
5. **Package the device using the original box that was used for shipping. Ensure that the return label is included.**
6. **If you're shipping back to Azure datacenters in Germany or Switzerland,** the Azure datacenter requires advance notice of all device returns:
    1. Email Azure Data Box Operations at [adbops@microsoft.com](mailto:adbops@microsoft.com) to receive an Inbound ID. Send email to [adbops@microsoft.com](mailto:adbops@microsoft.com). Use the following template.

       ```
       To: adbops@microsoft.com
       Subject: Request for Azure Data Box Inbound ID: <orderName> 
       Body: 
        
       I am ready to return an Azure Data Box and would like to request an Inbound ID for the following order:
       
       Order Name: <orderName>
       Return Tracking Number: <returnTracking#>
       ```

    2. Write down the Inbound ID number provided by Azure Data Box Operations, and paste it onto the unit, where it is clearly visible, near the return label.
7. Schedule a pickup with UPS if returning the device. To schedule a pickup:

    * Call the local UPS (country/region-specific toll free number).
    * In your call, quote the reverse shipment tracking number as shown in the E-ink display or your printed label. If you don't quote the tracking number, UPS will require an additional charge during pickup.
    * If any issues come up while you're scheduling a pickup, or you're asked to pay additional fees, contact Azure Data Box Operations. Send email to [adbops@microsoft.com](mailto:adbops@microsoft.com).

    Instead of scheduling the pickup, you can also drop off the Data Box at the nearest drop-off location.

8. Once the Data Box is picked up and scanned by your carrier, the order status in the portal updates to **Picked up**. A tracking ID is also displayed.




**If you're shipping back to Azure datacenters in Germany or Switzerland,** you can also [use self-managed shipping](#self-managed-shipping).

### [UK](#tab/in-uk)


Take the following steps if you're returning the device in UK.

**If you receive the device packaged in a box, retain the box, and DO NOT discard it.**

1. Make sure the data copy to the device is complete, and the **Prepare to ship** step is completed successfully.
2. Note the tracking number. This tracking number is shown as reference number on the **Prepare to Ship** page of the Data Box local web UI. The tracking number is available after the **Prepare to Ship** step completes successfully. Download the shipping label from this page and paste it on the packing box. If you received a device without a box, ensure that the shipping label is displayed on the E-ink display. If the label is damaged or lost, or is not displayed on the E-ink display, [contact Microsoft Support](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/data-box-disk-contact-microsoft-support.md).
3. Make sure that the device is powered off and cables are removed.
4. Spool and securely place the power cord that was provided with device in the back of the device.
5. **Package the device using the original box that was used for shipping. Ensure that the return label is included.**
6. Check the shipping label to see which datacenter the device was shipped from: Cardiff or London. The London datacenter requires advance notice of all device returns. 

    If the device was shipped from London, do the following steps:
    1. Email Azure Data Box Operations at [adbops@microsoft.com](mailto:adbops@microsoft.com) to receive an Inbound ID. Send email to [adbops@microsoft.com](mailto:adbops@microsoft.com). Use the following template.

       ```
       To: adbops@microsoft.com
       Subject: Request for Azure Data Box Inbound ID: <orderName> 
       Body: 
        
       I am ready to return an Azure Data Box and would like to request an Inbound ID for the following order:
       
       Order Name: <orderName>
       Return Tracking Number: <returnTracking#>
       ```

    2. Write down the Inbound ID number provided by Azure Data Box Operations, and paste it onto the unit, where it is clearly visible, near the return label.
7. Schedule a pickup with UPS if returning the device. To schedule a pickup:

    * Call the local UPS (country/region-specific toll free number).
    * In your call, quote the reverse shipment tracking number as shown in the E-ink display or your printed label. If you don't quote the tracking number, UPS will require an additional charge during pickup.
    * If any issues come up while you're scheduling a pickup, or you're asked to pay additional fees, contact Azure Data Box Operations. Send email to [adbops@microsoft.com](mailto:adbops@microsoft.com).

    Instead of scheduling the pickup, you can also drop off the Data Box at the nearest drop-off location.

Once the Data Box is picked up and scanned by your carrier, the order status in the portal updates to **Picked up**. A tracking ID is also displayed.



### [Norway](#tab/in-norway)

Take the following steps if you're returning the device in Norway.

1. Keep the original box used to ship the device for return shipment.

1. Power off the device and remove the cables.

1. Spool and securely place the power cord that was provided with the device in the back of the device. Pack the device for return shipment in the original box. 

1. Note the tracking number (shown as reference number on the **Prepare to Ship** page of the Data Box local web UI). The tracking number is available after **Prepare to ship** completes successfully. Download the shipping label from this page, and paste it on the packing box. 

1. Book a pickup with DHL using one of the following methods:	 

    - Book a pickup online by going to [DHL Express Norway](https://mydhl.express.dhl/no/en/schedule-pickup.html#/schedule-pickup#label-reference) and selecting **Schedule a Pickup**.
    
        On the DHL website, select **No** to create a shipping label. Enter the DHL Waybill number generated when completing **Prepare to ship** process.
    
        Screenshot of DHL site to schedule a pickup.

    - Send an [email](mailto:no.cs@dhl.com) using the following template:
    Screenshot of email template

1. For any urgent pickup requests or assistance with DHL booking, [email](mailto:no.cs@dhl.com) or call (+47) 21 00 22 00.

1. If you encounter any issues when scheduling a pickup, reach out to [Azure Data Box Operations](mailto:adbops@microsoft.com) for assistance. Provide the order name and the issue encountered in the subject line.

Once the device is picked up and scanned by the carrier, the order status in the Azure portal is updated to **Picked Up** and a tracking ID is displayed. 




**Applies to: asia**


If using Microsoft managed shipping, follow these steps. 

## Shipping in Asia

### [Japan](#tab/in-japan)


Take the following steps if you're returning the device in Japan.

1. Keep the original box used to ship the device for return shipment.
2. Power off the device and remove the cables.
3. Spool and securely place the power cord that was provided with the device in the back of the device.
4. Write your company name and address information on the consignment note as your sender information.
5. Email adbops@microsoft.com using the following template to get the return shipment label: 
    * If you have multiple orders, email to ensure individual pickup.

    ```
    To: adbops@microsoft.com
    Subject: Microsoft Azure return shipment Pickup | [Order Name] 
    Body:
    -  Name:
    -  Contact Number:
    -  Collection Address:
    -  Preferred Collection Date and Time:
    ```

6. Print two copies of the reverse shipping label. Affix one label to the outside of the package. Use the second label to obtain a signature from the carrier team as acknowledgment.
7. If you encounter pickup issues:
   * Contact Azure Data Box Operations at adbops@microsoft.com for assistance.
   * Include the Order Name and a description of the issue in the subject line.
8. Once the device is picked up and scanned by the carrier, the order status in the Azure portal will update to “Picked Up” and a tracking ID will be displayed.


### [Singapore](#tab/in-singapore)


Take the following steps if you're returning the device in Singapore.

1. Keep the original box used to ship the device for return shipment.
3. Power off the device and remove the cables.
4. Spool and securely place the power cord that was provided with the device in the back of the device. 
5. Email adbops@microsoft.com using the following template to get the return shipment label: 
    * If you have multiple orders, email to ensure individual pickup.

    ```
    To: adbops@microsoft.com
    Subject: Microsoft Azure return shipment Pickup | [Order Name] 
    Body:
    -  Name:
    -  Contact Number:
    -  Collection Address:
    -  Preferred Collection Date and Time:
    ```

6. Print two copies of the reverse shipping label. Affix one label to the outside of the package. Use the second label to obtain a signature from the carrier team as acknowledgment.
7. If you encounter pickup issues:
   * Contact Azure Data Box Operations at adbops@microsoft.com for assistance.
   * Include the Order Name and a description of the issue in the subject line.
8. Once the device is picked up and scanned by the carrier, the order status in the Azure portal will update to “Picked Up” and a tracking ID will be displayed. 



### [Hong Kong Special Administrative Region](#tab/in-hk)


Take the following steps if returning the device in Hong Kong Special Administrative Region.

1. Pack the device for return shipment in the original box.
2. Power off the device and remove the cables.
3. Spool and securely place the power cord that was provided with the device in the back of the device.
4. Write your company name and address information on the consignment note as your sender information.
5. Email adbops@microsoft.com using the following template: 
    * If you have multiple orders, email to ensure individual pickup.

    ```
    To: adbops@microsoft.com
    Subject: Microsoft Azure return shipment Pickup | [Order Name] 
    Body:
    -  Name:
    -  Contact Number:
    -  Collection Address:
    -  Preferred Collection Date and Time:
    ```

6. Print two copies of the reverse shipping label. Affix one label to the outside of the package. Use the second label to obtain a signature from the carrier team as acknowledgment.
7. If you encounter pickup issues:
   * Contact Azure Data Box Operations at adbops@microsoft.com for assistance.
   * Include the Order Name and a description of the issue in the subject line.
8. Once the device is picked up and scanned by the carrier, the order status in the Azure portal will update to “Picked Up” and a tracking ID will be displayed.


### [Korea](#tab/in-korea)


Take the following steps if you're returning the device in Korea.

1. Pack the device for return shipment in the original box.
2. Power off the device and remove the cables.
3. Spool and securely place the power cord that was provided with the device in the back of the device.
4. Write your company name and address information on the consignment note as your sender information.
5. Email adbops@microsoft.com using the following template: 
    * If you have multiple orders, email to ensure individual pickup.

    ```
    To: adbops@microsoft.com
    Subject: Microsoft Azure return shipment Pickup | [Order Name] 
    Body:
    -  Name:
    -  Contact Number:
    -  Collection Address:
    -  Preferred Collection Date and Time:
    ```
6. Print two copies of the reverse shipping label. Affix one label to the outside of the package. Use the second label to obtain a signature from the carrier team as acknowledgment.
7. If you encounter pickup issues:
   * Contact Azure Data Box Operations at adbops@microsoft.com for assistance.
   * Include the Order Name and a description of the issue in the subject line.
8. Once the device is picked up and scanned by the carrier, the order status in the Azure portal will update to “Picked Up” and a tracking ID will be displayed.


### [UAE](#tab/in-uae)


Take the following steps if returning the device in the United Arab Emirates.

1. Keep the original box used to ship the device for return shipment.
2. Make sure the data copy to device is complete, and the **Prepare to ship** step completed successfully.
3. Note the reference number on the **Prepare to ship** page of the device local web UI.
4. Power off the device, and remove the cables. Spool and securely place the power cord that was provided with the device in the back of the device.
6. Pack the device for return shipment in the original box.
7. Email [Azure Data Box Operations](mailto:adbops@microsoft.com) to get an ID that will be used to identify the package when it arrives back at the datacenter.
8. Write down this ID on the printed shipping label, next to the return address so that it’s clearly visible.  
9. Book a pickup online by going to [DHL Express UAE](https://mydhl.express.dhl/ae/en/home.html#/schedulePickupTab) > **Schedule a Pickup**.
   - Enter the reference number from the **Prepare to ship** page of the device local web UI in the waybill number field.
   - Bookings are accepted from 9:00 AM – 2:00 PM six days a week (excluding Fri and public holidays).
   - Pickup requests should be placed at least 90 minutes before customer closing time.
10. If you come across any issue with the DHL booking tool, you can contact DHL using any of these methods:
    - Call 04-2924545.
    - Email [ecom.ae@dhl.com](mailto:ecom.ae@dhl.com) with details of the issue(s), and put the waybill number in the Subject: line.
    - Call DHL Customer Support at 600 567567.



### [India](#tab/in-india)


Take the following steps if returning the device in India.

1.	Ensure that Prepare to Ship has completed on the Data Box and there are no critical errors. 
2.	Make sure the device is powered off and any cables are removed. Spool and securely place the power cord provided with the device in the back compartment.
3.	Package the device using the original box that was used for shipping. 
4.	Email Azure Data Box Operations using the following template to receive the e-waybill and delivery challan required for the return shipment.

   ```
   To: adbops@microsoft.com
   Subject: Request for shipping documents for Azure Data Box order : ‘orderName’
   Body:
   I am ready to return an Azure Data Box and would like to request the e-waybill and delivery challan  for the following order:
   Order Name:
   ```

5.	If an Inbound ID is also required to send the package to the datacenter, the Azure Data Box Operations team will provide this. Write down the Inbound ID number on the packaging box such that it's clearly visible near the return label.
6.	Once the shipping label and other documents are ready, Azure Data Box Operations will schedule a return pickup from your location. 
7.	If you encounter any issues or are asked to pay additional fees when scheduling a pickup, reach out to Azure Data Box Operations <adbops@microsoft.com> for assistance. Provide the Order Name and the issue encountered in the subject line.
 
Once the device is picked up and scanned by the carrier, the order status in the Azure portal will be updated to **Picked Up**, and a tracking ID will be displayed.








**Applies to: australia**


If using Microsoft managed shipping, follow these steps.

## Shipping in Australia

### Australia


Azure datacenters in Australia have an additional security notification. All the inbound shipments must have an advanced notification. Take the following steps to ship in Australia.

1. Keep the original box used to ship the device for return shipment.
2. Make sure that the data copy to device is complete and **Prepare to ship run** is successful.
3. Power off the device and remove the cables.
4. Spool and securely place the power cord that was provided with the device in the back of the device.
5. Book a pickup online by going to [DHL Express Australia](https://mydhl.express.dhl/au/en/schedule-pickup.html#/schedule-pickup#label-reference) and selecting **Schedule a Pickup**.
    - On the DHL website, select **No** to create a shipping label. Enter the DHL Waybill number generated when completing **Prepare to ship** process.
    
    Screenshot of DHL site to schedule a pickup.





**Applies to: africa**


If using Microsoft managed shipping, follow these steps. 

## Shipping in Africa

### S Africa


Take the following steps if you're returning the device in South Africa.

1. Pack the device for return shipment in the original box.
2. Spool and securely place the power cord that was provided with the device in the back of the device.
3. Note the tracking number (shown as reference number on the **Prepare to Ship** page of the Data Box local web UI). The tracking number is available after the "Prepare to ship" step completes successfully. Download the shipping label from this page, and paste it on the packing box.
4. Request a return code from Azure Data Box Operations. A return code is required for delivering the package back to the datacenter. Send email to [adbops@microsoft.com](mailto:adbops@microsoft.com). Note this code on the shipping label next to the return address, where it is clearly visible.
5. Book a pickup with DHL using one of the following methods:
 
   * Book a pickup online by going to [DHL Express South Africa](https://mydhl.express.dhl/za/en/schedule-pickup.html#/schedule-pickup#label-reference) and selecting **Schedule a Pickup**.

        On the DHL website, select **No** to create a shipping label. Enter the DHL Waybill number generated when completing **Prepare to ship** process.
    
        Screenshot of DHL site to schedule a pickup.

   * Send an email to [Priority.Support@dhl.com](mailto:Priority.Support@dhl.com) using the following template:

     ```output
     To: Priority.Support@dhl.com
     Subject: Pickup request for Microsoft Azure
     Body: Need pick up for the below shipment
       *  DHL tracking number: (reference number/waybill number)
       *  Requested pickup date: yyyy/mm/dd;time:HH MM
       *  Shipper contact: (company name)
       *  Contact person: 
       *  Phone number: 
       *  Full physical address: 
       *  Item to be collected: Azure Dt
     ```

    * Or drop off the package at the nearest DHL service point.

6. If you come across any issues, email [Priority.Support@dhl.com](mailto:Priority.Support@dhl.com) with details of the issue(s), and put the waybill number in the Subject: line. You can also call +27(0)119213902.




## Self-managed shipping

Self-managed shipping is available as an option when you [Order Azure Data Box](data-box-disk-deploy-ordered.md). For detailed steps, see [Use self-managed shipping](data-box-portal-customer-managed-shipping.md).

Self-managed shipping is only available in the following regions:

| Region | Region | Region | Region | Region |
| --- | --- | --- | --- | --- |
| US Government | United States | United Kingdom | Western Europe | Japan |
| Singapore | South Korea | India | South Africa | Australia |
| Brazil | Norway |



If you selected self-managed shipping when you created your order, follow these instructions (except for Brazil). 

1. Write down the Authorization code that's shown on the **Prepare to Ship** page of the local web UI for the Data Box after the step completes successfully.
2. Power off the device and remove the cables. Spool and securely place the power cord that was provided with the device at the back of the device.
3. When you're ready to return the device, send an email to the Azure Data Box Operations team using the template below.

    ```
    To: adbops@microsoft.com
    Subject: Request for Azure Data Box drop-off for order: 'orderName'
    Body:
        1. Order name  
        2. Authorization code available after Prepare to Ship has completed [Yes/No]  
        3. Contact name of the person dropping off. You will need to display a government-approved
        ID during the drop off.
    ```
 



**Applies to: americas**


### Shipping in Brazil

To schedule a device return in Brazil, send an email to [adbops@microsoft.com](mailto:adbops@microsoft.com) with the following information:

```
Subject: Request Azure Data Box Disk drop-off for order: <ordername>

- Order name
- Contact name of the person who will drop off the Data Box Disk (A government-issued photo ID will be required to validate the contact’s identity upon arrival.) 
- Inbound Nota Fiscal (A copy of the inbound Nota Fiscal will be required at drop-off.)   
```





## Verify data has been uploaded to Azure 


1. When the Data Box device is connected to the Azure datacenter network, the data upload to Azure starts automatically. 
2. Azure Data Box service notifies you that the data copy is complete via the Azure portal. 

    1. Check error logs for any failures and take appropriate actions.
    2. Verify that your data is in the storage account(s) before you delete it from the source.



## Data erasure from Data Box
 
Once the upload to Azure is complete, the Data Box erases the data on its disks as per the [NIST SP 800-88 Revision 1 guidelines](https://csrc.nist.gov/News/2014/Released-SP-800-88-Revision-1,-Guidelines-for-Medi).






## Verify data has uploaded to Azure


When Microsoft receives and scans the device, order status is updated to **Received**. The device then undergoes physical verification for damage or signs of tampering.

After the verification is complete, the Data Box is connected to the network in the Azure datacenter. The data copy starts automatically. Depending upon the data size, the copy operation can take between a few hours to a few days to complete. You can monitor the copy job progress in the portal.

### Review copy errors from upload

When files fail to upload due to a nonretryable error, you're notified to review the errors before proceeding. The errors are listed in the data copy log.

You can't fix these errors. The upload has completed with errors. The notification lets you know about any configuration issues you need to fix before you try another upload via network transfer or a new import order. For guidance, see [Review copy errors in uploads from Azure Data Box and Azure Data Box Heavy devices](data-box-troubleshoot-data-upload.md).

When you confirm that you've reviewed the errors and are ready to proceed, the data will be secure erased from the device. The order is completed automatically after 14 days. By acting on the notification, you can move things along more quickly.


To review non-retryable errors and proceed with your order, do the following steps:

1. Open your order in the Azure portal.  

   If any non-retryable errors prevented files from uploading, you see the following notification. The current order status will be **Data copy completed with errors. Device pending data erasure.**

   Notification for copy errors during an upload in the Azure portal

   Make a note of the **COPY LOG PATH** in **DATA COPY DETAILS**. You review the errors in the data copy log.

   > **Note:**
   > 
If firewall rules are set on the storage account for your Data Box, you might not be able to access copy logs from the Azure portal by using **COPY LOG PATH** on the **Overview** pane. To access the logs, either modify the storage firewall settings to allow the current system, or use a system which is in the firewall network.



2. Select **Confirm device erasure** to open a review panel.

   Review and proceed panel for upload errors in the Azure portal

3. Review the errors in the data copy log using the copy log path that you made a note of earlier. If you need to, you can select **Close** to display the path again. 

   You need to fix any configuration issues before you try another upload via a network transfer or a new import order. <!--For guidance, see [Review copy errors in uploads from Azure Data Box and Azure Data Box Heavy devices](../articles/databox/data-box-troubleshoot-data-upload.md). - To make the Include, I needed to move this reference out of the main procedure.-->

4. After you review the errors, select the check box to acknowledge that you're ready to proceed with data erasure. Then select **Proceed**.

   Confirm that you are ready to proceed with data erasure

   After the data is secure erased from the device, the order status is updated to **Copy completed with errors**.

   Status display for a Data Box import order that completed with errors

   If you don't take any action, the order completes automatically after 14 days.





### Verify data in completed upload

Once the data upload is complete, order status updates to **Completed**.

> **Note:**
> A Cyclic Redundancy Check (CRC) computation is completed during the upload to Azure. The CRCs from the data copy and data upload are compared. A CRC mismatch indicates that the corresponding files failed to upload.
> 
> You can use the CRC checksum tool script to compare the checksums of the on-premises source data with the data uploaded to Azure. The script can be downloaded from [Azure Samples](https://github.com/Azure-Samples/data-box-samples/tree/main/JavaToolforCRC). See the [README file](https://github.com/Azure-Samples/data-box-samples/blob/main/JavaToolforCRC/README.md) for more information.

Verify that your data is uploaded to Azure before you delete it from the source. Your data can be in:

- Your Azure Storage account(s). When you copy the data to Data Box, the data is uploaded to one of the following paths in your Azure Storage account:

  - For block blobs and page blobs: `https://<storage_account_name>.blob.core.windows.net/<containername>/files/a.txt`
  - For Azure Files: `https://<storage_account_name>.file.core.windows.net/<sharename>/files/a.txt`

    Alternatively, you could go to your Azure storage account in Azure portal and navigate from there.

- Your managed disk resource group(s). When creating managed disks, the VHDs are uploaded as page blobs and then converted to managed disks. The managed disks are attached to the resource groups specified at the time of order creation. 

    - If your copy to managed disks in Azure was successful, you can go to the **Order details** in the Azure portal and make a note of the resource groups specified for managed disks.

        Identify managed disk resource groups

        Go to the noted resource group and locate your managed disks.

        Managed disk attached to resource groups

    - If you copied a VHDX or a dynamic or differencing VHD, the VHDX or VHD is uploaded to the staging storage account as a page blob, but the conversion of the VHD to a managed disk will fail. Go to your staging **Storage account > Blobs**, and select the appropriate container - Standard SSD, Standard HDD, or Premium SSD. The VHDs are uploaded as page blobs in your staging storage account and accrue charges.


## Erasure of data from Data Box
 
Once the upload to Azure is complete, the Data Box erases the data on its disks as per the [NIST SP 800-88 Revision 1 guidelines](https://csrc.nist.gov/News/2014/Released-SP-800-88-Revision-1,-Guidelines-for-Medi).


## Next steps

In this tutorial, you learned about Azure Data Box topics such as:

> 
> * Prerequisites
> * Ship Data Box to Microsoft
> * Verify data upload to Azure
> * Erasure of data from Data Box

Advance to the following article to learn how to manage Data Box via the local web UI.

> 
> [Use local web UI to administer Azure Data Box](data-box-local-web-ui-admin.md)
