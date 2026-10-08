---
title: "Microsoft 365 U.S. Government GCC High endpoints"
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
f1.keywords:
- CSH
ms.custom: 
- Adm_O365
- seo-marvel-apr2020
- network
search.appverid: MET150
ms.assetid: cbd2369c-fd96-464c-bf48-c99826b459ee
description: "In this article, you find endpoints reachable for customers using Microsoft 365 U.S. Government GCC High plans."
hideEdit: true
---

# Microsoft 365 U.S. Government GCC High endpoints

*Applies To: Microsoft 365 Admin*

Microsoft 365 requires connectivity to the Internet. The following endpoints should be reachable for customers using Microsoft 365 U.S. Government GCC High plans only.
  
 **Microsoft 365 endpoints:** [Worldwide (including GCC)](urls-and-ip-address-ranges.md) \| [Microsoft 365 operated by 21 Vianet](urls-and-ip-address-ranges-21vianet.md) \| [Microsoft 365 U.S. Government DoD](microsoft-365-u-s-government-dod-endpoints.md) \| *Microsoft 365 U.S. Government GCC High*

<br>

***

| Notes | Download |
| --- | --- |
| **Last updated:** 03/31/2026 - [Change Log subscription](https://endpoints.office.com/version/USGOVGCCHigh?allversions=true&format=rss&clientrequestid=b10c5ed1-bad1-445f-b386-b919946339a7) | **Download:** the full list in [JSON format](https://endpoints.office.com/endpoints/USGOVGCCHigh?clientrequestid=b10c5ed1-bad1-445f-b386-b919946339a7) |

Start with [Managing Microsoft 365 endpoints](managing-office-365-endpoints.md) to understand our recommendations for managing network connectivity using this data. Endpoints data is updated as needed at the beginning of each month. New IP Addresses and URLs are published 30 days in advance of being active. This lets customers who don't yet have automated updates to complete their processes before new connectivity is required. Endpoints might also be updated during the month if needed to address support escalations, security incidents, or other immediate operational requirements. The data shown on this page is all generated from the REST-based web services. If you're using a script or a network device to access this data, you should go to the [Web service](microsoft-365-ip-web-service.md) directly.

Endpoint data below lists requirements for connectivity from a user's machine to Microsoft 365. It doesn't include network connections from Microsoft into a customer network, sometimes called hybrid or inbound network connections.

The Microsoft 365 suite is broken down into four major service areas representing the three primary workloads and a set of common resources. These service areas might be used to associate traffic flows with a particular application, however given that features often consume endpoints across multiple workloads, these service areas can't effectively be used to restrict access.

Data columns shown are:

- **ID**: The ID number of the row, also known as an endpoint set. This ID is the same as is returned by the web service for the endpoint set.
- **Category**: Shows whether the endpoint set is categorized as `Optimize`, `Allow`, or `Default`. You can read about these categories and guidance for management of them at [https://aka.ms/pnc](microsoft-365-network-connectivity-principles.md). This column also lists which endpoint sets are required to have network connectivity. For endpoint sets, which aren't required to have network connectivity, we provide notes in this field to indicate what functionality would be missing if the endpoint set is blocked. If you're excluding an entire service area, the endpoint sets listed as required don't require connectivity.
- **ER**: This is **Yes** if the endpoint set is supported over Azure ExpressRoute with Microsoft 365 route prefixes. The BGP community that includes the route prefixes shown aligns with the service area listed. When ER is **No**, this means that ExpressRoute isn't supported for this endpoint set. However, it shouldn't be assumed that no routes are advertised for an endpoint set where ER is **No**. If you plan to use Microsoft Entra Connect, read the [special considerations section](https://learn.microsoft.com/azure/active-directory/hybrid/reference-connect-instances#microsoft-azure-government) to ensure you have the appropriate Microsoft Entra Connect configuration.
- **Addresses**: Lists the FQDNs or wildcard domain names and IP Address ranges for the endpoint set. An IP Address range is in CIDR format and might include many individual IP Addresses in the specified network.
- **Ports**: Lists the TCP or UDP ports that are combined with the Addresses to form the network endpoint. You might notice some duplication in IP Address ranges where there are different ports listed.

## Microsoft 365 Unified Domains

> **Note:**
> In response to customer feedback and to streamline endpoint management, Microsoft has initiated the process of consolidating Microsoft 365 apps and services into a select group of dedicated, secured, and purpose-managed domains within `.microsoft` top level domain (TLD). 
> 
> To avoid connectivity issues for users, ensure that the following essential domains are included in your allow list and that connectivity to these domains isn't blocked.

| ID | Category | Domain name | Purpose | Ports |
| --- | --- | --- | --- | --- |
| 23 | Required | `*.usgovcloud.microsoft` | Dedicated to authenticated user facing Microsoft SaaS product experiences. | **TCP:** 443, 80<br>**UDP:** 443 |
| 23 | Required | `*.usgovcloud-static.microsoft` | Dedicated to static (not customer generated) content hosted on CDNs. | **TCP:** 443, 80<br>**UDP:** 443 |
| 23 | Required | `*.usgovcloud-usercontent.microsoft` | Content used in Microsoft 365 experiences that requires domain isolation from applications. | **TCP:** 443, 80<br>**UDP:** 443 |

<!--THIS FILE IS AUTOMATICALLY GENERATED. MANUAL CHANGES WILL BE OVERWRITTEN.-->
<!--Please contact the Office 365 Endpoints team with any questions.-->
<!--USGovGCCHigh endpoints version 2026033100-->
<!--File generated 2026-04-27 18:37:25.8168-->

## Exchange Online

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 1 | Optimize<BR>Required | Yes | `outlook.office365.us`<BR>`20.35.208.0/20, 20.35.240.0/21, 40.66.16.0/21, 2001:489a:2200:100::/56, 2001:489a:2200:400::/56, 2001:489a:2200:600::/56, 2001:489a:2200:8000::/50` | **TCP:** 443, 80 |
| 4 | Default<BR>Required | Yes | `attachments.office365-net.us, autodiscover-s.office365.us, autodiscover.<tenant>.mail.onmicrosoft.com, autodiscover.<tenant>.mail.onmicrosoft.us, autodiscover.<tenant>.onmicrosoft.com, autodiscover.<tenant>.onmicrosoft.us` | **TCP:** 443, 80 |
| 5 | Default<BR>Required | Yes | `outlook.office365.us` | **TCP:** 143, 25, 587, 993, 995 |
| 6 | Allow<BR>Required | Yes | `*.manage.office365.us, *.protection.office365.us, *.scc.office365.us, *.usgovcloud-mx.microsoft, manage.office365.us, scc.office365.us`<BR>`23.103.191.0/24, 23.103.199.128/25, 23.103.208.0/22, 52.227.182.149/32, 52.238.74.212/32, 52.244.65.13/32, 62.10.128.0/20, 2001:489a:2202:4::/62, 2001:489a:2202:c::/62, 2001:489a:2202:2000::/63, 2001:489a:2202:8000::/50` | **TCP:** 25, 443 |

## SharePoint Online and OneDrive for Business

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 9 | Optimize<BR>Required | Yes | `*.sharepoint.us`<BR>`20.34.8.0/22, 2001:489a:2204:800::/63, 2001:489a:2204:900::/63` | **TCP:** 443, 80<BR>**UDP:** 443 |
| 10 | Default<BR>Required | No | `*.wns.windows.com, admin.onedrive.us, g.live.com, oneclient.sfx.ms` | **TCP:** 443, 80 |
| 20 | Default<BR>Required | No | `*.svc.ms` | **TCP:** 443, 80 |

## Microsoft Teams

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 7 | Optimize<BR>Required | Yes | `13.72.144.0/20, 52.127.88.0/21, 57.16.0.0/17, 104.212.44.0/22, 2001:489a:2240::/44` | **UDP:** 3478, 3479, 3480, 3481 |
| 21 | Default<BR>Required | No | `msteamsstatics.blob.core.usgovcloudapi.net, statics.teams.microsoft.com` | **TCP:** 443 |
| 31 | Allow<BR>Required | Yes | `*.gov.teams.microsoft.us, gov.teams.microsoft.us`<BR>`13.72.144.0/20, 52.127.88.0/21, 57.16.0.0/17, 104.212.44.0/22, 2001:489a:2240::/44` | **TCP:**  443, 80 |

## Microsoft 365 Common and Office Online

| ID | Category | ER | Addresses | Ports |
| --- | --- | --- | --- | --- |
| 11 | Allow<BR>Required | Yes | `*.gov.online.office365.us`<BR>`52.127.37.0/24, 52.127.82.0/23, 2001:489a:2208::/49` | **TCP:** 443 |
| 13 | Allow<BR>Required | Yes | `*.auth.microsoft.us, *.gov.us.microsoftonline.com, graph.microsoft.us, graph.microsoftazure.us, login.microsoftonline.us`<BR>`20.140.232.0/23, 52.126.194.0/23, 2001:489a:3500::/50` | **TCP:** 443 |
| 14 | Default<BR>Required | No | `*.msauth.net, *.msauthimages.us, *.msftauth.net, *.msftauthimages.us, clientconfig.microsoftonline-p.net, graph.windows.net, login-us.microsoftonline.com, login.microsoftonline-p.com, login.microsoftonline.com, login.windows.net, loginex.microsoftonline.com, mscrl.microsoft.com, nexus.microsoftonline-p.com, secure.aadcdn.microsoftonline-p.com` | **TCP:** 443 |
| 15 | Default<BR>Required | No | `officehome.msocdn.us` | **TCP:** 443, 80 |
| 16 | Allow<BR>Required | Yes | `www.office365.us`<BR>`52.227.170.242/32` | **TCP:** 443, 80 |
| 17 | Allow<BR>Required | Yes | `*.osi.office365.us, gcchigh.loki.office365.us, tasks.office365.us`<BR>`52.127.240.0/20, 2001:489a:2206::/48` | **TCP:** 443 |
| 18 | Default<BR>Required | No | `*.office.delivery.microsoft.com, activation.sls.microsoft.com, crl.microsoft.com, go.microsoft.com, insertmedia.bing.office.net, mrodevicemgr.officeapps.live.com, ocsa.officeapps.live.com, ocsredir.officeapps.live.com, ocws.officeapps.live.com, office15client.microsoft.com, officecdn.microsoft.com, officecdn.microsoft.com.edgesuite.net, officepreviewredir.microsoft.com, officeredir.microsoft.com, ols.officeapps.live.com, r.office.microsoft.com` | **TCP:** 443, 80 |
| 19 | Default<BR>Required | No | `cdn.odc.officeapps.live.com, odc.officeapps.live.com, officeclient.microsoft.com` | **TCP:** 443, 80 |
| 23 | Default<BR>Required | No | `*.office365.us, *.usgovcloud-static.microsoft, *.usgovcloud-usercontent.microsoft, *.usgovcloud.microsoft` | **TCP:** 443, 80 |
| 24 | Default<BR>Required | No | `lpcres.delve.office.com` | **TCP:** 443 |
| 25 | Default<BR>Required | No | `*.cdn.office.net` | **TCP:** 443, 80 |
| 26 | Allow<BR>Required | Yes | `*.security.microsoft.us, compliance.microsoft.us, purview.microsoft.us, scc.office365.us, security.microsoft.us`<BR>`20.158.112.0/21, 52.127.240.0/20, 2001:489a:2209::/49` | **TCP:** 443, 80 |
| 28 | Default<BR>Required | No | `activity.windows.com, gcc-high.activity.windows.us` | **TCP:** 443 |
| 29 | Default<BR>Required | No | `gcch-mtis.cortana.ai` | **TCP:** 443 |
| 30 | Default<BR>Required | No | `*.aadrm.us, *.informationprotection.azure.us` | **TCP:** 443 |
| 32 | Default<BR>Required | No | `tb.events.data.microsoft.com, tb.pipe.aria.microsoft.com` | **TCP:** 443, 80 |


Notes for this table:

- The Security and Compliance Center (SCC) provides support for Azure ExpressRoute for Microsoft 365. The same applies for many features exposed through the SCC such as Reporting, Auditing, eDiscovery (Premium), Unified DLP, and Data Governance. Two specific features, PST Import and eDiscovery Export, currently don't support Azure ExpressRoute with only Microsoft 365 route filters due to their dependency on Azure Blob Storage. To consume those features, you need separate connectivity to Azure Blob Storage using any supportable Azure connectivity options, which include Internet connectivity or Azure ExpressRoute with Azure Public route filters. You have to evaluate establishing such connectivity for both of those features. The Microsoft 365 Information Protection team is aware of this limitation and is actively working to bring support for Azure ExpressRoute for Microsoft 365 as limited to Microsoft 365 route filters for both of those features.
- There are other optional endpoints for Microsoft 365 Apps for enterprise that aren't listed and aren't required for users to launch Microsoft 365 Apps for enterprise applications and edit documents. Optional endpoints are hosted in Microsoft data centers and don't process, transmit, or store customer data. We recommend that user connections to these endpoints be directed to the default Internet egress perimeter.
- Media Processors for Microsoft Teams Meeting traffic in GCC High Gov cloud are located/routed in USGov Arizona and USGov Texas region datacenters only.
