---
title: VPN Gateway Legacy SKUs
description: How to work with the old virtual network gateway SKUs, called Standard and High Performance.
author: duongau
ms.service: azure-vpn-gateway
ms.topic: how-to
ms.date: 2/27/2026
ms.author: duau
# Customer intent: As a network administrator, I want to manage legacy VPN gateway SKUs so that I can ensure continuity of service and plan for the upcoming deprecation of these SKUs before the migration deadline.
---
# Work with VPN Gateway legacy SKUs

This article contains information about the legacy (old) virtual network Azure VPN Gateway SKUs. The legacy SKUs still work in both deployment models for existing VPN gateways. Classic VPN gateways continue to use the legacy SKUs, for both existing and new gateways. When you create new VPN gateways in Azure Resource Manager, use the new gateway SKUs.

For information about the new SKUs, see [About VPN Gateway](vpn-gateway-about-vpngateways.md). For the projected gateway SKU deprecation and migration timeline, see the [What's new?](whats-new.md) article.

## <a name="gwsku"></a>Legacy gateway SKUs

The legacy (old) VPN Gateway SKUs are:

* Standard
* High Performance

If you use legacy SKUs:

* You can configure site-to-site VPN Gateway connections in active-active mode only on the High Performance SKU.
* VPN Gateway doesn't use the Ultra Performance gateway SKU. For information about that SKU, see the [ExpressRoute](../expressroute/expressroute-about-virtual-network-gateways.md) documentation.


For SKU deprecation, see the [SKU deprecation](#sku-deprecation) and [FAQs](#sku-deprecation-faqs) sections of this article.

## <a name="agg"></a>Estimated aggregate throughput by SKU

The following table shows the gateway types and the estimated aggregate throughput by gateway SKU. This table applies to the Resource Manager and classic deployment models.

Pricing differs between gateway SKUs. For more information, see [VPN Gateway pricing](https://azure.microsoft.com/pricing/details/vpn-gateway).

| SKU | VPN Gateway throughput (1) | VPN Gateway max IPsec tunnels (2) | ExpressRoute Gateway throughput | VPN Gateway and ExpressRoute coexist |
| --- | --- | --- | --- | --- |
| Standard SKU (3)(4) | 100 Mbps | 10 | 1,000 Mbps | Yes |
| High Performance SKU (3) | 200 Mbps | 30 | 2,000 Mbps | Yes |

(1) The VPN throughput is a rough estimate based on the measurements between virtual networks in the same Azure region. It isn't a guaranteed throughput for cross-premises connections across the internet. It's the maximum possible throughput measurement.

(2) The number of tunnels refers to route-based VPNs. A policy-based VPN can only support one site-to-site VPN tunnel.

(3) Policy-based VPNs aren't supported for this SKU. They're supported for the Basic SKU.

(4) Site-to-site VPN Gateway connections in active-active mode aren't supported for this SKU. Active-active mode is supported on the High Performance SKU.

## <a name="config"></a>Supported configurations by SKU and VPN type

The following table lists the requirements for policy-based and route-based VPN gateways. This table applies to both the Azure Resource Manager and classic deployment models. For the classic model, policy-based VPN gateways are the same as static gateways, and route-based gateways are the same as dynamic gateways.

| Capability or feature | Policy-based Basic VPN Gateway | Route-based Basic VPN Gateway | Route-based Standard VPN Gateway | Route-based High Performance VPN Gateway |
| --- | --- | --- | --- | --- |
| Site-to-site (S2S) connectivity | Policy-based VPN configuration | Route-based VPN configuration | Route-based VPN configuration | Route-based VPN configuration |
| Point-to-site (P2S) connectivity | Not supported | Supported (can coexist with S2S) | Supported (can coexist with S2S) | Supported (can coexist with S2S) |
| Authentication method | Pre-shared key | Pre-shared key for S2S connectivity. Certificates for P2S connectivity. | Pre-shared key for S2S connectivity. Certificates for P2S connectivity. | Pre-shared key for S2S connectivity. Certificates for P2S connectivity. |
| Maximum number of S2S connections | 1 | 10 | 10 | 30 |
| Maximum number of P2S connections | Not supported | 128 | 128 | 128 |
| Active routing support (Border Gateway Protocol) | Not supported | Not supported | Supported | Supported |


### <a name="change"></a> Move to a new gateway SKUs

Standard and High Performance SKUs will be deprecated on June 30th, 2026. All legacy SKUs use Basic IP address today, and we recommend you use the Azure portal to [migrate a Basic IP address to a Standard IP address](basic-public-ip-migrate-about.md) before the retirement date. As part of Basic IP address migration, your legacy SKU will also be migrated to a newer SKU that's supported by availability zones. For more information, see the [Legacy SKU deprecation](#sku-deprecation) section. For the most up-to-date timeline, see [What's new in Azure VPN Gateway?](whats-new.md).


If you're working with the Azure Resource Manager deployment model, you can change to the new gateway SKUs. When you change from a legacy gateway SKU to a new SKU, you delete the existing VPN gateway and create a new VPN gateway.

Workflow:

1. Remove any connections to the virtual network gateway.
1. Delete the old VPN gateway.
1. Create the new VPN gateway.
1. Update your on-premises VPN devices with the new VPN gateway IP address (for site-to-site connections).
1. Update the gateway IP address value for any network-to-network local network gateways that connect to this gateway.
1. Download new client VPN configuration packages for point-to-site clients that connect to the virtual network through this VPN gateway.
1. Re-create the connections to the virtual network gateway.

Considerations:

* To move to the new SKUs, your VPN gateway must be in the Resource Manager deployment model.
* If you have a classic VPN gateway, you must continue to use the older legacy SKUs for that gateway. You can resize between the legacy SKUs. You can't change to the new SKUs.
* When you change from a legacy SKU to a new SKU, you'll have connectivity downtime.
* When you change to a new gateway SKU, the public IP address for your VPN gateway changes. This change happens even if you specified the same public IP address object that you used previously.


## SKU deprecation

The Standard and High Performance SKUs will be deprecated on June 30th, 2026. All legacy SKUs use Basic IP addresses today, and you can use the Azure portal to [migrate a Basic IP address to a Standard IP address](basic-public-ip-migrate-about.md) before the retirement date. As part of Basic IP migration, your legacy SKU will also be migrated to AZ SKU family.

For more information, you can:

* View the [announcement](https://go.microsoft.com/fwlink/?linkid=2255127).
* See the SKU deprecation [FAQs](#sku-deprecation-faqs).

With the current Basic IP address migration tool, your gateway SKU will automatically migrate to the following SKUs:

* Standard SKU becomes VpnGw1AZ.
* High Performance SKU becomes VpnGw2AZ.

Performance improves after this migration.

## SKU deprecation FAQs


### Can I create a new gateway that uses a Standard or High Performance SKU after the deprecation?
  
No.

### How long will my existing gateways be supported on the Standard and High Performance SKUs?

The customer initiated migration as well the gateways will be supported until the retirement date.

### Will my IP address change when my legacy VPN gateway SKU is migrated?

No, the IP address won't change when you migrate by using the Azure portal. You can choose to migrate a Basic SKU IP address to a Standard SKU IP address. For more information, see [About migrating a Basic SKU public IP address to Standard SKU for VPN Gateway](basic-public-ip-migrate-about.md).

### Do I need to migrate my gateways from the Standard or High Performance SKU right now?
  
You must migrate the Basic IP address on your gateway by using the Azure portal, if you want to retain the IP address. As part of this migration, your gateways are automatically migrated to gateway SKUs that are supported by availability zones.

### Will there be any pricing difference for my gateways after migration?

Your SKUs are automatically migrated and upgraded to SKUs that are supported by availability zones, as part of Basic IP address migration. See [VPN Gateway pricing](https://azure.microsoft.com/pricing/details/vpn-gateway/) for more details.

### Will there be any performance impact on my gateways with this migration?

Yes. You get better performance with the VpnGw1AZ and VpnGw2AZ SKUs. For more information about SKU throughput, see [About gateway SKUs](https://go.microsoft.com/fwlink/?linkid=2256302).

### What happens if I don't migrate by retirement date?

To ensure a smooth transition, we strongly recommend that customers use the Basic IP migration tool to migrate their Basic IPs and associated gateways. After Jun 2026, we'll attempt to automatically migrate all gateways that still use the Standard or High Performance SKU:

* Gateways on the Standard SKU will be automatically upgraded to VpnGw1AZ.
* Gateways on the High Performance SKU will be automatically upgraded to VpnGw2AZ.

If we encounter constraints such as an insufficient subnet size, **the automatic gateway migration cannot be completed**. In this case, you’ll need to take the required steps to resolve the issue. You can continue migrating your gateway using the Azure portal until backend migration support is available.

### Is the VPN Gateway Basic SKU also retiring?

No, the VPN Gateway Basic SKU isn't retiring. You can create a VPN gateway by using the Basic SKU via Azure PowerShell or the Azure CLI. The VPN Gateway Basic SKU currently supports only the Basic SKU public IP address resource.


## Related content

* For more information about the new VPN Gateway SKUs, see [Gateway SKUs](vpn-gateway-about-vpngateways.md#gwsku).
* For more information about configuration settings, see [About VPN Gateway configuration settings](vpn-gateway-about-vpn-gateway-settings.md).
