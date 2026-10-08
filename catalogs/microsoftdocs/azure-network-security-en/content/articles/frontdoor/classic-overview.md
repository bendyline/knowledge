---
title: Azure Front Door (classic) overview
description: This article provides an overview of the Azure Front Door (classic) service.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: overview
ms.date: 05/04/2026

# Customer intent: As an IT admin, I want to learn about Front Door and what I can use it for.
---

# What is Azure Front Door (classic)?

**Applies to:** :heavy_check_mark: Front Door (classic)

> **Important:**
> Azure Front Door (classic) retires on **March 31, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](migrate-tier.md). For more information, see ⁠[**Azure Front Door (classic) retirement**](https://azure.microsoft.com/updates?id=azure-front-door-classic-will-be-retired-on-31-march-2027).

Azure Front Door (classic) is a global, scalable entry point that uses the Microsoft global edge network to deliver fast, secure, and highly scalable web applications. It enables you to transform your global consumer and enterprise applications into robust, high-performing, and personalized modern applications that reach a global audience through Azure.

Diagram of Azure Front Door (classic) routing user traffic to endpoints.

Front Door (classic) operates at Layer 7 (HTTP/HTTPS layer) using anycast protocol with split TCP and Microsoft's global network to enhance global connectivity. Depending on your routing method, Front Door (classic) ensures that client requests are routed to the fastest and most available application backend. An application backend can be any Internet-facing service hosted inside or outside of Azure. Front Door (classic) offers various [traffic-routing methods](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md) and [backend health monitoring options](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-health-probes.md) to meet different application needs and support automatic failover scenarios. Similar to [Traffic Manager](../traffic-manager/traffic-manager-overview.md), Azure Front Door (classic) is resilient to failures, including failures affecting an entire Azure region.

> **Note:**
> Azure provides a suite of fully managed load-balancing solutions for various scenarios:
> * For DNS-based global routing without the need for Transport Layer Security (TLS) protocol termination ("SSL offload") or per-HTTP/HTTPS request/application-layer processing, consider [Traffic Manager](../traffic-manager/traffic-manager-overview.md).
> * For application layer load balancing within a region, consider [Application Gateway](../application-gateway/overview.md).
> * For network layer load balancing, consider [Load Balancer](../load-balancer/load-balancer-overview.md).
> 
> Combining these solutions might benefit your end-to-end scenarios. For a comparison of Azure load-balancing options, see [Overview of load-balancing options in Azure](https://learn.microsoft.com/azure/architecture/guide/technology-choices/load-balancing-overview).

## Why use Azure Front Door (classic)?

Azure Front Door (classic) helps you efficiently build, operate, and scale dynamic web applications and static content. It optimizes global web traffic routing for top-tier end-user performance and reliability through quick global failover. Key features include:

* Accelerated application performance using **[split TCP](front-door-traffic-acceleration.md?pivots=front-door-classic#connect-to-the-front-door-edge-location-split-tcp)** and **[anycast protocol](front-door-traffic-acceleration.md?pivots=front-door-classic#select-the-front-door-edge-location-for-the-request-anycast)**.
* Intelligent **[health probe](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-health-probes.md)** monitoring for backend resources.
* **[URL-path based](front-door-route-matching.md?pivots=front-door-classic)** routing for requests.
* Hosting multiple websites for efficient application infrastructure.
* Cookie-based **[session affinity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md#affinity)**.
* **[SSL offloading](front-door-custom-domain-https.md)** and certificate management.
* Custom **[domain](front-door-custom-domain.md)** definition.
* Application security with integrated **[Web Application Firewall (WAF)](../web-application-firewall/overview.md)**.
* HTTP to HTTPS redirection with **[URL redirect](front-door-url-rewrite.md?pivots=front-door-classic)**.
* Custom forwarding paths with **[URL rewrite](front-door-url-rewrite.md?pivots=front-door-classic)**.
* Native support for end-to-end IPv6 connectivity and **[HTTP/2 protocol](front-door-http2.md)**.

## Pricing

For pricing details, see [Front Door Pricing](https://azure.microsoft.com/pricing/details/frontdoor/). For service level agreements, see [SLA for online services](https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services).

## Next step

> 
> [Azure Front Door (classic) to Standard/Premium tier migration](tier-migration.md)
