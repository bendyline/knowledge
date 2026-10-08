---
title: Manage SMB share ACLs in Azure NetApp Files
description: Learn how to manage SMB share access control lists in Azure NetApp Files.
services: azure-netapp-files
author: b-ahibbard
ms.author: anfdocs
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 01/03/2025
ms.custom:
  - build-2025
  - sfi-image-nochange
# Customer intent: As a system administrator, I want to manage SMB share access control lists in Azure NetApp Files so that I can control user permissions effectively and ensure proper access levels for shared resources.
---
# Manage SMB share ACLs in Azure NetApp Files

SMB shares can control access to who can mount and access a share, as well as control access levels to users and groups in an Active Directory domain. The first level of permissions that get evaluated are share access control lists (ACLs). 

There are two ways to view share settings:

* In the **Advanced permissions** settings

* With the **Microsoft Management Console (MMC)**

## Prerequisites 

You must have the mount path. You can retrieve this in the Azure portal by navigating to the **Overview** menu of the volume for which you want to configure share ACLs. Identify the **Mount path**.

Screenshot of the mount path.


## View SMB share ACLs with advanced permissions 

Advanced permissions for files, folders, and shares on an Azure NetApp File volume can be accessed by right-clicking the Azure NetApp Files share at the top level of the UNC path (for example, `\\Azure.NetApp.Files\`) or in the Windows Explorer view when navigating to the share itself (for instance, `\\Azure.NetApp.Files\sharename`).

>**Note:**
>You can only view SMB share ACLs in the **Advanced permissions** settings.

1. In Windows Explorer, use the mount path to open the volume. Right-click on the volume, select **Properties**. Switch to the **Security** tab then select **Advanced**.

    Screenshot of security tab.

1. In the new window that pops up, switch to the **Share** tab to view the share-level ACLs. You cannot modify share-level ACLs.  

    >**Note:**
    >Azure NetApp Files doesn't support windows audit ACLs. Azure NetApp Files ignores any audit ACL applied to files or directories hosted on Azure NetApp Files volumes.

    Screenshot of the permissions tab.

    Screenshot of the share tab.


## Modify share-levels ACLs with the Microsoft Management Console

You can only modify the share ACLs in Azure NetApp Files with the Microsoft Management Console (MMC).

1. To modify share-level ACLs in Azure NetApp Files, open the Computer Management MMC from the Server Manager in Windows. From there, select the **Tools** menu then **Computer Management**.

1. In the Computer Management window, right-click **Computer management (local)** then select **Connect to another computer**. 

    Screenshot of the computer management window.

1. In the **Another computer** field, enter the fully qualified domain name (FQDN).

    The FQDN comes from the mount path you retrieved in the prerequisites. For example, if the mount path is `\\ANF-West-f899.contoso.com\SMBVolume`, enter `ANF-West-f899.contoso.com` as the FQDN. 

1. Once connected, expand **System Tools** then select **Shared Folders > Shares**.
1. To manage share permissions, right-click on the name of the share you want to modify from list and select **Properties**.

    Screenshot of the share folder.

1. Add, remove, or modify the share ACLs as appropriate. 

    Screenshot showing how to add a share.
  
## Next step

* [Understand NAS permissions in Azure NetApp Files](network-attached-storage-permissions.md)
