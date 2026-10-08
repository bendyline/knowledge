---
title: Create an SMB volume for Azure NetApp Files 
description: This article shows you how to create an SMB3 volume in Azure NetApp Files. Learn about requirements for Active Directory connections and Domain Services.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 11/12/2025
ms.author: anfdocs
ms.custom: sfi-image-nochange
# Customer intent: As a cloud administrator, I want to create an SMB volume in Azure NetApp Files, so that I can leverage scalable storage solutions that meet my organization’s data management and sharing requirements.
---
# Create an SMB volume for Azure NetApp Files

Azure NetApp Files supports creating volumes using NFS (NFSv3 or NFSv4.1), SMB3, or dual protocol (NFSv3 and SMB, or NFSv4.1 and SMB). A volume's capacity consumption counts against its pool's provisioned capacity. 

This article shows you how to create an SMB3 volume. For NFS volumes, see [Create an NFS volume](azure-netapp-files-create-volumes.md). For dual-protocol volumes, see [Create a dual-protocol volume](create-volumes-dual-protocol.md). 

>**Important:**
>For Elastic zone-redundant storage, see [Create an Elastic zone-redundant SMB volume](elastic-volume-server-message-block.md).

## Before you begin 


>**Important:**
>If you're using a custom RBAC/IAM role, you must have the `Microsoft.Network/virtualNetworks/subnets/read` permission configured to create or update a volume. 
>
> For more information about permissions and to confirm permissions configuration, see [Create or update Azure custom roles using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/custom-roles-portal.md).

* You must have already set up a capacity pool. See [Create a capacity pool](azure-netapp-files-set-up-capacity-pool.md).     
* A subnet must be delegated to Azure NetApp Files. See [Delegate a subnet to Azure NetApp Files](azure-netapp-files-delegate-subnet.md).

## Configure Active Directory connections 

Before creating an SMB volume, you need to create an Active Directory connection. If you haven't configured Active Directory connections for Azure NetApp files, follow instructions described in [Create and manage Active Directory connections](create-active-directory-connections.md).

## Add an SMB volume

1. Select the **Volumes** blade from the Capacity Pools blade. 

    Navigate to Volumes

2. Select **+ Add volume** to create a volume.   
    
    The Create a Volume window appears.

    Screenshot of create new volume interface.

3. In the Create a Volume window, select **Create** and provide information for the following fields under the Basics tab:   
    * **Volume name**      
        Specify the name for the volume that you are creating.   

        Refer to [Naming rules and restrictions for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/resource-name-rules.md#microsoftnetapp) for naming conventions on volumes. Additionally, you cannot use `default` or `bin` as the volume name.

    * **Capacity pool**  
        Specify the capacity pool where you want the volume to be created.

    * **Quota**  
        Specify the amount of logical storage that is allocated to the volume.  

        The **Available quota** field shows the amount of unused space in the chosen capacity pool that you can use towards creating a new volume. The size of the new volume must not exceed the available quota.  

    * **Large Volume**
        
        
Regular volumes quotas are between 50 GiB and 100 TiB. Large volume quotas range from 50 TiB to 1 PiB in size. To create a volume in this size range, select **Yes**. Volume quotas are entered in GiB.

>**Important:**
> Before using large volumes, you must first [register the feature](large-volumes-requirements-considerations.md#register-the-feature) and request [an increase in regional capacity quota](azure-netapp-files-resource-limits.md#request-limit-increase).
>
>Regular volumes cannot be converted to large volumes. Large volumes can't be resized to less than 50 TiB. To understand the requirements and considerations of large volumes, see [Requirements and considerations for large volumes](large-volumes-requirements-considerations.md). For other limits, see [Resource limits](azure-netapp-files-resource-limits.md#resource-limits).

* **Large volume type**

    * To create a volume between 50 TiB and 1 PiB, select **Large volume**.
    * If you plan to enable cool access and want to scale to 7.2 PiB, select **Extra-large volume 7.2 PiB**. Ensure you meet the [requirements for large volumes up to 7.2 PiB](large-volumes-requirements-considerations.md#requirements-and-considerations-for-large-volumes-up-to-72-pib-preview).

* **Breakthrough mode**

    If you're using breakthrough mode to increase throughput and quota, select the box.

    You must first be registered to use breakthrough mode. For registration and other considerations, see [breakthrough mode](large-volumes-requirements-considerations.md#register-for-breakthrough-mode).


    * **Throughput (MiB/S)**   
        If the volume is created in a manual QoS capacity pool, specify the throughput you want for the volume.   

        If the volume is created in an auto QoS capacity pool, the value displayed in this field is (quota x service level throughput).   

    * **Enable Cool Access**, **Coolness Period**, and **Cool Access Retrieval Policy**      
        These fields configure [Azure NetApp Files storage with cool access](cool-access-introduction.md). For descriptions, see [Manage Azure NetApp Files storage with cool access](manage-cool-access.md). 

    * **Virtual network**  
        Specify the Azure virtual network (VNet) from which you want to access the volume.  

        The VNet you specify must have a subnet delegated to Azure NetApp Files. The Azure NetApp Files service can be accessed only from the same VNet or from a VNet that is in the same region as the volume through VNet peering. You can also access the volume from  your on-premises network through Express Route.   

    * **Subnet**  
        Specify the subnet that you want to use for the volume.  
        The subnet you specify must be delegated to Azure NetApp Files. 
        
        If you haven't delegated a subnet, you can select **Create new** on the Create a Volume page. Then in the Create Subnet page, specify the subnet information, and select **Microsoft.NetApp/volumes** to delegate the subnet for Azure NetApp Files. In each VNet, only one subnet can be delegated to Azure NetApp Files.   
      
        Screenshot of create new subnet interface.
    
    * **Network features**  
        In supported regions, you can specify whether you want to use **Basic** or **Standard** network features for the volume. See [Configure network features for a volume](configure-network-features.md) and [Guidelines for Azure NetApp Files network planning](azure-netapp-files-network-topologies.md) for details.

    * **Availability Zone**   
        This option lets you deploy the new volume in the logical availability zone that you specify. Select an availability zone where Azure NetApp Files resources are present. For details, see [Manage availability zone volume placement](manage-availability-zone-volume-placement.md).

    * **Encryption key source** 
        Select Microsoft Managed Key or Customer Managed Key.  See [Configure customer-managed keys for Azure NetApp Files volume encryption](configure-customer-managed-keys.md) and [Azure NetApp Files double encryption at rest](double-encryption-at-rest.md) to learn more about this field. 

    * **Advanced Ransomware Protection**  
        Select **Enabled** to configure ransomware threat detection alerts for your volumes. For more information, see [Configure advanced ransomware protection](ransomware-configure.md). 

    * If you want to apply an existing snapshot policy to the volume, select **Show advanced section** to expand it, specify whether you want to hide the snapshot path, and select a snapshot policy in the pull-down menu. 

        For information about creating a snapshot policy, see [Manage snapshot policies](snapshots-manage-policy.md).

        Show advanced selection

4. Select **Protocol** and complete the following information:  
    * Select **SMB** as the protocol type for the volume.  

    * Select your **Active Directory** connection from the drop-down list.  
    
    * Specify a unique **share name** for the volume. This share name is used when you create mount targets. The requirements for the share name are as follows:   
        - For volumes not in an availability zone or volumes in the same availability zone, it must be unique within each subnet in the region.  
        - For volumes in availability zones, it must be unique within each availability zone. For more information, see [Manage availability zone volume placement](manage-availability-zone-volume-placement.md#file-path-uniqueness).
        - It can contain only letters, numbers, or dashes (`-`). 
        - The length must not exceed 80 characters.   
    
    * <a name="smb3-encryption"></a>If you want to enable encryption for SMB3, enable **SMB3 Protocol Encryption**.   

        This feature enables encryption for in-flight SMB3 data. SMB clients not using SMB3 encryption will not be able to access this volume.  Data at rest is encrypted regardless of this setting.   
        See [SMB encryption](azure-netapp-files-smb-performance.md#smb-encryption) for additional information.

    * <a name="access-based-enumeration"></a> If you want to enable access-based enumeration, enable **Access Based Enumeration**.

        Hide directories and files created under a share from users who don't have access permissions to the files or folders under the share. Users are still able to view the share.

    * <a name="continuous-availability"></a>If you want to enable Continuous Availability for the SMB volume, enable **Continuous Availability**.    
      
        
You should enable Continuous Availability for only the following workloads and use cases:

* [Citrix App Layering](https://docs.citrix.com/en-us/citrix-app-layering/4.html)
* [FSLogix user profile containers](https://learn.microsoft.com/azure/virtual-desktop/create-fslogix-profile-container), including [FSLogix ODFC containers](https://learn.microsoft.com/fslogix/concepts-container-types#odfc-container)
* [MSIX app attach with Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/create-netapp-files)
    * When using MSIX applications with the `CIM FS` file format:
        * The number of AVD session hosts per volume shouldn't exceed 500.
        * The number of MSIX applications per volume shouldn't exceed 40.
    * When using MSIX applications with the `VHDX` file format:
        * The number of AVD session hosts per volume shouldn't exceed 500.
        * The number of MSIX applications per volume shouldn't exceed 60.
    * When using a combination of MSIX applications with both the `VHDX` and `CIM FS` file formats:
        * The number of AVD session hosts per volume shouldn't exceed 500.
        * The number of MSIX applications per volume using the `CIM FS` file format shouldn't exceed 24.
        * The number of MSIX applications per volume using the `VHDX` file format shouldn't exceed 24.
* SQL Server
    * Continuous Availability is currently supported on Windows SQL Server.
    * Linux SQL Server isn't currently supported.

>**Important:**
>Using SMB Continuous Availability shares is only supported for Citrix App Layering, SQL Server, FSLogix user profile containers including FSLogix ODFC containers, or MSIX app attach containers. This feature is currently supported on SQL Server on Windows. No other workloads are supported.
>
> If you're using a non-administrator (domain) account to install SQL Server, ensure the account has the required security privilege assigned. If the domain account doesn't have the required security privilege (`SeSecurityPrivilege`), and the privilege can't be set at the domain level, you can grant the privilege to the account by using the Security privilege users field of Active Directory connections. For more information, see [Create an Active Directory connection](create-active-directory-connections.md#create-an-active-directory-connection).

>**Important:**
>Change notifications aren't supported with Continuously Available shares in Azure NetApp Files.

        **Custom applications aren't supported with SMB Continuous Availability.**
    * <a name="non-browsable-share"></a> You can enable the **non-browsable-share feature.**

        Prevent the Windows client from browsing the share. The share doesn't show up in the Windows File Browser or in the list of shares when you run the `net view \\server /all` command.

    * To enable opportunistic locks (oplocks) on new or existing volumes, select **Enabled** from the dropdown menu. 
    
      Oplocks improve compatibility with legacy applications that require client caching behavior to be disabled. By default, oplocks is enabled and **System default** is selected. Cross-region replication destination volumes can be configured with an oplock setting that is independent of the source volume.
   
    :::image type="content" source="./media/azure-netapp-files-create-volumes-smb/azure-netapp-files-protocol-smb.png" alt-text="Screenshot showing the Protocol tab of creating an SMB volume." lightbox="./media/azure-netapp-files-create-volumes-smb/azure-netapp-files-protocol-smb.png":::   

5. 
Data protection settings can now be included as part of the "create volume" workflow (preview). To configure backup protection settings, you should [register the feature](protect-volumes.md#register-the-feature) and then select **Data Protection**.

>**Note:**
>By default, the **Enable scheduled backup** option is enabled. If you do not want to enable scheduled backup on the volume, you can disable the **Enable scheduled backup** option.

Screenshot showing the Protection tab of creating a volume.

>**Note:**
> To enable scheduled backups, you must acknowledge the option, **I acknowledge that enabling scheduled backups may incur additional charges as per backup pricing.**

* **Backup vault**      
    Specify the backup vault for the volume or [create a new backup vault](backup-vault-manage.md). 
        
* **Backup policy**  
    Specify the backup policy for the volume or [create a new backup policy](backup-configure-policy-based.md).
        
    You can select only an enabled backup policy. The daily, weekly, and monthly backup retention periods are displayed based on the selected backup policy.  

* **Daily backups retained**  
    Specifies the number of backups that can be retained on a daily basis.

* **Weekly backups retained**  
    Specifies the number of backups that can be retained on a weekly basis. 

* **Monthly backups retained**  
    Specifies the number of backups that can be retained on a monthly basis.



6. Select **Review + Create** to review the volume details. Then select **Create** to create the SMB volume.

    The volume you created appears in the Volumes page. 
 
    A volume inherits subscription, resource group, location attributes from its capacity pool. To monitor the volume deployment status, you can use the Notifications tab.

## Control access to an SMB volume  

Access to an SMB volume is managed through permissions. 

### NTFS file and folder permissions  

You can set permissions for a file or folder by using the **Security** tab of the object's properties in the Windows SMB client.
 
Set file and folder permissions 

### Modify SMB share permissions

You can modify SMB share permissions using Microsoft Management Console (MMC).

>**Important:**
>Modifying SMB share permissions poses a risk. If the users or groups assigned to the share properties are removed from the Active Directory, or if the permissions for the share become unusable, then the entire share will become inaccessible.

1. To open Computer Management MMC on any Windows server, in the Control Panel, select **Administrative Tools > Computer Management**.
1. Select **Action > Connect to another computer**.
1. In the **Select Computer** dialog box, enter the name of the Azure NetApp Files FQDN or IP address or select **Browse** to locate the storage system.
1. Select **OK** to connect the MMC to the remote server.
1. When the MMC connects to the remote server, in the navigation pane, select **Shared Folders > Shares**.
1. In the display pane that lists the shares, double-click a share to display its properties. In the **Properties** dialog box, modify the properties as needed.

## Next steps  

* [Manage availability zone volume placement for Azure NetApp Files](manage-availability-zone-volume-placement.md)
* [Requirements and considerations for large volumes](large-volumes-requirements-considerations.md)
* [Mount a volume for Windows or Linux virtual machines](azure-netapp-files-mount-unmount-volumes-for-virtual-machines.md)
* [Resource limits for Azure NetApp Files](azure-netapp-files-resource-limits.md)
* [Enable Continuous Availability on existing SMB volumes](enable-continuous-availability-existing-SMB.md)
* [SMB encryption](azure-netapp-files-smb-performance.md#smb-encryption)
* [Troubleshoot volume errors for Azure NetApp Files](troubleshoot-volumes.md)
* [Learn about virtual network integration for Azure services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-for-azure-services.md)
* [Install a new Active Directory forest using Azure CLI](https://learn.microsoft.com/windows-server/identity/ad-ds/deploy/virtual-dc/adds-on-azure-vm)
* [Application resilience FAQs for Azure NetApp Files](faq-application-resilience.md)
