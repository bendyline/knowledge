---
title: Release Notes for Azure File Sync
description: Learn about the latest features, bug fixes, and supported agent versions in Azure File Sync release notes.
services: storage
author: wmgries
ms.service: azure-file-storage
ms.topic: release-notes
ms.date: 07/22/2026
ms.author: wgries
ms.custom:
  - build-2025
# Customer intent: "As a cloud administrator, I want to review the latest release notes for Azure File Sync so that I can stay informed about new features, bug fixes, and support status for proper planning and management of my file storage deployments."
---

# Release notes for Azure File Sync

This article provides the release notes for Azure File Sync. Major releases of Azure File Sync include service and agent improvements, such as version 22.0.0.0. Minor releases typically include agent improvements, such as version 22.3.0.0.

## Supported versions

The following Azure File Sync agent versions are supported:

| Milestone | Agent version number | Release date | Status |
| --- | --- | --- | --- |
| v23.1 Release - [KB5072939](https://support.microsoft.com/kb/5072939) | 23.1.0.0 | September 1, 2026 | Supported |
| v22.4 Release - [KB5104852](https://support.microsoft.com/topic/e0e7c277-cf1b-4c65-b0b2-4f697d260bf0) | 22.4.0.0 | June 22, 2026 | Supported |
| v22.3 Release - [KB5087090](https://support.microsoft.com/topic/e56f2bc6-30f3-42b6-93b3-a89429cdb88c) | 22.3.0.0 | April 17, 2026 | Supported |
| v22 Release - [KB5056967](https://support.microsoft.com/topic/ded35c33-ff9c-4716-8a8d-a080d1bc067b) | 22.0.0.0 | December 10, 2025 | Supported |
| v21.2 Release - [KB5063825](https://support.microsoft.com/topic/6490aef8-ebae-465d-beba-718c05f8a71f) | 21.2.0.0 | July 08, 2025 | Supported |
| v21.1 Release - [KB5063486](https://support.microsoft.com/topic/e0016f74-573d-492c-8bf7-c3be1e380836) | 21.1.0.0 | August 11, 2025 | Supported - Security Update |
| v20.1 Release - [KB5056953](https://support.microsoft.com/topic/6a558f5d-005d-4111-9ebd-21e5dd652d77) | 20.1.0.0 | August 11, 2025 | Supported - Security Update - Agent version will expire on Oct 29,2026 |
| v20 Release - [KB5041884](https://support.microsoft.com/topic/b92c9c6f-8232-42d3-a3e0-e6df1fce0f5e) | 20.0.0.0 | February 10, 2025 | Supported - Agent version expires on Oct 29, 2026 |

## Unsupported versions

The following Azure File Sync agent versions have expired and are no longer supported:

| Milestone | Agent version number | Release date | Status |
| --- | --- | --- | --- |
| V19 Release | 19.0.0.0 - 19.2.0.0 | N/A | Not Supported - Agent versions expired on June 19, 2026 |
| V18 Release | 18.0.0.0 - 18.3.0.0 | N/A | Not Supported - Agent versions expired on June 19, 2026 |
| V17 Release | 17.0.0.0 - 17.2.0.0 | N/A | Not Supported - Agent versions expired on June 9, 2025 |
| V16 Release | 16.0.0.0 - 16.2.0.0 | N/A | Not Supported - Agent versions expired on October 7, 2024 |
| V15 Release | 15.0.0.0 - 15.2.0.0 | N/A | Not Supported - Agent versions expired on March 19, 2024 |
| V14 Release | 14.0.0.0 | N/A | Not Supported - Agent versions expired on February 8, 2024 |
| V13 Release | 13.0.0.0 | N/A | Not Supported - Agent versions expired on August 8, 2022 |
| V12 Release | 12.0.0.0 - 12.1.0.0 | N/A | Not Supported - Agent versions expired on May 23, 2022 |
| V11 Release | 11.1.0.0 - 11.3.0.0 | N/A | Not Supported - Agent versions expired on March 28, 2022 |
| V10 Release | 10.0.0.0 - 10.1.0.0 | N/A | Not Supported - Agent versions expired on June 28, 2021 |
| V9 Release | 9.0.0.0 - 9.1.0.0 | N/A | Not Supported - Agent versions expired on February 16, 2021 |
| V8 Release | 8.0.0.0 | N/A | Not Supported - Agent versions expired on January 12, 2021 |
| V7 Release | 7.0.0.0 - 7.2.0.0 | N/A | Not Supported - Agent versions expired on September 1, 2020 |
| V6 Release | 6.0.0.0 - 6.3.0.0 | N/A | Not Supported - Agent versions expired on April 21, 2020 |
| V5 Release | 5.0.2.0 - 5.2.0.0 | N/A | Not Supported - Agent versions expired on March 18, 2020 |
| V4 Release | 4.0.1.0 - 4.3.0.0 | N/A | Not Supported - Agent versions expired on November 6, 2019 |
| V3 Release | 3.1.0.0 - 3.4.0.0 | N/A | Not Supported - Agent versions expired on August 19, 2019 |
| Pre-GA agents | 1.1.0.0 - 3.0.13.0 | N/A | Not Supported - Agent versions expired on October 1, 2018 |

### Azure File Sync agent update policy
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


## Version 23.1.0.0

The following release notes are for Azure File Sync version 23.1.0.0 (released September 1, 2026). This release contains improvements for the Azure File Sync service and agent. 

### Improvements and fixed issues

**Recommended alerts**
You can now enable a set of preconfigured recommended alerts for your Storage Sync Service to monitor sync health, server connectivity, storage availability, and agent expiration. See [Monitor Azure File Sync](file-sync-monitoring.md#set-up-recommended-alerts).

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync**
- Improved the performance of directory enumeration on the server, delivering roughly a 25% speedup when scanning large directory structures.
- Local changes on the server are now detected and synced promptly, even while a large enumeration is in progress.
- Addressed corner-case conditions that could leave stale entries in the sync database, and improved handling of files that are briefly in use during sync, for more consistent sync behavior. 

### Evaluation tool
Before deploying Azure File Sync, evaluate whether it's compatible with your system by using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential problems with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see the [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- You must install the agent installation package with elevated (admin) permissions.
- The agent isn't supported on the Nano Server deployment option.
- The agent supports only Windows Server 2016, Windows Server 2019, Windows Server 2022, and Windows Server 2025.
- The agent requires .NET Framework 4.7.2 or later. Windows Server 2019 and later include .NET Framework 4.7.2 by default. For Windows Server 2016, verify that .NET Framework 4.7.2 or later is installed before installing Azure File Sync.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it leads to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal reflects the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server runs in a virtual machine with dynamic memory enabled, configure the VM with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default. TLS 1.0 and 1.1 aren't supported.
- Server registration by using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe requires .NET Framework 4.7.2 or higher.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service fails to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this problem, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If you install manually, review the associated KB article to ensure all prerequisites are met.​ ​​If you don't install the Windows Updates before installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) fails to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 

### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. Install the Azure File Sync agent after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- You can create a server endpoint only on an NTFS volume. Azure File Sync doesn't currently support ReFS, FAT, or FAT32.
- The system volume doesn't support cloud tiering. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering supports only clustered disks, but not Cluster Shared Volumes (CSVs).
- You can't nest a server endpoint. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, an Azure File Sync change detection job first needs to discover any changes made on the Azure file share. A change detection job initiates for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- You can move the storage sync service and storage account to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If you use Robocopy to copy a tiered file to another location, the resulting file isn't tiered. Robocopy might incorrectly include the offline attribute in copy operations.
- When you use Robocopy to copy files, use the `/MIR` option to preserve file timestamps. This option ensures that older files are tiered sooner than recently accessed files.



## Version 22.4.0.0
The following release notes are for Azure File Sync version 22.4.0.0 (released June 22, 2026). This release contains improvements for the Azure File Sync service and agent. 

### Improvements and fixed issues

**Server registration workflow hardening**
Hardened the steps in the Azure File Sync server registration workflow. This change doesn't impact servers that are already registered and doesn't require customer action.

**Auto upgrade reliability fixes**

### Evaluation tool
Before deploying Azure File Sync, evaluate whether it's compatible with your system by using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential problems with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see the [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- You must install the agent installation package with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent supports only Windows Server 2016, Windows Server 2019, Windows Server 2022, and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it leads to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal reflects the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server runs in a virtual machine with dynamic memory enabled, configure the VM with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default. TLS 1.0 and 1.1 aren't supported.
- Server registration by using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe requires .NET Framework 4.7.2 or higher.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service fails to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this problem, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If you install manually, review the associated KB article to ensure all prerequisites are met.​ ​​If you don't install the Windows Updates before installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) fails to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 

### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. Install the Azure File Sync agent after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. Azure File Sync doesn't currently support ReFS, FAT, or FAT32.
- The system volume doesn't support cloud tiering. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering supports only clustered disks, but not Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, an Azure File Sync change detection job first needs to discover any changes made on the Azure file share. A change detection job initiates for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- You can move the storage sync service and/or storage account to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If you use Robocopy to copy a tiered file to another location, the resulting file isn't tiered. Robocopy might incorrectly include the offline attribute in copy operations.
- When you use Robocopy to copy files, use the `/MIR` option to preserve file timestamps. This option ensures that older files are tiered sooner than recently accessed files.


## Version 22.3.0.0
The following release notes are for Azure File Sync version 22.3.0.0 (released April 17, 2026). This release contains improvements for the Azure File Sync service and agent. 
### Improvements and issues that are fixed

**Sync and change detection reliability**
Addressed reliability issues in corner case error conditions to ensure more consistent sync and change detection behavior. 

**Certificate rotation compatibility in Azure China regions**
Resolves a certificate rotation issue affecting China East 2 and China North 2. Customers in these regions who applied the temporary workaround can now remove it after upgrading to v22.3. 

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync​​​​​​​**

### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2016, Windows Server 2019, Windows Server 2022 and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it will lead to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal should reflect the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default. TLS 1.0 and 1.1 aren't supported.
- Server registration using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe require .NET Framework 4.7.2. or higher.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service will fail to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 


## Version 22.0.0.0
The following release notes are for Azure File Sync version 22.0.0.0 (released December 09, 2025). This release contains improvements for the Azure File Sync service and agent. 

### Improvements and issues that are fixed

**New metric to monitor Azure File Sync agent expiration**

A new agentVersionExpiration metric provides visibility into how many days remain before an agent reaches expiration. Customers can configure Azure Monitor alerts when an agent is within 90 days of expiry, enabling proactive management and reducing the risk of unexpected service interruptions. To learn more, see [Azure File Sync Monitoring Metric Charts](file-sync-monitoring.md)

**Generally Available: Azure File Sync in Poland Central, Spain Central, New Zealand North, and Israel Central**

 The expansion into Poland Central, Spain Central, New Zealand North, and Israel Central brings the service closer to organizations in these regions, offering lower latency, better performance, and support for local data residency requirements.  

**Software Assurance License Benefit​​​​​​**

 Starting January 2026, organizations with Software Assurance licensing and Arc-enabled servers will receive discounted per-server pricing for Azure File Sync. This benefit applies when running agents V22 or later, providing customers with a cost advantage.

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync​​​​​​​**

### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2016, Windows Server 2019, Windows Server 2022 and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you are performing an [in-place upgrade](https://learn.microsoft.com/windows-server/get-started/perform-in-place-upgrade) to a supported operating system:
  - Uninstall the Azure File Sync agent and restart the server.
  - Perform the in-place upgrade to any supported Windows Server version.
  - Install the Azure File Sync agent that matches the new operating system.
  - Allow up to 30 minutes for the Azure portal to reflect the updated server status.
  - Do not unregister the server before the upgrade. Unregistering removes all server endpoints, and if any data is still tiered, this can leave files orphaned.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default. TLS 1.0 and 1.1 aren't supported.
- Server registration using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe require .NET Framework 4.7.2. or higher.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service will fail to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 


### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. The Azure File Sync agent should be installed after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. Azure File Sync doesn't currently support ReFS, FAT, or FAT32.
- Cloud tiering isn't supported on the system volume. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering is supported only with clustered disks, but not with Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, any changes made on the Azure file share first need to be discovered by an Azure File Sync change detection job. A change detection job is initiated for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- The storage sync service and/or storage account can be moved to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If a tiered file is copied to another location by using Robocopy, the resulting file isn't tiered. The offline attribute might be set because Robocopy incorrectly includes that attribute in copy operations.
- When copying files using Robocopy, use the /MIR option to preserve file timestamps. This will ensure older files are tiered sooner than recently accessed files.

## Version 21.2.0.0
The following release notes are for Azure File Sync version 21.2.0.0 (released July 08, 2025). This release contains improvements for the Azure File Sync service and agent. 

### Improvements and issues that are fixed

**Azure File Sync Agent Now Available via Arc Extension**

Windows servers connected through Azure arc can now install Azure File Sync agent using a new extension called, Azure File Sync Agent for Windows. The new extension is published by Microsoft and can be managed using the Azure portal, PowerShell or Azure CLI. To learn more, see the [Azure File Sync agent extension documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/file-sync-extension.md?tabs=azure-portal).

**Generally Available: Azure File Sync in Italy North**

The expansion into Italy North brings the service closer to organizations in these regions, offering lower latency, better performance, and support for local data residency requirements.  

**Granular Role-Based Access Control (RBAC) for Azure File Sync ​​​​​​**

Azure File Sync now includes two dedicated built-in RBAC roles. [Azure File Sync Administrator](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#azure-file-sync-administrator) and [Azure File Sync Reader](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#azure-file-sync-reader) are designed to strengthen security and streamline operations for organizations managing file synchronization between on-premises and cloud environments. These roles offer more granular access control than broader roles like Owner or Contributor, enabling organizations to enforce the principle of least privilege more effectively.

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync​​​​​​​**

Fixed an issue that caused sync download and cloud tiering failures with error code 0x80c80362 (ECS_E_ITEM_PATH_COMPONENT_HAS_ TRAILING_DOT) when a file or folder path included a trailing dot. Previously, users had to manually rename the affected item to resume sync. Azure File Sync now correctly handles path components with trailing dots, eliminating the need for manual intervention.

### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2016, Windows Server 2019, Windows Server 2022 and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it will lead to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal should reflect the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default. TLS 1.0 and 1.1 aren't supported.
- Server registration using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe require .NET Framework 4.7.2. or higher.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service will fail to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 


### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. The Azure File Sync agent should be installed after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. Azure File Sync doesn't currently support ReFS, FAT, or FAT32.
- Cloud tiering isn't supported on the system volume. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering is supported only with clustered disks, but not with Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, any changes made on the Azure file share first need to be discovered by an Azure File Sync change detection job. A change detection job is initiated for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- The storage sync service and/or storage account can be moved to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If a tiered file is copied to another location by using Robocopy, the resulting file isn't tiered. The offline attribute might be set because Robocopy incorrectly includes that attribute in copy operations.
- When copying files using Robocopy, use the /MIR option to preserve file timestamps. This will ensure older files are tiered sooner than recently accessed files.

## Version 21.1.0.0 (Security Update)
The following release notes are for Azure File Sync version 21.1.0.0 (released June 11, 2024). This release contains a security update for servers that have v18 agent version installed. These notes are in addition to the release notes listed for version 21.0.0.0.

### Improvements and issues that are fixed
Fixes an issue that might allow improper access control in Azure File Sync that allows an authorized attacker to elevate privileges locally. This is a security-only update. For more information about this vulnerability, see [CVE-2025-53729](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2025-53729).

## Version 20.1.0.0 (Security Update)
The following release notes are for Azure File Sync version 18.1.0.0 (released June 11, 2024). This release contains a security update for servers that have v18 agent version installed. These notes are in addition to the release notes listed for version 20.0.0.0.

### Improvements and issues that are fixed
Fixes an issue that might allow improper access control in Azure File Sync that allows an authorized attacker to elevate privileges locally. This is a security-only update. For more information about this vulnerability, see [CVE-2025-53729](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2025-53729).

## Version 20.0.0.0
The following release notes are for Azure File Sync version 20.0.0.0 (released February 10, 2025). This release contains improvements for the Azure File Sync service and agent. 

### Improvements and issues that are fixed
**General Availability: Managed Identities support for Azure File Sync service and servers**

Azure File Sync now supports system-assigned managed identities for authentication, eliminating the need for [shared keys](../common/storage-account-keys-manage.md) and simplifying security management with Microsoft Entra ID. You can now configure managed identities directly from the Azure portal, making deployments easier and more secure.
 
When managed identities are configured, the system-assigned managed identities will be used for the following scenarios:
- Storage Sync Service authentication to Azure file share
- Registered server authentication to Azure file share
- Registered server authentication to Storage Sync Service

For more information, see: [How to use managed identities with Azure File Sync](file-sync-managed-identities.md).

> **Note:**
>The portal experience for general availability will gradually roll out to all regions in the coming weeks.

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync**
### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2016, Windows Server 2019, Windows Server 2022 and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it will lead to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal should reflect the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default and TLS 1.0 and 1.1 are not supported.
- Server registration using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe require .NET Framework 4.7.2. or higher
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service will fail to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 


### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. The Azure File Sync agent should be installed after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. ReFS, FAT, FAT32, and other file systems aren't currently supported by Azure File Sync.
- Cloud tiering isn't supported on the system volume. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering is supported only with clustered disks, but not with Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, any changes made on the Azure file share first need to be discovered by an Azure File Sync change detection job. A change detection job is initiated for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- The storage sync service and/or storage account can be moved to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If a tiered file is copied to another location by using Robocopy, the resulting file isn't tiered. The offline attribute might be set because Robocopy incorrectly includes that attribute in copy operations.
- When copying files using Robocopy, use the /MIR option to preserve file timestamps. This will ensure older files are tiered sooner than recently accessed files.

## Version 19.2.0.0 (Security Update)
The following release notes are for Azure File Sync version 19.2.0.0 (released June 11, 2024). This release contains a security update for servers that have v18 agent version installed. These notes are in addition to the release notes listed for version 19.1.0.0.

### Improvements and issues that are fixed
Fixes an issue that might allow improper access control in Azure File Sync that allows an authorized attacker to elevate privileges locally. This is a security-only update. For more information about this vulnerability, see [CVE-2025-53729](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2025-53729).

## Version 19.1.0.0
The following release notes are for Azure File Sync version 19.1.0.0 (released September 3, 2024). This release contains improvements for the Azure File Sync service and agent.

### Improvements and issues that are fixed
**Faster server provisioning and improved disaster recovery for Azure File Sync server endpoints.**

We have reduced the time it takes for the new server endpoint to be ready to use. Prior to the v19 release, when a new server endpoint is provisioned, it could take hours and sometime days for the server to be ready to use. With our latest improvements, we've substantially shortened this duration, ensuring a faster setup process.

The improvement applies to the following scenarios, when the server endpoint location is empty (no files or directories):
- Creating the first server endpoint of new sync topology after data is copied to the Azure File Share.
- Adding a new empty server endpoint to an existing sync topology.

This improvement will be gradually enabled in all regions within the next month. Once the improvement is enabled in your region, you will see a Provisioning steps tab in the portal after server endpoint creation which allows you to easily determine when the server endpoint is ready for use. For more information, see [Create an Azure File Sync server endpoint](file-sync-server-endpoint-create.md#provisioning-steps) documentation.

**Preview: Managed Identities support for Azure File Sync service and servers**  
Azure File Sync support for managed identities eliminates the need for shared keys as a method of authentication by utilizing a system-assigned managed identity provided by Microsoft Entra ID.

When you enable this configuration, the system-assigned managed identities will be used for the following scenarios:
- Storage Sync Service authentication to Azure file share
- Registered server authentication to Azure file share
- Registered server authentication to Storage Sync Service

For more information, see: [How to use managed identities with Azure File Sync (preview)](file-sync-managed-identities.md).

**Sync performance improvements**  
Sync performance has significantly improved for file share migrations and when metadata-only is changed (for example, ACL changes). Performance numbers will be posted when they are available.

**Support for Windows Server 2025**  
The Azure File Sync agent is now supported on Windows Server 2025 (build 26100).

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync**

### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation requires a restart for servers that have an existing Azure File Sync agent installation if the agent version is older than 18.2.0.0.
- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2016, Windows Server 2019, Windows Server 2022 and Windows Server 2025.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it will lead to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal should reflect the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The agent uses TLS 1.2 or 1.3 (Windows Server 2022 or newer) by default and TLS 1.0 and 1.1 are not supported.
- Server registration using the [Register-AzStorageSyncServer](https://learn.microsoft.com/powershell/module/az.storagesync/register-azstoragesyncserver) and ServerRegistration.exe require .NET Framework 4.7.2. or higher
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. If the SVI directory is compressed, the Storage Sync Agent (FileSyncSvc) service will fail to start.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 

### Interoperability

- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. The Azure File Sync agent should be installed after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. ReFS, FAT, FAT32, and other file systems aren't currently supported by Azure File Sync.
- Cloud tiering isn't supported on the system volume. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering is supported only with clustered disks, but not with Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, any changes made on the Azure file share first need to be discovered by an Azure File Sync change detection job. A change detection job is initiated for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- The storage sync service and/or storage account can be moved to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra ID tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra ID tenants.

### Cloud tiering
- If a tiered file is copied to another location by using Robocopy, the resulting file isn't tiered. The offline attribute might be set because Robocopy incorrectly includes that attribute in copy operations.
- When copying files using Robocopy, use the /MIR option to preserve file timestamps. This will ensure older files are tiered sooner than recently accessed files.

## Version 18.3.0.0 (Security Update)
The following release notes are for Azure File Sync version 18.1.0.0 (released June 11, 2024). This release contains a security update for servers that have v18 agent version installed. These notes are in addition to the release notes listed for versions 18.0.0.0, 18.1.0.0, and 18.2.0.0.

### Improvements and issues that are fixed
Fixes an issue that might allow improper access control in Azure File Sync that allows an authorized attacker to elevate privileges locally. This is a security-only update. For more information about this vulnerability, see [CVE-2025-53729](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2025-53729).

## Version 18.2.0.0
The following release notes are for Azure File Sync version 18.2.0.0 (released July 9, 2024). This release contains improvements for the Azure File Sync agent. These notes are in addition to the release notes listed for version 18.0.0.0 and 18.1.0.0.

### Improvements and issues that are fixed
- Rollup update for Azure File Sync agent [v18](#version-18000) and [v18.1](#version-18100-security-update) releases.
- This release also includes sync reliability improvements.

## Version 18.1.0.0 (Security Update)
The following release notes are for Azure File Sync version 18.1.0.0 (released June 11, 2024). This release contains a security update for servers that have v18 agent version installed. These notes are in addition to the release notes listed for version 18.0.0.0.

### Improvements and issues that are fixed
Fixes an issue that might allow unauthorized users to delete files in locations they don’t have access. This is a security-only update. For more information about this vulnerability, see [CVE-2024-35253](https://msrc.microsoft.com/update-guide/en-US/advisory/CVE-2024-35253).

## Version 18.0.0.0
The following release notes are for Azure File Sync version 18.0.0.0 (released May 8, 2024). This release contains improvements for the Azure File Sync service and agent.

### Improvements and issues that are fixed
**Faster server provisioning and improved disaster recovery for Azure File Sync server endpoints**
We're reducing the time it takes for the new server endpoint to be ready to use. When a new server endpoint is provisioned, it could take hours and sometime days for the server to be ready to use. With our latest improvements, we've substantially shortened this duration for a more efficient setup process.

The improvement applies to the following scenarios, when the server endpoint location is empty (no files or directories):
- Creating the first server endpoint of new sync topology after data is copied to the Azure File Share.
- Adding a new empty server endpoint to an existing sync topology.

How to get started: Sign up for the public preview [here](https://forms.office.com/r/gCLr1PDZKL).

**Sync performance improvements**  
Sync upload performance has improved, and performance numbers will be posted when they are available. This improvement will mainly benefit file share migrations (initial upload) and high churn events on the server in which a large number of files need to be uploaded, for example ACL changes.

**Miscellaneous reliability and telemetry improvements for cloud tiering and sync**

### Evaluation tool
Before deploying Azure File Sync, you should evaluate whether it's compatible with your system using the Azure File Sync evaluation tool. This tool is an Azure PowerShell cmdlet that checks for potential issues with your file system and dataset, such as unsupported OS version. For installation and usage instructions, see [Evaluation Tool](file-sync-planning.md#evaluation-cmdlet) section in the planning guide.

### Agent installation and server configuration
For more information about how to install and configure the Azure File Sync agent with Windows Server, see [Planning for an Azure File Sync deployment](file-sync-planning.md) and [How to deploy Azure File Sync](file-sync-deployment-guide.md).

- The agent installation package must be installed with elevated (admin) permissions.
- The agent isn't supported on Nano Server deployment option.
- The agent is supported only on Windows Server 2019, Windows Server 2016 and Windows Server 2022.
- The Azure File Sync agent installation package is specific to the operating system version. If you're upgrading a server to a newer version of Windows Server, you must first uninstall the Azure File Sync agent and restart the server. ***Don't unregister and re-register the server during the OS upgrade, or it will lead to orphaned tiered files on existing server endpoints.*** Then, upgrade the operating system to the new version. After the upgrade is complete, install the Azure File Sync agent that matches the new Windows Server version such as 2016, 2019, 2022, or 2025. After installing the agent on the upgraded server, the Azure portal should reflect the correct server status within 30 minutes.
- The agent requires at least 2 GiB of memory. If the server is running in a virtual machine with dynamic memory enabled, the VM should be configured with a minimum 2048 MiB of memory. See [Recommended system resources](file-sync-planning.md#recommended-system-resources) for more information.
- The Storage Sync Agent (FileSyncSvc) service doesn't support server endpoints located on a volume that has the system volume information (SVI) directory compressed. This configuration will lead to unexpected results.
- All supported Azure File Sync agent versions use TLS 1.2 by default and TLS 1.0 and 1.1 are not supported. Starting with v18 agent version TLS 1.3 will be supported for Windows Server 2022.
- Agent installation can fail with error **0x80c84111** if required Windows security updates are missing. To prevent this issue, make sure the following updates are installed based on your server version:
  - Windows Server 2016 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202016) (latest cumulative update)
  - Windows Server 2019 [Microsoft Update Catalog](https://catalog.update.microsoft.com/Search.aspx?q=cumulative%20windows%20server%202019) (latest cumulative update)
  - Cumulative updates are released monthly. To deploy the latest update, users can either use Windows Update or manually download it from the [Microsoft Update Catalog](https://catalog.update.microsoft.com). If installing manually, users should review the associated KB article to ensure all prerequisites are met.​ ​​If the Windows Updates aren't installed prior to installing the Azure File Sync agent, the Storage Sync Agent service (FileSyncSvc) will fail to start. To learn more, see the [Azure File Sync troubleshooting documentation](https://learn.microsoft.com/troubleshoot/azure/azure-storage/files/file-sync/file-sync-troubleshoot). 


### Interoperability
- Antivirus, backup, and other applications that access tiered files can cause undesirable recall unless they respect the offline attribute and skip reading the content of those files. For more information, see [Troubleshoot Azure File Sync](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot?toc=/azure/storage/file-sync/toc.json).
- File Server Resource Manager (FSRM) file screens can cause endless sync failures when files are blocked because of the file screen.
- Running sysprep on a server that has the Azure File Sync agent installed isn't supported and can lead to unexpected results. The Azure File Sync agent should be installed after deploying the server image and completing sysprep mini-setup.

### Sync limitations
The following items don't sync, but the rest of the system continues to operate normally:

- Azure File Sync v17 agent and later supports all characters that are supported by the [NTFS file system](https://learn.microsoft.com/windows/win32/fileio/naming-a-file) except invalid surrogate pairs. See [Troubleshooting guide](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#handling-unsupported-characters) for more information.
- Paths that are longer than 2,048 characters.
- The system access control list (SACL) portion of a security descriptor that's used for auditing.
- Extended attributes.
- Alternate data streams.
- Reparse points.
- Hard links.
- Compression (if it's set on a server file) isn't preserved when changes sync to that file from other endpoints.
- Any file that's encrypted with EFS (or other user mode encryption) that prevents the service from reading the data.

> **Note:**
> Azure File Sync always encrypts data in transit. Data is always encrypted at rest in Azure.

### Server endpoint
- A server endpoint can be created only on an NTFS volume. ReFS, FAT, FAT32, and other file systems aren't currently supported by Azure File Sync.
- Cloud tiering isn't supported on the system volume. To create a server endpoint on the system volume, disable cloud tiering when creating the server endpoint.
- Failover Clustering is supported only with clustered disks, but not with Cluster Shared Volumes (CSVs).
- A server endpoint can't be nested. It can coexist on the same volume in parallel with another endpoint.
- Don't store an OS or application paging file within a server endpoint location.

### Cloud endpoint
- Azure File Sync supports making changes to the Azure file share directly. However, any changes made on the Azure file share first need to be discovered by an Azure File Sync change detection job. A change detection job is initiated for a cloud endpoint once every 24 hours. To immediately sync files that are changed in the Azure file share, use the [Invoke-AzStorageSyncChangeDetection](https://learn.microsoft.com/powershell/module/az.storagesync/invoke-azstoragesyncchangedetection) PowerShell cmdlet to manually initiate the detection of changes in the Azure file share.
- The storage sync service and/or storage account can be moved to a different resource group, subscription, or Microsoft Entra (formerly Azure AD) tenant. After moving the storage sync service or storage account, you need to give the Microsoft.StorageSync application access to the storage account (see [Ensure Azure File Sync has access to the storage account](https://learn.microsoft.com/troubleshoot/azure/azure-storage/file-sync-troubleshoot-sync-errors?toc=/azure/storage/file-sync/toc.json#troubleshoot-rbac)).

> **Note:**
> When creating the cloud endpoint, the storage sync service and storage account must be in the same Microsoft Entra tenant. After you create the cloud endpoint, you can move the storage sync service and storage account to different Microsoft Entra tenants.

### Cloud tiering
- If a tiered file is copied to another location by using Robocopy, the resulting file isn't tiered. The offline attribute might be set because Robocopy incorrectly includes that attribute in copy operations.
- When copying files using Robocopy, use the /MIR option to preserve file timestamps. This will ensure older files are tiered sooner than recently accessed files.
