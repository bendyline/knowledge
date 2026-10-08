---
title: Azure and other Microsoft cloud services compliance scope
description: FedRAMP & DoD compliance scope for Azure, Dynamics 365, Microsoft 365, and Power Platform for Azure, Azure Government, & Azure Government Secret.
author: Jain-Garima
ms.author: eliotgra
ms.topic: article
ms.service: azure-government
ms.custom: references_regions
recommendations: false
ms.date: 9/21/2026
---

# Azure, Dynamics 365, Microsoft 365, and Power Platform services compliance scope

Microsoft Azure cloud environments meet demanding US government compliance requirements that produce formal authorizations, including:

- [Federal Risk and Authorization Management Program](https://www.fedramp.gov/) (FedRAMP)
- Department of Defense (DoD) Cloud Computing [Security Requirements Guide](https://public.cyber.mil/dccs/dccs-documents/) (SRG) Impact Level (IL) 2, 4, 5, and 6
- [Joint Special Access Program (SAP) Implementation Guide (JSIG)](https://www.dcsa.mil/portals/91/documents/ctp/nao/JSIG_2016April11_Final_(53Rev4).pdf)

**Azure** (also known as Azure Commercial, Azure Public, or Azure Global) maintains the following authorizations that pertain to all Azure public regions in the United States:

- [FedRAMP High](https://learn.microsoft.com/azure/compliance/offerings/offering-fedramp) Provisional Authorization to Operate (P-ATO) issued by the FedRAMP Joint Authorization Board (JAB)
- [DoD IL2](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il2) Provisional Authorization (PA) issued by the Defense Information Systems Agency (DISA)

**Azure Government** maintains the following authorizations that pertain to Azure Government regions US Gov Arizona, US Gov Texas, and US Gov Virginia (US Gov regions):

- [FedRAMP High](https://learn.microsoft.com/azure/compliance/offerings/offering-fedramp) P-ATO issued by the JAB
- [DoD IL2](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il2) PA issued by DISA
- [DoD IL4](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il4) PA issued by DISA
- [DoD IL5](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il5) PA issued by DISA

For current Azure Government regions and available services, see [Products available by region](https://go.microsoft.com/fwlink/?linkid=2274941&clcid=0x409).

> **Note:**
>
> - Some Azure services deployed in Azure Government regions US Gov Arizona, US Gov Texas, and US Gov Virginia (US Gov regions) require extra configuration to meet DoD IL5 compute and storage isolation requirements, as explained in **[Isolation guidelines for Impact Level 5 workloads](../documentation-government-impact-level-5.md).**
> - For DoD IL5 PA compliance scope in Azure Government regions US DoD Central and US DoD East (US DoD regions), see **[US DoD regions IL5 audit scope](../documentation-government-overview-dod.md#us-dod-regions-il5-audit-scope).**
> - For full list of M365 GCC high services authorized for FedRAMP High, see **[Microsoft Office 365 GCC High FedRAMP Marketplace](https://marketplace.fedramp.gov/products/MSO365MT)**. Azure Communication Services operates under the same infrastructure that powers Microsoft Teams and obtained FedRAMP High accreditation as part of the M365 GCC-High service offering.

**Azure Government Secret** maintains:

- [DoD IL6](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il6) PA issued by DISA
- [JSIG PL3](https://learn.microsoft.com/azure/compliance/offerings/offering-jsig) ATO (for authorization details, contact your Microsoft account representative)

**Azure Government Top Secret** maintains:

- [ICD 503](https://learn.microsoft.com/azure/compliance/offerings/offering-icd-503) ATO with facilities at ICD 705 (for authorization details, contact your Microsoft account representative)
- [JSIG PL3](https://learn.microsoft.com/azure/compliance/offerings/offering-jsig) ATO (for authorization details, contact your Microsoft account representative)

This article provides a detailed list of Azure, Dynamics 365, Microsoft 365, and Power Platform cloud services in scope for FedRAMP High, DoD IL2, DoD IL4, DoD IL5, and DoD IL6 authorizations across Azure, Azure Government, and Azure Government Secret cloud environments. For other authorization details in Azure Government Secret and Azure Government Top Secret, contact your Microsoft account representative.

## Azure public services by audit scope
*Last updated: February 2026*

### Terminology used

- FedRAMP High = FedRAMP High Provisional Authorization to Operate (P-ATO) in Azure
- DoD IL2 = DoD SRG Impact Level 2 Provisional Authorization (PA) in Azure
- &#x2705; = service is included in audit scope and has been authorized

| Service | FedRAMP High | DoD IL2 |
| --- | :---: | :---: |
| [Advisor](https://learn.microsoft.com/azure/advisor/) | &#x2705; | &#x2705; |
| [AI Builder](https://learn.microsoft.com/ai-builder/) | &#x2705; | &#x2705; |
| [Analysis Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/analysis-services/index.yml) | &#x2705; | &#x2705; |
| [API Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/index.yml) | &#x2705; | &#x2705; |
| [App Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/index.yml) | &#x2705; | &#x2705; |
| [App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml) | &#x2705; | &#x2705; |
| [Application Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/index.yml) | &#x2705; | &#x2705; |
| [Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/index.yml) | &#x2705; | &#x2705; |
| [Microsoft Entra ID (Free)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md#what-are-the-azure-ad-licenses) **&ast;** | &#x2705; | &#x2705; |
| [Microsoft Entra ID (P1 + P2)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md#what-are-the-azure-ad-licenses) | &#x2705; | &#x2705; |
| [Azure Active Directory B2C](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/index.yml) | &#x2705; | &#x2705; |
| [Microsoft Entra Domain Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-domain-services/index.yml) | &#x2705; | &#x2705; |
| [Microsoft Entra provisioning service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/app-provisioning/how-provisioning-works.md) | &#x2705; | &#x2705; |
| [Microsoft Entra multifactor authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/authentication/concept-mfa-howitworks.md) | &#x2705; | &#x2705; |
| [Azure Health Data Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/) | &#x2705; | &#x2705; |
| [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/) | &#x2705; | &#x2705; |
| [Azure Arc-enabled SQL Server](https://learn.microsoft.com/sql/sql-server/azure-arc/overview) | &#x2705; | &#x2705; |
| [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/) | &#x2705; | &#x2705; |
| [Azure Cosmos DB (Including DocumentDB)](https://learn.microsoft.com/azure/cosmos-db/) | &#x2705; | &#x2705; |
| [Azure Container Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/container-apps/index.yml) | &#x2705; | &#x2705; |
| [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/) | &#x2705; | &#x2705; |
| [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/) | &#x2705; | &#x2705; |
| [Azure Databricks](https://learn.microsoft.com/azure/databricks/) **&ast;&ast;** | &#x2705; | &#x2705; |
| [Azure Fluid Relay](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-fluid-relay/index.yml) | &#x2705; | &#x2705; |
| [Azure for Education](https://azureforeducation.microsoft.com/) | &#x2705; | &#x2705; |
| [Azure Information Protection](https://learn.microsoft.com/azure/information-protection/) | &#x2705; | &#x2705; |
| [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/) | &#x2705; | &#x2705; |
| [Azure Load Testing](https://learn.microsoft.com/azure/load-testing/) | &#x2705; | &#x2705; |
| [Azure Managed Grafana](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/index.yml) | &#x2705; | &#x2705; |
| [Azure Marketplace portal](https://azuremarketplace.microsoft.com/) | &#x2705; | &#x2705; |
| [Azure Maps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-maps/index.yml) | &#x2705; | &#x2705; |
| [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) (incl. [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview), [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs), and [Application Change Analysis](https://learn.microsoft.com/azure/azure-monitor/app/change-analysis)) | &#x2705; | &#x2705; |
| [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/) | &#x2705; | &#x2705; |
| [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml) | &#x2705; | &#x2705; |
| [Azure Policy's guest configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/machine-configuration/overview.md) | &#x2705; | &#x2705; |
| [Azure Red Hat OpenShift](https://learn.microsoft.com/azure/openshift/) | &#x2705; | &#x2705; |
| [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/index.yml) | &#x2705; | &#x2705; |
| [Azure Service Manager (RDFE)](https://learn.microsoft.com/previous-versions/azure/ee460799\(v=azure.100\)) | &#x2705; | &#x2705; |
| [Azure Sign-up portal](https://signup.azure.com/) | &#x2705; | &#x2705; |
| [Azure Sphere](https://learn.microsoft.com/azure-sphere/) | &#x2705; | &#x2705; |
| [Azure Spring Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/spring-apps/index.yml) | &#x2705; | &#x2705; |
| [Azure Stack Edge](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/index.yml) (formerly Data Box Edge) **&ast;&ast;&ast;** | &#x2705; | &#x2705; |
| [Azure Local](https://learn.microsoft.com/azure-stack/hci/) **&ast;&ast;&ast;** | &#x2705; | &#x2705; |
| [Azure Static WebApps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/static-web-apps/index.yml) | &#x2705; | &#x2705; |
| [Azure Update Manager](https://learn.microsoft.com/azure/update-manager/) | &#x2705; | &#x2705; |
| [Azure Video Indexer](https://learn.microsoft.com/azure/azure-video-indexer/) | &#x2705; | &#x2705; |
| [Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/) (formerly Windows Virtual Desktop) | &#x2705; | &#x2705; |
| [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) | &#x2705; | &#x2705; |
| [Azure Web PubSub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/index.yml) | &#x2705; | &#x2705; |
| [Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/index.yml) | &#x2705; | &#x2705; |
| [Bastion](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Batch](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/index.yml) | &#x2705; | &#x2705; |
| [Blueprints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/blueprints/index.yml) | &#x2705; | &#x2705; |
| [Bot Service](https://learn.microsoft.com/azure/bot-service/) | &#x2705; | &#x2705; |
| [Cloud Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services/index.yml) | &#x2705; | &#x2705; |
| [Cloud Services Extended Support](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services-extended-support/index.yml) | &#x2705; | &#x2705; |
| [Cloud Shell](../../cloud-shell/overview.md) | &#x2705; | &#x2705; |
| [Azure AI Health Bot](https://learn.microsoft.com/healthbot/) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Search](https://learn.microsoft.com/azure/search/) (formerly Azure Cognitive Search) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Anomaly Detector](https://learn.microsoft.com/azure/ai-services/anomaly-detector/) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Computer Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Content Moderator](https://learn.microsoft.com/azure/ai-services/content-moderator/) | &#x2705; | &#x2705; |
| [Foundry Tools: Containers](https://learn.microsoft.com/azure/ai-services/cognitive-services-container-support) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Custom Vision](https://learn.microsoft.com/azure/ai-services/custom-vision-service/) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Face](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-identity) | &#x2705; | &#x2705; |
| [Foundry: Language Understanding (LUIS)](https://learn.microsoft.com/azure/ai-services/luis/) </br> (part of [Azure Language in Foundry Tools](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; |
| [Foundry: Azure AI Personalizer](https://learn.microsoft.com/azure/ai-services/personalizer/) | &#x2705; | &#x2705; |
| [Foundry: Azure AI QnA Maker](https://learn.microsoft.com/azure/ai-services/qnamaker/) </br> (part of [Language](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Foundry: Azure Speech in Foundry Tools](https://learn.microsoft.com/azure/ai-services/speech-service/) | &#x2705; | &#x2705; |
| [Foundry Tools: Text Analytics](https://learn.microsoft.com/azure/ai-services/language-service/concepts/migrate#do-i-need-to-migrate-to-the-language-service-if-i-am-using-text-analytics) <br> (part of [Language](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; |
| [Foundry: Azure Translator in Foundry Tools](https://learn.microsoft.com/azure/ai-services/translator/) | &#x2705; | &#x2705; |
| [Container Instances](https://learn.microsoft.com/azure/container-instances/) | &#x2705; | &#x2705; |
| [Container Registry](https://learn.microsoft.com/azure/container-registry/) | &#x2705; | &#x2705; |
| [Content Delivery Network (CDN)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/index.yml) | &#x2705; | &#x2705; |
| [Cost Management and Billing](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) | &#x2705; | &#x2705; |
| [Customer Lockbox](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/customer-lockbox-overview.md) | &#x2705; | &#x2705; |
| [Data Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/index.yml) **&ast;&ast;&ast;** | &#x2705; | &#x2705; |
| [Data Explorer](https://learn.microsoft.com/azure/data-explorer/) | &#x2705; | &#x2705; |
| [Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml) | &#x2705; | &#x2705; |
| [Data Share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-share/index.yml) | &#x2705; | &#x2705; |
| [Database Migration Service](https://learn.microsoft.com/azure/dms/) | &#x2705; | &#x2705; |
| [Dataverse](https://learn.microsoft.com/powerapps/maker/data-platform/) (incl. [Azure Synapse Link for Dataverse](https://learn.microsoft.com/powerapps/maker/data-platform/export-to-data-lake)) | &#x2705; | &#x2705; |
| [DDoS Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Dedicated HSM](https://learn.microsoft.com/azure/dedicated-hsm/) | &#x2705; | &#x2705; |
| [DevTest Labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/devtest-labs/index.yml) | &#x2705; | &#x2705; |
| [DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/index.yml) | &#x2705; | &#x2705; |
| [Omnichannel for Customer Service (Formerly Dynamics 365 Chat and Omnichannel Engagement Hub)](https://learn.microsoft.com/dynamics365/omnichannel/introduction-omnichannel) | &#x2705; | &#x2705; |
| [Dynamics 365 Commerce](https://learn.microsoft.com/dynamics365/commerce/) | &#x2705; | &#x2705; |
| [Dynamics 365 Contact Center](https://learn.microsoft.com/dynamics365/contact-center) | &#x2705; | &#x2705; |
| [Dynamics 365 Customer Service](https://learn.microsoft.com/dynamics365/customer-service/overview) | &#x2705; | &#x2705; |
| [Dynamics 365 Field Service](https://learn.microsoft.com/dynamics365/field-service/overview) | &#x2705; | &#x2705; |
| [Dynamics 365 Finance](https://learn.microsoft.com/dynamics365/finance/) | &#x2705; | &#x2705; |
| [Dynamics 365 Fraud Protection](https://learn.microsoft.com/dynamics365/fraud-protection/) | &#x2705; | &#x2705; |
| [Dynamics 365 Guides](https://learn.microsoft.com/dynamics365/mixed-reality/guides/) | &#x2705; | &#x2705; |
| [Dynamics 365 Sales](https://learn.microsoft.com/dynamics365/sales/help-hub) | &#x2705; | &#x2705; |
| [Dynamics 365 Human Resources](https://learn.microsoft.com/dynamics365/human-resources/) | &#x2705; | &#x2705; |
| [Dynamics 365 Intelligent Order Management](https://learn.microsoft.com/dynamics365/intelligent-order-management/) | &#x2705; | &#x2705; |
| [Dynamics 365 Project Operations](https://learn.microsoft.com/dynamics365/project-operations/) | &#x2705; | &#x2705; |
| [Dynamics 365 Sales Professional](https://learn.microsoft.com/dynamics365/sales/overview#dynamics-365-sales-professional) | &#x2705; | &#x2705; |
| [Dynamics 365 Sales Insights](https://learn.microsoft.com/dynamics365/sales/digital-selling) | &#x2705; | &#x2705; |
| [Dynamics 365 Supply Chain Management](https://learn.microsoft.com/dynamics365/supply-chain/) | &#x2705; | &#x2705; |
| [Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/index.yml) | &#x2705; | &#x2705; |
| [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/index.yml) | &#x2705; | &#x2705; |
| [ExpressRoute](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [File Sync](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/index.yml) | &#x2705; | &#x2705; |
| [Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/index.yml) | &#x2705; | &#x2705; |
| [Firewall Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall-manager/index.yml) | &#x2705; | &#x2705; |
| [Azure Document Intelligence in Foundry Tools](https://learn.microsoft.com/azure/ai-services/document-intelligence/) | &#x2705; | &#x2705; |
| [Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml) | &#x2705; | &#x2705; |
| [Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml) | &#x2705; | &#x2705; |
| [Global Secure Access](https://learn.microsoft.com/entra/global-secure-access/) | &#x2705; | &#x2705; |
| [HDInsight](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/index.yml) | &#x2705; | &#x2705; |
| [HPC Cache](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hpc-cache/index.yml) | &#x2705; | &#x2705; |
| [Immersive Reader](https://learn.microsoft.com/azure/ai-services/immersive-reader/) | &#x2705; | &#x2705; |
| [Import/Export](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/index.yml) | &#x2705; | &#x2705; |
| [Internet Analyzer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/internet-analyzer/index.yml) | &#x2705; | &#x2705; |
| [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/index.yml) | &#x2705; | &#x2705; |
| [Key Vault](https://learn.microsoft.com/azure/key-vault/) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Lab Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/index.yml) | &#x2705; | &#x2705; |
| [Lighthouse](https://learn.microsoft.com/azure/lighthouse/) | &#x2705; | &#x2705; |
| [Load Balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/index.yml) | &#x2705; | &#x2705; |
| [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml) | &#x2705; | &#x2705; |
| [Machine Learning](https://learn.microsoft.com/azure/machine-learning/) | &#x2705; | &#x2705; |
| [Managed Applications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/index.yml) | &#x2705; | &#x2705; |
| [Media Services](https://learn.microsoft.com/azure/media-services/) | &#x2705; | &#x2705; |
| [Metrics Advisor](https://learn.microsoft.com/azure/ai-services/metrics-advisor/) | &#x2705; | &#x2705; |
| [Microsoft Azure Attestation](https://learn.microsoft.com/azure/attestation/) | &#x2705; | &#x2705; |
| [Microsoft Azure portal](https://azure.microsoft.com/features/azure-portal/) | &#x2705; | &#x2705; |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/) (formerly Azure Security Center) | &#x2705; | &#x2705; |
| [Microsoft Defender for Cloud Apps](https://learn.microsoft.com/defender-cloud-apps/) (formerly Microsoft Cloud App Security) | &#x2705; | &#x2705; |
| [Microsoft Defender for Endpoint](https://learn.microsoft.com/microsoft-365/security/defender-endpoint/) (formerly Microsoft Defender Advanced Threat Protection) | &#x2705; | &#x2705; |
| [Microsoft Defender for Identity](https://learn.microsoft.com/defender-for-identity/) (formerly Azure Advanced Threat Protection) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/) (formerly Azure Security for IoT) | &#x2705; | &#x2705; |
| [Microsoft Defender Vulnerability Management](https://learn.microsoft.com/microsoft-365/security/defender-vulnerability-management/) | &#x2705; | &#x2705; |
| [Microsoft Defender Threat Intelligence](https://learn.microsoft.com/defender/threat-intelligence/what-is-microsoft-defender-threat-intelligence-defender-ti) | &#x2705; | &#x2705; |
| [Microsoft Entra ID Governance](https://learn.microsoft.com/entra/id-governance/) | &#x2705; | &#x2705; |
| [Microsoft Fabric](https://learn.microsoft.com/fabric/) | &#x2705; | &#x2705; |
| [Microsoft Graph](https://learn.microsoft.com/graph/) | &#x2705; | &#x2705; |
| [Microsoft Intune](https://learn.microsoft.com/mem/intune/) | &#x2705; | &#x2705; |
| [Microsoft Managed Desktop](https://learn.microsoft.com/previous-versions/managed-desktop/overview/service-plan) | &#x2705; | &#x2705; |
| [Microsoft Pin Reset Service](https://learn.microsoft.com/windows/security/identity-protection/hello-for-business/pin-reset) | &#x2705; | &#x2705; |
| [Microsoft Purview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/index.yml) (incl. Data Map, Data Estate Insights, and governance portal) | &#x2705; | &#x2705; |
| [Microsoft Secure Score](https://learn.microsoft.com/defender-xdr/microsoft-secure-score/) | &#x2705; | &#x2705; |
| [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/) (formerly Azure Sentinel) | &#x2705; | &#x2705; |
| [Microsoft Security Copilot](https://learn.microsoft.com/copilot/security/) | &#x2705; | &#x2705; |
| [Microsoft Stream](https://learn.microsoft.com/stream/) | &#x2705; | &#x2705; |
| [Microsoft Threat Experts](https://learn.microsoft.com/microsoft-365/security/defender-endpoint/microsoft-threat-experts) | &#x2705; | &#x2705; |
| [Migrate](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/index.yml) | &#x2705; | &#x2705; |
| [Network Watcher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/index.yml) (incl. [Traffic Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/traffic-analytics.md)) | &#x2705; | &#x2705; |
| [Notification Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/index.yml) | &#x2705; | &#x2705; |
| [Open Datasets](https://learn.microsoft.com/azure/open-datasets/) | &#x2705; | &#x2705; |
| [Peering Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/peering-service/index.yml) | &#x2705; | &#x2705; |
| [Planned Maintenance for VMs](https://learn.microsoft.com/azure/virtual-machines/maintenance-and-updates) | &#x2705; | &#x2705; |
| [Power Apps](https://learn.microsoft.com/powerapps/) | &#x2705; | &#x2705; |
| [Power Pages](https://powerapps.microsoft.com/portals/) (formerly PowerApps Portal) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Power Automate](https://learn.microsoft.com/power-automate/) (formerly Microsoft Flow) | &#x2705; | &#x2705; |
| [Power BI](https://learn.microsoft.com/power-bi/fundamentals/) | &#x2705; | &#x2705; |
| [Power BI Embedded](https://learn.microsoft.com/power-bi/developer/embedded/) | &#x2705; | &#x2705; |
| [Power Data Integrator for Dataverse](https://learn.microsoft.com/power-platform/admin/data-integrator) (formerly Dynamics 365 Integrator App) | &#x2705; | &#x2705; |
| [Microsoft Copilot Studio](https://learn.microsoft.com/power-virtual-agents/) | &#x2705; | &#x2705; |
| [Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/index.yml) | &#x2705; | &#x2705; |
| [Public IP](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/public-ip-addresses.md) | &#x2705; | &#x2705; |
| [Resource Graph](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/resource-graph/index.yml) | &#x2705; | &#x2705; |
| [Resource Mover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/resource-mover/index.yml) | &#x2705; | &#x2705; |
| [Route Server](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/index.yml) | &#x2705; | &#x2705; |
| [Scheduler](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/scheduler/index.yml) (replaced by [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml)) | &#x2705; | &#x2705; |
| [Service Bus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/index.yml) | &#x2705; | &#x2705; |
| [Service Connector](https://learn.microsoft.com/azure/service-connector/) | &#x2705; | &#x2705; |
| [Service Fabric](https://learn.microsoft.com/azure/service-fabric/) | &#x2705; | &#x2705; |
| [Service Health](https://learn.microsoft.com/azure/service-health/) | &#x2705; | &#x2705; |
| [SignalR Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/index.yml) | &#x2705; | &#x2705; |
| [SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview) | &#x2705; | &#x2705; |
| [SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) | &#x2705; | &#x2705; |
| [SQL Server Stretch Database](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/sql-server-stretch-database/index.yml) | &#x2705; | &#x2705; |
| [Storage: Archive](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/access-tiers-overview.md) | &#x2705; | &#x2705; |
| [Storage: Blobs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/index.yml) (incl. [Azure Data Lake Storage Gen2](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-introduction.md)) | &#x2705; | &#x2705; |
| [Storage: Disks (incl. managed disks)](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview) | &#x2705; | &#x2705; |
| [Storage: Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/index.yml) | &#x2705; | &#x2705; |
| [Storage: Queues](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/queues/index.yml) | &#x2705; | &#x2705; |
| [Storage: Tables](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/index.yml) | &#x2705; | &#x2705; |
| [StorSimple](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storsimple/index.yml) | &#x2705; | &#x2705; |
| [Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/index.yml) | &#x2705; | &#x2705; |
| [Synapse Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/index.yml) | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** |
| [Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/index.yml) | &#x2705; | &#x2705; |
| [Virtual Machine Scale Sets](https://learn.microsoft.com/azure/virtual-machine-scale-sets/) | &#x2705; | &#x2705; |
| [Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/) | &#x2705; | &#x2705; |
| [Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/index.yml) | &#x2705; | &#x2705; |
| [Virtual Network NAT](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/nat-gateway/index.yml) | &#x2705; | &#x2705; |
| [Virtual WAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/index.yml) | &#x2705; | &#x2705; |
| [VM Image Builder](https://learn.microsoft.com/azure/virtual-machines/image-builder-overview) | &#x2705; | &#x2705; |
| [VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/index.yml) | &#x2705; | &#x2705; |
| [Web Application Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/web-application-firewall/index.yml) | &#x2705; | &#x2705; |
| [Windows 10 IoT Core Services](https://learn.microsoft.com/windows-hardware/manufacture/iot/iotcoreservicesoverview) | &#x2705; | &#x2705; |

**&ast;** FedRAMP High and DoD SRG Impact Level 2 authorization for Microsoft Entra ID applies to Microsoft Entra External ID. To learn more about Entra External ID, refer to the documentation [here](https://learn.microsoft.com/entra/)

**&ast;&ast;** FedRAMP High authorization for Azure Databricks is applicable to limited regions in Azure. To configure Azure Databricks for FedRAMP High use, contact your Microsoft or Databricks representative.

**&ast;&ast;&ast;** FedRAMP High authorization for edge devices (such as Azure Data Box, Azure Stack Edge and Azure Local) applies only to Azure services that support on-premises, customer-managed devices. For example, FedRAMP High authorization for Azure Data Box covers datacenter infrastructure services and Data Box pod and disk service, which are the online software components supporting your Data Box hardware appliance. You are wholly responsible for the authorization package that covers the physical devices. For assistance with accelerating your onboarding and authorization of devices, contact your Microsoft account representative.

## Azure Government services by audit scope
*Last updated: February 2026*

### Terminology used

- Azure Government = Azure Government regions US Gov Arizona, US Gov Texas, and US Gov Virginia (US Gov regions)
- FedRAMP High = FedRAMP High Provisional Authorization to Operate (P-ATO) in Azure Government
- DoD IL2 = DoD SRG Impact Level 2 Provisional Authorization (PA) in Azure Government
- DoD IL4 = DoD SRG Impact Level 4 Provisional Authorization (PA) in Azure Government
- DoD IL5WI = DoD SRG Impact Level 5 Workload Isolation (IL5WI) Provisional Authorization (PA) in Azure Government
- DoD IL6 = DoD SRG Impact Level 6 Provisional Authorization (PA) in Azure Government Secret
- &#x2705; = service is included in audit scope and has been authorized

> **Note:**
>
> - For DoD IL5 via Workload Isolation (IL5WI) PA compliance scope in Azure Government regions US Gov Arizona, US Gov Texas, and US Gov Virginia (US Gov regions), services require extra configuration to meet DoD IL5 compute and storage isolation requirements, as explained in **[Isolation guidelines for Impact Level 5 workloads](../documentation-government-impact-level-5.md).**
> - For DoD IL5 PA compliance scope in US DoD Central and US DoD East (US DoD regions), see **[US DoD regions IL5 audit scope](../documentation-government-overview-dod.md#us-dod-regions-il5-audit-scope).**

| Service | FedRAMP High | DoD IL2 | DoD IL4 | DoD IL5WI | DoD IL6 |
| --- | :---: | :---: | :---: | :---: | :---: |
| [Advisor](https://learn.microsoft.com/azure/advisor/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [AI Builder](https://learn.microsoft.com/ai-builder/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Analysis Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/analysis-services/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [API Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [App Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-app-configuration/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Application Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Entra ID (Free)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md#what-are-the-azure-ad-licenses) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Entra ID (P1 + P2)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md#what-are-the-azure-ad-licenses) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Entra Domain Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-domain-services/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Entra ID Governance](https://learn.microsoft.com/entra/) | &#x2705; | &#x2705; |  |  |  |
| [Microsoft Entra multifactor authentication](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/authentication/concept-mfa-howitworks.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure API for FHIR](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/healthcare-apis/azure-api-for-fhir/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Arc-enabled Kubernetes](https://learn.microsoft.com/azure/azure-arc/kubernetes/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Arc-enabled servers](https://learn.microsoft.com/azure/azure-arc/servers/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Arc-enabled SQL Server](https://learn.microsoft.com/sql/sql-server/azure-arc/overview) | &#x2705; | &#x2705; |  |  |  |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Container Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/container-apps/index.yml) | &#x2705; | &#x2705; |  |  |  |
| [Azure Cosmos DB (Including DocumentDB)](https://learn.microsoft.com/azure/cosmos-db/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure CXP Nomination Portal](https://cxp.azure.com/nominationportal/nominationform/fasttrack) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Databricks](https://learn.microsoft.com/azure/databricks/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Information Protection](https://learn.microsoft.com/azure/information-protection/) **&ast;&ast;** | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Kubernetes Service (AKS)](https://learn.microsoft.com/azure/aks/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Fluid Relay](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-fluid-relay/index.yml) | &#x2705; | &#x2705; |  |  |  |
| [Azure Load Testing](https://learn.microsoft.com/azure/load-testing/) | &#x2705; | &#x2705; |  |  |  |
| [Azure Managed Grafana](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/managed-grafana/index.yml) | &#x2705; | &#x2705; |  |  |  |
| [Azure Maps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-maps/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/) (incl. [Application Insights](https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview) and [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure NetApp Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-netapp-files/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure OpenAI](https://learn.microsoft.com/azure/ai-services/openai/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Policy's guest configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/machine-configuration/overview.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Red Hat OpenShift](https://learn.microsoft.com/azure/openshift/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Service Manager (RDFE)](https://learn.microsoft.com/previous-versions/azure/ee460799\(v=azure.100\)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [SQL Server on Azure VM](https://learn.microsoft.com/azure/azure-sql/virtual-machines/) | &#x2705; | &#x2705; |  |  |  |
| [Azure Sign-up portal](https://signup.azure.com/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Stack](https://learn.microsoft.com/azure-stack/operator/azure-stack-usage-reporting) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Stack Edge](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox-online/index.yml) (formerly Data Box Edge) **&ast;** | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure Local](https://learn.microsoft.com/azure-stack/hci/)  **&ast;** | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Update Manager](https://learn.microsoft.com/azure/update-manager/) | &#x2705; | &#x2705; |  |  |  |
| [Azure Video Indexer](https://learn.microsoft.com/azure/azure-video-indexer/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Azure Virtual Desktop](https://learn.microsoft.com/azure/virtual-desktop/) (formerly Windows Virtual Desktop) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Azure VMware Solution](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-vmware/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure Web PubSub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-web-pubsub/index.yml) | &#x2705; | &#x2705; |  |  |  |
| [Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Bastion](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Batch](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/batch/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Blueprints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/blueprints/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Bot Service](https://learn.microsoft.com/azure/bot-service/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Cloud Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Cloud Services Extended Support](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services-extended-support/index.yml) | &#x2705; | &#x2705; |  |  |  |
| [Cloud Shell](../../cloud-shell/overview.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Foundry: Azure AI Search](https://learn.microsoft.com/azure/search/) (formerly Azure Cognitive Search) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Foundry: Azure AI Computer Vision](https://learn.microsoft.com/azure/ai-services/computer-vision/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Azure AI Content Moderator](https://learn.microsoft.com/azure/ai-services/content-moderator/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Azure AI containers](https://learn.microsoft.com/azure/ai-services/cognitive-services-container-support) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Azure AI Custom Vision](https://learn.microsoft.com/azure/ai-services/custom-vision-service/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Azure AI Face](https://learn.microsoft.com/azure/ai-services/computer-vision/overview-identity) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: LUIS](https://learn.microsoft.com/azure/ai-services/luis/) </br> (part of [Language](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Foundry: Azure AI Personalizer](https://learn.microsoft.com/azure/ai-services/personalizer/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Azure AI QnA Maker](https://learn.microsoft.com/azure/ai-services/qnamaker/) </br> (part of [Language](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Speech](https://learn.microsoft.com/azure/ai-services/speech-service/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry Tools: Text Analytics](https://learn.microsoft.com/azure/ai-services/language-service/concepts/migrate#do-i-need-to-migrate-to-the-language-service-if-i-am-using-text-analytics) </br> (part of [Language](https://learn.microsoft.com/azure/ai-services/language-service/)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Translator](https://learn.microsoft.com/azure/ai-services/translator/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Foundry: Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/) | &#x2705; | &#x2705; |  |  |  |
| [Container Instances](https://learn.microsoft.com/azure/container-instances/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Container Registry](https://learn.microsoft.com/azure/container-registry/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Content Delivery Network (CDN)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cdn/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Cost Management and Billing](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Customer Lockbox](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/customer-lockbox-overview.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Data Box](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/databox/index.yml) **&ast;** | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Data Explorer](https://learn.microsoft.com/azure/data-explorer/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Data Factory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-factory/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Data Share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/data-share/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Database Migration Service](https://learn.microsoft.com/azure/dms/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dataverse](https://learn.microsoft.com/powerapps/maker/data-platform/) (formerly Common Data Service) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [DDoS Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dedicated HSM](https://learn.microsoft.com/azure/dedicated-hsm/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [DevTest Labs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/devtest-labs/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [DNS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/dns/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Dynamics 365 Chat (Omnichannel Engagement Hub)](https://learn.microsoft.com/dynamics365/omnichannel/introduction-omnichannel) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Contact Center](https://learn.microsoft.com/dynamics365/contact-center) | &#x2705; | &#x2705; |  |  |  |
| [Dynamics 365 Customer Insights](https://learn.microsoft.com/dynamics365/customer-insights/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Customer Service](https://learn.microsoft.com/dynamics365/customer-service/overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Dynamics 365 Customer Voice](https://learn.microsoft.com/dynamics365/customer-voice/about) (formerly Forms Pro) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Field Service](https://learn.microsoft.com/dynamics365/field-service/overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Finance](https://learn.microsoft.com/dynamics365/finance/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Dynamics 365 Project Service Automation](https://learn.microsoft.com/dynamics365/project-operations/psa/overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Project Operations](https://learn.microsoft.com/dynamics365/project-operations/) | &#x2705; | &#x2705; |  |  |  |
| [Dynamics 365 Sales](https://learn.microsoft.com/dynamics365/sales/help-hub) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Dynamics 365 Supply Chain Management](https://learn.microsoft.com/dynamics365/supply-chain/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Event Grid](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-grid/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Event Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/event-hubs/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [ExpressRoute](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [File Sync](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/file-sync/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Firewall Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall-manager/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Document Intelligence](https://learn.microsoft.com/azure/ai-services/document-intelligence/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Functions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [HDInsight](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [HPC Cache](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hpc-cache/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Import/Export](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/import-export/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Key Vault](https://learn.microsoft.com/azure/key-vault/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Lab Services](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/lab-services/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Lighthouse](https://learn.microsoft.com/azure/lighthouse/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Load Balancer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/load-balancer/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Machine Learning](https://learn.microsoft.com/azure/machine-learning/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Managed Applications](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/managed-applications/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Media Services](https://learn.microsoft.com/azure/media-services/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Azure portal](https://learn.microsoft.com/azure/azure-portal/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Foundry portal](https://learn.microsoft.com/azure/foundry/what-is-foundry#microsoft-foundry-portals) | &#x2705; | &#x2705; |  |  |  |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Microsoft Azure Attestation](https://learn.microsoft.com/azure/attestation/) | &#x2705; | &#x2705; |  |  |  |
| [Microsoft Azure Government portal](../documentation-government-get-started-connect-with-portal.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/) (formerly Azure Security Center) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Defender for Cloud Apps](https://learn.microsoft.com/defender-cloud-apps/) (formerly Microsoft Cloud App Security) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Defender for Endpoint](https://learn.microsoft.com/microsoft-365/security/defender-endpoint/) (formerly Microsoft Defender Advanced Threat Protection) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Defender for Identity](https://learn.microsoft.com/defender-for-identity/) (formerly Azure Advanced Threat Protection) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Defender for IoT](https://learn.microsoft.com/azure/defender-for-iot/) (formerly Azure Security for IoT) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Defender Vulnerability Management](https://learn.microsoft.com/azure/defender-for-iot/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Microsoft Graph](https://learn.microsoft.com/graph/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Intune](https://learn.microsoft.com/mem/intune/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Purview](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/purview/index.yml) (incl. Data Map, Data Estate Insights, and governance portal) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Microsoft Secure Score](https://learn.microsoft.com/defender-xdr/microsoft-secure-score/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/) (formerly Azure Sentinel) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Microsoft Stream](https://learn.microsoft.com/stream/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Migrate](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/migrate/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Network Watcher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/index.yml) (incl. [Traffic Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/traffic-analytics.md)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Notification Hubs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/notification-hubs/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Peering Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/peering-service/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Planned Maintenance for VMs](https://learn.microsoft.com/azure/virtual-machines/maintenance-and-updates) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Power Apps](https://learn.microsoft.com/powerapps/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Power Pages](https://powerapps.microsoft.com/portals/) (formerly PowerApps Portal) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Power Automate](https://learn.microsoft.com/power-automate/) (formerly Microsoft Flow) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Power BI](https://learn.microsoft.com/power-bi/fundamentals/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Power BI Embedded](https://learn.microsoft.com/power-bi/developer/embedded/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Power Data Integrator for Dataverse](https://learn.microsoft.com/power-platform/admin/data-integrator) (formerly Dynamics 365 Integrator App) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Microsoft Copilot Studio](https://learn.microsoft.com/power-virtual-agents/) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [Private Link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Public IP](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/ip-services/public-ip-addresses.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Resource Graph](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/resource-graph/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Resource Mover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/resource-mover/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Route Server](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/route-server/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Scheduler](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/scheduler/index.yml) (replaced by [Logic Apps](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/logic-apps/index.yml)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Service Bus](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/service-bus-messaging/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Service Fabric](https://learn.microsoft.com/azure/service-fabric/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Service Health](https://learn.microsoft.com/azure/service-health/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [SignalR Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-signalr/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [SQL Server Stretch Database](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/sql-server-stretch-database/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Storage: Archive](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/access-tiers-overview.md) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Storage: Blobs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/index.yml) (incl. [Azure Data Lake Storage Gen2](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-introduction.md)) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Storage: Disks (incl. managed disks)](https://learn.microsoft.com/azure/virtual-machines/managed-disks-overview) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Storage: Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Storage: Queues](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/queues/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Storage: Tables](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/tables/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [StorSimple](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storsimple/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Stream Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/stream-analytics/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Synapse Analytics](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| **Service** | **FedRAMP High** | **DoD IL2** | **DoD IL4** | **DoD IL5WI** | **DoD IL6** |
| [Synapse Link for Dataverse](https://learn.microsoft.com/powerapps/maker/data-platform/export-to-data-lake) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Traffic Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/traffic-manager/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Virtual Machine Scale Sets](https://learn.microsoft.com/azure/virtual-machine-scale-sets/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Virtual Machines](https://learn.microsoft.com/azure/virtual-machines/) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Virtual Network NAT](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/nat-gateway/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |
| [Virtual WAN](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-wan/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [VM Image Builder](https://learn.microsoft.com/azure/virtual-machines/image-builder-overview) | &#x2705; | &#x2705; | &#x2705; |  |  |
| [VPN Gateway](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; | &#x2705; |
| [Web Application Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/web-application-firewall/index.yml) | &#x2705; | &#x2705; | &#x2705; | &#x2705; |  |

**&ast;** Authorizations for edge devices (such as Azure Data Box, Azure Stack Edge and Azure Local) apply only to Azure services that support on-premises, customer-managed devices. You are wholly responsible for the authorization package that covers the physical devices. For assistance with accelerating your onboarding and authorization of devices, contact your Microsoft account representative.

**&ast;&ast;** Azure Information Protection (AIP) is part of the Microsoft Purview Information Protection solution - it extends the labeling and classification functionality provided by Microsoft 365. Before AIP can be used for DoD workloads at a given impact level (IL), the corresponding Microsoft 365 services must be authorized at the same IL.

## Next steps

- [Acquiring and accessing Azure Government](https://azure.microsoft.com/offers/azure-government/)
- [Azure Government overview](../documentation-government-welcome.md)
- [Azure Government security](../documentation-government-plan-security.md)
- [FedRAMP High](https://learn.microsoft.com/azure/compliance/offerings/offering-fedramp)
- [DoD Impact Level 2](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il2)
- [DoD Impact Level 4](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il4)
- [DoD Impact Level 5](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il5)
- [DoD Impact Level 6](https://learn.microsoft.com/azure/compliance/offerings/offering-dod-il6)
- [Azure Government isolation guidelines for Impact Level 5 workloads](../documentation-government-impact-level-5.md)
- [Azure guidance for secure isolation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-government/azure-secure-isolation-guidance.md)

## Federal Compliance Documentation

Azure compliance programs maintain federal compliance documentation on an access controlled private Microsoft website to ensure secure and professional handling of compliance documentation.
- To obtain access, stakeholders must provide information for one of the following sales channel:
   - The full name and @microsoft.com email address of a Microsoft Point of Contact (POC) from Customer Service Account Management or a Cloud Solution Architect.
   - The reseller company name if Azure Online Services were purchased through a reseller.
   - The Microsoft Azure or M365 cloud tenant ID to confirm customer status.
- Once sales channel information is validated, access will be granted on an individual basis. Please provide the following information to process and provision access requests:
   - Cloud instance in use (e.g., Azure Commercial, Azure Government, Azure DoD IL4 & IL5)
   - Include the full names and email addresses of all individuals requiring access. Individuals granted access must not download or share documents with other stakeholders. 
You can send the requested information to the Azure Federal Documentation group email at AzFedDoc@microsoft.com.
