---
title: On-premises NAS migration to Azure File Sync
description: Learn how to migrate SMB file shares from on-premises Network Attached Storage (NAS) to a hybrid cloud deployment with Azure File Sync and Azure file shares.
author: khdownie
ms.service: azure-file-storage
ms.topic: how-to
ms.date: 01/25/2024
ms.author: kendownie
# Customer intent: As a systems administrator, I want to migrate SMB file shares from on-premises NAS to a Windows Server using Azure File Sync, so that I can enable a hybrid cloud deployment while ensuring data integrity and minimizing downtime during the process.
---

# Migrate from Network Attached Storage (NAS) to a hybrid cloud deployment with Azure File Sync

:heavy_check_mark: **Applies to:** Classic SMB file shares created with the Microsoft.Storage resource provider

:heavy_multiplication_x: **Doesn't apply to:** All NFS file shares including file shares created with the Microsoft.FileShares resource provider or classic file shares created with the Microsoft.Storage resource provider

This migration article is one of several involving NAS and Azure File Sync. Check if this article applies to your scenario:

> 
> * Data source: Network Attached Storage (NAS)
> * Migration route: NAS &rArr; Windows Server &rArr; upload and sync with Azure file share(s)
> * Caching files on-premises: Yes, the final goal is an Azure File Sync deployment.

If your scenario is different, look through the [table of migration guides](storage-files-migration-overview.md#migration-guides).

Azure File Sync works on Direct Attached Storage (DAS) locations and doesn't support sync to Network Attached Storage (NAS) locations. This fact makes a migration of your files necessary, and this article guides you through such a migration.

## NAS to Azure File Sync migration goals

The goal is to move the SMB file shares on your NAS appliance to a Windows Server, then use Azure File Sync for a hybrid cloud deployment. Generally, you need to migrate in a way that guarantees the integrity of the production data and its availability during the migration. The latter requirement means keeping downtime to a minimum, so that it fits into or only slightly exceeds regular maintenance windows.

## Migration overview

As mentioned in [Migrate to SMB Azure file shares](storage-files-migration-overview.md), using the correct copy tool and approach is important. Your NAS appliance is exposing SMB shares directly on your local network. You can either use Azure Storage Mover or RoboCopy to move your files.

- Phase 1: [Identify how many Azure file shares you need](#phase-1-identify-how-many-azure-file-shares-you-need)
- Phase 2: [Provision a suitable Windows Server on-premises](#phase-2-provision-a-suitable-windows-server-on-premises)
- Phase 3: [Deploy the Azure File Sync cloud resource](#phase-3-deploy-the-azure-file-sync-cloud-resource)
- Phase 4: [Deploy Azure storage resources](#phase-4-deploy-azure-storage-resources)
- Phase 5: [Deploy the Azure File Sync agent](#phase-5-deploy-the-azure-file-sync-agent)
- Phase 6: [Configure Azure File Sync on the Windows Server](#phase-6-configure-azure-file-sync-on-the-windows-server)
- Phase 7: [Copy data using Azure Storage Mover or RoboCopy](#phase-7-copy-data-using-azure-storage-mover-or-robocopy)
- Phase 8: [User cut-over](#phase-8-user-cut-over)

## Phase 1: Identify how many Azure file shares you need


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





## Phase 2: Provision a suitable Windows Server on-premises

* Create a Windows Server virtual machine, or deploy a physical server. A Windows Server failover cluster is also supported.
* Provision or add Direct Attached Storage (DAS as compared to NAS, which isn't supported).

    The amount of storage you provision can be smaller than what you're currently using on your NAS appliance. This configuration choice requires that you also make use of Azure File Sync's [cloud tiering](../file-sync/file-sync-cloud-tiering-overview.md) feature.
    However, when you copy your files from the larger NAS space to the smaller Windows Server volume in a later phase, you'll need to work in batches:

    1. Move a set of files that fits onto the disk
    2. Let file sync and cloud tiering engage
    3. When more free space is created on the volume, proceed with the next batch of files. Alternatively, review the RoboCopy command in the [RoboCopy section](#phase-7-copy-data-using-azure-storage-mover-or-robocopy) of this article for use of the new `/LFSM` switch. Using `/LFSM` can significantly simplify your RoboCopy jobs, but it isn't compatible with some other RoboCopy switches you might depend on. Only use the `/LFSM` switch when the migration destination is local storage. It's not supported when the destination is a remote SMB share.
    
    You can avoid this batching approach by provisioning the equivalent space on the Windows Server that your files occupy on the NAS appliance. Consider deduplication on NAS / Windows. If you don't want to permanently commit this high amount of storage to your Windows Server, you can reduce the volume size after the migration and before you adjust the cloud tiering policies. That creates a smaller on-premises cache of your Azure file shares.

The resource configuration (compute and RAM) of the Windows Server you deploy depends mostly on the number of items (files and folders) you're syncing. Use a higher performance configuration if you have any concerns.

[Learn how to size a Windows Server based on the number of items (files and folders) you need to sync.](../file-sync/file-sync-planning.md#recommended-system-resources)

> **Note:**
> The previously linked article presents a table with a range for server memory (RAM). You can orient towards the smaller number for your server but expect that initial sync can take significantly more time.

## Phase 3: Deploy the Azure File Sync cloud resource


The core resource to configure for Azure File Sync is called a *Storage Sync Service*. We recommend that you deploy only one for all servers that are syncing the same set of files now or in the future. Create multiple Storage Sync Services only if you have distinct sets of servers that must never exchange data. For example, you might have servers that must never sync the same Azure file share. Otherwise, using a single Storage Sync Service is the best practice.

Choose an Azure region for your Storage Sync Service that's close to your location. All other cloud resources must be deployed in the same region. To simplify management, create a new resource group in your subscription that houses sync and storage resources.

For more information, see the [section about deploying the Storage Sync Service](../file-sync/file-sync-deployment-guide.md#deploy-the-storage-sync-service) in the article about deploying Azure File Sync. Follow only this section of the article. There will be links to other sections of the article in later steps.

## Phase 4: Deploy Azure storage resources

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

## Phase 5: Deploy the Azure File Sync agent


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


## Phase 6: Configure Azure File Sync on the Windows Server

Your registered on-premises Windows Server must be ready and connected to the internet for this process.


This step ties together all the resources and folders you've set up on your Windows Server instance during the previous steps.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Locate your Storage Sync Service resource.
1. Create a new *sync group* within the Storage Sync Service resource for each Azure file share. In Azure File Sync terminology, the Azure file share will become a *cloud endpoint* in the sync topology that you're describing with the creation of a sync group. When you create the sync group, give it a familiar name so that you recognize which set of files syncs there. Make sure you reference the Azure file share with a matching name.
1. After you create the sync group, a row for it will appear in the list of sync groups. Select the name (a link) to display the contents of the sync group. You'll see your Azure file share under **Cloud endpoints**.
1. Locate the **Add Server Endpoint** button. The folder on the local server that you've provisioned will become the path for this *server endpoint*.


> **Important:**
> Cloud tiering is the Azure File Sync feature that allows the local server to have less storage capacity than is stored in the cloud, yet have the full namespace available. Locally interesting (hot) data is also cached locally for fast access performance. Cloud tiering is an optional feature per Azure File Sync server endpoint.

> **Warning:**
> If you provisioned less storage on your Windows server volume(s) than your data used on the NAS appliance, then cloud tiering is mandatory. If you don't turn on cloud tiering, your server won't free up space to store all files. Set your tiering policy, temporarily for the migration, to 99% volume free space. Be sure to return to your cloud tiering settings after the migration is complete, and set it to a more long-term useful level.

Repeat the steps of sync group creation and addition of the matching server folder as a server endpoint for all Azure file shares and server locations that need to be configured for sync.

After the creation of all server endpoints, sync is working. You can create a test file and see it sync up from your server location to the connected Azure file share (as described by the cloud endpoint in the sync group).

Both locations, the server folders and the Azure file shares, are otherwise empty and awaiting data in either location. In the next step, you begin to copy files into the Windows Server for Azure File Sync to move them up to the cloud. If you enable cloud tiering, the server then begins to tier files if you run out of capacity on the local volumes.

## Phase 7: Copy data using Azure Storage Mover or RoboCopy

Now you can use Azure Storage Mover or RoboCopy to copy data from your NAS appliance to your Windows Server, and use Azure File Sync to move the data to Azure file shares. This guide uses RoboCopy for the initial copy. To use Azure Storage Mover instead, see [Migrate to Azure file shares using Azure Storage Mover](migrate-files-storage-mover.md).

Run the first local copy to your Windows Server target folder:

* Identify the first location on your NAS appliance.
* Identify the matching folder on the Windows Server that already has Azure File Sync configured on it.
* Start the copy.

The following RoboCopy command copies files from your NAS storage to your Windows Server target folder. The Windows Server syncs it to the Azure file shares. 

If you provision less storage on your Windows Server than your files take up on the NAS appliance, you configure cloud tiering. As the local Windows Server volume gets full, [cloud tiering](../file-sync/file-sync-cloud-tiering-overview.md) engages and tiers files that are already synced. Cloud tiering generates enough space to continue the copy from the NAS appliance. Cloud tiering checks once an hour to see what is synced and to free up disk space to reach the 99% volume free space.

It's possible that RoboCopy moves files faster than you can sync to the cloud and tier locally, thus running out of local disk space. In this case, RoboCopy fails. Work through the shares in a sequence that prevents this (for example, don't start copy jobs for all shares at the same time, or only move shares that fit on the current amount of free space on the Windows Server).


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


## Phase 8: User cut-over

When you run the RoboCopy command for the first time, your users and applications are still accessing files on the NAS and can potentially change them. It's possible that RoboCopy has processed a directory, moves on to the next, and then a user on the source location (NAS) adds, changes, or deletes a file that will now not be processed in this current RoboCopy run. This behavior is expected.

The first run is about moving the bulk of the data to your Windows Server and into the cloud via Azure File Sync. This first copy can take a long time, depending on:

* your download bandwidth
* the upload bandwidth
* the local network speed and how optimally the number of RoboCopy threads matches it
* the number of items (files and folders) that need to be processed by RoboCopy and Azure File Sync

After the initial run completes, run the command again.

The second time it will finish faster, because it only needs to transport changes that happened since the last run. During this second run, new changes can still accumulate.

Repeat this process until the amount of time it takes to complete a RoboCopy for a specific location is within your acceptable window for downtime.

Next, remove user access to your NAS-based shares. You can do that by any steps that prevent users from changing the file and folder structure and content. An example is to point your DFS-Namespace to a non-existing location, or change the root ACLs on the share.

Run one last RoboCopy round. It picks up any changes that might have been missed. How long this final step takes depends on the speed of the RoboCopy scan. You can estimate the time (which is equal to your downtime) by measuring how long the previous run took.

Create a share on the Windows Server folder. If needed, adjust your DFS-N deployment to point to it. Set the same share-level permissions as on your NAS SMB share. If your NAS was domain-joined, user SIDs automatically match because the users exist in Active Directory and RoboCopy preserves files and metadata at full fidelity. If your NAS used local users instead, re-create those users as Windows Server local users, then map the original SIDs (which RoboCopy preserved) to the new users' SIDs on Windows Server.

You finish migrating a share or group of shares into a common root or volume, depending on your mapping from Phase 1.

You can try to run a few of these copies in parallel. Process one Azure file share at a time.

> **Warning:**
> After you move all the data from your NAS to the Windows Server and your migration is complete: Return to ***all***  sync groups in the Azure portal, and adjust the cloud tiering volume free space percent value to something better suited for cache utilization, such as 20%.

The cloud tiering volume free space policy applies at the volume level, even when multiple server endpoints share the same volume. If you adjust the policy on only some endpoints and leave others at 99%, sync uses the most restrictive rule and keeps 99% free space, making the local cache ineffective. Adjust all server endpoints on the volume, unless your goal is purely archival access (namespace only with no local caching).

## Troubleshoot common migration issues

The most likely issue you can run into is that the RoboCopy command fails with *"Volume full"* on the Windows Server side. Cloud tiering acts once every hour to evacuate content from the local Windows Server disk that has synced. Its goal is to reach your 99% free space on the volume.

Let sync progress and cloud tiering free up disk space. You can observe that in File Explorer on your Windows Server.

When your Windows Server has sufficient available capacity, rerunning the command will resolve the problem. Nothing breaks when you get into this situation, and you can move forward with confidence. Inconvenience of running the command again is the only consequence.

Check the link in the following section for troubleshooting Azure File Sync issues.

## Next steps

The following articles will help you understand deployment options, best practices, and troubleshooting steps.

* [Azure File Sync overview](../file-sync/file-sync-introduction.md)
* [Deploy Azure File Sync](../file-sync/file-sync-deployment-guide.md)
* [Azure File Sync troubleshooting](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json)
