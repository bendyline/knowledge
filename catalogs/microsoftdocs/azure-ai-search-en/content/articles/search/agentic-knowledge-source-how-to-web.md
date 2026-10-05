---
title: Create Web Knowledge Source for Agentic Retrieval
description: Learn how to create a Web Knowledge Source resource for agentic retrieval workloads in Azure AI Search.
ms.service: azure-ai-search
ms.custom:
  - ignite-2025
ms.topic: how-to
ms.date: 06/02/2026
ai-usage: ai-assisted
zone_pivot_groups: search-csharp-python-rest
#customer intent: As an application developer, I want to create and scope a Web Knowledge Source while accounting for its usage terms and limitations so that my knowledge base can supplement proprietary content with current information from permitted public web domains.
---

# Create a Web Knowledge Source resource


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).



> **Important:**
> Features, capabilities, or properties marked (preview) aren't covered by a service-level agreement, aren't recommended for production workloads, and might change or be constrained before they become generally available. The [Azure AI Search preview terms](https://learn.microsoft.com/azure/search/search-preview-terms) apply to all preview functionality, whether it's standalone or part of a generally available feature.


> **Important:**
> + Web Knowledge Source, which uses Grounding with Bing Search and/or Grounding with Bing Custom Search, is a [First Party Consumption Service](https://www.microsoft.com/licensing/terms/product/ForOnlineServices/EAEAS) governed by the [Grounding with Bing terms of use](https://www.microsoft.com/en-us/bing/apis/grounding-legal-enterprise) and the [Microsoft Privacy Statement](https://www.microsoft.com/privacy/privacystatement).
>
> + The [Microsoft Data Protection Addendum](https://www.microsoft.com/licensing/docs/view/Microsoft-Products-and-Services-Data-Protection-Addendum-DPA) doesn't apply to data sent to Web Knowledge Source. When Customer uses Web Knowledge Source, Customer Data flows outside the Azure compliance and Geo boundary. This also means use of Web Knowledge Source waives all elevated Government Community Cloud security and compliance commitments to include data sovereignty and screened/citizenship-based support, as applicable.
>
> + Use of Web Knowledge Source incurs costs; learn more about [pricing](https://www.microsoft.com/en-us/bing/apis).
>
> + Learn more about how Azure admins can [manage access to use of Web Knowledge Source](agentic-knowledge-source-how-to-web-manage.md).

*Web Knowledge Source* enables retrieval of real-time web data from Microsoft Bing in an agentic retrieval pipeline. [Knowledge sources](agentic-knowledge-source-overview.md) are created independently, referenced in a [knowledge base](agentic-retrieval-how-to-create-knowledge-base.md), and used as grounding data when the knowledge base is [queried at runtime](agentic-retrieval-how-to-retrieve.md).

Bing Custom Search is always the search provider for Web Knowledge Source. Although you can't specify alternative search providers or engines, you can include or exclude specific *domains*, such as https://learn.microsoft.com. When no domains are specified, Web Knowledge Source has unrestricted access to the entire public internet.

Web Knowledge Source works best alongside other knowledge sources. Use it when your proprietary content doesn't provide complete, up-to-date answers or when you want to supplement results with information from a commercial search engine.

### Usage support

| [Azure portal](get-started-portal-agentic-retrieval.md) | [Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/what-is-foundry-iq#workflow) | [.NET SDK](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) | [Python SDK](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [Java SDK](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md) | [REST API](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources) |
| --- | --- | --- | --- | --- | --- | --- |
| ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

## Prerequisites

+ An Azure subscription with [access to Web Knowledge Source](agentic-knowledge-source-how-to-web-manage.md). By default, access is enabled. Contact your admin if access is disabled.

+ An Azure AI Search service in any [public region that provides agentic retrieval](search-region-support.md). Web Knowledge Source isn't supported in private or sovereign clouds.

+ Permission to create knowledge sources. Configure [keyless authentication](search-get-started-rbac.md) with the **Search Service Contributor** role assigned to your user account (recommended) or use an [admin API key](search-security-api-keys.md).

**Applies to: csharp**


+ Required [`Azure.Search.Documents`](https://www.nuget.org/packages/Azure.Search.Documents) package:

  + For `2026-08-01-preview` features, the latest preview package: `dotnet add package Azure.Search.Documents --prerelease`

  + For `2026-04-01` features, the latest stable package: `dotnet add package Azure.Search.Documents`

+ For keyless authentication, the [`Azure.Identity`](https://www.nuget.org/packages/Azure.Identity) package: `dotnet add package Azure.Identity`



**Applies to: python**


+ Required [`azure-search-documents`](https://pypi.org/project/azure-search-documents/#history) package:

  + For `2026-08-01-preview` features, the latest preview package: `pip install --pre azure-search-documents`

  + For `2026-04-01` features, the latest stable package: `pip install azure-search-documents`

+ For keyless authentication, the [`azure-identity`](https://pypi.org/project/azure-identity/) package: `pip install azure-identity`



**Applies to: rest**


+ Required Search Service REST API version:

  + For preview features: [2026-08-01-preview](https://learn.microsoft.com/rest/api/searchservice/operation-groups?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)

  + For generally available features: [2026-04-01](https://learn.microsoft.com/rest/api/searchservice/operation-groups?view=rest-searchservice-2026-04-01\&preserve-view=true)

+ For keyless authentication, include a [Microsoft Entra ID token](search-get-started-rbac.md?pivots=rest#get-token) in the `Authorization` header of each HTTP request.



## Limitations and considerations

+ Web content is always summarized by an LLM before it's included in retrieval results. Results are cited summaries, not verbatim web text.

+ For the 2026-04-01 API version, the knowledge base must include a model reference to provide the LLM for web content summarization. Retrieval is always extractive (cited summaries). Answer synthesis and configurable reasoning effort aren't available in this version.

+ For the `2026-08-01-preview` API version, the knowledge base model reference also enables [answer synthesis (preview)](agentic-retrieval-how-to-answer-synthesis.md), which produces a single LLM-formulated response instead of extracted citations.

## Check for existing knowledge sources


A knowledge source is a top-level, reusable object. Knowing about existing knowledge sources is helpful for either reuse or naming new objects.

Run the following code to list knowledge sources by name and type.

**Applies to: csharp**


```csharp
// List knowledge sources by name and type
using Azure.Search.Documents.Indexes;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), credential);
var knowledgeSources = indexClient.GetKnowledgeSourcesAsync();

Console.WriteLine("Knowledge Sources:");

await foreach (var ks in knowledgeSources)
{
    Console.WriteLine($"  Name: {ks.Name}, Type: {ks.GetType().Name}");
}
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)



**Applies to: python**


```python
# List knowledge sources by name and type
from azure.core.credentials import AzureKeyCredential
from azure.search.documents.indexes import SearchIndexClient

index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))

for ks in index_client.list_knowledge_sources():
    print(f"  - {ks.name} ({ks.kind})")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


```http
### List knowledge sources by name and type
GET {{search-url}}/knowledgesources?api-version={{api-version}}&$select=name,kind
Authorization: Bearer {{token}}
```

**Reference:** [Knowledge Sources - List](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/list)



You can also return a single knowledge source by name to review its JSON definition.

**Applies to: csharp**


```csharp
using Azure.Search.Documents.Indexes;
using System.Text.Json;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), credential);

// Specify the knowledge source name to retrieve
string ksNameToGet = "earth-knowledge-source";

// Get its definition
var knowledgeSourceResponse = await indexClient.GetKnowledgeSourceAsync(ksNameToGet);
var ks = knowledgeSourceResponse.Value;

// Serialize to JSON for display
var jsonOptions = new JsonSerializerOptions 
{ 
    WriteIndented = true,
    DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.Never
};
Console.WriteLine(JsonSerializer.Serialize(ks, ks.GetType(), jsonOptions));
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)



**Applies to: python**


```python
# Get a knowledge source definition
from azure.core.credentials import AzureKeyCredential
from azure.search.documents.indexes import SearchIndexClient
import json

index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))

ks = index_client.get_knowledge_source("knowledge_source_name")
print(json.dumps(ks.as_dict(), indent = 2))
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


```http
### Get a knowledge source definition
GET {{search-url}}/knowledgesources/{{knowledge-source-name}}?api-version={{api-version}}
Authorization: Bearer {{token}}
```

**Reference:** [Knowledge Sources - Get](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/get)




The following JSON is an example response for a Web Knowledge Source resource.

```json
{
  "name": "my-web-ks",
  "kind": "web",
  "description": "A sample Web Knowledge Source.",
  "encryptionKey": null,
  "webParameters": {
    "domains": null
  }
}
```

## Create a knowledge source

Run the following code to create a web knowledge source.

**Applies to: csharp**


# [2026-08-01-preview](#tab/2026-08-01-preview)

```csharp
// Create Web Knowledge Source
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Identity;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new DefaultAzureCredential());

var knowledgeSource = new WebKnowledgeSource(name: "my-web-ks")
{
    Description = "A sample Web Knowledge Source.",
    WebParameters = new WebKnowledgeSourceParameters
    {
        Domains = new WebKnowledgeSourceDomains
        {
            AllowedDomains =
            {
                new WebKnowledgeSourceDomain(address: "learn.microsoft.com") { IncludeSubpages = true }
            },
            BlockedDomains =
            {
                new WebKnowledgeSourceDomain(address: "bing.com") { IncludeSubpages = false }
            }
        }
    }
};

await indexClient.CreateOrUpdateKnowledgeSourceAsync(knowledgeSource);
Console.WriteLine($"Knowledge source '{knowledgeSource.Name}' created or updated successfully.");
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient?view=azure-dotnet-preview\&preserve-view=true), [WebKnowledgeSource](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.webknowledgesource?view=azure-dotnet-preview\&preserve-view=true)

# [2026-04-01](#tab/2026-04-01)

```csharp
// Create Web Knowledge Source
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Identity;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new DefaultAzureCredential());

var knowledgeSource = new WebKnowledgeSource(name: "my-web-ks")
{
    Description = "A sample Web Knowledge Source.",
    WebParameters = new WebKnowledgeSourceParameters
    {
        Domains = new WebKnowledgeSourceDomains
        {
            AllowedDomains =
            {
                new WebKnowledgeSourceDomain(address: "learn.microsoft.com") { IncludeSubpages = true }
            },
            BlockedDomains =
            {
                new WebKnowledgeSourceDomain(address: "bing.com") { IncludeSubpages = false }
            }
        }
    }
};

await indexClient.CreateOrUpdateKnowledgeSourceAsync(knowledgeSource);
Console.WriteLine($"Knowledge source '{knowledgeSource.Name}' created or updated successfully.");
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient?view=azure-dotnet\&preserve-view=true), [WebKnowledgeSource](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.webknowledgesource?view=azure-dotnet\&preserve-view=true)

---



**Applies to: python**


# [2026-08-01-preview](#tab/2026-08-01-preview)

```python
# Create Web Knowledge Source
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import WebKnowledgeSource, WebKnowledgeSourceParameters, WebKnowledgeSourceDomains, WebKnowledgeSourceDomain

index_client = SearchIndexClient(endpoint = "<search-endpoint>", credential = DefaultAzureCredential())

knowledge_source = WebKnowledgeSource(
    name = "my-web-ks",
    description = "A sample Web Knowledge Source.",
    encryption_key = None,
    web_parameters = WebKnowledgeSourceParameters(
        domains = WebKnowledgeSourceDomains(
            allowed_domains = [ WebKnowledgeSourceDomain(address="learn.microsoft.com", include_subpages=True) ],
            blocked_domains = [ WebKnowledgeSourceDomain(address="bing.com", include_subpages=False) ]
        )
    )
)

index_client.create_or_update_knowledge_source(knowledge_source)
print(f"Knowledge source '{knowledge_source.name}' created or updated successfully.")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)

# [2026-04-01](#tab/2026-04-01)

```python
# Create Web Knowledge Source
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import WebKnowledgeSource, WebKnowledgeSourceParameters, WebKnowledgeSourceDomains, WebKnowledgeSourceDomain

index_client = SearchIndexClient(endpoint = "<search-endpoint>", credential = DefaultAzureCredential())

knowledge_source = WebKnowledgeSource(
    name = "my-web-ks",
    description = "A sample Web Knowledge Source.",
    encryption_key = None,
    web_parameters = WebKnowledgeSourceParameters(
        domains = WebKnowledgeSourceDomains(
            allowed_domains = [ WebKnowledgeSourceDomain(address="learn.microsoft.com", include_subpages=True) ],
            blocked_domains = [ WebKnowledgeSourceDomain(address="bing.com", include_subpages=False) ]
        )
    )
)

index_client.create_or_update_knowledge_source(knowledge_source)
print(f"Knowledge source '{knowledge_source.name}' created or updated successfully.")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)

---



**Applies to: rest**


# [2026-08-01-preview](#tab/2026-08-01-preview)

```http
### Create Web Knowledge Source
PUT {{search-endpoint}}/knowledgesources/my-web-ks?api-version=2026-08-01-preview
Content-Type: application/json
Authorization: Bearer {{search-access-token}}

{
  "name": "my-web-ks",
  "kind": "web",
  "description": "This knowledge source pulls content from the web.",
  "encryptionKey": null,
  "webParameters": {
    "domains": {
      "allowedDomains": [ { "address": "learn.microsoft.com", "includeSubpages": true } ],
      "blockedDomains": [ { "address": "bing.com", "includeSubpages": false } ]
    }
  }
}
```

**Reference:** [Knowledge Sources - Create or Update](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/create-or-update?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)

# [2026-04-01](#tab/2026-04-01)

```http
### Create Web Knowledge Source
PUT {{search-endpoint}}/knowledgesources/my-web-ks?api-version=2026-04-01
Content-Type: application/json
Authorization: Bearer {{search-access-token}}

{
  "name": "my-web-ks",
  "kind": "web",
  "description": "This knowledge source pulls content from the web.",
  "encryptionKey": null,
  "webParameters": {
    "domains": {
      "allowedDomains": [ { "address": "learn.microsoft.com", "includeSubpages": true } ],
      "blockedDomains": [ { "address": "bing.com", "includeSubpages": false } ]
    }
  }
}
```

**Reference:** [Knowledge Sources - Create or Update](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/create-or-update?view=rest-searchservice-2026-04-01\&preserve-view=true)

---



## Assign to a knowledge base

If you're satisfied with the knowledge source, [add it to a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md).

## Query a knowledge base

When you query a knowledge base that includes Web Knowledge Source, the retrieve response `activity` array can contain two web-related records:

+ A `web` record that captures the runtime parameters used for the request.
+ A `modelWebSummarization` record that captures token usage for the LLM summarization step.

```json
{
  "activity": [
    {
      "id": 1,
      "type": "web",
      "knowledgeSourceName": "my-web-ks",
      "elapsedMs": 212,
      "webArguments": {
        "search": "What is the latest news about AI in education?",
        "language": "en",
        "market": "en-US",
        "count": 10,
        "freshness": "2026-03-01..2026-03-31"
      }
    },
    {
      "id": 2,
      "type": "modelWebSummarization",
      "elapsedMs": 87,
      "inputTokens": 1234,
      "outputTokens": 256
    }
  ]
}
```

## Delete a knowledge source


Before you can delete a knowledge source, you must delete any knowledge base that references it or update the knowledge base definition to remove the reference. For knowledge sources that generate an index and indexer pipeline, all *generated objects* are also deleted. However, if you used an existing index to create a knowledge source, your index isn't deleted.

If you try to delete a knowledge source that's in use, the action fails and returns a list of affected knowledge bases.

To delete a knowledge source:

**Applies to: csharp**


1. Get a list of all knowledge bases on your search service.

    ```csharp
    using Azure.Search.Documents.Indexes;
    
    var indexClient = new SearchIndexClient(new Uri(searchEndpoint), credential);
    var knowledgeBases = indexClient.GetKnowledgeBasesAsync();
    
    Console.WriteLine("Knowledge Bases:");
    
    await foreach (var kb in knowledgeBases)
    {
        Console.WriteLine($"  - {kb.Name}");
    }
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)

   An example response might look like the following:

   ```json
    {
        "@odata.context": "https://my-search-service.search.windows.net/$metadata#knowledgebases(name)",
        "value": [
        {
            "name": "my-kb"
        },
        {
            "name": "my-kb-2"
        }
        ]
    }
   ```

1. Get an individual knowledge base definition to check for knowledge source references.

    ```csharp
    using Azure.Search.Documents.Indexes;
    using System.Text.Json;
    
    var indexClient = new SearchIndexClient(new Uri(searchEndpoint), credential);
    
    // Specify the knowledge base name to retrieve
    string kbNameToGet = "earth-knowledge-base";
    
    // Get a specific knowledge base definition
    var knowledgeBaseResponse = await indexClient.GetKnowledgeBaseAsync(kbNameToGet);
    var kb = knowledgeBaseResponse.Value;
    
    // Serialize to JSON for display
    string json = JsonSerializer.Serialize(kb, new JsonSerializerOptions { WriteIndented = true });
    Console.WriteLine(json);
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)

   An example response might look like the following:

   ```json
    {
      "Name": "earth-knowledge-base",
      "KnowledgeSources": [
        {
          "Name": "earth-knowledge-source"
        }
      ],
      "Models": [
        {}
      ],
      "RetrievalReasoningEffort": {},
      "OutputMode": {},
      "ETag": "\u00220x8DE278629D782B3\u0022",
      "EncryptionKey": null,
      "Description": null,
      "RetrievalInstructions": null,
      "AnswerInstructions": null
    }
   ```

1. Either delete the knowledge base or, if you have multiple knowledge sources, update the knowledge base to remove the source. This example shows deletion.

    ```csharp
    using Azure.Search.Documents.Indexes;
    var indexClient = new SearchIndexClient(new Uri(searchEndpoint), credential);
    
    await indexClient.DeleteKnowledgeBaseAsync(knowledgeBaseName);
    System.Console.WriteLine($"Knowledge base '{knowledgeBaseName}' deleted successfully.");
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)

1. Delete the knowledge source.

    ```csharp
    await indexClient.DeleteKnowledgeSourceAsync(knowledgeSourceName);
    System.Console.WriteLine($"Knowledge source '{knowledgeSourceName}' deleted successfully.");
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)



**Applies to: python**


1. Get a list of all knowledge bases on your search service.

    ```python
    # Get knowledge bases
    from azure.core.credentials import AzureKeyCredential
    from azure.search.documents.indexes import SearchIndexClient
    
    index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))
    
    print("Knowledge Bases:")
    for kb in index_client.list_knowledge_bases():
        print(f"  - {kb.name}")
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)

   An example response might look like the following:

   ```json
    {
        "@odata.context": "https://my-search-service.search.windows.net/$metadata#knowledgebases(name)",
        "value": [
        {
            "name": "my-kb"
        },
        {
            "name": "my-kb-2"
        }
        ]
    }
   ```

1. Get an individual knowledge base definition to check for knowledge source references.

    ```python
    # Get a knowledge base definition
    from azure.core.credentials import AzureKeyCredential
    from azure.search.documents.indexes import SearchIndexClient
    
    index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))
    kb = index_client.get_knowledge_base("knowledge_base_name")
    print(kb)
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)

   An example response might look like the following:

   ```json
    {
      "name": "my-kb",
      "description": null,
      "retrievalInstructions": null,
      "answerInstructions": null,
      "outputMode": null,
      "knowledgeSources": [
        {
          "name": "my-blob-ks"
        }
      ],
      "models": [],
      "encryptionKey": null,
      "retrievalReasoningEffort": {
        "kind": "low"
      }
    }
   ```

1. Either delete the knowledge base or, if you have multiple knowledge sources, update the knowledge base to remove the source. This example shows deletion.

    ```python
    # Delete a knowledge base
    from azure.core.credentials import AzureKeyCredential 
    from azure.search.documents.indexes import SearchIndexClient
    
    index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))
    index_client.delete_knowledge_base("knowledge_base_name")
    print(f"Knowledge base deleted successfully.")
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)

1. Delete the knowledge source.

    ```python
    # Delete a knowledge source
    from azure.core.credentials import AzureKeyCredential 
    from azure.search.documents.indexes import SearchIndexClient
    
    index_client = SearchIndexClient(endpoint = "search_url", credential = AzureKeyCredential("api_key"))
    index_client.delete_knowledge_source("knowledge_source_name")
    print(f"Knowledge source deleted successfully.")
    ```

   **Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


1. Get a list of all knowledge bases on your search service.

    ```http
    ### Get knowledge bases
    GET {{search-url}}/knowledgebases?api-version={{api-version}}&$select=name
    Authorization: Bearer {{token}}
    ```

   **Reference:** [Knowledge Bases - List](https://learn.microsoft.com/rest/api/searchservice/knowledge-bases/list)

   An example response might look like the following:

   ```json
    {
        "@odata.context": "https://my-search-service.search.windows.net/$metadata#knowledgebases(name)",
        "value": [
        {
            "name": "my-kb"
        },
        {
            "name": "my-kb-2"
        }
        ]
    }
   ```

1. Get an individual knowledge base definition to check for knowledge source references.

    ```http
    ### Get a knowledge base definition
    GET {{search-url}}/knowledgebases/{{knowledge-base-name}}?api-version={{api-version}}
    Authorization: Bearer {{token}}
    ```

   **Reference:** [Knowledge Bases - Get](https://learn.microsoft.com/rest/api/searchservice/knowledge-bases/get)

   An example response might look like the following:

   ```json
    {
      "name": "my-kb",
      "description": null,
      "retrievalInstructions": null,
      "answerInstructions": null,
      "outputMode": null,
      "knowledgeSources": [
        {
          "name": "my-blob-ks"
        }
      ],
      "models": [],
      "encryptionKey": null,
      "retrievalReasoningEffort": {
        "kind": "low"
      }
    }
   ```

1. Either delete the knowledge base or, if you have multiple knowledge sources, update the knowledge base to remove the source. This example shows deletion.

    ```http
    ### Delete a knowledge base
    DELETE {{search-url}}/knowledgebases/{{knowledge-base-name}}?api-version={{api-version}}
    Authorization: Bearer {{token}}
    ```

   **Reference:** [Knowledge Bases - Delete](https://learn.microsoft.com/rest/api/searchservice/knowledge-bases/delete)

1. Delete the knowledge source.

    ```http
    ### Delete a knowledge source
    DELETE {{search-url}}/knowledgesources/{{knowledge-source-name}}?api-version={{api-version}}
    Authorization: Bearer {{token}}
    ```

   **Reference:** [Knowledge Sources - Delete](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/delete)




## Related content

+ [Manage access to Web Knowledge Source in your Azure subscription](agentic-knowledge-source-how-to-web-manage.md)
+ [Agentic retrieval in Azure AI Search](agentic-retrieval-overview.md)
+ [What is a knowledge source?](agentic-knowledge-source-overview.md)
+ [Create a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md)
+ [Query a knowledge base](agentic-retrieval-how-to-retrieve.md)
