---
title: Azure permissions - Azure RBAC
description: Lists the permissions for Azure resource providers.
ms.service: role-based-access-control
ms.topic: generated-reference
ms.workload: identity
author: rolyon
manager: pmwongera
ms.author: rolyon
ms.date: 07/01/2026
ms.custom: generated
---

# Azure permissions

This article lists the permissions for Azure resource providers, which are used in built-in roles. You can use these permissions in your own [Azure custom roles](https://learn.microsoft.com/azure/role-based-access-control/custom-roles) to provide granular access control to resources in Azure. The permissions are always evolving. To get the latest permissions, use [Get-AzProviderOperation](https://learn.microsoft.com/powershell/module/az.resources/get-azprovideroperation) or [az provider operation list](https://learn.microsoft.com/cli/azure/provider/operation#az-provider-operation-list).

Click the resource provider name in the following list to see the list of permissions.


## General

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.Addons](permissions/general.md#microsoftaddons) |  | core |
> | [Microsoft.Capacity](permissions/general.md#microsoftcapacity) |  | core |
> | [Microsoft.Commerce](permissions/general.md#microsoftcommerce) |  | core |
> | [Microsoft.Marketplace](permissions/general.md#microsoftmarketplace) |  | core |
> | [Microsoft.MarketplaceOrdering](permissions/general.md#microsoftmarketplaceordering) |  | core |
> | [Microsoft.Quota](permissions/general.md#microsoftquota) |  | [Azure Quotas](https://learn.microsoft.com/azure/quotas/quotas-overview) |
> | [Microsoft.Subscription](permissions/general.md#microsoftsubscription) |  | core |
> | [Microsoft.Support](permissions/general.md#microsoftsupport) |  | core |

## Compute

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [microsoft.app](permissions/compute.md#microsoftapp) |  | [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/) |
> | [Microsoft.AppPlatform](permissions/compute.md#microsoftappplatform) | A fully managed Spring Cloud service, built and operated with Pivotal. | [Azure Spring Apps](https://learn.microsoft.com/azure/spring-apps/) |
> | [Microsoft.AVS](permissions/compute.md#microsoftavs) |  | [Azure VMware Solution](https://learn.microsoft.com/azure/azure-vmware/introduction) |
> | [Microsoft.AzureFleet](permissions/compute.md#microsoftazurefleet) |  | [Azure Compute Fleet](https://learn.microsoft.com/azure/azure-compute-fleet/overview) |
> | [Microsoft.Batch](permissions/compute.md#microsoftbatch) | Cloud-scale job scheduling and compute management. | [Batch](https://learn.microsoft.com/azure/batch/) |
> | [Microsoft.Compute](permissions/compute.md#microsoftcompute) | Access cloud compute capacity and scale on demand (such as virtual machines) and only pay for the resources you use. | [Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/)<br/>[Virtual Machine Scale Sets](https://learn.microsoft.com/azure/virtual-machine-scale-sets/) |
> | [Microsoft.ComputeLimit](permissions/compute.md#microsoftcomputelimit) |  |  |
> | [Microsoft.ComputeSchedule](permissions/compute.md#microsoftcomputeschedule) |  | [Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/overview) |
> | [microsoft.connectedvmwarevsphere](permissions/compute.md#microsoftconnectedvmwarevsphere) |  | [Azure Arc-enabled VMware vSphere](https://learn.microsoft.com/azure/azure-arc/vmware-vsphere/) |
> | [Microsoft.DesktopVirtualization](permissions/compute.md#microsoftdesktopvirtualization) | The best virtual desktop experience, delivered on Azure. | [Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/) |
> | [Microsoft.Quantum](permissions/compute.md#microsoftquantum) |  | [Azure Quantum](https://learn.microsoft.com/azure/quantum/overview-azure-quantum) |
> | [Microsoft.ServiceFabric](permissions/compute.md#microsoftservicefabric) | Develop microservices and orchestrate containers on Windows or Linux. | [Service Fabric](https://learn.microsoft.com/azure/service-fabric/) |

## Networking

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.Cdn](permissions/networking.md#microsoftcdn) | Ensure secure, reliable content delivery with broad global reach. | [Content Delivery Network](https://learn.microsoft.com/azure/cdn/) |
> | [Microsoft.Network](permissions/networking.md#microsoftnetwork) | Connect cloud and on-premises infrastructure and services to provide your customers and users the best possible experience. | [Application Gateway](https://learn.microsoft.com/azure/application-gateway/)<br />[Azure Bastion](https://learn.microsoft.com/azure/bastion/)<br />[Azure DDoS Protection](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview)<br />[Azure DNS](https://learn.microsoft.com/azure/dns/)<br />[Azure ExpressRoute](https://learn.microsoft.com/azure/expressroute/)<br />[Azure Firewall](https://learn.microsoft.com/azure/firewall/)<br />[Azure Front Door Service](https://learn.microsoft.com/azure/frontdoor/)<br />[Azure Private Link](https://learn.microsoft.com/azure/private-link/)<br />[Azure Route Server](https://learn.microsoft.com/azure/route-server/)<br />[Load Balancer](https://learn.microsoft.com/azure/load-balancer/)<br />[Network Watcher](https://learn.microsoft.com/azure/network-watcher/)<br />[Traffic Manager](https://learn.microsoft.com/azure/traffic-manager/)<br />[Virtual Network](https://learn.microsoft.com/azure/virtual-network/)<br />[Virtual Network NAT](https://learn.microsoft.com/azure/nat-gateway/nat-overview)<br />[Virtual Network Manager](https://learn.microsoft.com/azure/virtual-network-manager/overview)<br />[Virtual WAN](https://learn.microsoft.com/azure/virtual-wan/)<br />[VPN Gateway](https://learn.microsoft.com/azure/vpn-gateway/) |

## Storage

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.DataShare](permissions/storage.md#microsoftdatashare) | A simple and safe service for sharing big data with external organizations. | [Azure Data Share](https://learn.microsoft.com/azure/data-share/) |
> | [Microsoft.ElasticSan](permissions/storage.md#microsoftelasticsan) |  | [Azure Elastic SAN](https://learn.microsoft.com/azure/storage/elastic-san/) |
> | [Microsoft.NetApp](permissions/storage.md#microsoftnetapp) | Enterprise-grade Azure file shares, powered by NetApp. | [Azure NetApp Files](https://learn.microsoft.com/azure/azure-netapp-files/) |
> | [Microsoft.Storage](permissions/storage.md#microsoftstorage) | Get secure, massively scalable cloud storage for your data, apps, and workloads. | [Storage](https://learn.microsoft.com/azure/storage/) |
> | [Microsoft.StorageCache](permissions/storage.md#microsoftstoragecache) | File caching and Lustre file system capabilities for high-performance computing (HPC). | [Azure HPC Cache](https://learn.microsoft.com/azure/hpc-cache/)<br/>[Azure Managed Lustre](https://learn.microsoft.com/azure/azure-managed-lustre/) |
> | [Microsoft.StorageSync](permissions/storage.md#microsoftstoragesync) |  | [Storage](https://learn.microsoft.com/azure/storage/) |

## Web and Mobile

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.CertificateRegistration](permissions/web-and-mobile.md#microsoftcertificateregistration) | Allow an application to use its own credentials for authentication. | [App Service Certificates](https://learn.microsoft.com/azure/app-service/configure-ssl-certificate#buy-and-import-app-service-certificate) |
> | [Microsoft.DomainRegistration](permissions/web-and-mobile.md#microsoftdomainregistration) |  | [App Service](https://learn.microsoft.com/azure/app-service/) |
> | [Microsoft.Maps](permissions/web-and-mobile.md#microsoftmaps) | Simple and secure location APIs provide geospatial context to data. | [Azure Maps](https://learn.microsoft.com/azure/azure-maps/) |
> | [Microsoft.SignalRService](permissions/web-and-mobile.md#microsoftsignalrservice) | Add real-time web functionalities easily. | [Azure SignalR Service](https://learn.microsoft.com/azure/azure-signalr/) |
> | [microsoft.web](permissions/web-and-mobile.md#microsoftweb) | Quickly create and deploy mission critical web apps at scale. | [App Service](https://learn.microsoft.com/azure/app-service/)<br/>[Azure Functions](https://learn.microsoft.com/azure/azure-functions/) |

## Containers

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.ContainerInstance](permissions/containers.md#microsoftcontainerinstance) | Easily run containers on Azure without managing servers. | [Container Instances](https://learn.microsoft.com/azure/container-instances/) |
> | [Microsoft.ContainerRegistry](permissions/containers.md#microsoftcontainerregistry) | Store and manage container images across all types of Azure deployments. | [Container Registry](https://learn.microsoft.com/azure/container-registry/) |
> | [Microsoft.ContainerService](permissions/containers.md#microsoftcontainerservice) | Accelerate your containerized application development without compromising security. | [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/intro-kubernetes) |
> | [Microsoft.RedHatOpenShift](permissions/containers.md#microsoftredhatopenshift) |  | [Azure Red Hat OpenShift](https://learn.microsoft.com/azure/openshift/) |

## Databases

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.Cache](permissions/databases.md#microsoftcache) | Power applications with high-throughput, low-latency data access. | [Azure Managed Redis](https://learn.microsoft.com/azure/redis/), [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/) |
> | [Microsoft.DBforMariaDB](permissions/databases.md#microsoftdbformariadb) | Managed MariaDB database service for app developers. | [Azure Database for MariaDB](https://learn.microsoft.com/azure/mariadb/) |
> | [Microsoft.DBforMySQL](permissions/databases.md#microsoftdbformysql) | Managed MySQL database service for app developers. | [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/) |
> | [Microsoft.DBforPostgreSQL](permissions/databases.md#microsoftdbforpostgresql) | Managed PostgreSQL database service for app developers. | [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/) |
> | [Microsoft.DocumentDB](permissions/databases.md#microsoftdocumentdb) | A NoSQL document database-as-a-service. | [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) |
> | [Microsoft.InferenceService](permissions/databases.md#microsoftinferenceservice) |  |  |
> | [Microsoft.Sql](permissions/databases.md#microsoftsql) | Managed, intelligent SQL in the cloud. | [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/index)<br/>[Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/index)<br/>[Azure Synapse Analytics](https://learn.microsoft.com/azure/synapse-analytics/) |
> | [Microsoft.SqlVirtualMachine](permissions/databases.md#microsoftsqlvirtualmachine) | Host enterprise SQL Server apps in the cloud. | [SQL Server on Azure Virtual Machines](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview) |

## Analytics

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AnalysisServices](permissions/analytics.md#microsoftanalysisservices) | Enterprise-grade analytics engine as a service. | [Azure Analysis Services](https://learn.microsoft.com/azure/analysis-services/index) |
> | [Microsoft.Databricks](permissions/analytics.md#microsoftdatabricks) | Fast, easy, and collaborative Apache Spark-based analytics platform. | [Azure Databricks](https://learn.microsoft.com/azure/databricks/) |
> | [Microsoft.DataFactory](permissions/analytics.md#microsoftdatafactory) | Hybrid data integration at enterprise scale, made easy. | [Data Factory](https://learn.microsoft.com/azure/data-factory/) |
> | [Microsoft.DataLakeAnalytics](permissions/analytics.md#microsoftdatalakeanalytics) | Distributed analytics service that makes big data easy. | [Data Lake Analytics](https://learn.microsoft.com/azure/data-lake-analytics/) |
> | [Microsoft.DataLakeStore](permissions/analytics.md#microsoftdatalakestore) | Highly scalable and cost-effective data lake solution for big data analytics. | [Azure Data Lake Storage Gen2](https://learn.microsoft.com/azure/storage/blobs/data-lake-storage-introduction) |
> | [Microsoft.Fabric](permissions/analytics.md#microsoftfabric) | Unified analytics platform for data engineering, data science, and business intelligence. | [Microsoft Fabric](https://learn.microsoft.com/fabric/) |
> | [Microsoft.HDInsight](permissions/analytics.md#microsofthdinsight) | Provision cloud Hadoop, Spark, R Server, HBase, and Storm clusters. | [HDInsight](https://learn.microsoft.com/azure/hdinsight/) |
> | [Microsoft.Kusto](permissions/analytics.md#microsoftkusto) | Service for storing and running interactive analytics over Big Data. | [Azure Data Explorer](https://learn.microsoft.com/azure/data-explorer/) |
> | [Microsoft.PowerBIDedicated](permissions/analytics.md#microsoftpowerbidedicated) | Manage Power BI Premium dedicated capacities for exclusive use by an organization. | [Power BI Embedded](https://learn.microsoft.com/azure/power-bi-embedded/) |
> | [Microsoft.Purview](permissions/analytics.md#microsoftpurview) | Unified data governance and compliance solution. | [Microsoft Purview](https://learn.microsoft.com/purview/) |
> | [Microsoft.Synapse](permissions/analytics.md#microsoftsynapse) | Limitless analytics service with enterprise data warehousing and big data analytics. | [Azure Synapse Analytics](https://learn.microsoft.com/azure/synapse-analytics/) |

## AI + machine learning

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.BotService](permissions/ai-machine-learning.md#microsoftbotservice) | Intelligent, serverless bot service that scales on demand. | [Azure Bot Service](https://learn.microsoft.com/azure/bot-service/) |
> | [Microsoft.CognitiveServices](permissions/ai-machine-learning.md#microsoftcognitiveservices) | Add smart API capabilities to enable contextual interactions. | [Cognitive Services](https://learn.microsoft.com/azure/cognitive-services/) |
> | [Microsoft.HealthBot](permissions/ai-machine-learning.md#microsofthealthbot) |  | [Azure AI Health Bot](https://learn.microsoft.com/azure/health-bot/overview) |
> | [Microsoft.MachineLearningServices](permissions/ai-machine-learning.md#microsoftmachinelearningservices) | Enterprise-grade machine learning service to build and deploy models faster. | [Machine Learning](https://learn.microsoft.com/azure/machine-learning/) |
> | [Microsoft.Search](permissions/ai-machine-learning.md#microsoftsearch) | Leverage search services and get comprehensive results. | [Azure AI Search](https://learn.microsoft.com/azure/search/) |
> | [Microsoft.VideoIndexer](permissions/ai-machine-learning.md#microsoftvideoindexer) | Extract the insights from your videos using Azure AI Video Indexer video and audio models. | [Azure AI Video Indexer](https://learn.microsoft.com/azure/azure-video-indexer/) |

## Internet of Things

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AzureSphere](permissions/internet-of-things.md#microsoftazuresphere) |  | [Azure Sphere](https://learn.microsoft.com/azure-sphere/product-overview/what-is-azure-sphere) |
> | [Microsoft.DeviceRegistry](permissions/internet-of-things.md#microsoftdeviceregistry) |  |  |
> | [Microsoft.Devices](permissions/internet-of-things.md#microsoftdevices) | Ensure that your users are accessing your resources from devices that meet your standards for security and compliance. | [IoT Hub](https://learn.microsoft.com/azure/iot-hub/)<br/>[IoT Hub Device Provisioning Service](https://learn.microsoft.com/azure/iot-dps/) |
> | [Microsoft.DeviceUpdate](permissions/internet-of-things.md#microsoftdeviceupdate) |  | [Device Update for IoT Hub](https://learn.microsoft.com/azure/iot-hub-device-update/) |
> | [Microsoft.DigitalTwins](permissions/internet-of-things.md#microsoftdigitaltwins) |  | [Azure Digital Twins](https://learn.microsoft.com/azure/digital-twins/) |
> | [Microsoft.Edge](permissions/internet-of-things.md#microsoftedge) |  |  |
> | [Microsoft.EdgeMarketPlace](permissions/internet-of-things.md#microsoftedgemarketplace) |  |  |
> | [Microsoft.IoTCentral](permissions/internet-of-things.md#microsoftiotcentral) | Experience the simplicity of SaaS for IoT, with no cloud expertise required. | [IoT Central](https://learn.microsoft.com/azure/iot-central/) |
> | [Microsoft.IoTFirmwareDefense](permissions/internet-of-things.md#microsoftiotfirmwaredefense) |  | [Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/device-builders/overview) |
> | [Microsoft.IoTSecurity](permissions/internet-of-things.md#microsoftiotsecurity) |  | [IoT security](https://learn.microsoft.com/azure/iot/iot-security-architecture) |
> | [Microsoft.StreamAnalytics](permissions/internet-of-things.md#microsoftstreamanalytics) | Real-time data stream processing from millions of IoT devices. | [Stream Analytics](https://learn.microsoft.com/azure/stream-analytics/) |

## Integration

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.ApiCenter](permissions/integration.md#microsoftapicenter) |  | [Azure API Center](https://learn.microsoft.com/azure/api-center/overview) |
> | [Microsoft.ApiManagement](permissions/integration.md#microsoftapimanagement) | Easily build and consume Cloud APIs. | [API Management](https://learn.microsoft.com/azure/api-management/) |
> | [Microsoft.AppConfiguration](permissions/integration.md#microsoftappconfiguration) | Fast, scalable parameter storage for app configuration. | [Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/) |
> | [Microsoft.Communication](permissions/integration.md#microsoftcommunication) |  | [Azure Communication Services](https://learn.microsoft.com/azure/communication-services/overview) |
> | [Microsoft.DurableTask](permissions/integration.md#microsoftdurabletask) |  | [Durable Functions](https://learn.microsoft.com/azure/durable-task/durable-functions/durable-functions-overview) |
> | [Microsoft.EventGrid](permissions/integration.md#microsofteventgrid) | Get reliable event delivery at massive scale. | [Event Grid](https://learn.microsoft.com/azure/event-grid/) |
> | [Microsoft.EventHub](permissions/integration.md#microsofteventhub) | Receive telemetry from millions of devices. | [Event Hubs](https://learn.microsoft.com/azure/event-hubs/) |
> | [Microsoft.HealthcareApis](permissions/integration.md#microsofthealthcareapis) |  | [Azure API for FHIR](https://learn.microsoft.com/azure/healthcare-apis/azure-api-for-fhir/) |
> | [Microsoft.HealthDataAIServices](permissions/integration.md#microsofthealthdataaiservices) |  | [Azure Health Data Services](https://learn.microsoft.com/azure/healthcare-apis/healthcare-apis-overview) |
> | [Microsoft.Logic](permissions/integration.md#microsoftlogic) | Automate the access and use of data across clouds without writing code. | [Logic Apps](https://learn.microsoft.com/azure/logic-apps/) |
> | [Microsoft.NotificationHubs](permissions/integration.md#microsoftnotificationhubs) | Send push notifications to any platform from any back end. | [Notification Hubs](https://learn.microsoft.com/azure/notification-hubs/) |
> | [Microsoft.Relay](permissions/integration.md#microsoftrelay) | Expose services that run in your corporate network to the public cloud. | [Azure Relay](https://learn.microsoft.com/azure/azure-relay/relay-what-is-it) |
> | [Microsoft.ResourceNotifications](permissions/integration.md#microsoftresourcenotifications) |  | [Azure Event Grid](https://learn.microsoft.com/azure/event-grid/overview) |
> | [Microsoft.ServiceBus](permissions/integration.md#microsoftservicebus) | Connect across private and public cloud environments. | [Service Bus](https://learn.microsoft.com/azure/service-bus-messaging/) |
> | [Microsoft.ServicesHub](permissions/integration.md#microsoftserviceshub) |  | [Services Hub](https://learn.microsoft.com/services-hub/) |

## Identity

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AAD](permissions/identity.md#microsoftaad) | Join Azure virtual machines to a domain without domain controllers. | [Microsoft Entra Domain Services](https://learn.microsoft.com/entra/identity/domain-services/) |
> | [microsoft.aadiam](permissions/identity.md#microsoftaadiam) |  |  |
> | [Microsoft.ADHybridHealthService](permissions/identity.md#microsoftadhybridhealthservice) | Robust monitoring of your on-premises identity infrastructure. | [Microsoft Entra ID](https://learn.microsoft.com/entra/identity/) |
> | [Microsoft.AzureActiveDirectory](permissions/identity.md#microsoftazureactivedirectory) | Synchronize on-premises directories and enable single sign-on. | [Azure Active Directory B2C](https://learn.microsoft.com/azure/active-directory-b2c/) |
> | [Microsoft.ManagedIdentity](permissions/identity.md#microsoftmanagedidentity) | An automatically managed identity in Microsoft Entra ID that authenticates to any service that supports Microsoft Entra | [Managed identities for Azure resources](https://learn.microsoft.com/azure/active-directory/managed-identities-azure-resources/) |

## Security

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AppComplianceAutomation](permissions/security.md#microsoftappcomplianceautomation) |  | [App Compliance Automation Tool for Microsoft 365](https://learn.microsoft.com/microsoft-365-app-certification/docs/acat-overview) |
> | [Microsoft.Attestation](permissions/security.md#microsoftattestation) |  | Azure Attestation Service |
> | [Microsoft.DataProtection](permissions/security.md#microsoftdataprotection) |  | Data Protection |
> | [Microsoft.KeyVault](permissions/security.md#microsoftkeyvault) | Safeguard and maintain control of keys and other secrets. | [Key Vault](https://learn.microsoft.com/azure/key-vault/) |
> | [Microsoft.Security](permissions/security.md#microsoftsecurity) | Protect your enterprise from advanced threats across hybrid cloud workloads. | [Security Center](https://learn.microsoft.com/azure/security-center/) |
> | [Microsoft.SecurityInsights](permissions/security.md#microsoftsecurityinsights) |  | [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/) |

## DevOps

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.Chaos](permissions/devops.md#microsoftchaos) |  | [Azure Chaos Studio](https://learn.microsoft.com/azure/chaos-studio/) |
> | [Microsoft.DevCenter](permissions/devops.md#microsoftdevcenter) |  | [Azure Deployment Environments](https://learn.microsoft.com/azure/deployment-environments/overview-what-is-azure-deployment-environments) |
> | [Microsoft.DevOpsInfrastructure](permissions/devops.md#microsoftdevopsinfrastructure) |  | [Managed DevOps Pools](https://learn.microsoft.com/azure/devops/managed-devops-pools/overview) |
> | [Microsoft.DevTestLab](permissions/devops.md#microsoftdevtestlab) | Quickly create environments using reusable templates and artifacts. | [Azure Lab Services](https://learn.microsoft.com/azure/lab-services/) |
> | [Microsoft.LabServices](permissions/devops.md#microsoftlabservices) | Set up labs for classrooms, trials, development and testing, and other scenarios. | [Azure Lab Services](https://learn.microsoft.com/azure/lab-services/) |
> | [Microsoft.LoadTestService](permissions/devops.md#microsoftloadtestservice) |  | [Azure Load Testing](https://learn.microsoft.com/azure/load-testing/) |
> | [Microsoft.VisualStudio](permissions/devops.md#microsoftvisualstudio) | The powerful and flexible environment for developing applications in the cloud. | [Azure DevOps](https://learn.microsoft.com/azure/devops/) |

## Migration

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.DataBox](permissions/migration.md#microsoftdatabox) | Move stored or in-flight data to Azure quickly and cost-effectively. | [Azure Data Box](https://learn.microsoft.com/azure/databox/) |
> | [Microsoft.DataBoxEdge](permissions/migration.md#microsoftdataboxedge) | Appliances and solutions for data transfer to Azure and edge compute. | [Azure Stack Edge](https://learn.microsoft.com/azure/databox-online/azure-stack-edge-overview) |
> | [Microsoft.DataMigration](permissions/migration.md#microsoftdatamigration) | Simplify on-premises database migration to the cloud. | [Azure Database Migration Service](https://learn.microsoft.com/azure/dms/) |
> | [Microsoft.Migrate](permissions/migration.md#microsoftmigrate) | Easily discover, assess, right-size, and migrate your on-premises VMs to Azure. | [Azure Migrate](https://learn.microsoft.com/azure/migrate/migrate-services-overview) |
> | [Microsoft.OffAzure](permissions/migration.md#microsoftoffazure) |  | [Azure Migrate](https://learn.microsoft.com/azure/migrate/migrate-services-overview) |

## Monitor

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AlertsManagement](permissions/monitor.md#microsoftalertsmanagement) | Analyze all of the alerts in your Log Analytics repository. | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
> | [Microsoft.Dashboard](permissions/monitor.md#microsoftdashboard) |  | [Azure Managed Grafana](https://learn.microsoft.com/azure/managed-grafana/) |
> | [Microsoft.Insights](permissions/monitor.md#microsoftinsights) | Full observability into your applications, infrastructure, and network. | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
> | [microsoft.monitor](permissions/monitor.md#microsoftmonitor) |  | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
> | [Microsoft.OperationalInsights](permissions/monitor.md#microsoftoperationalinsights) |  | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |
> | [Microsoft.OperationsManagement](permissions/monitor.md#microsoftoperationsmanagement) | A simplified management solution for any enterprise. | [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) |

## Management and governance

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.Advisor](permissions/management-and-governance.md#microsoftadvisor) | Your personalized Azure best practices recommendation engine. | [Azure Advisor](https://learn.microsoft.com/azure/advisor/) |
> | [Microsoft.Authorization](permissions/management-and-governance.md#microsoftauthorization) |  | [Azure Policy](https://learn.microsoft.com/azure/governance/policy/overview)<br/>[Azure RBAC](https://learn.microsoft.com/azure/role-based-access-control/overview)<br/>[Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/) |
> | [Microsoft.Automation](permissions/management-and-governance.md#microsoftautomation) | Simplify cloud management with process automation. | [Automation](https://learn.microsoft.com/azure/automation/) |
> | [Microsoft.Billing](permissions/management-and-governance.md#microsoftbilling) | Manage your subscriptions and see usage and billing. | [Cost Management + Billing](https://learn.microsoft.com/azure/cost-management-billing/) |
> | [Microsoft.BillingBenefits](permissions/management-and-governance.md#microsoftbillingbenefits) |  | [Azure savings plans](https://learn.microsoft.com/azure/cost-management-billing/savings-plan/savings-plan-overview) |
> | [Microsoft.Blueprint](permissions/management-and-governance.md#microsoftblueprint) | Enabling quick, repeatable creation of governed environments. | [Azure Blueprints](https://learn.microsoft.com/azure/governance/blueprints/) |
> | [Microsoft.Carbon](permissions/management-and-governance.md#microsoftcarbon) |  | [Azure carbon optimization](https://learn.microsoft.com/azure/carbon-optimization/overview) |
> | [Microsoft.Consumption](permissions/management-and-governance.md#microsoftconsumption) | Programmatic access to cost and usage data for your Azure resources. | [Cost Management](https://learn.microsoft.com/azure/cost-management-billing/) |
> | [Microsoft.CostManagement](permissions/management-and-governance.md#microsoftcostmanagement) | Optimize what you spend on the cloud, while maximizing cloud potential. | [Cost Management](https://learn.microsoft.com/azure/cost-management-billing/) |
> | [Microsoft.CustomerLockbox](permissions/management-and-governance.md#microsoftcustomerlockbox) | Interface for customers to review and approve or reject customer data access requests. | [Customer Lockbox for Microsoft Azure](https://learn.microsoft.com/azure/security/fundamentals/customer-lockbox-overview) |
> | [Microsoft.Features](permissions/management-and-governance.md#microsoftfeatures) |  | [Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/) |
> | [Microsoft.GuestConfiguration](permissions/management-and-governance.md#microsoftguestconfiguration) | Audit settings inside a machine using Azure Policy. | [Azure Policy](https://learn.microsoft.com/azure/governance/policy/) |
> | [Microsoft.Intune](permissions/management-and-governance.md#microsoftintune) | Enable your workforce to be productive on all their devices, while keeping your organization's information protected. |  |
> | [Microsoft.Maintenance](permissions/management-and-governance.md#microsoftmaintenance) |  | [Azure Maintenance](https://learn.microsoft.com/azure/virtual-machines/maintenance-configurations)<br/>[Azure Update Manager](https://learn.microsoft.com/azure/update-manager/overview) |
> | [Microsoft.ManagedOps](permissions/management-and-governance.md#microsoftmanagedops) |  |  |
> | [Microsoft.ManagedServices](permissions/management-and-governance.md#microsoftmanagedservices) |  | [Azure Lighthouse](https://learn.microsoft.com/azure/lighthouse/) |
> | [Microsoft.Management](permissions/management-and-governance.md#microsoftmanagement) | Use management groups to efficiently apply governance controls and manage groups of Azure subscriptions. | [Management Groups](https://learn.microsoft.com/azure/governance/management-groups/) |
> | [Microsoft.PolicyInsights](permissions/management-and-governance.md#microsoftpolicyinsights) | Summarize policy states for the subscription level policy definition. | [Azure Policy](https://learn.microsoft.com/azure/governance/policy/) |
> | [Microsoft.Portal](permissions/management-and-governance.md#microsoftportal) | Build, manage, and monitor all Azure products in a single, unified console. | [Azure portal](https://learn.microsoft.com/azure/azure-portal/) |
> | [Microsoft.RecoveryServices](permissions/management-and-governance.md#microsoftrecoveryservices) | Hold and organize backup data for various Azure services such as IaaS VMs (Linux or Windows) and Azure SQL databases. | [Site Recovery](https://learn.microsoft.com/azure/site-recovery/) |
> | [Microsoft.ResourceGraph](permissions/management-and-governance.md#microsoftresourcegraph) | Powerful tool to query, explore, and analyze your cloud resources at scale. | [Azure Resource Graph](https://learn.microsoft.com/azure/governance/resource-graph/) |
> | [Microsoft.ResourceHealth](permissions/management-and-governance.md#microsoftresourcehealth) | Diagnose and get support for service problems that affect your Azure resources. | [Azure Service Health](https://learn.microsoft.com/azure/service-health/) |
> | [Microsoft.Resources](permissions/management-and-governance.md#microsoftresources) | Deployment and management service for Azure that enables you to create, update, and delete resources in your Azure subscription. | [Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/) |
> | [Microsoft.Solutions](permissions/management-and-governance.md#microsoftsolutions) | Find the solution to meet the needs of your application or business. | [Azure Managed Applications](https://learn.microsoft.com/azure/azure-resource-manager/managed-applications/) |
> | [Microsoft.Workloads](permissions/management-and-governance.md#microsoftworkloads) |  | [SAP on Azure](https://learn.microsoft.com/azure/sap/) |

## Hybrid + multicloud

> 
> | Resource provider | Description | Azure service |
> | --- | --- | --- |
> | [Microsoft.AzureStack](permissions/hybrid-multicloud.md#microsoftazurestack) | Build and run innovative hybrid applications across cloud boundaries. | [Azure Stack](https://learn.microsoft.com/azure-stack/) |
> | [Microsoft.AzureStackHCI](permissions/hybrid-multicloud.md#microsoftazurestackhci) |  | [Azure Local](https://learn.microsoft.com/azure-stack/hci/) |
> | [Microsoft.ExtendedLocation](permissions/hybrid-multicloud.md#microsoftextendedlocation) |  | [Custom locations](https://learn.microsoft.com/azure/azure-arc/platform/conceptual-custom-locations) |
> | [Microsoft.HybridCompute](permissions/hybrid-multicloud.md#microsofthybridcompute) |  | [Azure Arc](https://learn.microsoft.com/azure/azure-arc/) |
> | [Microsoft.HybridConnectivity](permissions/hybrid-multicloud.md#microsofthybridconnectivity) |  |  |
> | [Microsoft.HybridContainerService](permissions/hybrid-multicloud.md#microsofthybridcontainerservice) |  |  |
> | [Microsoft.Kubernetes](permissions/hybrid-multicloud.md#microsoftkubernetes) |  | [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/overview) |
> | [Microsoft.KubernetesConfiguration](permissions/hybrid-multicloud.md#microsoftkubernetesconfiguration) |  | [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/overview) |
> | [Microsoft.ResourceConnector](permissions/hybrid-multicloud.md#microsoftresourceconnector) |  |  |
> | [Microsoft.SCVMM](permissions/hybrid-multicloud.md#microsoftscvmm) |  | [Azure Arc-enabled System Center Virtual Machine Manager (SCVMM)](https://learn.microsoft.com/azure/azure-arc/system-center-virtual-machine-manager/overview) |

## Next steps

- [Match resource provider to service](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-services-resource-providers)
- [Azure built-in roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles)
- [Cloud Adoption Framework: Resource access management in Azure](https://learn.microsoft.com/azure/cloud-adoption-framework/govern/resource-consistency/resource-access-management)
