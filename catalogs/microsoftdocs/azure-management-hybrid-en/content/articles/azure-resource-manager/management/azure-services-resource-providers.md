---
title: Find resource providers by Azure services
description: Lists all resource provider namespaces for Azure Resource Manager and shows the Azure service for that namespace.
ms.topic: article
ms.date: 02/27/2026
ms.custom: devx-track-arm-template
content_well_notification: 
  - AI-contribution
ai-usage: ai-assisted
---

# What are the resource providers for Azure services

A resource provider is a collection of REST operations that enables functionality for an Azure service. Each resource provider has a namespace in the format of `company-name.service-label`. This article shows the resource providers for Azure services. If you don't know the resource provider, see [Find resource provider](#find-resource-provider).

## AI and machine learning resource providers

The resource providers for AI and machine learning services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AutonomousSystems | [Autonomous Systems](https://www.microsoft.com/ai/autonomous-systems) |
| Microsoft.BotService | [Azure Bot Service](https://learn.microsoft.com/azure/bot-service/) |
| Microsoft.CognitiveServices | [Cognitive Services](https://learn.microsoft.com/azure/ai-services/) |
| Microsoft.EnterpriseKnowledgeGraph | Enterprise Knowledge Graph |
| Microsoft.MachineLearningServices | [Azure Machine Learning](https://learn.microsoft.com/azure/machine-learning/) |
| Microsoft.Search | [Azure AI Search](https://learn.microsoft.com/azure/search/) |

## Analytics resource providers

The resource providers for analytics services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AnalysisServices | [Azure Analysis Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/analysis-services/index.yml) |
| Microsoft.Databricks | [Azure Databricks](https://learn.microsoft.com/azure/azure-databricks/) |
| Microsoft.DataCatalog | [Data Catalog](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-catalog/index.yml) |
| Microsoft.DataFactory | [Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml) |
| Microsoft.DataLakeAnalytics | [Data Lake Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-lake-analytics/index.yml) |
| Microsoft.DataLakeStore | [Azure Data Lake Storage Gen2](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-introduction.md) |
| Microsoft.DataShare | [Azure Data Share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-share/index.yml) |
| Microsoft.HDInsight | [HDInsight](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/index.yml) |
| Microsoft.Kusto | [Azure Data Explorer](https://learn.microsoft.com/azure/data-explorer/) |
| Microsoft.PowerBI | [Power BI](https://learn.microsoft.com/power-bi/power-bi-overview) |
| Microsoft.PowerBIDedicated | [Power BI Embedded](https://learn.microsoft.com/azure/power-bi-embedded/) |
| Microsoft.ProjectBabylon | [Azure Data Catalog](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-catalog/overview.md) |
| Microsoft.Purview | [Microsoft Purview](https://learn.microsoft.com/purview/purview) |
| Microsoft.StreamAnalytics | [Azure Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/index.yml) |
| Microsoft.Synapse | [Azure Synapse Analytics](https://learn.microsoft.com/azure/sql-data-warehouse/) |

## Blockchain resource providers

The resource providers for Blockchain services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Blockchain | [Azure Blockchain Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/blockchain/workbench/index.yml) |
| Microsoft.BlockchainTokens | [Azure Blockchain Tokens](https://azure.microsoft.com/services/blockchain-tokens/) |

## Compute resource providers

The resource providers for compute services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AppPlatform | [Azure Spring Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/overview.md) |
| Microsoft.AVS | [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) |
| Microsoft.Batch | [Batch](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/index.yml) |
| Microsoft.ClassicCompute | Classic deployment model virtual machine |
| Microsoft.Compute | [Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/)<br />[Virtual Machine Scale Sets](https://learn.microsoft.com/azure/virtual-machine-scale-sets/) |
| Microsoft.DesktopVirtualization | [Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/) |
| Microsoft.DevTestLab | [Azure Lab Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/index.yml) |
| Microsoft.HanaOnAzure | [SAP HANA on Azure Large Instances](https://learn.microsoft.com/azure/virtual-machines/workloads/sap/hana-overview-architecture) |
| Microsoft.LabServices | [Azure Lab Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/index.yml) |
| Microsoft.Maintenance | [Azure Maintenance](https://learn.microsoft.com/azure/virtual-machines/maintenance-configurations) |
| Microsoft.Microservices4Spring | [Azure Spring Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/basic-standard/overview.md) |
| Microsoft.Quantum | [Azure Quantum](https://azure.microsoft.com/services/quantum/) |
| Microsoft.SerialConsole - [registered by default](#registration) | [Azure Serial Console for Windows](https://learn.microsoft.com/troubleshoot/azure/virtual-machines/serial-console-windows) |
| Microsoft.ServiceFabric | [Service Fabric](https://learn.microsoft.com/azure/service-fabric/) |
| Microsoft.VirtualMachineImages | [Azure Image Builder](https://learn.microsoft.com/azure/virtual-machines/image-builder-overview) |
| Microsoft.VMware | [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) |
| Microsoft.VMwareCloudSimple | [Azure VMware Solution by CloudSimple](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vmware-cloudsimple/index.md) |

## Container resource providers

The resource providers for container services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.App | [Azure Container Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/container-apps/index.yml) |
| Microsoft.ContainerInstance | [Container Instances](https://learn.microsoft.com/azure/container-instances/) |
| Microsoft.ContainerRegistry | [Container Registry](https://learn.microsoft.com/azure/container-registry/) |
| Microsoft.ContainerService | [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/) |
| Microsoft.RedHatOpenShift | [Azure Red Hat OpenShift](https://learn.microsoft.com/azure/virtual-machines/linux/openshift-get-started) |

## Core resource providers

The resource providers for core services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Addons | core |
| Microsoft.AzureStack | core |
| Microsoft.Capacity | core |
| Microsoft.Commerce - [registered by default](#registration) | core |
| Microsoft.Marketplace | core |
| Microsoft.MarketplaceApps | core |
| Microsoft.MarketplaceOrdering - [registered by default](#registration) | core |
| Microsoft.SaaS | core |
| Microsoft.Services | core |
| Microsoft.Subscription | core |
| microsoft.support - [registered by default](#registration) | core |

## Database resource providers

The resource providers for database services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Cache | [Azure Managed Redis](https://learn.microsoft.com/azure/redis/) and [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview) <br><br>**Note:** Azure Cache for Redis is being retired. For more information, see [Azure Cache for Redis retirement FAQ](https://learn.microsoft.com/azure/azure-cache-for-redis/retirement-faq). |
| Microsoft.DBforMariaDB | [Azure Database for MariaDB](https://learn.microsoft.com/azure/mariadb/) |
| Microsoft.DBforMySQL | [AzureÂ Database for MySQL](https://learn.microsoft.com/azure/mysql/) |
| Microsoft.DBforPostgreSQL | [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/) |
| Microsoft.DocumentDB | [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/)<br /> [Azure DocumentDB](https://learn.microsoft.com/azure/documentdb/) |
| Microsoft.Sql | [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/index)<br /> [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/index) <br />[Azure Synapse Analytics](https://learn.microsoft.com/azure/sql-data-warehouse/) |
| Microsoft.SqlVirtualMachine | [SQL Server on Azure Virtual Machines](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview) |
| Microsoft.AzureData | [SQL Server enabled by Azure Arc](https://learn.microsoft.com/sql/sql-server/azure-arc/overview) |

## Developer tools resource providers

The resource providers for developer tools services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AppConfiguration | [Azure App Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/index.yml) |
| Microsoft.DevCenter | [Microsoft Dev Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dev-box/index.yml) |
| Microsoft.DevSpaces | [Azure Dev Spaces](https://learn.microsoft.com/previous-versions/azure/dev-spaces/) |
| Microsoft.LoadTestService | [Azure Load Testing](https://learn.microsoft.com/azure/load-testing/) |
| Microsoft.Notebooks | [Azure Notebooks](https://notebooks.azure.com/help/introduction) |

## DevOps resource providers

The resource providers for DevOps services are:

| Resource provider namespace | Azure service |
| --- | --- |
| microsoft.visualstudio | [Azure DevOps](https://learn.microsoft.com/azure/devops/) |
| Microsoft.VSOnline | [Azure DevOps](https://learn.microsoft.com/azure/devops/) |
| Microsoft.DevOpsInfrastructure | [Managed DevOps Pools](https://learn.microsoft.com/azure/devops/managed-devops-pools/) |

## Hybrid resource providers

The resource providers for hybrid services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AzureArcData | [Azure Arc-enabled data services](https://learn.microsoft.com/azure/azure-arc/data/overview) |
| Microsoft.AzureStackHCI | [Azure Local](https://learn.microsoft.com/azure-stack/hci/overview) |
| Microsoft.HybridCompute | [Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/) |
| Microsoft.Kubernetes | [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/) |
| Microsoft.KubernetesConfiguration | [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/) |
| Microsoft.Edge | [Azure Arc site manager](https://learn.microsoft.com/azure/azure-arc/site-manager/) |

## Identity resource providers

The resource providers for identity services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AAD | [Microsoft Entra Domain Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-domain-services/index.yml) |
| Microsoft.ADHybridHealthService - [registered by default](#registration) | [Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/index.yml) |
| Microsoft.AzureActiveDirectory | [Microsoft Entra ID B2C](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/index.yml) |
| Microsoft.ManagedIdentity | [Managed identities for Azure resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/index.yml) |
| Microsoft.Token | Token |

## Integration resource providers

The resource providers for integration services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.ApiManagement | [API Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/index.yml) |
| Microsoft.Communication | [Azure Communication Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/overview.md) |
| Microsoft.EventGrid | [Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/index.yml) |
| Microsoft.EventHub | [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/index.yml) |
| Microsoft.HealthcareApis (Azure API for FHIR) | [Azure API for FHIR](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/index.yml) |
| Microsoft.HealthcareApis (Healthcare APIs) | [Healthcare APIs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/index.yml) |
| Microsoft.Logic | [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml) |
| Microsoft.NotificationHubs | [Notification Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/index.yml) |
| Microsoft.PowerPlatform | [Power Platform](https://learn.microsoft.com/power-platform/) |
| Microsoft.Relay | [Azure Relay](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-relay/relay-what-is-it.md) |
| Microsoft.ServiceBus | [Service Bus](https://learn.microsoft.com/azure/service-bus/) |

## IoT resource providers

The resource providers for IoT services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.IoTOperations | [Azure IoT Operations](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-operations/index.yml) |
| Microsoft.DeviceRegistry | [Azure Device Registry](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-operations/overview-iot-operations.md#manage-devices-and-assets) |
| Microsoft.Devices | [Azure IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/index.yml)<br />[Azure IoT Hub Device Provisioning Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml) |
| Microsoft.DeviceUpdate | [Device Update for IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub-device-update/index.yml) |
| Microsoft.DigitalTwins | [Azure Digital Twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/overview.md) |
| Microsoft.IoTSpaces | [Azure Digital Twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/index.yml) |
| Microsoft.IoTCentral | [Azure IoT Central](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-central/index.yml) |
| Microsoft.WindowsIoT | [Windows 10 IoT Core Services](https://learn.microsoft.com/windows-hardware/manufacture/iot/iotcoreservicesoverview) |

## Management resource providers

The resource providers for management services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Advisor | [Azure Advisor](https://learn.microsoft.com/azure/advisor/advisor-overview) |
| Microsoft.Authorization - [registered by default](#registration) | [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/index.yml) |
| Microsoft.Automation | [Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/index.yml) |
| Microsoft.Billing - [registered by default](#registration) | [Cost Management and Billing](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) |
| Microsoft.Blueprint | [Azure Blueprints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/blueprints/index.yml) |
| Microsoft.ChangeSafety - [registered by default](#registration) | Safety checks that help Microsoft reduce risk and improve reliability in Microsoft service deployment |
| Microsoft.ClassicSubscription - [registered by default](#registration) | Classic deployment model |
| Microsoft.Consumption - [registered by default](#registration) | [Cost Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) |
| Microsoft.CostManagement - [registered by default](#registration) | [Cost Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) |
| Microsoft.CostManagementExports | [Cost Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) |
| Microsoft.CustomProviders | [Azure Custom Providers](../custom-providers/overview.md) |
| Microsoft.DynamicsLcs | [Lifecycle Services](https://lcs.dynamics.com/Logon/Index) |
| Microsoft.Features - [registered by default](#registration) | [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/index.yml) |
| Microsoft.GuestConfiguration | [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml) |
| Microsoft.ManagedServices | [Azure Lighthouse](https://learn.microsoft.com/azure/lighthouse/overview) |
| Microsoft.Management | [Management Groups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/management-groups/index.yml) |
| Microsoft.PolicyInsights | [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml) |
| Microsoft.Portal - [registered by default](#registration) | [Azure portal](https://learn.microsoft.com/azure/azure-portal/azure-portal-overview) |
| Microsoft.RecoveryServices | [Azure Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/index.yml) |
| Microsoft.ResourceGraph - [registered by default](#registration) | [Azure Resource Graph](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/resource-graph/index.yml) |
| Microsoft.ResourceHealth | [Azure Service Health](https://learn.microsoft.com/azure/service-health/overview) |
| Microsoft.ResourceNotification - [registered by default](#registration) | [Azure Resource Notifications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/event-schema-resource-notifications.md) |
| Microsoft.Resources - [registered by default](#registration) | [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/index.yml) |
| Microsoft.Scheduler | [Scheduler](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/scheduler/index.yml) |
| Microsoft.SoftwarePlan | License |
| Microsoft.Solutions | [Azure Managed Applications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/index.yml) |

## Migration resource providers

The resource providers for migration services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.ClassicInfrastructureMigrate | Classic deployment model migration |
| Microsoft.DataBox | [Azure Data Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/index.yml) |
| Microsoft.DataBoxEdge | [Azure Stack Edge](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-overview.md) |
| Microsoft.DataMigration | [Azure Database Migration Service](https://learn.microsoft.com/azure/dms/) |
| Microsoft.OffAzure | [Azure Migrate](../../migrate/migrate-services-overview.md) |
| Microsoft.Migrate | [Azure Migrate](../../migrate/migrate-services-overview.md) |

## Monitoring resource providers

The resource providers for monitoring services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.AlertsManagement | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.ChangeAnalysis | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.Insights | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.Intune | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.Monitor | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.OperationalInsights | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.OperationsManagement | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
| Microsoft.WorkloadMonitor | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |

## Network resource providers

The resource providers for network services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Cdn | [Content Delivery Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/index.yml) |
| Microsoft.ClassicNetwork | Classic deployment model virtual network |
| Microsoft.ManagedNetwork | Virtual networks managed by PaaS services |
| Microsoft.Network | [Application Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/index.yml)<br />[Azure Bastion](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/index.yml)<br />[Azure DDoS Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/ddos-protection-overview.md)<br />[Azure DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/index.yml)<br />[Azure ExpressRoute](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/index.yml)<br />[Azure Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/index.yml)<br />[Azure Front Door Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml)<br />[Azure Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/index.yml)<br />[Azure Route Server](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/index.yml)<br />[Load Balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/index.yml)<br />[Network Watcher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/index.yml)<br />[Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/index.yml)<br />[Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/index.yml)<br />[Virtual Network NAT](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/nat-gateway/nat-overview.md)<br /> [Virtual Network Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network-manager/overview.md)<br />[Virtual WAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/index.yml)<br />[VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/index.yml)<br /> |
| Microsoft.Peering | [Azure Peering Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/peering-service/index.yml) |

## Security resource providers

The resource providers for security services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.Attestation | [Azure Attestation Service](https://learn.microsoft.com/azure/attestation/overview) |
| Microsoft.CustomerLockbox | [Customer Lockbox for Microsoft Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/customer-lockbox-overview.md) |
| Microsoft.DataProtection | Data Protection |
| Microsoft.HardwareSecurityModules | [Azure Dedicated HSM](https://learn.microsoft.com/azure/dedicated-hsm/) |
| Microsoft.KeyVault | [Key Vault](https://learn.microsoft.com/azure/key-vault/) |
| Microsoft.Security | [Security Center](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security-center/index.yml) |
| Microsoft.SecurityInsights | [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/) |
| Microsoft.WindowsDefenderATP | [Microsoft Defender Advanced Threat Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security-center/security-center-wdatp.md) |
| Microsoft.WindowsESU | Extended Security Updates |

## Storage resource providers

The resource providers for storage services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.ClassicStorage | Classic deployment model storage |
| Microsoft.ElasticSan | [Elastic SAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/elastic-san/index.yml) |
| Microsoft.HybridData | [StorSimple](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storsimple/index.yml) |
| Microsoft.ImportExport | [Azure Import/Export](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/storage-import-export-service.md) |
| Microsoft.NetApp | [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/index.yml) |
| Microsoft.ObjectStore | Object Store |
| Microsoft.Storage | [Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/index.yml) |
| Microsoft.StorageCache | [Azure HPC Cache](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hpc-cache/index.yml) |
| Microsoft.StorageSync | [Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/index.yml) |
| Microsoft.StorSimple | [StorSimple](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storsimple/index.yml) |

## Web resource providers

The resource providers for web services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.BingMaps | [Bing Maps](https://learn.microsoft.com/BingMaps/#pivot=main\&panel=BingMapsAPI) |
| Microsoft.CertificateRegistration | [App Service Certificates](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/configure-ssl-app-service-certificate.md) |
| Microsoft.DomainRegistration | [App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml) |
| Microsoft.Maps | [Azure Maps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-maps/index.yml) |
| Microsoft.SignalRService | [Azure SignalR Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/index.yml) |
| Microsoft.Web | [App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml)<br />[Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml) |

## 5G & Space resource providers

The resource providers for 5G & space services are:

| Resource provider namespace | Azure service |
| --- | --- |
| Microsoft.HybridNetwork | [Network Function Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-function-manager/index.yml) |
| Microsoft.MobileNetwork | [Azure Private 5G Core](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-5g-core/index.yml) |

## Registration

Resource providers marked with **- registered by default** in the previous section are automatically registered for your subscription. For other resource providers, you need to [register them](resource-providers-and-types.md). However, many resource providers are registered automatically when you perform specific actions. For example, when you create resources through the portal or by deploying an [Azure Resource Manager template](../templates/overview.md), Azure Resource Manager automatically registers any required unregistered resource providers.

> **Important:**
> Register a resource provider only when you're ready to use it. This registration step helps maintain least privileges within your subscription. A malicious user can't use unregistered resource providers.
>
> Registering unnecessary resource providers may result in unrecognized apps appearing in your Microsoft Entra tenant. Microsoft adds the app for a resource provider when you register it. These apps are typically added by the Windows Azure Service Management API. To prevent unnecessary apps in your tenant, only register needed resource providers.

## Find resource provider

To identify resource providers used for your existing Azure infrastructure, list the deployed resources. Specify the resource group containing the resources.

The following example uses Azure CLI:

```azurecli-interactive
az resource list --resource-group examplegroup
```

The results include the resource type. The resource provider namespace is the first part of the resource type. The following example shows the **Microsoft.KeyVault** resource provider.

```output
[
  {
    ...
    "type": "Microsoft.KeyVault/vaults"
  }
]
```

The following example uses PowerShell:

```azurepowershell-interactive
Get-AzResource -ResourceGroupName examplegroup
```

The results include the resource type. The resource provider namespace is the first part of the resource type. The following example shows the **Microsoft.KeyVault** resource provider.

```output
Name              : examplekey
ResourceGroupName : examplegroup
ResourceType      : Microsoft.KeyVault/vaults
...
```

The following example uses Python:

```python
import os
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient

subscription_id = os.environ["AZURE_SUBSCRIPTION_ID"]
credential = DefaultAzureCredential()
resource_client = ResourceManagementClient(credential, subscription_id)

resource_group_name = "examplegroup"
resources = resource_client.resources.list_by_resource_group(resource_group_name)

for resource in resources:
    print(resource.type)
```

The results list the resource type. The resource provider namespace is the first part of the resource type. The following example shows the **Microsoft.KeyVault** resource provider.

```output
Microsoft.KeyVault/vaults
```

## Next steps

For more information about resource providers, including how to register a resource provider, see [Azure resource providers and types](resource-providers-and-types.md).
