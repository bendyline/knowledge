---
title: Create a SharePoint (Remote) Knowledge Source
description: Learn how to create a remote SharePoint knowledge source, which tells an agentic retrieval engine in Azure AI Search to query SharePoint sites directly.
ms.service: azure-ai-search
ms.topic: how-to
ms.date: 10/01/2026
ms.custom: doc-kit-assisted
ai-usage: ai-assisted
zone_pivot_groups: search-csharp-python-rest
#customer intent: As an application developer, I want to create a remote SharePoint knowledge source, scope its live content, and handle query-time user authorization and SharePoint response data so that agentic retrieval can use content each user is permitted to access.
---

# Create a remote SharePoint knowledge source (preview)


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).



> **Important:**
> Features, capabilities, or properties marked (preview) aren't covered by a service-level agreement, aren't recommended for production workloads, and might change or be constrained before they become generally available. The [Azure AI Search preview terms](https://learn.microsoft.com/azure/search/search-preview-terms) apply to all preview functionality, whether it's standalone or part of a generally available feature.


A *remote SharePoint knowledge source* (preview) uses the [Copilot Retrieval API (preview)](https://learn.microsoft.com/microsoft-365-copilot/extensibility/api/ai-services/retrieval/overview) to query textual content directly from SharePoint in Microsoft 365. [Knowledge sources](agentic-knowledge-source-overview.md) are created independently, referenced in a [knowledge base](agentic-retrieval-how-to-create-knowledge-base.md), and used as grounding data when the knowledge base is [queried at runtime](agentic-retrieval-how-to-retrieve.md).

To limit sites or constrain search, set a [filter expression](#filter-expression-examples) to scope by URLs, date ranges, file types, and other metadata. The caller's identity must be recognized by both the Azure tenant and the Microsoft 365 tenant because the retrieval engine queries SharePoint on behalf of the user.

Unlike indexed knowledge sources, remote SharePoint knowledge sources query live data directly at retrieval time. You don't need a search index or connection string.

### Usage support

| [Azure portal](get-started-portal-agentic-retrieval.md) | [Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/what-is-foundry-iq#workflow) | [.NET SDK](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) | [Python SDK](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [Java SDK](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md) | [REST API](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) |
| --- | --- | --- | --- | --- | --- | --- |
| ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

## Prerequisites

+ An Azure AI Search service in any [region that provides agentic retrieval](search-region-support.md).

+ SharePoint in a Microsoft 365 tenant that's under the same Microsoft Entra ID tenant as Azure.

+ For each user querying SharePoint content, either a [Microsoft 365 Copilot add-on license](https://learn.microsoft.com/microsoft-365/copilot/microsoft-365-copilot-licensing) that includes Retrieval API usage or [Retrieval API pay-as-you-go consumption (preview)](https://learn.microsoft.com/microsoft-365/copilot/extensibility/api/ai-services/retrieval/paygo-retrieval) enabled for that user.

  To enable pay-as-you-go, you need Microsoft 365 admin access and **Owner** or **Contributor** access on an Azure subscription in good standing. You also need an Azure resource group. Your tenant must have at least one Microsoft 365 Copilot license before enablement and throughout pay-as-you-go use.

  For users without a Copilot add-on license, [enable pay-as-you-go and configure billing](https://learn.microsoft.com/microsoft-365/copilot/extensibility/api/ai-services/retrieval/paygo-retrieval#enable-and-disable-pay-as-you-go) in the Microsoft 365 admin center using that Azure subscription. Both payment options use the same remote SharePoint knowledge source configuration.

+ Permission to create knowledge sources. Configure [keyless authentication](search-get-started-rbac.md) with the **Search Service Contributor** role assigned to your user account (recommended) or use an [admin API key](search-security-api-keys.md).

**Applies to: csharp**


+ The latest [`Azure.Search.Documents`](https://www.nuget.org/packages/Azure.Search.Documents) preview package: `dotnet add package Azure.Search.Documents --prerelease`

+ For keyless authentication, the [`Azure.Identity`](https://www.nuget.org/packages/Azure.Identity) package: `dotnet add package Azure.Identity`



**Applies to: python**


+ The latest [`azure-search-documents`](https://pypi.org/project/azure-search-documents/#history) preview package: `pip install --pre azure-search-documents`

+ For keyless authentication, the [`azure-identity`](https://pypi.org/project/azure-identity/) package: `pip install azure-identity`



**Applies to: rest**


+ The [2026-08-01-preview](https://learn.microsoft.com/rest/api/searchservice/operation-groups?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) version of the Search Service REST API.

+ For keyless authentication, include a [Microsoft Entra ID token](search-get-started-rbac.md?pivots=rest#get-token) in the `Authorization` header of each HTTP request.



## Limitations and considerations

Remote SharePoint knowledge sources are subject to limitations from the [Copilot Retrieval API](https://learn.microsoft.com/microsoft-365-copilot/extensibility/api/ai-services/retrieval/overview) and Azure AI Search.

### Copilot Retrieval API

The following Copilot Retrieval API limitations also apply to remote SharePoint knowledge sources:

+ There's no support for Copilot connectors or OneDrive content. Content is retrieved from SharePoint sites only.

+ Limit of 200 requests per user per hour.

+ Query character limit of 1,500 characters.

+ Hybrid queries are only supported for the following file extensions: `.doc`, `.docx`, `.pptx`, `.pdf`, `.aspx`, and `.one`.

+ Multimodal retrieval (nontextual content, including tables, images, and charts) isn't supported.

+ Maximum of 25 results from a query.

+ Results are returned by the Copilot Retrieval API as unordered.

+ Invalid Keyword Query Language (KQL) filter expressions are ignored, and the query continues to execute without the filter.

### Azure AI Search

When you query a knowledge base, Azure AI Search can run a limited number of remote SharePoint queries at a time. The limit depends on the pricing model:

+ [Dedicated](search-sku-tier.md#dedicated-pricing-model): Each service replica runs one query at a time across all remote SharePoint knowledge sources selected for the retrieve request. Additional queries wait for an available replica, which increases latency. To increase query throughput, [add replicas](search-capacity-planning.md#add-or-remove-partitions-and-replicas).

+ [Serverless (preview)](search-sku-tier.md#serverless-pricing-model-preview): Azure AI Search runs one query at a time across all remote SharePoint knowledge sources selected for the retrieve request. Additional queries wait. Serverless manages capacity automatically, so you can't increase query throughput.

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




The following JSON is an example response for a remote SharePoint knowledge source.

```json
{
  "name": "my-sharepoint-ks",
  "kind": "remoteSharePoint",
  "description": "A sample remote SharePoint knowledge source",
  "encryptionKey": null,
  "remoteSharePointParameters": {
    "filterExpression": "filetype:docx",
    "containerTypeId": null,
    "resourceMetadata": [
      "Author",
      "Title"
    ]
  }
}
```

## Create a knowledge source

Run the following code to create a remote SharePoint knowledge source.

**Applies to: csharp**


```csharp
// Create a remote SharePoint knowledge source
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Search.Documents.KnowledgeBases.Models;
using Azure.Identity;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new DefaultAzureCredential());

var knowledgeSource = new RemoteSharePointKnowledgeSource(name: "my-remote-sharepoint-ks")
{
    Description = "This knowledge source queries .docx files in a trusted Microsoft 365 tenant.",
    RemoteSharePointParameters = new RemoteSharePointKnowledgeSourceParameters()
    {
        FilterExpression = "filetype:docx",
        ResourceMetadata = { "Author", "Title" }
    }
};

await indexClient.CreateOrUpdateKnowledgeSourceAsync(knowledgeSource);
Console.WriteLine($"Knowledge source '{knowledgeSource.Name}' created or updated successfully.");
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient?view=azure-dotnet-preview\&preserve-view=true), [RemoteSharePointKnowledgeSource](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.remotesharepointknowledgesource?view=azure-dotnet-preview\&preserve-view=true)



**Applies to: python**


```python
# Create a remote SharePoint knowledge source
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import RemoteSharePointKnowledgeSource, RemoteSharePointKnowledgeSourceParameters

index_client = SearchIndexClient(endpoint = "<search-endpoint>", credential = DefaultAzureCredential())

knowledge_source = RemoteSharePointKnowledgeSource(
    name = "my-remote-sharepoint-ks",
    description= "This knowledge source queries .docx files in a trusted Microsoft 365 tenant.",
    encryption_key = None,
    remote_share_point_parameters = RemoteSharePointKnowledgeSourceParameters(
        filter_expression = "filetype:docx",
        resource_metadata = ["Author", "Title"],
        container_type_id = None
    )
)

index_client.create_or_update_knowledge_source(knowledge_source)
print(f"Knowledge source '{knowledge_source.name}' created or updated successfully.")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


```http
### Create a remote SharePoint knowledge source
PUT {{search-endpoint}}/knowledgesources/my-remote-sharepoint-ks?api-version=2026-08-01-preview
Authorization: Bearer {{search-access-token}}
Content-Type: application/json

{
    "name": "my-remote-sharepoint-ks",
    "kind": "remoteSharePoint",
    "description": "This knowledge source queries .docx files in a trusted Microsoft 365 tenant.",
    "encryptionKey": null,
    "remoteSharePointParameters": {
        "filterExpression": "filetype:docx",
        "resourceMetadata": [ "Author", "Title" ],
        "containerTypeId": null
    }
}
```

**Reference:** [Knowledge Sources - Create or Update](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/create-or-update?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)



### Filter expression examples

Not all SharePoint properties are supported in the `filterExpression`. For a list of supported properties, see the [API reference](https://learn.microsoft.com/microsoft-365-copilot/extensibility/api/ai-services/retrieval/copilotroot-retrieval). For queryable properties, see [Queryable](https://learn.microsoft.com/graph/connecting-external-content-manage-schema#queryable).

Learn more about [KQL filters](https://learn.microsoft.com/microsoft-365-copilot/extensibility/api/ai-services/retrieval/copilotroot-retrieval?pivots=graph-v1#example-7-use-filter-expressions) in the syntax reference.

| Example | Filter expression |
| --- | --- |
| Filter to a single site by ID | `"filterExpression": "SiteID:\"00aa00aa-bb11-cc22-dd33-44ee44ee44ee\""` |
| Filter to multiple sites by ID | `"filterExpression": "SiteID:\"00aa00aa-bb11-cc22-dd33-44ee44ee44ee\" OR SiteID:\"11bb11bb-cc22-dd33-ee44-55ff55ff55ff\""` |
| Filter to files under a specific path | `"filterExpression": "Path:\"https://my-demo.sharepoint.com/sites/mysite/Shared Documents/en/mydocs\""` |
| Filter to a specific date range | `"filterExpression": "LastModifiedTime >= 2024-07-22 AND LastModifiedTime <= 2025-01-08"` |
| Filter to files of a specific file type | `"filterExpression": "FileExtension:\"docx\" OR FileExtension:\"pdf\" OR FileExtension:\"pptx\""` |
| Filter to files of a specific information protection label | `"filterExpression": "InformationProtectionLabelId:\"f0ddcc93-d3c0-4993-b5cc-76b0a283e252\""` |

## Assign to a knowledge base

If you're satisfied with the knowledge source, [add it to a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md).

## Query a knowledge base

After the knowledge base is configured, [call the retrieve action or MCP endpoint](agentic-retrieval-how-to-retrieve.md) to query SharePoint content. Remote SharePoint has source-specific behaviors for query-time filtering, query formulation, response fields, and permissions enforcement.

### Apply a KQL filter at query time

**Applies to: csharp**


You can pass a `FilterExpressionAddOn` in the `KnowledgeSourceParams` on the retrieve request to apply a KQL filter at query time. If you specify `FilterExpressionAddOn` on the retrieve request and a `FilterExpression` on the knowledge source definition, the filters are AND'd together.

```csharp
var retrievalRequest = new KnowledgeBaseRetrievalRequest();
retrievalRequest.Messages.Add(
    new KnowledgeBaseMessage(
        content: new[] {
            new KnowledgeBaseMessageTextContent("contoso product planning")
        }
    ) { Role = "user" }
);
retrievalRequest.KnowledgeSourceParams.Add(
    new RemoteSharePointKnowledgeSourceParams("my-remote-sharepoint-ks")
    {
        FilterExpressionAddOn = "filetype:docx"
    }
);

var result = await kbClient.RetrieveAsync(
    retrievalRequest, xMsQuerySourceAuthorization: token
);
```

**Reference:** [KnowledgeBaseRetrievalClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.knowledgebases.knowledgebaseretrievalclient?view=azure-dotnet-preview\&preserve-view=true), [KnowledgeBaseRetrievalRequest](https://learn.microsoft.com/dotnet/api/azure.search.documents.knowledgebases.models.knowledgebaseretrievalrequest?view=azure-dotnet-preview\&preserve-view=true)



**Applies to: python**


You can pass a `filter_expression_add_on` in the `knowledge_source_params` on the retrieve request to apply a KQL filter at query time. If you specify `filter_expression_add_on` on the retrieve request and a `filter_expression` on the knowledge source definition, the filters are AND'd together.

```python
from azure.search.documents.knowledgebases.models import (
    KnowledgeBaseMessage,
    KnowledgeBaseMessageTextContent,
    KnowledgeBaseRetrievalRequest,
    RemoteSharePointKnowledgeSourceParams,
)

request = KnowledgeBaseRetrievalRequest(
    messages=[
        KnowledgeBaseMessage(
            role="user",
            content=[
                KnowledgeBaseMessageTextContent(
                    text="contoso product planning"
                )
            ],
        )
    ],
    knowledge_source_params=[
        RemoteSharePointKnowledgeSourceParams(
            knowledge_source_name="my-remote-sharepoint-ks",
            filter_expression_add_on="filetype:docx",
        )
    ],
)

result = kb_client.retrieve(
    retrieval_request=request,
    x_ms_query_source_authorization=token,
)
```

**Reference:** [KnowledgeBaseRetrievalClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.knowledgebases.knowledgebaseretrievalclient), [KnowledgeBaseRetrievalRequest](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.knowledgebases.models.knowledgebaseretrievalrequest)



**Applies to: rest**


You can pass a `filterExpressionAddOn` in the `knowledgeSourceParams` on the retrieve request to apply a KQL filter at query time. If you specify `filterExpressionAddOn` on the retrieve request and a `filterExpression` on the knowledge source definition, the filters are AND'd together.

```http
### Retrieve knowledge base content
POST {{search-endpoint}}/knowledgebases/{{knowledge-base-name}}/retrieve?api-version=2026-08-01-preview
Authorization: Bearer {{search-access-token}}
Content-Type: application/json
x-ms-query-source-authorization: {{user-access-token}}

{
    "messages": [
        {
            "role": "user",
            "content": [
                { "type": "text", "text": "contoso product planning" }
            ]
        }
    ],
    "knowledgeSourceParams": [
        {
            "knowledgeSourceName": "my-remote-sharepoint-ks",
            "kind": "remoteSharePoint",
            "filterExpressionAddOn": "filetype:docx"
        }
    ]
}
```

**Reference:** [Knowledge Retrieval - Retrieve](https://learn.microsoft.com/rest/api/searchservice/knowledge-retrieval/retrieve?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)



### Write effective queries

**Applies to: csharp**


Queries that ask about the content itself are more effective than questions about where a file is located or when it was last updated. For example, "Where is the keynote doc for Ignite 2024" might return no results because the content itself doesn't disclose its location. A `FilterExpression` on metadata is a better approach for file location or date-specific queries.



**Applies to: python**


Queries that ask about the content itself are more effective than questions about where a file is located or when it was last updated. For example, "Where is the keynote doc for Ignite 2024" might return no results because the content itself doesn't disclose its location. A `filter_expression` on metadata is a better approach for file location or date-specific queries.



**Applies to: rest**


Queries that ask about the content itself are more effective than questions about where a file is located or when it was last updated. For example, "Where is the keynote doc for Ignite 2024" might return no results because the content itself doesn't disclose its location. A `filterExpression` on metadata is a better approach for file location or date-specific queries.



A more effective question is "What is the keynote doc for Ignite 2024". The response includes the synthesized answer, query activity and token counts, plus the URL and other metadata.

### SharePoint-specific response fields

Remote SharePoint results include fields that don't appear for other knowledge source types, such as `resourceMetadata`, `webUrl`, and `searchSensitivityLabelInfo`.

```json
{
    "resourceMetadata": {
        "Author": "Nuwan Amarathunga;Nurul Izzati",
        "Title": "Ignite 2024 Keynote Address"
    },
    "rerankerScore": 2.489522,
    "webUrl": "https://contoso-my.sharepoint.com/keynotes/Documents/Keynote-Ignite-2024.docx",
    "searchSensitivityLabelInfo": {
        "displayName": "Confidential\\Contoso Extended",
        "sensitivityLabelId": "aaaaaaaa-0b0b-1c1c-2d2d-333333333333",
        "tooltip": "Data is classified and protected.",
        "priority": 5,
        "color": "#FF8C00",
        "isEncrypted": true
    }
}
```

### Enforce permissions at query time

Remote SharePoint knowledge sources can enforce SharePoint permissions at query time. To enable this filtering, include the end user's access token in the retrieve request. The retrieval engine passes the token to the Copilot Retrieval API, which queries SharePoint and returns only content to which the user has access. SharePoint permissions and Microsoft Purview sensitivity labels are honored.

Because remote SharePoint doesn't use a search index, no ingestion-time permissions configuration is needed. The access token is the only requirement.

For instructions on passing the token, see [Enforce permissions at query time (preview)](agentic-retrieval-how-to-retrieve.md#enforce-permissions-at-query-time-preview).

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

+ [Agentic retrieval in Azure AI Search](agentic-retrieval-overview.md)
+ [What is a knowledge source?](agentic-knowledge-source-overview.md)
+ [Create a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md)
+ [Query a knowledge base](agentic-retrieval-how-to-retrieve.md)
