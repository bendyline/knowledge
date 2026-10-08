---
title: Azure AI Search
description: Ground Agent Framework agents with documents retrieved from Azure AI Search.
zone_pivot_groups: programming-languages
author: eavanvalkenburg
ms.topic: article
ms.author: edvan
ms.date: 09/30/2026
ms.service: agent-framework
ai-usage: ai-assisted
ms.custom: update-code1
---

<!--
  Language parity table - keep in sync when adding/removing sections.

  | Section            | C# | Python | Go | Notes                                  |
  |--------------------|:--:|:------:|:--:|----------------------------------------|
  | Search integration | ✅ |   ✅   | ❌ |                                        |
  | Semantic retrieval | ✅ |   ✅   | ❌ | Python has dedicated context provider  |
  | Agentic retrieval  | ❌ |   ✅   | ❌ | Azure AI Search Knowledge Bases        |
  | Go availability    | ✅ |   ✅   | ✅ | Go zone is status only                 |
-->

# Azure AI Search

Azure AI Search grounds Agent Framework agents with content from a search index. In Python, `AzureAISearchContextProvider` supports semantic and agentic retrieval. In .NET, connect an Azure AI Search client to `TextSearchProvider`.

This integration uses the RAG pattern: it retrieves relevant external content before model invocation without treating that content as conversational memory.

**Applies to: programming-language-csharp**


## Connect Azure AI Search to `TextSearchProvider`

Create a `SearchClient`, map search hits to `TextSearchProvider.TextSearchResult`, and attach the provider through `AIContextProviders`.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/dotnet/samples/04-hosting/FoundryHostedAgents/responses/Hosted-AzureSearchRag/Program.cs](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/integrations/by-component/context-providers/azure-ai-search.md)

The sample hosts the resulting agent in Foundry, but the search adapter works with a regular `ChatClientAgent`.



**Applies to: programming-language-python**


## Install the packages

```bash
pip install agent-framework-azure-ai-search agent-framework-foundry --pre
```

## Use semantic retrieval

Semantic mode performs search against an existing index and can combine keyword and vector retrieval.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/02-agents/context_providers/azure_ai_search/search_context_semantic.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/integrations/by-component/context-providers/azure-ai-search.md)

## Use agentic retrieval

Agentic mode uses an Azure AI Search Knowledge Base for query planning and multi-hop retrieval.

[Code reference unavailable in this source snapshot: ~/../agent-framework-code/python/samples/02-agents/context_providers/azure_ai_search/search_context_agentic.py](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/agent-framework/integrations/by-component/context-providers/azure-ai-search.md)

Some agentic output and reasoning options require the preview `azure-search-documents` package.

### Configure per-source retrieval

Pass `knowledge_source_params` to `AzureAISearchContextProvider` in agentic mode when a knowledge source needs options such as `filter_add_on`. Each entry replaces the provider-generated parameters for the matching `knowledge_source_name`; entries for other source names are appended.

When you don't set `include_reference_source_data`, the provider sets it to `True` on a copy so references retain their source data. An explicit `False` is preserved. Duplicate `knowledge_source_name` values raise `ValueError`, and `knowledge_source_params` isn't accepted in semantic mode.

### Forward caller identity for permission-aware retrieval

Set `query_source_credential=caller_credential` when a knowledge source uses
[document-level permissions](https://learn.microsoft.com/azure/search/search-query-access-control-rbac-enforcement)
and retrieval results must be security trimmed for each caller. Pass the signed-in caller's
sync or async Azure token credential separately from the application credential that connects
to Azure AI Search.

For each agentic retrieval, the provider requests a token for
`https://search.azure.com/.default`. It forwards the caller's Microsoft Entra identity in the
`x-ms-query-source-authorization` header so Azure AI Search can enforce the indexed permissions.

This option requires a preview `azure-search-documents` build, version `12.1.0b1` or later within
the supported 12.x range:

```bash
pip install --pre "azure-search-documents>=12.1.0b1,<13"
```

Agent Framework fails closed if the installed SDK doesn't support query-source authorization. It
raises a `ValueError` before sending a retrieval request. Token acquisition failures also stop
retrieval; the provider doesn't retry without the caller's identity.



**Applies to: programming-language-go**


> **Note:**
> Azure AI Search doesn't currently have a dedicated Agent Framework Go integration. Implement retrieval as a custom tool or context provider, or see the [Agent Framework Go repository](https://github.com/microsoft/agent-framework-go) for the latest status.



## Production considerations

- Prefer Microsoft Entra authentication or managed identity over search keys.
- Apply tenant-aware filters and index isolation.
- Treat retrieved content as untrusted input and mitigate indirect prompt injection.
- Preserve source metadata when the agent should cite documents.

## Next steps

> 
> [Microsoft Foundry](microsoft-foundry.md)
