---
title: Use logs to troubleshoot imports and exports via Azure Import/Export | Microsoft Docs
description: Learn how to review error/copy logs from imports and exports for data copy, upload issues.
author: v-dalc
services: storage
ms.service: azure-import-export
ms.topic: how-to
ms.date: 03/14/2022
ms.author: shaas

# Customer intent: "As a data engineer, I want to review error and copy logs for import/export jobs, so that I can troubleshoot data transfer issues and ensure successful completion of my data migration tasks."
---

# Use logs to troubleshoot imports and exports via Azure Import/Export

When the Microsoft Azure Import/Export service processes the drives for an import or export job, the service writes copy logs and verbose logs to the storage account that you used. Both logs are saved for each drive.


* The *copy log* reports events for all failed copy operations between the disk and the Azure Storage account. The copy log ends with a summary of errors by error category.

* The *verbose log* has a listing of all copy operations that succeeded on every blob and file.


## Locate the logs

When you use the Import/Export service to create an import or export job in Azure Data Box, you'll view the Import/Export job along with your other **Data Box** resources.

Use the following steps to find out the status of the data copies for an Import/Export job:


1. Sign in to the [Azure portal](https://portal.azure.com/).

2. Search for **azure data box**.

    Screenshot showing how to search for Data Box jobs in the Azure portal. The Search box and selected Azure Data Box service are highlighted.

 3. To filter to Azure Import/Export jobs, enter "Import/Export" in the search box.

    Screenshot showing how to filter Data Box resources in the Azure portal to show Import/Export jobs. The Search box is highlighted.

    A list of Import/Export jobs appears on the page. 

    [ Screenshot of Data Box resources in the Azure portal filtered to Import Export jobs. The job name, transfer type, status, and model are highlighted. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-view-jobs-and-drives/jobs-list.png#lightbox)

4. View job details by selecting a job name.

   The selected job's **Current order status** and **Data copy details** are displayed for each drive.

   * If you have access to the storage account, you can select a **Copy log path** or **Verbose log path** to view the log.

   * Select a **Drive ID** to open a panel with full copy information, including the manifest file and hash.

   [ Screenshot of the Overview for an Import Export job in the Azure portal. The Order Status, and the Data Copy Status and Log URLs for a drive, are highlighted. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-view-jobs-and-drives/job-details.png#lightbox)


A copy log is saved automatically. If you chose to save verbose logs when you placed your order, you'll also see the path to the verbose log.

The logs are uploaded to a container (for blob imports and exports) or share (for imports to Azure Files) in the storage account. The container is named `databoxcopylog`. The URLs have these formats:

| Log type | URL format |
| --- | --- |
| copy log | <*storage-account-name*>/databoxcopylog/<*order-name*>_<*device-serial-number*>&#95;CopyLog&#95;<*job-ID*>.xml |
| verbose log | <*storage-account-name*>/databoxcopylog/<*order-name*>_<*device-serial-number*>&#95;VerboseLog&#95;<*job-ID*>.xml |

For export jobs, a manifest file also is saved to the disk.

Each data transfer for a disk generates a copy log. If you chose to save a verbose log when you created the order, there’s also a verbose log in the same folder.

> **Note:**
> For your earlier orders, you might find an error log (_error.xml) along with the verbose log in a `waies` container in the storage account. The `DriveLog Version`, shown in the error log summary, will be `2018-10-01`. The log formats differ from those described in this article.

## Review import logs

During an import, the Import/Export service generates a verbose log and a copy log for each disk.

### Verbose log

The verbose log is an optional file that you can enable during ordering. It's a simple listing of all files that were successfully imported from the drive. The verbose log gives the following information for each file. The verbose log doesn’t provide summary information.

| Field | Description |
| --- | --- |
| CloudFormat | BlockBlob, PageBlob, or AzureFile. |
| Path | Path to the file within the storage account. |
| Size | File or blob size. |
| crc64 | The cyclic redundancy check 64 (CRC64) checksum that was used to verify data integrity during data transfer. |

#### Sample verbose log: import


The following sample verbose log has sample file entries for block blob, page blob, and Azure File imports.

```xml
<File CloudFormat="BlockBlob" Path="$root\file26fd6b4bd-25f7-4019-8d0d-baa7355745df.vhd" Size="1024" crc64="14179624636173788226">
</File><File CloudFormat="BlockBlob" Path="$root\file49d220295-9cfd-469e-b69e-5c7c885133df.vhd" Size="1024" crc64="14179624636173788226">
</File>
----------CUT--------------------
<File CloudFormat="AzureFile" Path="e579954d-1f94-40cf-955f-afd39e9ca217\file1876f73ad-6213-43bc-9467-67fe0c794e99.block" Size="1024" crc64="1410470866535975213">
</File><File CloudFormat="AzureFile" Path="05407abe-81c8-4b44-b846-3a2c8c198316\file28d7868be-e6a7-4441-8d09-2b127f7d049e.vhd" Size="1024" crc64="1410470866535975213">
</File><File CloudFormat="AzureFile" Path="eb7666a7-c026-4375-9c08-3dea37a57713\file4448aeaf5-53dc-4bff-b798-4776e367ab5e.vhd" Size="1024" crc64="1410470866535975213">
</File>
----------CUT--------------------
<File CloudFormat="PageBlob" Path="tesdir8b1d0acd-2d37-46dd-96cf-edeb0f772e6b\file1.txt" Size="83886080" crc64="1680234237456714851">
</File><File CloudFormat="PageBlob" Path="tesdirf631630d-8098-4c84-be7b-40f6bbdb73fb\file_size0.txt" Size="0" crc64="0">
</File><File CloudFormat="PageBlob" Path="tesdirf631630d-8098-4c84-be7b-40f6bbdb73fb\Dir1/file_size0.txt" Size="0" crc64="0">
</File>
```



### Copy log

The copy log contains an error entry for each file that failed to import or export, with error detail. The copy log ends with a summary of validation and copy errors that occurred during the data transfer.

Each error entry contains the following information.

| Field | Description |
| --- | --- |
| Path | The destination share within the container or file share. |
| Category | Identifies the error category. For more information, see [Data transfer errors](#data-transfer-errors). |
| ErrorCode | The numeric code for the error. |
| ErrorMessage | Describes the error. |

The summary at the end of the log (look for `CopyLog Summary`) gives the following information:

*	Drive log version (in this case, `2021-08-01`)
*	Drive ID
*	Data copy status
*	Summary of validation errors by error category
*	Summary of copy errors by error category

#### Sample copy log: import


The following sample is a copy log for an import to both Azure Files and Azure Blob storage.

This copy failed, with no validation errors but with three copy errors. One file share was renamed (`ShareRenamed` error), and two containers were renamed (`ContainerRenamed` error). The error entry gives the original and new file names.

```xml
<ErroredEntity Path="New Folder">
  <Category>ShareRenamed</Category>
  <ErrorCode>1</ErrorCode>
  <ErrorMessage>The original container/share/Blob has been renamed to: DataBox-f55763d4-8ef7-458f-b029-f36b51ada34f :from: New Folder :because either name has invalid character(s) or length is not supported</ErrorMessage>
  <Type>Container</Type>
</ErroredEntity>
<ErroredEntity Path="CV">
  <Category>ContainerRenamed</Category>
  <ErrorCode>1</ErrorCode>
  <ErrorMessage>The original container/share/Blob has been renamed to: DataBox-6bcae46f-04c8-4385-8442-3a28b962c930 :from: CV :because either name has invalid character(s) or length is not supported</ErrorMessage>
  <Type>Container</Type>
</ErroredEntity><ErroredEntity Path="New_ShareFolder">
  <Category>ContainerRenamed</Category>
  <ErrorCode>1</ErrorCode>
  <ErrorMessage>The original container/share/Blob has been renamed to: DataBox-96d8e2ee-ffd4-4529-9ec0-f666674b70d9 :from: New_ShareFolder :because either name has invalid character(s) or length is not supported</ErrorMessage>
  <Type>Container</Type>
</ErroredEntity>
<CopyLog Summary="Summary">
  <DriveLogVersion>2021-08-01</DriveLogVersion>
  <DriveId>72a1914a-7fb2-4e34-a135-5c7176c3ee41</DriveId>
  <Status>Failed</Status>
  <TotalFiles_Blobs>60</TotalFiles_Blobs>
  <FilesErrored>0</FilesErrored>
  <Summary>
    <ValidationErrors>
      <None Count="3" />
    </ValidationErrors>
    <CopyErrors>
      <ShareRenamed Count="1" Description="Renamed the share as the original share name does not follow Azure conventions." />
      <ContainerRenamed Count="2" Description="Renamed the container as the original container name does not follow Azure conventions." />
    </CopyErrors>
  </Summary>
</CopyLog>
```



## Review export logs

During an export, the Import/Export service generates a verbose log and a copy log for each data transfer from Azure Storage to a disk. There's also a manifest file, which is saved to the disk.

### Verbose log

The verbose log for an export is a simple listing of all files that were successfully exported from the Azure storage account to the drive. The verbose log gives the following information for each file. The verbose log doesn’t provide summary information.

| Field | Description |
| --- | --- |
| CloudFormat | BlockBlob, PageBlob, or AzureFile. |
| Etag | The entity tag (ETag) for the resource, which is used for concurrency checking during the data transfer. |
| Path | Path to the file within the storage account. |
| Size | File or blob size. |
| crc64 | The cyclic redundancy check 64 (CRC64) checksum that was computed while exporting data to disk. |


#### Sample verbose log: export

In the following sample verbose log, the export job successfully transferred three blobs from Azure Blob storage.

```xml
<File CloudFormat="BlockBlob" ETag="0x8D804D87F976907" Path="export-blobs/movie/sc%3Aifi/block.blob" Size="4096" crc64="16033727819182370206">
</File><File CloudFormat="BlockBlob" ETag="0x8D804D889880CC6" Path="export-blobs/movie/sc#Aifi/block.blob" Size="4096" crc64="16033727819182370206">
</File><File CloudFormat="BlockBlob" ETag="0x8D804D8F1BC81C0" Path="export-blobs/@GMT-2001.03.30-14.44.00/block.blob" Size="4096" crc64="16033727819182370206">
</File>
```

### Copy log

The copy log for an export contains an error entry for each file that failed to transfer successfully from Azure Storage to the disk, with error detail. The copy log ends with a summary of validation and copy errors that occurred during the data transfer.

The copy log for an export reports issues such as a data transfer that fail because of a damaged drive or a storage account key that changed during data transfer. For a list of issues, see [Data transfer errors](#data-transfer-errors).

#### Sample copy log: export

The following sample is a copy log for an export that came across three file system errors ( `UploadErrorWin32`) that caused the export of three files to fail. Error **267** indicates the directory name is invalid. Error **123** indicates an incorrect filename, directory name, or volume label syntax.

```xml
<ErroredEntity CloudFormat="BlockBlob" Path="export-ut-invaliddirblobpath/movie/sc:Aifi/block.blob">
  <Category>UploadErrorWin32</Category>
  <ETag>0x8D804D8840B92C9</ETag>
  <ErrorCode>267</ErrorCode>
  <ErrorMessage>File Create failed</ErrorMessage>
  <Type>File</Type>
</ErroredEntity><ErroredEntity CloudFormat="BlockBlob" Path="export-ut-invaliddirblobpath/movie/sc-Aifi/block.blob">
  <Category>UploadErrorWin32</Category>
  <ETag>0x8D804D8AD026B2A</ETag>
  <ErrorCode>123</ErrorCode>
  <ErrorMessage>File Create failed</ErrorMessage>
  <Type>File</Type>
</ErroredEntity><ErroredEntity CloudFormat="BlockBlob" Path="export-ut-invaliddirblobpath/movie/sc*Aifi/block.blob">
  <Category>UploadErrorWin32</Category>
  <ETag>0x8D804D8A858F705</ETag>
  <ErrorCode>123</ErrorCode>
  <ErrorMessage>File Create failed</ErrorMessage>
  <Type>File</Type>
</ErroredEntity><CopyLog Summary="Summary">
  <DriveLogVersion>2021-08-01</DriveLogVersion>
  <DriveId>cb57dbe8-0b67-45e0-ad40-a08fb5305c60</DriveId>
  <Status>Failed</Status>
  <TotalFiles_Blobs>9</TotalFiles_Blobs>
  <FilesErrored>6</FilesErrored>
  <Summary>
    <ValidationErrors>
      <None Count="3" />
    </ValidationErrors>
    <CopyErrors>
      <UploadErrorWin32 Count="3" Description="File Create failed because of UploadErrorWin32 exception" />
    </CopyErrors>
  </Summary>
</CopyLog>
```


## Data transfer errors

You'll find the following errors in the copy logs for import jobs and/or export jobs.

| Error category | Error message | Imports | Exports |
| --- | --- | --- | --- |
| `UploadErrorWin32` | File system error. | Yes | Yes |
| `UploadErrorCloudHttp` | Unsupported blob type. For more information about errors in this category, see [Summary of upload errors](../databox/data-box-troubleshoot-data-upload.md#summary-of-upload-errors). | Yes | Yes |
| `UploadErrorDataValidationError` | CRC computed during data ingestion doesn’t match the CRC computed during upload. | Yes | Yes |
| `UploadErrorManagedConversionError` | The size of the blob being imported is invalid. The blob size is <*blob-size*> bytes. Supported sizes are between 20971520 Bytes and 8192 GiB. For more information, see [Summary of upload errors](../databox/data-box-troubleshoot-data-upload.md#summary-of-upload-errors). | Yes | Yes |
| `UploadErrorUnknownType` | Unknown error. | Yes | Yes |
| `ContainerRenamed` | Renamed the container because the original container name doesn't follow [Azure naming conventions](../databox/data-box-disk-limits.md#azure-block-blob-page-blob-and-file-naming-conventions). The original container has been renamed to DataBox-<*GUID*> from <*original container name*>. | No | Yes |
| `ShareRenamed` | Renamed the share because the original share name doesn't follow [Azure naming conventions](../databox/data-box-disk-limits.md#azure-block-blob-page-blob-and-file-naming-conventions). The original share has been renamed to DataBox-<*GUID*> from <*original folder name*>. | No | Yes |
| `BlobRenamed` | Renamed the blob because the original blob name doesn't follow [Azure naming conventions](../databox/data-box-disk-limits.md#azure-block-blob-page-blob-and-file-naming-conventions). The original blob has been renamed to BlockBlob/DataBox-<*GUID*> from <*original name*>. | No | Yes |
| `FileRenamed` | Renamed the file because the original file name doesn't follow [Azure naming conventions](../databox/data-box-disk-limits.md#azure-block-blob-page-blob-and-file-naming-conventions). The original file has been renamed to AzureFile/DataBox-<*GUID*> from <*original name*>. | No | Yes |
| `DiskRenamed` | Renamed the managed disk file because the original file name doesn't follow [Azure naming conventions for managed disks](../databox/data-box-disk-limits.md#managed-disk-naming-conventions). The original managed disk file was renamed to ManagedDisk/DataBox-<*GUID*> from <*original name*>. | No | Yes |
| `FileNameTrailsWithSlash` | Blob name or file name ends with a trailing slash. A blob name or file name that ends with a trailing backslash or forward slash can't be exported to disk. | No | Yes |
| `ExportCloudHttp` | Unsupported blob type. | No | Yes |


## Next steps

- [Review hard drive preparation steps for an import job](storage-import-export-data-to-blobs.md#step-1-prepare-the-drives).
- [Contact Microsoft Support](storage-import-export-contact-microsoft-support.md).
