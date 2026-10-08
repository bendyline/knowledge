---
title: Include file
description: Include file
author: msakande
ms.reviewer: ambadal
ms.author: mopeakande
ms.service: microsoft-foundry
ms.topic: include
ms.date: 09/21/2026
ms.custom: include, classic-and-new
ai-usage: ai-assisted
---

Anthropic's Claude models bring advanced conversational AI capabilities to Microsoft Foundry, enabling you to build intelligent applications with state-of-the-art language understanding and generation. Claude models excel at complex reasoning, code generation, and multimodal tasks including image analysis.

In this article, you learn how to:

- Deploy Claude models in Microsoft Foundry
- Authenticate by using Microsoft Entra ID or API keys
- Call the Claude Messages API from Python, JavaScript, or REST

For available models, model versions, and capabilities, see [Claude models in Microsoft Foundry](../concepts/claude-models.md). For default quota by subscription type, see [Claude model quotas and rate limits](../concepts/claude-models-quotas-limits.md).


> **Important:**
> Items marked preview in this article are currently in preview. This preview is provided without a service-level agreement, and Microsoft doesn't recommend it for production workloads. Certain features might not be supported or might have constrained capabilities. For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Prerequisites

- An Azure subscription with a valid payment method. If you don't have an Azure subscription, create a [paid Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). See [subscription type and region support](#subscription-type-and-region-support) for more details.
- Access to Microsoft Foundry with appropriate permissions to create and manage resources.
- A [Microsoft Foundry project](../../how-to/create-projects.md) created in a supported deployment location. All Claude models (Hosted on Azure and Hosted on Anthropic infrastructure) support Global Standard deployments. The Hosted on Azure versions of some Claude models are also available for Data Zone Standard (US) deployment. For the exact Azure regions where Claude models are available for deployment, see [Region availability by deployment type](../concepts/models-from-partners.md#region-availability-by-deployment-type).
- [Foundry Models from partners and community](../concepts/models-from-partners.md) require access to **Azure Marketplace** to create subscriptions. Ensure that you have the [permissions required to subscribe to model offerings](../concepts/models-from-partners.md#permissions-required-to-subscribe-to-models-from-partners-and-community).
- **Contributor** or **Owner** role on the resource group to deploy models. For more information, see [Azure RBAC roles](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles).

## Subscription type and region support


To use Claude models in Microsoft Foundry, you must have a paid Azure subscription with a billing account in a country or region where Anthropic offers the models for purchase. For a list of common subscription-related errors, see [Common error messages and solutions](https://learn.microsoft.com/marketplace/purchase-saas-offer-in-azure-portal#common-error-messages-and-solutions). The following subscription types are currently not supported:
- Enterprise Accounts located in South Korea
- Cloud Solution Provider subscriptions
- Azure subscriptions that don't have an active pay-as-you-go billing method (for example, student, free trial, or startup credit–based accounts)
- Sponsored subscriptions that only use Azure credits. ***Note**: If you have an account with a credit card on file, the credit card will be charged instead of Azure Credits.*

For a list of supported regions, see [supported geographic locations](https://learn.microsoft.com/partner-center/marketplace-offers/marketplace-geo-availability-currencies?tabs=g--h--i--j--k#supported-geographic-locations). Note that, Anthropic's "Supported Regions Policy" may apply for the availability in your region, check [supported regions](https://aka.ms/supported_anthropic_regions) for details.


## Use the Claude on Foundry starter kit

To deploy Claude models in Microsoft Foundry using infrastructure-as-code tools, see [Deploy Claude models in Microsoft Foundry using Bicep or Terraform](https://learn.microsoft.com/azure/developer/ai/how-to/deploy-claude-foundry?context=/azure/foundry/context/context). The article is based on the [Claude on Foundry starter kit](https://github.com/Azure-Samples/claude#readme), and it covers how to provision a Foundry account and project, deploy your chosen Claude model, and configure authentication with Microsoft Entra ID or API keys using Bicep or Terraform automation.
