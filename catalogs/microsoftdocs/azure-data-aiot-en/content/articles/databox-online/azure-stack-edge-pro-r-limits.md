---
title: Azure Stack Edge Pro R limits | Microsoft Docs
description: Describes system limits and recommended sizes for the Azure Stack Edge Pro R.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: limits-and-quotas
ms.date: 10/13/2020
ms.author: sipastak
---

# Azure Stack Edge Pro R limits

Consider these limits as you deploy and operate your Azure Stack Edge Pro R solution.

## Azure Stack Edge Pro R service limits


- The storage account should be physically closest to the region where the device is deployed (can be different from where the service is deployed).
- Moving an Azure Stack Edge resource to a different subscription or resource group is not supported. For more details, go to [Move resources to new resource group or subscription](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/move-resource-group-and-subscription.md).


## Azure Stack Edge Pro R device limits

The following table describes the limits for the Azure Stack Edge Pro R device.

| Description | Value |
| --- | --- |
| No. of files per device | 100 million |
| No. of shares per container | 1 |
| Maximum no. of share endpoints and REST endpoints per device | 24 |
| Maximum no. of tiered storage accounts per device | 24 |
| Maximum file size written to a share | 5 TB |
| Maximum number of resource groups per device | 800 |

## Azure storage limits


This section describes the limits for Azure Storage service, and the required naming conventions for Azure Files, Azure block blobs, and Azure page blobs, as applicable to the Azure Stack Edge service. Review the storage limits carefully and follow all the recommendations.

For the latest information on Azure storage service limits and best practices for naming shares, containers, and files, go to:

- [Naming and referencing containers](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata)
- [Naming and referencing shares](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata)
- [Block blobs and page blob conventions](https://learn.microsoft.com/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs)

> **Important:**
> If there are any files or directories that exceed the Azure Storage service limits, or do not conform to Azure Files/Blob naming conventions, then these files or directories are not ingested into the Azure Storage via the Azure Stack Edge service.

## Data upload caveats


Following caveats apply to data as it moves into Azure.

- We suggest that more than one device should not write to the same container.
- If you have an existing Azure object (such as a blob or a file) in the cloud with the same name as the object that is being copied, device will overwrite the file in the cloud.
- An empty directory hierarchy (without any files) created under share folders is not uploaded to the blob containers.
- You can copy the data using drag and drop with File Explorer or via command line. If the aggregate size of files being copied is greater than 10 GB, we recommend you use a bulk copy program such as Robocopy or rsync. The bulk copy tools retry the copy operation for intermittent errors and provide additional resiliency. If using Blob storage via REST, AzCopy or Azure Storage Explorer can be used.
- If the share associated with the Azure storage container uploads blobs that do not match the type of blobs defined for the share at the time of creation, then such blobs are not updated. For example, you create a block blob share on the device. Associate the share with an existing cloud container that has page blobs. Refresh that share to download the files. Modify some of the refreshed files that are already stored as page blobs in the cloud. You will see upload failures.
- After a file is created in the shares, renaming of the file isn't supported.
- Deletion of a file from a share does not delete the entry in the storage account.
- If using rsync to copy data, then `rsync -a` option is not supported.


## Azure storage account size and object size limits


Here are the limits on the size of the data that is copied into storage account. Make sure that the data you upload conforms to these limits. For the most up-to-date information on these limits, go to [Azure blob storage scale targets](../storage/common/scalability-targets-standard-account.md#scale-targets-for-standard-storage-accounts-and-disk-access-resources) and [Azure Files scale targets](../storage/common/scalability-targets-standard-account.md#scale-targets-for-standard-storage-accounts-and-disk-access-resources).

| Size of data copied into Azure storage account | Default Limit |
| --- | --- |
| Block Blob and page blob | 500 TB per storage account |



## Azure object size limits


Here are the sizes of the Azure objects that can be written. Make sure that all the files that are uploaded conform to these limits.

| Azure object type | Upload limit |
| --- | --- |
| Block Blob | 4.75 TB |
| Page Blob | 1 TB <br> Every file uploaded in Page Blob format must be 512 bytes aligned (an integral multiple), else the upload fails. <br> The VHD and VHDX are 512 bytes aligned. |
| Azure Files | 1 TB <br> Every file uploaded in Page Blob format must be 512 bytes aligned (an integral multiple), else the upload fails. <br> The VHD and VHDX are 512 bytes aligned. |

> **Important:**
> Creation of files (irrespective of the storage type) is allowed up to 5 TB. However, if you create a file whose size is greater than the upload limit defined in the preceding table, the file does not get uploaded. You have to manually delete the file to reclaim the space.


## Next steps

- [Prepare to deploy Azure Stack Edge Pro R](azure-stack-edge-pro-r-deploy-prep.md)
