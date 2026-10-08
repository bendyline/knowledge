---
title: Cloud feature availability for US Government customers
description: Learn where security features are available across Azure, Azure Government, and Microsoft 365 Government environments.
author: msmbaldwin
ms.author: mbaldwin
ms.service: security
ms.subservice: security-fundamentals
ms.topic: feature-availability
ms.date: 01/08/2026
ai-usage: ai-assisted
---

# Cloud feature availability for US Government customers

This article describes feature availability in the Microsoft Azure and Azure Government clouds. Features are listed as **GA** (Generally Available), **Public Preview**, or **Not Available**. The tables in this article are updated regularly to reflect the current state of feature availability.

## Azure Government

Azure Government uses the same underlying technologies as Azure (sometimes referred to as Azure Commercial or Azure Public), which includes the core components of Infrastructure-as-a-Service (IaaS), Platform-as-a-Service (PaaS), and Software-as-a-Service (SaaS). Both Azure and Azure Government have comprehensive security controls in place and include Microsoft's commitment to safeguarding customer data.

Azure Government is a physically isolated cloud environment dedicated to US federal, state, local, and tribal governments, and their partners. Whereas both cloud environments are assessed and authorized at the FedRAMP High impact level, Azure Government provides an extra layer of protection to customers through contractual commitments regarding storage of customer data in the United States and limiting potential access to systems processing customer data to screened US persons. These commitments might interest customers who use the cloud to store or process data subject to US export control regulations such as the EAR, ITAR, and DoE 10 CFR Part 810.

For more information about Azure Government, see [What is Azure Government?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md)

> **Note:**
> These lists and tables don't include feature or bundle availability in the Azure Government Secret or Azure Government Top Secret clouds.
> For more information about specific availability for air-gapped clouds, contact your account team.

## Microsoft 365 integration

Integrations between products rely on interoperability between Azure and Office platforms. Offerings hosted in the Azure environment are accessible from the Microsoft 365 Enterprise and Microsoft 365 Government platforms. Office 365 and Office 365 GCC are paired with Microsoft Entra ID in Azure. Office 365 GCC High and Office 365 DoD are paired with Microsoft Entra ID in Azure Government.

The following diagram displays the hierarchy of Microsoft clouds and how they relate to each other.

Microsoft 365 cloud integration.

The Office 365 GCC environment helps customers comply with US government requirements, including FedRAMP High, CJIS, and IRS 1075. The Office 365 GCC High and DoD environments support customers who need compliance with DoD IL4/5, DFARS 7012, NIST 800-171, and ITAR.

For more information about Office 365 US Government environments, see:

- [Office 365 GCC](https://learn.microsoft.com/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/gcc)
- [Office 365 GCC High and DoD](https://learn.microsoft.com/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/gcc-high-and-dod)

The following sections identify when a service has an integration with Microsoft 365 and the feature availability for Office 365 GCC, Office 365 GCC High, and Office 365 DoD.

## Azure Information Protection

Azure Information Protection (AIP) is a cloud-based solution that enables organizations to discover, classify, and protect documents and emails by applying labels to content.

AIP is part of the Microsoft Purview Information Protection (MIP) solution, and extends the [labeling](https://learn.microsoft.com/microsoft-365/compliance/sensitivity-labels) and [classification](https://learn.microsoft.com/microsoft-365/compliance/data-classification-overview) functionality provided by Microsoft 365.

For more information, see the [Azure Information Protection product documentation](https://learn.microsoft.com/azure/information-protection/).

- Office 365 GCC pairs with Microsoft Entra ID in Azure. Office 365 GCC High and Office 365 DoD pair with Microsoft Entra ID in Azure Government. Pay attention to the Azure environment to understand where [interoperability is possible](#microsoft-365-integration). In the following table, interoperability that isn't possible is marked with a dash (-) to indicate that support isn't relevant.

- GCC High and DoD customers require extra configurations. For more information, see [Azure Information Protection Premium Government Service Description](https://learn.microsoft.com/enterprise-mobility-security/solutions/ems-aip-premium-govt-service-description).

> **Note:**
> More details about support for government customers are listed in footnotes below the table.
>
> Extra steps are required for configuring Azure Information Protection for GCC High and DoD customers. For more information, see the [Azure Information Protection Premium Government Service Description](https://learn.microsoft.com/enterprise-mobility-security/solutions/ems-aip-premium-govt-service-description).
>

| Feature or service | Azure | Azure Government |
| --- | --- | --- |
| **[Azure Information Protection scanner](https://learn.microsoft.com/azure/information-protection/deploy-aip-scanner)** <sup>[1](#aipnote1)</sup> |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **Administration** |  |  |
| [Azure Information Protection portal for scanner administration](https://learn.microsoft.com/azure/information-protection/deploy-aip-scanner-configure-install?tabs=azure-portal-only) |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **Classification and labeling** <sup>[2](#aipnote2)</sup> |  |  |
| [AIP scanner to apply a *default label* to all files in an on-premises file server or repository](https://learn.microsoft.com/azure/information-protection/deploy-aip-scanner-configure-install?tabs=azure-portal-only) |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| [AIP scanner for automated classification, labeling, and protection of supported on-premises files](https://learn.microsoft.com/azure/information-protection/deploy-aip-scanner) |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
|  |  |  |

<sup><a name="aipnote1"></a>1</sup> The scanner can function without Office 365 to scan files only. The scanner can't apply labels to files without Office 365.

<sup><a name="aipnote2"></a>2</sup> The classification and labeling add-in supports only government customers with Microsoft 365 Apps (version 9126.1001 or higher), including Professional Plus (ProPlus) and Click-to-Run (C2R) versions. Office 2010, Office 2013, and other Office 2016 versions aren't supported.

### Office 365 features

| Feature or service | Office 365 GCC | Office 365 GCC High | Office 365 DoD |
| --- | --- | --- | --- |
| **Administration** |  |  |  |
| - [PowerShell for RMS service administration](https://learn.microsoft.com/powershell/module/aipservice/) | GA | GA | GA |
| - [PowerShell for AIP UL client bulk operations](https://learn.microsoft.com/powershell/azure/aip/overview) |  |  |  |
| **SDK** |  |  |  |
| - [MIP and AIP Software Development Kit (SDK)](https://learn.microsoft.com/information-protection/develop/) | GA | GA | GA |
| **Customizations** |  |  |  |
| - [Document tracking and revocation](https://learn.microsoft.com/azure/information-protection/rms-client/track-and-revoke-admin) | GA | Not available | Not available |
| **Key management** |  |  |  |
| - [Bring Your Own Key (BYOK)](https://learn.microsoft.com/azure/information-protection/byok-price-restrictions) | GA | GA | GA |
| - [Double Key Encryption (DKE)](https://learn.microsoft.com/azure/information-protection/plan-implement-tenant-key) | GA | GA | GA |
| **Office files** <sup>[3](#aipnote6)</sup> |  |  |  |
| - [Protection for Microsoft Exchange Online, Microsoft SharePoint Online, and Microsoft OneDrive for Business](https://learn.microsoft.com/azure/information-protection/requirements-applications) | GA | GA <sup>[4](#aipnote3)</sup> | GA <sup>[4](#aipnote3)</sup> |
| - [Protection for on-premises Exchange and SharePoint content via the Rights Management connector](https://learn.microsoft.com/azure/information-protection/deploy-rms-connector) | GA <sup>[5](#aipnote5)</sup> | GA <sup>[6](#aipnote6)</sup> | GA <sup>[6](#aipnote6)</sup> |
| - [Office 365 Message Encryption](https://learn.microsoft.com/microsoft-365/compliance/set-up-new-message-encryption-capabilities) | GA | GA | GA |
| - [Set labels to automatically apply pre-configured M/MIME protection in Outlook](https://learn.microsoft.com/azure/information-protection/rms-client/clientv2-admin-guide-customizations) | GA | GA | GA |
| - [Control oversharing of information when using Outlook](https://learn.microsoft.com/azure/information-protection/rms-client/clientv2-admin-guide-customizations) | GA | GA <sup>[7](#aipnote7)</sup> | GA <sup>[7](#aipnote7)</sup> |
| **Classification and labeling** <sup>[2](#aipnote2) / [8](#aipnote8)</sup> |  |  |  |
| - Custom templates, including departmental templates | GA | GA | GA |
| - Manual, default, and mandatory document classification | GA | GA | GA |
| - Configure conditions for automatic and recommended classification | GA | GA | GA |
| - [Protection for non-Microsoft Office file formats, including PTXT, PJPG, and PFILE (generic protection)](https://learn.microsoft.com/purview/information-protection-client#supported-file-types) | GA | GA | GA |
|  |  |  |  |

<sup><a name="aipnote3"></a>3</sup> The Mobile Device Extension for AD RMS isn't currently available for government customers.

<sup><a name="aipnote4"></a>4</sup> Information Rights Management with SharePoint Online (IRM-protected sites and libraries) is currently not available.

<sup><a name="aipnote5"></a>5</sup> Information Rights Management (IRM) supports only Microsoft 365 Apps (version 9126.1001 or higher), including Professional Plus (ProPlus) and Click-to-Run (C2R) versions. Office 2010, Office 2013, and other Office 2016 versions aren't supported.

<sup><a name="aipnote6"></a>6</sup> Only on-premises Exchange is supported. Outlook Protection Rules aren't supported. File Classification Infrastructure isn't supported. On-premises SharePoint isn't supported.

<sup><a name="aipnote7"></a>7</sup> Sharing of protected documents and emails from government clouds to users in the commercial cloud isn't currently available. Includes Microsoft 365 Apps users in the commercial cloud, non-Microsoft 365 Apps users in the commercial cloud, and users with an RMS for Individuals license.

<sup><a name="aipnote8"></a>8</sup> The number of [Sensitive Information Types](https://learn.microsoft.com/microsoft-365/compliance/sensitive-information-type-entity-definitions) in your Microsoft Purview compliance portal might vary based on region.


## Microsoft Defender for Cloud

Microsoft Defender for Cloud is a unified infrastructure security management system that strengthens the security posture of your data centers, and provides advanced threat protection across your hybrid workloads in the cloud - whether they're in Azure or not - as well as on premises.

For more information, see the [Microsoft Defender for Cloud product documentation](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction).

The following table displays the current Defender for Cloud feature availability in Azure and Azure Government.

| Feature or service | Azure | Azure Government |
| --- | --- | --- |
| **Microsoft Defender for Cloud free features** |  |  |
| - [Continuous export](https://learn.microsoft.com/azure/defender-for-cloud/continuous-export) | GA | GA |
| - [Workflow automation](https://learn.microsoft.com/azure/defender-for-cloud/workflow-automation) | GA | GA |
| - [Recommendation exemption rules](https://learn.microsoft.com/azure/defender-for-cloud/exempt-resource) | Public Preview | Not Available |
| - [Alert suppression rules](https://learn.microsoft.com/azure/defender-for-cloud/alerts-suppression-rules) | GA | GA |
| - [Email notifications for security alerts](https://learn.microsoft.com/azure/defender-for-cloud/configure-email-notifications) | GA | GA |
| - [Auto provisioning for agents and extensions](https://learn.microsoft.com/azure/defender-for-cloud/monitoring-components) | GA | GA |
| - [Asset inventory](https://learn.microsoft.com/azure/defender-for-cloud/asset-inventory) | GA | GA |
| - [Azure Monitor Workbooks reports in Microsoft Defender for Cloud's workbooks gallery](https://learn.microsoft.com/azure/defender-for-cloud/custom-dashboards-azure-workbooks) | GA | GA |
| **Microsoft Defender plans and extensions** |  |  |
| - [Microsoft Defender for servers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-servers-introduction) | GA | GA |
| - [Microsoft Defender for AI Services](https://learn.microsoft.com/azure/defender-for-cloud/ai-threat-protection) | GA | Not Available |
| - [Microsoft Defender for App Service](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-app-service-introduction) | GA | Not Available |
| - [Microsoft Defender for DNS](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-dns-introduction) | GA | GA |
| - [Microsoft Defender for Containers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-containers-introduction) | GA | GA |
| - [Microsoft Defender for Azure SQL database servers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-introduction) | GA | GA |
| - [Microsoft Defender for SQL servers on machines](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-introduction) | GA | GA |
| - [Microsoft Defender for open-source relational databases](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-databases-introduction) | GA | GA |
| - [Microsoft Defender for Key Vault](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-key-vault-introduction) | GA | GA |
| - [Microsoft Defender for Resource Manager](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-resource-manager-introduction) | GA | GA |
| - [Microsoft Defender for Storage](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-storage-introduction) <sup>[1](#footnote1)</sup> | GA | GA |
| - [Microsoft Defender for Azure Cosmos DB](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-databases-enable-cosmos-protections) | GA | GA |
| - [Kubernetes workload protection](https://learn.microsoft.com/azure/defender-for-cloud/kubernetes-workload-protections) | GA | GA |
| - [Bi-directional alert synchronization with Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/connect-azure-security-center) | GA | GA |
| **Microsoft Defender for servers features** <sup>[2](#footnote2)</sup> |  |  |
| - [Just-in-time VM access](https://learn.microsoft.com/azure/defender-for-cloud/just-in-time-access-overview) | GA | GA |
| - [File integrity monitoring](https://learn.microsoft.com/azure/defender-for-cloud/file-integrity-monitoring-overview) | GA | GA <sup>[3](#footnote3)</sup> |
| - [Adaptive application controls](https://learn.microsoft.com/azure/defender-for-cloud/adaptive-application-controls) | GA | GA |
| - [Adaptive network hardening](https://learn.microsoft.com/azure/defender-for-cloud/adaptive-network-hardening) | GA | Not Available |
| - [Docker host hardening](https://learn.microsoft.com/azure/defender-for-cloud/harden-docker-hosts) | GA | GA |
| - [Integrated vulnerability assessment for machines](https://learn.microsoft.com/azure/defender-for-cloud/deploy-vulnerability-assessment-vm) | GA | Not Available |
| - [Regulatory compliance dashboard and reports](https://learn.microsoft.com/azure/defender-for-cloud/regulatory-compliance-dashboard) <sup>[4](#footnote4)</sup> | GA | GA |
| - [Microsoft Defender for Endpoint deployment and integrated license](https://learn.microsoft.com/azure/defender-for-cloud/integration-defender-for-endpoint) | GA | GA |
| - [Connect AWS account](https://learn.microsoft.com/azure/defender-for-cloud/quickstart-onboard-aws) | GA | Not Available |
| - [Connect GCP account](https://learn.microsoft.com/azure/defender-for-cloud/quickstart-onboard-gcp) | GA | Not Available |
|  |  |  |

<sup><a name="footnote1"></a>1</sup> Azure DNS Zone isn't supported for malware scanning and sensitive data threat detection.

<sup><a name="footnote2"></a>2</sup> These features all require [Microsoft Defender for servers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-servers-introduction).

<sup><a name="footnote3"></a>3</sup> GovCon Cloud Moderate (GCCM) doesn't support File Integrity Monitoring.

<sup><a name="footnote4"></a>4</sup> Differences might exist in the standards offered by cloud type.

<a name="azure-sentinel"></a>

## Microsoft Sentinel

Microsoft Sentinel is a scalable, cloud-native, security information event management (SIEM), and security orchestration automated response (SOAR) solution. Microsoft Sentinel delivers intelligent security analytics and threat intelligence across the enterprise, providing a single solution for alert detection, threat visibility, proactive hunting, and threat response.

For more information, see the [Microsoft Sentinel product documentation](https://learn.microsoft.com/azure/sentinel/overview).

For Microsoft Sentinel feature availability in Azure, Azure Government, and Azure China 21 Vianet, see [Microsoft Sentinel feature support for Azure clouds](https://learn.microsoft.com/azure/sentinel/feature-availability).

### Microsoft Purview Data Connectors

Office 365 GCC is paired with Microsoft Entra ID in Azure. Office 365 GCC High and Office 365 DoD are paired with Microsoft Entra ID in Azure Government.

> **Tip:**
> Pay attention to the Azure environment to understand where [interoperability is possible](#microsoft-365-integration). In the following table, interoperability that isn't possible is marked with a dash (-) to indicate that support isn't relevant.
>

| Connector | Azure | Azure Government |
| --- | --- | --- |
| **[Office IRM](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-365-insider-risk-management)** |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Not Available |
| **[Dynamics 365](https://learn.microsoft.com/azure/sentinel/data-connectors-reference)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **[Microsoft Defender XDR](https://learn.microsoft.com/azure/sentinel/connect-microsoft-365-defender)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | Not Available |
| **[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-cloud-apps)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-cloud-apps)** <br>Shadow IT logs |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Public Preview |
| **[Microsoft Defender for Cloud Apps](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-cloud-apps)**                  <br>Alerts |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Public Preview |
| **[Microsoft Defender for Endpoint](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-endpoint)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **[Microsoft Defender for Identity](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-identity)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **[Microsoft Defender for Office 365](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-defender-for-office-365-preview)** |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Not Available |
| - **[Microsoft Power BI](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-powerbi)** |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Not Available |
| - **[Microsoft Project](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-project)** |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Public Preview |
| - Office 365 DoD | - | Not Available |
| **[Office 365](https://learn.microsoft.com/azure/sentinel/data-connectors-reference#microsoft-365-formerly-office-365)** |  |  |
| - Office 365 GCC | GA | - |
| - Office 365 GCC High | - | GA |
| - Office 365 DoD | - | GA |
| **[Teams](https://azuremarketplace.microsoft.com/marketplace/apps/sentinel4teams.sentinelforteams?tab=Overview)** |  |  |
| - Office 365 GCC | Public Preview | - |
| - Office 365 GCC High | - | Not Available |
| - Office 365 DoD | - | Not Available |
|  |  |  |

<a name="azure-defender-for-iot"></a>

## Microsoft Defender for IoT

Microsoft Defender for IoT helps you accelerate IoT/OT innovation with comprehensive security across all your IoT/OT devices. For end-user organizations, Microsoft Defender for IoT offers agentless, network-layer security that deploys rapidly, works with diverse industrial equipment, and interoperates with Microsoft Sentinel and other SOC tools. Deploy on-premises or in Azure-connected environments. For IoT device builders, the Microsoft Defender for IoT security agents allow you to build security directly into your new IoT devices and Azure IoT projects. The micro agent has flexible deployment options, including the ability to deploy as a binary package or modify source code. The micro agent is available for standard IoT operating systems like Linux and Eclipse ThreadX. For more information, see the [Microsoft Defender for IoT product documentation](https://learn.microsoft.com/azure/defender-for-iot/).

The following table displays the current Microsoft Defender for IoT feature availability in Azure, and Azure Government.

### For organizations

| Feature | Azure | Azure Government |
| --- | --- | --- |
| [On-premises device discovery and inventory](https://learn.microsoft.com/azure/defender-for-iot/how-to-investigate-all-enterprise-sensor-detections-in-a-device-inventory) | GA | GA |
| [Vulnerability management](https://learn.microsoft.com/azure/defender-for-iot/how-to-create-risk-assessment-reports) | GA | GA |
| [Threat detection with IoT, and OT behavioral analytics](https://learn.microsoft.com/azure/defender-for-iot/how-to-work-with-alerts-on-your-sensor) | GA | GA |
| [Manual and automatic threat intelligence updates](https://learn.microsoft.com/azure/defender-for-iot/how-to-work-with-threat-intelligence-packages) | GA | GA |
| **Unify IT and OT security with SIEM, SOAR, and XDR** |  |  |
| [Active Directory](https://learn.microsoft.com/azure/defender-for-iot/organizations/integrate-with-active-directory) | GA | GA |
| [ArcSight](https://learn.microsoft.com/azure/defender-for-iot/organizations/integrate-overview#micro-focus-arcsight) | GA | GA |
| [ClearPass (Alerts and Inventory)](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-clearpass) | GA | GA |
| [CyberArk PSM](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-cyberark) | GA | GA |
| [Email](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#email-address-action) | GA | GA |
| [FortiGate](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-fortinet) | GA | GA |
| [FortiSIEM](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-fortinet) | GA | GA |
| [Microsoft Sentinel](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-configure-with-sentinel) | GA | GA |
| [NetWitness](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#netwitness-action) | GA | GA |
| [Palo Alto NGFW](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-palo-alto) | GA | GA |
| [Palo Alto Panorama](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-palo-alto) | GA | GA |
| [ServiceNow (Alerts and Inventory)](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-servicenow) | GA | GA |
| [SNMP MIB Monitoring](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-set-up-snmp-mib-monitoring) | GA | GA |
| [Splunk](https://learn.microsoft.com/azure/defender-for-iot/organizations/tutorial-splunk) | GA | GA |
| [SYSLOG Server (CEF format)](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#syslog-server-actions) | GA | GA |
| [SYSLOG Server (LEEF format)](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#syslog-server-actions) | GA | GA |
| [SYSLOG Server (Object)](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#syslog-server-actions) | GA | GA |
| [SYSLOG Server (Text Message)](https://learn.microsoft.com/azure/defender-for-iot/organizations/how-to-forward-alert-information-to-partners#syslog-server-actions) | GA | GA |

### For device builders

| Feature | Azure | Azure Government |
| --- | --- | --- |
| [Micro agent for Eclipse ThreadX](https://learn.microsoft.com/azure/defender-for-iot/device-builders/iot-security-threadx) | GA | GA |
| [Configure Sentinel with Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/how-to-configure-with-sentinel) | GA | GA |
| **Standalone micro agent for Linux** |  |  |
| [Standalone agent binary installation](https://learn.microsoft.com/azure/defender-for-iot/quickstart-standalone-agent-binary-installation) | Public Preview | Public Preview |

## Azure Attestation

Microsoft Azure Attestation is a unified solution for remotely verifying the trustworthiness of a platform and integrity of the binaries running inside it. The service receives evidence from the platform, validates it with security standards, evaluates it against configurable policies, and produces an attestation token for claims-based applications such as relying parties and auditing authorities.

Azure Attestation is currently available in multiple regions across Azure public and Government clouds.

For more information, see [Azure Attestation public documentation](https://learn.microsoft.com/azure/attestation/overview).

| Feature | Azure | Azure Government |
| --- | --- | --- |
| [Portal experience](https://learn.microsoft.com/azure/attestation/quickstart-portal) to perform control-plane and data-plane operations | GA | - |
| [PowerShell experience](https://learn.microsoft.com/azure/attestation/quickstart-powershell) to perform control-plane and data-plane operations | GA | GA |
| TLS 1.2 enforcement | GA | GA |
| BCDR support | GA | - |
| [Service tag integration](../../virtual-network/service-tags-overview.md) | GA | GA |
| [Immutable log storage](https://learn.microsoft.com/azure/attestation/view-logs) | GA | GA |
| Network isolation using private link | Public Preview | - |
| [FedRAMP High certification](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/compliance/azure-services-in-fedramp-auditscope.md) | GA | GA |
| Microsoft Purview Customer Lockbox | GA | - |

## Next steps

- Understand the [shared responsibility](shared-responsibility.md) model and which security tasks are handled by the cloud provider and which tasks are handled by you.
- Understand the [Azure Government Cloud](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/documentation-government-welcome.md) capabilities and the trustworthy design and security used to support compliance applicable to federal, state, and local government organizations and their partners.
- Understand the [Office 365 Government plan](https://learn.microsoft.com/office365/servicedescriptions/office-365-platform-service-description/office-365-us-government/office-365-us-government#about-office-365-government-environments).
- Understand [compliance in Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/compliance/index.yml) for legal and regulatory standards.
