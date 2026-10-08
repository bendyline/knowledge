---
title: Configure HTTP to HTTPS redirection using the Azure portal
titleSuffix: Azure Front Door
description: This article shows you how to redirect traffic from HTTP to HTTPS for an Azure Front Door (classic) profile using the Azure portal.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: how-to
ms.date: 11/15/2024
---

# Configure HTTP to HTTPS redirection using the Azure portal

> **Important:**
> Azure Front Door (classic) retires on **March 31, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](migrate-tier.md). For more information, see ⁠[**Azure Front Door (classic) retirement**](https://azure.microsoft.com/updates?id=azure-front-door-classic-will-be-retired-on-31-march-2027).

This guide explains how to redirect traffic from HTTP to HTTPS for an Azure Front Door (classic) profile using the Azure portal. This setup ensures that all traffic to your domain is securely redirected to HTTPS.

## Prerequisites

* An existing Azure Front Door (classic) profile. For more information, see [create a Front Door (classic) profile](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/quickstart-create-front-door.md).

## Create HTTP to HTTPS redirect rule

1. Sign in to the [Azure portal](https://portal.azure.com).

2. Navigate to the Azure Front Door (classic) profile you want to configure. Select **Front Door designer** under *Settings* in the left-hand menu.

3. Select the **+** icon under *Routing rules* to create a new route. Name the route, for example, **HttpToHttpsRedirect**, and set the *Accepted Protocol* to **HTTP only**. Choose the *Frontend/domains* you want to redirect from HTTP to HTTPS.

4. In the *Route Details* section, set the *Route Type* to **Redirect**. Choose **Moved (301)** for *Redirect type* and **HTTPS only** for *Redirect protocol*.

    Screenshot of adding an HTTP to HTTPS redirect route.

5. Select **Add** to create the routing rule for HTTP to HTTPS redirection.

## Create forwarding rule

1. Add another routing rule for handling HTTPS traffic. Select the **+** icon under *Routing rules* to add a new route. Name the route, for example, **DefaultForwardingRoute**, and set the *Accepted Protocols* to **HTTPS only**. Select the appropriate *Frontend/domains* for accepting this traffic.

2. In the *Route Details* section, set the *Route Type* to **Forward**. Choose a backend pool to forward the traffic to and set the *Forwarding Protocol* to **HTTPS only**.

    Screenshot of adding a forward route for HTTPS traffic.

3. Select **Add** to create the forwarding route, then select **Save** to apply the changes to the Front Door profile.

> **Note:**
> Creating this redirect rule will incur a small charge.

## Next steps

- Learn more about [Azure Front Door routing architecture](front-door-routing-architecture.md).
- Learn more about [Azure Front Door URL redirect](front-door-url-redirect.md).
