---
title: Migrate Data into Azure File Sync with Azure Data Box
description: Migrate bulk data offline that's compatible with Azure File Sync. Avoid file conflicts, and catch up your file share with the latest changes on the server for a zero downtime cloud migration.
author: khdownie
ms.service: azure-file-storage
ms.topic: how-to
ms.date: 08/12/2026
ms.author: kendownie
# Customer intent: "As an IT administrator, I want to migrate bulk data from on-premises Windows Server to Azure File Sync using Azure Data Box, so that I can ensure zero downtime and keep my file shares updated with the latest changes during the migration process."
---

# Migrate data offline to Azure File Sync with Azure Data Box

:heavy_check_mark: **Applies to:** Classic SMB file shares created with the Microsoft.Storage resource provider

:heavy_multiplication_x: **Doesn't apply to:** All NFS file shares including file shares created with the Microsoft.FileShares resource provider or classic file shares created with the Microsoft.Storage resource provider

This article describes how to use Azure Data Box to bulk-migrate data from an on-premises Windows Server to Azure file shares, then set up Azure File Sync on the source server for ongoing synchronization. Check if this article applies to your scenario:



A display of three sequential steps described in this migration guide. The column next to the image describes them in detail.


> 
> * Data source: Windows Server 2016 or newer where Azure File Sync will be installed and point to the original set of files.
> * Migration route: Windows Server 2016 or newer &rArr; Data Box &rArr; Azure file share &rArr; sync with Windows Server original file location
> * Caching files on-premises: Yes, the final goal is an Azure File Sync deployment that syncs the files from where they are now. 



Using Azure Data Box is a viable path to move the bulk of the data from your on-premises Windows Server to separate Azure file shares and then, optionally, add Azure File Sync on the original source server.

There are different migration paths available to you. It's important to follow the right one:

* Your data lives on a Windows Server 2016 or newer and you plan to install Azure File Sync on that server and sync the original location. In this scenario, you don't want to upload all files and use Data Box instead, then use file sync for ongoing changes. If this is your scenario, then this article describes your migration path.
* You have data on a source where you can't or won't install Azure File Sync, such as a Network Attached Storage (NAS) device or a different server. Instead, create a new, empty server and use Azure File Sync on that server. If that is your scenario, then this isn't the right migration guide for you. Instead, see [Migrate from NAS via Data Box to Azure File Sync](storage-files-migration-nas-hybrid-databox.md) or find the best guide for your scenario on the [migration overview](storage-files-migration-overview.md) page.
* For all other scenarios, check the [table of Azure file share migration guides](storage-files-migration-overview.md), which provides a good starting point for all migration scenarios.
 
## Migration overview

The migration process consists of several phases. You need to:

- Deploy storage accounts and file shares.
- Deploy one or more Azure Data Box devices to move the data from your Windows Server 2016 or newer.
- Configure Azure File Sync with authoritative upload.

The following sections describe the phases of the migration process in detail.

## Phase 1: Determine how many Azure file shares you need

With this migration guide, you must continue to use the on-premises direct attached storage (DAS) that contains your files. Data Box will be fed from that location and Azure File Sync will also be set up on that location. NAS (Network Attached Storage) does not work with this migration path.

You determine what syncs by setting up Azure File Sync *sync groups* that each determine where a set of files syncs between. Each sync group has at least one server location, called a *server endpoint* and one Azure file share, called the *cloud endpoint*. 

You can sync sub paths of a set of files to each their own Azure file share. This setup means several sync groups to cover a set of files completely. The remainder of the section describes your options. If you need to restructure your data, do so before you continue with this guide, order a Data Box, or set up sync. 

> **Caution:**
> Ensure your file and folder structure is how you want it to be long-term before you begin the migration. Avoid any unnecessary folder restructuring during the migration. This restructuring decreases the positive effects of using Azure Data Box for initial, bulk transport of files to Azure.


In this step, you determine how many Azure file shares you need. A single Windows Server instance (or cluster) can sync up to 30 Azure file shares.

You might have more folders on your volumes that you currently share out locally as SMB shares to your users and apps. The easiest way to picture this scenario is to envision an on-premises share that maps 1:1 to an Azure file share. If you have a small-enough number of shares, below 30 for a single Windows Server instance, we recommend a 1:1 mapping.

If you have more than 30 shares, mapping an on-premises share 1:1 to an Azure file share is often unnecessary. Consider the following options.

#### Share grouping

For example, if your human resources (HR) department has 15 shares, you might consider storing all the HR data in a single Azure file share. Storing multiple on-premises shares in one Azure file share doesn't prevent you from creating the usual 15 SMB shares on your local Windows Server instance. It only means that you organize the root folders of these 15 shares as subfolders under a common folder. You then sync this common folder to an Azure file share. That way, you need only a single Azure file share in the cloud for this group of on-premises shares.

#### Volume sync

Azure File Sync supports syncing the root of a volume to an Azure file share. If you sync the volume root, all subfolders and files go to the same Azure file share.

Syncing the root of the volume isn't always the best option. There are benefits to syncing multiple locations. For example, doing so helps keep the number of items lower per sync scope. We test Azure file shares and Azure File Sync with 100 million items (files and folders) per share. But a best practice is to try to keep the number below 20 million or 30 million in a single share.

Setting up Azure File Sync with a lower number of items isn't beneficial only for file sync. A lower number of items also benefits scenarios like these:

* Initial scan of the cloud content can finish faster, which in turn decreases the wait for the namespace to appear on a server enabled for Azure File Sync.
* Cloud-side restore from an Azure file share snapshot is faster.
* Disaster recovery of an on-premises server can speed up significantly.
* Changes made directly in an Azure file share (outside a sync) can be detected and synced faster.

> **Tip:**
> If you don't know how many files and folders you have, check out the TreeSize tool from JAM Software.

#### Structured approach to a deployment map

Before you deploy cloud storage in a later step, it's important to create a map between on-premises folders and Azure file shares. This mapping informs how many and which Azure File Sync *sync group* resources you'll provision. A sync group ties the Azure file share and the folder on your server together and establishes a sync connection.

To optimize your map and decide how many Azure file shares you need, review the following limits and best practices:

* A server on which the Azure File Sync agent is installed can sync with up to 30 Azure file shares.
* An Azure file share is deployed in a storage account. That arrangement makes the storage account a scale target for performance numbers like IOPS and throughput.

  Pay attention to a storage account's IOPS limitations when you deploy Azure file shares. Ideally, you should map file shares 1:1 with storage accounts. However, this mapping might not always be possible due to various limits and restrictions, both from your organization and from Azure. When you can't deploy only one file share in one storage account, consider which shares will be highly active and which shares will be less active. Don't put the hottest file shares together in the same storage account.

  If you plan to lift an app to Azure that will use the Azure file share natively, you might need more performance from your Azure file share. If this type of use is a possibility, even in the future, it's best to create a single standard Azure file share in its own storage account.
* There's a limit of 250 storage accounts per subscription per Azure region.

> **Tip:**
> Based on this information, it often becomes necessary to group multiple top-level folders on your volumes into a new common root directory. You then sync this new root directory, and all the folders that you grouped into it, to a single Azure file share. This technique allows you to stay within the limit of 30 Azure file share syncs per server.
>
> This grouping under a common root doesn't affect access to your data. Your ACLs stay as they are. You only need to adjust any share paths (like SMB or NFS shares) that you might have on the local server folders that you now changed into a common root. Nothing else changes.

> **Important:**
> The most important scale vector for Azure File Sync is the number of items (files and folders) that need to be synced. Review the [Azure File Sync scale targets](../file-sync/file-sync-scale-targets.md) for more details.

It's possible that, in your situation, a set of folders can logically sync to the same Azure file share (by using the common-root approach mentioned earlier). But it might still be better to regroup folders so that they sync to two Azure file shares instead of one. You can use this approach to keep the number of files and folders per file share balanced across the server. You can also split your on-premises shares and sync across more on-premises servers, to add the ability to sync with 30 more Azure file shares per extra server.

> **Important:**
> The most important scale vector for Azure File Sync is the number of items (files and folders) that need to be synced. For more details, review the [Azure File Sync scale targets](../file-sync/file-sync-scale-targets.md).

#### Common file sync scenarios and considerations

| Sync scenario | Supported | Considerations (or limitations) | Solution (or workaround) |
| --- | :---: | --- | --- |
| File server with multiple disks/volumes and multiple shares to the same target Azure file share (consolidation) | No | A target Azure file share (cloud endpoint) supports syncing with only one sync group. <br/> <br/> A sync group supports only one server endpoint per registered server. | 1) Start with syncing one disk (its root volume) to a target Azure file share. Starting with the largest disk/volume will help with storage requirements on-premises. Configure cloud tiering to tier all data to cloud, so that you can free up space on the file server disk. Move data from other volumes/shares into the current volume that's syncing. Continue the steps one by one until all data is tiered up to the cloud or migrated.<br/> 2) Target one root volume (disk) at a time. Use cloud tiering to tier all data to the target Azure file share. Remove the server endpoint from the sync group, re-create the endpoint with the next root volume/disk, sync, and then repeat the process. Note that you might need to reinstall the agent.<br/> 3) Recommend using multiple target Azure file shares (same or different storage account, based on performance requirements). |
| File server with a single volume and multiple shares to the same target Azure file share (consolidation) | Yes | You can't have multiple server endpoints per registered server syncing to same target Azure file share (same as the previous scenario). | Sync the root of the volume that holds multiple shares or top-level folders. |
| File server with multiple shares and/or volumes to multiple Azure file shares under a single storage account (1:1 share mapping) | Yes | A single Windows Server instance (or cluster) can sync up to 30 Azure file shares.<br/><br/> A storage account is a scale target for performance. IOPS and throughput are shared across file shares.<br/><br/> Keep the number of items per sync group within 100 million items (files and folders) per share. It's best to stay below 20 or 30 million per share. | 1) Use multiple sync groups (number of sync groups = number of Azure file shares to sync to).<br/>  2) Only 30 shares at a time can be synced in this scenario. If you have more than 30 shares on that file server, use share grouping and volume sync to reduce the number of root or top-level folders at the source.<br/> 3) Use additional Azure File Sync servers on-premises, and split or move data to these servers to work around limitations on the source Windows Server instance. |
| File server with multiple shares and/or volumes to multiple Azure file shares under a different storage account (1:1 share mapping) | Yes | A single Windows Server instance (or cluster) can sync up to 30 Azure file shares (same or different storage account).<br/><br/> Keep the number of items per sync group within 100 million items (files and folders) per share. It's best to stay below 20 or 30 million per share. | Same as the previous approach. |
| Multiple file servers with a single root volume or share to the same target Azure file share (consolidation) | No | A sync group can't use a cloud endpoint (Azure file share) that's already configured in another sync group.<br/><br/> Although a sync group can have server endpoints on different file servers, the files can't be distinct. | Follow the guidance in the first scenario, with the additional consideration of targeting one file server at a time. |
| Cross-tenant topology (using managed identity across tenants) | No | The Storage Sync Service, the server resource (Azure Arc–enabled server or Azure VM), the managed identity, and the RBAC assignments on the storage account must all be in the same Microsoft Entra tenant. Cross-tenant topologies aren’t supported. | Cross-tenant setups fail authentication and authorization, and the server can’t connect. To proceed, ensure all resources (Sync Service, server, managed identity, and RBAC assignments) are created in the same Microsoft Entra tenant. |

#### Create a mapping table



[Diagram that shows an example of a mapping table. Download the following file to experience and use the content of this image.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/media/storage-files-migration-namespace-mapping/namespace-mapping-expanded.png#lightbox)


Use the previous information to determine how many Azure file shares you need and which parts of your existing data will end up in which Azure file share.

Create a table that records your thoughts so that you can refer to it when you need to. Staying organized is important, because losing details of your mapping plan can happen easily when you're provisioning many Azure resources at once.





## Phase 2: Deploy Azure storage resources

In this phase, consult the mapping table from Phase 1 and use it to provision the correct number of Azure storage accounts and file shares within them.


An Azure file share is stored in the cloud in an Azure storage account.
Another level of performance considerations applies here.

If you have highly active shares (shares used by many users and/or applications), two Azure file shares might reach the performance limit of a storage account.

A best practice is to deploy storage accounts with one file share each.
You can pool multiple Azure file shares into the same storage account if you have archival shares or you expect low day-to-day activity in them.

These considerations apply more to direct cloud access (through an Azure VM) than to Azure File Sync. If you plan to use only Azure File Sync on these shares, grouping several into a single Azure storage account is fine.

If you've made a list of your shares, you should map each share to the storage account it will be in.

In the previous phase, you determined the appropriate number of shares. In this step, you have a mapping of storage accounts to file shares. Now deploy the appropriate number of Azure storage accounts with the appropriate number of Azure file shares in them.

Make sure the region of each of your storage accounts is the same and matches the region of the Storage Sync Service resource you've already deployed.

> **Caution:**
> If you create an Azure file share that has a 100 TiB limit, that share can use only locally redundant storage or zone-redundant storage redundancy options. Consider your storage redundancy needs before using 100 TiB file shares.

Azure file shares are still created with a 5 TiB limit by default. Follow the steps in [Create an Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md) to create a large file share.

Another consideration when you're deploying a storage account is the redundancy of Azure Storage. See [Azure Storage redundancy options](../common/storage-redundancy.md).

The names of your resources are also important. For example, if you group multiple shares for the HR department into an Azure storage account, you should name the storage account appropriately. Similarly, when you name your Azure file shares, you should use names similar to the ones used for their on-premises counterparts.

## Phase 3: Determine how many Azure Data Box appliances you need

Start this step only after you've finished the previous phase. Your Azure storage resources (storage accounts and file shares) should be created at this time. When you order your Data Box, you need to specify the storage accounts into which the Data Box is moving data.

In this phase, map the results of the migration plan from the previous phase to the limits of the available Data Box options. These considerations help you make a plan for which Data Box options to choose and how many of them you need to move your server shares to Azure file shares.

To determine how many devices you need and their types, consider these important limits:

* Any Azure Data Box appliance can move data into up to 10 storage accounts. 
* Each Data Box option comes with its own usable capacity. See [Data Box options](#data-box-options).

Consult your migration plan to find the number of storage accounts you decide to create and the shares in each one. Then look at the size of each of the shares on your server. Combining this information allows you to optimize and decide which appliance should send data to which storage accounts. Two Data Box devices can move files into the same storage account, but don't split content of a single file share across two Data Boxes.

### Data Box options

For a standard migration, choose one or a combination of these Data Box options:

| Option | Description | Usable capacity | More information |
| --- | --- | --- | --- |
| **Data Box Disk** | Microsoft sends you between one and five SSD disks that each have a capacity of 8 TiB, for a maximum total of 40 TiB. | About 20% less than raw capacity due to encryption and file-system overhead. | [Data Box Disk documentation](../../databox/data-box-disk-overview.md) |
| **Data Box** | The most common option. Microsoft sends you a ruggedized appliance that works similarly to a NAS. | 80, 120, or 525 TiB depending on SKU. | [Data Box documentation](../../databox/data-box-overview.md?pivots=dbx-ng) |
| **Data Box Heavy** | A ruggedized appliance on wheels that works similarly to a NAS. | 1 PiB (about 20% less usable due to encryption and file-system overhead). | [Data Box Heavy documentation](../../databox/data-box-heavy-overview.md) |

> **Note:**
> For Data Box and Data Box Heavy, only copying data via SMB is supported. Copying data via the data copy service isn't supported because it doesn't preserve file fidelity.

## Phase 4: Copy files onto your Data Box

When your Data Box arrives, set it up with unimpeded network connectivity to your Windows Server. Follow the setup documentation for the type of Data Box you ordered:

* [Set up Data Box](../../databox/data-box-quickstart-portal.md).
* [Set up Data Box Disk](../../databox/data-box-disk-quickstart-portal.md).
* [Set up Data Box Heavy](../../databox/data-box-heavy-quickstart-portal.md).

Depending on the type of Data Box, Data Box copy tools might be available. These tools aren't recommended for migrations to Azure file shares because they don't copy your files to the Data Box with full fidelity. Use Robocopy instead.

When your Data Box arrives, it will have pre-provisioned SMB shares available for each storage account you specified when you ordered it.

* If your files go into an SSD Azure file share, there will be one SMB share per SSD "FileStorage" storage account.
* If your files go into an HDD storage account, there are three SMB shares per HDD pay-as-you-go storage account. Only the file share that ends with `_AzFile` is relevant for your migration. Ignore any block and page blob shares.

### How Data Box maps folders to Azure file shares

Under the `<storage-account-name>_AzFile` device share, each first-level folder maps to an Azure file share on the target storage account:

- The first-level folder name becomes the Azure file share name during ingestion. If a share with that name doesn't already exist in the target storage account, Data Box creates it. If it does exist, Data Box copies the data into that existing share.
- Don't copy files directly to the root of the `_AzFile` share. All data must go inside a first-level folder.
- For a one-to-one mapping with your source SMB shares, create one first-level folder for each source share (using the desired Azure file share name) and copy each source share into its corresponding folder. For example:

  ```
  \\<DataBox-IP>\<storage-account-name>_AzFile\Share1
  \\<DataBox-IP>\<storage-account-name>_AzFile\Share2
  \\<DataBox-IP>\<storage-account-name>_AzFile\Share3
  ```

For more information, see [Connect to Data Box](../../databox/data-box-deploy-copy-data.md#connect-to-data-box).

Follow the steps in the Azure Data Box documentation:

1. [Connect to Data Box](../../databox/data-box-deploy-copy-data.md).
1. Copy data to Data Box.
1. [Prepare your Data Box for upload to Azure](../../databox/data-box-deploy-picked-up.md).

The linked Data Box documentation specifies a Robocopy command. That command isn't suitable for preserving the full file and folder fidelity. Use this command instead:


```console
robocopy <SourcePath> <Dest.Path> /MT:20 /R:2 /W:1 /B /MIR /IT /COPY:DATSO /DCOPY:DAT /NP /NFL /NDL /XD "System Volume Information" /UNILOG:<FilePathAndName> 
```

| Switch | Meaning |
| --- | --- |
| `/MT:n` | Allows Robocopy to run multithreaded. Default for `n` is 8. The maximum is 128 threads. While a high thread count helps saturate the available bandwidth, it doesn't mean your migration will always be faster with more threads. Tests with Azure Files indicate between 8 and 20 shows balanced performance for an initial copy run. Subsequent `/MIR` runs are progressively affected by available compute vs available network bandwidth. For subsequent runs, match your thread count value more closely to your processor core count and thread count per core. Consider whether cores need to be reserved for other tasks that a production server might have. Tests with Azure Files have shown that up to 64 threads produce a good performance, but only if your processors can keep them alive at the same time. |
| `/R:n` | Maximum retry count for a file that fails to copy on first attempt. Robocopy will try `n` times before the file permanently fails to copy in the run. You can optimize the performance of your run: Choose a value of two or three if you believe timeout issues caused failures in the past. This may be more common over WAN links. Choose no retry or a value of one if you believe the file failed to copy because it was actively in use. Trying again a few seconds later may not be enough time for the in-use state of the file to change. Users or apps holding the file open may need hours more time. In this case, accepting the file wasn't copied and catching it in one of your planned, subsequent Robocopy runs, may succeed in eventually copying the file successfully. That helps the current run to finish faster without being prolonged by many retries that ultimately end up in a majority of copy failures due to files still open past the retry timeout. |
| `/W:n` | Specifies the time Robocopy waits before attempting to copy a file that didn't successfully copy during a previous attempt. `n` is the number of seconds to wait between retries. `/W:n` is often used together with `/R:n`. |
| `/B` | Runs Robocopy in the same mode that a backup application would use. This switch allows Robocopy to move files that the current user doesn't have permissions for. The backup switch depends on running the Robocopy command in an administrator elevated console or PowerShell window. If you use Robocopy for Azure Files, make sure you mount the Azure file share using the storage account access key vs. a domain identity. If you don't, the error messages might not intuitively lead you to a resolution of the problem. |
| `/MIR` | (Mirror source to target.) Allows Robocopy to copy only deltas between source and target. Empty subdirectories will be copied. Items (files or folders) that have changed or don't exist on the target will be copied. Items that exist on the target but not on the source will be purged (deleted) from the target. When you use this switch, match the source and target folder structures exactly. *Matching* means copying from the correct source and folder level to the matching folder level on the target. Only then can a "catch up" copy be successful. When source and target are mismatched, using `/MIR` will lead to large-scale deletions and recopies. |
| `/IT` | Ensures fidelity is preserved in certain mirror scenarios. </br>For example, if a file experiences an ACL change and an attribute update between two Robocopy runs, it's marked hidden. Without `/IT`, the ACL change might be missed by Robocopy and not transferred to the target location. |
| `/COPY:[copyflags]` | The fidelity of the file copy. Default: `/COPY:DAT`. Copy flags: `D`= Data, `A`= Attributes, `T`= Timestamps, `S`= Security = NTFS ACLs, `O`= Owner information, `U`= A<u>u</u>diting information. Auditing information can't be stored in an Azure file share. |
| `/DCOPY:[copyflags]` | Fidelity for the copy of directories. Default: `/DCOPY:DA`. Copy flags: `D`= Data, `A`= Attributes, `T`= Timestamps. |
| `/NP` | Specifies that the progress of the copy for each file and folder won't be displayed. Displaying the progress significantly lowers copy performance. |
| `/NFL` | Specifies that file names aren't logged. Improves copy performance. |
| `/NDL` | Specifies that directory names aren't logged. Improves copy performance. |
| `/XD` | Specifies directories to be excluded. When running Robocopy on the root of a volume, consider excluding the hidden `System Volume Information` folder. If used as designed, all information in there is specific to the exact volume on this exact system and can be rebuilt on-demand. Copying this information won't be helpful in the cloud or when the data is ever copied back to another Windows volume. Leaving this content behind should not be considered data loss. |
| `/UNILOG:<file name>` | Writes status to the log file as Unicode. (Overwrites the existing log.) |
| `/L` | **Only for a test run** </br> Files are to be listed only. They won't be copied, not deleted, and not time stamped. Often used with `/TEE` for console output. Flags from the sample script, like `/NP`, `/NFL`, and `/NDL`, might need to be removed to achieve you properly documented test results. |
| `/LFSM` | **Only for targets with tiered storage. Not supported when the destination is a remote SMB share.** </br>Specifies that Robocopy operates in "low free space mode." This switch is useful only for targets with tiered storage that might run out of local capacity before Robocopy finishes. It was added specifically for use with a target enabled for Azure File Sync cloud tiering. It can be used independently of Azure File Sync. In this mode, Robocopy will pause whenever a file copy would cause the destination volume's free space to go below a "floor" value. This value can be specified by the `/LFSM:n` form of the flag. The parameter `n` is specified in base 2: `nKB`, `nMB`, or `nGB`. If `/LFSM` is specified with no explicit floor value, the floor is set to 10 percent of the destination volume's size. Low free space mode isn't compatible with `/MT`, `/EFSRAW`, or `/ZB`. Support for `/B` was added in Windows Server 2022. Please see section Windows Server 2022 and RoboCopy LFSM below for more information including detail about a related bug and workaround. |
| `/Z` | **Use cautiously** </br>Copies files in restart mode. This switch is recommended only in an unstable network environment. It significantly reduces copy performance because of extra logging. |
| `/ZB` | **Use cautiously** </br>Uses restart mode. If access is denied, this option uses backup mode. This option significantly reduces copy performance because of checkpointing. |

> **Important:**
> We recommend using a Windows Server 2022. When using a Windows Server 2019, ensure at the latest patch level or at least [OS update KB5005103](https://support.microsoft.com/topic/august-26-2021-kb5005103-os-build-18363-1766-preview-4e23362c-5e43-4d8f-95e5-9fdade60605f) is installed. It contains important fixes for certain Robocopy scenarios.

RoboCopy might report that files were copied even when no data transfer was necessary. This behavior occurs because robocopy evaluates both file data and metadata changes when producing its output. To correctly interpret the results, review the file status in the command output:
- Newer: File data is copied to the destination.
- Modified: Only metadata is updated; file data isn't recopied.

In both cases, RoboCopy might report byte counts as though data was transferred. This behavior can lead to confusion when validating copy operations.


## Phase 5: Deploy the Azure File Sync cloud resource

Before you continue with this guide, wait until all of your files have arrived in the correct Azure file shares. The process of shipping and ingesting Data Box data will take time.


The core resource to configure for Azure File Sync is called a *Storage Sync Service*. We recommend that you deploy only one for all servers that are syncing the same set of files now or in the future. Create multiple Storage Sync Services only if you have distinct sets of servers that must never exchange data. For example, you might have servers that must never sync the same Azure file share. Otherwise, using a single Storage Sync Service is the best practice.

Choose an Azure region for your Storage Sync Service that's close to your location. All other cloud resources must be deployed in the same region. To simplify management, create a new resource group in your subscription that houses sync and storage resources.

For more information, see the [section about deploying the Storage Sync Service](../file-sync/file-sync-deployment-guide.md#deploy-the-storage-sync-service) in the article about deploying Azure File Sync. Follow only this section of the article. There will be links to other sections of the article in later steps.

## Phase 6: Deploy the Azure File Sync agent


In this section, you install the Azure File Sync agent on your Windows Server instance.

The [deployment guide](../file-sync/file-sync-deployment-guide.md) explains that you need to turn off **Internet Explorer Enhanced Security Configuration**. This security measure isn't applicable with Azure File Sync. Turning it off allows you to authenticate to Azure without any problems.

Open PowerShell. Install the required PowerShell modules by using the following commands. Be sure to install the full module and the NuGet provider when you're prompted to do so.

```powershell
Install-Module -Name Az -AllowClobber
Install-Module -Name Az.StorageSync
```

If you have any problems reaching the internet from your server, now is the time to solve them. Azure File Sync uses any available network connection to the internet. Requiring a proxy server to reach the internet is also supported. You can either configure a machine-wide proxy now or, during agent installation, specify a proxy that only Azure File Sync will use.

If configuring a proxy means you need to open your firewalls for the server, that approach might be acceptable to you. At the end of the server installation, after you've completed server registration, a network connectivity report will show you the exact endpoint URLs in Azure that Azure File Sync needs to communicate with for the region you've selected. The report also tells you why communication is needed. You can use the report to lock down the firewalls around the server to specific URLs.

You can also take a more conservative approach in which you don't open the firewalls wide. You can instead limit the server to communicate with higher-level DNS namespaces. For more information, see [Azure File Sync proxy and firewall settings](../file-sync/file-sync-firewall-and-proxy.md). Follow your own networking best practices.

At the end of the server installation wizard, a server registration wizard will open. Register the server to your Storage Sync Service's Azure resource from earlier.

These steps are described in more detail in the deployment guide, which includes the PowerShell modules that you should install first:
[Azure File Sync agent installation](../file-sync/file-sync-deployment-guide.md).

Use the latest agent. You can download it from the Microsoft Download Center:
[Azure File Sync Agent](https://aka.ms/AFS/agent "Azure File Sync Agent download").

After a successful installation and server registration, you can confirm that you've successfully completed this step. Go to the Storage Sync Service resource in the Azure portal. In the left menu, go to **Registered servers**. You'll see your server listed there.


## Phase 7: Configure Azure File Sync on the existing Windows Server

Your registered on-premises Windows Server instance must be ready and connected to the internet for this process.


This step ties together all the resources and folders you've set up on your Windows Server instance during the previous steps.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Locate your Storage Sync Service resource.
1. Create a new *sync group* within the Storage Sync Service resource for each Azure file share. In Azure File Sync terminology, the Azure file share will become a *cloud endpoint* in the sync topology that you're describing with the creation of a sync group. When you create the sync group, give it a familiar name so that you recognize which set of files syncs there. Make sure you reference the Azure file share with a matching name.
1. After you create the sync group, a row for it will appear in the list of sync groups. Select the name (a link) to display the contents of the sync group. You'll see your Azure file share under **Cloud endpoints**.
1. Locate the **Add Server Endpoint** button. The folder on the local server that you've provisioned will become the path for this *server endpoint*.




[An Azure portal section of the create server endpoint wizard is shown. A checkbox is highlighted that corresponds to the scenario of seeding the Azure file share with data. Check this box if you connect Azure File Sync to the same on-prem location from where you copied onto Data Box before.](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/media/storage-files-migration-server-hybrid-databox/enable-authoritative-upload-top-checkbox-expanded.png#lightbox)


Once you are in the **Create server endpoint** wizard, utilize the provided checkbox underneath the folder path. Only make this selection if you have entered a path that points to the same file and folder structure as can be found in the Azure file share (where Data Box moved the files and folders into for this namespace). </br> </br> If there is a mismatch of folder hierarchy, then that will present itself as differences that cannot be automatically resolved. Avoid a mismatch or any investment in the Data Box process will result in zero benefit to you. All data will be deleted in the Azure file share. All data will need to be uploaded from the local server. The directory structures must match to gain the benefit of a bulk-migration with Azure Data Box and a seamless update of the cloud share with the latest changes from the server.



> **Note:**
> Enabling this checkbox will set the **Initial sync** mode to *Authoritatively overwrite files and folders in the Azure file share with content in this server's path.* This option is only available for the first server endpoint in a sync group.

Once you configured authoritative upload for this new server endpoint, you can optionally enable cloud tiering.

Cloud tiering is the Azure File Sync feature that allows the local server to have less storage capacity than is stored in the cloud but have the full namespace available. Locally interesting data is also cached locally for fast access performance. Cloud tiering is optional. You can set it individually for each Azure File Sync server endpoint. Use this feature to achieve a fixed storage footprint on-premises, yet still give users a local performance cache, and store cooler data in the cloud.

For more information, see the [cloud tiering overview](../file-sync/file-sync-cloud-tiering-overview.md) or take a closer look at the different [cloud tiering policies](../file-sync/file-sync-cloud-tiering-policy.md) you can use to fine-tune what is cached and tiered on the local server.

## Complete your migration

After you create a server endpoint, sync works. But sync needs to enumerate (discover) the files and folders you moved by using Azure Data Box into the Azure file share. Depending on the size of the namespace, it can take a long time before the latest server changes sync to the cloud. Your users aren't affected and can continue to work with the data on the server. This strategy achieves a zero-downtime cloud migration.

For all Azure file shares / server locations that you need to configure for sync, repeat the steps to create sync groups and to add the matching server folders as server endpoints. You used Azure Data Box to move your files into several Azure file shares. Your migration is complete once you have created all the server endpoints that connect your on-premises data to these Azure file shares.

## Next steps

There's more to discover about Azure file shares and Azure File Sync. The following articles help you understand advanced options, best practices, and troubleshooting. These articles contain links to the [Azure file share documentation](storage-files-introduction.md) where appropriate.

* [Migration overview](storage-files-migration-overview.md)
* [Plan for an Azure File Sync deployment](../file-sync/file-sync-planning.md)
* [Create a classic file share](create-classic-file-share.md)
* [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json)
