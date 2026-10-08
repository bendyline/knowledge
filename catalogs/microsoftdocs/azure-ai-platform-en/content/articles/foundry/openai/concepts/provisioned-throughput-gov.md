---
title: "Provisioned throughput for Foundry Models in Azure Government"
description: "Learn how fungible PTU quota, hourly billing, Azure Reservations, and model eligibility work for provisioned deployments in Azure Government."
ai-usage: ai-assisted
ms.service: microsoft-foundry
ms.subservice: foundry-models
ms.topic: concept-article
ms.date: 09/02/2026
ms.custom:
  - classic-and-new
author: challenp
ms.author: chaparker
recommendations: false
#customerIntent: As a developer using Azure Government, I want to understand provisioned throughput eligibility, quota, and payment options so that I can plan a supported PTU deployment.
---

# Provisioned throughput for Foundry Models in Azure Government


Azure Government supports model-independent, or fungible, provisioned throughput unit (PTU) quota and Azure Reservations for eligible models. This article is the Azure Government companion to [Provisioned throughput for Foundry Models](provisioned-throughput.md). It describes only the requirements that differ in Azure Government. Use the shared provisioned throughput guidance for all other concepts and procedures.

## Azure Government differences

| Area | Azure Government behavior |
| --- | --- |
| Model eligibility | `gpt-5.1` and earlier models use commitment-based PTUs. Models released after `gpt-5.1` use fungible PTU quota and Azure Reservations when those models are available for provisioned deployment in Azure Government. |
| PTU quota | PTU quota is model-independent for eligible models. You can use the same quota pool for supported models within the same Azure Government region and provisioned deployment type. |
| Payment options | Provisioned deployments for models released after `gpt-5.1` are billed hourly. You can use an Azure Reservation to apply a term discount. Monthly PTU commitments support `gpt-5.1` and earlier models only. |

> **Important:**
> Eligibility for fungible PTU quota and Azure Reservations doesn't indicate model or regional availability. Check availability before you plan a deployment.

An Azure Reservation provides a billing discount. It doesn't reserve model capacity. A one-month Azure Reservation isn't a legacy monthly PTU commitment.

## Transition from monthly commitments

Before this update, Azure Government provisioned deployments used monthly PTU commitments. The new hourly and Azure Reservation payment model applies to models released after `gpt-5.1`. This update doesn't change the commitment-based payment model for `gpt-5.1` and earlier models.

For an eligible deployment, the PTUs that you deploy generate hourly charges. You can apply an Azure Reservation discount to those charges. The PTU quota determines how many PTUs you can deploy, while the reservation determines how the deployed PTUs are discounted.

## Request fungible PTU quota

Use the [Azure Government quota request form](https://aka.ms/AOAIGovQuota) to request both standard quota and fungible PTU quota.

Having PTU quota doesn't guarantee that model capacity is available. Check model and regional availability before you plan a deployment.

## Continue with provisioned throughput guidance

After you review the Azure Government differences, use the shared guidance for common provisioned throughput tasks.

| Task | Guidance |
| --- | --- |
| Understand PTUs, quota, and capacity | [Provisioned throughput for Foundry Models](provisioned-throughput.md) |
| Estimate the PTUs for a workload | [Determine PTU sizing for a workload](../how-to/provisioned-throughput-sizing.md) |
| Understand hourly billing and Azure Reservations | [Provisioned throughput billing and cost management](provisioned-throughput-billing.md) |
| Check models and regions | [Foundry Models sold by Azure in Azure Government](../../foundry-models/concepts/models-sold-directly-by-azure-gov.md) |
| Compare deployment types | [Deployment types for Microsoft Foundry Models in Azure Government](../../foundry-models/concepts/deployment-types-gov.md) |
| Review quota limits | [Azure OpenAI quotas and limits in Azure Government](../quotas-limits-gov.md) |
