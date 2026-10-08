---
title: Back up an SAP HANA database to Azure with Azure Backup 
description: In this article, learn how to back up an SAP HANA database to Azure virtual machines with the Azure Backup service.
ms.topic: how-to
ms.date: 02/16/2026
ms.service: azure-backup
author: AbhishekMallick-MS
ms.author: v-mallicka
# Customer intent: As an IT administrator managing SAP HANA databases on Azure VMs, I want to configure and automate database backups to Azure Backup, so that I can ensure data protection and maintain compliance with recovery-point objectives.
---

# Back up SAP HANA databases in Azure VMs

This article describes how to back up SAP HANA databases that are running on Azure VMs to an Azure Backup Recovery Services vault.

SAP HANA databases are critical workloads that require a low recovery-point objective (RPO) and long-term retention. You can back up SAP HANA databases running on Azure virtual machines (VMs) by using [Azure Backup](backup-overview.md). You can also [back up SAP HANA System Replication databases on Azure VMs](sap-hana-database-with-hana-system-replication-backup.md) and [back up SAP HANA database instance snapshots on Azure VMs](sap-hana-database-instances-backup.md).

To learn about the supported SAP HANA database backup and restore scenarios, region availability, and limitations, see the [support matrix](backup-azure-sql-database.md). For common questions, see the [frequently asked questions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/sap-hana-faq-backup-azure-vm.yml).

## Prerequisites

Refer to the [prerequisites](tutorial-backup-sap-hana-db.md#prerequisites) and the [What the pre-registration script does](tutorial-backup-sap-hana-db.md#preregistration-script-functionality-for-sap-hana-database-backup) sections to set up the database for backup.

### Establish network connectivity

For all operations, an SAP HANA database running on an Azure VM requires connectivity to the Azure Backup service, Azure Storage, and Microsoft Entra ID. This can be achieved by using private endpoints or by allowing access to the required public IP addresses or FQDNs. Not allowing proper connectivity to the required Azure services might lead to failure in operations like database discovery, configuring backup, performing backups, and restoring data.

The following table lists the various alternatives you can use for establishing connectivity:

| **Option** | **Advantages** | **Disadvantages** |
| --- | --- | --- |
| Private endpoints | Allow backups over private IPs inside the virtual network  <br><br>   Provide granular control on the network and vault side | Incurs standard private endpoint [costs](https://azure.microsoft.com/pricing/details/private-link/) |
| NSG service tags | Easier to manage as range changes are automatically merged   <br><br>   No additional costs | Can be used with NSGs only  <br><br>    Provides access to the entire service |
| Azure Firewall FQDN tags | Easier to manage since the required FQDNs are automatically managed | Can be used with Azure Firewall only |
| Allow access to service FQDNs/IPs | No additional costs.   <br><br>  Works with all network security appliances and firewalls. <br><br> You can also use service endpoints for *Storage*. However, for *Azure Backup* and *Microsoft Entra ID*, you need to assign the access to the corresponding IPs/FQDNs. | A broad set of IPs or FQDNs might be required to be accessed. |
| [Virtual Network Service Endpoint](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-service-endpoints-overview.md) | Can be used for Azure Storage.     <br><br>     Provides large benefit to optimize performance of data plane traffic. | Can't be used for Microsoft Entra ID, Azure Backup service. |
| Network Virtual Appliance | Can be used for Azure Storage, Microsoft Entra ID, Azure Backup service. <br><br> **Data plane**   <ul><li>      Azure Storage: `*.blob.core.windows.net`, `*.queue.core.windows.net`, `*.blob.storage.azure.net`  </li></ul>   <br><br>     **Management plane**  <ul><li>  Microsoft Entra ID: Allow access to FQDNs mentioned in sections 56 and 59 of [Microsoft 365 Common and Office Online](https://learn.microsoft.com/microsoft-365/enterprise/urls-and-ip-address-ranges?view=o365-worldwide\&preserve-view=true#microsoft-365-common-and-office-online). </li><li>   Azure Backup service: `.backup.windowsazure.com` </li></ul> <br>Learn more about [Azure Firewall service tags](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/fqdn-tags.md). | Adds overhead to data plane traffic and decrease throughput/performance. |

More details around using these options are shared below:

#### Private endpoints

Private endpoints allow you to connect securely from servers inside a virtual network to your Recovery Services vault. The private endpoint uses an IP from the VNET address space for your vault. The network traffic between your resources inside the virtual network and the vault travels over your virtual network and a private link on the Microsoft backbone network. This eliminates exposure from the public internet. Read more on private endpoints for Azure Backup [here](private-endpoints.md).

> **Note:**
> Private endpoints are supported for Azure Backup and Azure storage. Microsoft Entra ID has support private end-points in private preview. Until they are generally available, Azure backup supports setting up proxy for Microsoft Entra ID so that no outbound connectivity is required for HANA VMs. For more information, see the [proxy support section](#use-an-http-proxy-server-to-route-traffic).

#### NSG tags

If you use Network Security Groups (NSG), use the *AzureBackup* service tag to allow outbound access to Azure Backup. In addition to the Azure Backup tag, you also need to allow connectivity for authentication and data transfer by creating similar [NSG rules](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/network-security-groups-overview.md#service-tags) for Microsoft Entra ID (*AzureActiveDirectory*) and Azure Storage(*Storage*).  The following steps describe the process to create a rule for the Azure Backup tag:

1. In **All Services**, go to **Network security groups** and select the network security group.

1. Select **Outbound security rules** under **Settings**.

1. Select **Add**. Enter all the required details for creating a new rule as described in [security rule settings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/manage-network-security-group.md#security-rule-settings). Ensure the option **Destination** is set to *Service Tag* and **Destination service tag** is set to *AzureBackup*.

1. Select **Add**  to save the newly created outbound security rule.

You can similarly create NSG outbound security rules for Azure Storage and Microsoft Entra ID. For more information on service tags, see [this article](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md).

#### Azure Firewall tags

If you're using Azure Firewall, create an application rule by using the *AzureBackup* [Azure Firewall FQDN tag](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/fqdn-tags.md). This allows all outbound access to Azure Backup.

>**Note:**
>Azure Backup currently doesn't support the *TLS inspection enabled* **Application Rule** on Azure Firewall.

#### Allow access to service IP ranges

If you choose to allow access service IPs, refer to the IP ranges in the JSON file available [here](https://www.microsoft.com/download/details.aspx?id=56519). You'll need to allow access to IPs corresponding to Azure Backup, Azure Storage, and Microsoft Entra ID.

#### Allow access to service FQDNs

You can also use the following FQDNs to allow access to the required services from your servers:

| Service | Domain  names to be accessed | Ports |
| --- | --- | --- |
| Azure  Backup | `*.backup.windowsazure.com` | 443 |
| Azure  Storage | `*.blob.core.windows.net` <br><br> `*.queue.core.windows.net` <br><br> `*.blob.storage.azure.net` | 443 |
| Azure  AD | `*.login.microsoft.com` <br><br> Allow  access to FQDNs under sections 56 and 59 according to [this article](https://learn.microsoft.com/office365/enterprise/urls-and-ip-address-ranges#microsoft-365-common-and-office-online) | 443 <br><br> As applicable |

#### Use an HTTP proxy server to route traffic

> **Note:**
> Currently, we only support HTTP Proxy for Microsoft Entra traffic for SAP HANA. If you need to remove outbound connectivity requirements (for Azure Backup and Azure Storage traffic) for database backups via Azure Backup in HANA VMs, use other options, such as private endpoints.

<a name='using-an-http-proxy-server-for-azure-ad-traffic'></a>

##### Using an HTTP proxy server for Microsoft Entra traffic

1. Go to the "opt/msawb/bin" folder
2. Create a new JSON file named "ExtensionSettingsOverrides.json"
3. Add a key-value pair to the JSON file as follows:

    ```json
    {
        "UseProxyForAAD":true,
        "UseProxyForAzureBackup":false,
        "UseProxyForAzureStorage":false,
        "ProxyServerAddress":"http://xx.yy.zz.mm:port"
    }
    ```

4. Change the permissions and ownership of the file as follows:
    
    ```bash
    chmod 750 ExtensionSettingsOverrides.json
    chown root:msawb ExtensionSettingsOverrides.json
    ```

5. No restart of any service is required. The Azure Backup service will attempt to route the Microsoft Entra traffic via the proxy server mentioned in the JSON file.


##### Use outbound rules

If the Firewall or NSG settings block the `“management.azure.com”` domain from Azure Virtual Machine, snapshot backups will fail.

Create the following outbound rule and allow the domain name to do the database backup. Learn hot to [create outbound rules](https://learn.microsoft.com/azure/machine-learning/how-to-access-azureml-behind-firewall).

- **Source**: IP address of the VM.
- **Destination**: Service Tag.
- **Destination Service Tag**: `AzureResourceManager`

Screenshot shows the outbound rule settings.









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


## Enable Cross Region Restore

At the Recovery Services vault, you can enable Cross Region Restore. Learn [how to turn on Cross Region Restore](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-create-rs-vault.md#set-cross-region-restore).

[Learn more](backup-azure-recovery-services-vault-overview.md) about Cross Region Restore.

## Discover the databases

1. In the [Azure portal](https://portal.azure.com/), go to **Resiliency** and select **+Configure protection**.

1. On the **Configure protection** pane, select **Datasource type** as **SAP HANA in Azure VM**, and then select **Continue**.

   Screenshot that shows the selection of SAP HANA in Azure VM as datasource type.

1. On the **Start: Configure Backup** pane, for **Vault** selection, click **Select vault** to use for backup, and then select **Continue**.

   Screenshot that shows the selection of a Recovery Services vault for SAP HANA database backup.

1. On the **Backup Goal** pane, select **Start Discovery**. This initiates discovery of unprotected Linux VMs in the vault region.

   * After discovery, unprotected VMs appear in the portal, listed by name and resource group.
   * If a VM isn't listed as expected, check whether it's already backed up in a vault.
   * Multiple VMs can have the same name but they belong to different resource groups.

   Screenshot that shows how to select Start Discovery.

1. In **Select Virtual Machines**, select the link to download the script that provides permissions for the Azure Backup service to access the SAP HANA VMs for database discovery.
1. Run the script on each VM hosting SAP HANA databases that you want to back up.
1. After running the script on the VMs, in **Select Virtual Machines**, select the VMs. Then select **Discover DBs**.
1. Azure Backup discovers all SAP HANA databases on the VM. During discovery, Azure Backup registers the VM with the vault, and installs an extension on the VM. No agent is installed on the database.

   Screenshot that shows the discovered SAP HANA databases.

## Configure backup  

Now enable backup.

1. In Step 2, select **Configure Backup**.

   Screenshot that shows the configuration of Backup.

2. On the **Select items to back up** pane, select all the databases you want to protect > **OK**.

   Screenshot that shows how to select databases to back up.

3. For **Backup Policy**, choose a backup policy, or create a new backup policy for the databases, in accordance with the instructions below.

   Screenshot that shows the selection of a backup policy.

4. After creating the policy, on the **Backup** menu, select **Enable backup**.

    Screenshot showing how to enable backup.

You can track the backup configuration progress in the **Notifications** area of the portal.

### Create a backup policy

A backup policy defines when backups are taken, and how long they're retained.

* A policy is created at the vault level.
* Multiple vaults can use the same backup policy, but you must apply the backup policy to each vault.

>**Note:**
>Azure Backup doesn’t automatically adjust for daylight saving time changes when backing up an SAP HANA database running in an Azure VM.
>
>Modify the policy manually as needed.

Specify the policy settings as follows:

1. In **Policy name**, enter a name for the new policy.

   Enter policy name
1. In **Full Backup policy**, select a **Backup Frequency**, choose **Daily** or **Weekly**.
   * **Daily**: Select the hour and time zone in which the backup job begins.
       * You must run a full backup. You can't turn off this option.
       * Select **Full Backup** to view the policy.
       * You can't create differential backups for daily full backups.
   * **Weekly**: Select the day of the week, hour, and time zone in which the backup job runs.

   Select backup frequency

1. In **Retention Range**, configure retention settings for the full backup.
    * By default all options are selected. Clear any retention range limits you don't want to use, and set those that you do.
    * The minimum retention period for any type of backup (full/differential/log) is seven days.
    * Recovery points are tagged for retention based on their retention range. For example, if you select a daily full backup, only one full backup is triggered each day.
    * The backup for a specific day is tagged and retained based on the weekly retention range and setting.
    * The monthly and yearly retention ranges behave in a similar way.

1. In the **Full Backup policy** menu, select **OK** to accept the settings.
1. Select **Differential Backup** to add a differential policy.
1. In **Differential Backup policy**, select **Enable** to open the frequency and retention controls.
    * At most, you can trigger one differential backup per day.
    * Differential backups can be retained for a maximum of 180 days. If you need longer retention, you must use full backups.

    Differential backup policy

    > **Note:**
    > You can choose either a differential or an incremental as a daily backup but not both.
1. In **Incremental Backup policy**, select **Enable** to open the frequency and retention controls.
    * At most, you can trigger one incremental backup per day.
    * Incremental backups can be retained for a maximum of 180 days. If you need longer retention, you must use full backups.

    Incremental backup policy

1. Select **OK** to save the policy and return to the main **Backup policy** menu.
1. Select **Log Backup** to add a transactional log backup policy,
    * In **Log Backup**, select **Enable**.  This can't be disabled, since SAP HANA manages all log backups.
    * Set the frequency and retention controls.

    > **Note:**
    > Log backups only begin to flow after a successful full backup is completed.

1. Select **OK** to save the policy and return to the main **Backup policy** menu.
1. After you finish defining the backup policy, select **OK**.

> **Note:**
> Log and incremental backups are chained to the full backup to form recovery chains. The full backup is retained until the retention of the last dependent backup (log or incremental) expires. This might mean that the full backup is retained for an extra period to make sure all dependent backups can be recovered. Let's assume a user has a weekly full backup, daily incremental and 2 hour logs. All of them are retained for 30 days. But, the weekly full can be really cleaned up/deleted only after the next full backup is available, that is, after 30 + 7 days. For example, a weekly full backup happens on Nov 16th. According to the retention policy, it should be retained until Dec 16th. The last log backup for this full happens before the next scheduled full, on Nov 22nd. Until this log is available until Dec 22nd, the Nov 16th full can't be deleted. So, the Nov 16th full is retained until Dec 22nd. The same logic applies to incremental backups: if daily incrementals have a 30-day retention, the last incremental before the next full (Nov 22nd) expires on Dec 22nd, so the Nov 16th full is also retained until Dec 22nd.
>
> If backups are in a soft-deleted state, the same chaining and retention dependencies apply. The soft-deleted backups are also retained for 14 additional days beyond the policy retention period before being permanently deleted.

## Run an on-demand backup

Backups run in accordance with the policy schedule. Learn how to [run an on-demand backup](sap-hana-database-manage.md#run-on-demand-backups).

## Run SAP HANA native clients backup on a database with Azure Backup

You can run an on-demand backup using SAP HANA native clients to local file-system instead of Backint. Learn more how to [manage operations using SAP native clients](sap-hana-database-manage.md#manage-operations-using-sap-hana-native-clients).

## Configure multistreaming data backups for higher throughput using Backint

To configure multistreaming data backups, see the [SAP documentation](https://help.sap.com/docs/SAP_HANA_PLATFORM/6b94445c94ae495c83a19646e7c3fd56/18db704959a24809be8d01cc0a409681.html).

Learn about the [supported scenarios](sap-hana-backup-support-matrix.md#support-for-multistreaming-data-backups).

## Review backup status 

Azure Backup periodically synchronizes the datasource between the extension installed on the VM and Azure Backup service, and shows the backup status in the Azure portal. The following table lists the (four) backup status for a datasource:

| Backup state | Description |
| --- | --- |
| **Healthy** | The last backup is successful. |
| **Unhealthy** | The last backup has failed. |
| **NotReachable** | There's currently no synchronization occurring between the extension on the VM and the Azure Backup service. |
| **IRPending** | The first backup on the datasource hasn't occurred yet. |
 
Generally, synchronization occurs *every hour*. However, at the extension level, Azure Backup polls every *5 minutes* to check for any changes in the status of the latest backup compared to the previous one. For example, if the previous backup is successful but the latest backup has failed, Azure Backup syncs that information to the service to update the backup status in the Azure portal accordingly to *Healthy* or *Unhealthy*.
 
If no data sync occurs to the Azure Backup service for more than *2 hours*, Azure Backup shows the backup status as *NotReachable*. This scenario might occur if the VM is shut down for an extended period or there's a network connectivity issue on the VM, causing the synchronization to cease. Once the VM is operational again and the extension services restart, the data sync operation to the service resumes, and the backup status changes to *Healthy* or *Unhealthy* based on the status of the last backup.


Screenshot shows the backup status for the SAP HANA database.

## Next steps

- [Restore SAP HANA databases running on Azure VMs using Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/sap-hana-db-restore.md).
- [Restore SAP HANA databases running on Azure VMs using Azure CLI](tutorial-sap-hana-restore-cli.md).
- [Manage SAP HANA databases that are backed up by Azure Backup using Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/sap-hana-db-manage.md).
- [Manage SAP HANA databases that are backed up by Azure Backup using Azure CLI](tutorial-sap-hana-manage-cli.md).
