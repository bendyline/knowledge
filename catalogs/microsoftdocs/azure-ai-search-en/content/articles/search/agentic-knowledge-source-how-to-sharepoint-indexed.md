---
title: Create a SharePoint (Indexed) Knowledge Source
description: Learn how to create an indexed SharePoint knowledge source, which ingests content from SharePoint sites into a searchable index on Azure AI Search.
ms.service: azure-ai-search
ms.topic: how-to
ms.date: 09/02/2026
ai-usage: ai-assisted
ms.custom: doc-kit-assisted
zone_pivot_groups: search-csharp-python-rest
#customer intent: As an application developer, I want to create an indexed SharePoint knowledge source and configure document-level access and protected Azure dependencies so that SharePoint content can ground agentic retrieval responses.
---

# Create an indexed SharePoint knowledge source (preview)


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).



> **Important:**
> Features, capabilities, or properties marked (preview) aren't covered by a service-level agreement, aren't recommended for production workloads, and might change or be constrained before they become generally available. The [Azure AI Search preview terms](https://learn.microsoft.com/azure/search/search-preview-terms) apply to all preview functionality, whether it's standalone or part of a generally available feature.


An *indexed SharePoint knowledge source* (preview) ingests SharePoint content into an agentic retrieval pipeline in Azure AI Search. [Knowledge sources](agentic-knowledge-source-overview.md) are created independently, referenced in a [knowledge base](agentic-retrieval-how-to-create-knowledge-base.md), and used as grounding data when the knowledge base is [queried at runtime](agentic-retrieval-how-to-retrieve.md).

When you create an indexed SharePoint knowledge source, you specify a SharePoint connection string, models, and properties to automatically generate the following Azure AI Search objects:

+ A data source that points to SharePoint sites and uses the connection string unchanged. The generated data source follows the SharePoint indexer's [`TenantId` rules](search-how-to-index-sharepoint-online.md#connection-string-format).
+ A skillset that chunks and optionally vectorizes multimodal content.
+ An index that stores enriched content and meets the criteria for agentic retrieval.
+ An indexer that uses the previous objects to drive the indexing and enrichment pipeline.

The generated indexer conforms to the *SharePoint in Microsoft 365 indexer*, whose prerequisites, supported document formats, and limitations also apply to indexed SharePoint knowledge sources. For more information, see the [SharePoint indexer documentation](search-how-to-index-sharepoint-online.md) and [indexer limits](https://learn.microsoft.com/azure/search/search-limits-quotas-capacity#indexer-limits). If the generated skillset calls an external service, that skill's input and service limits also apply.

### Usage support

| [Azure portal](get-started-portal-agentic-retrieval.md) | [Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/what-is-foundry-iq#workflow) | [.NET SDK](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) | [Python SDK](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [Java SDK](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md) | [REST API](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) |
| --- | --- | --- | --- | --- | --- | --- |
| ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

## Prerequisites

+ An Azure AI Search service in any [region that provides agentic retrieval](search-region-support.md).

+ Completion of the [SharePoint indexer prerequisites](search-how-to-index-sharepoint-online.md#prerequisites).

+ Completion of the following SharePoint indexer configuration steps:

  + [Step 1: Enable a managed identity for Azure AI Search](search-how-to-index-sharepoint-online.md#optional-step-1-enable-a-system-assigned-managed-identity) (required only for secretless authentication; skip if using a client secret)

  + [Step 2: Choose either delegated or application permissions](search-how-to-index-sharepoint-online.md#step-2-decide-which-permissions-the-indexer-requires)

  + [Step 3: Create a Microsoft Entra application registration](search-how-to-index-sharepoint-online.md#step-3-create-a-microsoft-entra-application-registration) (for application permissions, you also configure a [client secret](search-how-to-index-sharepoint-online.md#using-client-secret) or [secretless authentication](search-how-to-index-sharepoint-online.md#using-secretless-authentication-to-obtain-application-tokens))

+ If `contentExtractionMode` is `standard`, use a Microsoft Foundry resource in a [region supported by Content Understanding in Foundry Tools](https://learn.microsoft.com/azure/ai-services/content-understanding/language-region-support) and the `https://<resource-name>.services.ai.azure.com` endpoint. Deploy an embedding model, and deploy a multimodal chat model if you enable image verbalization.

+ Permission to create knowledge sources. Configure [keyless authentication](search-get-started-rbac.md) with the **Search Service Contributor** and **Search Index Data Contributor** roles assigned to your user account (recommended) or use an [admin API key](search-security-api-keys.md).

+ If the knowledge source specifies an Azure OpenAI model for embeddings or image verbalization, the search service must have a [managed identity](search-how-to-managed-identities.md) with **Cognitive Services User** permissions on the Microsoft Foundry resource.

+ If you set `networkAccessMode` to `private`, complete the following requirements:

  + Use an [S2, S3, L1, or L2 search service](search-sku-tier.md#tier-descriptions).

  + Keep the SharePoint connection string, Microsoft Entra application, and SharePoint permissions described in the previous prerequisites. SharePoint Online isn't a supported shared private link target, so private mode doesn't make this source connection private.

  + For each protected model endpoint, enable a managed identity on the search service, grant it the **Cognitive Services User** role on the resource, and create and approve a shared private link. Use the `openai_account` group ID for Azure OpenAI endpoints and `foundry_account` for Foundry resource endpoints.

**Applies to: csharp**


+ The latest [`Azure.Search.Documents`](https://www.nuget.org/packages/Azure.Search.Documents) preview package: `dotnet add package Azure.Search.Documents --prerelease`

+ For keyless authentication, the [`Azure.Identity`](https://www.nuget.org/packages/Azure.Identity) package: `dotnet add package Azure.Identity`



**Applies to: python**


+ The latest [`azure-search-documents`](https://pypi.org/project/azure-search-documents/#history) preview package: `pip install --pre azure-search-documents`

+ For keyless authentication, the [`azure-identity`](https://pypi.org/project/azure-identity/) package: `pip install azure-identity`



**Applies to: rest**


+ The [2026-08-01-preview](https://learn.microsoft.com/rest/api/searchservice/operation-groups?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) version of the Search Service REST API.

+ For keyless authentication, include a [Microsoft Entra ID token](search-get-started-rbac.md?pivots=rest#get-token) in the `Authorization` header of each HTTP request.



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




The following JSON is an example response for an indexed SharePoint knowledge source.

```json
{
  "name": "my-indexed-sharepoint-ks",
  "kind": "indexedSharePoint",
  "description": "A sample indexed SharePoint knowledge source",
  "encryptionKey": null,
  "indexedSharePointParameters": {
    "connectionString": "<redacted>",
    "containerName": "defaultSiteLibrary",
    "query": null,
    "ingestionParameters": {
      "disableImageVerbalization": false,
      "ingestionPermissionOptions": [],
      "contentExtractionMode": "minimal",
      "identity": null,
      "embeddingModel": {
        "kind": "azureOpenAI",
        "azureOpenAIParameters": {
          "resourceUri": "<redacted>",
          "deploymentId": "text-embedding-3-large",
          "modelName": "text-embedding-3-large",
          "authIdentity": null
        }
      },
      "chatCompletionModel": null,
      "ingestionSchedule": null,
      "assetStore": null,
      "aiServices": null
    },
    "createdResources": {
      "datasource": "my-indexed-sharepoint-ks-datasource",
      "indexer": "my-indexed-sharepoint-ks-indexer",
      "skillset": "my-indexed-sharepoint-ks-skillset",
      "index": "my-indexed-sharepoint-ks-index"
    }
  },
  "indexedOneLakeParameters": null
}
```

## Create a knowledge source

Run the following code to create an indexed SharePoint knowledge source.

**Applies to: csharp**


```csharp
// Create an IndexedSharePoint knowledge source
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Search.Documents.KnowledgeBases.Models;
using Azure.Identity;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new DefaultAzureCredential());

var chatCompletionParams = new AzureOpenAIVectorizerParameters
{
    ResourceUri = new Uri(aoaiEndpoint),
    DeploymentName = aoaiGptDeployment,
    ModelName = aoaiGptModel
};

var embeddingParams = new AzureOpenAIVectorizerParameters
{
    ResourceUri = new Uri(aoaiEndpoint),
    DeploymentName = aoaiEmbeddingDeployment,
    ModelName = aoaiEmbeddingModel
};

var ingestionParams = new KnowledgeSourceIngestionParameters
{
    NetworkAccessMode = KnowledgeSourceNetworkAccessMode.Public,
    DisableImageVerbalization = false,
    ChatCompletionModel = new KnowledgeBaseAzureOpenAIModel(azureOpenAIParameters: chatCompletionParams),
    EmbeddingModel = new KnowledgeSourceAzureOpenAIVectorizer
    {
        AzureOpenAIParameters = embeddingParams
    }
};

var sharePointParams = new IndexedSharePointKnowledgeSourceParameters(
    connectionString: sharePointConnectionString,
    containerName: "defaultSiteLibrary")
{
    IngestionParameters = ingestionParams
};

var knowledgeSource = new IndexedSharePointKnowledgeSource(
    name: "my-indexed-sharepoint-ks",
    indexedSharePointParameters: sharePointParams)
{
    Description = "A sample indexed SharePoint knowledge source."
};

await indexClient.CreateOrUpdateKnowledgeSourceAsync(knowledgeSource);
Console.WriteLine($"Knowledge source '{knowledgeSource.Name}' created or updated successfully.");
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient?view=azure-dotnet-preview\&preserve-view=true), [IndexedSharePointKnowledgeSource](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.indexedsharepointknowledgesource?view=azure-dotnet-preview\&preserve-view=true)



**Applies to: python**


```python
# Create an indexed SharePoint knowledge source
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import IndexedSharePointKnowledgeSource, IndexedSharePointKnowledgeSourceParameters, KnowledgeBaseAzureOpenAIModel, AzureOpenAIVectorizerParameters, KnowledgeSourceContentExtractionMode
from azure.search.documents.knowledgebases.models import KnowledgeSourceIngestionParameters, KnowledgeSourceNetworkAccessMode, KnowledgeSourceAzureOpenAIVectorizer

index_client = SearchIndexClient(endpoint = "<search-endpoint>", credential = DefaultAzureCredential())

knowledge_source = IndexedSharePointKnowledgeSource(
    name = "my-indexed-sharepoint-ks",
    description = "A sample indexed SharePoint knowledge source.",
    encryption_key = None,
    indexed_share_point_parameters = IndexedSharePointKnowledgeSourceParameters(
        connection_string = "connection_string",
        container_name = "defaultSiteLibrary",
        query = None,
        ingestion_parameters = KnowledgeSourceIngestionParameters(
            network_access_mode = KnowledgeSourceNetworkAccessMode.PUBLIC,
            identity = None,
            disable_image_verbalization = False,
            chat_completion_model = KnowledgeBaseAzureOpenAIModel(
                azure_open_ai_parameters = AzureOpenAIVectorizerParameters(
                    resource_url = "<aoai-endpoint>",
                    deployment_name = "<aoai-gpt-deployment>",
                    model_name = "<aoai-gpt-model>",
                )
            ),
            embedding_model = KnowledgeSourceAzureOpenAIVectorizer(
                azure_open_ai_parameters=AzureOpenAIVectorizerParameters(
                    resource_url = "<aoai-endpoint>",
                    deployment_name = "<aoai-embedding-deployment>",
                    model_name = "<aoai-embedding-model>",
                )
            ),
            content_extraction_mode = KnowledgeSourceContentExtractionMode.MINIMAL,
            ingestion_schedule = None,
            ingestion_permission_options = None
        )
    )
)

index_client.create_or_update_knowledge_source(knowledge_source)
print(f"Knowledge source '{knowledge_source.name}' created or updated successfully.")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


```http
### Create an indexed SharePoint knowledge source
PUT {{search-endpoint}}/knowledgesources/my-indexed-sharepoint-ks?api-version=2026-08-01-preview
Authorization: Bearer {{search-access-token}}
Content-Type: application/json

{
    "name": "my-indexed-sharepoint-ks",
    "kind": "indexedSharePoint",
    "description": "A sample indexed SharePoint knowledge source.",
    "encryptionKey": null,
    "indexedSharePointParameters": {
        "connectionString": "{{sharepoint-federated-connection-string}}",
        "containerName": "defaultSiteLibrary",
        "query": null,
        "ingestionParameters": {
            "networkAccessMode": "public",
            "identity": null,
            "embeddingModel": {
                "kind": "azureOpenAI",
                "azureOpenAIParameters": {
                    "deploymentId": "text-embedding-3-large",
                    "modelName": "text-embedding-3-large",
                    "resourceUri": "{{aoai-endpoint}}"
                }
            },
            "chatCompletionModel": null,
            "disableImageVerbalization": false,
            "ingestionSchedule": null,
            "ingestionPermissionOptions": [],
            "contentExtractionMode": "minimal"
        }
    }
}
```

**Reference:** [Knowledge Sources - Create or Update](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/create-or-update?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)



### Protect Azure dependencies during ingestion

Starting with the `2026-08-01-preview` API version, `networkAccessMode` controls the network environment in which the generated indexer for an indexed SharePoint knowledge source runs. This setting affects ingestion only and doesn't change knowledge base retrieve requests or responses.

`networkAccessMode` defaults to `public`, which preserves existing public network behavior. When `networkAccessMode` is `private`, the generated indexer runs in the [private execution environment](search-howto-run-reset-indexers.md#indexer-execution-environment). It uses approved [shared private links](search-indexer-howto-access-private.md) to access supported Azure dependencies, such as Azure OpenAI models and Microsoft Foundry resources.

> **Important:**
> For indexed SharePoint knowledge sources, private mode applies only to supported Azure dependencies. SharePoint Online isn't a supported shared private link target, so the SharePoint source connection remains public.

To configure and verify private access to supported Azure dependencies:


1. Complete the [private network prerequisites](#prerequisites).

1. Set `networkAccessMode` to `private` in the knowledge source creation request. You can only set this property during creation. To change it later, delete and recreate the knowledge source.

   Creation can fail if the service tier or runtime doesn't support private execution or if a required shared private link doesn't exist.

1. Confirm that the generated indexer's `executionEnvironment` is `private`.

1. Confirm that each required shared private link is approved and targets the correct dependency. Successful creation alone doesn't confirm link approval or targeting.

1. Poll the knowledge source status until `lastSynchronizationState.endTime` has a value. Confirm that `itemsUpdatesFailed` is `0`, and then verify the connector-specific source content. Synchronization fails if a dependency isn't reachable.


### Use automatic per-language analyzers


Starting with the `2026-08-01-preview` API version, automatic per-language analyzers are available for blob, indexed OneLake, and indexed SharePoint knowledge sources. When enabled, Azure AI Search detects each source document's language and automatically applies a matching Microsoft language analyzer. You don't specify an analyzer in the knowledge source definition or in a query.

To enable automatic per-language analyzers, set `contentExtractionMode` to `minimal` and configure `ingestionParameters.aiServices` in the knowledge source definition.

For keyless authentication, omit `aiServices.apiKey` and assign the **Cognitive Services User** role on your Microsoft Foundry resource to the managed identity of your search service. For key-based authentication, set `aiServices.apiKey` to a valid key for your Foundry resource.

The following languages are supported:

+ English
+ Japanese
+ French
+ Spanish
+ German
+ Dutch
+ Italian
+ Brazilian Portuguese
+ European Portuguese
+ Simplified Chinese
+ Traditional Chinese
+ Korean

For multilingual content, Azure AI Search selects an analyzer based on the predominant detected language. It uses the standard analyzer when the language is unsupported or uncertain.

When you enable automatic per-language analyzers, Azure AI Search adds language-specific content fields for every supported language to the generated index schema, whether or not your data contains documents in those languages. During ingestion, documents are routed to the appropriate language-specific field based on their detected language.

Unused language fields don't contain indexed content and have minimal storage impact, but they remain part of the index schema and count toward the index field limit. Consider the additional fields when you plan your index design, field count, and storage requirements. For more information, see [Index limits](https://learn.microsoft.com/azure/search/search-limits-quotas-capacity#index-limits) and [Estimate and manage capacity of a search service](search-capacity-planning.md).

Language detection is billable after the free AI enrichment allocation. For more information, see [Free enrichments](cognitive-search-attach-cognitive-services.md#free-enrichments).

## Check ingestion status


Run the following code to monitor ingestion progress and health, including the knowledge source kind and detailed indexing errors for knowledge sources that generate an indexer pipeline and populate a search index.

**Applies to: csharp**


```csharp
using Azure.Search.Documents.Indexes;
using System.Text.Json;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new AzureKeyCredential(apiKey));

// Get knowledge source ingestion status
var statusResponse = await indexClient.GetKnowledgeSourceStatusAsync(knowledgeSourceName);
var status = statusResponse.Value;

// Serialize to JSON for display
var json = JsonSerializer.Serialize(status, new JsonSerializerOptions { WriteIndented = true });
Console.WriteLine(json);
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient)



**Applies to: python**


```python
# Check knowledge source ingestion status
from azure.core.credentials import AzureKeyCredential
from azure.search.documents.indexes import SearchIndexClient
import json

index_client = SearchIndexClient(endpoint="search_url", credential=AzureKeyCredential("api_key"))

status = index_client.get_knowledge_source_status("knowledge_source_name")
print(json.dumps(status.as_dict(), indent=2))
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient)



**Applies to: rest**


```http
### Check knowledge source ingestion status
GET {{search-url}}/knowledgesources/{{knowledge-source-name}}/status?api-version={{api-version}}
Authorization: Bearer {{token}}
Content-Type: application/json 
```

**Reference:** [Knowledge Sources - Get Status](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/get-status)



A response for a request that includes ingestion parameters and is actively ingesting content might look like the following example.

```json
{
  "kind": "azureBlob",
  "synchronizationStatus": "active",
  "synchronizationInterval": "1d",
  "currentSynchronizationState": {
    "startTime": "2026-04-10T19:30:00Z",
    "itemUpdatesProcessed": 1100,
    "itemsUpdatesFailed": 100,
    "itemsSkipped": 1100,
    "errors": [
      {
        "key": "Item id 1",
        "docURL": "https://contoso.blob.core.windows.net/contracts/2024/Q4/doc-00023.csv",
        "statusCode": 400,
        "componentName": "DocumentExtraction.AzureBlob.MyDataSource",
        "errorMessage": "Could not read the value of column 'foo' at index '0'.",
        "details": "The file could not be parsed.",
        "documentationLink": "https://go.microsoft.com/fwlink/?linkid=2049388"
      }
    ]
  },
  "lastSynchronizationState": {
    "status": "partialSuccess",
    "startTime": "2026-04-09T19:30:00Z",
    "endTime": "2026-04-09T19:40:01Z",
    "itemUpdatesProcessed": 1100,
    "itemsUpdatesFailed": 100,
    "itemsSkipped": 1100,
    "errors": null
  },
  "statistics": {
    "totalSynchronizations": 25,
    "averageSynchronizationDuration": "00:15:20",
    "averageItemsProcessedPerSynchronization": 500
  }
}
```

> **Note:**
> The `kind` property and `currentSynchronizationState.errors[]` array with document-level error details are available starting with the 2026-04-01 API version. For earlier API versions, these fields aren't returned. The `lastSynchronizationState.status` field is also new in 2026-04-01.


## Review the generated objects


When you create this knowledge source, Azure AI Search automatically generates a data source, skillset, indexer, and index. The creation response lists each object under `createdResources`.

These objects are generated according to a fixed template, and their names are based on the name of the knowledge source. You can't change the object names. Avoid editing these objects directly, as changes can introduce errors or incompatibilities that break the indexer pipeline.

You can use the Azure portal to validate object creation. The workflow is:

1. Check the indexer for success or failure messages. Connection or quota errors appear here.

1. Check the data source to verify the connection to your data store. The connection uses either a connection string or a managed identity, depending on how you configured the knowledge source.

1. Check the skillset to see how your content is chunked and optionally vectorized.

1. Check the index to see how your content is indexed and exposed for retrieval, including which fields are searchable and filterable and which fields store vectors for similarity search. Use Search Explorer to run queries against the generated index.


## Assign to a knowledge base

If you're satisfied with the knowledge source, [add it to a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md).

For any knowledge base that specifies an indexed SharePoint knowledge source, be sure to set `includeReferenceSourceData` to `true`. This step is necessary for pulling the source document URL into the citation.

## Query a knowledge base

After you configure the knowledge base, [call the retrieve action or MCP endpoint](agentic-retrieval-how-to-retrieve.md) to query the knowledge source. Choose the configuration that matches your scenario.

### Enforce document-level permissions

To enforce document-level permissions, set `ingestionPermissionOptions` when you create this knowledge source, and then include the user's access token in the retrieve request. For more information, see [Enforce permissions at query time (preview)](agentic-retrieval-how-to-retrieve.md#enforce-permissions-at-query-time-preview).

For missing, unexpected, or failed results from an indexed SharePoint permission query, see [Troubleshoot SharePoint permission filtering](troubleshoot-sharepoint-query-permission-filtering.md).

### Surface document-embedded images

To surface document-embedded images (such as diagrams or scans) in answer synthesis responses, configure `assetStore` on this knowledge source, and then enable image serving on the knowledge base. Image serving isn't supported when `ingestionPermissionOptions` is configured. For more information, see [Surface document-embedded images in agentic retrieval (preview)](agentic-retrieval-how-to-image-serving.md).

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




## Known errors

The generated SharePoint data source and indexer use the same Microsoft Entra tenant validation and authentication behavior as directly configured SharePoint indexers. For tenant-related failures, review the [generated indexer's status and execution history](search-monitor-indexers.md), and then follow the [`Invalid AAD tenant` remediation](cognitive-search-common-errors-warnings.md#error-invalid-aad-tenant).

## Related content

+ [Agentic retrieval in Azure AI Search](agentic-retrieval-overview.md)
+ [What is a knowledge source?](agentic-knowledge-source-overview.md)
+ [Create a knowledge base](agentic-retrieval-how-to-create-knowledge-base.md)
+ [Query a knowledge base](agentic-retrieval-how-to-retrieve.md)
