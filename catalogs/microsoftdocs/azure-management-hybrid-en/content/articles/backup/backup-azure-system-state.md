---
title: Back up Windows system state to Azure using Azure Backup
description: Learn how to back up Windows Server system state to Azure using Azure Backup.
ms.topic: how-to
ms.date: 03/09/2026
author: AbhishekMallick-MS
ms.author: v-mallicka
ms.service: azure-backup
ms.custom: engagement-fy24
# Customer intent: As a system administrator, I want to back up the Windows Server system state to cloud storage, so that I can ensure data recovery and maintain business continuity in case of system failures.
---

# Back up Windows system state to Azure using Azure Backup

This article describes how to back up Windows Server system state to Azure using Azure Backup. It's intended to walk you through the basics.

For more information about Azure Backup, see the [overview article](backup-overview.md). If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) that lets you access any Azure service.


## Create a Recovery Services vault

A Recovery Services vault is a management entity that stores recovery points that are created over time. It provides an interface to perform backup-related operations. These operations include taking on-demand backups, performing restores, and creating backup policies.

To create a Recovery Services vault:

1. Sign in to the [Azure portal](https://portal.azure.com/).

1. Search for **Resiliency**, and then go to the **Resiliency** dashboard.

    Screenshot that shows where to search for and select Resiliency.

1. On the **Vault** pane, select **+ Vault**.

    Screenshot that shows how to start creating a Recovery Services vault.

1. Select **Recovery Services vault** > **Continue**.

    Screenshot that shows where to select Recovery Services as the vault type.

1. On the **Create Recovery Services vault** pane, enter the following values:

   - **Subscription**: Select the subscription to use. If you're a member of only one subscription, you see that name. If you're not sure which subscription to use, use the default subscription. Multiple choices appear only if your work or school account is associated with more than one Azure subscription.
   - **Resource group**: Use an existing resource group or create a new one. To view a list of available resource groups in your subscription, select **Use existing**. Then select a resource in the dropdown list. To create a new resource group, select **Create new**, and then enter the name. For more information about resource groups, see [Azure Resource Manager overview](../azure-resource-manager/management/overview.md).
   - **Vault name**: Enter a friendly name to identify the vault. The name must be unique to the Azure subscription. Specify a name that has at least 2 but not more than 50 characters. The name must start with a letter and consist only of letters, numbers, and hyphens.
   - **Region**: Select the geographic region for the vault. For you to create a vault to help protect any data source, the vault *must* be in the same region as the data source.

      > **Important:**
      > If you're not sure of the location of your data source, close the window. Go to the list of your resources in the portal. If you have data sources in multiple regions, create a Recovery Services vault for each region. Create the vault in the first location before you create a vault in another location. You don't need to specify storage accounts to store the backup data. The Recovery Services vault and Azure Backup handle that step automatically.

    Screenshot that shows fields for configuring a Recovery Services vault.

1. After you provide the values, select **Review + create**.

1. To finish creating the Recovery Services vault, select **Create**.

   It can take a while to create the Recovery Services vault. Monitor the status notifications in the **Notifications** area at the upper right. After the vault is created, it appears in the list of Recovery Services vaults. If the vault doesn't appear, select **Refresh**.

    Screenshot that shows the button for refreshing the list of backup vaults.

Azure Backup now supports immutable vaults that help you ensure that after recovery points are created, they can't be deleted before their expiry according to the backup policy. You can make the immutability irreversible to help protect your backup data from various threats, including ransomware attacks and malicious actors. [Learn more about Azure Backup immutable vaults](https://learn.microsoft.com/azure/backup/backup-azure-immutable-vault-concept).


## Set storage redundancy for the vault

When you create a Recovery Services vault, ensure that you configure the storage redundancy as per the organization requirements.

To set the storage redundancy for the vault, follow these steps:

1. From the **Recovery Services vaults** blade, select the new vault.

    Screenshot shows how to select the new vault from the list of Recovery Services vault.

    When you select the vault, the **Recovery Services vault** blade narrows, and the Settings blade (*which has the name of the vault at the top*) and the vault details blade open.

    Screenshot show how to view the storage configuration for new vault.
2. On the new vault's **Settings** blade, use the vertical slide to scroll down to the Manage section, and select **Backup Infrastructure**.

3. On the **Backup Infrastructure** blade, select **Backup Configuration** to open the **Backup Configuration** blade.

    Screenshot shows how to set the storage configuration for new vault.

4. Choose the appropriate storage replication option for your vault.

    Screenshot shows how to select the storage configuration option.

    By default, your vault has geo-redundant storage. If you use Azure as a primary backup storage endpoint, continue to use **Geo-redundant**. If you don't use Azure as a primary backup storage endpoint, then choose **Locally-redundant**, which reduces the Azure storage costs. Read more about [geo-redundant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#geo-redundant-storage), [locally redundant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#locally-redundant-storage) and [zone-redundant](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md#zone-redundant-storage) storage options in this [Storage redundancy overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-redundancy.md).

Now that you've created a vault, configure it for backing up Windows System State.

## Configure the vault

To configure the vault, follow these steps:

1. On the Recovery Services vault blade (for the vault you just created), in the Getting Started section, select **Backup**, then on the **Getting Started with Backup** blade, select **Backup goal**.

    Screenshot shows how to open the backup settings.

    The **Backup Goal** blade opens.

    Screenshot shows how to open the backup goal blade.

2. From the **Where is your workload running?** drop-down menu, select **On-premises**.

    You choose **On-premises** because your Windows Server or Windows computer is a physical machine that isn't in Azure.

3. From the **What do you want to back up?** menu, select **System State**, and select **OK**.

    Screenshot shows how to configure files and folders.

    After you select **OK**, a checkmark appears next to **Backup goal**, and the **Prepare infrastructure** blade opens.

    Screenshot shows how to prepare infrastructure.

4. On the **Prepare infrastructure** blade, select **Download Agent for Windows Server or Windows Client**.

    Screenshot shows how to start downloading the agent for Windows client.

    If you're using Windows Server Essential, then choose to download the agent for Windows Server Essential. A pop-up menu prompts you to run or save MARSAgentInstaller.exe.

    Screenshot shows the MARSAgentInstaller dialog.

5. In the download pop-up menu, select **Save**.

    By default, the **MARSagentinstaller.exe** file is saved to your Downloads folder. When the installer completes, you'll see a pop-up asking if you want to run the installer, or open the folder.

    Screenshot shows that MARS installer is complete.

    You don't need to install the agent yet. You can install the agent after you've downloaded the vault credentials.

6. On the **Prepare infrastructure** blade, select **Download**.

    Screenshot shows how to download vault credentials.

    The vault credentials download to your **Downloads** folder. After the vault credentials finish downloading, you'll see a pop-up asking if you want to open or save the credentials. Select **Save**. If you accidentally select **Open**, let the dialog that attempts to open the vault credentials, fail. You won't be able to open the vault credentials. Continue to the next step. The vault credentials are in the **Downloads** folder.

    Screenshot shows that vault credentials downloading is finished.

   > **Note:**
   > The vault credentials must be saved only to a location that's local to the Windows Server on which you intend to use the agent.
   >


## Upgrade the MARS Agent

Versions of the Microsoft Azure Recovery Services (MARS) Agent below 2.0.9083.0 have a dependency on the Azure Access Control service. The MARS Agent is also referred to as the Azure Backup Agent.

In 2018, Microsoft [deprecated the Azure Access Control service](https://learn.microsoft.com/azure/active-directory/azuread-dev/active-directory-acs-migration). Beginning March 19, 2018, all versions of the MARS Agent below 2.0.9083.0 will experience backup failures. To avoid or resolve backup failures, [upgrade your MARS Agent to the latest version](https://support.microsoft.com/help/4538314/update-for-azure-backup-for-microsoft-azure-recovery-services-agent). To identify servers that require a MARS Agent upgrade, follow the steps in [Upgrade the Microsoft Azure Recovery Services (MARS) agent](upgrade-mars-agent.md).

The MARS Agent is used to back up files and folders and system state data to Azure. System Center DPM and Azure Backup Server use the MARS Agent to back up data to Azure.


## Install and register the agent

To install and register the agent, follow these steps:

1. Locate and double-click the **MARSagentinstaller.exe** from the Downloads folder (or other saved location).

    The installer provides a series of messages as it extracts, installs, and registers the Recovery Services agent.

    Screenshot shows how to run Recovery Services agent installer credentials.

2. Complete the Microsoft Azure Recovery Services Agent Setup Wizard. To complete the wizard, you need to:

   * Choose a location for the installation and cache folder.
   * Provide your proxy server info if you use a proxy server to connect to the internet.
   * Provide your user name and password details if you use an authenticated proxy.
   * Provide the downloaded vault credentials
   * Save the encryption passphrase in a secure location.

     > **Note:**
     > If you lose or forget the passphrase, Microsoft can't help recover the backup data. Save the file in a secure location. It's required to restore a backup.
     >
     >

The agent is now installed and your machine is registered to the vault. You're ready to configure and schedule your backup.

> **Note:**
> Enabling backup through the Azure portal isn't available. Use the Microsoft Azure Recovery Services Agent to back up Windows Server System State.
>

## Back up Windows Server System State

The initial backup includes two tasks:

* Schedule the backup
* Back up  System State for the first time

To complete the initial backup, use the Microsoft Azure Recovery Services agent.

> **Note:**
> You can back up System State on Windows Server 2022 through Windows Server 2025. System State back up isn't supported on client SKUs. System State isn't shown as an option for Windows clients, or Windows Server 2008 SP2 machines.
>
>

> **Note:**
> Windows Server 2008, 2008 R2, 2012 and 2012 R2 have reached End of Support (EOS). Review your usage and plan OS upgrades and migrations accordingly. For more information, see End of support for:
>
>- [Windows Server 2008 and Windows Server 2008 R2](https://learn.microsoft.com/troubleshoot/windows-server/windows-server-eos-faq/end-of-support-windows-server-2008-2008r2)
>- [Windows Server 2012](https://learn.microsoft.com/windows/release-health/status-windows-server-2012)
>- [Windows Server 2012 R2](https://learn.microsoft.com/windows/release-health/status-windows-8.1-and-windows-server-2012-r2)
>
>[Perform in-place upgrade to Windows Server 2016, 2019, 2022, or 2025](https://learn.microsoft.com/azure/virtual-machines/windows-in-place-upgrade#perform-in-place-upgrade-to-windows-server-2016-2019-2022-or-2025).




### Schedule the backup job

To schedule the backup job, follow these steps:

1. Open the Microsoft Azure Recovery Services agent. You can find it by searching your machine for **Microsoft Azure Backup**.

    Screenshot shows how to launch the Azure Recovery Services agent.

2. On the Recovery Services agent, select **Schedule Backup**.

    Screenshot shows how to schedule a Windows Server backup.

3. On the **Getting started** blade of the Schedule Backup Wizard, select **Next**.

4. On the **Select Items to Backup** blade, select **Add Items**.

5. Select **System State** and then select **OK**.

6. Select **Next**.

7. Select the required Backup frequency and the retention policy for your System State backups in the subsequent blades.

8. On the Confirmation blade, review the information, and then select **Finish**.

9. After the wizard finishes creating the backup schedule, select **Close**.

### Back up Windows Server System State for the first time

To back up Windows Server System State for the first time, follow these steps:

1. Ensure that there are no pending updates for Windows Server that require a reboot.

2. On the Recovery Services agent, select **Back Up Now** to complete the initial seeding over the network.

    Screenshot shows how to start backup of Windows Server.

3. Select **System State** on the **Select Backup Item** blade that appears and select **Next**.

4. On the Confirmation blade, review the settings that the Back Up Now Wizard will use to back up the machine. Then select **Back Up**.

5. Select **Close** to close the wizard. If you close the wizard before the backup process finishes, the wizard continues to run in the background.
    > **Note:**
    > The MARS Agent triggers `SFC /verifyonly` as part of the prechecks before every system state backup. This is to ensure that files backed up as part of System State have the correct versions corresponding to the Windows version. Learn more about System File Checker (SFC) in [this article](https://learn.microsoft.com/windows-server/administration/windows-commands/sfc).
    >

After the initial backup is completed, the **Job completed** status appears in the Backup console.

  Screenshot shows that the initial backup is completed.

## Next steps

- [Back up Windows machines](backup-windows-with-mars-agent.md).
- [Manage vaults and servers](backup-azure-manage-windows-server.md).
- [Restore files to Windows Server using the MARS Agent](backup-azure-restore-windows-server.md).
