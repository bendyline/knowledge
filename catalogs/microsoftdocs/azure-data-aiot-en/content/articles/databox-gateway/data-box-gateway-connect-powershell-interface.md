---
title: Use Windows PowerShell to connect to and manage Azure Data Box Gateway device
description: Describes how to connect to and then manage Data Box Gateway via the Windows PowerShell interface.
services: databox
author: stevenmatthew

ms.service: azure-data-box-gateway
ms.topic: how-to
ms.date: 10/20/2020
ms.author: shaas
# Customer intent: "As a data administrator, I want to manage my Azure Data Box Gateway device using PowerShell commands, so that I can efficiently configure and monitor its operations without relying solely on the Azure portal."
---
# Manage an Azure Data Box Gateway device via Windows PowerShell

Azure Data Box Gateway solution lets you send data over the network to Azure. This article describes some of the configuration and management tasks for your Data Box Gateway device. You can use the Azure portal, local web UI, or the Windows PowerShell interface to manage your device.

This article focuses on the tasks you do using the PowerShell interface.

This article includes the following procedures:

- Connect to the PowerShell interface
- Create a support package
- Upload certificate
- Boot up in non-DHCP environment
- View device information

## Connect to the PowerShell interface


Depending on the operating system of the client, the procedures to remotely connect to the device are different.

### Remotely connect from a Windows client

Before you begin, make sure that your Windows client is running Windows PowerShell 5.0 or later.

Follow these steps to remotely connect from a Windows client.

1. Run a Windows PowerShell session as an administrator.
2. Make sure that the Windows Remote Management service is running on your client. At the command prompt, type:

    `winrm quickconfig`

3. Assign a variable to the device IP address.

    $ip = "<device_ip>"

    Replace `<device_ip>` with the IP address of your device.

4. To add the IP address of your device to the client’s trusted hosts list, type the following command:

    `Set-Item WSMan:\localhost\Client\TrustedHosts $ip -Concatenate -Force`

5. Start a Windows PowerShell session on the device:

    `Enter-PSSession -ComputerName $ip -Credential $ip\EdgeUser -ConfigurationName Minishell`

6. Provide the password when prompted. Use the same password that is used to sign into the local web UI. The default local web UI password is *Password1*. When you successfully connect to the device using remote PowerShell, you see the following sample output:  

    ```
    Windows PowerShell
    Copyright (C) Microsoft Corporation. All rights reserved.
    
    PS C:\WINDOWS\system32> winrm quickconfig
    WinRM service is already running on this machine.
    PS C:\WINDOWS\system32> $ip = "10.100.10.10"
    PS C:\WINDOWS\system32> Set-Item WSMan:\localhost\Client\TrustedHosts $ip -Concatenate -Force
    PS C:\WINDOWS\system32> Enter-PSSession -ComputerName $ip -Credential $ip\EdgeUser -ConfigurationName Minishell

    WARNING: The Windows PowerShell interface of your device is intended to be used only for the initial network configuration. Please engage Microsoft Support if you need to access this interface to troubleshoot any potential issues you may be experiencing. Changes made through this interface without involving Microsoft Support could result in an unsupported configuration.
    [10.100.10.10]: PS>
    ```

### Remotely connect from a Linux client

On the Linux client that you'll use to connect:

- [Install the latest PowerShell Core for Linux](https://learn.microsoft.com/powershell/scripting/install/installing-powershell-core-on-linux) from GitHub to get the SSH remoting feature. 
- [Install only the `gss-ntlmssp` package from the NTLM module](https://github.com/Microsoft/omi/blob/master/Unix/doc/setup-ntlm-omi.md). For Ubuntu clients, use the following command:
    - `sudo apt-get install gss-ntlmssp`

For more information, go to [PowerShell remoting over SSH](https://learn.microsoft.com/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core).

Follow these steps to remotely connect from an NFS client.

1. To open PowerShell session, type:

    `pwsh`
 
2. For connecting using the remote client, type:

    `Enter-PSSession -ComputerName $ip -Authentication Negotiate -ConfigurationName Minishell -Credential ~\EdgeUser`

    When prompted, provide the password used to sign into your device.
 
> **Note:**
> This procedure does not work on macOS.


## Create a support package


If you experience any device issues, you can create a support package from the system logs. Microsoft Support uses this package to troubleshoot the issues. Follow these steps to create a support package:

1. [Connect to the PowerShell interface of your device](#connect-to-the-powershell-interface).
2. Use the `Get-HcsNodeSupportPackage` command to create a support package. The usage of the cmdlet is as follows:

    ```powershell
    Get-HcsNodeSupportPackage [-Path] <string> [-Zip] [-ZipFileName <string>] [-Include {None | RegistryKeys | EtwLogs
            | PeriodicEtwLogs | LogFiles | DumpLog | Platform | FullDumps | MiniDumps | ClusterManagementLog | ClusterLog |
            UpdateLogs | CbsLogs | StorageCmdlets | ClusterCmdlets | ConfigurationCmdlets | KernelDump | RollbackLogs |
            Symbols | NetworkCmdlets | NetworkCmds | Fltmc | ClusterStorageLogs | UTElement | UTFlag | SmbWmiProvider |
            TimeCmds | LocalUILogs | ClusterHealthLogs | BcdeditCommand | BitLockerCommand | DirStats | ComputeRolesLogs |
            ComputeCmdlets | DeviceGuard | Manifests | MeasuredBootLogs | Stats | PeriodicStatLogs | MigrationLogs |
            RollbackSupportPackage | ArchivedLogs | Default}] [-MinimumTimestamp <datetime>] [-MaximumTimestamp <datetime>]
            [-IncludeArchived] [-IncludePeriodicStats] [-Credential <pscredential>]  [<CommonParameters>]
    ```

    The cmdlet collects logs from your device and copies those logs to a specified network or local share.

    The parameters used are as follows:

    - `-Path` - Specify the network or the local path to copy support package to. (required)
    - `-Credential` - Specify the credentials to access the protected path.
    - `-Zip` - Specify to generate a zip file.
    - `-Include` - Specify to include the components to be included in the support package. If not specified, `Default` is assumed.
    - `-IncludeArchived` - Specify to include archived logs in the support package.
    - `-IncludePeriodicStats` - Specify to include periodic stat logs in the support package.

    



## Upload certificate


A proper SSL certificate ensures that you're sending encrypted information to the right server. Besides encryption, the certificate also allows for authentication. You can upload your own trusted SSL certificate via the PowerShell interface of the device.

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Use the `Set-HcsCertificate` cmdlet to upload the certificate. When prompted, provide the following parameters:

   - `CertificateFilePath` - Path to the share that contains the certificate file in *.pfx* format.
   - `CertificatePassword` - A password used to protect the certificate.
   - `Credentials` - Username to access the share that contains the certificate. Provide the password to the network share when prompted.

     The following example shows the usage of this cmdlet:

     ```
     $pwd="<CertificatePassword>"
     $password=ConvertTo-SecureString -String $pwd -AsPlainText -Force
     $cred=New-Object System.Management.Automation.PSCredential('Administrator',$password)

     Set-HcsCertificate -Scope LocalWebUI -CertificateFilePath \\myfileshare\certificates\mycert.pfx -CertificatePassword $cred -Credential "Username"
     ```



## Boot up in non-DHCP environment


If you boot up in a non-DHCP environment, follow these steps to deploy the virtual machine for your Data Box Gateway.

1. [Connect to the Windows PowerShell interface of the device](#connect-to-the-powershell-interface).
2. Use the `Get-HcsIpAddress` cmdlet to list the network interfaces enabled on your virtual device. If your device has a single network interface enabled, the default name assigned to this interface is `Ethernet`.

    The following example shows the usage of this cmdlet:

    ```
    [10.100.10.10]: PS>Get-HcsIpAddress

    OperationalStatus : Up
    Name              : Ethernet
    UseDhcp           : True
    IpAddress         : 10.100.10.10
    Gateway           : 10.100.10.1
    ```

3. Use the `Set-HcsIpAddress` cmdlet to configure the network. See the following example:

    ```
    Set-HcsIpAddress –Name Ethernet –IpAddress 10.161.22.90 –Netmask 255.255.255.0 –Gateway 10.161.22.1
    ```




## View device information


1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Use the `Get-HcsApplianceInfo` to get the information for your device.

    The following example shows the usage of this cmdlet:

    ```
    [10.100.10.10]: PS>Get-HcsApplianceInfo
    
    Id                            : b2044bdb-56fd-4561-a90b-407b2a67bdfc
    FriendlyName                  : DBE-NBSVFQR94S6
    Name                          : DBE-NBSVFQR94S6
    SerialNumber                  : HCS-NBSVFQR94S6
    DeviceId                      : 40d7288d-cd28-481d-a1ea-87ba9e71ca6b
    Model                         : Virtual
    FriendlySoftwareVersion       : Data Box Gateway 1902
    HcsVersion                    : 1.4.771.324
    IsClustered                   : False
    IsVirtual                     : True
    LocalCapacityInMb             : 1964992
    SystemState                   : Initialized
    SystemStatus                  : Normal
    Type                          : DataBoxGateway
    CloudReadRateBytesPerSec      : 0
    CloudWriteRateBytesPerSec     : 0
    IsInitialPasswordSet          : True
    FriendlySoftwareVersionNumber : 1902
    UploadPolicy                  : All
    DataDiskResiliencySettingName : Simple
    ApplianceTypeFriendlyName     : Data Box Gateway
    IsRegistered                  : False
    ```

    Here is a table summarizing some of the important device information:

    | Parameter | Description |
    | --- | --- |
    | FriendlyName | The friendly name of the device as configured through the local web UI during device deployment. The default friendly name is the device serial number. |
    | SerialNumber | The device serial number is a unique number assigned at the factory. |
    | Model | The model for your device. The model is virtual for Data Box Gateway. |
    | FriendlySoftwareVersion | The friendly string that corresponds to the device software version. For a system running preview, the friendly software version would be Data Box Edge 1902. |
    | HcsVersion | The HCS software version running on your device. For instance, the HCS software version corresponding to Data Box Edge 1902 is 1.4.771.324. |
    | LocalCapacityInMb | The total local capacity of the device in Megabits. |
    | IsRegistered | This value indicates if your device is activated with the service. |





## Next steps

- Deploy [Azure Data Box Gateway](data-box-gateway-deploy-prep.md) in Azure portal.
