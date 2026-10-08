---
title: Microsoft Azure Data Box Gateway system requirements| Microsoft Docs
description: Learn about the software and networking requirements for your Azure Data Box Gateway
services: databox
author: stevenmatthew

ms.service: azure-data-box-gateway
ms.topic: concept-article
ms.date: 03/24/2022
ms.author: shaas
# Customer intent: As a system administrator, I want to understand the system and networking requirements for Azure Data Box Gateway, so that I can ensure proper deployment and connectivity for seamless operation.
---
# Azure Data Box Gateway system requirements

This article describes the important system requirements for your Microsoft Azure Data Box Gateway solution and for the clients connecting to Azure Data Box Gateway. We recommend that you review the information carefully before you deploy your Data Box Gateway, and then refer back to it as necessary during the deployment and subsequent operation.

The system requirements for the Data Box Gateway virtual device include:

- **Software requirements for hosts** - describes the supported platforms, browsers for the local configuration UI, SMB clients, and any additional requirements for the hosts that connect to the device.
- **Networking requirements for the device** - provides information about any networking requirements for the operation of the virtual device.


## Specifications for the virtual device

The underlying host system for the Data Box Gateway is able to dedicate the following resources to provision your virtual device:

| Specifications | Description |
| --- | --- |
| Virtual processors (cores) | Minimum 4 |
| Memory | Minimum 8 GB. We strongly recommend at least 16 GB. |
| Availability | Single node |
| Disks | OS disk: 250 GB <br> Data disk: 2 TB minimum, thin provisioned, and must be backed by SSDs |
| Network interfaces | 1 or more virtual network interface |


## Supported OS for clients connected to device


The following list contains supported operating systems for use by clients or hosts connected to your device. These operating system versions were tested in-house.

| **Operating system/platform** | **Versions** |
| --- | --- |
| Windows Server | 2012 R2 <br> 2016 <br> 2019 |
| Windows | 8, 10 |
| SUSE Linux | Enterprise Server 12 (x86_64) |
| Ubuntu | 16.04.3 LTS |
| CentOS | 7.0 |
| Mac OS | 10.14.1 |



## Supported protocols for clients accessing device


Here are the supported protocols for clients accessing your device.

| **Protocol** | **Versions** | **Notes** |
| --- | --- | --- |
| SMB | 2.X, 3.X | SMB 1 isn't supported. |
| NFS | 3.0, 4.1 | Mac OS is not supported with NFS v4.1. |




## Supported virtualization platforms for device

| **Operating system/platform** | **Versions** | **Notes** |
| --- | --- | --- |
| Hyper-V | 2012 R2 <br> 2016 <br> 2019 |  |
| VMware ESXi | 6.7 <br> 7.0 <br> 8.0 | VMware tools are not supported. |

## Supported storage accounts


Here is a list of the supported storage accounts for your device.

| **Storage account** | **Notes** |
| --- | --- |
| Classic | Standard |
| General Purpose | Standard; both V1 and V2 are supported. Both hot and cool tiers are supported. |




## Supported storage types


Here is a list of the supported storage types for the device.

| **File format** | **Notes** |
| --- | --- |
| Azure block blob |  |
| Azure page blob |  |
| Azure Files |  |


## Supported browsers for local web UI


The following list of browsers are supported for the virtual device's local web UI:

| Browser | Versions | Additional requirements/notes |
| --- | --- | --- |
| Google Chrome | Latest version |  |
| Microsoft Edge | Latest version |  |
| Internet Explorer | Latest version | If Enhanced Security features are enabled, you might not be able to access local web UI pages. Disable enhanced security, and restart your browser. |
| Firefox | Latest version |  |


## Networking port requirements

The following table lists the ports that need to be opened in your firewall to allow for SMB, cloud, or management traffic. In this table, *in* or *inbound* refers to the direction from which incoming client requests access to your device. *Out* or *outbound* refers to the direction in which your Data Box Gateway device sends data externally, beyond the deployment: for example, outbound to the Internet.


| Port no. | In or out | Port scope | Required | Notes |
| --- | --- | --- | --- | --- |
| TCP 80 (HTTP) | Out | WAN | No | Outbound port is used for internet access to retrieve updates. <br>The outbound web proxy is user configurable. |
| TCP 443 (HTTPS) | Out | WAN | Yes | Outbound port is used for accessing data in the cloud.<br>The outbound web proxy is user configurable. |
| UDP 123 (NTP) | Out | WAN | In some cases<br>See notes | This port is required only if you're using an internet-based NTP server. |
| UDP 53 (DNS) | Out | WAN | In some cases<br>See notes | This port is required only if you're using an internet-based DNS server.<br>We recommend using a local DNS server. |
| TCP 5985 (WinRM) | Out/In | LAN | In some cases<br>See notes | This port is required to connect to the device via remote PowerShell over HTTP. |
| TCP 5986 (WinRM) | Out/In | LAN | In some cases<br>See notes | This port is required to connect to the device via remote PowerShell over HTTPS. |
| UDP 67 (DHCP) | Out | LAN | In some cases<br>See notes | This port is required only if you're using a local DHCP server. |
| TCP 80 (HTTP) | Out/In | LAN | Yes | This port is the inbound port for local UI on the device for local management. <br>Accessing the local UI over HTTP will automatically redirect to HTTPS. |
| TCP 443 (HTTPS) | Out/In | LAN | Yes | This port is the inbound port for local UI on the device for local management. |
| TCP 445 (SMB) | In | LAN | In some cases<br>See notes | This port is required only if you are connecting via SMB. |
| TCP 2049 (NFS) | In | LAN | In some cases<br>See notes | This port is required only if you are connecting via NFS. |



## URL patterns for firewall rules

Network administrators can often configure advanced firewall rules based on the URL patterns to filter the inbound and the outbound traffic. Your Data Box Gateway device and the Data Box Gateway service depend on other Microsoft applications such as Azure Service Bus, Microsoft Entra Access Control, storage accounts, and Microsoft Update servers. The URL patterns associated with these applications can be used to configure firewall rules. It is important to understand that the URL patterns associated with these applications can change. This in turn will require the network administrator to monitor and update firewall rules for your Data Box Gateway as and when needed.

We recommend that you set your firewall rules for outbound traffic, based on Data Box Gateway fixed IP addresses, liberally in most cases. However, you can use the information below to set advanced firewall rules that are needed to create secure environments.

> **Note:**
> - The device (source) IPs should always be set to all the cloud-enabled network interfaces.
> - The destination IPs should be set to [Azure datacenter IP ranges](https://www.microsoft.com/download/details.aspx?id=41653).


| URL pattern | Component or functionality |
| --- | --- |
| https://\*.databoxedge.azure.com/\*<br>https://\*.servicebus.windows.net/\*<br>https://login.windows.net | Azure Stack Edge / Data Box Gateway service<br>Azure Service Bus<br>Authentication Service |
| http://\*.backup.windowsazure.com | Device activation |
| http:\//crl.microsoft.com/pki/\*<br>http:\//www.microsoft.com/pki/\* | Certificate revocation |
| https://\*.core.windows.net/\*<br>https://\*.data.microsoft.com<br>http://\*.msftncsi.com | Azure storage accounts and monitoring |
| http:\//windowsupdate.microsoft.com<br>http://\*.windowsupdate.microsoft.com<br>https://\*.windowsupdate.microsoft.com<br>http://\*.update.microsoft.com<br>https://\*.update.microsoft.com<br>http://\*.windowsupdate.com<br>http://download.microsoft.com<br>http://\*.download.windowsupdate.com<br>http://wustat.windows.com<br>http://ntservicepack.microsoft.com<br>http://go.microsoft.com<br>http://dl.delivery.mp.microsoft.com<br>https://dl.delivery.mp.microsoft.com<br>http://\*.ws.microsoft.com<br>https://\*.ws.microsoft.com<br>http://\*.mp.microsoft.com | Microsoft Update servers |
| http://\*.deploy.akamaitechnologies.com | Akamai CDN |
| https://\*.partners.extranet.microsoft.com/\* | Support package |
| http://\*.data.microsoft.com | Telemetry service in Windows, see the update   for customer experience and diagnostic telemetry |
| https://(vault-name).vault.azure.net:443 | Key Vault |




### URL patterns for Azure Government


| URL pattern | Component or functionality |
| --- | --- |
| https://\*.databoxedge.azure.us/\*<br>https://\*.servicebus.usgovcloudapi.net/\*<br>https://login.microsoftonline.us | Azure Stack Edge / Data Box Gateway service<br>Azure Service Bus<br>Authentication Service |
| http://\*.backup.windowsazure.us | Device activation |
| http:\//crl.microsoft.com/pki/\*<br>http:\//www.microsoft.com/pki/\* | Certificate revocation |
| https://\*.core.usgovcloudapi.net/\*<br>https://\*.data.microsoft.com<br>http://\*.msftncsi.com | Azure storage accounts and monitoring |
| http:\//windowsupdate.microsoft.com<br>http://\*.windowsupdate.microsoft.com<br>https://\*.windowsupdate.microsoft.com<br>http://\*.update.microsoft.com<br>https://\*.update.microsoft.com<br>http://\*.windowsupdate.com<br>http://download.microsoft.com<br>http://\*.download.windowsupdate.com<br>http://wustat.windows.com<br>http://ntservicepack.microsoft.com<br>http://\*.ws.microsoft.com<br>https://\*.ws.microsoft.com<br>http://\*.mp.microsoft.com | Microsoft Update servers |
| http://\*.deploy.akamaitechnologies.com | Akamai CDN |
| https://\*.partners.extranet.microsoft.com/\* | Support package |
| http://\*.data.microsoft.com | Telemetry service in Windows, see the update   for customer experience and diagnostic telemetry |
|  |




## Internet bandwidth


The devices are designed to continue to operate when your internet connection is slow or gets interrupted. In normal operating conditions, we recommend that you use: 

- A minimum of 10-Mbps download bandwidth to ensure the device stays updated.
- A minimum of 20-Mbps dedicated upload and download bandwidth to transfer files.




## Next step

* [Deploy your Azure Data Box Gateway](data-box-gateway-deploy-prep.md)
