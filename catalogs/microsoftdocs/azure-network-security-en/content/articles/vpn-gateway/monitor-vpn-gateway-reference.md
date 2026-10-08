---
title: Monitoring data reference for Azure VPN Gateway
description: This article contains important reference material you need when you monitor Azure VPN Gateway by using Azure Monitor.
ms.date: 07/26/2024
ms.custom: horz-monitor
ms.topic: reference
author: duongau
ms.author: duau
ms.service: azure-vpn-gateway
# Customer intent: As a network administrator, I want to access detailed monitoring data for Azure VPN Gateway, so that I can effectively manage connectivity, diagnose issues, and ensure optimal performance of the VPN services.
---

# Azure VPN Gateway monitoring data reference

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

See [Monitor Azure VPN Gateway](monitor-vpn-gateway.md) for details on the data you can collect for VPN Gateway and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Supported metrics for microsoft.network/p2svpngateways

The following table lists the metrics available for the microsoft.network/p2svpngateways resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-p2svpngateways-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Supported metrics for microsoft.network/vpngateways

The following table lists the metrics available for the microsoft.network/vpngateways resource type.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-network-vpngateways-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Metrics details

The following table provides more details about the metrics in the preceding tables.

| Metric | Description |
| :--- | :--- |
| **BGP Peer Status** | Average BGP connectivity status per peer and per instance. |
| **BGP Routes Advertised** | Number of routes advertised per peer and per instance. |
| **BGP Routes Learned** | Number of routes learned per peer and per instance. |
| **Gateway Inbound Flows** | Number of distinct 5-tuple flows (protocol, local IP address, remote IP address, local port, and remote port) flowing into a VPN Gateway. Limit is 250k flows. |
| **Gateway Outbound Flows** | Number of distinct 5-tuple flows (protocol, local IP address, remote IP address, local port, and remote port) flowing out of a VPN Gateway. Limit is 250k flows. |
| **Gateway P2S Bandwidth** | Average combined bandwidth utilization of all point-to-site connections on the gateway. |
| **Gateway S2S Bandwidth** | Average combined bandwidth utilization of all site-to-site connections on the gateway. |
| **P2S Connection Count** | Count of point-to-site connections on the gateway. |
| **Tunnel Bandwidth** | Average bandwidth utilization of tunnels created on the gateway. |
| **Tunnel Egress Bytes** | Number of outgoing bytes from a tunnel. |
| **Tunnel Egress Packet Drop Count** | Number of outgoing packets dropped by a tunnel. |
| **Tunnel Egress Packets** | Number of outgoing packets from a tunnel. |
| **Tunnel Egress TS Mismatch Packet Drop** | Number of outgoing packets dropped by tunnels caused by traffic-selector mismatch. |
| **Tunnel Ingress Bytes** | Number of incoming bytes to a tunnel. |
| **Tunnel Ingress Packet Drop Count** | Number of incoming packets dropped by a tunnel. |
| **Tunnel Ingress Packets** | Number of incoming packets to a tunnel. |
| **Tunnel Ingress TS Mismatch Packet Drop** | Number of incoming packets dropped by tunnels caused by traffic-selector mismatch. |
| **Tunnel MMSA Count** | Number of main mode security associations present. |
| **Tunnel Peak PPS** | Max number of packets per second per tunnel. |
| **Tunnel QMSA Count** | Number of quick mode security associations present. |
| **Tunnel Total Flow Count** | Number of distinct 3-tuple flows (protocol, local IP address, remote IP address) created per tunnel. |
| **User Vpn Route Count** | Number of user VPN routes configured on the VPN Gateway. |
| **VNet Address Prefix Count** | Number of virtual network address prefixes that the gateway uses and advertises. |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

microsoft.network/p2svpngateways:

- Instance
- Protocol
- RouteType

microsoft.network/vpngateways:

- BgpPeerAddress
- ConnectionName
- DropType
- FlowType
- Instance
- NatRule
- RemoteIP

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Supported resource logs for microsoft.network/p2svpngateways

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-p2svpngateways-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Supported resource logs for microsoft.network/vpngateways

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-network-vpngateways-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### Resource Logs details

The following table provides more details about the metrics in the preceding tables.

| Name | Description |
| :--- | :--- |
| GatewayDiagnosticLog | Contains resource logs for gateway configuration events, primary changes, and maintenance events |
| TunnelDiagnosticLog | Contains tunnel state change events. Tunnel connect/disconnect events have a summarized reason for the state change if applicable |
| RouteDiagnosticLog | Logs changes to static routes and BGP events that occur on the gateway |
| IKEDiagnosticLog | Logs IKE control messages and events on the gateway |
| P2SDiagnosticLog | Logs point-to-site control messages and events on the gateway. Connection source info is provided for IKEv2 and OpenVPN connections only |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

### VPN Gateway Microsoft.Network/vpnGateways

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity#columns)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics#columns)
- [AzureDiagnostics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azurediagnostics#columns)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/vpn-gateway/monitor-vpn-gateway-reference.md)

- [Networking resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftnetwork)

## Related content

- See [Monitor Azure VPN Gateway](monitor-vpn-gateway.md) for a description of monitoring Azure VPN Gateway.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
