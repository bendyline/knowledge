---
title: Enable Continuous Availability on existing Azure NetApp Files SMB volumes
description: Describes how to enable SMB Continuous Availability on existing Azure NetApp Files SMB volume.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.topic: how-to
ms.date: 05/31/2025
ms.author: anfdocs
ms.custom:
  - build-2025
# Customer intent: As a cloud administrator, I want to enable Continuous Availability on existing Azure NetApp Files SMB volumes, so that I can ensure uninterrupted access for users and applications.
---
# Enable Continuous Availability on existing SMB volumes

You can enable the SMB Continuous Availability (CA) feature when you [create a new SMB volume](azure-netapp-files-create-volumes-smb.md#continuous-availability). You can also enable SMB CA on an existing SMB volume; this article shows you how to do so.

>**Important:**
> Custom applications are not supported with SMB Continuous Availability.
> 
> For more information, see [**Enable Continuous Availability**](azure-netapp-files-create-volumes-smb.md#continuous-availability).


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
 
## Steps
       
1. Select the SMB volume that you want to have SMB CA enabled. Then select **Edit**.  
1. On the Edit window that appears, select the **Enable Continuous Availability** checkbox.   
    Snapshot that shows the Enable Continuous Availability option.

1. Reboot the Windows systems connecting to the existing SMB share.   

    > **Note:**
    > Selecting the **Enable Continuous Availability** option alone does not automatically make the existing SMB sessions continuously available. After selecting the option, be sure to reboot the server immediately for the change to take effect.  

1. Use the following command to verify that CA is enabled and used on the system that’s mounting the volume:

    ```powershell-interactive
    get-smbconnection | select -Property servername,ContinuouslyAvailable
    ```
 
    You might need to install a newer PowerShell version. 

    If you know the server name, you can use the `-ServerName` parameter with the command. See the [Get-SmbConnection](https://learn.microsoft.com/powershell/module/smbshare/get-smbconnection?view=windowsserver2019-ps\&preserve-view=true) PowerShell command details.

## Next steps  

* [Create an SMB volume for Azure NetApp Files](azure-netapp-files-create-volumes-smb.md)
