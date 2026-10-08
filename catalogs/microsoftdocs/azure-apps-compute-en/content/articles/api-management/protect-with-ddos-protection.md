---
title: Defend API Management Against DDoS Attacks 
description: Learn how to protect your API Management instance in an external virtual network against volumetric and protocol DDoS attacks by using Azure DDoS Protection.
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 08/24/2026
ms.custom: sfi-image-nochange

#customer intent: As an API developer, I want to protect my API Management instance against DDoS attacks so that my APIs stay available during volumetric and protocol attacks.
---
# Defend your Azure API Management instance against DDoS attacks

**APPLIES TO: Developer | Premium**



This article shows how to defend your Azure API Management instance against distributed denial of service (DDoS) attacks by enabling [Azure DDoS Protection](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/ddos-protection-overview.md). Azure DDoS Protection provides enhanced DDoS mitigation features to defend against volumetric and protocol DDoS attacks.​


> **Note:**
> For web workloads, we highly recommend that you use [Azure DDoS Protection](https://learn.microsoft.com/azure/ddos-protection/ddos-protection-overview) and a [web application firewall](https://learn.microsoft.com/azure/web-application-firewall/overview) to safeguard against emerging DDoS attacks. Another option is to employ [Azure Front Door](https://learn.microsoft.com/azure/frontdoor/web-application-firewall) along with a web application firewall. Azure Front Door offers [platform-level protection](https://learn.microsoft.com/azure/frontdoor/front-door-ddos) against network-level DDoS attacks. For more information, see [Security baseline for Azure services](https://learn.microsoft.com/security/benchmark/azure/security-baselines-overview).


## Supported configurations

Enabling Azure DDoS Protection for API Management is supported only for instances **deployed (injected) in a VNet** in [external mode](api-management-using-with-vnet.md) or [internal mode](api-management-using-with-internal-vnet.md).

* External mode - All API Management endpoints are protected
* Internal mode - Only the management endpoint accessible on port 3443 is protected

### Unsupported configurations

* Instances that aren't VNet-injected
* Instances configured with a [private endpoint](private-endpoint.md)

## Prerequisites

* An API Management instance
    * The instance must be deployed in an Azure VNet in [external mode](api-management-using-with-vnet.md) or [internal mode](api-management-using-with-internal-vnet.md).
    * The instance must be configured with an Azure public IP address resource.

* An Azure DDoS Protection [plan](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection.md)
    * The plan you select can be in the same, or different, subscription than the virtual network and the API Management instance. If the subscriptions differ, they must be associated to the same Microsoft Entra tenant.
    * You may use a plan created using either the Network DDoS protection SKU or IP DDoS Protection SKU. See [Azure DDoS Protection SKU Comparison](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/ddos-protection-sku-comparison.md).

        > **Note:**
        > Azure DDoS Protection plans incur additional charges. For more information, see [Pricing](https://azure.microsoft.com/pricing/details/ddos-protection/).
     
## Enable DDoS Protection

Depending on the DDoS Protection plan you use, enable DDoS protection on the virtual network used for your API Management instance, or the IP address resource configured for your virtual network.

### Enable DDoS Protection on the virtual network used for your API Management instance

1. In the [Azure portal](https://portal.azure.com), navigate to the VNet where your API Management is injected.
1. In the left menu, under **Settings**, select **DDoS protection**.
1. Select **Enable**, and then select your **DDoS protection plan**.
1. Select **Save**.

    Screenshot of enabling a DDoS Protection plan on a VNet in the Azure portal.

### Enable DDoS protection on the API Management public IP address

If your plan uses the IP DDoS Protection SKU, see [Enable DDoS IP Protection for a public IP address](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/manage-ddos-protection-powershell-ip.md#enable-ddos-ip-protection-for-a-public-ip-address).

## Related content

* Learn how to verify DDoS protection of your API Management instance by [testing with simulation partners](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/test-through-simulations.md)
* Learn how to [view and configure Azure DDoS Protection telemetry](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/ddos-protection/telemetry.md)
