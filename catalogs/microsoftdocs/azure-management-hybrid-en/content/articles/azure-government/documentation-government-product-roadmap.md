---
title: Azure Government product General Availability (GA) roadmap
description: Overview of Azure Government product General Availability (GA) by authorization level
ms.service: azure-government
ms.topic: article
ms.author: russellkirk
author: krussell09
recommendations: false
ms.date: 10/04/2026
---
# Microsoft Azure Government Product General Availability(GA) Roadmap

This article provides a General Availability (GA) roadmap for current and upcoming Microsoft products across Azure Government cloud environments.

Microsoft Azure for U.S. Government offers two distinct cloud environments:

- **Azure Government**: A dedicated cloud for U.S. government agencies and their partners, authorized under *FedRAMP High* and compliant with *Department of Defense (DoD) Impact Levels 4 and 5* requirements.

- **Azure Government Secret**: An air-gapped environment designed exclusively for U.S. agencies and cleared partners working with Secret-level classified data. This environment is fully isolated from public networks with strict access controls and meets *DoD Impact Level 6* requirements.

Both environments are built on the same foundational principles and architecture as Azure commercial clouds while meeting rigorous security and compliance requirements in accordance with multiple regulatory standards, including *FedRAMP High* and the *Department of Defense Security Requirements Guide (DoD SRG)*.

For comprehensive information about compliance in Azure Government clouds, see [Azure Government Compliance](https://learn.microsoft.com/azure/azure-government/documentation-government-plan-compliance).

## Legend

| GA Status | Description |
| --- | --- |
| GA | Currently GA and authorized. |
| Awaiting review | GA and authorization is submitted. |
| Forecasted | GA date is set. |
| Planned | GA is in progress, but no date is set. |
| n/a | GA is neither in progress nor planned. |

>**Note:**
>In the Product General Availability roadmap table, colons (:) indicate hierarchical relationships between services and their components. For example, *App Service : App Service Premium v3 : Windows Containers* refers to a specialized component within the App Service Premium v3 tier.


## Product General Availability Roadmap

| Product | FedRAMP High | DoD IL4 | DoD IL5 | DoD IL6 (Azure Secret) |
| :--- | :---: | :---: | :---: | :---: |
| AI builder | GA | GA | Planned | n/a |
| API Management | GA | GA | GA | GA |
| App Service | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Environments | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Environments : App Service Environments v3 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Free | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Free : Web App | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Linux : App Service Linux | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Premium v3 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;App Service Premium v3 : Windows Containers | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Web App for Containers : Web App for Containers | GA | GA | GA | GA |
| Application Gateway | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Application Gateway v2 | GA | GA | GA | GA |
| Automation | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Change Tracking | GA | GA | GA | GA |
| Azure Advisor | GA | GA | GA | GA |
| Azure AI Search | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AI Enrichment | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semantic Ranker | GA | GA | GA | GA |
| Azure Analysis Services | GA | GA | GA | n/a |
| Azure App Configuration | GA | GA | GA | GA |
| Azure Arc enabled Kubernetes | GA | GA | GA | Forecasted |
| Azure Arc Enabled Servers | GA | GA | GA | Planned |
| Azure Arc-Enabled SQL Server | GA | Planned | Planned | Forecasted |
| Azure Automanage Machine Configuration | GA | GA | GA | Planned |
| Azure Bastion | GA | GA | GA | GA |
| Azure Bot Service | GA | GA | Planned | n/a |
| Azure Cloud HSM | Planned | Forecasted | Forecasted | Forecasted |
| Azure Cosmos DB | GA | GA | GA | GA |
| Azure Data Box | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data Box | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data Box 120 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data Box 525 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data Box Disk | GA | GA | GA | n/a |
| Azure Data Explorer | GA | GA | GA | GA |
| Azure Data Share | GA | GA | GA | n/a |
| Azure Data Transfer | Planned | Forecasted | Forecasted | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Batch Transfer : Commercial to USSec - Batch Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Batch Transfer : Fairfax to USSec - Batch Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Batch Transfer : Intra Domain USSec - Batch Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messaging Transfer : Commercial to USSec - Messaging Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messaging Transfer : Fairfax to USSec - Messaging Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messaging Transfer : Intra Domain USSec - Messaging Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Messaging Transfer : USSec to Fairfax - Messaging Transfer | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Streaming Transfer : Fairfax to USSec - Streaming Transfer | n/a | n/a | n/a | GA |
| Azure Database for MySQL | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Database for MySQL - Flexible Server | GA | GA | GA | n/a |
| Azure Database for PostgreSQL | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Database for PostgreSQL - Flexible Server | GA | GA | GA | GA |
| Azure Database Migration Service | GA | GA | GA | GA |
| Azure Databricks | GA | GA | GA | n/a |
| Azure DDoS Protection | GA | GA | GA | Awaiting Review |
| Azure Dedicated HSM | GA | GA | GA | n/a |
| Azure DevTest Labs | GA | GA | GA | n/a |
| Azure DNS | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure DNS Private Resolver | GA | Forecasted | Forecasted | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure DNS Private Zones | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure DNS Public Zones | GA | GA | GA | Planned |
| Azure Enclave | Forecasted | Forecasted | Forecasted | Forecasted |
| Azure Files | GA | Forecasted | Forecasted | GA |
| Azure Firewall | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Firewall Premium | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Firewall Standard | GA | GA | GA | GA |
| Azure Firewall Manager | GA | GA | GA | Awaiting Review |
| Azure Front Door | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Front Door Premium | GA | GA | GA | Planned |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Front Door Standard | GA | GA | GA | Planned |
| Azure Grafana Service | GA | Awaiting Review | Planned | Forecasted |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure API for FHIR | GA | GA | GA | n/a |
| Azure Information Protection | GA | GA | GA | GA |
| Azure Kubernetes Service (AKS) | GA | GA | GA | GA |
| Azure Lighthouse | GA | GA | GA | GA |
| Azure Load Balancer | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Standard | GA | GA | GA | GA |
| Azure Local | GA | GA | GA | n/a |
| Azure Managed Applications | GA | GA | GA | n/a |
| Azure Maps | GA | GA | GA | n/a |
| Azure Migrate | GA | GA | GA | Awaiting Review |
| Azure Monitor | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Application Insights | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : Action Groups | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : Activity Log | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : Alerts | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : AutoScale | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : Diagnostic Logs | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Essentials : Metrics | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Monitor Managed Service for Prometheus | GA | GA | GA | Forecasted |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log Analytics | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log Analytics : Container Insights | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Log Analytics : Service Map and VM Insights | GA | GA | GA | GA |
| Azure NetApp Files | GA | GA | GA | n/a |
| Azure Policy | GA | GA | GA | GA |
| Azure Private Link | GA | GA | GA | GA |
| Azure Red Hat OpenShift (ARO) | GA | GA | Awaiting Review | n/a |
| Azure Resource Bridge | Planned | Forecasted | Forecasted | Forecasted |
| Azure Resource Graph | GA | GA | GA | GA |
| Azure Resource Manager | GA | GA | GA | GA |
| Azure Route Server | GA | GA | GA | Forecasted |
| Azure Service Manager (RDFE) | GA | GA | GA | GA |
| Azure SignalR Service | GA | GA | GA | GA |
| Azure Signup Portal | GA | GA | GA | n/a |
| Azure SQL Database | GA | GA | GA | GA |
| Azure SQL Managed Instance | GA | GA | GA | Awaiting Review |
| Azure Stack | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Stack Hub Ruggedized | Forecasted | GA | Forecasted | GA |
| Azure Stack Edge | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Data Box Gateway | GA | GA | Forecasted | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Stack Edge | Forecasted | GA | Forecasted | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Stack Edge Pro 2 | Forecasted | GA | Forecasted | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Stack Edge Ruggedized | Forecasted | GA | Forecasted | Planned |
| Azure Storage Mover | Forecasted | Forecasted | Forecasted | Forecasted |
| Azure Stream Analytics | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stream Analytics Dedicated | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Stream Analytics Jobs | GA | GA | GA | Awaiting Review |
| Azure Synapse Analytics | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default : Workspace | GA | GA | GA | GA |
| Azure Update Manager | GA | Awaiting Review | Awaiting Review | Forecasted |
| Azure Virtual Desktop | GA | GA | GA | GA |
| Azure VM Image Builder | n/a | n/a | n/a | Planned |
| Azure VMware Solution | GA | GA | GA | n/a |
| Azure Web Application Firewall | GA | GA | GA | Planned |
| Backup | GA | GA | GA | GA |
| Bandwidth | GA | GA | GA | GA |
| Batch | GA | GA | GA | GA |
| Chat for Dynamics 365 | GA | GA | Planned | n/a |
| Cloud Services | GA | GA | GA | GA |
| Cloud Shell | GA | GA | GA | GA |
| Container Instances | GA | GA | GA | GA |
| Container Registry | GA | GA | GA | GA |
| Content Delivery Network | GA | GA | GA | GA |
| Cost Management | GA | GA | GA | Forecasted |
| Customer Lockbox for Microsoft Azure | GA | GA | GA | Awaiting Review |
| Data Factory | GA | GA | GA | GA |
| Dataverse | GA | GA | GA | GA |
| Dynamics 365 Contact Center | GA | Awaiting Review | Planned | n/a |
| Dynamics 365 Customer Insights | GA | GA | Forecasted | n/a |
| Dynamics 365 Customer Service | GA | GA | Planned | n/a |
| Dynamics 365 Customer Voice | GA | GA | Forecasted | n/a |
| Dynamics 365 Field Service | GA | GA | Planned | n/a |
| Dynamics 365 Finance | GA | GA | Planned | n/a |
| Dynamics 365 Project Operations | GA | Awaiting Review | Awaiting Review | n/a |
| Dynamics 365 Sales | GA | GA | GA | n/a |
| Dynamics 365 Supply Chain Management | GA | GA | Planned | n/a |
| Event Grid | GA | GA | GA | GA |
| Event Hubs | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Event Hubs Premium SKU | GA | GA | GA | n/a |
| ExpressRoute | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ExpressRoute Gateways | GA | GA | GA | GA |
| Functions | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consumption Plan | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consumption Plan Linux | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dedicated Plan | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dedicated Plan Linux | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium Plan | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium Plan Linux | GA | GA | GA | GA |
| GitHub - GHAE | Forecasted | Forecasted | Forecasted | n/a |
| HDInsight | GA | GA | GA | n/a |
| IoT Hub | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IoT Hub Device Provisioning Service | GA | GA | GA | n/a |
| IP Services | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Public IP Address Basic | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Public IP Address Standard | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Public IP Prefix | GA | GA | GA | GA |
| Key Vault | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Key Vault Managed HSM | GA | GA | GA | Forecasted |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium | GA | GA | GA | GA |
| Logic Apps (Consumption) | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Logic Apps Standard | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logic Apps Integration Service Environment | GA | GA | GA | n/a |
| Media Services | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Video Indexer | GA | GA | GA | n/a |
| Microsoft 365 Defender | GA | GA | GA | GA |
| Microsoft Azure Attestation | n/a | n/a | n/a | Awaiting Review |
| Microsoft Azure Portal | GA | GA | GA | GA |
| Microsoft Copilot Studio | GA | GA | Awaiting Review | n/a |
| Microsoft Defender for Cloud | GA | GA | GA | GA |
| Microsoft Defender for Cloud Apps | GA | GA | GA | n/a |
| Microsoft Defender for Endpoint | GA | GA | GA | GA |
| Microsoft Defender for Identity | GA | GA | GA | GA |
| Microsoft Defender for IoT | GA | GA | GA | n/a |
| Microsoft Entra Domain Services | GA | GA | GA | Awaiting Review |
| Microsoft Entra ID | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Multifactor Authentication : Multifactor Authentication | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium P1 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium P2 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Workload Identities | GA | GA | GA | GA |
| Microsoft Fabric | Forecasted | Forecasted | Forecasted | n/a |
| Microsoft Foundry | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Custom Vision | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Document Intelligence | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Language | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Machine Learning | GA | GA | GA | Forecasted |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Speech | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Translator | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Vision | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Vision - Face | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content Safety | GA | GA | GA | Planned |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Foundry Agent Service | Forecasted | Forecasted | Forecasted | Forecasted |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Foundry Models | GA | GA | GA | Forecasted |
| Microsoft Graph | GA | GA | GA | GA |
| Microsoft Planetary Computer Pro | GA | Forecasted | Forecasted | Forecasted |
| Microsoft Purview Compliance | Forecasted | Forecasted | Forecasted | n/a |
| Microsoft Secure Score | GA | GA | Awaiting Review | n/a |
| Microsoft Sentinel | GA | GA | GA | GA |
| Microsoft Stream | Forecasted | GA | GA | Forecasted |
| Network Watcher | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Analytics | GA | GA | GA | GA |
| Nomination Portal | GA | GA | Planned | n/a |
| Notification Hubs | GA | GA | GA | n/a |
| Planned Maintenance | GA | GA | GA | Planned |
| Power Apps Basic | Forecasted | Forecasted | Forecasted | Forecasted |
| Power Apps Premium | GA | GA | Planned | GA |
| Power Automate Basic | Forecasted | Forecasted | Forecasted | Forecasted |
| Power Automate Premium | GA | GA | Planned | GA |
| Power BI | GA | GA | GA | GA |
| Power BI Embedded | GA | GA | GA | Planned |
| Power Pages | GA | GA | Planned | n/a |
| Quota+ Usage blade | GA | GA | GA | Planned |
| Redis Cache | GA | GA | GA | GA |
| Resource Move | GA | GA | GA | n/a |
| Service Bus | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium | GA | GA | GA | GA |
| Service Fabric | GA | GA | GA | GA |
| Site Recovery | GA | GA | GA | Awaiting Review |
| SQL Server on Azure Virtual Machines | GA | Planned | Forecasted | Awaiting Review |
| Storage | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Archive Storage | GA | GA | GA | Awaiting Review |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Data Lake Storage Gen2 | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Data Lake Storage Gen2 : Premium tier for Azure Data Lake Storage | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure File Sync | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Premium Files | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Storage Reservations | GA | GA | GA | n/a |
| Storage : Blobs (incl. Azure Data Lake Storage Gen2) | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disk Storage | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hot/Cool/Cold Blob Storage Tiers | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hot/Cool/Cold Blob Storage Tiers : SSH Transfer Protocol | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Import/Export | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Managed Disks | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Managed Disks : Shared Disk | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium Block Blobs | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium Page Blob | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Premium SSD v2 | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Queues | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Standard Page Blob | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tables | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ultra Disk Storage | GA | GA | GA | n/a |
| Traffic Manager | GA | GA | GA | GA |
| Virtual Machine Scale Sets | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flexible Orchestration Mode : Virtual Machine Scale Sets with Flexible Orchestration Mode | GA | GA | GA | GA |
| Virtual Machines | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Av2-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Compute Gallery : Shared Image Gallery | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Dedicated Host | GA | Forecasted | Forecasted | Planned |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Azure Disk Encryption : Azure Disk Encryption | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D*v4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DCadsv6-series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DCasv6-series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ddsv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ddsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ddv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DDv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dldsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dlsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DSv2-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DSv3-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dsv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dv2-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dv3-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E*v4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ebdsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ebsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ECadsv6-series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ECasv6-series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edsv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Edv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eidsv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ESv3-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Esv4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Esv5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ev3-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ev4-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ev5-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;F-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FS-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FSv2-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HBv2-Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HCv1-Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instance Level IPs | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LSv2-Series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mdsv2 Medium Memory Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M-Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Msv2 Medium Memory Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NCv3-Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NDs H200 v5-Series | n/a | n/a | n/a | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NVadsA10_v5-series | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NVv3-Series | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reserved IP | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Serial Console | GA | GA | GA | Planned |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Spot Virtual Machines : Spot Virtual Machines | GA | GA | GA | n/a |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trusted Launch : Trusted Launch | GA | GA | GA | GA |
| Virtual Network | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Global Vnet Peering | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Virtual Network Peering | GA | GA | GA | GA |
| Virtual Network NAT | GA | GA | GA | Awaiting Review |
| Virtual WAN | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ExpressRoute | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Point-to-Site VPN Gateway | GA | GA | GA | GA |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Site-to-Site VPN Gateway | GA | GA | GA | GA |
| VPN Gateway | GA | GA | GA | GA |
| WSUS as a Service | n/a | n/a | n/a | Planned |

## Related content

- [Azure Government overview](documentation-government-welcome.md)
- [Azure Government compliance](documentation-government-plan-compliance.md)
- [Azure and other Microsoft services compliance offerings](https://learn.microsoft.com/azure/compliance/offerings/)
- [Compare Azure Government and global Azure](compare-azure-government-global-azure.md)
- [Azure guidance for secure isolation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/azure-secure-isolation-guidance.md)
- [Azure Government isolation guidelines for Impact Level 5 workloads](documentation-government-impact-level-5.md)
- [Azure Government DoD overview](documentation-government-overview-dod.md)
- [Azure security fundamentals documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/index.yml)
- [Azure Policy regulatory compliance built-in initiatives](https://learn.microsoft.com/azure/governance/policy/samples/index#regulatory-compliance)
