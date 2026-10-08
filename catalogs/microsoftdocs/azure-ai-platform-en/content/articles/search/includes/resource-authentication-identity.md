---
title: Include File
description: Include file for Azure AI Search authentication to Microsoft Foundry.
ms.service: azure-ai-search
ms.topic: include
ms.date: 02/11/2026
# Use this file to describe authentication for Foundry-integrated scenarios.
---

Azure AI Search connects to Microsoft Foundry models for certain skills, vectorizers, and agentic retrieval workloads. You can configure this connection to use Microsoft Entra ID authentication and role-based access.

To configure the recommended role-based access:

1. [Create a managed identity](../search-security-enable-roles.md) for your search service.

1. [Assign the following roles](https://learn.microsoft.com/azure/ai-foundry/concepts/rbac-foundry) in your Azure OpenAI resource or Microsoft Foundry resource.

    | Target Endpoint | Required Role | Scope |
    | --- | --- | --- |
    | GPT-4/5 & text-embedding-3 | Cognitive Services OpenAI User | Azure OpenAI Resource |
    | Azure AI Vision multimodal 4.0 | Cognitive Services User | Azure AI Multi-service Resource |
    | Content Understanding | Cognitive Services User | Microsoft Foundry Resource |
    | Foundry Model Orchestration | Foundry User | Foundry Project |


> **Important:**
> The Foundry RBAC roles were recently renamed. **Foundry User**, **Foundry Owner**, **Foundry Account Owner**, and **Foundry Project Manager** were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project Manager. You might still see the previous names in some places while the rename rolls out. The role IDs and core permissions are unchanged by the rename.


1. Choose **Managed identity** and then assign your [search service managed identity](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/includes/search-how-to-managed-identities.md).
