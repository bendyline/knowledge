---
title: Quickstart - Create a blob with Azure Storage Explorer
titleSuffix: Azure Storage
description: Learn how to use Azure Storage Explorer to create a container and a blob, download the blob to your local computer, and view all of the blobs in the container.
author: stevenmatthew

ms.service: azure-blob-storage
ms.topic: quickstart
ms.date: 10/28/2021
ms.author: shaas
ms.custom: mode-other
# Customer intent: As a cloud user, I want to utilize a storage management tool to create and manage blobs, so that I can easily transfer files between local storage and cloud storage while maintaining organization and access control.
---

# Quickstart: Use Azure Storage Explorer to create a blob

In this quickstart, you learn how to use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/) to create a container and a blob. Next, you learn how to download the blob to your local computer, and how to view all of the blobs in a container. You also learn how to create a snapshot of a blob, manage container access policies, and create a shared access signature.

## Prerequisites


To access Azure Storage, you'll need an Azure subscription. If you don't already have a subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.

All access to Azure Storage takes place through a storage account. For this quickstart, create a storage account using the [Azure portal](https://portal.azure.com/), Azure PowerShell, or Azure CLI. For help creating a storage account, see [Create a storage account](../common/storage-account-create.md).


This quickstart requires that you install Azure Storage Explorer. To install Azure Storage Explorer for Windows, Macintosh, or Linux, see [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/).

## Log in to Storage Explorer

On first launch, the **Microsoft Azure Storage Explorer - Connect to Azure Storage** dialog is shown. Several resource options are displayed to which you can connect:

- Subscription
- Storage account
- Blob container
- Azure Data Lake Storage container or directory
- File share
- Queue
- Table
- Local storage emulator

In the **Select Resource** panel, select **Subscription**.

Screenshot that shows the Microsoft Azure Storage Explorer - Select Resource pane

In the **Select Azure Environment** panel, select an Azure environment to sign in to. You can sign in to global Azure, a national cloud or an Azure Stack instance. Then select **Next**.

Screenshot that shows the Microsoft Azure Storage Explorer - Connect window

Storage Explorer will open a webpage for you to sign in.

After you successfully sign in with an Azure account, the account and the Azure subscriptions associated with that account appear under **ACCOUNT MANAGEMENT**. Select the Azure subscriptions that you want to work with, and then select **Open Explorer**.

Select Azure subscriptions

After Storage Explorer finishes connecting, it displays the **Explorer** tab. This view gives you insight to all of your Azure storage accounts as well as local storage configured through the [Azurite storage emulator](../common/storage-use-azurite.md?toc=/azure/storage/blobs/toc.json) or [Azure Stack](https://learn.microsoft.com/azure-stack/user/azure-stack-storage-connect-se?toc=/azure/storage/blobs/toc.json) environments.

Screenshot showing Storage Explorer main page

## Create a container

To create a container, expand the storage account you created in the proceeding step. Select **Blob Containers**, right-click and select **Create Blob Container**. Enter the name for your blob container. See the [Create a container](storage-quickstart-blobs-dotnet.md#create-a-container) section for a list of rules and restrictions on naming blob containers. When complete, press **Enter** to create the blob container. Once the blob container has been successfully created, it is displayed under the **Blob Containers** folder for the selected storage account.

Screenshot that shows how to create a container in Microsoft Azure Storage Explorer

## Upload blobs to the container

Blob storage supports block blobs, append blobs, and page blobs. VHD files used to back IaaS VMs are page blobs. Append blobs are used for logging, such as when you want to write to a file and then keep adding more information. Most files stored in Blob storage are block blobs.

On the container ribbon, select **Upload**. This operation gives you the option to upload a folder or a file.

Choose the files or folder to upload. Select the **blob type**. Acceptable choices are **Append**, **Page**, or **Block** blob.

If uploading a .vhd or .vhdx file, choose **Upload .vhd/.vhdx files as page blobs (recommended)**.

In the **Upload to folder (optional)** field either a folder name to store the files or folders in a folder under the container. If no folder is chosen, the files are uploaded directly under the container.

Microsoft Azure Storage Explorer - upload a blob

When you select **Upload**, the files selected are queued to upload, each file is uploaded. When the upload is complete, the results are shown in the **Activities** window.

## View blobs in a container

In the **Azure Storage Explorer** application, select a container under a storage account. The main pane shows a list of the blobs in the selected container.

Screenshot that shows how to view blobs within a container in Microsoft Azure Storage Explorer

## Download blobs

To download blobs using **Azure Storage Explorer**, with a blob selected, select **Download** from the ribbon. A file dialog opens and provides you the ability to enter a file name. Select **Save** to start the download of a blob to the local location.

Screenshot that shows how to download blobs in Microsoft Azure Storage Explorer

## Manage snapshots

Azure Storage Explorer provides the capability to take and manage [snapshots](snapshots-overview.md) of your blobs. To take a snapshot of a blob, right-click the blob and select **Create Snapshot**. To view snapshots for a blob, right-click the blob and select **Manage history** and **Manage Snapshots**. A list of the snapshots for the blob are shown in the current tab.

Screenshot showing how to take and manage blob snapshots

## Generate a shared access signature

You can use Storage Explorer to generate a shared access signatures (SAS). Right-click a storage account, container, or blob and choose **Get Shared Access Signature...**. Choose the start and expiry time, and permissions for the SAS URL and select **Create**. Storage Explorer generates the SAS token with the parameters you specified and displays it for copying.

Screenshot showing how to generate a SAS

When you create a SAS for a storage account, Storage Explorer generates an account SAS. For more information about the account SAS, see [Create an account SAS](https://learn.microsoft.com/rest/api/storageservices/create-account-sas).

When you create a SAS for a container or blob, Storage Explorer generates a service SAS. For more information about the service SAS, see [Create a service SAS](https://learn.microsoft.com/rest/api/storageservices/create-service-sas).

> **Note:**
> When you create a SAS with Storage Explorer, the SAS is always assigned with the storage account key. Storage Explorer does not currently support creating a user delegation SAS, which is a SAS that is signed with Microsoft Entra credentials.

## Next steps

In this quickstart, you learned how to transfer files between a local disk and Azure Blob storage using **Azure Storage Explorer**. To learn more about working with Blob storage, continue to the Blob storage overview.

> 
> [Introduction to Azure Blob Storage](storage-blobs-introduction.md)
