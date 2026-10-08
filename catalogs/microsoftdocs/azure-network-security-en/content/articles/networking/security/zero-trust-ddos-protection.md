---
title: Zero Trust recommendations for Azure DDoS Protection
description: Review Zero Trust security recommendations for Azure DDoS Protection to help secure your public-facing resources.
author: duongau
ms.author: duau
ms.service: azure-ddos-protection
ms.topic: best-practice
ms.date: 03/17/2026
ms.custom: Network-Secure-Recommendation
---

# Zero Trust recommendations for Azure DDoS Protection

Azure DDoS Protection safeguards your public-facing resources from distributed denial of service attacks. The following recommendations help you verify that DDoS protection is enabled and properly monitored across your environment.

For a summary of all Azure network security Zero Trust recommendations, see [Azure network security Zero Trust recommendations](zero-trust-network-security.md).

## Recommendations

### DDoS Protection is enabled for all public IP addresses in VNets

Distributed denial of service (DDoS) attacks aim to overwhelm application compute, network, or memory resources, rendering services inaccessible to legitimate users. Any public-facing endpoint exposed to the internet is a potential target. Azure DDoS Protection provides always-on monitoring and automatic mitigation against network-layer attacks targeting public IP addresses. Protection can be enabled through DDoS IP Protection directly on individual public IPs, or through DDoS Network Protection at the virtual network level via a DDoS protection plan. Without DDoS Protection, public IPs for services such as Application Gateways, Load Balancers, Azure Firewalls, Azure Bastion, Virtual Network Gateways, and virtual machines remain exposed to attacks that can exhaust bandwidth and system resources, causing cascading outages across dependent services. This check verifies that every public IP address is covered by DDoS protection through either approach.

**Remediation action**

- [Azure DDoS Protection overview](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview)
- [Create and configure Azure DDoS Network Protection using the Azure portal](https://learn.microsoft.com/azure/ddos-protection/manage-ddos-protection)
- [Create and configure Azure DDoS IP Protection using the Azure portal](https://learn.microsoft.com/azure/ddos-protection/manage-ddos-ip-protection-portal)
- [Azure DDoS Protection SKU comparison](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-sku-comparison)


### Metrics are enabled for DDoS-protected public IPs

Azure DDoS Protection provides advanced mitigation capabilities for public IP addresses, automatically detecting and mitigating volumetric and protocol distributed denial of service (DDoS) attacks at Layers 3 and 4. For application-layer (Layer 7) DDoS protection, use Azure DDoS Protection in combination with a Web Application Firewall (WAF). DDoS protection without metrics enabled creates a visibility gap where security teams cannot observe attack traffic patterns, mitigation actions, or the effectiveness of protection policies. When a DDoS attack occurs against an unmonitored public IP, incident responders lack critical telemetry including inbound packet counts, bytes dropped during mitigation, attack vectors identified, and mitigation trigger events. This delays detection as attacks may go unnoticed until service degradation occurs. It also prevents correlation of DDoS events with application performance issues and eliminates the ability to analyze attack patterns for proactive defense improvements. Enabling DDoS metrics provides real-time visibility into attack status, packets and bytes processed and dropped, and TCP/UDP/SYN flood metrics essential for both active incident response and post-incident analysis.

**Remediation action**

- [Configure Azure DDoS Protection metrics and diagnostic logs](https://learn.microsoft.com/azure/ddos-protection/ddos-view-diagnostic-logs)
- [Configure diagnostic settings for Azure resources](https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings)
- [Azure DDoS Protection overview](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview)
- [Create and configure Azure DDoS Network Protection using the Azure portal](https://learn.microsoft.com/azure/ddos-protection/manage-ddos-protection)


### Diagnostic logging is enabled for DDoS-protected public IPs

When Azure DDoS Protection is enabled for public IP addresses, diagnostic logging provides critical visibility into distributed denial of service (DDoS) attack patterns, mitigation actions, and traffic flow data. Without diagnostic logs, security teams lack the observability needed to understand attack characteristics, validate mitigation effectiveness, and perform post-incident analysis. Azure DDoS Protection generates three categories of diagnostic logs: DDoSProtectionNotifications for attack detection and mitigation events, DDoSMitigationFlowLogs for detailed flow-level information during active mitigation, and DDoSMitigationReports for comprehensive attack summaries. These logs are essential for detecting ongoing attacks, investigating incidents, meeting compliance requirements, and tuning protection policies.

**Remediation action**

- [View and configure DDoS Protection diagnostic logs](https://learn.microsoft.com/azure/ddos-protection/ddos-view-diagnostic-logs)
- [Monitor Azure DDoS Protection](https://learn.microsoft.com/azure/ddos-protection/monitor-ddos-protection)


## Related content

- [Azure network security Zero Trust recommendations](zero-trust-network-security.md)
- [Azure DDoS Protection overview](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview)
- [Create and configure Azure DDoS Network Protection](https://learn.microsoft.com/azure/ddos-protection/manage-ddos-protection)
