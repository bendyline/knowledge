---
title: Connect to and manage Microsoft Azure Stack Edge Pro device via the Windows PowerShell interface
description: Describes Azure Stack Edge Pro connection and management via Windows PowerShell interface.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: how-to
ms.date: 03/20/2025
ms.author: sipastak
---
# Manage an Azure Stack Edge Pro device via Windows PowerShell

Azure Stack Edge Pro solution lets you process data and send it over the network to Azure. This article describes some of the configuration and management tasks for your Azure Stack Edge Pro device. You can use the Azure portal, local web UI, or the Windows PowerShell interface to manage your device.

This article focuses on the tasks you do using the PowerShell interface. 

This article includes the following procedures:

- Connect to the PowerShell interface
- Create a support package
- Upload certificate
- Reset the device
- View device information
- Get compute logs
- Monitor and troubleshoot compute modules

## Connect to the PowerShell interface


Depending on the operating system of client, the procedures to remotely connect to the device are different.

### Remotely connect from a Windows client

Before you begin, make sure that your Windows client is running Windows PowerShell 5.0 or later.

Follow these steps to remotely connect from a Windows client.

1. Run a Windows PowerShell session as an administrator.
2. Make sure that the Windows Remote Management service is running on your client. At the command prompt, type:

    `winrm quickconfig`

    For more information, see [Installation and configuration for Windows Remote Management](https://learn.microsoft.com/windows/win32/winrm/installation-and-configuration-for-windows-remote-management#quick-default-configuration).

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
> This procedure does not work on Mac OS.


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
     Set-HcsCertificate -Scope LocalWebUI -CertificateFilePath "\\myfileshare\certificates\mycert.pfx" -CertificatePassword "mypassword" -Credential "Username"
     ```




You can also upload IoT Edge certificates to enable a secure connection between your IoT Edge device and the downstream devices that may connect to it. There are three files (*.pem* format) that you need to install:

- Root CA certificate or the owner CA
- Device CA certificate
- Device private key 

The following example shows the usage of this cmdlet to install IoT Edge certificates:

```
Set-HcsCertificate -Scope IotEdge -RootCACertificateFilePath "\\hcfs\root-ca-cert.pem" -DeviceCertificateFilePath "\\hcfs\device-ca-cert.pem\" -DeviceKeyFilePath "\\hcfs\device-private-key.pem" -Credential "username"
```
When you run this cmdlet, you will be prompted to provide the password for the network share.

For more information on certificates, go to [Azure IoT Edge certificates](../iot-edge/iot-edge-certs.md) or [Install certificates on a gateway](../iot-edge/how-to-create-transparent-gateway.md).

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

## Monitor and troubleshoot compute modules


On an Azure Stack Edge device that has the compute role configured, you can troubleshoot or monitor the device using two different set of commands.

- Using `iotedge` commands. These commands are available for basic operations for your device.
- Using `dkrdbe` commands. These commands are available for an extensive set of operations for your device.

To execute either of the above set of commands, you need to [Connect to the PowerShell interface](#connect-to-the-powershell-interface).

### Use `iotedge` commands

To see a list of available commands, [connect to the PowerShell interface](#connect-to-the-powershell-interface) and use the `iotedge` function.

```powershell
[10.100.10.10]: PS>iotedge -?                                                                                                                                                                                                 Usage: iotedge COMMAND

Commands:
   check
   list
   logs
   restart

[10.100.10.10]: PS>
```

The following table has a brief description of the commands available for `iotedge`:

| command | Description |
| --- | --- |
| `check` | Perform automated checks for common configuration and connectivity issues |
| `list` | List modules |
| `logs` | Fetch the logs of a module |
| `restart` | Stop and restart a module |


### Use `dkrdbe` commands

To see a list of available commands, [connect to the PowerShell interface](#connect-to-the-powershell-interface) and use the `dkrdbe` function.

```powershell
[10.100.10.10]: PS>dkrdbe -?
Usage: dkrdbe COMMAND

Commands:
   image [prune]
   images
   inspect
   login
   logout
   logs
   port
   ps
   pull
   start
   stats
   stop
   system [df]
   top

[10.100.10.10]: PS>
```
The following table has a brief description of the commands available for `dkrdbe`:

| command | Description |
| --- | --- |
| `image` | Manage images. To remove unused images, use: `dkrdbe image prune -a -f` |
| `images` | List images |
| `inspect` | Return low-level information on Docker objects |
| `login` | Sign in to a Docker registry |
| `logout` | Sign out from a Docker registry |
| `logs` | Fetch the logs of a container |
| `port` | List port mappings or a specific mapping for the container |
| `ps` | List containers |
| `pull` | Pull an image or a repository from a registry |
| `start` | Start one or more stopped containers |
| `stats` | Display a live stream of container(s) resource usage statistics |
| `stop` | Stop one or more running containers |
| `system` | Manage Docker |
| `top` | Display the running processes of a container |

To get help for any available command, use `dkrdbe <command-name> --help`.

For example, to understand the usage of the `port` command, type:

```powershell
[10.100.10.10]: P> dkrdbe port --help

Usage:  dkr port CONTAINER [PRIVATE_PORT[/PROTO]]

List port mappings or a specific mapping for the container
[10.100.10.10]: P> dkrdbe login --help

Usage:  docker login [OPTIONS] [SERVER]

Log in to a Docker registry.
If no server is specified, the default is defined by the daemon.

Options:
  -p, --password string   Password
      --password-stdin    Take the password from stdin
  -u, --username string   Username
[10.100.10.10]: PS>
```

The available commands for the `dkrdbe` function use the same parameters as the ones used for the normal docker commands. For the options and parameters used with the docker command, go to [Use the Docker commandline](https://docs.docker.com/engine/reference/commandline/docker/).

### To check if the module deployed successfully

Compute modules are containers that have a business logic implemented. To check if a compute module is deployed successfully, run the `ps` command and check if the container (corresponding to the compute module) is running.

To get the list of all the containers (including the ones that are paused), run the `ps -a` command.

```powershell
[10.100.10.10]: P> dkrdbe ps -a
CONTAINER ID        IMAGE                                                COMMAND                   CREATED             STATUS              PORTS                                                                  NAMES
d99e2f91d9a8        edgecompute.azurecr.io/filemovemodule2:0.0.1-amd64   "dotnet FileMoveModuâ€¦"    2 days ago          Up 2 days                                                                                  movefile
0a06f6d605e9        edgecompute.azurecr.io/filemovemodule2:0.0.1-amd64   "dotnet FileMoveModuâ€¦"    2 days ago          Up 2 days                                                                                  filemove
2f8a36e629db        mcr.microsoft.com/azureiotedge-hub:1.0               "/bin/sh -c 'echo \"$â€¦"   2 days ago          Up 2 days           0.0.0.0:443->443/tcp, 0.0.0.0:5671->5671/tcp, 0.0.0.0:8883->8883/tcp   edgeHub
acce59f70d60        mcr.microsoft.com/azureiotedge-agent:1.0             "/bin/sh -c 'echo \"$â€¦"   2 days ago          Up 2 days                                                                                  edgeAgent
[10.100.10.10]: PS>
```

If there was an error in creation of the container image or while pulling the image, run `logs edgeAgent`.  `EdgeAgent` is the IoT Edge runtime container that is responsible for provisioning other containers.

Because `logs edgeAgent` dumps all the logs, a good way to see the recent errors is to use the option `--tail 20`.


```powershell
[10.100.10.10]: PS>dkrdbe logs edgeAgent --tail 20
2019-02-28 23:38:23.464 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Util.Uds.HttpUdsMessageHandler] - Connected socket /var/run/iotedge/mgmt.sock
2019-02-28 23:38:23.464 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Util.Uds.HttpUdsMessageHandler] - Sending request http://mgmt.sock/modules?api-version=2018-06-28
2019-02-28 23:38:23.464 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Agent.Core.Agent] - Getting edge agent config...
2019-02-28 23:38:23.464 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Agent.Core.Agent] - Obtained edge agent config
2019-02-28 23:38:23.469 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Agent.Edgelet.ModuleManagementHttpClient] - Received a valid Http response from unix:///var/run/iotedge/mgmt.soc
k for List modules
--------------------CUT---------------------
--------------------CUT---------------------
08:28.1007774+00:00","restartCount":0,"lastRestartTimeUtc":"2019-02-26T20:08:28.1007774+00:00","runtimeStatus":"running","version":"1.0","status":"running","restartPolicy":"always
","type":"docker","settings":{"image":"edgecompute.azurecr.io/filemovemodule2:0.0.1-amd64","imageHash":"sha256:47778be0602fb077d7bc2aaae9b0760fbfc7c058bf4df192f207ad6cbb96f7cc","c
reateOptions":"{\"HostConfig\":{\"Binds\":[\"/home/hcsshares/share4-dl460:/home/input\",\"/home/hcsshares/share4-iot:/home/output\"]}}"},"env":{}}
2019-02-28 23:38:28.480 +00:00 [DBG] [Microsoft.Azure.Devices.Edge.Agent.Core.Planners.HealthRestartPlanner] - HealthRestartPlanner created Plan, with 0 command(s).
```

### To get container logs

To get logs for a specific container, first list the container and then get the logs for the container that you're interested in.

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. To get the list of running containers, run the `ps` command.

    ```powershell
    [10.100.10.10]: P> dkrdbe ps
    CONTAINER ID        IMAGE                                                COMMAND                   CREATED             STATUS              PORTS                                                                  NAMES
    d99e2f91d9a8        edgecompute.azurecr.io/filemovemodule2:0.0.1-amd64   "dotnet FileMoveModuâ€¦"    2 days ago          Up 2 days                                                                                  movefile
    0a06f6d605e9        edgecompute.azurecr.io/filemovemodule2:0.0.1-amd64   "dotnet FileMoveModuâ€¦"    2 days ago          Up 2 days                                                                                  filemove
    2f8a36e629db        mcr.microsoft.com/azureiotedge-hub:1.0               "/bin/sh -c 'echo \"$â€¦"   2 days ago          Up 2 days           0.0.0.0:443->443/tcp, 0.0.0.0:5671->5671/tcp, 0.0.0.0:8883->8883/tcp   edgeHub
    acce59f70d60        mcr.microsoft.com/azureiotedge-agent:1.0             "/bin/sh -c 'echo \"$â€¦"   2 days ago          Up 2 days                                                                                  edgeAgent
    ```

3. Make a note of the container ID for the container that you need the logs for.

4. To get the logs for a specific container, run the `logs` command providing the container ID.

    ```powershell
    [10.100.10.10]: PS>dkrdbe logs d99e2f91d9a8
    02/26/2019 18:21:45: Info: Opening module client connection.
    02/26/2019 18:21:46: Info: Initializing with input: /home/input, output: /home/output.
    02/26/2019 18:21:46: Info: IoT Hub module client initialized.
    02/26/2019 18:22:24: Info: Received message: 1, SequenceNumber: 0 CorrelationId: , MessageId: 081886a07e694c4c8f245a80b96a252a Body: [{"ChangeType":"Created","ShareRelativeFilePath":"\\__Microsoft Data Box Edge__\\Upload\\Errors.xml","ShareName":"share4-dl460"}]
    02/26/2019 18:22:24: Info: Moving input file: /home/input/__Microsoft Data Box Edge__/Upload/Errors.xml to /home/output/__Microsoft Data Box Edge__/Upload/Errors.xml
    02/26/2019 18:22:24: Info: Processed event.
    02/26/2019 18:23:38: Info: Received message: 2, SequenceNumber: 0 CorrelationId: , MessageId: 30714d005eb048e7a4e7e3c22048cf20 Body: [{"ChangeType":"Created","ShareRelativeFilePath":"\\f [10]","ShareName":"share4-dl460"}]
    02/26/2019 18:23:38: Info: Moving input file: /home/input/f [10] to /home/output/f [10]
    02/26/2019 18:23:38: Info: Processed event.
    ```

### To monitor the usage statistics of the device

To monitor the memory, CPU usage, and IO on the device, use the `stats` command.

1. [Connect to the PowerShell interface](#connect-to-the-powershell-interface).
2. Run the `stats` command so as to disable the live stream and pull only the first result.

   ```powershell
   dkrdbe stats --no-stream
   ```

   The following example shows the usage of this cmdlet:

    ```
    [10.100.10.10]: P> dkrdbe stats --no-stream
    CONTAINER ID        NAME          CPU %         MEM USAGE / LIMIT     MEM %         NET I/O             BLOCK I/O           PIDS
    d99e2f91d9a8        movefile      0.0           24.4MiB / 62.89GiB    0.04%         751kB / 497kB       299kB / 0B          14
    0a06f6d605e9        filemove      0.00%         24.11MiB / 62.89GiB   0.04%         679kB / 481kB       49.5MB / 0B         14
    2f8a36e629db        edgeHub       0.18%         173.8MiB / 62.89GiB   0.27%         4.58MB / 5.49MB     25.7MB / 2.19MB     241
    acce59f70d60        edgeAgent     0.00%         35.55MiB / 62.89GiB   0.06%         2.23MB / 2.31MB     55.7MB / 332kB      14
    [10.100.10.10]: PS>
    ```



## Exit the remote session

To exit the remote PowerShell session, close the PowerShell window.

## Next steps

- Deploy [Azure Stack Edge Pro](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-deploy-prep.md) in Azure portal.
