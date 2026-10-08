---
title: 'Tutorial: Add security headers with Rules Engine'
titleSuffix: Azure Front Door
description: In this tutorial, you learn how to configure a security header via Rules Engine on Azure Front Door using the Azure portal.
author: halkazwini
ms.author: halkazwini
ms.service: azure-frontdoor
ms.topic: tutorial
ms.date: 04/10/2025

# Customer intent: As an IT admin, I want to learn about Front Door and how to configure a security header via Rules Engine.
---

# Tutorial: Add security headers with rules engine

**Applies to:** :heavy_check_mark: Front Door (classic)

> **Important:**
> Azure Front Door (classic) retires on **March 31, 2027**. Because the service is retiring, it no longer supports profile creation, new domain onboarding, or managed certificates. To avoid service disruption, ⁠[**migrate to Azure Front Door Standard or Premium**](migrate-tier.md). For more information, see ⁠[**Azure Front Door (classic) retirement**](https://azure.microsoft.com/updates?id=azure-front-door-classic-will-be-retired-on-31-march-2027).

This tutorial demonstrates how to implement security headers to prevent browser-based vulnerabilities such as HTTP Strict-Transport-Security (HSTS), X-XSS-Protection, Content-Security-Policy, and X-Frame-Options. Security attributes can also be defined with cookies.

The example in this tutorial shows how to add a Content-Security-Policy header to all incoming requests that match the path defined in the route associated with your rules engine configuration. In this scenario, only scripts from the trusted site `https://apiphany.portal.azure-api.net` are allowed to run on the application.

In this tutorial, you learn how to:
> 
> - Configure a Content-Security-Policy within rules engine.

## Prerequisites

* An Azure subscription.
* An Azure Front Door. To complete this tutorial, you must have an Azure Front Door configured with rules engine. For more information, see [Create an Azure Front Door](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/quickstart-create-front-door.md) and [Configure your rules engine](front-door-tutorial-rules-engine.md).

## Add a Content-Security-Policy header in Azure portal

1. In your Azure Front Door resource, select **Rules engine configuration** under **Settings**. Choose the rules engine where you want to add the security header.

2. Select **Add rule** to create a new rule. Name the rule and then select **Add an Action** > **Response Header**.

3. Set the Operator to **Append** to add this header to all incoming requests for this route.

4. Enter the header name: *Content-Security-Policy* and specify the values for this header. In this example, use *`script-src 'self' https://apiphany.portal.azure-api.net`*. Select **Save**.

    Screenshot showing the added security header.

   > **Note:**
   > Header values are limited to 640 characters.

5. After adding the rules, associate your Rules engine configuration with the Route Rule of your chosen route. This step is necessary for the rule to take effect.

    Screenshot showing how to associate a routing rule.

    > **Note:**
    > In this example, no [match conditions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/frontdoor/front-door-rules-engine-match-conditions.md) were added to the rule. The rule will apply to all incoming requests that match the path defined in the Route Rule. To apply it to a subset of requests, add specific **match conditions** to the rule.

## Clean up resources

If you no longer need the security header rule configured in the previous steps, you can remove it by selecting **Delete rule** in the rules engine.

## Next step

> 
> [Web Application Firewall and Azure Front Door](front-door-waf.md)
