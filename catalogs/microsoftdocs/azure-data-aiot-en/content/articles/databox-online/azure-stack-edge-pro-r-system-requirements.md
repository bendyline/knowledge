---
title: Microsoft Azure Stack Edge Pro R system requirements| Microsoft Docs
description: Learn about the software and networking requirements for your Azure Stack Edge Pro R
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: reference
ms.date: 06/26/2024
ms.author: sipastak
---
# Azure Stack Edge Pro R system requirements

This article describes the important system requirements for your Azure Stack Edge Pro R solution and for the clients connecting to Azure Stack Edge Pro R. We recommend that you review the information carefully before you deploy your Azure Stack Edge Pro R. You can refer back to this information as necessary during the deployment and subsequent operation.

The system requirements for the Azure Stack Edge Pro R include:

- **Software requirements for hosts** - describes the supported platforms, browsers for the local configuration UI, SMB clients, and any additional requirements for the clients that access the device.
- **Networking requirements for the device** - provides information about any networking requirements for the operation of the physical device.

## Supported OS for clients connected to device


Here's a list of the supported operating systems for clients or hosts connected to your device. These operating system versions were tested in-house.

| **Operating system/platform** | **Versions** |
| --- | --- |
| Windows Server | 2016 <br> 2019 |
| Windows | 10 |
| SUSE Linux | Enterprise Server 12 (x86_64) |
| Ubuntu | 16.04.3 LTS |
| macOS | 10.14.1 |


## Supported protocols for clients accessing device


Here are the supported protocols for clients accessing your device.

| **Protocol** | **Versions** | **Notes** |
| --- | --- | --- |
| SMB | 2.X, 3.X | SMB 1 isn't supported. |
| NFS | 3.0, 4.1 | Mac OS is not supported with NFS v4.1. |



## Supported storage accounts


Here is a list of the supported storage accounts for your device.

| **Storage account** | **Notes** |
| --- | --- |
| Classic | Standard |
| General Purpose | Standard; both V1 and V2 are supported. Both hot and cool tiers are supported. |



## Supported tiered storage accounts

When managed from Azure Stack, the following tiered storage accounts are supported with SMB/NFS/REST interfaces.

| Type | Storage account | Comments |
| --- | --- | --- |
| Standard | GPv1: Block Blob |  |
|  | Blob storage: Block Blob | Supported only for NAS |

*Page blobs and Azure Files are currently not supported in Azure Stack.
**Hot and cold tier do not exist in Azure Stack. Use the Azure PowerShell to move the data to the archive tier once the data is uploaded. For step-by-step instructions, go to [Use Azure PowerShell to set the blob tier](https://learn.microsoft.com/azure/storage/blobs/access-tiers-online-manage)

## Supported storage types


Here is a list of the supported storage types for the device.

| **File format** | **Notes** |
| --- | --- |
| Azure block blob |  |
| Azure page blob |  |
| Azure Files |  |


## Supported browsers for local web UI


Here is a list of the browsers supported for the local web UI for the virtual device.

| Browser | Versions | Additional requirements/notes |
| --- | --- | --- |
| Google Chrome | Latest version |  |
| Microsoft Edge | Latest version |  |
| Internet Explorer | Latest version | If enhanced security features are enabled, you may not be able to access local web UI pages. Disable enhanced security, and restart your browser. |
| Firefox | Latest version |  |
| Safari on Mac | Latest version |  |


## Networking port requirements

### Port requirements for Azure Stack Edge Pro R

The following table lists the ports that need to be opened in your firewall to allow for SMB, cloud, or management traffic. In this table, *in* or *inbound* refers to the direction from which incoming client requests access to your device. *Out* or *outbound* refers to the direction in which your Azure Stack Edge Pro R device sends data externally, beyond the deployment, for example, outbound to the internet.


| Port no. | In or out | Port scope | Required | Notes |
| --- | --- | --- | --- | --- |
| TCP 80 (HTTP) | Out | WAN | Yes | Outbound port is used for internet access to retrieve updates. <br>The outbound web proxy is user configurable. |
| TCP 443 (HTTPS) | Out | WAN | Yes | Outbound port is used for accessing data in the cloud.<br>The outbound web proxy is user configurable. |
| UDP 123 (NTP) | Out | WAN | In some cases<br>See notes | This port is required only if you're using an internet-based NTP server. |
| UDP 53 (DNS) | Out | WAN | In some cases<br>See notes | This port is required only if you're using an internet-based DNS server.<br>We recommend using a local DNS server. |
| TCP 5985 (WinRM) | Out/In | LAN | In some cases<br>See notes | This port is required to connect to the device via remote PowerShell over HTTP. |
| TCP 5986 (WinRM) | Out/In | LAN | In some cases<br>See notes | This port is required to connect to the device via remote PowerShell over HTTPS. |
| UDP 67 (DHCP) | Out | LAN | In some cases<br>See notes | This port is required only if you're using a local DHCP server. |
| TCP 80 (HTTP) | Out/In | LAN | Yes | This port is the inbound port for local UI on the device for local management. <br>Accessing the local UI over HTTP will automatically redirect to HTTPS. |
| TCP 443 (HTTPS) | Out/In | LAN | Yes | This port is the inbound port for local UI on the device for local management. This port is also used to connect Azure Resource Manager to the device local APIs, to connect Blob storage via REST APIs, and to the Security token service (STS) to authenticate via access and refresh tokens. |
| TCP 445 (SMB) | In | LAN | In some cases<br>See notes | This port is required only if you are connecting via SMB. |
| TCP 2049 (NFS) | In | LAN | In some cases<br>See notes | This port is required only if you are connecting via NFS. |




### Port requirements for IoT Edge

Azure IoT Edge allows outbound communication from an on-premises Edge device to Azure cloud using supported IoT Hub protocols. Inbound communication is only required for specific scenarios where Azure IoT Hub needs to push down messages to the Azure IoT Edge device (for example, Cloud To Device messaging).

Use the following table for port configuration for the servers hosting Azure IoT Edge runtime:

| Port no. | In or out | Port scope | Required | Guidance |
| --- | --- | --- | --- | --- |
| TCP 443 (HTTPS) | Out | WAN | Yes | Outbound open for IoT Edge provisioning. This configuration is required when using manual scripts or Azure IoT Device Provisioning Service (DPS). |

For complete information, go to [Firewall and port configuration rules for IoT Edge deployment](../iot-edge/troubleshoot.md).

## URL patterns for firewall rules

Network administrators can often configure advanced firewall rules based on the URL patterns to filter the inbound and the outbound traffic. Your Azure Stack Edge Pro R device and the service depend on other Microsoft applications such as Azure Service Bus, Microsoft Entra Access Control, storage accounts, and Microsoft Update servers. The URL patterns associated with these applications can be used to configure firewall rules. It is important to understand that the URL patterns associated with these applications can change. These changes require the network administrator to monitor and update firewall rules for your Azure Stack Edge Pro R as and when needed.

We recommend that you set your firewall rules for outbound traffic, based on Azure Stack Edge Pro R fixed IP addresses, liberally in most cases. However, you can use the information below to set advanced firewall rules that are needed to create secure environments.

> **Note:**
> - The device (source) IPs should always be set to all the cloud-enabled network interfaces.
> - The destination IPs should be set to [Azure datacenter IP ranges](https://www.microsoft.com/download/details.aspx?id=41653).

### URL patterns for gateway feature


| URL pattern | Component or functionality |
| --- | --- |
| https://login.microsoftonline.com <br> `https://login.microsoftonline.net`<br>https://pod01-edg1.eus.databoxedge.azure.com/<br>https://pod01-edg1.wus2.databoxedge.azure.com/<br>https://pod01-edg1.sea.databoxedge.azure.com/<br>https://pod01-edg1.we.databoxedge.azure.com/<br>https://\*.databoxedge.azure.com/\*<sup>1</sup><br>https://euspod01edg1sbcnpu53n.servicebus.windows.net/<br>https://wus2pod01edg1sbcnqh26z.servicebus.windows.net/<br>https://seapod01edg1sbcnkw22o.servicebus.windows.net/<br>https://wepod01edg1sbcnhk23j.servicebus.windows.net/<br>https://\*.servicebus.windows.net/\*<sup>2</sup><br><br><sup>1,2</sup>Use the wildcard URL to refer to multiple Azure regions with a single URL, or use a specific URL to refer to an individual Azure region. | Azure Stack Edge service<br>Azure Service Bus<br>Authentication Service - Microsoft Entra ID |
| http:\//crl.microsoft.com/pki/\*<br>http:\//www.microsoft.com/pki/\* | Certificate revocation |
| https://\*.core.windows.net/\*<br>https://\*.data.microsoft.com<br>http://\*.msftncsi.com<br>http://www.msftconnecttest.com/connecttest.txt<br>https://www.bing.com/<br>https://management.azure.com/<br>https://seapod1edg1monsa01kw22o.table.core.windows.net/<br>https://euspod01edg1monsa01pu53n.table.core.windows.net/<br>https://wus2pod1edg1monsa01qh26z.table.core.windows.net/<br>https://wepod01edg1monsa01hk23j.table.core.windows.net/ | Azure storage accounts and monitoring |
| http:\//windowsupdate.microsoft.com<br>http://\*.windowsupdate.microsoft.com<br>https://\*.windowsupdate.microsoft.com<br>http://\*.update.microsoft.com<br>https://\*.update.microsoft.com<br>http://\*.windowsupdate.com<br>http://download.microsoft.com<br>http://\*.download.windowsupdate.com<br>http://wustat.windows.com<br>http://ntservicepack.microsoft.com<br>http://\*.ws.microsoft.com<br>https://\*.ws.microsoft.com<br>http://\*.mp.microsoft.com | Microsoft Update servers |
| http://\*.deploy.akamaitechnologies.com | Akamai CDN |
| `https://azureprofilerfrontdoor.cloudapp.net`<br>https://\*.trafficmanager.net/\* | Azure Traffic Manager |
| http://\*.data.microsoft.com | Telemetry service in Windows, see the update for customer experience and diagnostic telemetry |
| `http://<vault-name>.vault.azure.net:443` | Key Vault |
| `https://azstrpprod.trafficmanager.net/*` | Remote Management |
| `http://www.msftconnecttest.com/connecttest.txt`<br>`https://www.bing.com/` | Required for a web proxy test, this URL is used to validate web connectivity before applying the configuration. |
<!--|    http://www.msftconnecttest.com/connecttest.txt  |    For diagnostics     ||  |-->   


### URL patterns for compute feature

| URL pattern | Component or functionality |
| --- | --- |
| https:\//mcr.microsoft.com<br></br>https://\*.cdn.mscr.io | Microsoft container registry (required) |
| https://\*.azurecr.io | Personal and third-party container registries (optional) |
| https://\*.azure-devices.net | IoT Hub access (required) |

### URL patterns for gateway for Azure Government


| URL pattern | Component or functionality |
| --- | --- |
| https://\*.databoxedge.azure.us/\*<br>https://\*.servicebus.usgovcloudapi.net/\*<br>https://login.microsoftonline.us | Azure Data Box Edge/ Azure Data Box Gateway service<br>Azure Service Bus<br>Authentication Service |
| http://\*.backup.windowsazure.us | Device activation |
| http:\//crl.microsoft.com/pki/\*<br>http:\//www.microsoft.com/pki/\* | Certificate revocation |
| https://\*.core.usgovcloudapi.net/\*<br>https://\*.data.microsoft.com<br>http://\*.msftncsi.com<br>http://www.msftconnecttest.com/connecttest.txt | Azure storage accounts and monitoring |
| http:\//windowsupdate.microsoft.com<br>http://\*.windowsupdate.microsoft.com<br>https://\*.windowsupdate.microsoft.com<br>http://\*.update.microsoft.com<br>https://\*.update.microsoft.com<br>http://\*.windowsupdate.com<br>http://download.microsoft.com<br>http://\*.download.windowsupdate.com<br>http://wustat.windows.com<br>http://ntservicepack.microsoft.com<br>http://\*.ws.microsoft.com<br>https://\*.ws.microsoft.com<br>http://\*.mp.microsoft.com | Microsoft Update servers |
| http://\*.deploy.akamaitechnologies.com | Akamai CDN |
| https://\*.partners.extranet.microsoft.com/\* | Support package |
| http://\*.data.microsoft.com | Telemetry service in Windows, see the update   for customer experience and diagnostic telemetry |
| https://(vault-name).vault.usgovcloudapi.net:443 | Key Vault |
| https://azstrpffprod.usgovtrafficmanager.net/* | Remote Management |


### URL patterns for compute for Azure Government

| URL pattern | Component or functionality |
| --- | --- |
| https:\//mcr.microsoft.com<br></br>https://\*.cdn.mscr.com | Microsoft container registry (required) |
| https://\*.azure-devices.us | IoT Hub access (required) |
| https://\*.azurecr.us | Personal and third-party container registries (optional) |
| https://\*.docker.com | StorageClass (required) |

## Internet bandwidth


The devices are designed to continue to operate when your internet connection is slow or gets interrupted. In normal operating conditions, we recommend that  you use: 

- A minimum of 10-Mbps download bandwidth to ensure the device stays updated.
- A minimum of 20-Mbps dedicated upload and download bandwidth to transfer files.
- A minimum of 100-Mbps is required for the internet connection on AP5GC networks.

Use WAN throttling to limit your WAN throughput to 64 Mbps or higher.



## Compute sizing considerations

Use your experience while developing and testing your solution to ensure there is enough capacity on your Azure Stack Edge Pro R device and you get the optimal performance from your device.

Factors you should consider include:

- **Container specifics** - Think about the following.

    - How many containers are in your workload? You could have a lot of lightweight containers versus a few resource-intensive ones.
    - What are the resources allocated to these containers versus what are the resources they are consuming?
    - How many layers do your containers share?
    - Are there unused containers? A stopped container still takes up disk space.
    - In which language are your containers written?
- **Size of the data processed** - How much data will your containers be processing? Will this data consume disk space or the data will be processed in the memory?
- **Expected performance** - What are the desired performance characteristics of your solution? 

To understand and refine the performance of your solution, you could use:

- The compute metrics available in the Azure portal. Go to your Azure Stack Edge Pro R resource and then go to **Monitoring > Metrics**. Look at the **Edge compute - Memory usage** and **Edge compute - Percentage CPU** to understand the available resources and how are the resources getting consumed.
- The [Monitoring commands available via the PowerShell interface of the device](azure-stack-edge-gpu-connect-powershell-interface.md#debug-kubernetes-issues-related-to-iot-edge).

Finally, make sure that you validate your solution on your dataset and quantify the performance on Azure Stack Edge Pro R before deploying in production.

## Next step

- [Deploy your Azure Stack Edge Pro R](azure-stack-edge-pro-r-deploy-prep.md)
