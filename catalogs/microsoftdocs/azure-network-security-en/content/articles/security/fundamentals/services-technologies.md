---
title: Security services and technologies in Azure
description: This article provides an overview of the main Azure security services and technologies with links to detailed documentation.
services: security
author: msmbaldwin

ms.assetid: a5a7f60a-97e2-49b4-a8c5-7c010ff27ef8
ms.service: security
ms.subservice: security-fundamentals
ms.topic: overview
ms.date: 09/18/2026
ms.author: mbaldwin
ai-usage: ai-assisted

---
# Security services and technologies in Azure

Azure provides comprehensive security services and technologies across all layers of your cloud deployments. This article introduces the main security capabilities organized by domain, with links to detailed overview articles.

For specific security best practices and detailed implementation guidance, see the domain-specific overview articles linked throughout this article.

## Identity and access management

| Service | Description |
| --- | --- |
| [Microsoft Entra ID](https://learn.microsoft.com/entra/fundamentals/whatis) | Cloud-based identity and access management service supporting single sign-on (SSO), multifactor authentication (MFA), Conditional Access, and passwordless authentication. |
| [Azure role-based access control (RBAC)](../../role-based-access-control/overview.md) | Fine-grained access management with built-in and custom roles, assignable at management group, subscription, resource group, or resource scope. |
| [Microsoft Entra Privileged Identity Management](https://learn.microsoft.com/entra/id-governance/privileged-identity-management/pim-configure) | Just-in-time privileged access to Azure and Microsoft Entra roles with approval workflows, access reviews, and audit history. |
| [Microsoft Entra access reviews](https://learn.microsoft.com/entra/id-governance/access-reviews-overview) | Scheduled reviews of group memberships, application access, and role assignments with automated recommendations and remediation. |
| [Microsoft Entra application proxy](https://learn.microsoft.com/entra/identity/app-proxy/overview-what-is-app-proxy) | Secure remote access to on-premises web applications without VPN, using Microsoft Entra authentication and Conditional Access. |
| [Microsoft Entra Cloud Sync](https://learn.microsoft.com/entra/identity/hybrid/cloud-sync/what-is-cloud-sync) | Hybrid identity synchronization between on-premises Active Directory and Microsoft Entra ID for unified identity management. |

For detailed identity security capabilities and best practices, see [Azure identity management security overview](identity-management-overview.md).

## Network security

| Service | Description |
| --- | --- |
| [Azure Virtual Network](../../virtual-network/virtual-networks-overview.md) | Isolated private network with subnets, route tables, and DNS settings. Foundation for all Azure network security. |
| [Network Security Groups (NSGs)](../../virtual-network/network-security-groups-overview.md) | Stateful packet filtering with 5-tuple rules, service tags, and application security groups for granular access control. |
| [Azure Firewall](../../firewall/overview.md) | Cloud-native stateful firewall with built-in high availability. Standard SKU offers L3-L7 filtering; Premium SKU adds IDPS and TLS inspection. |
| [Web Application Firewall (WAF)](../../web-application-firewall/overview.md) | Centralized protection against OWASP Top 10 vulnerabilities, SQL injection, cross-site scripting, and bot attacks. |
| [Azure DDoS Protection](../../ddos-protection/ddos-protection-overview.md) | Always-on traffic monitoring with adaptive tuning, real-time mitigation, and attack analytics for volumetric and protocol attacks. |
| [Azure Private Link](../../private-link/private-link-overview.md) | Private connectivity to Azure PaaS services over a private endpoint in your virtual network, eliminating public internet exposure. |
| [Virtual Network service endpoints](../../virtual-network/virtual-network-service-endpoints-overview.md) | Direct connectivity to Azure services over the Azure backbone network, restricting access to your virtual networks only. |
| [Azure VPN Gateway](../../vpn-gateway/vpn-gateway-about-vpngateways.md) | Encrypted cross-premises connectivity using IPsec/IKE VPN tunnels for site-to-site and point-to-site connections. |
| [Azure ExpressRoute](../../expressroute/expressroute-introduction.md) | Dedicated private WAN connection to Microsoft cloud services, bypassing the public internet for enhanced security and reliability. |
| [Azure Application Gateway](../../application-gateway/overview.md) | Layer 7 load balancer with TLS termination, cookie-based session affinity, URL-based routing, and integrated WAF. |
| [Azure Front Door](../../frontdoor/front-door-overview.md) | Global HTTP load balancer with edge acceleration, integrated WAF, platform-level DDoS protection, and Private Link backend origins. |
| [Azure Network Watcher](../../network-watcher/network-watcher-overview.md) | Network monitoring, diagnostics, and security analysis including NSG flow logs, packet capture, and connection troubleshoot. |

For comprehensive network security guidance and best practices, see [Azure network security overview](network-overview.md).

## Data encryption

| Service | Description |
| --- | --- |
| [Azure Storage Service Encryption](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-service-encryption.md) | Automatic AES 256 encryption for all data at rest in Azure Blob storage, Azure Files, Queue storage, and Table storage. |
| [Azure SQL Database Transparent Data Encryption (TDE)](https://learn.microsoft.com/azure/azure-sql/database/transparent-data-encryption-tde-overview) | Real-time encryption of databases, backups, and transaction logs at rest. Enabled by default with support for customer-managed keys. |
| [Always Encrypted](https://learn.microsoft.com/sql/relational-databases/security/encryption/always-encrypted-database-engine) | Client-side encryption for Azure SQL Database ensuring data remains encrypted throughout its lifecycle, even from database administrators. |
| [Azure Disk Encryption](https://learn.microsoft.com/azure/virtual-machines/disk-encryption-overview) | Encryption for OS and data disks using platform-managed keys, customer-managed keys, or double encryption with both. |
| [Azure Cosmos DB encryption](https://learn.microsoft.com/azure/cosmos-db/database-encryption-at-rest) | Automatic encryption at rest using service-managed keys with optional customer-managed key (CMK) support. |
| [Azure Data Lake encryption](https://learn.microsoft.com/azure/data-lake-store/data-lake-store-encryption) | Transparent encryption at rest enabled by default with options for Microsoft-managed or customer-managed keys. |
| [TLS encryption in transit](encryption-overview.md#tls-encryption) | Transport Layer Security (TLS 1.2+) for all Azure service communications with Perfect Forward Secrecy (PFS). |
| [MACsec data-link encryption](encryption-overview.md#data-link-layer-encryption) | Point-to-point encryption using IEEE 802.1AE for all Azure traffic between datacenters. |

For detailed encryption options and best practices, see [Azure encryption overview](encryption-overview.md).

## Key and secrets management

| Service | Description |
| --- | --- |
| [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) | Secure storage for keys, secrets, and certificates. Premium tier supports HSM-protected keys backed by FIPS 140 validated HSMs. |
| [Azure Key Vault Managed HSM](https://learn.microsoft.com/azure/key-vault/managed-hsm/overview) | Single-tenant, FIPS 140-3 Level 3 validated HSM service offering full customer control with confidential key support. Integrates with Azure PaaS services. |
| [Azure Cloud HSM](https://learn.microsoft.com/azure/cloud-hsm/overview) | Fully managed, single-tenant FIPS 140-3 Level 3 validated HSM cluster supporting PKCS#11, SSL/TLS offloading, and on-premises migration scenarios. IaaS only. |
| [Azure Payment HSM](https://learn.microsoft.com/azure/payment-hsm/overview) | Single-tenant, FIPS 140-2 Level 3 validated, PCI HSM v3 compliant HSM for payment processing operations. |
| [Azure Payment HSM v2](https://learn.microsoft.com/azure/payment-hsm-v2/overview) | Single-tenant, FIPS 140-3 Level 3 certified, PCI DSS, PCI 3DS, and PCI PIN compliant Microsoft-managed payment HSM cluster for payment processing operations. In preview. |

For comprehensive key management options, see [Key management in Azure](key-management.md).

## Threat detection and response

| Service | Description |
| --- | --- |
| [Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-cloud-introduction) | Unified cloud security with posture management (CSPM), workload protection (CWP), and advanced threat detection across Azure, AWS, GCP, and hybrid environments. Integrated with Microsoft Defender portal. |
| [Microsoft Sentinel](https://learn.microsoft.com/azure/sentinel/overview) | Cloud-native SIEM and SOAR solution with machine learning, user and entity behavior analytics (UEBA), threat intelligence integration, and automated playbooks. |
| [Microsoft Entra ID Protection](https://learn.microsoft.com/entra/id-protection/overview-identity-protection) | Risk-based identity protection detecting anomalous sign-in behaviors and compromised accounts using machine learning. |
| [Microsoft Defender for Cloud Apps](https://learn.microsoft.com/defender-cloud-apps/what-is-defender-for-cloud-apps) | Cloud Access Security Broker (CASB) providing visibility, data control, and threat protection for cloud applications including shadow IT discovery. |
| [Microsoft Antimalware for Azure](antimalware.md) | Real-time protection, scheduled scanning, and automatic malware remediation for Azure Cloud Services and Virtual Machines. |

For comprehensive information about threat detection capabilities and best practices, see [Azure threat protection](threat-detection.md).

## Platform integrity

| Service | Description |
| --- | --- |
| [Firmware security](firmware.md) | Secure supply chain and firmware integrity verification for Azure hardware from manufacturing through deployment. |
| [UEFI Secure Boot](secure-boot.md) | Ensures only signed operating systems and drivers can boot, protecting against firmware-level malware. |
| [Platform code integrity](code-integrity.md) | Code integrity policies that validate all code before execution on Azure infrastructure. |
| [Measured boot and host attestation](measured-boot-host-attestation.md) | Cryptographic verification of the boot sequence to ensure hosts are in a secure and trustworthy state. |
| [Project Cerberus](project-cerberus.md) | Hardware root of trust providing platform identity and integrity verification. |
| [Hypervisor security](hypervisor.md) | Hardened hypervisor with strong isolation between virtual machines and the host environment. |

For detailed platform security architecture, see [Azure platform integrity and security overview](platform.md).

## Virtual machine security

| Service | Description |
| --- | --- |
| [Trusted launch](https://learn.microsoft.com/azure/virtual-machines/trusted-launch) | Default for Gen2 VMs with Secure Boot, vTPM, and Boot Integrity Monitoring protecting against boot kits, rootkits, and kernel-level malware. |
| [Azure confidential computing](../../confidential-computing/overview.md) | Hardware-based trusted execution environments (TEE) using AMD SEV-SNP or Intel TDX for data protection while in use. |
| [Confidential VMs](../../confidential-computing/confidential-vm-overview.md) | Full VM memory encryption with hardware-enforced isolation from the hypervisor and host management code. |
| [Microsoft Defender for Servers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-servers-introduction) | Threat detection with Microsoft Defender for Endpoint integration, vulnerability assessment, just-in-time VM access, and file integrity monitoring. |
| [Just-in-time (JIT) VM access](https://learn.microsoft.com/azure/defender-for-cloud/just-in-time-access-usage) | Reduces attack surface by locking down inbound traffic and enabling time-limited access to management ports on demand. |
| [Adaptive application controls](https://learn.microsoft.com/azure/defender-for-cloud/adaptive-application-controls) | Machine learning-based application allowlisting to control which applications can run on your VMs. |
| [Azure Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-overview.md) | Independent, isolated backups with ransomware protection, soft delete, and Recovery Services vault management. |
| [Azure Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/site-recovery-overview.md) | Disaster recovery orchestration for replication, failover, and recovery to Azure or a secondary site. |

For comprehensive VM security features and guidance, see [Azure Virtual Machines security overview](virtual-machines-overview.md).

## Container security

| Service | Description |
| --- | --- |
| [Microsoft Defender for Containers](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-containers-introduction) | Runtime protection, vulnerability assessment, and Kubernetes threat detection across AKS, EKS, GKE, and on-premises clusters. |
| [Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-intro) | Managed container registry with vulnerability scanning, content trust (image signing), geo-replication, and private endpoints. |
| [Azure Kubernetes Service (AKS) security](https://learn.microsoft.com/azure/aks/concepts-security) | Managed Kubernetes with Microsoft Entra integration, Azure RBAC, network policies, pod security, and secrets management. |
| [Confidential containers on ACI](https://learn.microsoft.com/azure/container-instances/container-instances-confidential-overview) | Hardware-based TEE protection using AMD SEV-SNP with verifiable execution policies and remote attestation. |
| [Kubernetes gated deployment](https://learn.microsoft.com/azure/defender-for-cloud/runtime-gated-overview) | Admission control preventing deployment of container images that violate security rules in audit or deny mode. |
| [Container image scanning](https://learn.microsoft.com/azure/defender-for-cloud/agentless-vulnerability-assessment-azure) | Agentless vulnerability assessment for container images in registries and runtime containers in AKS clusters. |

For comprehensive container security guidance, see [Container security in Microsoft Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/container-security).

## Database security

| Service | Description |
| --- | --- |
| [Azure SQL Database security](https://learn.microsoft.com/azure/azure-sql/database/security-overview) | Comprehensive security with network isolation, Microsoft Entra authentication, TDE encryption, Always Encrypted, and auditing. |
| [Microsoft Defender for SQL](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-introduction) | Advanced threat protection detecting SQL injection, brute-force attacks, anomalous activities, and vulnerability exploits. |
| [SQL Vulnerability Assessment](https://learn.microsoft.com/azure/azure-sql/database/sql-vulnerability-assessment) | Discovers, tracks, and helps remediate database vulnerabilities with actionable security recommendations. |
| [Row-Level Security (RLS)](https://learn.microsoft.com/sql/relational-databases/security/row-level-security) | Restricts row access based on user identity, role, or execution context for fine-grained data access control. |
| [Dynamic Data Masking](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/sql/dynamic-data-masking-overview.md) | Masks sensitive data to non-privileged users without changing underlying data, reducing exposure risk. |
| [Azure SQL Database Ledger](https://learn.microsoft.com/sql/relational-databases/security/ledger/ledger-overview) | Tamper-evident capabilities with immutable transaction records for data integrity verification and compliance. |
| [Azure Cosmos DB security](https://learn.microsoft.com/azure/cosmos-db/database-security) | Encryption at rest and in transit, network isolation, RBAC, and audit logging for NoSQL and multimodel workloads. |

For a comprehensive database security checklist, see [Azure database security checklist](database-security-checklist.md).

## DevOps security

| Service | Description |
| --- | --- |
| [Microsoft Defender for DevOps](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-devops-introduction) | Unified DevOps security connecting Azure DevOps and GitHub with code scanning, infrastructure-as-code (IaC) scanning, and secret detection. |
| [GitHub Advanced Security integration](https://learn.microsoft.com/azure/defender-for-cloud/github-advanced-security-overview) | Code-to-cloud vulnerability tracking with runtime context prioritization and AI-powered Copilot Autofix remediation. |
| [In-pipeline container scanning](https://learn.microsoft.com/azure/defender-for-cloud/cli-cicd-integration) | CLI-based container vulnerability scanning during CI/CD workflows with real-time feedback before registry push. |
| [Dependency vulnerability scanning](https://learn.microsoft.com/azure/defender-for-cloud/agentless-code-scanning) | Trivy-powered detection of OS and library vulnerabilities in GitHub and Azure DevOps repositories. |

For DevOps security best practices, see [DevOps security in Defender for Cloud](https://learn.microsoft.com/azure/defender-for-cloud/devops-support).

## Monitoring and governance

| Service | Description |
| --- | --- |
| [Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/overview) | Comprehensive monitoring with metrics, logs, Log Analytics workspaces, Application Insights, alerts, and workbooks. |
| [Azure Policy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/policy/overview.md) | Governance service enforcing organizational standards with policy definitions, initiatives, compliance reporting, and automatic remediation. |
| [Microsoft Defender for Cloud regulatory compliance](https://learn.microsoft.com/azure/defender-for-cloud/regulatory-compliance-dashboard) | Built-in and custom compliance assessments aligned with Microsoft cloud security benchmark, ISO 27001, NIST, PCI DSS, and other standards. |
| [Azure Activity Log](https://learn.microsoft.com/azure/azure-monitor/essentials/activity-log) | Subscription-level audit log recording administrative operations, service health events, and resource changes with 90-day retention. |
| [Azure Update Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/update-manager/overview.md) | Unified patch management for Windows and Linux VMs across Azure, on-premises, and multicloud with scheduled patching and hotpatching. |
| [Azure Resource Graph](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/resource-graph/overview.md) | Fast cross-subscription querying to identify resources with specific configurations or security postures at scale. |
| [Microsoft Cost Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cost-management-billing/costs/overview-cost-management.md) | Cost monitoring, budgets, and anomaly detection to identify unauthorized resource deployments that might indicate security incidents. |

For detailed security management capabilities and best practices, see [Azure security management and monitoring overview](management-monitoring-overview.md).

## Backup and disaster recovery

| Service | Description |
| --- | --- |
| [Azure Backup](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/backup-overview.md) | Independent, isolated backups with zero capital investment, ransomware protection, soft delete, and cross-region restore. |
| [Azure Site Recovery](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/site-recovery/site-recovery-overview.md) | Business continuity and disaster recovery (BCDR) orchestration for replication, failover, and recovery to Azure or a secondary site. |

For comprehensive backup guidance, see [Azure Backup documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/backup/index.yml).

## PaaS deployment security

For guidance on securing platform-as-a-service deployments, including App Service, Azure Functions, and container services, see [Securing PaaS deployments](paas-deployments.md).


## Next steps

- [End-to-end security in Azure](end-to-end.md) - Comprehensive overview of Azure's security architecture and capabilities
- [Azure security best practices and patterns](best-practices-and-patterns.md) - Collection of security best practices for various scenarios
- [Microsoft Cloud Security Benchmark](https://learn.microsoft.com/security/benchmark/azure/introduction) - Comprehensive security guidance for Azure services.
- [Shared responsibility in the cloud](shared-responsibility.md) - Understanding the security responsibilities shared between you and Microsoft
