---
title: Routing Architecture
titleSuffix: Azure Front Door
description: This article helps you understand the global view aspect of Front Door's architecture.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: concept-article
ms.date: 02/24/2026
zone_pivot_groups: front-door-tiers
---

# Routing architecture overview

Azure Front Door traffic routing takes place over multiple stages. First, traffic is routed from the client to the Front Door. Then, Front Door uses your configuration to determine the origin to send the traffic to. The Front Door web application firewall, routing rules, rules engine, and caching configuration can all affect the routing process.

**Applies to: front-door-standard-premium**


The following diagram illustrates the routing architecture:

Diagram that shows the Front Door routing architecture, including each step and decision point.



**Applies to: front-door-classic**


> **Important:**
> Azure Front Door (classic) retires on **March 31, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](migrate-tier.md). For more information, see ⁠[**Azure Front Door (classic) retirement**](https://azure.microsoft.com/updates?id=azure-front-door-classic-will-be-retired-on-31-march-2027).

The following diagram illustrates the routing architecture:

Diagram that shows the Front Door routing architecture, including each step and decision point.



The following sections describe these steps in detail.

**Applies to: front-door-standard-premium**


## Name resolution by Azure Front Door's Traffic Manager profile returns PoP unicast IP

The user or client application initiates a connection to the origin behind Azure Front Door. The domain name resolves to the Front Door's Azure Traffic Manager endpoint. The Traffic Manager consumes health and availability signals from all the Front Door PoPs across the world. It determines the optimal PoP to serve the request and returns the unicast IP of that PoP.

## Connect to Azure Front Door PoP Unicast IP

Client makes a direct connection to the returned IP address of the Front Door PoP location.

## Match request to a Front Door profile

When Front Door receives an HTTP request, it uses the request's `Host` header to match the request to the correct customer's Front Door profile. If the request is using a [custom domain name](standard-premium/how-to-add-custom-domain.md), the domain name must be registered with Front Door to enable requests to get matched to your profile.



**Applies to: front-door-classic**


## Select and connect to the Front Door edge location

The user or client application initiates a connection to the Front Door. The connection terminates at an edge location closest to the end user. Front Door's edge location processes the request.

For more information about how requests are made to Front Door, see [Front Door traffic acceleration](front-door-traffic-acceleration.md).

## Match request to a front door

When Front Door receives an HTTP request, it uses the request's `Host` header to match the request to the correct customer's Front Door instance. If the request is using a [custom domain name](front-door-custom-domain.md), the domain name must be registered with Front Door to enable requests to get matched to your Front door.



The client and server perform a TLS handshake using the TLS certificate you configured for your custom domain name, or by using the Front Door certificate when the `Host` header ends with `*.azurefd.net`.

## Evaluate WAF rules

**Applies to: front-door-standard-premium**


If your domain has Web Application Firewall enabled, WAF rules are evaluated.



**Applies to: front-door-classic**


If your frontend has Web Application Firewall enabled, WAF rules are evaluated.



If a rule gets violated, Front Door returns an error to the client and the request processing stops.

**Applies to: front-door-standard-premium**


## Match a route

Front Door matches the request to a route. Learn more about the [route matching process](front-door-route-matching.md).

The route specifies the [origin group](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/standard-premium/concept-origin.md) that the request should be sent to.



**Applies to: front-door-classic**


## Match a routing rule

Front Door matches the request to a routing rule. Learn more about the [route matching process](front-door-route-matching.md).

The route specifies the [backend pool](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-backend-pool.md) that the request should be sent to.



**Applies to: front-door-standard-premium**


## Evaluate rule sets

If you define [rule sets](front-door-rules-engine.md) for the route, they get process in the order configured. [Rule sets can override the origin group](front-door-rules-engine-actions.md#RouteConfigurationOverride) specified in a route. Rule sets can also trigger a redirection response to the request instead of forwarding it to an origin.



**Applies to: front-door-classic**


## Evaluate rules engines

If you define [rules engines](front-door-rules-engine.md) for the route, they get process in the order configured. [Rules engines can override the backend pool](front-door-rules-engine-actions.md#route-configuration-overrides) specified in a routing rule. Rules engines can also trigger a redirection response to the request instead of forwarding it to a backend.



## Return cached response

**Applies to: front-door-standard-premium**


If the Front Door routing rule has [caching](front-door-caching.md) enabled, and the Front Door edge location's cache includes a valid response for the request, then Front Door returns the cached response.

If caching is disabled or no response is available, the request is forwarded to the origin.



**Applies to: front-door-classic**


If the Front Door routing rule has [caching](front-door-caching.md) enabled, and the Front Door edge location's cache includes a valid response for the request, then Front Door returns the cached response.

If caching is disabled or no response is available, the request is forwarded to the backend.



**Applies to: front-door-standard-premium**


## Select origin

Front Door selects an origin to use within the origin group. Origin selection is based on several factors, including:

- Health of each origin, which Front Door monitors by using [health probes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-health-probes.md).
- [Routing method](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md) for your origin group.
- If you enable [session affinity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md#affinity)

## Forward the request to the origin

Finally, the request is forwarded to the origin.



**Applies to: front-door-classic**


## Select backend

Front Door selects a backend to use within the backend pool. Backend selection is based on several factors, including:

- Health of each backend, which Front Door monitors by using [health probes](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-health-probes.md).
- [Routing method](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md) for your backend pool.
- If you have enable [session affinity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-routing-methods.md#affinity)

## Forward the request to the backend

Finally, the request is forwarded to the backend.



## Next step

**Applies to: front-door-standard-premium**


> 
> [Create an Azure Front Door profile](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/standard-premium/create-front-door-portal.md)



**Applies to: front-door-classic**


> 
> [Create an Azure Front Door (classic) profile](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/quickstart-create-front-door.md)
