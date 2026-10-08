---
title: Connect to and manage Microsoft Azure Stack Edge Pro GPU device via the Windows PowerShell interface | Microsoft Docs
description: Describes how to connect to and then manage Azure Stack Edge Pro GPU via the Windows PowerShell interface.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 11/05/2025
ms.author: sipastak
ms.custom: sfi-ropc-nochange
---
# Manage an Azure Stack Edge Pro GPU device via Windows PowerShell


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


Azure Stack Edge Pro GPU solution lets you process data and send it over the network to Azure. This article describes some of the configuration and management tasks for your Azure Stack Edge Pro GPU device. You can use the Azure portal, local web UI, or the Windows PowerShell interface to manage your device.

This article focuses on how you can connect to the PowerShell interface of the device and the tasks you can do using this interface. 


## Connect to the PowerShell interface


Depending on the operating system of client, the procedures to remotely connect to the device are different.

### Remotely connect from a Windows client


#### Prerequisites

Before you begin, make sure that:

- Your Windows client is running Windows PowerShell 5.0 or later.
- Your Windows client has the signing chain (root certificate) corresponding to the node certificate installed on the device. For detailed instructions, see [Install certificate on your Windows client](azure-stack-edge-gpu-manage-certificates.md#import-certificates-on-the-client-accessing-the-device).
- The `hosts` file located at `C:\Windows\System32\drivers\etc` for your Windows client has an entry corresponding to the node certificate in the following format:

    `<Device IP>    <Node serial number>.<DNS domain of the device>`

    Here is an example entry for the `hosts` file:
 
    `10.100.10.10    1HXQG13.wdshcsso.com`
  

#### Detailed steps

Follow these steps to remotely connect from a Windows client.

1. Run a Windows PowerShell session as an administrator.
2. Make sure that the Windows Remote Management service is running on your client. At the command prompt, type:

    ```powershell
    winrm quickconfig
    ```

    For more information, see [Installation and configuration for Windows Remote Management](https://learn.microsoft.com/windows/win32/winrm/installation-and-configuration-for-windows-remote-management#quick-default-configuration).

3. Assign a variable to the connection string used in the `hosts` file.

    ```powershell
    $Name = "<Node serial number>.<DNS domain of the device>"
    ``` 

    Replace `<Node serial number>` and `<DNS domain of the device>` with the node serial number and DNS domain of your device. You can get the values for node serial number from the **Certificates** page and DNS domain from the **Device** page in the local web UI of your device.

4. To add this connection string for your device to the client’s trusted hosts list, type the following command:

    ```powershell
    Set-Item WSMan:\localhost\Client\TrustedHosts $Name -Concatenate -Force
    ```

5. Start a Windows PowerShell session on the device:

    ```powershell
    Enter-PSSession -ComputerName $Name -Credential ~\EdgeUser -ConfigurationName Minishell -UseSSL
    ```

    If you see an error related to trust relationship, then check if the signing chain of the node certificate uploaded to your device is also installed on the client accessing your device.

6. Provide the password when prompted. Use the same password that is used to sign into the local web UI. The default local web UI password is *Password1*. When you successfully connect to the device using remote PowerShell, you see the following sample output:  

    ```
    Windows PowerShell
    Copyright (C) Microsoft Corporation. All rights reserved.
    
    PS C:\WINDOWS\system32> winrm quickconfig
    WinRM service is already running on this machine.
    PS C:\WINDOWS\system32> $Name = "1HXQG13.wdshcsso.com"
    PS C:\WINDOWS\system32> Set-Item WSMan:\localhost\Client\TrustedHosts $Name -Concatenate -Force
    PS C:\WINDOWS\system32> Enter-PSSession -ComputerName $Name -Credential ~\EdgeUser -ConfigurationName Minishell -UseSSL

    WARNING: The Windows PowerShell interface of your device is intended to be used only for the initial network configuration. Please engage Microsoft Support if you need to access this interface to troubleshoot any potential issues you may be experiencing. Changes made through this interface without involving Microsoft Support could result in an unsupported configuration.
    [1HXQG13.wdshcsso.com]: PS>
    ```

When you use the `-UseSSL` option, you are remoting via PowerShell over *https*. We recommend that you always use *https* to remotely connect via PowerShell. Within trusted networks, remoting via PowerShell over http is acceptable. You first enable remote PowerShell over http in the local UI. Then you can connect to PowerShell interface of the device by using the preceding procedure without the `-UseSSL` option.

If you are not using the certificates (we recommend that you use the certificates!), you can skip the certificate validation check by using the session options: `-SkipCACheck -SkipCNCheck -SkipRevocationCheck`.

```powershell
$sessOptions = New-PSSessionOption -SkipCACheck -SkipCNCheck -SkipRevocationCheck 
Enter-PSSession -ComputerName $Name -Credential ~\EdgeUser -ConfigurationName Minishell -UseSSL -SessionOption $sessOptions    
```
Here is an example output when skipping the certificate check:

```powershell
PS C:\WINDOWS\system32> $Name = "1HXQG13.wdshcsso.com"
PS C:\WINDOWS\system32> $sessOptions = New-PSSessionOption -SkipCACheck -SkipCNCheck -SkipRevocationCheck
PS C:\WINDOWS\system32> $sessOptions

MaximumConnectionRedirectionCount : 5
NoCompression                     : False
NoMachineProfile                  : False
ProxyAccessType                   : None
ProxyAuthentication               : Negotiate
ProxyCredential                   :
SkipCACheck                       : True
SkipCNCheck                       : True
SkipRevocationCheck               : True
OperationTimeout                  : 00:03:00
NoEncryption                      : False
UseUTF16                          : False
IncludePortInSPN                  : False
OutputBufferingMode               : None
MaxConnectionRetryCount           : 0
Culture                           :
UICulture                         :
MaximumReceivedDataSizePerCommand :
MaximumReceivedObjectSize         :
ApplicationArguments              :
OpenTimeout                       : 00:03:00
CancelTimeout                     : 00:01:00
IdleTimeout                       : -00:00:00.0010000

PS C:\WINDOWS\system32> Enter-PSSession -ComputerName $Name -Credential ~\EdgeUser -ConfigurationName Minishell -UseSSL -SessionOption $sessOptions
WARNING: The Windows PowerShell interface of your device is intended to be used only for the initial network configuration. Please
engage Microsoft Support if you need to access this interface to troubleshoot any potential issues you may be experiencing.
Changes made through this interface without involving Microsoft Support could result in an unsupported configuration.
[1HXQG13.wdshcsso.com]: PS>
```

> **Important:**
> In the current release, you can connect to the PowerShell interface of the device only via a Windows client. The `-UseSSL` option does not work with the Linux clients.

<!--### Remotely connect from a Linux client-->

<!--On the Linux client that you'll use to connect:

- [Install the latest PowerShell Core for Linux](/powershell/scripting/install/installing-powershell-core-on-linux) from GitHub to get the SSH remoting feature. 
- [Install only the `gss-ntlmssp` package from the NTLM module](https://github.com/Microsoft/omi/blob/master/Unix/doc/setup-ntlm-omi.md). For Ubuntu clients, use the following command:
    - `sudo apt-get install gss-ntlmssp`

For more information, go to [PowerShell remoting over SSH](/powershell/scripting/learn/remoting/ssh-remoting-in-powershell-core).

Follow these steps to remotely connect from an NFS client.

1. To open PowerShell session, type:

    `pwsh`
 
2. For connecting using the remote client, type:

    `Enter-PSSession -ComputerName $ip -Authentication Negotiate -ConfigurationName Minishell -Credential ~\EdgeUser`

    When prompted, provide the password used to sign into your device.
 
> [!NOTE]
> This procedure does not work on Mac OS.-->

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
    | Model | The model for your Azure Stack Edge or Data Box Gateway device. The model is physical for Azure Stack Edge and virtual for Data Box Gateway. |
    | FriendlySoftwareVersion | The friendly string that corresponds to the device software version. For a system running preview, the friendly software version would be Data Box Edge 1902. |
    | HcsVersion | The HCS software version running on your device. For instance, the HCS software version corresponding to Data Box Edge 1902 is 1.4.771.324. |
    | LocalCapacityInMb | The total local capacity of the device in Megabits. |
    | IsRegistered | This value indicates if your device is activated with the service. |





## View GPU driver information

If the compute role is configured on your device, you can also get the GPU driver information via the PowerShell interface. 

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Use the `Get-HcsGpuNvidiaSmi` to get the GPU driver information for your device.

    The following example shows the usage of this cmdlet:

    ```powershell
    Get-HcsGpuNvidiaSmi
    ```
    Make a note of the driver information from the sample output of this cmdlet.

    ```powershell    
    +-----------------------------------------------------------------------------+    
    | NVIDIA-SMI 440.64.00    Driver Version: 440.64.00    CUDA Version: 10.2     |    
    |-------------------------------+----------------------+----------------------+    
    | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |    
    | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |    
    |===============================+======================+======================|    
    |   0  Tesla T4            On   | 000029CE:00:00.0 Off |                    0 |    
    | N/A   60C    P0    29W /  70W |   1539MiB / 15109MiB |      0%      Default |    
    +-------------------------------+----------------------+----------------------+    
    |   1  Tesla T4           On  | 0000AD50:00:00.0 Off |                    0 |
    | N/A   58C    P0    29W /  70W |    330MiB / 15109MiB |      0%      Default |
    +-------------------------------+----------------------+----------------------+
    ```

## Enable Multi-Process Service (MPS)

A Multi-Process Service (MPS) on NVIDIA GPUs provides a mechanism where GPUs can be shared by multiple jobs, where each job is allocated some percentage of the GPU's resources. MPS is a preview feature on your Azure Stack Edge Pro GPU device. To enable MPS on your device, follow these steps:


1. Before you begin, make sure that:

    1. You've configured and [Activated your Azure Stack Edge Pro device](azure-stack-edge-gpu-deploy-activate.md) with an Azure Stack Edge resource in Azure.
    1. You've [Configured compute on this device in the Azure portal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-deploy-configure-compute.md#configure-compute).
    
1. [Connect to the PowerShell interface](azure-stack-edge-gpu-connect-powershell-interface.md#connect-to-the-powershell-interface).
1. Use the following command to enable MPS on your device.

    ```powershell
    Start-HcsGpuMPS
    ```

> **Note:**
> When the device software and the Kubernetes cluster are updated, the MPS setting is not retained for the workloads. You'll need to enable MPS again.

## Reset your device


To reset your device, you need to securely wipe out all the data on the data disk and the boot disk of your device. 

Use the `Reset-HcsAppliance` cmdlet to wipe out both the data disks and the boot disk or just the data disks. The `SecureWipeBootDisk` and `SecureWipeDataDisks` switches allow you to wipe the boot disk and the data disks respectively.

The `SecureWipeBootDisk` switch wipes the boot disk and makes the device unusable. It should be used only when the device needs to be returned to Microsoft. For more information, see [Return the device to Microsoft](azure-stack-edge-return-device.md).

If you use the device reset in the local web UI, only the data disks are securely wiped but the boot disk is kept intact. The boot disk contains the device configuration.

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. At the command prompt, type:

    `Reset-HcsAppliance -SecureWipeBootDisk -SecureWipeDataDisks`

    The following example shows how to use this cmdlet:

    ```powershell
    [10.128.24.33]: PS>Reset-HcsAppliance -SecureWipeBootDisk -SecureWipeDataDisks

    Confirm
    Are you sure you want to perform this action?
    Performing the operation "Reset-HcsAppliance" on target "ShouldProcess appliance".
    [Y] Yes  [A] Yes to All  [N] No  [L] No to All  [?] Help (default is "Y"): N
    ```


## Get compute logs

If the compute role is configured on your device, you can also get the compute logs via the PowerShell interface.

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Use the `Get-AzureDataBoxEdgeComputeRoleLogs` to get the compute logs for your device.

    The following example shows the usage of this cmdlet:

    ```powershell
    Get-AzureDataBoxEdgeComputeRoleLogs -Path "\\hcsfs\logs\myacct" -Credential "username" -FullLogCollection    
    ```

    Here is a description of the parameters used for the cmdlet:
    - `Path`: Provide a network path to the share where you want to create the compute log package.
    - `Credential`: Provide the username for the network share. When you run this cmdlet, you will need to provide the share password.
    - `FullLogCollection`: This parameter ensures that the log package will contain all the compute logs. By default, the log package contains only a subset of logs.

<!-- ## Change Kubernetes workload profiles

After you have formed and configured a cluster and you have created new virtual switches, you can add or delete virtual networks associated with your virtual switches. For detailed steps, see [Configure virtual switches](azure-stack-edge-gpu-deploy-configure-network-compute-web-proxy.md?pivots=two-node#configure-virtual-switches-1).

After virtual switches are created, you can enable the switches for Kubernetes compute traffic to specify a Kubernetes workload profile. To do so using the local UI, use the steps in [Configure compute IPS](azure-stack-edge-gpu-deploy-configure-network-compute-web-proxy.md?pivots=two-node#configure-compute-ips-1). To do so using PowerShell, use the following steps:

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Use the `Get-HcsApplianceInfo` cmdlet to get current `KubernetesPlatform` and `KubernetesWorkloadProfile` settings for your device.
3. Use the `Get-HcsKubernetesWorkloadProfiles` cmdlet to identify the profiles available on your Azure Stack Edge device.

   ```powershell
   [Device-IP]: PS>Get-HcsKubernetesWorkloadProfiles 
   Type  Description    
   ----  -----------   
   AP5GC an Azure Private MEC solution   
   SAP   a SAP Digital Manufacturing for Edge Computing or another Microsoft partner solution   
   NONE  other workloads
   [Device-IP]: PS>
   ```
    
4. Use the `Set-HcsKubernetesWorkloadProfile` cmdlet to set the workload profile for AP5GC, an Azure Private MEC solution.

    The following example shows the usage of this cmdlet:

    ```powershell
    Set-HcsKubernetesWorkloadProfile -Type "AP5GC"
    ```
    Here is sample output for this cmdlet:

    ```powershell
    [10.100.10.10]: PS>KubernetesPlatform : AKS
    [10.100.10.10]: PS>KubernetesWorkloadProfile : AP5GC
    [10.100.10.10]: PS>
    ``` -->

## Change Kubernetes pod and service subnets

If you're running the **other workloads** option in your environment, by default, Kubernetes on your Azure Stack Edge device uses subnets 172.27.0.0/16 and 172.28.0.0/16 for pod and service respectively. If these subnets are already in use in your network, then you can run the `Set-HcsKubeClusterNetworkInfo` cmdlet to change these subnets.

You want to perform this configuration before you configure compute from the Azure portal as the Kubernetes cluster is created in this step.

1. [Connect to the PowerShell interface of the device](#connect-to-the-powershell-interface).
1. From the PowerShell interface of the device, run:

    `Set-HcsKubeClusterNetworkInfo -PodSubnet <subnet details> -ServiceSubnet <subnet details>`

    Replace the \<subnet details\> with the subnet range that you want to use. 

1. Once you have run this command, you can use the `Get-HcsKubeClusterNetworkInfo` command to verify that the pod and service subnets have changed.

Here is a sample output for this command.

```powershell
[10.100.10.10]: PS>Set-HcsKubeClusterNetworkInfo -PodSubnet 10.96.0.1/16 -ServiceSubnet 10.97.0.1/16
[10.100.10.10]: PS>Get-HcsKubeClusterNetworkInfo

Id                                   PodSubnet    ServiceSubnet
--                                   ---------    -------------
6dbf23c3-f146-4d57-bdfc-76cad714cfd1 10.96.0.1/16 10.97.0.1/16
[10.100.10.10]: PS>
```

## Debug Kubernetes issues related to IoT Edge

Before you begin, you must have:

- Compute network configured. See [Tutorial: Configure network for Azure Stack Edge Pro with GPU](azure-stack-edge-gpu-deploy-configure-network-compute-web-proxy.md).
- Compute role configured on your device.
    
On an Azure Stack Edge Pro GPU device that has the compute role configured, you can troubleshoot or monitor the device using two different sets of commands.

- Using `iotedge` commands. These commands are available for basic operations for your device.
- Using `kubectl` commands. These commands are available for an extensive set of operations for your device.

To execute either of the above set of commands, you need to [Connect to the PowerShell interface](#connect-to-the-powershell-interface).

### Use `iotedge` commands

To see a list of available commands, [connect to the PowerShell interface](#connect-to-the-powershell-interface) and use the `iotedge` function.

```powershell
[10.100.10.10]: PS>iotedge -?                                                                                                                           
Usage: iotedge COMMAND

Commands:
   list
   logs
   restart

[10.100.10.10]: PS>
```

The following table has a brief description of the commands available for `iotedge`:

| command | Description |
| --- | --- |
| `list` | List modules |
| `logs` | Fetch the logs of a module |
| `restart` | Stop and restart a module |

#### List all IoT Edge modules

To list all the modules running on your device, use the `iotedge list` command.

Here is a sample output of this command. This command lists all the modules, associated configuration, and the external IPs associated with the modules. For example, you can access the **webserver** app at `https://10.128.44.244`. 


```powershell
[10.100.10.10]: PS>iotedge list

NAME                   STATUS  DESCRIPTION CONFIG                                             EXTERNAL-IP
----                   ------  ----------- ------                                             -----
gettingstartedwithgpus Running Up 10 days  mcr.microsoft.com/intelligentedge/solutions:latest
iotedged               Running Up 10 days  azureiotedge/azureiotedge-iotedged:0.1.0-beta10    <none>
edgehub                Running Up 10 days  mcr.microsoft.com/azureiotedge-hub:1.0             10.128.44.243
edgeagent              Running Up 10 days  azureiotedge/azureiotedge-agent:0.1.0-beta10
webserverapp           Running Up 10 days  nginx:stable                                       10.128.44.244

[10.100.10.10]: PS>
```
#### Restart modules

You can use the `list` command to list all the modules running on your device. Then identify the name of the module that you want to restart and use it with the `restart` command.

Here is a sample output of how to restart a module. Based on the description of how long the module is running for, you can see that `cuda-sample1` was restarted.

```powershell
[10.100.10.10]: PS>iotedge list

NAME         STATUS  DESCRIPTION CONFIG                                          EXTERNAL-IP PORT(S)
----         ------  ----------- ------                                          ----------- -------
edgehub      Running Up 5 days   mcr.microsoft.com/azureiotedge-hub:1.0          10.57.48.62 443:31457/TCP,5671:308
                                                                                             81/TCP,8883:31753/TCP
iotedged     Running Up 7 days   azureiotedge/azureiotedge-iotedged:0.1.0-beta13 <none>      35000/TCP,35001/TCP
cuda-sample2 Running Up 1 days   nvidia/samples:nbody
edgeagent    Running Up 7 days   azureiotedge/azureiotedge-agent:0.1.0-beta13
cuda-sample1 Running Up 1 days   nvidia/samples:nbody

[10.100.10.10]: PS>iotedge restart cuda-sample1
[10.100.10.10]: PS>iotedge list

NAME         STATUS  DESCRIPTION  CONFIG                                          EXTERNAL-IP PORT(S)
----         ------  -----------  ------                                          ----------- -------
edgehub      Running Up 5 days    mcr.microsoft.com/azureiotedge-hub:1.0          10.57.48.62 443:31457/TCP,5671:30
                                                                                              881/TCP,8883:31753/TC
                                                                                              P
iotedged     Running Up 7 days    azureiotedge/azureiotedge-iotedged:0.1.0-beta13 <none>      35000/TCP,35001/TCP
cuda-sample2 Running Up 1 days    nvidia/samples:nbody
edgeagent    Running Up 7 days    azureiotedge/azureiotedge-agent:0.1.0-beta13
cuda-sample1 Running Up 4 minutes nvidia/samples:nbody

[10.100.10.10]: PS>

```

#### Get module logs

Use the `logs` command to get logs for any IoT Edge module running on your device. 

If there was an error in creation of the container image or while pulling the image, run `logs edgeagent`. `edgeagent` is the IoT Edge runtime container that is responsible for provisioning other containers. Because `logs edgeagent` dumps all the logs, a good way to see the recent errors is to use the option `--tail `0`. 

Here is a sample output.

```powershell
[10.100.10.10]: PS>iotedge logs cuda-sample2 --tail 10
[10.100.10.10]: PS>iotedge logs edgeagent --tail 10
<6> 2021-02-25 00:52:54.828 +00:00 [INF] - Executing command: "Report EdgeDeployment status: [Success]"
<6> 2021-02-25 00:52:54.829 +00:00 [INF] - Plan execution ended for deployment 11
<6> 2021-02-25 00:53:00.191 +00:00 [INF] - Plan execution started for deployment 11
<6> 2021-02-25 00:53:00.191 +00:00 [INF] - Executing command: "Create an EdgeDeployment with modules: [cuda-sample2, edgeAgent, edgeHub, cuda-sample1]"
<6> 2021-02-25 00:53:00.212 +00:00 [INF] - Executing command: "Report EdgeDeployment status: [Success]"
<6> 2021-02-25 00:53:00.212 +00:00 [INF] - Plan execution ended for deployment 11
<6> 2021-02-25 00:53:05.319 +00:00 [INF] - Plan execution started for deployment 11
<6> 2021-02-25 00:53:05.319 +00:00 [INF] - Executing command: "Create an EdgeDeployment with modules: [cuda-sample2, edgeAgent, edgeHub, cuda-sample1]"
<6> 2021-02-25 00:53:05.412 +00:00 [INF] - Executing command: "Report EdgeDeployment status: [Success]"
<6> 2021-02-25 00:53:05.412 +00:00 [INF] - Plan execution ended for deployment 11
[10.100.10.10]: PS>
```
> **Note:**
> The direct methods such as GetModuleLogs or UploadModuleLogs are not supported on IoT Edge on Kubernetes on your Azure Stack Edge.
 
 
### Use kubectl commands

On an Azure Stack Edge Pro GPU device that has the compute role configured, all the `kubectl` commands are available to monitor or troubleshoot modules. To see a list of available commands, run `kubectl --help` from the command window.

```PowerShell
C:\Users\myuser>kubectl --help

kubectl controls the Kubernetes cluster manager.

Find more information at: https://kubernetes.io/docs/reference/kubectl/overview/

Basic Commands (Beginner):
    create         Create a resource from a file or from stdin.
    expose         Take a replication controller, service, deployment or pod and expose it as a new Kubernetes Service
    run            Run a particular image on the cluster
    set            Set specific features on objects
    run-container  Run a particular image on the cluster. This command is deprecated, use "run" instead
==============CUT=============CUT============CUT========================

Usage:
    kubectl [flags] [options]

Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).

C:\Users\myuser>
```

For a comprehensive list of the `kubectl` commands, go to [`kubectl` cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/).


#### To get IP of service or module exposed outside of Kubernetes cluster

To get the IP of a load-balancing service or modules exposed outside of the Kubernetes, run the following command:

`kubectl get svc -n iotedge`

Following is a sample output of the all the services or modules that are exposed outside of the Kubernetes cluster. 


```powershell
[10.100.10.10]: PS>kubectl get svc -n iotedge
NAME           TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                                       AGE
edgehub        LoadBalancer   10.103.52.225   10.128.44.243   443:31987/TCP,5671:32336/TCP,8883:30618/TCP   34h
iotedged       ClusterIP      10.107.236.20   <none>          35000/TCP,35001/TCP                           3d8h
webserverapp   LoadBalancer   10.105.186.35   10.128.44.244   8080:30976/TCP                                16h

[10.100.10.10]: PS>
```
The IP address in the External IP column corresponds to the external endpoint for the service or the module. You can also [Get the external IP in the Kubernetes dashboard](azure-stack-edge-gpu-monitor-kubernetes-dashboard.md#get-ip-address-for-services-or-modules).


#### To check if module deployed successfully

Compute modules are containers that have a business logic implemented. A Kubernetes pod can have multiple containers running. 

To check if a compute module is deployed successfully, connect to the PowerShell interface of the device.
Run the `get pods` command and check if the container (corresponding to the compute module) is running.

To get the list of all the pods running in a specific namespace, run the following command:

`get pods -n <namespace>`

To check the modules deployed via IoT Edge, run the following command:

`get pods -n iotedge`

Following is a sample output of all the pods running in the `iotedge` namespace.

```
[10.100.10.10]: PS>kubectl get pods -n iotedge
NAME                        READY   STATUS    RESTARTS   AGE
edgeagent-cf6d4ffd4-q5l2k   2/2     Running   0          20h
edgehub-8c9dc8788-2mvwv     2/2     Running   0          56m
filemove-66c49984b7-h8lxc   2/2     Running   0          56m
iotedged-675d7f4b5f-9nml4   1/1     Running   0          20h

[10.100.10.10]: PS>
```

The status **Status** indicates that all the pods in the namespace are running and the **Ready** indicates the number of containers deployed in a pod. In the preceding sample, all the pods are running and all the modules deployed in each of the pods are running. 

To check the modules deployed via Azure Arc, run the following command:

`get pods -n azure-arc`

Alternatively, you can [Connect to Kubernetes dashboard to see IoT Edge or Azure Arc deployments](azure-stack-edge-gpu-monitor-kubernetes-dashboard.md#view-module-status).


For a more verbose output of a specific pod for a given namespace, you can run the following command:

`kubectl describe pod <pod name> -n <namespace>` 

The sample output is shown here.

```
[10.100.10.10]: PS>kubectl describe pod filemove-66c49984b7 -n iotedge
Name:           filemove-66c49984b7-h8lxc
Namespace:      iotedge
Priority:       0
Node:           k8s-1hwf613cl-1hwf613/10.139.218.12
Start Time:     Thu, 14 May 2020 12:46:28 -0700
Labels:         net.azure-devices.edge.deviceid=myasegpu-edge
                net.azure-devices.edge.hub=myasegpu2iothub.azure-devices.net
                net.azure-devices.edge.module=filemove
                pod-template-hash=66c49984b7
Annotations:    net.azure-devices.edge.original-moduleid: filemove
Status:         Running
IP:             172.17.75.81
IPs:            <none>
Controlled By:  ReplicaSet/filemove-66c49984b7
Containers:
    proxy:
    Container ID:   docker://fd7975ca78209a633a1f314631042a0892a833b7e942db2e7708b41f03e8daaf
    Image:          azureiotedge/azureiotedge-proxy:0.1.0-beta8
    Image ID:       docker://sha256:5efbf6238f13d24bab9a2b499e5e05bc0c33ab1587d6cf6f289cdbe7aa667563
    Port:           <none>
    Host Port:      <none>
    State:          Running
        Started:      Thu, 14 May 2020 12:46:30 -0700
    Ready:          True
    Restart Count:  0
    Environment:
        PROXY_LOG:  Debug
=============CUT===============================CUT===========================
Volumes:
    config-volume:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      iotedged-proxy-config
    Optional:  false
    trust-bundle-volume:
    Type:      ConfigMap (a volume populated by a ConfigMap)
    Name:      iotedged-proxy-trust-bundle
    Optional:  false
    myasesmb1local:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  myasesmb1local
    ReadOnly:   false
    myasesmb1:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  myasesmb1
    ReadOnly:   false
    filemove-token-pzvw8:
    Type:        Secret (a volume populated by a Secret)
    SecretName:  filemove-token-pzvw8
    Optional:    false
QoS Class:       BestEffort
Node-Selectors:  <none>
Tolerations:     node.kubernetes.io/not-ready:NoExecute for 300s
                    node.kubernetes.io/unreachable:NoExecute for 300s
Events:          <none>


[10.100.10.10]: PS>
```

#### To get container logs

To get the logs for a module, run the following command from the PowerShell interface of the device:

`kubectl logs <pod_name> -n <namespace> --all-containers` 

Because `all-containers` flag dumps all the logs for all the containers, a good way to see the recent errors is to use the option `--tail 10`.

Following is a sample output. 

```
[10.100.10.10]: PS>kubectl logs filemove-66c49984b7-h8lxc -n iotedge --all-containers --tail 10
DEBUG 2020-05-14T20:40:42Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:40:44Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:40:44Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:40:44Z: loop process - 1 events, 0.000s
DEBUG 2020-05-14T20:40:44Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:42:12Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:42:14Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:42:14Z: loop process - 0 events, 0.000s
DEBUG 2020-05-14T20:42:14Z: loop process - 1 events, 0.000s
DEBUG 2020-05-14T20:42:14Z: loop process - 0 events, 0.000s
05/14/2020 19:46:44: Info: Opening module client connection.
05/14/2020 19:46:45: Info: Open done.
05/14/2020 19:46:45: Info: Initializing with input: /home/input, output: /home/output, protocol: Amqp.
05/14/2020 19:46:45: Info: IoT Hub module client initialized.

[10.100.10.10]: PS>
```

### Change memory, processor limits for Kubernetes worker node

To change the memory or processor limits for Kubernetes worker node, do the following steps:

1. [Connect to the PowerShell interface of the device](#connect-to-the-powershell-interface).
1. To get the current resources for the worker node and the role options, run the following command:

    `Get-AzureDataBoxEdgeRole`

    Here is a sample output. Note the values for `Name` and `Compute` under `Resources` section. `MemoryInBytes` and `ProcessorCount` denote the currently assigned values memory and processor count for the Kubernetes worker node.  

    ```powershell
    [10.100.10.10]: PS>Get-AzureDataBoxEdgeRole
    ImageDetail                : Name:mcr.microsoft.com/azureiotedge-agent
                                 Tag:1.0
                                 PlatformType:Linux
    EdgeDeviceConnectionString :
    IotDeviceConnectionString  :
    HubHostName                : ase-srp-007.azure-devices.net
    IotDeviceId                : srp-007-storagegateway
    EdgeDeviceId               : srp-007-edge
    Version                    :
    Id                         : 6ebeff9f-84c5-49a7-890c-f5e05520a506
    Name                       : IotRole
    Type                       : IOT
    Resources                  : Compute:
                                 MemoryInBytes:34359738368
                                 ProcessorCount:12
                                 VMProfile:
    
                                 Storage:
                                 EndpointMap:
                                 EndpointId:c0721210-23c2-4d16-bca6-c80e171a0781
                                 TargetPath:mysmbedgecloudshare1
                                 Name:mysmbedgecloudshare1
                                 Protocol:SMB
    
                                 EndpointId:6557c3b6-d3c5-4f94-aaa0-6b7313ab5c74
                                 TargetPath:mysmbedgelocalshare
                                 Name:mysmbedgelocalshare
                                 Protocol:SMB
                                 RootFileSystemStorageSizeInBytes:0
    
    HostPlatform               : KubernetesCluster
    State                      : Created
    PlatformType               : Linux
    HostPlatformInstanceId     : 994632cb-853e-41c5-a9cd-05b36ddbb190
    IsHostPlatformOwner        : True
    IsCreated                  : True    
    [10.100.10.10]: PS>
    ```
    
1. To change the values of memory and processors for the worker node, run the following command:

   ```powershell
   Set-AzureDataBoxEdgeRoleCompute -Name <Name value from the output of Get-AzureDataBoxEdgeRole> -Memory <Value in Bytes> -ProcessorCount <No. of cores>
   ```

   Here is a sample output. 
    
    ```powershell
    [10.100.10.10]: PS>Set-AzureDataBoxEdgeRoleCompute -Name IotRole -MemoryInBytes 32GB -ProcessorCount 16
    
    ImageDetail                : Name:mcr.microsoft.com/azureiotedge-agent
                                 Tag:1.0
                                 PlatformType:Linux
    
    EdgeDeviceConnectionString :
    IotDeviceConnectionString  :
    HubHostName                : ase-srp-007.azure-devices.net
    IotDeviceId                : srp-007-storagegateway
    EdgeDeviceId               : srp-007-edge
    Version                    :
    Id                         : 6ebeff9f-84c5-49a7-890c-f5e05520a506
    Name                       : IotRole
    Type                       : IOT
    Resources                  : Compute:
                                 MemoryInBytes:34359738368
                                 ProcessorCount:16
                                 VMProfile:
    
                                 Storage:
                                 EndpointMap:
                                 EndpointId:c0721210-23c2-4d16-bca6-c80e171a0781
                                 TargetPath:mysmbedgecloudshare1
                                 Name:mysmbedgecloudshare1
                                 Protocol:SMB
    
                                 EndpointId:6557c3b6-d3c5-4f94-aaa0-6b7313ab5c74
                                 TargetPath:mysmbedgelocalshare
                                 Name:mysmbedgelocalshare
                                 Protocol:SMB
    
                                 RootFileSystemStorageSizeInBytes:0
    
    HostPlatform               : KubernetesCluster
    State                      : Created
    PlatformType               : Linux
    HostPlatformInstanceId     : 994632cb-853e-41c5-a9cd-05b36ddbb190
    IsHostPlatformOwner        : True
    IsCreated                  : True
    
    [10.100.10.10]: PS>    
    ```

While changing the memory and processor usage, follow these guidelines.

- Default memory is 25% of device specification.
- Default processor count is 30% of device specification.
- When changing the values for memory and processor counts, we recommend that you vary the values between 15% to 60% of the device memory and the processor count. 
- We recommend an upper limit of 60% is so that there are enough resources for system components. 

## Connect to BMC

> **Note:**
> Baseboard management controller (BMC) is not available on Azure Stack Edge Pro 2 and Azure Stack Edge Mini R. The cmdlets described in this section only apply to Azure Stack Edge Pro GPU and Azure Stack Edge Pro R.

BMC is used to remotely monitor and manage your device. This section describes the cmdlets that can be used to manage BMC configuration. Prior to running any of these cmdlets, [Connect to the PowerShell interface of the device](#connect-to-the-powershell-interface).

- `Get-HcsNetBmcInterface`: Use this cmdlet to get the network configuration properties of the BMC, for example, `IPv4Address`, `IPv4Gateway`, `IPv4SubnetMask`, `DhcpEnabled`. 
    
    Here is a sample output:
    
    ```powershell
    [10.100.10.10]: PS>Get-HcsNetBmcInterface
    IPv4Address   IPv4Gateway IPv4SubnetMask DhcpEnabled
    -----------   ----------- -------------- -----------
    10.128.53.186 10.128.52.1 255.255.252.0        False
    [10.100.10.10]: PS>
    ```
- `Set-HcsNetBmcInterface`: You can use this cmdlet in the following two ways.

    - Use the cmdlet to enable or disable DHCP configuration for BMC by using the appropriate value for `UseDhcp` parameter. 

        ```powershell
        Set-HcsNetBmcInterface -UseDhcp $true
        ```

        Here is a sample output: 

        ```powershell
        [10.100.10.10]: PS>Set-HcsNetBmcInterface -UseDhcp $true
        [10.100.10.10]: PS>Get-HcsNetBmcInterface
        IPv4Address IPv4Gateway IPv4SubnetMask DhcpEnabled
        ----------- ----------- -------------- -----------
        10.128.54.8 10.128.52.1 255.255.252.0         True
        [10.100.10.10]: PS>
        ```

    - Use this cmdlet to configure the static configuration for the BMC. You can specify the values for `IPv4Address`, `IPv4Gateway`, and `IPv4SubnetMask`. 
    
        ```powershell
        Set-HcsNetBmcInterface -IPv4Address "<IPv4 address of the device>" -IPv4Gateway "<IPv4 address of the gateway>" -IPv4SubnetMask "<IPv4 address for the subnet mask>"
        ```        
        
        Here is a sample output: 

        ```powershell
        [10.100.10.10]: PS>Set-HcsNetBmcInterface -IPv4Address 10.128.53.186 -IPv4Gateway 10.128.52.1 -IPv4SubnetMask 255.255.252.0
        [10.100.10.10]: PS>Get-HcsNetBmcInterface
        IPv4Address   IPv4Gateway IPv4SubnetMask DhcpEnabled
        -----------   ----------- -------------- -----------
        10.128.53.186 10.128.52.1 255.255.252.0        False
        [10.100.10.10]: PS>
        ```    

- `Set-HcsBmcPassword`: Use this cmdlet to modify the BMC password for `EdgeUser`. The user name - `EdgeUser`- is case-sensitive.

    Here is a sample output: 

    ```powershell
    [10.100.10.10]: PS> Set-HcsBmcPassword -NewPassword "Password1"
    [10.100.10.10]: PS>
    ```

## Exit the remote session

To exit the remote PowerShell session, close the PowerShell window.

## Next steps

- Deploy [Azure Stack Edge Pro GPU](azure-stack-edge-gpu-deploy-prep.md) in Azure portal.
