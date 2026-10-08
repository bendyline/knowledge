---
title: Zero Trust recommendations for Azure Firewall
description: Review Zero Trust security recommendations for Azure Firewall to help enforce network security policies across your virtual networks.
author: duongau
ms.author: duau
ms.service: azure-firewall
ms.topic: best-practice
ms.date: 03/17/2026
ms.custom: Network-Secure-Recommendation
---

# Zero Trust recommendations for Azure Firewall

Azure Firewall provides centralized network security policy enforcement and logging across your virtual networks. The following recommendations help you verify that key protection features are active and properly configured.

For a summary of all Azure network security Zero Trust recommendations, see [Azure network security Zero Trust recommendations](zero-trust-network-security.md).

## Recommendations

### Outbound traffic from VNet-integrated workloads is routed through Azure Firewall

Azure Firewall is a cloud-native network security service that provides centralized inspection, logging, and enforcement for outbound traffic. In a secure network architecture, outbound traffic from VNet-integrated workloads such as VMs, AKS clusters, App Service, and Functions should be explicitly routed through Azure Firewall before reaching external services. This routing ensures that outbound security inspection — including threat intelligence filtering, intrusion detection and prevention, TLS inspection, and egress policy enforcement — is applied to all outbound flows. Without this routing, outbound traffic bypasses the firewall entirely, leaving the environment exposed to data exfiltration and command-and-control communication. This check verifies that effective network routes direct outbound traffic to the firewall's private IP address for eligible workloads across all subscriptions.

For high-traffic workloads that risk SNAT port exhaustion, consider deploying [Azure NAT Gateway alongside Azure Firewall](https://learn.microsoft.com/azure/firewall/integrate-with-nat-gateway). NAT Gateway provides up to 64,512 SNAT ports per public IP address compared to Azure Firewall's 2,496 SNAT ports per public IP per instance. When associated with the AzureFirewallSubnet, NAT Gateway handles outbound translation while Azure Firewall continues to inspect traffic — with no double NAT.

**Remediation action**

- [Configure Azure Firewall routing](https://learn.microsoft.com/azure/firewall/tutorial-firewall-deploy-portal#create-a-default-route)
- [Manage route tables and routes](https://learn.microsoft.com/azure/virtual-network/manage-route-table)
- [Control App Service outbound traffic with Azure Firewall](https://learn.microsoft.com/azure/app-service/network-secure-outbound-traffic-azure-firewall)
- [Azure Firewall security rules](https://learn.microsoft.com/azure/firewall/rule-processing)


### Threat intelligence is enabled in deny mode on Azure Firewall

Azure Firewall Threat Intelligence-based filtering alerts and denies traffic from and to known malicious IP addresses, fully qualified domain names (FQDNs), and URLs sourced from the Microsoft Threat Intelligence feed. When enabled, Azure Firewall evaluates traffic against threat intelligence rules before applying network address translation (NAT), network, or application rules. This check verifies that Threat Intelligence is enabled in "Alert and deny" mode in the Azure Firewall policy. Without this feature enabled, the environment remains exposed to known malicious IPs, domains, and URLs, creating risk of compromise or data exfiltration.

> **Note:**
> "Alert and deny" mode requires Azure Firewall Standard or Premium. Azure Firewall Basic supports alert mode only. For a full feature comparison, see [Choose the right Azure Firewall SKU](https://learn.microsoft.com/azure/firewall/choose-firewall-sku).

**Remediation action**

- [Azure Firewall threat intelligence configuration](https://learn.microsoft.com/azure/firewall-manager/threat-intelligence-settings)


### IDPS inspection is enabled in deny mode on Azure Firewall

Azure Firewall Premium offers signature-based Intrusion Detection and Prevention System (IDPS) to detect attacks by identifying specific patterns such as byte sequences in network traffic or known malicious instruction sequences used by malware. IDPS signatures apply to both application and network-level traffic at Layers 3-7, are fully managed and continuously updated, and can be applied to inbound, spoke-to-spoke, and outbound traffic including traffic to and from on-premises networks. This check verifies that IDPS is enabled in "Alert and deny" mode in the Azure Firewall policy. If IDPS is disabled or in "Alert" only mode, malicious patterns in network traffic are not actively blocked.

**Remediation action**

- [Azure Firewall Premium features implementation guide](https://learn.microsoft.com/azure/firewall/premium-features)
- [Azure Firewall features by SKU](https://learn.microsoft.com/azure/firewall/choose-firewall-sku)


### Inspection of outbound TLS traffic is enabled on Azure Firewall

Azure Firewall Premium provides Transport Layer Security (TLS) inspection to decrypt, inspect, and re-encrypt outbound and east-west encrypted traffic using a customer-provided certificate authority (CA) certificate stored in Azure Key Vault. TLS inspection enables advanced security capabilities including Intrusion Detection and Prevention System (IDPS) and URL filtering to analyze encrypted traffic and identify threats that use encrypted channels to evade detection. Without TLS inspection enabled, the firewall cannot inspect encrypted payloads, significantly limiting visibility into threats that leverage TLS to bypass traditional security controls.

**Remediation action**

- [Enable TLS inspection in Azure Firewall Premium](https://learn.microsoft.com/azure/firewall/premium-features#tls-inspection)
- [Deploy certificates with enterprise CA for Azure Firewall Premium TLS inspection](https://learn.microsoft.com/azure/firewall/premium-deploy-certificates-enterprise-ca)
- [Create and configure intermediate CA certificates for TLS inspection](https://learn.microsoft.com/azure/firewall/premium-certificates)
- [Store certificates in Azure Key Vault for TLS inspection](https://learn.microsoft.com/azure/key-vault/certificates/certificate-scenarios)
- [Configure application rules with TLS inspection in Azure Firewall policy](https://learn.microsoft.com/azure/firewall/tutorial-firewall-deploy-portal-policy)
- [Azure Firewall features by SKU](https://learn.microsoft.com/azure/firewall/choose-firewall-sku)


### Diagnostic logging is enabled in Azure Firewall

Azure Firewall processes all inbound and outbound network traffic for protected workloads, making it a critical control point for security monitoring. When diagnostic logging is not enabled, security teams lose visibility into traffic patterns, denied connection attempts, threat intelligence matches, and Intrusion Detection and Prevention System (IDPS) signature detections. Without logging, threat actors who gain access can move laterally without detection, and incident responders cannot construct attack timelines. Azure Firewall provides multiple log categories including application rule logs, network rule logs, network address translation (NAT) rule logs, threat intelligence logs, IDPS signature logs, and DNS proxy logs that must be routed to a destination such as Log Analytics, a storage account, or an event hub for security monitoring and forensic analysis.

**Remediation action**

- [Create a Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace)
- [Create diagnostic settings in Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/create-diagnostic-settings)
- [Azure Firewall structured logs](https://learn.microsoft.com/azure/firewall/monitor-firewall#structured-azure-firewall-logs)
- [Azure Firewall Workbook](https://learn.microsoft.com/azure/firewall/firewall-workbook)
- [Monitor Azure Firewall](https://learn.microsoft.com/azure/firewall/monitor-firewall)


## Related content

- [Azure network security Zero Trust recommendations](zero-trust-network-security.md)
- [Azure Firewall overview](https://learn.microsoft.com/azure/firewall/overview)
- [Azure Firewall Premium features](https://learn.microsoft.com/azure/firewall/premium-features)
