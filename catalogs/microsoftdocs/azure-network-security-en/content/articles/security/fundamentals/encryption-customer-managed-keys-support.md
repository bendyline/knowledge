---
title: Services that support customer-managed keys in Azure
description: Find services that support customer-managed keys with Azure Key Vault and Azure Key Vault Managed HSM for server-side encryption.
author: msmbaldwin
ms.author: mbaldwin
ms.date: 08/03/2026
ms.service: security
ms.subservice: security-fundamentals
ms.topic: article
ai-usage: ai-assisted
---

# Services that support customer-managed keys in Azure

Customer-managed keys (CMKs) are a key management control model in which you own and manage the key encryption key (KEK) in your own [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/) or [Azure Key Vault Managed HSM](https://learn.microsoft.com/azure/key-vault/managed-hsm/) instance. Azure services use your KEK to wrap and unwrap their data encryption keys through envelope encryption. For HSM-protected keys, use Azure Key Vault Premium tier or Azure Key Vault Managed HSM. For organizations with regulatory or contractual requirements that mandate key material physically reside outside Microsoft infrastructure, Azure Key Vault Managed HSM also supports [external key management (preview)](https://learn.microsoft.com/azure/key-vault/managed-hsm/external-key-management-overview). This feature keeps the KEK in a customer-operated HSM entirely outside Azure.

The following services support server-side encryption with customer-managed keys. For implementation details, see the service-specific documentation or the service's [Microsoft Cloud Security Benchmark: security baseline](https://learn.microsoft.com/security/benchmark/azure/security-baselines-overview) (section DP-5).

## AI and machine learning

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure AI Search](https://learn.microsoft.com/azure/search/) | Yes | Yes | [Configure customer-managed keys for data encryption in Azure AI Search](https://learn.microsoft.com/azure/search/search-security-manage-encryption-keys) |
| [Foundry Tools](https://learn.microsoft.com/azure/ai-services/) | Yes | Yes | [Customer-managed keys for encryption](https://learn.microsoft.com/azure/ai-services/encryption/cognitive-services-encryption-keys-portal) |
| [Microsoft Foundry](https://learn.microsoft.com/azure/foundry/) | Yes | Yes | [Encryption of data at rest in Foundry Tools](https://learn.microsoft.com/azure/foundry/concepts/encryption-keys-portal) |
| [Content Safety in Foundry Control Plane](https://learn.microsoft.com/azure/ai-services/content-safety/) | Yes |  | [Encryption of data at rest in Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/how-to/encrypt-data-at-rest) |
| [Azure Document Intelligence in Foundry Tools](https://learn.microsoft.com/azure/ai-services/document-intelligence/) | Yes |  | [Document Intelligence encryption of data at rest](https://learn.microsoft.com/azure/ai-services/document-intelligence/authentication/encrypt-data-at-rest) |
| [Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-services/language-service/) | Yes |  | [Language encryption of data at rest](https://learn.microsoft.com/azure/ai-services/language-service/concepts/encryption-data-at-rest) |
| [Azure Bot Service](https://learn.microsoft.com/azure/bot-service/) | Yes |  | [Encryption of bot data in Azure Bot Service](https://learn.microsoft.com/azure/bot-service/bot-service-encryption) |
| [Azure Health Bot](https://learn.microsoft.com/azure/health-bot/) | Yes |  | [Configure customer-managed keys (CMK) for Azure Health Bot](https://learn.microsoft.com/azure/health-bot/cmk) |
| [Azure Machine Learning](https://learn.microsoft.com/azure/machine-learning/) | Yes |  | [Customer-managed keys for workspace encryption in Azure Machine Learning](https://learn.microsoft.com/azure/machine-learning/concept-customer-managed-keys) |
| [Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/) | Yes | Yes | [Azure OpenAI Service encryption of data at rest](https://learn.microsoft.com/azure/ai-services/openai/encrypt-data-at-rest) |
| [Dataverse](https://learn.microsoft.com/powerapps/maker/data-platform/) | Yes | Yes | [Customer-managed keys in Dataverse](https://learn.microsoft.com/power-platform/admin/customer-managed-key) |
| [Dynamics 365](https://learn.microsoft.com/dynamics365/) | Yes | Yes | [Customer-managed keys for encryption](https://learn.microsoft.com/dynamics365/fin-ops-core/dev-itpro/sysadmin/customer-managed-keys) |
| [Azure AI Face](https://learn.microsoft.com/azure/ai-services/face/overview-identity) | Yes | Yes | [Face service encryption of data at rest](https://learn.microsoft.com/azure/ai-services/face/identity-encrypt-data-at-rest) |
| [Power Platform](https://learn.microsoft.com/power-platform/) | Yes | Yes | [Customer-managed keys in Power Platform](https://learn.microsoft.com/power-platform/admin/customer-managed-key) |
| [Custom question answering](https://learn.microsoft.com/azure/ai-services/language-service/question-answering/overview) | Yes |  | [Custom question answering encryption of data at rest](https://learn.microsoft.com/azure/ai-services/language-service/question-answering/how-to/encrypt-data-at-rest) |
| [Azure Speech in Foundry Tools](https://learn.microsoft.com/azure/ai-services/speech-service/) | Yes | Yes | [Speech service encryption of data at rest](https://learn.microsoft.com/azure/ai-services/speech-service/speech-encryption-of-data-at-rest) |
| [Azure Translator in Foundry Tools](https://learn.microsoft.com/azure/ai-services/translator/) | Yes | Yes | [Translator encryption of data at rest](https://learn.microsoft.com/azure/ai-services/translator/custom-translator/concepts/encrypt-data-at-rest) |

## Analytics

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Data Explorer](https://learn.microsoft.com/azure/data-explorer/) | Yes |  | [Configure customer-managed keys (CMK) in Azure Data Explorer](https://learn.microsoft.com/azure/data-explorer/customer-managed-keys) |
| [Azure Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml) | Yes | Yes | [Encryption with customer-managed keys for Azure Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/enable-customer-managed-key.md) |
| [Azure Data Manager for Energy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/energy-data-services/index.yml) | Yes | Yes | [Manage data security and encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/energy-data-services/how-to-manage-data-security-and-encryption.md) |
| [Azure Databricks](https://learn.microsoft.com/azure/databricks/) | Yes | Yes | [Customer-managed keys for managed services](https://learn.microsoft.com/azure/databricks/security/keys/cmk-managed-services-azure/customer-managed-key-managed-services-azure) |
| [Azure HDInsight](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/index.yml) | Yes |  | [Azure HDInsight double encryption for data at rest](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/disk-encryption.md) |
| [Azure Monitor Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview) | Yes |  | [Customer-managed keys in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/logs/customer-managed-keys) |
| [Azure Monitor Log Analytics](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) | Yes | Yes | [Customer-managed keys in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/logs/customer-managed-keys) |
| [Azure Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/index.yml) | Yes* | Yes | [Data protection in Azure Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/data-protection.md) |
| [Azure Synapse Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/index.yml) | Yes (RSA 3072-bit) | Yes | [Configure encryption at rest with customer-managed keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/security/workspaces-encryption.md) |
| [Microsoft Fabric](https://learn.microsoft.com/fabric) | Yes | Yes | [Customer-managed key (CMK) encryption and Microsoft Fabric](https://learn.microsoft.com/fabric/security/security-scenario#customer-managed-key-cmk-encryption-and-microsoft-fabric) |
| [Power BI Embedded](https://learn.microsoft.com/power-bi) | Yes |  | [Using your own key for Power BI encryption (Preview)](https://learn.microsoft.com/power-bi/enterprise/service-encryption-byok) |

## Containers

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Kubernetes Service](https://learn.microsoft.com/azure/aks/) | Yes | Yes | [Enable host encryption on your AKS cluster nodes](https://learn.microsoft.com/azure/aks/enable-host-encryption) |
| [Azure Red Hat OpenShift](https://learn.microsoft.com/azure/openshift/) | Yes | Yes | [Bring your own keys (BYOK) with Azure Red Hat OpenShift](https://learn.microsoft.com/azure/openshift/howto-byok) |
| [Container Instances](https://learn.microsoft.com/azure/container-instances/) | Yes |  | [Encrypt data with a customer-managed key](https://learn.microsoft.com/azure/container-instances/container-instances-encrypt-data#encrypt-data-with-a-customer-managed-key) |
| [Container Registry](https://learn.microsoft.com/azure/container-registry/) | Yes |  | [Encrypt container images with a customer-managed key](https://learn.microsoft.com/azure/container-registry/container-registry-customer-managed-keys) |

## Compute

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml) | Yes\* | Yes | [Configure customer-managed keys for App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/configure-encrypt-at-rest-using-cmk.md) |
| [Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml) | Yes\* | Yes | [Configure customer-managed keys for Azure Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/configure-encrypt-at-rest-using-cmk.md) |
| [Azure Load Testing](https://learn.microsoft.com/azure/load-testing/) | Yes |  | [Configure customer-managed keys for Azure Load Testing](https://learn.microsoft.com/azure/load-testing/how-to-configure-customer-managed-keys) |
| [Azure Managed Applications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/index.yml) | Yes\* | Yes | [Azure managed applications overview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/overview.md) |
| [Azure portal](https://learn.microsoft.com/azure/azure-portal/) | Yes\* | Yes | [Security in the Azure portal](overview.md) |
| [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) | Yes | Yes | [Configure customer-managed keys in Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/configure-customer-managed-keys.md) |
| [Batch](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/index.yml) | Yes |  | [Use customer-managed keys with Batch accounts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/batch-customer-managed-key.md) |
| [SAP HANA](https://learn.microsoft.com/azure/sap/large-instances/hana-overview-architecture) | Yes |  |  |
| [Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/index.yml) | Yes |  | [Enable replication with customer-managed keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/azure-to-azure-how-to-enable-replication-cmk-disks.md) |
| [Virtual Machine Scale Set](https://learn.microsoft.com/azure/virtual-machine-scale-sets/) | Yes | Yes | [Overview of managed disk encryption options](https://learn.microsoft.com/azure/virtual-machines/disk-encryption-overview) |
| [Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/) | Yes | Yes | [Overview of managed disk encryption options](https://learn.microsoft.com/azure/virtual-machines/disk-encryption-overview) |

## Databases

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/) | Yes | Yes | [Configure customer-managed keys using Azure Key Vault](https://learn.microsoft.com/azure/cosmos-db/how-to-setup-customer-managed-keys), [Configure customer-managed keys using Azure Key Vault Managed HSM](https://learn.microsoft.com/azure/cosmos-db/how-to-setup-customer-managed-keys-mhsm) |
| [Azure DocumentDB (with MongoDB compatibility)](https://learn.microsoft.com/azure/documentdb/) | Yes |  | [Configure customer-managed key (CMK) for data encryption at rest for an Azure DocumentDB cluster](https://learn.microsoft.com/azure/documentdb/how-to-data-encryption) |
| [Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/) | Yes | Yes | [Data encryption with customer-managed keys in Azure Database for MySQL - Flexible Server](https://learn.microsoft.com/azure/mysql/flexible-server/security-customer-managed-key) |
| [Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/azure/postgresql/flexible-server/) | Yes | Yes | [Data encryption with customer-managed keys in Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/azure/postgresql/security/security-data-encryption) |
| [Azure Managed Instance for Apache Cassandra](https://learn.microsoft.com/azure/managed-instance-apache-cassandra/) | Yes |  | [Configure customer-managed keys for encryption](https://learn.microsoft.com/azure/managed-instance-apache-cassandra/customer-managed-keys) |
| [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/) | Yes (RSA 3072-bit) | Yes | [Bring your own key (BYOK) support for Transparent Data Encryption (TDE)](https://learn.microsoft.com/azure/azure-sql/database/transparent-data-encryption-byok-overview) |
| [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/) | Yes (RSA 3072-bit) | Yes | [Bring your own key (BYOK) support for Transparent Data Encryption (TDE)](https://learn.microsoft.com/azure/azure-sql/database/transparent-data-encryption-byok-overview) |
| [SQL Server on Azure VM](https://learn.microsoft.com/azure/azure-sql/virtual-machines/) | Yes |  | [Configure Azure Key Vault integration for SQL Server on Azure VMs](https://learn.microsoft.com/azure/azure-sql/virtual-machines/windows/azure-key-vault-integration-configure) |
| [SQL Server on Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/windows/sql/) | Yes |  | [Transparent data encryption for SQL Server on Azure VM](https://learn.microsoft.com/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-security#transparent-data-encryption) |
| [Table Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/index.yml) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |

## Hybrid + multicloud

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Stack Edge](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/index.yml) | Yes |  | [Protect data at rest on Azure Stack Edge Pro R](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/azure-stack-edge-pro-r-security.md#protect-data-at-rest) |

## Integration

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Fluid Relay](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-fluid-relay/index.yml) | Yes | Yes | [Customer-managed keys for Azure Fluid Relay](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-fluid-relay/concepts/customer-managed-keys.md) |
| [Azure Health Data Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/index.yml) | Yes | Yes | [Configure customer-managed keys for Azure Health Data Services DICOM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/dicom/configure-customer-managed-keys.md), [Configure customer-managed keys for Azure Health Data Services FHIR](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/fhir/configure-customer-managed-keys.md) |
| [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/index.yml) | Yes | Yes | [Configure customer-managed keys for encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/configure-customer-managed-key.md) |
| [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml) | Yes |  |  |
| [Service Bus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/index.yml) | Yes | Yes | [Configure customer-managed keys for encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/configure-customer-managed-key.md) |

## IoT services

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Device Update for IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub-device-update/index.yml) | Yes | Yes | [Data encryption for Device Update for IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub-device-update/device-update-data-encryption.md) |
| [IoT Hub Device Provisioning](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-dps/index.yml) | Yes |  |  |

## Management and governance

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [App Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/index.yml) | Yes | Yes | [Use customer-managed keys to encrypt data](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/concept-customer-managed-keys.md) |
| [Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/index.yml) | Yes |  | [Encryption of automation assets](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/automation-secure-asset-encryption.md) |
| [Azure Chaos Studio](https://learn.microsoft.com/azure/chaos-studio/) | Yes |  | [Configure customer-managed keys for Azure Chaos Studio](https://learn.microsoft.com/azure/chaos-studio/chaos-studio-configure-customer-managed-keys) |
| [Azure Migrate](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/index.yml) | Yes |  | [Tutorial: Migrate VMware VMs to Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/tutorial-migrate-vmware.md) |
| [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor) | Yes | Yes | [Customer-managed keys in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/logs/customer-managed-keys) |

## Security

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Azure Information Protection](https://learn.microsoft.com/azure/information-protection/) | Yes | Yes | [How are the Azure Rights Management cryptographic keys managed and secured?](https://learn.microsoft.com/purview/rights-management-how-does-it-work#how-the-cryptographic-keys-are-stored-and-secured) |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/) | Yes | Yes | [Customer-managed keys in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/logs/customer-managed-keys) |
| [Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/) | Yes |  |  |
| [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/) | Yes | Yes | [Encryption at rest in Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/customer-managed-keys) |

## Storage

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Archive Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/archive-blob.md) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Azure Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/index.yml) | Yes | Yes | [Encrypt backup data using customer-managed keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/encryption-at-rest-with-cmk.md) |
| [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/) | Yes\*\* | Yes | [Configure disk encryption for Azure Cache for Redis instances using customer-managed keys](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-how-to-encryption) |
| [Azure Data Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/index.yml) | Yes |  | [Use a customer-managed key to secure your Data Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/data-box-customer-managed-encryption-key-portal.md) |
| [Azure Elastic SAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/elastic-san/index.yml) | Yes |  | [Configure customer-managed keys for Azure Elastic SAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/elastic-san/elastic-san-configure-customer-managed-keys.md) |
| [Azure Import/Export](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/index.yml) | Yes |  | [Use customer-managed keys for Azure Import/Export service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/storage-import-export-encryption-key-portal.md) |
| [Azure Managed Lustre](https://learn.microsoft.com/azure/azure-managed-lustre/) | Yes |  | [Use customer-managed encryption keys with Azure Managed Lustre](https://learn.microsoft.com/azure/azure-managed-lustre/customer-managed-encryption-keys) |
| [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/index.yml) | Yes | Yes | [Configure customer-managed keys for Azure NetApp Files volume encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/configure-customer-managed-keys.md?tabs=azure-portal) |
| [Blob Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/index.yml) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Data Lake Storage Gen2](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-introduction.md) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Disk Storage](https://learn.microsoft.com/azure/virtual-machines/disks-types/) | Yes | Yes | [Encryption at host for Windows and Linux VMs](https://learn.microsoft.com/azure/virtual-machines/disk-encryption#customer-managed-keys) |
| [File Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/index.yml) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [File Sync](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/file-sync-introduction.md) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Managed Disk Storage](https://learn.microsoft.com/azure/virtual-machines/disks-types/) | Yes | Yes | [Encryption at host for Windows and Linux VMs](https://learn.microsoft.com/azure/virtual-machines/disk-encryption#customer-managed-keys) |
| [Premium Blob Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/index.yml) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Queue Storage](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/queues/index.yml) | Yes | Yes | [Customer-managed keys for Azure Storage encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/customer-managed-keys-overview.md) |
| [Ultra Disk Storage](https://learn.microsoft.com/azure/virtual-machines/disks-types/) | Yes | Yes | [Encryption at host for Windows and Linux VMs](https://learn.microsoft.com/azure/virtual-machines/disk-encryption#customer-managed-keys) |

## Other

| Product, feature, or service | Key Vault | Managed HSM | Documentation |
| --- | --- | --- | --- |
| [Universal Print](https://learn.microsoft.com/universal-print/) | Yes | Yes | [Data encryption in Universal Print](https://learn.microsoft.com/universal-print/data-handling) |

## Caveats

\* This service supports storing data in your own Azure Key Vault, storage account, or other data-persisting service that already supports server-side encryption with a customer-managed key.

\*\* Any transient data stored temporarily on disk such as page files or swap files are encrypted with a Microsoft key (all tiers) or a customer-managed key (using the Enterprise and Enterprise Flash tiers). For more information, see [Configure disk encryption in Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-how-to-encryption).

## Related content

- [Data encryption models in Microsoft Azure](encryption-models.md)
- [How encryption is used in Azure](encryption-overview.md)
- [Double encryption](double-encryption.md)
