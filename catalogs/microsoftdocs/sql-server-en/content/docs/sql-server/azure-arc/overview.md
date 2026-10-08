---
title: Overview
description: Feature overview. Explains how you can manage instances of SQL Server enabled by Azure Arc.
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest
ms.date: 05/19/2026
ai-usage: ai-assisted
ms.topic: concept-article
ms.custom: references_regions
---

# SQL Server enabled by Azure Arc


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 


 SQL Server 
 enabled by Azure Arc extends Azure services to SQL Server instances hosted outside of Azure: 

- In your data center
- In edge site locations like retail stores
- On any public cloud or hosting provider

Managing SQL Server through Azure Arc can also be configured for SQL Server VMs in Azure VMware Solution. See [Deploy Arc-enabled Azure VMware Solution](https://learn.microsoft.com/azure/azure-vmware/deploy-arc-for-azure-vmware-solution).

> **Important:**
> Feature availability varies in the US Virginia Government cloud. For government-specific supported features, limitations, and regional constraints, review [SQL Server enabled by Azure Arc in US Virginia Government](us-government-region.md).


## Manage your SQL Server instances at scale from a single point of control

Azure Arc enables you to manage all of your SQL Server instances from a single point of control: Azure. As you connect your SQL Server instances to Azure, you get a single place to view the detailed inventory of your SQL Server instances and databases.  

- Look at details for a given SQL Server in the Azure portal such as the name, version, edition, number of cores, and host operating system.
- Query across all of your SQL Server instances using Azure Resource Graph Explorer to answer questions like:
  - "How many SQL Server instances do I have that are SQL Server 2014?"
  - "What are the names of all the SQL Server instances that are running on Linux?"  
- Quickly create charts from these queries and pin them to customizable dashboards.
- View a list of every database on a SQL Server and do cross-SQL Server queries of databases to see:
  - Databases that haven't been backed up recently.
  - Databases that aren't encrypted.
- Execute custom T-SQL scripts across onboarded instances using Azure Arc-enabled servers Run Command to gather specific information like permissions, configurations, or compliance data, then aggregate results centrally for reporting and analysis.

## Example custom dashboard

Review an example of a custom dashboard in [GitHub microsoft/sql-server-samples](https://github.com/microsoft/sql-server-samples/blob/master/samples/features/azure-arc/dashboard/README.md).

A screenshot of a custom dashboard in the Azure portal.

## Best practices assessment

You can optimize the configuration of your SQL Server instances for best performance and security by running a best practices assessment. The assessment report shows you specific ways to improve your configuration. The assessment compares your configuration to best practices established by Microsoft Support through many years of real-world experience. Each suggestion includes the details on how to change the configuration.

## Microsoft Entra authentication


> **Note:**  
> [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/new-name) was previously known as Azure Active Directory (Azure AD).

Azure Arc enabled SQL Server instances can use Microsoft Entra ID for authentication. This feature brings a modern centralized identity and access management solution to SQL Server. This feature requires  SQL Server 2022 (16.x) 
 or later.

Microsoft Entra authentication provides greatly enhanced security over traditional username and password-based authentication, which is **not recommended**. For more information about the risks and challenges passwords pose, refer to ["What's the solution to the growing problem of passwords?"](https://news.microsoft.com/features/whats-solution-growing-problem-passwords-says-microsoft/).

Microsoft Entra authentication removes the need for self-managed secrets entirely when communicating with Azure resources, through managed identity authentication. For user-based authentication, Microsoft Entra ID supports enhanced security measures including multifactor authentication (MFA), single sign-on (SSO), and modern identity practices.

## Microsoft Defender for Cloud

Microsoft Defender for Cloud helps you discover and mitigate potential database vulnerabilities and alerts you to anomalous activities. These activities might indicate threats to your databases on SQL Server instances enabled for Azure Arc.

- Vulnerability assessment: Scan databases to discover, track, and remediate vulnerabilities.
- Threat protection: Receive detailed security alerts and recommended actions based on SQL Advanced Threat Protection to provide to mitigate threats.

When you enable Microsoft Defender through 
 SQL Server 
 enabled by Azure Arc, you can get substantial cost savings on Defender.

## Microsoft Purview

Microsoft Purview provides a unified data governance solution to help manage and govern your on-premises, multicloud, and software as a service (SaaS) data. Easily create a holistic, up-to-date map of your data landscape with automated data discovery, sensitive data classification, and end-to-end data lineage. Enable data consumers to access valuable, trustworthy data management.


 SQL Server 
 enabled by Azure Arc powers some of the Microsoft Purview features such as access policies and it generally makes it easier for you to get your SQL Server instances connected into Purview.

## Pay-as-you-go for SQL Server

Now, with 
 SQL Server 
 enabled by Azure Arc, you have the option of purchasing SQL Server using a 'pay-as-you-go' model instead of purchasing licenses. This model is a great alternative if you're looking to save costs on SQL Server instances that have variable demand for compute capacity over time. For example, when you can turn off a SQL Server at night or on weekends, or even just scale down the number of cores used during less busy times. It's also a great option if you only plan to use a SQL Server for a short period of time and then won't need it anymore. Pay-as-you-go, billed through Azure, is now available for all versions of SQL Server from 2012 to 2022.

> **Note:**
> On Linux, certain PAYG features aren't available, including automatic passive instance detection and connected user verification. All SQL Server instances on Linux are billed as active. For details, see [Manage licensing and billing](manage-license-billing.md).

## Extended Security Updates (ESU)

Once  SQL Server 
 has reached the end of its support lifecycle, you can sign up for an Extended Security Update (ESU) subscription for your servers and remain protected for up to three years. When you upgrade to a newer version of  SQL Server 
, your ESU subscription is automatically canceled. When you [migrate to Azure SQL](https://learn.microsoft.com/azure/azure-sql/migration-guides/), the ESU charges automatically stop but you continue to have access to the ESUs.

## Performance dashboards

Monitor SQL Server instances from Azure portal with performance dashboards. Performance dashboards simplify performance monitoring in Azure portal.

Screenshot of performance dashboard for SQL Server enabled by Azure Arc.

For details, see [Monitor SQL Server enabled by Azure Arc (preview)](sql-monitoring.md).

Organizations can also build custom KQL dashboards and alerts over custom tables populated through the Logs Ingestion API, such as centralized SQL permissions results, complementing the built-in performance and assessment experiences.

## Migration assessment


 SQL Server 
 enabled by Azure Arc migration assessment is a crucial tool for your cloud migration and modernization journey. It simplifies the discovery and readiness assessment for migration by providing:

- Cloud readiness analysis
- Identification of risks and mitigation strategies
- Recommendations for the specific service tier and Azure SQL configuration (SKU size) that best fits the workload needs
- Automatic generation of the assessment
- Continuous running on a default schedule of once per week
- Availability for all SQL Server editions

Migration assessment is for SQL Server instances located in various environments, including your data center, edge sites, or any public cloud or hosting provider. It is available for any instance of SQL Server that is enabled by Azure Arc.

For details, review [Configure SQL best practices assessment - SQL Server enabled by Azure Arc](assess.md).

### Custom data collection pipeline

For organizations requiring custom datasets beyond the built-in telemetry, an optional data collection pipeline can be implemented. This pipeline uses an [Azure Automation Runbook](https://learn.microsoft.com/azure/automation/automation-runbook-types) authenticated with a Microsoft Entra ID service principal to:

1. Enumerate Arc-enabled SQL Server resources using Azure Resource Manager APIs
2. Invoke [Azure Arc-enabled servers Run Command](https://learn.microsoft.com/azure/azure-arc/servers/run-command) to execute T-SQL scripts on each host
3. Collect and process script output
4. Send results to Azure Monitor Log Analytics via a [Data Collection Endpoint and Data Collection Rule](https://learn.microsoft.com/azure/azure-monitor/logs/logs-ingestion-api-overview) using the Logs Ingestion API

This approach operates independently of the Azure Monitoring Agent and enables custom reporting scenarios like centralized permission auditing, compliance checks, or configuration validation.

For security best practices when implementing at-scale operations, including RBAC requirements, identity management, and network security, see [Security overview | SQL Server enabled by Azure Arc](security-overview.md#at-scale-query-execution-via-arc-enabled-servers-run-command).

## Architecture

The SQL Server instance that you want to enable with Azure Arc can be installed in a virtual or physical machine running Windows or Linux. The [Azure Connected Machine agent](https://learn.microsoft.com/azure/azure-arc/servers/agent-overview) and the Azure Extension for SQL Server securely connect to Azure to establish communication channels with multiple Azure services using only outbound HTTPS traffic on TCP port 443 using Transport Layer Security (TLS). The Azure Connected Machine agent can communicate through a configurable HTTPS proxy server over Azure Express Route, Azure Private Link or over the Internet. Review the [overview](https://learn.microsoft.com/azure/azure-arc/servers/agent-overview), [network requirements](https://learn.microsoft.com/azure/azure-arc/servers/network-requirements), and [prerequisites](https://learn.microsoft.com/azure/azure-arc/servers/prerequisites) for the Azure Connected Machine agent.

> **Important:**
> Only Azure extension for SQL Server versions released within the last year are supported.

Some of the services provided by 
 SQL Server 
 enabled by Azure Arc, such as Microsoft Defender for Cloud and best practices assessment, require the Azure Monitoring agent (AMA) extension to be installed and connected to an Azure Log Analytics workspace for data collection and reporting.

The following diagram illustrates the architecture of 
 SQL Server 
 enabled by Azure Arc.


 SQL Server 
 enabled by Azure Arc" lightbox="media/overview/architecture.png":::


> **Note:**
> To download this architecture diagram in high-resolution, visit [Jumpstart Gems](https://aka.ms/jumpstartgems).

## Supported Azure regions


For successful onboarding and functioning, assign the same region to both the Arc-enabled Server and your Arc-enabled SQL Server instance.

SQL Server enabled by Azure Arc is available in the following regions:

#### [Americas](#tab/americas)

- Brazil South
- Canada Central
- Canada East
- Central US
- East US
- East US 2
- North Central US
- South Central US
- US Government Virginia <sup>1</sup>
- West Central US
- West US
- West US 2
- West US 3

> **Important:**
> <sup>1</sup> Feature availability varies in the US Virginia Government cloud. For government-specific supported features, limitations, and regional constraints, review [SQL Server enabled by Azure Arc in US Virginia Government](us-government-region.md).


#### [Asia Pacific](#tab/asia)

- Australia East
- Central India
- Japan East
- Korea Central
- Southeast Asia

#### [Europe, the Middle East, and Africa](#tab/emea)

- France Central
- North Europe
- Norway East
- South Africa North
- Sweden Central
- Switzerland North
- UAE North
- UK South
- UK West
- West Europe

---


<a id="feature-differentiation"></a>

## Feature availability depending on license type


The following table identifies the capabilities and use rights offered with each license type:

| Capability and use rights | License only | License with Software Assurance<br />or SQL Server subscription | Pay-as-you-go subscription |
| --- | --- | --- | --- |
| [Free new version upgrade](https://download.microsoft.com/download/9/3/d/93d32de6-f268-45ed-ba25-2f9a6756b6af/SQL_Server_2022_Licensing_guide.pdf) | No | Yes | Yes |
| [High availability and disaster recovery benefit](https://download.microsoft.com/download/9/3/d/93d32de6-f268-45ed-ba25-2f9a6756b6af/SQL_Server_2022_Licensing_guide.pdf) | No | Yes | Yes |
| [Unlimited virtualization with Enterprise edition](https://download.microsoft.com/download/9/3/d/93d32de6-f268-45ed-ba25-2f9a6756b6af/SQL_Server_2022_Licensing_guide.pdf) | No | Yes | Yes |
| [Flexible Virtualization Benefit licensing guide](https://download.microsoft.com/download/9/3/d/93d32de6-f268-45ed-ba25-2f9a6756b6af/SQL_Server_2022_Licensing_guide.pdf) | No | Yes | Yes |
| [Option to license by virtual machine](https://download.microsoft.com/download/9/3/d/93d32de6-f268-45ed-ba25-2f9a6756b6af/SQL_Server_2022_Licensing_guide.pdf) | No | Yes | Yes |
| [Free Power BI Report Server license](manage-license-billing.md#manage-ssxs) | Yes<sup>1</sup> | Yes | Yes |
| [180-day dual-use benefit](manage-license-billing.md#180-day-dual-use-benefit) | No | Yes | Yes |
| [Connect your SQL Server to Azure Arc](connect.md)<sup>2</sup> | Yes | Yes | Yes |
| [ESU Subscription](extended-security-updates.md) | No | Yes | Yes |
| [SQL Server inventory](overview.md#manage-your-sql-server-instances-at-scale-from-a-single-point-of-control) | Yes | Yes | Yes |
| [Best practices assessment](assess.md) | No | Yes | Yes |
| [Migration readiness](migration-assessment.md) | Yes | Yes | Yes |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | Yes | Yes | Yes |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | Yes | Yes |
| [Microsoft Entra authentication](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) | Yes | Yes | Yes |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | Yes | Yes |
| [Govern through Microsoft Purview](https://learn.microsoft.com/azure/purview/tutorial-register-scan-on-premises-sql-server) | Yes | Yes | Yes |
| [Automated backups to local storage (preview)](backup-local.md) | No | Yes | Yes |
| [Point-in-time restore](point-in-time-restore.md) | No | Yes | Yes |
| [Automatic updates](update.md) | No | Yes | Yes |
| [Failover cluster instances](support-for-fci.md) | Yes | Yes | Yes |
| [Always On availability groups](manage-availability-group.md) | Yes | Yes | Yes |
| [Monitoring (preview)](sql-monitoring.md) | No | Yes | Yes |
| [Client connection summary](sql-connection-summary.md) | No | Yes | Yes |
| [Operate with least privilege](configure-least-privilege.md) | Yes | Yes | Yes |

<sup>1</sup> For  SQL Server 2022 (16.x) 
 and earlier versions, the free Power BI Report Server license is limited to Enterprise Edition (EE) customers with Software Assurance (SA) or subscriptions. For  SQL Server 2025 (17.x) 
, the free Power BI Report Server license is available to both Standard Edition (SE) and Enterprise Edition (EE) customers with all license types.   
<sup>2</sup> Connecting SQL Server to Azure Arc is subject to [outsourcing rules](https://www.microsoft.com/licensing/terms/productoffering/MicrosoftAzure/allprograms#:~:text=Azure%20Arc%F0%9F%94%97-,Outsourcing,%2C%20regardless%20of%20whether%20those%20Servers%20are%20dedicated%20to%20Customer.,-Unlimited%20Virtualization).

## Feature availability by operating system

The following table identifies features available by operating system:

| Feature | Windows | Linux |
| --- | --- | --- |
| [Discover and register SQL Server instances in Azure](prerequisites.md) | Yes | Yes |
| [Azure pay-as-you-go billing](manage-configuration.md) | Yes | Yes <sup>2</sup> |
| [Install Azure extension for SQL Server during setup](../../database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup.md#install-sql-server-2022) <sup>1</sup> | Yes | No |
| [Best practices assessment](assess.md) | Yes | No |
| [Migration assessment](migration-assessment.md) | Yes | No |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | Yes | No |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | No |
| [Microsoft Entra ID authentication](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) <sup>1</sup> | Yes | Yes |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | No |
| [Microsoft Purview](https://learn.microsoft.com/azure/purview/tutorial-register-scan-on-premises-sql-server) | Yes | Yes |
| [Automated backups to local storage (preview)](backup-local.md) | Yes | No |
| [Point-in-time-restore (preview)](point-in-time-restore.md) | Yes | No |
| [Automatic updates](update.md) | Yes | No |
| [SQL Server extended security updates](../end-of-support/sql-server-extended-security-updates.md) | Yes | Not applicable |
| [Failover cluster instances](support-for-fci.md) | Yes | Not applicable |
| [Always On availability groups](manage-availability-group.md) | Yes | Not applicable |
| [Monitoring (preview)](sql-monitoring.md) | Yes | No |
| [Client connection summary](sql-connection-summary.md) | Yes | No |
| [Operate with least privilege](configure-least-privilege.md) | Yes | No |

<sup>1</sup>  SQL Server 2022 (16.x) 
 only.

<sup>2</sup> PAYG billing is supported on Linux with limitations. Passive instance detection, connected user verification, and Database Engine-level core visibility aren't available. All instances are billed as active. For details, see [Manage licensing and billing](manage-license-billing.md).


## Feature availability by version


The following table identifies features available by SQL Server version:

| Feature availability based on SQL Server version | 2014 | 2016 <br /> 2017 <br /> 2019 | 2022 | 2025 |
| --- | --- | --- | --- | --- |
| [Azure pay-as-you-go billing](manage-configuration.md) | Yes | Yes | Yes | Yes |
| [Best practices assessment](assess.md) | Yes | Yes | Yes | Yes |
| [Migration assessment](migration-assessment.md) | Yes | Yes | Yes | Yes |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | LRS only | LRS & MI link | LRS & MI link | LRS & MI link |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | Yes | Yes | Yes |
| [Microsoft Entra ID authentication for SQL Server](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) | No | No | Yes | Yes |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | Yes | Yes | Yes |
| [Microsoft Purview: DevOps policies](https://learn.microsoft.com/azure/purview/how-to-policies-devops-authoring-generic) | No | No | Yes | No |
| [Microsoft Purview: data owner policies (preview)](https://learn.microsoft.com/purview/legacy/how-to-policies-data-owner-authoring-generic) | No | No | Yes | No |
| [Automated backups to local storage (preview)](backup-local.md) | Yes | Yes | Yes | Yes |
| [Point-in-time-restore (preview)](point-in-time-restore.md) | Yes | Yes | Yes | Yes |
| [Automatic updates](update.md) | Yes <sup>1</sup> | Yes | Yes | Yes |
| [Failover cluster instances](support-for-fci.md) | Yes | Yes | Yes | Yes |
| [Always On availability groups](manage-availability-group.md) | Yes | Yes | Yes | Yes |
| [Monitoring (preview)](sql-monitoring.md) | No | Yes <sup>2</sup> | Yes | Yes |
| [Client connection summary](sql-connection-summary.md) | No | Yes <sup>2</sup> | Yes | Yes |
| [Operate with least privilege](configure-least-privilege.md) | Yes | Yes | Yes | Yes |

<sup>1</sup> Requires subscription to [Extended Security Updates (ESU) enabled by Azure Arc](../end-of-support/sql-server-extended-security-updates.md#subscribe-to-esus-for-sql-server-instances) for  SQL Server 2014 (12.x)
.

<sup>2</sup> Requires  SQL Server 2016 (13.x) 
 SP1 or later versions. For more information, see [prerequisites](sql-monitoring.md#prerequisites). 






## Feature availability by edition


The following table identifies features available by  SQL Server 
 edition:

**Applies to: <=sql-server-ver16 || <=sql-server-linux-ver16**

> **Note:**
> This table applies to SQL Server 2022 and earlier versions. To view features for later versions, use the version selector at the top of the page.

| Feature | Enterprise | Standard | Web | Express | Developer | Evaluation |
| --- | --- | --- | --- | --- | --- | --- |
| [Azure pay-as-you-go billing](manage-configuration.md) | Yes | Yes | Not applicable | Not applicable | Not applicable | Not applicable |
| [Best practices assessment](assess.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Migration readiness](migration-assessment.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | LRS and<br />MI link | LRS and<br />MI link | LRS only | LRS only | LRS and<br />MI link | LRS only |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Microsoft Entra authentication](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | Yes | Yes | Yes <sup>1</sup> | Yes | Yes |
| [Microsoft Purview: Govern using DevOps and data owner policies](https://learn.microsoft.com/azure/purview/tutorial-register-scan-on-premises-sql-server) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Automated backups to local storage (preview)](backup-local.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Point-in-time restore](point-in-time-restore.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Automatic updates](update.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Failover cluster instances](support-for-fci.md) | Yes | Yes | Not applicable | Not applicable | Yes | Not applicable |
| [Always On availability groups](manage-availability-group.md) | Yes | Yes | Not applicable | Not applicable | Yes | Not applicable |
| [Monitoring (preview)](sql-monitoring.md) | Yes | Yes | No | No | No | No |
| [Client connection summary](sql-connection-summary.md) | Yes | Yes | Yes | Yes | Yes | Yes |
| [Operate with least privilege](configure-least-privilege.md) | Yes | Yes | Yes | Yes | Yes | Yes |

<sup>1</sup> [Express LocalDB isn't supported](https://learn.microsoft.com/azure/purview/register-scan-on-premises-sql-server#supported-capabilities).



**Applies to: \>=sql-server-ver17 || >=sql-server-linux-ver17**

> **Note:**
> This table applies to versions beginning with SQL Server 2025 (17.x). To view earlier versions, use the version selector at the top of the page.

| Feature | Enterprise | Standard | Express | Enterprise Developer<br /><br />Standard Developer | Evaluation |
| --- | --- | --- | --- | --- | --- |
| [Azure pay-as-you-go billing](manage-configuration.md) | Yes | Yes | Not applicable | Not applicable | Not applicable |
| [Best practices assessment](assess.md) | Yes | Yes | Yes | Yes | Yes |
| [Migration readiness](migration-assessment.md) | Yes | Yes | Yes | Yes | Yes |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | Yes | Yes | Yes | Yes |
| [Microsoft Entra authentication](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) | Yes | Yes | Yes | Yes | Yes |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | Yes | Yes <sup>1</sup> | Yes | Yes |
| [Microsoft Purview: Govern using DevOps and data owner policies](https://learn.microsoft.com/azure/purview/tutorial-register-scan-on-premises-sql-server) | Yes | Yes | Yes | Yes | Yes |
| [Automated backups to local storage (preview)](backup-local.md) | Yes | Yes | Yes | Yes | Yes |
| [Point-in-time restore](point-in-time-restore.md) | Yes | Yes | Yes | Yes | Yes |
| [Automatic updates](update.md) | Yes | Yes | Yes | Yes | Yes |
| [Failover cluster instances](support-for-fci.md) | Yes | Yes | Not applicable | Yes | Not applicable |
| [Always On availability groups](manage-availability-group.md) | Yes | Yes | Not applicable | Yes | Not applicable |
| [Monitoring (preview)](sql-monitoring.md) | Yes | Yes | No | No | No |
| [Client connection summary](sql-connection-summary.md) | Yes | Yes | Yes | Yes | Yes |
| [Operate with least privilege](configure-least-privilege.md) | Yes | Yes | Yes | Yes | Yes |

<sup>1</sup> [Express LocalDB isn't supported](https://learn.microsoft.com/azure/purview/register-scan-on-premises-sql-server#supported-capabilities).




## Feature availability by service type


The following table identifies features available by  SQL Server 
 service type:

| Feature | SQL Server Database Engine | SQL Server Integration Services | SQL Server Reporting Services | SQL Server Analysis Services | Power BI Report Server |
| --- | --- | --- | --- | --- | --- |
| [Connect to Azure Arc](connect.md) | Yes | Yes | Yes | Yes | Yes |
| [Azure pay-as-you-go billing](manage-configuration.md) | Yes | Yes | Yes | Yes | Yes |
| [ESU subscription](manage-license-billing.md) | Yes | Yes | Yes | Yes | Yes |
| SQL Server inventory | Yes | Yes | Yes | Yes | Yes |
| [Best practices assessment](assess.md) | Yes | No | No | No | No |
| [Migration readiness](migration-assessment.md) | Yes | No | No | No | No |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | Yes | No | No | No | No |
| [Detailed inventory](view-inventory.md#inventory-databases) | Yes | Not applicable | Not applicable | Not applicable | Not applicable |
| [Microsoft Entra ID authentication](../../relational-databases/security/authentication-access/azure-ad-authentication-sql-server-overview.md) | Yes <sup>1</sup> | No | No | No | No |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage) | Yes | No | No | No | No |
| [Microsoft Purview: Govern using DevOps and data owner policies](https://learn.microsoft.com/azure/purview/tutorial-register-scan-on-premises-sql-server) | Yes | No | No | No | No |
| [Automated backups to local storage (preview)](backup-local.md) | Yes | No | No | No | No |
| [Point-in-time-restore](point-in-time-restore.md) | Yes | No | No | No | No |
| [Automatic updates](update.md) | Yes | Yes | Yes | Yes | Yes |
| [Failover cluster instances](support-for-fci.md) | Yes | Not applicable | Not applicable | Not applicable | Not applicable |
| [Always On availability groups](manage-availability-group.md) | Yes | Not applicable | Not applicable | Not applicable | Not applicable |
| [Monitoring (preview)](sql-monitoring.md) | Yes | No | No | No | No |
| [Client connection summary](sql-connection-summary.md) | Yes | No | No | No | No |
| [Operate with least privilege](configure-least-privilege.md) | Yes | Yes | Yes | Yes | Yes |

<sup>1</sup>  SQL Server 2022 (16.x) 
 only.



## Supported configurations

### SQL Server version

 SQL Server 2014 (12.x)
 and later versions.

> **Note:**
> Only 64-bit SQL Server versions are supported.
 
### Operating systems

- Windows 10 and 11
- Windows Server 2016
 and later versions
- Ubuntu 20.04 (x64)
- Red Hat Enterprise Linux (RHEL) 8 (x64)
- SUSE Linux Enterprise Server (SLES) 15 (x64)

### .NET Framework

On Windows, .NET Framework 4.7.2 and later.

This requirement starts with extension version `1.1.2504.99` (November, 14 2023 release). Without this version, the extension might not function as intended.

### Support on VMware

You can deploy SQL Server enabled by Azure Arc in VMware VMs running:

- On-premises
- In VMware solutions, for example:
  - Azure VMware Solution (AVS)

    
VMware vSphere remains the underlying virtualization platform. Following Broadcom's acquisition of VMware, the vSphere product name didn't change; however, VMware updated how vSphere is packaged and licensed (for example, through VMware vSphere Foundation and VMware Cloud Foundation).

> **Warning:**
>
> If you're running SQL Server VMs in Azure VMware Solution (AVS) private cloud, follow the steps in [Deploy Arc-enabled Azure VMware Solution](https://learn.microsoft.com/azure/azure-vmware/deploy-arc-for-azure-vmware-solution) to enable.
>
> This is the only deployment mechanism that provides you with a fully integrated experience with Arc capabilities within the AVS private cloud.


  - VMware Cloud on AWS
  - Google Cloud VMware Engine

#### VMware packaging and support scope

SQL Server enabled by Azure Arc supports SQL Server instances running on virtual machines hosted in VMware vSphere–based environments, including Azure VMware Solution.

Support doesn't depend on specific VMware commercial bundles, editions, or packaging. The following requirements determine support:

- The supported guest operating system
- The supported SQL Server version
- Azure Arc Connected Machine agent requirements

VMware (Broadcom) defines VMware packaging, licensing, and lifecycle policies and may change them independently of Azure Arc.


## Settings


The following table identifies settings, if they're enabled by default, and where the setting is configured:

| Setting Name | Default (Enabled or Disabled) | Can be disabled | Configuration location |
| --- | --- | --- | --- |
| [Extended security updates](extended-security-updates.md) | Disabled | Yes | Extension |
| [Least privilege mode](configure-least-privilege.md) | Disabled | Yes | Extension |
| [Automated patching](update.md) | Disabled | Yes | Extension |
| [Best practices assessment](assess.md) | Disabled | Yes | Extension |
| [Microsoft Entra Authentication](entra-authentication-setup-tutorial.md) | Disabled | Yes | Extension per instance |
| [Purview](https://learn.microsoft.com/purview/register-scan-azure-arc-enabled-sql-server) | Disabled | Yes | Extension, Instance |
| [Automated backups](backup-local.md) | Disabled | Yes | Instance, Database |
| [Collect performance metrics (preview)](sql-monitoring.md) | Enabled | Yes | Instance |
| [Migration assessment](migration-assessment.md) | Enabled | Yes | Instance |
| [Database migration](migrate-to-azure-sql-managed-instance.md) | Enabled | No | Extension |
| [Availability Group discovery management](manage-availability-group.md) | Enabled | Yes | `AvailabilityGroupDiscovery` feature flag |
| [Extension log collection](troubleshoot-deployment.md#log-file-locations) | Enabled | No | Not configurable |
| [SQL Server instance and DB discovery](view-inventory.md) | Enabled | No | Not configurable |


## Recommended system requirements

To use 
 SQL Server 
 enabled by Azure Arc, the following minimum system requirements are recommended:

- **Cores**: 2 cores minimum
- **Memory**: 512 MB of RAM available

## Unsupported configurations


Azure Arc-enabled  SQL Server 
 doesn't currently support the following configurations:

- Windows Server versions earlier than Windows Server 2016
. These versions don't have the minimum required versions of TLS to securely authenticate to Azure.
-  SQL Server 
 running in containers.
-  SQL Server 
 editions: Business Intelligence.
- Private Link connections to the Azure Arc data processing service at the `<region>.arcdataservices.com` endpoint used for inventory and usage upload.
-  SQL Server 2008 (10.0.x) 
,  SQL Server 2008 R2 (10.50.x) 
,  SQL Server 2012 (11.x) 
, and older versions.
- Installing the Arc agent and  SQL Server 
 extension can't be done as part of sysprep image creation.
- Multiple instances of  SQL Server 
 installed on the same host operating system with the same instance name.
-  SQL Server 
 in Azure Virtual Machines.
- An Always On availability group where one or more replicas is on a failover cluster instance.
- SQL Server Reporting Services (SharePoint Mode).
- [DBCC CLONEDATABASE (Transact-SQL)](../../t-sql/database-console-commands/dbcc-clonedatabase-transact-sql.md) throws error on the default installation of the Azure extension for SQL Server. To run the `DBCC CLONEDATABASE`, the Azure extension must be run in [least privilege mode](configure-least-privilege.md).
- Database and availability group names with trailing whitespace (for example, `MyDb `) aren't supported on instances using binary collations (`BIN`/`BIN2`). These objects are skipped by the extension with a warning. On non-binary collations (the default), trailing whitespace is automatically trimmed, and the objects are managed normally.
- SQL Server instance names containing a `#` symbol aren't supported. For a complete list of naming rules and restrictions, review [naming rules and restrictions](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules).


## Installation

The  SQL Server 2022 (16.x) 
 Setup Installation Wizard doesn't support installation of the Azure extension for SQL Server. You can install this component from the command line, or by connecting the server to Azure Arc.

- [Install Azure extension for SQL Server from the command line](../../database-engine/install-windows/install-sql-server-from-the-command-prompt.md#install-and-connect-to-azure)
- [SQL Server enabled by Azure Arc deployment options](deployment-options.md)

For VMware vSphere–based environments, review [Support on VMware](#support-on-vmware).

## Related content

- [Prerequisites - SQL Server enabled by Azure Arc](prerequisites.md)
- [Deployment options for SQL Server enabled by Azure Arc](deployment-options.md)
- [Learn more about Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage)
- [Learn more about Microsoft Purview](https://learn.microsoft.com/azure/purview/register-scan-azure-arc-enabled-sql-server)
- [Azure Arc-enabled servers Run Command](https://learn.microsoft.com/azure/azure-arc/servers/run-command)
- [Tutorial: Send data to Azure Monitor Logs with Logs ingestion API](https://learn.microsoft.com/azure/azure-monitor/logs/tutorial-logs-ingestion-api)
- [Azure Automation Runbooks](https://learn.microsoft.com/azure/automation/automation-runbook-types)
- [Security &#124; SQL Server enabled by Azure Arc](security-overview.md)
