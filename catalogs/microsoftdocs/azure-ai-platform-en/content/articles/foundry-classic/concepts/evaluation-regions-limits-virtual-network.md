---
title: "Rate limits, region support, and enterprise features for evaluation (classic)"
description: "Learn about region availability, rate limits, virtual network support, and using your own storage account for evaluation in Microsoft Foundry. (classic)"
author: lgayhardt
ms.author: lagayhar
ms.reviewer: skohlmeier
ms.date: 02/10/2026
ms.topic: how-to
ms.service: microsoft-foundry
ms.subservice: foundry-observability
ms.custom:
  - references_regions
  - classic-and-new
ROBOTS: NOINDEX, NOFOLLOW
---

# Rate limits, region support, and enterprise features for evaluation (classic)

**Currently viewing:**  **Foundry (classic) portal version** - [Switch to version for the new Foundry portal](../../foundry/concepts/evaluation-regions-limits-virtual-network.md)


This article provides an overview of which regions support AI-assisted evaluators, the rate limits that apply to evaluation runs, how to configure virtual network support for network isolation, and using your own storage account to run evaluations.

## Regional availability

### Supported regions for Agent playground evaluations

The agent playground evaluations are supported in the following regions:

| Americas | Europe |
| --- | --- |
| East US 2 | France Central |
| West US | Norway East |
| West US 2 | Sweden Central |
| West US 3 | Germany West Central |
| Central US | Italy North |
| East US | Poland Central |
| North Central US | Spain Central |
| South Central US |  |

### Supported regions for batch evaluations

The batch evaluations are supported in the following regions:

| Americas | Europe | Asia Pacific | Middle East & Africa |
| --- | --- | --- | --- |
| Brazil South | France Central | Australia East | South Africa North |
| Canada Central | Germany West Central | Central India | UAE North |
| Canada East | Italy North | East Asia |  |
| Central US | North Europe | Japan East |  |
| East US | Norway East | Japan West |  |
| East US 2 | Poland Central | Korea Central |  |
| North Central US | Spain Central | South India |  |
| South Central US | Sweden Central | Southeast Asia |  |
| West Central US | Switzerland North |  |  |
| West US | UK South |  |  |
| West US 2 | West Europe |  |  |
| West US 3 |  |  |  |

### Supported regions for risk and safety evaluators

These regions support the following safety evaluators: Hate and unfairness, Sexual, Violent, Self-harm, Indirect attack, Code vulnerabilities, and Ungrounded attributes.

| Americas | Europe | Asia Pacific |
| --- | --- | --- |
| Brazil South | France Central | Australia East |
| Canada Central | Germany West Central |  |
| Canada East | Italy North |  |
| Central US | Norway East |  |
| East US | Poland Central |  |
| East US 2 | Spain Central |  |
| North Central US | Sweden Central |  |
| South Central US | Switzerland North |  |
| West Central US | Switzerland West |  |
| West US | West Europe |  |
| West US 3 |  |  |

Supported regions for Groundedness Pro:

- East US 2
- Sweden Central

Supported regions for Protected material:

- East US 2


### Supported regions for AI red teaming

AI red teaming is supported in the following regions.

- East US 2
- France Central
- Sweden Central
- Switzerland West
- US North Central


### Supported regions for data generation

The following regions support synthetic data generation and trace-to-dataset generation:

| Americas | Europe | Asia Pacific | Middle East & Africa |
| --- | --- | --- | --- |
| Brazil South | France Central | Australia East | South Africa North |
| Canada Central | Germany West Central | Japan East | UAE North |
| Canada East | Italy North | Japan West |  |
| Central US | Norway East | Korea Central |  |
| East US | Poland Central | South India |  |
| East US 2 | Spain Central | Southeast Asia |  |
| North Central US | Sweden Central |  |  |
| South Central US | Switzerland North |  |  |
| West Central US | Switzerland West |  |  |
| West US | UK South |  |  |
| West US 3 | UK West |  |  |
|  | West Europe |  |  |

### Azure OpenAI graders regional availability

For the Azure OpenAI graders regional list, see [Regional availability](../openai/how-to/evaluations.md#regional-availability).

## Rate limits

The following rate limits apply to evaluation runs:

| Limit | Value |
| --- | --- |
| Maximum size per row | 2 MB |
| Maximum rows per batch evaluation | 100,000 |

Evaluation run creations are rate-limited at the tenant, subscription, and project levels. If you exceed the limit:

- The response includes a `retry-after` header with the wait time.
- The response body contains rate limit details.

Use exponential backoff when retrying failed requests.


## Bring your own storage

You can use your own storage account to run evaluations for your Foundry project, whether the project is configured with a virtual network or without one.

For projects without a virtual network, you can either use a Bicep template or [manually create and provision access](../how-to/evaluations-storage-account.md) to your storage account in the Azure portal. For projects with a virtual network, the storage setup is already included in the [setup template](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/15a-private-network-evaluation-only-setup). To use the non-virtual-network Bicep template, follow these steps.
1. Create and connect your storage account to your Foundry project at the resource or project level. You can [use a Bicep template](https://github.com/microsoft-foundry/foundry-samples/blob/main/infrastructure/infrastructure-setup-bicep/01-connections/connection-storage-account.bicep), which provisions and connects a storage account to your Foundry project with key authentication.
1. Make sure the connected storage account has access to the account and project.
1. If you connected your storage account by using Microsoft Entra ID, make sure to give the managed identity **Storage Blob Data Owner** permissions to both your account and the Foundry project resource in the Azure portal.


## Related content

- [How to configure a private link](../../foundry/how-to/configure-private-link.md)
- [Observability for generative AI applications](../../foundry/concepts/observability.md)
- [Assign Azure roles for access to blob data](https://learn.microsoft.com/azure/storage/blobs/assign-azure-role-data-access)
