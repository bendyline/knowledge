---
title: Tutorial to import data to Azure Blob Storage with Azure Import/Export service | Microsoft Docs
description: Learn how to create import and export jobs in Azure portal to transfer data to and from Azure Blobs.
author: stevenmatthew
services: storage
ms.service: azure-import-export
ms.topic: tutorial
ms.date: 02/01/2023
ms.author: shaas
ms.custom: tutorial, devx-track-azurepowershell, devx-track-azurecli
# Customer intent: "As a data engineer, I want to securely import large data sets to Azure Blob storage using encrypted drives, so that I can manage data transfers efficiently and maintain data integrity throughout the process."
---
# Tutorial: Import data to Blob Storage with Azure Import/Export service

This article provides step-by-step instructions on how to use the Azure Import/Export service to securely import large amounts of data to Azure Blob storage. To import data into Azure Blobs, the service requires you to ship encrypted disk drives containing your data to an Azure datacenter.

In this tutorial, you learn how to:

> 
> * Prerequisites to import data to Azure Blob storage
> * Step 1: Prepare the drives
> * Step 2: Create an import job
> * Step 3: Configure customer managed key (Optional)
> * Step 4: Ship the drives
> * Step 5: Update job with tracking information
> * Step 6: Verify data upload to Azure

## Prerequisites

Before you create an import job to transfer data into Azure Blob Storage, carefully review and complete the following list of prerequisites for this service.
You must:

* Have an active Azure subscription that can be used for the Import/Export service.
* Have at least one Azure Storage account with a storage container. See the list of [Supported storage accounts and storage types for Import/Export service](storage-import-export-requirements.md).
  * For information on creating a new storage account, see [How to Create a Storage Account](../storage/common/storage-account-create.md).
  * For information on creating storage containers, go to [Create a storage container](../storage/blobs/storage-quickstart-blobs-portal.md#create-a-container).
* Have adequate number of disks of [supported types](storage-import-export-requirements.md#supported-disks).
* Have a Windows system running a [supported OS version](storage-import-export-requirements.md#supported-operating-systems).
* Enable BitLocker on the Windows system. See [How to enable BitLocker](https://thesolving.com/storage/how-to-enable-bitlocker-on-windows-server-2012-r2/).
* Download the current release of the Azure Import/Export version 1 tool, for blobs, on the Windows system:
  1. [Download WAImportExport version 1](https://www.microsoft.com/download/details.aspx?id=42659). The current version is 1.5.0.300.
  1. Unzip to the default folder `WaImportExportV1`. For example, `C:\WaImportExportV1`.
- 
Have a valid carrier account and a tracking number for the order:
- You must use a carrier in the **Carrier names** list on the **Shipping** tab for your order. If you don't have a carrier account, contact the carrier to create one.
- The carrier account must be valid, should have a balance, and must have return shipping capabilities. Microsoft uses the selected carrier to return all storage media. <!--If I remove "back," same prerequisites can be shared with imports and exports. May not even need to do that.-->
- Generate a tracking number for the import/export job in the carrier account. Every job should have a separate tracking number. Multiple jobs with the same tracking number aren't supported.



## Step 1: Prepare the drives

This step generates a journal file. The journal file stores basic information such as drive serial number, encryption key, and storage account details.

Perform the following steps to prepare the drives.

1. Connect your disk drives to the Windows system via SATA connectors.
2. Create a single NTFS volume on each drive. Assign a drive letter to the volume. Don't use mountpoints.
3. Enable BitLocker encryption on the NTFS volume. If using a Windows Server system, use the instructions in [How to enable BitLocker on Windows Server 2012 R2](https://thesolving.com/storage/how-to-enable-bitlocker-on-windows-server-2012-r2/).
4. Copy data to encrypted volume. Use drag and drop or Robocopy or any such copy tool. A journal (*.jrn*) file is created in the same folder where you run the tool.

   If the drive is locked and you need to unlock the drive, the steps to unlock may be different depending on your use case.

   * If you have added data to a pre-encrypted drive (WAImportExport tool wasn't used for encryption), use the BitLocker key (a numerical password that you specify) in the popup to unlock the drive.

   * If you have added data to a drive that was encrypted by WAImportExport tool, use the following command to unlock the drive:

        `WAImportExport Unlock /bk:<BitLocker key (base 64 string) copied from journal (*.jrn*) file>`

5. Open a PowerShell or command-line window with administrative privileges. To change directory to the unzipped folder, run the following command:

    `cd C:\WaImportExportV1`
6. To get the BitLocker key of the drive, run the following command:

    `manage-bde -protectors -get <DriveLetter>:`
7. To prepare the disk, run the following command. **Depending on the data size, disk preparation may take several hours to days.**

    ```powershell
    ./WAImportExport.exe PrepImport /j:<journal file name> /id:session<session number> /t:<Drive letter> /bk:<BitLocker key> /srcdir:<Drive letter>:\ /dstdir:<Container name>/ /blobtype:<BlockBlob or PageBlob> /skipwrite
    ```
    
    A journal file is created in the same folder where you ran the tool. Two other files are also created - an *.xml* file (folder where you run the tool) and a *drive-manifest.xml* file (folder where data resides).

    The parameters used are described in the following table:

    | Option | Description |
    | --- | --- |
    | /j: | The name of the journal file, with the .jrn extension. A journal file is generated per drive. We recommend that you use the disk serial number as the journal file name. |
    | /id: | The session ID. Use a unique session number for each instance of the command. |
    | /t: | The drive letter of the disk to be shipped. For example, drive `D`. |
    | /bk: | The BitLocker key for the drive. Its numerical password from output of `manage-bde -protectors -get D:` |
    | /srcdir: | The drive letter of the disk to be shipped followed by `:\`. For example, `D:\`. |
    | /dstdir: | The name of the destination container in Azure Storage. |
    | /blobtype: | This option specifies the type of blobs you want to import the data to. For block blobs, the blob type is `BlockBlob` and for page blobs, it's `PageBlob`. |
    | /skipwrite: | Specifies that there's no new data required to be copied and existing data on the disk is to be prepared. |
    | /enablecontentmd5: | The option when enabled, ensures that MD5 is computed and set as `Content-md5` property on each blob. Use this option only if you want to use the `Content-md5` field after the data is uploaded to Azure. <br> This option doesn't affect the data integrity check (that occurs by default). The setting does increase the time taken to upload data to cloud. |

    > **Note:**
    > - If you import a blob with the same name as an existing blob in the destination container, the imported blob will overwrite the existing blob. In earlier tool versions (before 1.5.0.300), the imported blob was renamed by default, and a \Disposition parameter let you specify whether to rename, overwrite, or disregard the blob in the import.
    > - If you don't have long paths enabled on the client, and any path and file name in your data copy exceeds 256 characters, the WAImportExport tool will report failures. To avoid this kind of failure, [enable long paths on your Windows client](https://learn.microsoft.com/windows/win32/fileio/maximum-file-path-limitation?tabs=cmd#enable-long-paths-in-windows-10-version-1607-and-later).

8. Repeat the previous step for each disk that needs to be shipped. 

   A journal file with the provided name is created for every run of the command line. 

   Together with the journal file, a `<Journal file name>_DriveInfo_<Drive serial ID>.xml` file is also created in the same folder where the tool resides. The .xml file is used in place of the journal file when creating a job if the journal file is too large.

> **Important:**
> * Do not modify the journal files or the data on the disk drives, and don't reformat any disks, after completing disk preparation.
> * The maximum size of the journal file that the portal allows is 2 MB. If the journal file exceeds that limit, an error is returned.


## Step 2: Create an import job

# [Portal](#tab/azure-portal-preview)


Do the following steps to order an import job in Azure Import/Export job via the portal.

1. Use your Microsoft Azure credentials to sign in at this URL: [https://portal.azure.com](https://portal.azure.com).
1. Select **+ Create a resource**, and search for *Azure Data Box*. Select **Azure Data Box**.

   Illustration showing the Plus Create A Resource button, and the text box for selecting the service to create the resource in. Azure Data Box is highlighted.

1. Select **Create**.  

   Screenshot of the top of the Azure portal screen after selecting Azure Data Box. The Create button is highlighted.

1. To get started with the import order, select the following options:
 
    1. Select the **Import to Azure** transfer type.
    1. Select the subscription to use for the Import/Export job.
    1. Select a resource group.
    1. Select the **Source country/region** for the job.
    1. Select the **Destination Azure region** for the job.
    1. Then select **Apply**.

    [ Screenshot showing the Get Started options for a new Data Box order. The Import To Azure transfer type and the Apply button are highlighted. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-preview-import-steps/import-export-order-preview-03.png#lightbox)

1. Choose the **Select** button for **Import/Export Job**.

    Screenshot showing product options for a new Data Box order. The Select button for Import Export Job is highlighted.

1. In **Basics**:

    - Enter a descriptive name for the job. Use the name to track the progress of your jobs.
      * The name must have from 3 to 24 characters.
      * The name must include only letters, numbers, and hyphens.
      * The name must start and end with a letter or number.

    Screenshot showing the Basics tab for an import job in Azure Data Box. The Basics tab, the Import Job Name text box, and the Next: Job Details button are highlighted.

    Select **Next: Job Details >** to proceed.

1. In **Job Details**:

   1. Before you go further, make sure you're using the latest WAImportExport tool. The tool is used to read the journal file(s) that you upload. You can use the download link to update the tool.
   
      Screenshot showing the link to download the latest WAImportExport tool in Job Details for an Azure Import/Export import job. The tool link is highlighted.

   1. Change the destination Azure region for the job if needed.
   1. Select one or more storage accounts to use for the job. You can create a new storage account if needed.
   1. Under **Drive information**, use the **Copy** button to upload each journal file that you created during the preceding [Step 1: Prepare the drives](#step-1-prepare-the-drives). When you upload a journal file, the Drive ID is displayed.
      - If `waimportexport.exe version1` was used, upload one file for each drive that you prepared. 
      - If the journal file is larger than 2 MB, then you can use the `<Journal file name>_DriveInfo_<Drive serial ID>.xml`, which was created along with the journal file.

        Screenshot showing Drive Information on the Job Details tab for an Azure Import Export job. The Copy button and the Drive ID for an uploaded journal file are highlighted.

    Screenshot of completed Job Details tab for an import job in Azure Data Box. The Job Detail tab and Next: Return Shipping button are highlighted.

1. In **Return shipping**:

   1. Select a shipping carrier from the drop-down list for **Carrier**. The location of the Microsoft datacenter for the selected region determines which carriers are available.
   1. Enter a **Carrier account number**. The account number for a valid carrier account is required.
   1. In the **Return address** area, select the **+ Add Address** button, and add the address to ship to.

      Screenshot of the Return Shipping tab for an import job in Azure Data Box. The Return Shipping tab and the Plus Add Address button are highlighted.

      On the **Add Address** blade, you can add an address or use an existing one. When you complete the address fields, select **Add shipping address**.

      Screenshot showing an address on the Add Address blade for an import job in Azure Data Box. The Add Shipping Address button is highlighted.

   1. In the **Notification** area, enter email addresses for the people you want to notify of the job's progress.
   
      > **Tip:**
      > Instead of specifying an email address for a single user, provide a group email to ensure that you receive notifications even if an admin leaves.

   Screenshot of the Return Shipping tab for an import job in Azure Data Box with all fields filled in. The Return Shipping tab and the Review Plus Create button are highlighted.

   Select **Review + Create** to proceed.

1. In **Review + Create**:

   1. Review the **Terms** and **Privacy** information, and then select the checkbox by "I acknowledge that all the information provided is correct and agree to the terms and conditions." Validation is then done.
   1. Review the job information. Make a note of the job name and the Azure datacenter shipping address to ship disks back to. This information is used later on the shipping label.
   1. Select **Create**.

   Screenshot showing the Review Plus Create tab for an Azure Import/Export job. The validation status, Terms, and Create button are highlighted.

1. After the job is created, you'll see the following message.

    Screenshot of the status message for a completed order for an Azure Import Export job. The status and the Go To Resource button are highlighted.

     You can select **Go to resource** to open the **Overview** of the job.

     [ Screenshot showing the Overview pane for an Azure Import Export job in Created state. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-preview-import-steps/import-export-order-preview-12.png#lightbox)



# [Azure CLI](#tab/azure-cli)

Use the following steps to create an import job in the Azure CLI.

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-h3.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/storage-import-export-data-to-blobs.md)

### Create a job

1. Use the [az extension add](https://learn.microsoft.com/cli/azure/extension#az-extension-add) command to add the [az import-export](https://learn.microsoft.com/cli/azure/import-export) extension:

    ```azurecli
    az extension add --name import-export
    ```

1. You can use an existing resource group or create one. To create a resource group, run the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command:

    ```azurecli
    az group create --name myierg --location "West US"
    ```

1. You can use an existing storage account or create one. To create a storage account, run the [az storage account create](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-create) command:

    ```azurecli
    az storage account create --resource-group myierg --name myssdocsstorage --https-only
    ```

1. To get a list of the locations to which you can ship disks, use the [az import-export location list](https://learn.microsoft.com/cli/azure/import-export/location#az-import-export-location-list) command:

    ```azurecli
    az import-export location list
    ```

1. Use the [az import-export location show](https://learn.microsoft.com/cli/azure/import-export/location#az-import-export-location-show) command to get locations for your region:

    ```azurecli
    az import-export location show --location "West US"
    ```

1. Run the following [az import-export create](https://learn.microsoft.com/cli/azure/import-export#az-import-export-create) command to create an import job:

    ```azurecli
    az import-export create \
        --resource-group myierg \
        --name MyIEjob1 \
        --location "West US" \
        --backup-drive-manifest true \
        --diagnostics-path waimportexport \
        --drive-list bit-locker-key=439675-460165-128202-905124-487224-524332-851649-442187 \
            drive-header-hash= drive-id=AZ31BGB1 manifest-file=\\DriveManifest.xml \
            manifest-hash=69512026C1E8D4401816A2E5B8D7420D \
        --type Import \
        --log-level Verbose \
        --shipping-information recipient-name="Microsoft Azure Import/Export Service" \
            street-address1="3020 Coronado" city="Santa Clara" state-or-province=CA postal-code=98054 \
            country-or-region=USA phone=4083527600 \
        --return-address recipient-name="Gus Poland" street-address1="1020 Enterprise way" \
            city=Sunnyvale country-or-region=USA state-or-province=CA postal-code=94089 \
            email=gus@contoso.com phone=4085555555" \
        --return-shipping carrier-name=FedEx carrier-account-number=123456789 \
        --storage-account myssdocsstorage
    ```

   > **Tip:**
   > Instead of specifying an email address for a single user, provide a group email. This ensures that you receive notifications even if an admin leaves.

1. Use the [az import-export list](https://learn.microsoft.com/cli/azure/import-export#az-import-export-list) command to see all the jobs for the myierg resource group:

    ```azurecli
    az import-export list --resource-group myierg
    ```

1. To update your job or cancel your job, run the [az import-export update](https://learn.microsoft.com/cli/azure/import-export#az-import-export-update) command:

    ```azurecli
    az import-export update --resource-group myierg --name MyIEjob1 --cancel-requested true
    ```


# [Azure PowerShell](#tab/azure-powershell)

Use the following steps to create an import job in Azure PowerShell.


### Prerequisites

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-powershell-requirements-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/storage-import-export-data-to-blobs.md)


> **Important:**
> While the **Az.ImportExport** PowerShell module is in preview, you must install it separately
> using the `Install-Module` cmdlet. After this PowerShell module becomes generally available, it
> will be part of future Az PowerShell module releases and available by default from within Azure
> Cloud Shell.

```azurepowershell-interactive
Install-Module -Name Az.ImportExport
```

### Create a job

1. You can use an existing resource group or create one. To create a resource group, run the [New-AzResourceGroup](https://learn.microsoft.com/powershell/module/az.resources/new-azresourcegroup) cmdlet:

   ```azurepowershell-interactive
   New-AzResourceGroup -Name myierg -Location westus
   ```

1. You can use an existing storage account or create one. To create a storage account, run the [New-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/new-azstorageaccount) cmdlet:

   ```azurepowershell-interactive
   New-AzStorageAccount -ResourceGroupName myierg -AccountName myssdocsstorage -SkuName Standard_RAGRS -Location westus -EnableHttpsTrafficOnly $true
   ```

1. To get a list of the locations to which you can ship disks, use the [Get-AzImportExportLocation](https://learn.microsoft.com/powershell/module/az.importexport/get-azimportexportlocation) cmdlet:

   ```azurepowershell-interactive
   Get-AzImportExportLocation
   ```

1. Use the `Get-AzImportExportLocation` cmdlet with the `Name` parameter to get locations for your region:

   ```azurepowershell-interactive
   Get-AzImportExportLocation -Name westus
   ```

1. Run the following [New-AzImportExport](https://learn.microsoft.com/powershell/module/az.importexport/new-azimportexport) example to create an import job:

   ```azurepowershell-interactive
   $driveList = @(@{
     DriveId = '9CA995BA'
     BitLockerKey = '439675-460165-128202-905124-487224-524332-851649-442187'
     ManifestFile = '\\DriveManifest.xml'
     ManifestHash = '69512026C1E8D4401816A2E5B8D7420D'
     DriveHeaderHash = 'AZ31BGB1'
   })

   $Params = @{
      ResourceGroupName = 'myierg'
      Name = 'MyIEjob1'
      Location = 'westus'
      BackupDriveManifest = $true
      DiagnosticsPath = 'waimportexport'
      DriveList = $driveList
      JobType = 'Import'
      LogLevel = 'Verbose'
      ShippingInformationRecipientName = 'Microsoft Azure Import/Export Service'
      ShippingInformationStreetAddress1 = '3020 Coronado'
      ShippingInformationCity = 'Santa Clara'
      ShippingInformationStateOrProvince = 'CA'
      ShippingInformationPostalCode = '98054'
      ShippingInformationCountryOrRegion = 'USA'
      ShippingInformationPhone = '4083527600'
      ReturnAddressRecipientName = 'Gus Poland'
      ReturnAddressStreetAddress1 = '1020 Enterprise way'
      ReturnAddressCity = 'Sunnyvale'
      ReturnAddressStateOrProvince = 'CA'
      ReturnAddressPostalCode = '94089'
      ReturnAddressCountryOrRegion = 'USA'
      ReturnAddressPhone = '4085555555'
      ReturnAddressEmail = 'gus@contoso.com'
      ReturnShippingCarrierName = 'FedEx'
      ReturnShippingCarrierAccountNumber = '123456789'
      StorageAccountId = '/subscriptions/<SubscriptionId>/resourceGroups/myierg/providers/Microsoft.Storage/storageAccounts/myssdocsstorage'
   }
   New-AzImportExport @Params
   ```

   > **Tip:**
   > Instead of specifying an email address for a single user, provide a group email. This ensures that you receive notifications even if an admin leaves.

1. Use the [Get-AzImportExport](https://learn.microsoft.com/powershell/module/az.importexport/get-azimportexport) cmdlet to see all the jobs for the myierg resource group:

   ```azurepowershell-interactive
   Get-AzImportExport -ResourceGroupName myierg
   ```

1. To update your job or cancel your job, run the [Update-AzImportExport](https://learn.microsoft.com/powershell/module/az.importexport/update-azimportexport) cmdlet:

   ```azurepowershell-interactive
   Update-AzImportExport -Name MyIEjob1 -ResourceGroupName myierg -CancelRequested
   ```

---

## Step 3 (Optional): Configure customer managed key

Skip this step and go to the next step if you want to use the Microsoft managed key to protect your BitLocker keys for the drives. To configure your own key to protect the BitLocker key, follow the instructions in [Configure customer-managed keys with Azure Key Vault for Azure Import/Export in the Azure portal](storage-import-export-encryption-key-portal.md).

## Step 4: Ship the drives


FedEx, UPS, or DHL can be used to ship the package to Azure datacenter. If you want to use a carrier other than FedEx/DHL, contact Azure Data Box Operations team at `adbops@microsoft.com`

* Provide a valid FedEx, UPS, or DHL carrier account number for use by Microsoft to return the drives.
  * A FedEx, UPS, or DHL account number is required for shipping drives back from the US and Europe locations.
    * A DHL account number is preferred for shipping drives back from Asia and Australia locations.
    * If you don't have an account number, create a [FedEx](https://www.fedex.com/us/oadr/) or [DHL](http://www.dhl.com/) carrier account.
* When shipping your packages, you must follow the [Microsoft Azure Service Terms](https://azure.microsoft.com/support/legal/services-terms/).
* Properly package your disks to avoid potential damage and delays in processing. Follow these recommended best practices:
    * Wrap the disk drives securely with protective bubble wrap. Bubble wrap acts as a shock absorber and protects the drive from impact during transit. Before shipping, ensure that the entire drive is thoroughly covered and cushioned.
    * Place the wrapped drives within a foam shipper. The foam shipper provides extra protection and keeps the drive securely in place during transit.


## Step 5: Update the job with tracking information


After you ship the disks, return to the job in the Azure portal and fill in the tracking information.

After you provide tracking details, the job status changes to Shipping, and the job can't be canceled. You can only cancel a job while it's in Creating state.

> **Important:**
> If the tracking number is not updated within 2 weeks of creating the job, the job expires. 

### [Portal](#tab/azure-portal-preview)

To complete the tracking information for a job that you created in the portal, do these steps:
 
1. Open the job in the [Azure portal/](https://portal.azure.com/).
1. On the **Overview** pane, scroll down to **Tracking information** and complete the entries: 
    1. Provide the **Carrier** and **Tracking number**.
    1. Make sure the **Ship to address** is correct.
    1. Select the checkbox by "Drives have been shipped to the above mentioned address."
    1. When you finish, select **Update**.

    [ Screenshot of tracking information on the Overview pane for an Azure Import Export job in Completed state as it appears in the Preview portal. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-update-job-tracking/import-export-order-tracking-info-01-expanded.png#lightbox)

You can track the job progress on the **Overview** pane. For a description of each job state, go to [View your job status](storage-import-export-view-drive-status.md).

Screenshot showing status tracking on the Overview pane for an Azure Import Export job in the Preview portal.


### [Azure CLI](#tab/azure-cli)

If you created your Azure Import/Export job using Azure CLI, open the job in the Azure portal to update tracking information. Azure CLI and Azure PowerShell create jobs in the classic Azure Import/Export service and hence create an Azure resource of the type "Import/Export job."

### [Azure PowerShell](#tab/azure-powershell)

If you created your Azure Import/Export job using Azure PowerShell, open the job in the Azure portal to update tracking information. 
Azure CLI and Azure PowerShell create jobs in the classic Azure Import/Export service and hence create an Azure resource of the type "Import/Export job."

---



## Step 6: Verify data upload to Azure


Track the job to completion, then verify that the upload was successful and all data is present. 

Review the **Data copy details** of the completed job to locate the logs for each drive included in the job:

- Use the *verbose log* to verify each successfully transferred file.
- Use the *copy log* to find the source of each failed data copy.

[ Screenshot showing a completed import job in Azure Import Export. In Data Copy Details, the Copy Log Path and Verbose Log Path are highlighted. ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-import-export-verify-data-copy/completed-import-order.png#lightbox)

For more information, see [Review copy logs from imports and exports](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/storage-import-export-tool-reviewing-job-status-v1.md).

After you verify the data transfers, you can delete your on-premises data. Delete your on-premises data only after you verify that the upload was successful.


> **Note:**
> If any path and file name exceeds 256 characters, and long paths aren't enabled on the client, the data upload will fail. To avoid this kind of failure, [enable long paths on your Windows client](https://learn.microsoft.com/windows/win32/fileio/maximum-file-path-limitation?tabs=cmd#enable-long-paths-in-windows-10-version-1607-and-later).

## Next steps

* [View the job and drive status](storage-import-export-view-drive-status.md)
* [Review Import/Export copy logs](storage-import-export-tool-reviewing-job-status-v1.md)
