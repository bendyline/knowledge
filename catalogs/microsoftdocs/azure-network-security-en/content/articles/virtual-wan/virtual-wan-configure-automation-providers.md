---
title: 'Azure Virtual WAN partners automation guidelines | Microsoft Docs'
description: Set up an automation environment to connect and configure an on-premises VPN or SD-WAN CPE, or branch device, for Azure Virtual WAN.
services: virtual-wan
author: duongau

ms.service: azure-virtual-wan
ms.topic: how-to
ms.date: 06/29/2020
ms.author: duau
#Customer intent: As a Virtual WAN software-defined connectivity provider, I want to set up a provisioning environment.
---

# Automation guidelines for Virtual WAN partners

This article helps you understand how to set up the automation environment to connect and configure a branch device (a customer on-premises VPN device or SDWAN CPE) for Azure Virtual WAN. If you are a provider that provides branch devices that can accommodate VPN connectivity over IPsec/IKEv2 or IPsec/IKEv1, this article is for you.

A branch device (a customer on-premises VPN device or SDWAN CPE) typically uses a controller/device dashboard to be provisioned. SD-WAN solution administrators can often use a management console to pre-provision a device before it gets plugged into the network. This VPN capable device gets its control plane logic from a controller. The VPN Device or SD-WAN controller can use Azure APIs to automate connectivity to Azure Virtual WAN. This type of connection requires the on-premises device to have an externally facing public IP address assigned to it.

## <a name ="before"></a>Before you begin automating

* Verify that your device supports IPsec IKEv1/IKEv2. See [default policies](#default).
* View the [REST APIs](#additional) that you use to automate connectivity to Azure Virtual WAN.
* Test out the portal experience of Azure Virtual WAN.
* Then, decide which part of the connectivity steps you would like to automate. At a minimum, we recommend automating:

  * Access Control
  * Upload of branch device information into Azure Virtual WAN
  * Downloading Azure configuration and setting up connectivity from branch device into Azure Virtual WAN

### <a name ="additional"></a>Additional information

* [REST API](https://learn.microsoft.com/rest/api/virtualwan/virtualhubs) to automate Virtual Hub creation
* [REST API](https://learn.microsoft.com/rest/api/virtualwan/vpngateways) to automate Azure VPN gateway for Virtual WAN
* [REST API](https://learn.microsoft.com/rest/api/virtualwan/vpnconnections) to connect a VPNSite to an Azure VPN Hub
* [Default IPsec policies](#default)

## <a name ="ae"></a>Customer experience

Understand the expected customer experience in conjunction with Azure Virtual WAN.

  1. Typically, a virtual WAN user will start the process by creating a Virtual WAN resource.
  2. The user will set up a service principal-based resource group access for the on-premises system (your branch controller or VPN device provisioning software) to write branch info into Azure Virtual WAN.
  3. The user may decide at this time to log into your UI and set up the service principal credentials. Once that is complete, your controller should be able to upload branch information with the automation you will provide. The manual equivalent of this on the Azure side is 'Create Site'.
  4. Once the Site (branch device) information is available in Azure, the user will connect the site to a hub. A virtual hub is a Microsoft-managed virtual network. The hub contains various service endpoints to enable connectivity from your on-premises network (vpnsite). The hub is the core of your network in a region and the vpn endpoint (vpngateway) inside it is created during this process. You can create more than one hub in the same region for the same Azure Virtual WAN. The VPN gateway is a scalable gateway which sizes appropriately based on bandwidth and connection needs. You may choose to automate virtual hub and vpngateway creation from your branch device controller dashboard.
  5. Once the virtual Hub is associated to the site, a configuration file is generated for the user to manually download. This is where your automation comes in and makes the user experience seamless. Instead of the user having to manually download and configure the branch device, you can set the automation and provide minimal click-through experience on your UI, thereby alleviating typical connectivity issues such as shared key mismatch, IPSec parameter mismatch, configuration file readability etc.
  6. At the end of this step in your solution, the user will have a seamless site-to-site connection between the branch device and virtual hub. You can also set up additional connections across other hubs. Each connection is an active-active tunnel. Your customer may choose to use a different ISP for each of the links for the tunnel.
  7. Consider providing troubleshooting and monitoring capabilities in the CPE management interface. Typical scenarios include "Customer not able to access Azure resources due to a CPE issue", "Show IPsec parameters at the CPE side" etc.

## <a name ="understand"></a>Automation details

###  <a name="access"></a>Access control

Customers must be able to set up appropriate access control for Virtual WAN in the device UI. This is recommended using an Azure Service Principal. Service principal-based access provides the device controller appropriate authentication to upload branch information. For more information, see [Create service principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md#register-an-application-with-azure-ad-and-create-a-service-principal). While this functionality is outside of the Azure Virtual WAN offering, we list below the typical steps taken to set up access in Azure after which the relevant details are inputted into the device management dashboard

* Create a Microsoft Entra application for your on-premises device controller.
* Get application ID and authentication key
* Get tenant ID
* Assign application to role "Contributor"

###  <a name="branch"></a>Upload branch device information

You should design the user experience to upload branch (on-premises site) information to Azure. You can use [REST APIs](https://learn.microsoft.com/rest/api/virtualwan/vpnsites) for VPNSite to create the site information in Virtual WAN. You can provide all branch SDWAN/VPN devices or select device customizations as appropriate.

### <a name="device"></a>Device configuration download and connectivity

This step involves downloading Azure configuration and setting up connectivity from the branch device into Azure Virtual WAN. In this step, a customer that is not using a provider would manually download the Azure configuration and apply it to their on-premises SDWAN/VPN device. As a provider, you should automate this step. View the download [REST APIs](https://learn.microsoft.com/rest/api/virtualwan/vpnsitesconfiguration/download) for additional information. The device controller can call 'GetVpnConfiguration' REST API to download the Azure configuration.

**Configuration notes**

  * If Azure VNets are attached to the virtual hub, they will appear as ConnectedSubnets.
  * VPN connectivity uses route-based configuration and supports both IKEv1, and IKEv2 protocols.

## <a name="devicefile"></a>Device configuration file

The device configuration file contains the settings to use when configuring your on-premises VPN device. When you view this file, notice the following information:

* **vpnSiteConfiguration -** This section denotes the device details set up as a site connecting to the virtual WAN. It includes the name and public ip address of the branch device.
* **vpnSiteConnections -** This section provides information about the following:

    * **Address space** of the virtual hub(s) VNet.<br>Example:
 
        ```
        "AddressSpace":"10.1.0.0/24"
        ```
    * **Address space** of the VNets that are connected to the hub.<br>Example:

         ```
        "ConnectedSubnets":["10.2.0.0/16","10.3.0.0/16"]
         ```
    * **IP addresses** of the virtual hub vpngateway. Because the vpngateway has each connection comprising of 2 tunnels in active-active configuration, you will see both IP addresses listed in this file. In this example, you see "Instance0" and "Instance1" for each site.<br>Example:

        ``` 
        "Instance0":"104.45.18.186"
        "Instance1":"104.45.13.195"
        ```
    * **Vpngateway connection configuration details** such as BGP, pre-shared key etc. The PSK is the pre-shared key that is automatically generated for you. You can always edit the connection in the Overview page for a custom PSK.
  
**Example device configuration file**

  ```
  { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"r403583d-9c82-4cb8-8570-1cbbcd9983b5"
      },
      "vpnSiteConfiguration":{ 
         "Name":"testsite1",
         "IPAddress":"73.239.3.208"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe",
               "ConnectedSubnets":[ 
                  "10.2.0.0/16",
                  "10.3.0.0/16"
               ]
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"104.45.18.186",
                  "Instance1":"104.45.13.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"bkOWe5dPPqkx0DfFE3tyuP7y3oYqAEbI",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   },
   { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"1f33f891-e1ab-42b8-8d8c-c024d337bcac"
      },
      "vpnSiteConfiguration":{ 
         "Name":" testsite2",
         "IPAddress":"66.193.205.122"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe"
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"104.45.18.187",
                  "Instance1":"104.45.13.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"XzODPyAYQqFs4ai9WzrJour0qLzeg7Qg",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   },
   { 
      "configurationVersion":{ 
         "LastUpdatedTime":"2018-07-03T18:29:49.8405161Z",
         "Version":"cd1e4a23-96bd-43a9-93b5-b51c2a945c7"
      },
      "vpnSiteConfiguration":{ 
         "Name":" testsite3",
         "IPAddress":"182.71.123.228"
      },
      "vpnSiteConnections":[ 
         { 
            "hubConfiguration":{ 
               "AddressSpace":"10.1.0.0/24",
               "Region":"West Europe"
            },
            "gatewayConfiguration":{ 
               "IpAddresses":{ 
                  "Instance0":"104.45.18.187",
                  "Instance1":"104.45.13.195"
               }
            },
            "connectionConfiguration":{ 
               "IsBgpEnabled":false,
               "PSK":"YLkSdSYd4wjjEThR3aIxaXaqNdxUwSo9",
               "IPsecParameters":{ 
                  "SADataSizeInKilobytes":102400000,
                  "SALifeTimeInSeconds":3600
               }
            }
         }
      ]
   }
  ```

## <a name="default"></a>Connectivity details

Your on-premises SDWAN/VPN device or SD-WAN configuration must match or contain the following algorithms and parameters, which you specify in the Azure IPsec/IKE policy.

* IKE encryption algorithm
* IKE integrity algorithm
* DH Group
* IPsec encryption algorithm
* IPsec integrity algorithm
* PFS Group

### <a name="default"></a>Default policies for IPsec connectivity


> **Note:**
> When you work with default policies, Azure acts as both initiator and responder during an IPsec tunnel setup. While Virtual WAN VPN supports many algorithm combinations, use GCMAES256 for both IPSEC Encryption and Integrity for optimal performance. AES256 and SHA256 offer lower performance, so expect performance degradation such as latency and packet drops when you use these algorithm types. For more information about Virtual WAN, see the [Azure Virtual WAN FAQ](virtual-wan-faq.md).
>

### Initiator

The following sections list the supported policy combinations when Azure is the initiator for the tunnel.

**Phase-1**

* AES_256, SHA1, DH_GROUP_2
* AES_256, SHA_256, DH_GROUP_2
* AES_128, SHA1, DH_GROUP_2
* AES_128, SHA_256, DH_GROUP_2

**Phase-2**

* GCM_AES_256, GCM_AES_256, PFS_NONE
* AES_256, SHA_1, PFS_NONE
* AES_256, SHA_256, PFS_NONE
* AES_128, SHA_1, PFS_NONE

### Responder

The following sections list the supported policy combinations when Azure is the responder for the tunnel.

**Phase-1**

* AES_256, SHA1, DH_GROUP_2
* AES_256, SHA_256, DH_GROUP_2
* AES_128, SHA1, DH_GROUP_2
* AES_128, SHA_256, DH_GROUP_2

**Phase-2**

* GCM_AES_256, GCM_AES_256, PFS_NONE
* AES_256, SHA_1, PFS_NONE
* AES_256, SHA_256, PFS_NONE
* AES_128, SHA_1, PFS_NONE
* AES_256, SHA_1, PFS_1
* AES_256, SHA_1, PFS_2
* AES_256, SHA_1, PFS_14
* AES_128, SHA_1, PFS_1
* AES_128, SHA_1, PFS_2
* AES_128, SHA_1, PFS_14
* AES_256, SHA_256, PFS_1
* AES_256, SHA_256, PFS_2
* AES_256, SHA_256, PFS_14
* AES_256, SHA_1, PFS_24
* AES_256, SHA_256, PFS_24
* AES_128, SHA_256, PFS_NONE
* AES_128, SHA_256, PFS_1
* AES_128, SHA_256, PFS_2
* AES_128, SHA_256, PFS_14

### SA Lifetime Values

These life time values apply for both initiator and responder

* SA Lifetime in seconds: 3600 seconds
* SA Lifetime in Bytes: 102,400,000 KB


### <a name="custom"></a>Custom policies for IPsec connectivity


When working with custom IPsec policies, keep in mind the following requirements:

* **IKE** - For IKE, you can select any parameter from IKE Encryption, plus any parameter from IKE Integrity, plus any parameter from DH Group.
* **IPsec** -  For IPsec, you can select any parameter from IPsec Encryption, plus any parameter from IPsec Integrity, plus PFS. If any of the parameters for IPsec Encryption or IPsec Integrity is GCM, then the parameters for both settings must be GCM.

Custom IKE main mode policies support Diffie-Hellman Group 14, Group 24, or ECP (Elliptic Curve Groups) ECP256 (Group 19) and ECP384 (Group 20). Similar cryptographic group requirements apply to IPsec quick mode policies.

The default custom policy includes SHA1, DHGroup2, and 3DES for backward compatibility. These are weaker algorithms that aren't supported when creating a custom policy. We recommend only using the following algorithms:

**Available settings and parameters**

| Setting | Parameters |
| --- | --- |
| IKE Encryption | GCMAES256, GCMAES128, AES256, AES128 |
| IKE Integrity | SHA384, SHA256 |
| DH Group | ECP384, ECP256, DHGroup24, DHGroup14 |
| IPsec Encryption | GCMAES256, GCMAES128, AES256, AES128, None |
| IPsec Integrity | GCMAES256, GCMAES128, SHA256 |
| PFS Group | ECP384, ECP256, PFS24, PFS14, None |
| SA Lifetime | integer; min. 300/ default 3600 seconds |

The following table lists the corresponding Diffie-Hellman groups that the custom policy supports:

| Diffie-Hellman group | DHGroup | PFSGroup | Key length |
| --- | --- | --- | --- |
| 14 | DHGroup14 | PFS14 | 2048-bit MODP |
| 19 | ECP256 | ECP256 | 256-bit ECP |
| 20 | ECP384 | ECP384 | 384-bit ECP |
| 24 | DHGroup24 | PFS24 | 2048-bit MODP |


## Next steps

For more information about Virtual WAN, see [About Azure Virtual WAN](virtual-wan-about.md) and the [Azure Virtual WAN FAQ](virtual-wan-faq.md).

For any additional information, please send an email to <azurevirtualwan@microsoft.com>. Include your company name in “[ ]” in the subject line.
