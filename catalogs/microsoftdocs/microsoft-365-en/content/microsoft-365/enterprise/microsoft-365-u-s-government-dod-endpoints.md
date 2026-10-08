---
title: Microsoft 365 US Government DOD endpoints
ms.author: scotv
author: kelleyvice-msft
manager: scotv
ms.date: 03/31/2026
audience: ITPro
ms.topic: article
ms.service: microsoft-365-enterprise
ms.subservice: network
ms.localizationpriority: medium
ms.collection:
- scotvorg 
- M365-subscription-management
- Strat_O365_Enterprise
search.appverid:
- OGA150
- OGC150
- OGD150
- MOE150
ms.assetid: 5d7dce60-4892-4b58-b45e-ee42fe8a907f
f1.keywords:
- NOCSH
description: Microsoft 365 requires connectivity to the Internet. The following endpoints should be reachable for customers using Microsoft 365 U.S. Government DoD plans only.
hideEdit: true
ms.custom:
- seo-marvel-mar2020
- network
---

# Microsoft 365 U.S. Government DoD endpoints

*Applies To: Microsoft 365 Admin*

Microsoft 365 requires connectivity to the Internet. The following endpoints should be reachable for customers using Microsoft 365 U.S. Government DoD plans only.
  
**Microsoft 365 endpoints:** [Worldwide (including GCC)](urls-and-ip-address-ranges.md) \| [Microsoft 365 operated by 21 Vianet](urls-and-ip-address-ranges-21vianet.md) \| *Microsoft 365 U.S. Government DoD* \| [Microsoft 365 U.S. Government GCC High](microsoft-365-u-s-government-gcc-high-endpoints.md)

<br>
****

| Notes | Download |
| --- | --- |
| **Last updated:** 03/31/2026 - [Change Log subscription](https://endpoints.office.com/version/USGOVDoD?allversions=true&format=rss&clientrequestid=b10c5ed1-bad1-445f-b386-b919946339a7) | **Download:** the full list in [JSON format](https://endpoints.office.com/endpoints/USGOVDoD?clientrequestid=b10c5ed1-bad1-445f-b386-b919946339a7) |

Start with [Managing Microsoft 365 endpoints](managing-office-365-endpoints.md) to understand our recommendations for managing network connectivity using this data. Endpoints data is updated as needed at the beginning of each month with new IP Addresses and URLs published 30 days in advance of being active. This lets customers who don't yet have automated updates to complete their processes before new connectivity is required. Endpoints might also be updated during the month if needed to address support escalations, security incidents, or other immediate operational requirements. The data shown on this page is all generated from the REST-based web services. If you're using a script or a network device to access this data, you should go to the [Web service](microsoft-365-ip-web-service.md) directly.

Endpoint data below lists requirements for connectivity from a user's machine to Microsoft 365. It doesn't include network connections from Microsoft into a customer network, sometimes called hybrid or inbound network connections. For more information, see [Additional endpoints not included in the web service](additional-office365-ip-addresses-and-urls.md).

The Microsoft 365 suite is broken down into four major service areas representing the three primary workloads and a set of common resources. These service areas might be used to associate traffic flows with a particular application, however given that features often consume endpoints across multiple workloads, these service areas can't effectively be used to restrict access.

Data columns shown are:

- **ID**: The ID number of the row, also known as an endpoint set. This ID is the same as is returned by the web service for the endpoint set.
- **Category**: Shows whether the endpoint set is categorized as `Optimize`, `Allow`, or `Default`. You can read about these categories and guidance for management of them at [https://aka.ms/pnc](microsoft-365-network-connectivity-principles.md). This column also lists which endpoint sets are required to have network connectivity. For endpoint sets that aren't required to have network connectivity, we provide notes in this field to indicate what functionality would be missing if the endpoint set is blocked. If you're excluding an entire service area, the endpoint sets listed as required don't require connectivity.
- **ER**: This is **Yes** if the endpoint set is supported over Azure ExpressRoute with Microsoft 365 route prefixes. The BGP community that includes the route prefixes shown aligns with the service area listed. When ER is **No**, this means that ExpressRoute isn't supported for this endpoint set. However, it shouldn't be assumed that no routes are advertised for an endpoint set where ER is **No**. If you plan to use Microsoft Entra Connect, read the [special considerations section](https://learn.microsoft.com/azure/active-directory/hybrid/reference-connect-instances#microsoft-azure-government) to ensure you have the appropriate Microsoft Entra Connect configuration.
- **Addresses**: Lists the FQDNs or wildcard domain names and IP Address ranges for the endpoint set. An IP Address range is in CIDR format and might include many individual IP Addresses in the specified network.
- **Ports**: Lists the TCP or UDP ports that are combined with the Addresses to form the network endpoint. You might notice some duplication in IP Address ranges where there are different ports listed.

## Microsoft 365 Unified Domains

> **Note:**
> In response to customer feedback and to streamline endpoint management, Microsoft has initiated the process of consolidating Microsoft 365 apps and services into a select group of dedicated, secured, and purpose-managed domains within the `.microsoft` top level domain (TLD). 
> 
> To avoid connectivity issues for users, ensure that the following essential domains are included in your allow list and that connectivity to these domains isn't blocked.

| ID | Category | Domain name | Purpose | Ports |
| --- | --- | --- | --- | --- |
| 12 | Required | `*.usgovcloud.microsoft` | Dedicated to authenticated user facing Microsoft SaaS product experiences. | **TCP:** 443, 80<br>**UDP:** 443 |
| 12 | Required | `*.usgovcloud-static.microsoft` | Dedicated to static (not customer generated) content hosted on CDNs. | **TCP:** 443, 80<br>**UDP:** 443 |
| 12 | Required | `*.usgovcloud-usercontent.microsoft` | Content used in Microsoft 365 experiences that requires domain isolation from applications. | **TCP:** 443, 80<br>**UDP:** 443 |

<!--THIS FILE IS AUTOMATICALLY GENERATED. MANUAL CHANGES WILL BE OVERWRITTEN.-->
<!--Please contact the Office 365 Endpoints team with any questions.-->
<!--USGovDoD endpoints version 2026033100-->
<!--File generated 2026-04-27 18:37:32.7455-->

## Exchange Online

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 1 | Optimize<BR>Required | Yes | `outlook-dod.office365.us, webmail.apps.mil`<BR>`20.35.192.0/20, 40.66.24.0/21, 2001:489a:2200:500::/56, 2001:489a:2200:700::/56, 2001:489a:2200:c000::/50` | **TCP:** 443, 80 |
| 4 | Default<BR>Required | Yes | `outlook-dod.office365.us, webmail.apps.mil` | **TCP:** 143, 25, 587, 993, 995 |
| 5 | Default<BR>Required | Yes | `attachments-dod.office365-net.us, autodiscover-s-dod.office365.us, autodiscover.<tenant>.mail.onmicrosoft.com, autodiscover.<tenant>.mail.onmicrosoft.us, autodiscover.<tenant>.onmicrosoft.com, autodiscover.<tenant>.onmicrosoft.us` | **TCP:** 443, 80 |
| 6 | Allow<BR>Required | Yes | `*.protection.apps.mil, *.protection.office365.us, *.usgovcloud-mx.microsoft`<BR>`23.103.191.0/24, 23.103.199.0/25, 23.103.204.0/22, 62.10.144.0/20, 2001:489a:2202::/62, 2001:489a:2202:8::/62, 2001:489a:2202:2000::/63, 2001:489a:2202:c000::/50` | **TCP:** 25, 443 |

## SharePoint Online and OneDrive for Business

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 9 | Optimize<BR>Required | Yes | `*.dps.mil, *.sharepoint-mil.us`<BR>`20.34.12.0/22, 2001:489a:2204:902::/63, 2001:489a:2204:c00::/63` | **TCP:** 443, 80<BR>**UDP:** 443 |
| 10 | Default<BR>Required | No | `*.wns.windows.com, g.live.com, oneclient.sfx.ms` | **TCP:** 443, 80 |
| 20 | Default<BR>Required | No | `*.svc.ms` | **TCP:** 443, 80 |

## Microsoft Teams

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 7 | Optimize<BR>Required | Yes | `*.dod.teams.microsoft.us, *.online.dod.skypeforbusiness.us, dod.teams.microsoft.us`<BR>`13.72.128.0/20, 52.127.64.0/21, 57.16.128.0/17, 104.212.32.0/22, 195.134.240.0/22, 2001:489a:2250::/44` | **TCP:** 443<BR>**UDP:** 3478, 3479, 3480, 3481 |
| 21 | Default<BR>Required | No | `msteamsstatics.blob.core.usgovcloudapi.net, statics.teams.microsoft.com` | **TCP:** 443 |

## Microsoft 365 Common and Office Online

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 11 | Allow<BR>Required | Yes | `*.dod.online.office365.us`<BR>`52.127.80.0/23, 2001:489a:2208:8000::/49` | **TCP:** 443 |
| 12 | Default<BR>Required | No | `*.apps.mil, *.office365.us, *.usgovcloud-static.microsoft, *.usgovcloud-usercontent.microsoft, *.usgovcloud.microsoft` | **TCP:** 443, 80 |
| 13 | Allow<BR>Required | Yes | `*.auth.microsoft.us, *.gov.us.microsoftonline.com, dod-graph.microsoft.us, graph.microsoftazure.us, login.microsoftonline.us`<BR>`20.140.232.0/23, 52.126.194.0/23, 2001:489a:3500::/50` | **TCP:** 443 |
| 14 | Default<BR>Required | No | `*.msauth.net, *.msauthimages.us, *.msftauth.net, *.msftauthimages.us, clientconfig.microsoftonline-p.net, graph.windows.net, login-us.microsoftonline.com, login.microsoftonline-p.com, login.microsoftonline.com, login.windows.net, loginex.microsoftonline.com, mscrl.microsoft.com, nexus.microsoftonline-p.com, secure.aadcdn.microsoftonline-p.com` | **TCP:** 443 |
| 15 | Allow<BR>Required | Yes | `portal.apps.mil, reports.apps.mil, webshell.dodsuite.office365.us, www.ohome.apps.mil`<BR>`52.127.72.42/32, 52.127.76.42/32, 52.180.251.166/32, 52.181.24.112/32, 52.181.160.113/32, 52.182.24.200/32, 52.182.54.237/32` | **TCP:** 443 |
| 16 | Allow<BR>Required | Yes | `dod.loki.office365.us`<BR>`52.127.72.0/21, 2001:489a:2206::/48` | **TCP:** 443 |
| 17 | Default<BR>Required | No | `activation.sls.microsoft.com, crl.microsoft.com, go.microsoft.com, insertmedia.bing.office.net, ocsa.officeapps.live.com, ocsredir.officeapps.live.com, ocws.officeapps.live.com, office15client.microsoft.com, officecdn.microsoft.com, officecdn.microsoft.com.edgesuite.net, officepreviewredir.microsoft.com, officeredir.microsoft.com, ols.officeapps.live.com, r.office.microsoft.com` | **TCP:** 443, 80 |
| 18 | Default<BR>Required | No | `cdn.odc.officeapps.live.com, mrodevicemgr.officeapps.live.com, odc.officeapps.live.com, officeclient.microsoft.com` | **TCP:** 443, 80 |
| 24 | Default<BR>Required | No | `lpcres.delve.office.com` | **TCP:** 443 |
| 25 | Default<BR>Required | No | `*.cdn.office.net` | **TCP:** 443 |
| 26 | Allow<BR>Required | Yes | `*.security.apps.mil, compliance.apps.mil, purview.apps.mil, scc.protection.apps.mil, security.apps.mil`<BR>`23.103.204.0/22, 52.127.72.0/21` | **TCP:** 443, 80 |
| 28 | Default<BR>Required | No | `activity.windows.com, dod.activity.windows.us` | **TCP:** 443 |
| 29 | Default<BR>Required | No | `dod-mtis.cortana.ai` | **TCP:** 443 |
| 30 | Default<BR>Required | No | `*.aadrm.us, *.informationprotection.azure.us` | **TCP:** 443 |
| 31 | Default<BR>Required | No | `pf.events.data.microsoft.com, pf.pipe.aria.microsoft.com` | **TCP:** 443, 80 |

  
Notes for this table:

- The Security and Compliance Center (SCC) provides support for Azure ExpressRoute for Microsoft 365. The same applies for many features exposed through the SCC such as Reporting, Auditing, eDiscovery (Premium), Unified DLP, and Data Governance. Two specific features, PST Import and eDiscovery Export, currently don't support Azure ExpressRoute with only Microsoft 365 route filters due to their dependency on Azure Blob Storage. To consume those features, you need separate connectivity to Azure Blob Storage using any supportable Azure connectivity options, which include Internet connectivity or Azure ExpressRoute with Azure Public route filters. You have to evaluate establishing such connectivity for both of those features. The Microsoft 365 Information Protection team is aware of this limitation and is actively working to bring support for Azure ExpressRoute for Microsoft 365 as limited to Microsoft 365 route filters for both of those features.
- There are other optional endpoints for Microsoft 365 Apps for enterprise that aren't listed and aren't required for users to launch Microsoft 365 Apps for enterprise applications and edit documents. Optional endpoints are hosted in Microsoft datacenters and don't process, transmit, or store customer data. We recommend that user connections to these endpoints be directed to the default Internet egress perimeter.
