---
title: Plan an Azure File Sync deployment
description: Plan your Azure File Sync deployment by choosing servers, sync topologies, networking, cloud tiering policies, and Windows Server configurations.
author: khdownie
ms.service: azure-file-storage
ms.topic: concept-article
ms.date: 08/17/2026
ms.author: kendownie
ms.custom: references_regions
# Customer intent: "As an IT administrator, I want to plan for an Azure File Sync deployment so that I can effectively manage on-premises file caching and ensure seamless integration with cloud file shares."
---

# Plan an Azure File Sync deployment

Planning an Azure File Sync deployment involves choosing which servers to sync, how to organize your sync topology, and how to configure networking and cloud tiering. Use this article to make those decisions, then follow the [deployment guide](file-sync-deployment-guide.md) to set it up.

**Key decisions:**

1. **Which servers will sync?** On-premises Windows Servers, Azure VMs, or both? See [Windows file server considerations](#considerations-for-windows-file-servers).
2. **How many sync groups do you need?** Map your file shares and server folders into [sync topologies](#planning-for-balanced-sync-topologies).
3. **Will you use cloud tiering?** Cache only hot files locally to save disk space, or keep a full copy? See [Storage tiers](#storage-tiers).
4. **What networking configuration?** Public endpoints, private endpoints, or firewalls? See [Networks](#networks).
5. **How will users authenticate?** See [Identity](#identity).
6. **What Windows Server specifications?** See [Recommended system resources](#recommended-system-resources).

> [!VIDEO https://www.youtube.com/embed/nfWLO7F52-s]

## Management concepts

In Azure, a *resource* is a manageable item that you create and configure within your Azure subscriptions and resource groups. Resources are offered by *resource providers*, which are management services that deliver specific types of resources. To deploy Azure File Sync, you work with two key resources:

- **Storage accounts**, offered by the `Microsoft.Storage` resource provider. Storage accounts are top-level resources that represent a shared pool of storage, IOPS, and throughput in which you can deploy **classic file shares** or other storage resources, depending on the storage account kind. All storage resources that you deploy into a storage account share the limits that apply to that storage account. Classic file shares support both the SMB and NFS file sharing protocols, but you can only use Azure File Sync with SMB file shares.

  > **Note:**
  > Azure Files also supports deploying file shares as a top-level Azure resource through the `Microsoft.FileShares` resource provider. However, because these file shares currently only support the NFS protocol, Azure File Sync doesn't support them.

- **Storage Sync Services**, offered by the `Microsoft.StorageSync` resource provider. Storage Sync Services act as management containers that enable you to register Windows File Servers and define the sync relationships for Azure File Sync.

### Azure file share management concepts

Classic file shares, or file shares deployed in storage accounts, are the traditional way to deploy file shares for Azure Files. They support all of the key features that Azure Files supports, including SMB and NFS, SSD and HDD media tiers, every redundancy type, and availability in every region. To learn more about classic file shares, see [classic file shares](../files/files-management-concepts.md#classic-file-shares-microsoftstorage).


Classic file share deployments use two kinds of storage accounts:

- **Provisioned storage accounts**: The `FileStorage` storage account kind identifies provisioned storage accounts. You can deploy provisioned classic file shares on either SSD or HDD based hardware by using provisioned storage accounts. You can only use provisioned storage accounts to store classic file shares. You can't use them for other storage resources such as blob containers, queues, and tables. Use provisioned storage accounts for all new classic file share deployments.

- **Pay-as-you-go storage accounts**: The `StorageV2` storage account kind identifies pay-as-you-go storage accounts. You can deploy pay-as-you-go file shares on HDD based hardware by using pay-as-you-go storage accounts. You can use pay-as-you-go storage accounts to store classic file shares and other storage resources such as blob containers, queues, or tables.


### Azure File Sync management concepts

Within a Storage Sync Service, you can deploy:

- **Registered servers**, which represent a Windows Server with a trust relationship with the Storage Sync Service. Registered servers can be either an individual server or cluster. However, a server or cluster can only be registered with one Storage Sync Service at a time.

- **Sync groups**, which define the sync relationship between a cloud endpoint and one or more server endpoints. Endpoints within a sync group stay in sync with each other. For example, if you have two distinct sets of files that you want to manage by using Azure File Sync, you create two sync groups and add different endpoints to each sync group.
    - **Cloud endpoints**, which represent Azure file shares.
    - **Server endpoints**, which represent paths on registered servers that are synced to Azure Files. A registered server can contain multiple server endpoints if their namespaces don't overlap.

> **Important:**
> You can make changes to the namespace of any cloud endpoint or server endpoint in the sync group and sync your files to the other endpoints in the sync group. If you make a change to the cloud endpoint (Azure file share) directly, an Azure File Sync change detection job first needs to discover changes. A change detection job for a cloud endpoint starts only once every 24 hours. For more information, see [Frequently asked questions about Azure Files and Azure File Sync](../files/storage-files-faq.md?toc=/azure/storage/filesync/toc.json#afs-change-detection).

### Count of needed storage sync services

A storage sync service is the root Azure Resource Manager resource for Azure File Sync. It manages synchronization relationships between your Windows Server installations and Azure file shares. Each storage sync service can contain multiple sync groups and multiple registered servers.

Each Windows Server instance can be registered to only one storage sync service. After registration, the server can participate in multiple sync groups within that storage sync service by using a Resource Manager principal to create server endpoints on the server.

When you design Azure File Sync topologies, isolate data clearly at the level of the storage sync service. For example, if your enterprise requires separate Azure File Sync environments for two distinct business units, and you need strict data isolation between these groups, create a dedicated storage sync service for each group. Avoid placing sync groups for both business groups within the same storage sync service, because that configuration doesn't ensure complete isolation.

For more guidance on data isolation by using separate subscriptions or resource groups in Azure, refer to [Azure resource providers and types](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-providers-and-types#resource-scope-and-lifecycle).

## Planning for balanced sync topologies

Before you deploy any resources, plan what you'll sync on a local server and which Azure file share you'll use. Planning helps you determine how many storage accounts, file shares, and sync resources you need. These considerations are relevant even if your data doesn't currently reside on a Windows Server instance or on the server that you want to use long term. The [migration section](#migration) of this article can help you determine appropriate migration paths for your situation.


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
> The most important scale vector for Azure File Sync is the number of items (files and folders) that need to be synced. Review the [Azure File Sync scale targets](file-sync-scale-targets.md) for more details.

It's possible that, in your situation, a set of folders can logically sync to the same Azure file share (by using the common-root approach mentioned earlier). But it might still be better to regroup folders so that they sync to two Azure file shares instead of one. You can use this approach to keep the number of files and folders per file share balanced across the server. You can also split your on-premises shares and sync across more on-premises servers, to add the ability to sync with 30 more Azure file shares per extra server.

> **Important:**
> The most important scale vector for Azure File Sync is the number of items (files and folders) that need to be synced. For more details, review the [Azure File Sync scale targets](file-sync-scale-targets.md).

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





## <a name = "windows-file-server-considerations"></a>Considerations for Windows file servers

To enable the sync capability on Windows Server, you must install the Azure File Sync downloadable agent. The Azure File Sync agent provides two main components:

- `FileSyncSvc.exe`, the background Windows service that's responsible for monitoring changes on the server endpoints and initiating sync sessions
- `StorageSync.sys`, a file system filter that enables cloud tiering and fast disaster recovery

### Operating system requirements

Azure File Sync supports the following versions of Windows Server:

| Version | RTM Version | Supported editions | Supported deployment options |
| --- | --- | --- | --- |
| Windows Server 2025 | 26100 | Azure, Datacenter, Essentials, Standard, and IoT | Full and Core |
| Windows Server 2022 | 20348 | Azure, Datacenter, Essentials, Standard, and IoT | Full and Core |
| Windows Server 2019 | 17763 | Datacenter, Essentials, Standard, and IoT | Full and Core |
| Windows Server 2016 | 14393 | Datacenter, Essentials, Standard, and Storage Server | Full and Core |

Keep all servers that you use with Azure File Sync up to date with the latest updates from Windows Update.

### Minimum system resources

Azure File Sync requires a server, either physical or virtual, with all of these attributes:

- At least one CPU.
- A minimum of 2 GiB of memory. If the server runs in a virtual machine with Hyper-V Dynamic Memory enabled, configure the VM with a minimum of 2,048 MiB of memory.
- A locally attached volume formatted with the NTFS file system.

For most production workloads, don't configure a sync server in Azure File Sync with only the minimum requirements.

### Recommended system resources

Like any server feature or application, the scale of the deployment determines the system resource requirements for Azure File Sync. Larger deployments on a server require greater system resources.

For Azure File Sync, the number of objects across the server endpoints and the churn on the dataset determine scale. A single server can have server endpoints in multiple sync groups. The number of objects listed in the following table accounts for the full namespace that a server is attached to.

For example, *server endpoint A with 10 million objects + server endpoint B with 10 million objects = 20 million objects*. For that example deployment, you need 8 CPUs, 16 GiB of memory for steady state, and (if possible) 48 GiB of memory for the initial migration.

Namespace data is stored in memory for performance reasons. Because of that configuration, bigger namespaces require more memory to maintain good performance. More churn requires more CPUs to process.

The following table provides both the size of the namespace and a conversion to capacity for typical general-purpose file shares, where the average file size is 512 KiB. If your file sizes are smaller, consider adding more memory for the same amount of capacity. Base your memory configuration on the size of the namespace.

| Namespace size - files and directories (millions) | Typical capacity (TiB) | CPU cores | Recommended memory (GiB) |
| --- | --- | --- | --- |
| 3 | 1.4 | 2 | 8 (initial sync)/ 2 (typical churn) |
| 5 | 2.3 | 2 | 16 (initial sync)/ 4 (typical churn) |
| 10 | 4.7 | 4 | 32  (initial sync)/ 8 (typical churn) |
| 30 | 14.0 | 8 | 48 (initial sync)/ 16 (typical churn) |
| 50 | 23.3 | 16 | 64  (initial sync)/ 32 (typical churn) |
| 100* | 46.6 | 32 | 128 (initial sync)/ 32 (typical churn) |

\*Syncing more than 100 million files and directories isn't recommended. This is a soft limit based on tested thresholds. For more information, see [Azure File Sync scale targets](file-sync-scale-targets.md).

> **Tip:**
> Initial synchronization of a namespace is an intensive operation. Allocate more memory until initial sync is complete. This approach isn't required but might speed up initial sync.
>
> Typical churn is 0.5% of the namespace changing per day. For higher levels of churn, consider adding more CPUs.

> **Note:**
> The Azure File Sync agent requires .NET Framework 4.7.2 or later on the Windows Server. Windows Server 2019 and later include .NET Framework 4.7.2 by default. For Windows Server 2016, verify that .NET Framework 4.7.2 or later is installed before installing Azure File Sync.

### Evaluation cmdlet

Before you deploy Azure File Sync, evaluate whether it's compatible with your system by using the Azure File Sync evaluation cmdlet. This cmdlet checks for potential problems with your file system and dataset, such as unsupported characters or an unsupported operating system version. These checks cover most (but not all) of the features mentioned in this article. To ensure that your deployment goes smoothly, review the rest of this section.

You can install the evaluation cmdlet by installing the Az PowerShell module. For instructions, see [Install Azure PowerShell](https://learn.microsoft.com/powershell/azure/install-azure-powershell).

#### Usage

Invoke the evaluation tool to perform system checks, dataset checks, or both. To perform both system and dataset checks:

```powershell
Invoke-AzStorageSyncCompatibilityCheck -Path <path>
```

To test only your dataset:

```powershell
Invoke-AzStorageSyncCompatibilityCheck -Path <path> -SkipSystemChecks
```

To test system requirements only:

```powershell
Invoke-AzStorageSyncCompatibilityCheck -ComputerName <computer name> -SkipNamespaceChecks
```

To display the results in a .csv file:

```powershell
$validation = Invoke-AzStorageSyncCompatibilityCheck C:\DATA
$validation.Results | Select-Object -Property Type, Path, Level, Description, Result | Export-Csv -Path C:\results.csv -Encoding utf8
```

### File system compatibility

Azure File Sync is supported only on directly attached NTFS volumes. Direct-attached storage (DAS) on Windows Server means that the Windows Server operating system owns the file system. You can provide DAS by physically attaching disks to the file server, attaching virtual disks to a file server VM (such as a VM hosted by Hyper-V), or even using iSCSI.

Only NTFS volumes are supported. ReFS, FAT, FAT32, and other file systems aren't supported.

The following table shows the interoperability state of NTFS file system features:

| Feature | Support status | Notes |
| --- | --- | --- |
| Access control lists (ACLs) | Fully supported | Azure File Sync preserves Windows-style discretionary ACLs. Windows Server enforces these ACLs on server endpoints. You can also enforce ACLs when you're directly mounting the Azure file share, but this method requires additional configuration. For more information, see the [Identity](#identity) section later in this article. |
| Hard links | Skipped |  |
| Symbolic links | Skipped |  |
| Mount points | Partially supported | Mount points might be the root of a server endpoint, but they're skipped if a server endpoint's namespace contains them. |
| Junctions | Skipped | Examples are Distributed File System (DFS) `DfrsrPrivate` and `DFSRoots` folders. |
| Reparse points | Skipped |  |
| NTFS compression | Partially supported | Azure File Sync doesn't support server endpoints located on a volume that compresses the system volume information (SVI) directory. |
| Sparse files | Fully supported | Sparse files sync (aren't blocked), but they sync to the cloud as a full file. If the file contents change in the cloud (or on another server), the file is no longer sparse when the change is downloaded. |
| Alternate Data Streams (ADS) | Preserved, but not synced | For example, classification tags that File Classification Infrastructure creates aren't synced. Existing classification tags on files on each of the server endpoints are untouched. |

#### NTFS compression with cloud tiering

Using NTFS compression on tiered files can cause significant performance impact. Don't use cloud tiering with compressed files.  

If compressed files have already been tiered, they must be uncompressed after recalling the data from the cloud by running:

```powershell
Invoke-StorageSyncFileRecall -FilePath <path>
compact /U /S <filepath>
```

You can also uncompress files by using the [compact](https://learn.microsoft.com/windows-server/administration/windows-commands/compact) command.

On Windows Server 2019 or later, the **compact** command skips tiered files, so you must recall the file first before uncompressing it:

```powershell
Import-Module "C:\Program Files\Azure\StorageSyncAgent\StorageSync.Management.ServerCmdlets.dll"
Invoke-StorageSyncFileRecall -FilePath <path>
compact /U /S <filepath>
```

If file recalls lead to low disk space issues, wait for background tiering to kick in and tier the file back before recalling more files. Alternatively, you can tier the file back after uncompressing by running the following cmdlet:

```powershell
Import-Module "C:\Program Files\Azure\StorageSyncAgent\StorageSync.Management.ServerCmdlets.dll"
Invoke-StorageSyncCloudTiering -Path <path>
```

#### Skipped files and folders<a id="files-skipped"></a>

Azure File Sync skips the following temporary files and system folders:

| File/folder | Note |
| --- | --- |
| `pagefile.sys` | File specific to a system |
| `Desktop.ini` | File specific to a system |
| `thumbs.db` | Temporary file for thumbnails |
| `ehthumbs.db` | Temporary file for media thumbnails |
| `~$*.*` | Office temporary file |
| `*.tmp` | Temporary file |
| `*.laccdb` | Access database locking file |
| `635D02A9D91C401B97884B82B3BCDAEA.*` | Internal sync file |
| `\System Volume Information` | Folder specific to a volume |
| `$RECYCLE.BIN` | Folder |
| `\SyncShareState` | Folder for sync |
| `.SystemShareInformation` | Folder for sync in an Azure file share |

> **Note:**
> Although Azure File Sync supports syncing database files, databases aren't a good workload for sync solutions (including Azure File Sync). The log files and databases need to be synced together, and they can get out of sync for various reasons that could lead to database corruption.

### Free space on your local disk

When you plan to use Azure File Sync, consider how much free space you need on the local disk for your server endpoint.

With Azure File Sync, you need to account for the following items that take up space on your local disk:

- When cloud tiering is enabled:
  - Reparse points for tiered files
  - Azure File Sync metadata database
  - Azure File Sync heatstore
  - Fully downloaded files in your hot cache (if any)
  - Policy requirements for volume free space

- When cloud tiering is disabled:
  - Fully downloaded files
  - Azure File Sync heatstore
  - Azure File Sync metadata database

The following example illustrates how to estimate the amount of free space that you need on your local disk. Suppose you install your Azure File Sync agent on your Azure Windows VM, and you plan to create a server endpoint on disk F. You have 1 million files (and want to tier all of them), 100,000 directories, and a disk cluster size of 4 KiB. The disk size is 1,000 GiB. You want to enable cloud tiering and set your volume free-space policy to 20%.

- NTFS allocates a cluster size for each of the tiered files:

  *1 million files * 4 KiB cluster size = 4,000,000 KiB (4 GiB)*

  To fully benefit from cloud tiering, use smaller NTFS cluster sizes (less than 64 KiB) because each tiered file occupies a cluster. Also, NTFS allocates the space that tiered files occupy. This space doesn't show up in any UI.
- Sync metadata occupies a cluster size per item:

  *(1 million files + 100,000 directories) * 4 KiB cluster size = 4,400,000 KiB (4.4 GiB)*
- Azure File Sync heatstore occupies 1.1 KiB per file:

  *1 million files * 1.1 KiB = 1,100,000 KiB (1.1 GiB)*
- Volume free-space policy is 20%:

  *1000 GiB * 0.2 = 200 GiB*

In this case, Azure File Sync needs about 209,500,000 KiB (209.5 GiB) of space for this namespace. Add this amount to any free space that you think you might need for this disk.

### Failover clustering

Azure File Sync supports Windows Server failover clustering for the **File Server for general use** deployment option. For more information about how to configure the **File Server for general use** role on a failover cluster, see [Deploy a two-node clustered file server](https://learn.microsoft.com/windows-server/failover-clustering/deploy-two-node-clustered-file-server).

Azure File Sync supports only one scenario: a Windows Server failover cluster with clustered disks. Failover clustering isn't supported on Scale-Out File Server, Cluster Shared Volumes (CSVs), or local disks.

For sync to work correctly, you must install the Azure File Sync agent on every node in a failover cluster.

### Data deduplication

When you enable data deduplication on a volume with cloud tiering enabled, you can cache more files on-premises without provisioning more storage. The system tiers deduplication-optimized files within the server endpoint location just like a normal file, based on the policy settings for cloud tiering. After you tier the deduplication-optimized files, the data deduplication garbage collection job runs automatically. It reclaims disk space by removing unnecessary chunks that other files on the volume no longer reference.

In some cases where data deduplication is installed, the available volume space can increase more than expected after deduplication garbage collection is triggered. The following example describes how volume space works:

1. The free-space policy for cloud tiering is set to 20%.
1. Azure File Sync is notified when free space is low (let's say 19%).
1. Tiering determines that 1% more space needs to be freed, but you want 5% extra, so you tier up to 25% (for example, 30 GiB).
1. The files are tiered until you reach 30 GiB.
1. As part of interoperability with Data Deduplication, Azure File Sync initiates garbage collection at the end of the tiering session.

The volume savings apply only to the server. Your data in the Azure file share isn't deduplicated.

> **Note:**
> Windows Server 2025, Windows Server 2022, Windows Server 2019, and Windows Server 2016 support data deduplication whether cloud tiering is enabled or disabled on one or more server endpoints on the volume. On Windows Server 2019 or Windows Server 2016, you must install Windows update [KB4520062 - October 2019](https://support.microsoft.com/help/4520062) or a later monthly rollup update.

#### Notes

- If you install data deduplication before you install the Azure File Sync agent, a restart is required to support data deduplication and cloud tiering on the same volume.
- If you enable data deduplication on a volume after you enable cloud tiering, the initial deduplication optimization job optimizes files on the volume that aren't already tiered. This job has the following impact on cloud tiering:
  - The free-space policy continues to tier files according to the free space on the volume by using the heatmap.
  - The date policy skips tiering of files that might be otherwise eligible for tiering because the deduplication optimization job is accessing the files.
- For ongoing deduplication optimization jobs, the data deduplication [MinimumFileAgeDays](https://learn.microsoft.com/powershell/module/deduplication/set-dedupvolume) setting delays cloud tiering with the data policy, if the file isn't already tiered.
  - For example, if the `MinimumFileAgeDays` setting is 7 days and the data policy for cloud tiering is 30 days, the date policy tiers files after 37 days.
  - After Azure File Sync tiers a file, the deduplication optimization job skips the file.

### Distributed File System

Azure File Sync supports interoperability with DFS Namespaces (DFS-N) and DFS Replication (DFS-R).

#### DFS-N

Azure File Sync works fully with the DFS-N implementation. You can install the Azure File Sync agent on one or more file servers to sync data between the server endpoints and the cloud endpoint. Then, use DFS-N to provide namespace service. For more information, see [DFS Namespaces overview](https://learn.microsoft.com/windows-server/storage/dfs-namespaces/dfs-overview) and [DFS Namespaces with Azure Files](../files/files-manage-namespaces.md).

#### DFS-R

Because DFS-R and Azure File Sync are both replication solutions, replace DFS-R with Azure File Sync in most cases. But use DFS-R and Azure File Sync together in the following scenarios:

- You're migrating from a DFS-R deployment to an Azure File Sync deployment. For more information, see [Migrate a DFS-R deployment to Azure File Sync](file-sync-deployment-guide.md#migrate-a-dfs-r-deployment-to-azure-file-sync).
- Not every on-premises server that needs a copy of your file data can be connected directly to the internet.
- Branch servers consolidate data onto a single hub server, for which you want to use Azure File Sync.

For Azure File Sync and DFS-R to work side by side:

- You must disable Azure File Sync cloud tiering on volumes with DFS-R replicated folders.
- You shouldn't configure server endpoints on DFS-R read-only replication folders.
- Only a single server endpoint can overlap with a DFS-R location. Multiple server endpoints overlapping with other active DFS-R locations might lead to conflicts.

For more information, see [DFS Replication overview](https://learn.microsoft.com/windows-server/storage/dfs-replication/dfs-replication-overview).

### Sysprep

Using Sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. This limitation includes any scenario where you clone or image the server after installing the Azure File Sync agent. Install the agent and register the server after you deploy the server image and complete Sysprep mini-setup. 

### Windows Search

If you enable cloud tiering on a server endpoint, Windows Search skips files that are tiered and doesn't index them. Windows Search indexes non-tiered files properly.

Windows clients cause recalls when they search the file share if you enable the **Always search file names and contents** setting on the client machine. This setting is disabled by default.

### Other HSM solutions

Don't use any other hierarchical storage management (HSM) solutions with Azure File Sync. Other HSM solutions can conflict with Azure File Sync's cloud tiering and might cause data inconsistencies or unexpected behavior.

## Performance and scalability

Because the Azure File Sync agent runs on a Windows Server machine that connects to the Azure file shares, the effective sync performance depends on these factors in your infrastructure:

- Windows Server and the underlying disk configuration
- Network bandwidth between the server and the Azure storage
- File size
- Total dataset size
- Activity on the dataset

Azure File Sync works on the file level. You measure the performance characteristics of a solution based on Azure File Sync by the number of objects (files and directories) processed per second.

For more information, see [Azure File Sync performance metrics](file-sync-scale-targets.md#azure-file-sync-performance-metrics) and [Azure File Sync scale targets](file-sync-scale-targets.md#azure-file-sync-scale-targets).

## Identity

The administrator who registers the server and creates the cloud endpoint must be a member of the management role [Azure File Sync Administrator](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#azure-file-sync-administrator), Owner, or Contributor for the storage sync service. You can configure this role under **Access Control (IAM)** on the Azure portal page for the storage sync service.

Azure File Sync also requires additional storage account permissions for cloud endpoint create and update operations. Users who previously had only storage account read permissions can no longer create or update cloud endpoints.

For non-managed identity deployments, the administrator must have a role that includes:
- Microsoft.Storage/storageAccounts/listKeys/action
- Microsoft.Storage/storageAccounts/ListAccountSas/action
  
For managed identity deployments, ensure the Azure File Sync managed identity or service principal has the required storage account roles, such as Reader and Data Access or Storage File Data Privileged Contributor, as applicable.

When assigning the Azure File Sync Administrator role, follow these steps to ensure least privilege for the role assignments that Azure File Sync creates on the storage account.

1. Under the **Conditions** tab, select **Allow users to assign selected roles to only selected principals (fewer privileges)**.

1. Click **Select Roles and Principals** and then select **Add Action** under Condition #1.

1. Select **Create role assignment**, and then click **Select**.

1. Select **Add expression**, and then select **Request**.

1. Under **Attribute Source**, select **Role Definition Id** under **Attribute**, and then select **ForAnyOfAnyValues:GuidEquals** under **Operator**.

1. Select **Add Roles**. Add **Reader and Data Access**, **Storage File Data Privileged Contributor**, and **Storage Account Contributor** roles, and then select **Save**.

Azure File Sync works with your standard Active Directory-based identity without any special setup beyond setting up sync. When you're using Azure File Sync, the general expectation is that most accesses go through the Azure File Sync caching servers, rather than through the Azure file share. Because the server endpoints are on Windows Server, and Windows Server supports Active Directory and Windows-style ACLs, you don't need anything beyond ensuring that the Windows file servers registered with the storage sync service are domain joined. Azure File Sync stores ACLs on the files in the Azure file share, and it replicates those ACLs to all server endpoints.

Even though changes made directly to the Azure file share take longer to sync to the server endpoints in the sync group, you might also want to ensure that you can enforce your Active Directory permissions on your file share directly in the cloud. To do this configuration, you must domain join your storage account to your on-premises Active Directory instance, just like how your Windows file servers are domain joined. To learn more about domain joining your storage account to a customer-owned Active Directory instance, see [Overview of Azure Files identity-based authentication for SMB access](../files/storage-files-active-directory-overview.md?toc=/azure/storage/filesync/toc.json).

> **Important:**
> Domain joining your storage account to Active Directory isn't required to successfully deploy Azure File Sync. It's an optional step that allows the Azure file share to enforce on-premises ACLs when users mount the Azure file share directly.

## Networks

The Azure File Sync agent communicates with your storage sync service and Azure file share by using the Azure File Sync REST protocol and the FileREST protocol. Both of these protocols always use HTTPS over port 443. SMB is never used to upload or download data between your Windows Server instance and the Azure file share. Because most organizations allow HTTPS traffic over port 443 as a requirement for visiting most websites, a special network configuration is usually not required to deploy Azure File Sync.

> **Important:**
> Azure File Sync doesn't support internet routing. Azure File Sync supports the default network routing option, Microsoft routing.

Based on your organization's policy or unique regulatory requirements, you might require more restrictive communication with Azure. Azure File Sync provides several mechanisms for you to configure networks. Based on your requirements, you can:

- Tunnel sync and file upload/download traffic over Azure ExpressRoute or an Azure virtual private network (VPN).
- Make use of Azure Files and Azure network features, such as service endpoints and private endpoints.
- Configure Azure File Sync to support your proxy in your environment.
- Throttle network activity from Azure File Sync.

If you want to communicate with your Azure file share over SMB but port 445 is blocked, consider using SMB over QUIC. This method offers a zero-configuration VPN for SMB access to your Azure file shares through the QUIC transport protocol over port 443. Although Azure Files doesn't directly support SMB over QUIC, you can create a lightweight cache of your Azure file shares on a Windows Server Datacenter: Azure Edition VM by using Azure File Sync. To learn more about this option, see [SMB over QUIC](file-sync-networking-overview.md#smb-over-quic).

To learn more about Azure File Sync and networks, see [Networking considerations for Azure File Sync](file-sync-networking-overview.md).

> **Important:**
> Don't hardcode a storage account's IP address in hosts files, DNS, or firewall rules. During failover or when an account is migrated to another tenant or region, an Azure Storage Account's IP addresses can change. A stale IP breaks connectivity, causing sync failures and preventing file recall. Let the agent resolve the endpoint via DNS or use a [private endpoint](file-sync-networking-endpoints.md) with its private DNS zone if you need private routing.


## Encryption

Azure File Sync offers three layers of encryption: encryption on the at-rest storage of Windows Server, encryption in transit between the Azure File Sync agent and Azure, and encryption at rest for your data in the Azure file share.

### Windows Server encryption at rest

Two strategies for encrypting data on Windows Server work generally with Azure File Sync:

- Encryption beneath the file system, such that the file system and all of the data written to it are encrypted
- Encryption within the file format itself

These methods aren't mutually exclusive. You can choose to use them together because the purpose of encryption is different.

To provide encryption beneath the file system, Windows Server provides a BitLocker inbox. BitLocker is fully transparent to Azure File Sync. The primary reasons to use an encryption mechanism like BitLocker are:

- Prevent physical exfiltration of data from your on-premises datacenter by someone stealing the disks
- Prevent sideloading an unauthorized OS to perform unauthorized reads and writes to your data

To learn more, see [BitLocker overview](https://learn.microsoft.com/windows/security/information-protection/bitlocker/bitlocker-overview).

Partner products that work similarly to BitLocker, in that they sit beneath the NTFS volume, should work fully and transparently with Azure File Sync.

The other main method for encrypting data is to encrypt the file's data stream when the application saves the file. Some applications might do this task natively, but they usually don't.

Example methods for encrypting the file's data stream are Azure Information Protection, Azure Rights Management (Azure RMS), and Active Directory Rights Management Services. The primary reason to use an encryption mechanism like Azure Information Protection or Azure RMS is to prevent exfiltration of data from your file share by people who copy it to alternate locations (like a flash drive) or email it to an unauthorized person. When a file's data stream is encrypted as part of the file format, this file continues to be encrypted on the Azure file share.

Azure File Sync doesn't interoperate with NTFS Encrypted File System or partner encryption solutions that sit above the file system but below the file's data stream.

### Encryption in transit

The Azure File Sync agent communicates with your storage sync service and Azure file share by using the Azure File Sync REST protocol and the FileREST protocol. Both of these protocols always use HTTPS over port 443. Azure File Sync doesn't send unencrypted requests over HTTP.

Azure storage accounts contain a switch for requiring encryption in transit. This switch is enabled by default. Even if the switch at the storage account level is disabled and unencrypted connections to your Azure file shares are possible, Azure File Sync still uses only encrypted channels to access your file share.

The primary reason to disable encryption in transit for the storage account is to support a legacy application that communicates directly with Azure file share. Such an application must be run on an older operating system, such as Windows Server 2008 R2 or an older Linux distribution. If the legacy application connects to the Windows Server cache of the file share, changing this setting has no effect.

Enable encryption of data in transit. For more information about encryption in transit, see [Require secure transfer to ensure secure connections](../common/storage-require-secure-transfer.md?toc=/azure/storage/files/toc.json).

> **Note:**
> The Azure File Sync service removed support for TLS 1.0 and 1.1 on August 1, 2020. All supported Azure File Sync agent versions already use TLS 1.2 by default. You might be using an earlier version of TLS if you disabled TLS 1.2 on your server or if you use a proxy.
>
> If you use a proxy, check the proxy configuration. Azure File Sync service regions added after May 1, 2020, support only TLS 1.2. For more information, see the [troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-cloud-tiering?toc=/azure/storage/file-sync/toc.json#tls-12-required-for-azure-file-sync).

### Azure file share encryption at rest


Azure Files uses the same encryption scheme as the other Azure storage services, such as Azure Blob Storage. All data stored in Azure Files is encrypted at rest through [service-side encryption (SSE)](../common/storage-service-encryption.md?toc=%2fazure%2fstorage%2ffiles%2ftoc.json), which works similarly to BitLocker on Windows.

Because data is encrypted beneath the Azure file share's file system, as it's encoded to disk, you don't need access to the underlying key on the client to read or write to the Azure file share. Encryption at rest applies to both the SMB and NFS protocols.

By default, data stored in Azure Files is encrypted with Microsoft-managed keys. With Microsoft-managed keys, Microsoft holds the keys to encrypt and decrypt the data. Microsoft is responsible for rotating these keys regularly.

For Azure classic file shares, you can choose to encrypt your data using [customer-managed keys](../files/customer-managed-keys.md). If you choose customer-managed keys, Azure Files is authorized to access your keys to fulfill read and write requests from your clients. With customer-managed keys, you can revoke this authorization at any time. But without this authorization, your Azure file share is no longer accessible via SMB or the FileREST API.


## Storage tiers

Azure Files offers two media tiers of storage: solid-state disk (SSD) and hard disk drive (HDD). These tiers allow you to tailor your shares to the performance and price requirements of your scenario:

- **SSD (premium)**: SSD file shares provide consistent high performance and low latency, within single-digit milliseconds for most I/O operations, for I/O-intensive workloads. SSD file shares are suitable for a wide variety of workloads, like databases, website hosting, and development environments.

  You can use SSD file shares with both the SMB and NFS protocols. SSD file shares are available in the [provisioned v2](../files/understanding-billing.md#provisioned-v2-model) and [provisioned v1](../files/understanding-billing.md#provisioned-v1-model) billing models. SSD file shares offer a [higher availability SLA](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services) than HDD file shares.

- **HDD (standard)**: HDD file shares provide a cost-effective storage option for general-purpose file shares. HDD file shares are available with the [provisioned v2](../files/understanding-billing.md#provisioned-v2-model) and [pay-as-you-go](../files/understanding-billing.md#pay-as-you-go-model) billing models, although we recommend the provisioned v2 model for new deployments of file shares. For information about the SLA, see the [Azure SLA page for online services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services).

When you're selecting a media tier for your workload, consider your performance and usage requirements. If your workload requires single-digit latency, or you're using SSD storage media on-premises, SSD file shares are probably the best fit. If low latency isn't as much of a concern, HDD file shares might be a better fit from a cost perspective. For example, low-latency might be less of a concern with team shares mounted on-premises from Azure or cached on-premises through Azure File Sync.

After you create a file share in a storage account, you can't directly move it to a different media tier. For example, to move an HDD file share to the SSD media tier, you must create a new SSD file share and [copy the data from your original share to the new file share](../files/migrate-files-between-shares.md).

You can find more information about the SSD and HDD media tiers in [Understand Azure Files billing models](../files/understanding-billing.md) and [Understand and optimize Azure file share performance](../files/understand-performance.md).


## Azure File Sync region availability

For regional availability, see [Product availability by region](https://azure.microsoft.com/explore/global-infrastructure/products-by-region/table) and search for **Storage Accounts**.

The following regions require you to request access to Azure Storage before you can use Azure File Sync:

- France South
- South Africa West
- UAE Central

To request access for these regions, follow the process in [this article](https://learn.microsoft.com/troubleshoot/azure/general/region-access-request-process).

## Redundancy

To help protect data in your Azure file shares against data loss or corruption, Azure Files stores multiple copies of each file as they're written. Depending on your requirements, you can select degrees of redundancy. Azure Files currently supports the following options for data redundancy:

- **Locally redundant storage (LRS)**: With local redundancy, every file is stored three times in an Azure storage cluster. This approach helps protect against data loss due to hardware faults, such as a bad disk drive. However, if a disaster such as fire or flooding occurs in the datacenter, all replicas of a storage account that uses LRS might be lost or unrecoverable.
- **Zone-redundant storage (ZRS)**: With zone redundancy, three copies of each file are stored. However, these copies are physically isolated in three distinct storage clusters in Azure *availability zones*. Availability zones are unique physical locations in an Azure region. Each zone consists of one or more datacenters equipped with independent power, cooling, and networking. A write to storage isn't accepted until it's written to the storage clusters in all three availability zones.
- **Geo-redundant storage (GRS)**: With geo redundancy, you have a primary region and a secondary region. Files are stored three times in an Azure storage cluster in the primary region. Writes are asynchronously replicated to a Microsoft-defined secondary region.

  Geo redundancy provides six copies of your data spread between the two Azure regions. If a major disaster occurs, such as the permanent loss of an Azure region due to a natural disaster or other similar event, Microsoft performs a failover. In this case, the secondary becomes the primary and serves all operations.
  
  Because the replication between the primary and secondary regions is asynchronous, if a major disaster occurs, data not yet replicated to the secondary region is lost. You can also perform a manual failover of a geo-redundant storage account.
- **Geo-zone-redundant storage (GZRS)**: With geo-zone redundancy, files are stored three times across three distinct storage clusters in the primary region. All writes are then asynchronously replicated to a Microsoft-defined secondary region. The failover process for geo-zone redundancy works the same as it does for geo redundancy.

HDD file shares support all four redundancy types. SSD file shares support only LRS and ZRS.

Pay-as-you-go storage accounts provide two other redundancy options that Azure Files doesn't support: read-access geo-redundant storage (RA-GRS) and read-access geo-zone-redundant storage (RA-GZRS). You can provision Azure file shares in storage accounts with these options set, but Azure Files doesn't support reading from the secondary region. Azure file shares deployed into RA-GRS or RA-GZRS storage accounts are billed as geo redundant or geo-zone redundant, respectively.


> **Important:**
> Geo-redundant and geo-zone-redundant storage can manually fail over storage to the secondary region. Don't use this approach (outside a disaster) when you're using Azure File Sync because of the increased likelihood of data loss. If a disaster occurs and you want to initiate a manual failover of storage, you need to open a support case with Microsoft to get Azure File Sync to resume sync with the secondary endpoint.

## Migration

If you have an existing file server in Windows Server 2016 or newer, you can directly install Azure File Sync in place. You don't need to move data to a new server.

If you plan to migrate to a new Windows file server as a part of adopting Azure File Sync, or if your data is currently located on NAS, there are several possible migration approaches to use Azure File Sync with this data. Which migration approach you should choose depends on where your data currently resides.

For detailed guidance, see [Migrate to SMB Azure file shares](../files/storage-files-migration-overview.md?toc=/azure/storage/filesync/toc.json).

## Antivirus

Because antivirus software works by scanning files for known malicious code, an antivirus product might cause the recall of tiered files and high egress charges. Tiered files have the secure Windows attribute `FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS` set. Consult with your software vendor to learn how to configure its solution to skip reading files that have this attribute set. Many vendors handle this automatically.

During on-demand scans, antivirus solutions Microsoft Defender and System Center Endpoint Protection automatically skip reading files that have this attribute set. We tested them and identified one minor issue: when you add a server to an existing sync group, files smaller than 800 bytes are recalled (downloaded) on the new server. These files remain on the new server and aren't tiered because they don't meet the tiering size requirement (more than 64 KiB).

> **Note:**
> Microsoft Defender and System Center Endpoint Protection only skip reading during on-demand scans. This rule doesn't apply to real-time protection (RTP).

Antivirus vendors can check compatibility between their products and Azure File Sync by using the [Azure File Sync Antivirus Compatibility Test Suite](https://www.microsoft.com/download/details.aspx?id=58322) in the Microsoft Download Center.

## Backup

If you enable cloud tiering, don't use solutions that directly back up the server endpoint or a VM that contains the server endpoint.

Cloud tiering causes only a subset of your data to be stored on the server endpoint. The full dataset resides in your Azure file share. Depending on the backup solution that you use, tiered files are either:

- Skipped and not backed up, because they have the `FILE_ATTRIBUTE_RECALL_ON_DATA_ACCESS` attribute set
- Recalled to disk, which results in high egress charges

Use a cloud backup solution to back up the Azure file share directly. For more information, see [About Azure Files backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/azure-file-share-backup-overview.md?toc=/azure/storage/files/toc.json). Or ask your backup provider if it supports backing up Azure file shares.

If you prefer to use an on-premises backup solution, perform the backups on a server in the sync group that has cloud tiering disabled. Make sure there are no tiered files.

When you perform a restore, use the volume-level or file-level restore option. Files restored through the file-level restore option are synced to all endpoints in the sync group. Existing files are replaced with the version restored from backup. Volume-level restores don't replace newer file versions in the Azure file share or other server endpoints.

> **Note:**
> Bare-metal restore, VM restore, system restore (Windows built-in OS restore), and file-level restore with its tiered version can cause unexpected results. (File-level restore happens when backup software backs up a tiered file instead of a full file.) They aren't currently supported when cloud tiering is enabled.
>
> Volume Shadow Copy Service (VSS) snapshots, including the **Previous Versions** tab, are supported on volumes that have cloud tiering enabled. However, you must enable previous-version compatibility through PowerShell. [Learn how](file-sync-deployment-guide.md#optional-use-self-service-restore-through-previous-versions-and-vss).

## Data classification

If you install data-classification software, enabling cloud tiering increases costs for two reasons:

- With cloud tiering enabled, your hottest files are cached locally. Your coolest files are tiered to the Azure file share in the cloud. If your data classification regularly scans all files in the file share, the files tiered to the cloud must be recalled whenever they're scanned.
- If the data classification software uses the metadata in the data stream of a file, the file must be fully recalled for the software to detect the classification.

These increases, in both the number of recalls and the amount of data being recalled, can increase costs.

## Azure File Sync agent update policy

The Azure File Sync agent is updated regularly to add new functionality and to address issues. We recommend updating the Azure File Sync agent as new versions are available.

#### Major vs. minor agent versions

- Major agent versions often contain new features and have an increasing number as the first part of the version number. For example: 18.0.0.0.
- Minor agent versions are also called *patches* and are released more frequently than major versions. They often contain bug fixes and smaller improvements but no new features. For example: 18.2.0.0.

#### Update paths

There are five approved and tested ways to install the Azure File Sync agent updates:

- **Use the Azure File Sync automatic update feature to install agent updates**: The Azure File Sync agent is automatically updated. You can select to install the latest agent version when it's available or update when the currently installed agent is near expiration. To learn more, see the next section, [Automatic management of the agent lifecycle](#automatic-management-of-the-agent-lifecycle).
- **Configure Microsoft Update to automatically download and install agent updates**: We recommend installing every Azure File Sync update to ensure that you have access to the latest fixes for the server agent. Microsoft Update makes this process seamless by automatically downloading and installing updates for you.
- **Use AfsUpdater.exe to download and install agent updates**: The `AfsUpdater.exe` file is located in the agent installation directory. Double-click the executable file to download and install agent updates. Depending on the release version, you might need to restart the server.
- **Patch an existing Azure File Sync agent by using a Microsoft Update patch file or an .msp executable file**: You can download the latest Azure File Sync update package from the [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/Search.aspx?q=Azure%20File%20Sync). Running an .msp executable file updates your Azure File Sync installation with the same method that Microsoft Update uses automatically. Applying a Microsoft Update patch performs an in-place update of an Azure File Sync installation.
- **Download the newest Azure File Sync agent installer**: You can get the installer in the [Microsoft Download Center](https://go.microsoft.com/fwlink/?linkid=858257). To update an existing Azure File Sync agent installation, uninstall the older version and then install the latest version from the downloaded installer. Agent settings (for example, server registration and server endpoints) are maintained when the Azure File Sync agent is uninstalled.

> **Note:**
> The downgrade of Azure File Sync agent isn't supported. New versions often include breaking changes when they're compared to the old versions, making the downgrade process unsupported. If you encounter any problems with your current agent version, contact support or update to the latest available release.

#### Automatic management of the agent lifecycle

The Azure File Sync agent is updated automatically. You can select either of the following modes and specify a maintenance window in which the update is attempted on the server. This feature is designed to help you with agent lifecycle management by either providing a guardrail that prevents your agent from expiration or allowing for a no-hassle, stay-current setting.

- The default setting attempts to prevent the agent from expiring. Within 21 days of the posted expiration date of an agent, the agent attempts to self-update. It starts an update attempt once a week within 21 days before expiration and in the selected maintenance window. Note that this option doesn't eliminate the need for taking regular Microsoft Update patches.

- You can select that the agent automatically updates itself as soon as a new agent version becomes available. This ability is currently not applicable to clustered servers.

  This update occurs during the selected maintenance window and allows your server to benefit from new features and improvements as soon as they become generally available. This recommended, worry-free setting provides major agent versions and regular update patches to your server. Every agent released is at GA quality.
  
  If you select this option, Microsoft flights the newest agent version to you. Clustered servers are excluded. After flighting is complete, the agent also becomes available in Microsoft Update and the [Microsoft Download Center](https://go.microsoft.com/fwlink/?linkid=858257).

##### Change the automatic update setting

The following instructions describe how to change the settings after you complete the installer, if you need to make changes.

Open a PowerShell console and go to the directory where you installed the sync agent, and then import the server cmdlets. By default, this action looks something like the following example:

```powershell
cd 'C:\Program Files\Azure\StorageSyncAgent'
Import-Module -Name .\StorageSync.Management.ServerCmdlets.dll
```

You can run `Get-StorageSyncAgentAutoUpdatePolicy` to check the current policy setting and determine if you want to change it.

To change the current policy setting to the delayed update track, you can use:

```powershell
Set-StorageSyncAgentAutoUpdatePolicy -PolicyMode UpdateBeforeExpiration
```

To change the current policy setting to the immediate update track, you can use:

```powershell
Set-StorageSyncAgentAutoUpdatePolicy -PolicyMode InstallLatest -Day <day> -Hour <hour>
```

> **Note:**
> If flighting is already completed for the latest agent version and the agent's automatic update policy is changed to `InstallLatest`, the agent isn't automatically updated until the next agent version is flighted. To update to an agent version that finished flighting, use Microsoft Update or `AfsUpdater.exe`. To check if an agent version is currently flighting, check the [Supported versions](https://learn.microsoft.com/azure/storage/file-sync/file-sync-release-notes#supported-versions) section in the release notes.

#### Agent lifecycle and change management guarantees

Azure File Sync is a cloud service that continuously introduces new features and improvements. A specific Azure File Sync agent version can be supported for only a limited time. To facilitate your deployment, the following rules guarantee that you have enough time and notification to accommodate agent updates in your change management process:

- Major agent versions are supported for at least 12 months from the date of initial release.
- There's an overlap of at least 3 months between the support of major agent versions.
- Warnings are issued for registered servers through a soon-to-be expired agent at least 3 months before expiration. You can check if a registered server is using an older version of the agent in the section about registered servers in a storage sync service.
- The lifetime of a minor agent version is bound to the associated major version. For example, when agent version 18.0.0.0 is set to expire, agent versions 18.\*.\*.\* all expire together.

> **Note:**
> Installing an expired agent version displays a warning but succeeds. Attempting to install or connect with an expired agent version isn't supported and is blocked.


## Related content

- [Azure File Sync proxy and firewall settings](file-sync-firewall-and-proxy.md)
- [Create an SMB Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md?toc=/azure/storage/filesync/toc.json)
- [Deploy Azure File Sync](file-sync-deployment-guide.md)
- [Monitor Azure File Sync](file-sync-monitoring.md)
