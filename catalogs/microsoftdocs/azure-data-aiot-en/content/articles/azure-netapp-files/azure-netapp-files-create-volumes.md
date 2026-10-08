---
title: Create an NFS volume for Azure NetApp Files
description: This article shows you how to create an NFS volume in Azure NetApp Files. Learn about considerations, like which version to use, and best practices.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 02/05/2026
ms.author: anfdocs
# Customer intent: As a cloud architect, I want to create an NFS volume in Azure NetApp Files, so that I can support my application’s data management requirements and ensure optimized performance through proper version selection and configuration.
---
# Create an NFS volume for Azure NetApp Files

Azure NetApp Files supports creating volumes using NFS (NFSv3 or NFSv4.1), SMB3, or dual protocol (NFSv3 and SMB, or NFSv4.1 and SMB). A volume's capacity consumption counts against its pool's provisioned capacity. 

This article shows you how to create an NFS volume. For SMB volumes, see [Create an SMB volume](azure-netapp-files-create-volumes-smb.md). For dual-protocol volumes, see [Create a dual-protocol volume](create-volumes-dual-protocol.md).

>**Important:**
>For Elastic zone-redundant storage, see [Create an Elastic zone-redundant NFS volume](elastic-volume.md).

## Before you begin 


>**Important:**
>If you're using a custom RBAC/IAM role, you must have the `Microsoft.Network/virtualNetworks/subnets/read` permission configured to create or update a volume. 
>
> For more information about permissions and to confirm permissions configuration, see [Create or update Azure custom roles using the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/custom-roles-portal.md).

* You must have already set up a capacity pool.  
    See [Create a capacity pool](azure-netapp-files-set-up-capacity-pool.md).   
* A subnet must be delegated to Azure NetApp Files.  
    See [Delegate a subnet to Azure NetApp Files](azure-netapp-files-delegate-subnet.md).
* Plan your lightweight directory access protocol (LDAP) server.
    If you're using FreeIPA, OpenLDAP, or Red Hat Directory Server, you must create the server before creating the NFS volumes. For other considerations, see [Configure LDAP directory servers](configure-directory-server.md).

    >**Note:**
    >
Kerberos isn't currently supported with FreeIPA, Red Hat IdM, OpenLDAP, Red Hat Directory Server, and Oracle Unified Directory. 
    
* You must ensure that the Active Directory connector has the required permissions to set the encryption style of the volume.
  
## Considerations 

* Deciding which NFS version to use  
  NFSv3 can handle a wide variety of use cases and is commonly deployed in most enterprise applications. You should validate what version (NFSv3 or NFSv4.1) your application requires and create your volume using the appropriate version. For example, if you use [Apache ActiveMQ](https://activemq.apache.org/shared-file-system-master-slave), file locking with NFSv4.1 is recommended over NFSv3. 

* Security  
  Support for UNIX mode bits (read, write, and execute) is available for NFSv3 and NFSv4.1. Root-level access is required on the NFS client to mount NFS volumes.

* User ID mapping in NFSv4.1 for LDAP-enabled and non-LDAP volumes  
  To avoid permission issues including access for a root user when using NFSv4.1, the ID domain configuration on the NFS client and Azure NetApp Files must match. User ID mapping can use centralized user management with LDAP or use local users for non-LDAP volumes. To configure the ID Domain in Azure NetApp Files for non-LDAP volumes, see [Configure NFSv4.1 ID domain for Azure NetApp Files](azure-netapp-files-configure-nfsv41-domain.md). 

## Best practices

* Ensure that you’re using the proper mount instructions for the volume. See [Mount a volume for Windows or Linux VMs](azure-netapp-files-mount-unmount-volumes-for-virtual-machines.md).

* The NFS client should be in the same virtual network or peered virtual network as the Azure NetApp Files volume. Connecting from outside the virtual network is supported; however, it will introduce additional latency and decrease overall performance.

* Ensure that the NFS client is up to date and running the latest updates for the operating system.

## Create an NFS volume

1.	Select the **Volumes** blade from the Capacity Pools blade. Select **+ Add volume** to create a volume. 

    Navigate to Volumes 

2.	In the Create a Volume window, select **Create**, and provide information for the following fields under the Basics tab:   
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
        Specify the Microsoft Azure Virtual Network from which you want to access the volume.  

        The Virtual Network you specify must have a subnet delegated to Azure NetApp Files. The Azure NetApp Files service can be accessed only from the same Virtual Network or from a virtual network that's in the same region as the volume through virtual network peering. You can also access the volume from your on-premises network through Express Route.  

    * **Subnet**  
        Specify the subnet that you want to use for the volume.  
        The subnet you specify must be delegated to Azure NetApp Files. 
        
        If you have not delegated a subnet, select **Create new** on the Create a Volume page. Then in the Create Subnet page, specify the subnet information, and select **Microsoft.NetApp/volumes** to delegate the subnet for Azure NetApp Files. In each VNet, only one subnet can be delegated to Azure NetApp Files.   
 
        Screenshot of create new volume interface.
    
        Create subnet

    * **Network features**  
        As of June 2026, you can only select Standard network features for new Azure NetApp Files volumes. See [Configure network features for a volume](configure-network-features.md) and [Guidelines for Azure NetApp Files network planning](azure-netapp-files-network-topologies.md) for details.

    * **Availability zone**   
        This option lets you deploy the new volume in the logical availability zone that you specify. Select an availability zone where Azure NetApp Files resources are present. For details, see [Manage availability zone volume placement](manage-availability-zone-volume-placement.md).

    * **Encryption key source**  
        You can select Microsoft Managed Key or Customer Managed Key. See [Configure customer-managed keys for Azure NetApp Files volume encryption](configure-customer-managed-keys.md) and [Azure NetApp Files double encryption at rest](double-encryption-at-rest.md) about using this field. 

    * **Advanced Ransomware Protection**  
        Select **Enabled** to configure ransomware threat detection alerts for your volumes. For more information, see [Configure advanced ransomware protection](ransomware-configure.md). 

    * If you want to apply an existing snapshot policy to the volume, select **Show advanced section** to expand it, specify whether you want to hide the snapshot path, and select a snapshot policy in the pull-down menu. 

        For information about creating a snapshot policy, see [Manage snapshot policies](snapshots-manage-policy.md).

        Show advanced selection

        >**Note:**
        >By default, the `.snapshot` directory path is hidden from NFSv4.1 clients. Enabling the **Hide snapshot path** option will hide the .snapshot directory from NFSv3 clients; the directory will still be accessible.

3. Select **Protocol** then complete the following actions:  
    * Select **NFS** as the protocol type for the volume.   

    * Specify a unique **file path** for the volume. This path is used when you create mount targets. The requirements for the path are as follows:   
        - For volumes not in an availability zone or volumes in the same availability zone, it must be unique within each subnet in the region. 
        - For volumes in availability zones, it must be unique within each availability zone. For more information, see [Manage availability zone volume placement](manage-availability-zone-volume-placement.md#file-path-uniqueness). 
        - It must start with an alphabetical character.
        - It can contain only letters, numbers, or dashes (`-`). 
        - The length must not exceed 80 characters.

    * Select the **Version** (**NFSv3** or **NFSv4.1**) for the volume.  

    * If you are using NFSv4.1, indicate whether you want to enable **Kerberos** encryption for the volume.  

        Additional configurations are required if you use Kerberos with NFSv4.1. Follow the instructions in [Configure NFSv4.1 Kerberos encryption](configure-kerberos-encryption.md).

    * Select **LDAP** to enable LDAP users and extended groups (up to 1,024 groups) to access the volume.
        * For Active Directory servers, follow instructions in [Configure AD DS LDAP with extended groups for NFS volume access](configure-ldap-extended-groups.md) to complete the required configurations. 
        * For other servers, you must have created the server before you can create the volume. Follow instructions in [Configure LDAP directory servers](configure-directory-server.md).

    * **LDAP server type**: If you've selected **LDAP**, choose the server connection type:
        - For Active Directory, select **Active Directory connections**.
        - For all other servers, select **LDAP connection**.
 
    *  Customize **Unix Permissions** as needed to specify change permissions for the mount path. The setting does not apply to the files under the mount path. The default setting is `0770`. This default setting grants read, write, and execute permissions to the owner and the group, but no permissions are granted to other users.     
        Registration requirement and considerations apply for setting **Unix Permissions**. Follow instructions in [Configure Unix permissions and change ownership mode](configure-unix-permissions-change-ownership-mode.md).   

    * Optionally, [configure export policy for the NFS volume](azure-netapp-files-configure-export-policy.md).

    Screenshot showing the Protocol tab of creating an NFS volume.

4. 
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


   
5. Select **Review + Create** to review the volume details. Select **Create** to create the volume.

    The volume you created appears in the Volumes page. 
 
    A volume inherits subscription, resource group, location attributes from its capacity pool. To monitor the volume deployment status, you can use the Notifications tab.

## Next steps  

* [Manage availability zone volume placement for Azure NetApp Files](manage-availability-zone-volume-placement.md)
* [Configure NFSv4.1 default domain for Azure NetApp Files](azure-netapp-files-configure-nfsv41-domain.md)
* [Configure NFSv4.1 Kerberos encryption](configure-kerberos-encryption.md)
* [Enable Active Directory Domain Services (AD DS) LDAP authentication for NFS volumes](configure-ldap-over-tls.md)
* [Configure AD DS LDAP with extended groups for NFS volume access](configure-ldap-extended-groups.md)
* [Mount a volume for Windows or Linux VMs](azure-netapp-files-mount-unmount-volumes-for-virtual-machines.md)
* [Configure export policy for an NFS volume](azure-netapp-files-configure-export-policy.md)
* [Configure Unix permissions and change ownership mode](configure-unix-permissions-change-ownership-mode.md). 
* [Resource limits for Azure NetApp Files](azure-netapp-files-resource-limits.md)
* [Learn about virtual network integration for Azure services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-network-for-azure-services.md)
* [Configure access control lists on NFSv4.1 with Azure NetApp Files](configure-access-control-lists.md)
* [Application resilience FAQs for Azure NetApp Files](faq-application-resilience.md)
* [Requirements and considerations for large volumes](large-volumes-requirements-considerations.md)
