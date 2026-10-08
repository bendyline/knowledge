---
title: Create an Azure SQL Knowledge Source for Agentic Retrieval
description: Learn how to create an indexed Azure SQL knowledge source in Azure AI Search that ingests rows from a SQL table or view for agentic retrieval.
ms.reviewer: gimondra
ms.service: azure-ai-search
ms.topic: how-to
ms.date: 08/14/2026
ai-usage: ai-assisted
zone_pivot_groups: search-csharp-python-rest
#customer intent: As an application developer, I want to create an indexed Azure SQL knowledge source with column mappings, authentication, and change detection so that rows from a SQL table or view can ground agentic retrieval responses.
---

# Create an indexed Azure SQL knowledge source (preview)


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).



> **Important:**
> Features, capabilities, or properties marked (preview) aren't covered by a service-level agreement, aren't recommended for production workloads, and might change or be constrained before they become generally available. The [Azure AI Search preview terms](https://learn.microsoft.com/azure/search/search-preview-terms) apply to all preview functionality, whether it's standalone or part of a generally available feature.


An *indexed Azure SQL knowledge source* (preview) ingests rows from Azure SQL Database or Azure SQL Managed Instance into an agentic retrieval pipeline in Azure AI Search. [Knowledge sources](agentic-knowledge-source-overview.md) are created independently, referenced in a [knowledge base](agentic-retrieval-how-to-create-knowledge-base.md), and used as grounding data when the knowledge base is [queried at runtime](agentic-retrieval-how-to-retrieve.md).

Unlike file-based knowledge sources, such as Azure Blob Storage and OneLake, each SQL row is treated as one logical document. You drive the index schema through explicit column mappings rather than using a fixed document schema.

When you create an indexed Azure SQL knowledge source, you specify a SQL data source, optional column mappings, and optional models to automatically generate the following Azure AI Search objects:

+ A data source that represents the SQL table or view.
+ An index whose fields are derived from your column mappings.
+ A skillset that generates embeddings. The service creates a skillset only when you specify `embeddingColumns`.
+ An indexer that uses the previous objects to drive the ingestion pipeline.

The generated indexer conforms to the *Azure SQL indexer*, whose prerequisites, change detection policies, and limitations also apply to indexed Azure SQL knowledge sources. For more information, see the [Azure SQL indexer documentation](search-how-to-index-sql-database.md).

### Usage support

| [Azure portal](get-started-portal-agentic-retrieval.md) | [Microsoft Foundry portal](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/what-is-foundry-iq#workflow) | [.NET SDK](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) | [Python SDK](https://github.com/Azure/azure-sdk-for-python/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [Java SDK](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/search/azure-search-documents/CHANGELOG.md) | [JavaScript SDK](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/search-documents/CHANGELOG.md) | [REST API](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) |
| --- | --- | --- | --- | --- | --- | --- |
| ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |

## Prerequisites

+ An Azure AI Search service in any [region that provides agentic retrieval](search-region-support.md).

+ Completion of the [Azure SQL indexer prerequisites](search-how-to-index-sql-database.md#prerequisites), including:

  + An [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview) or [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) with a table or view to ingest.

  + A single-valued primary key on the source table or view.

  + For views, a column suitable for high-water-mark change detection. We strongly recommend a `rowversion` column.

+ Permission to create knowledge sources. Configure [keyless authentication](search-get-started-rbac.md) with the **Search Service Contributor** and **Search Index Data Contributor** roles assigned to your user account (recommended) or use an [admin API key](search-security-api-keys.md).

+ If you specify `embeddingColumns`, the search service must have a [managed identity](search-how-to-managed-identities.md) with **Cognitive Services User** permissions on the Microsoft Foundry resource that hosts the embedding model.

+ If you set `networkAccessMode` to `private`, complete the following requirements:

  + Use an [S2, S3, L1, or L2 search service](search-sku-tier.md#tier-descriptions).

  + Create and approve a shared private link to the SQL server with the `sqlServer` group ID. For SQL Managed Instance, use the `managedInstance` group ID.

  + Use either SQL authentication or managed identity authentication. For managed identity, grant the identity the required Azure and database roles, and use a connection string with `Database=<database-name>` and the resource ID of the [SQL server](search-howto-managed-identities-sql.md) or [SQL Managed Instance](search-how-to-index-sql-managed-instance-with-managed-identity.md). Set `ingestionParameters.identity` only for a user-assigned identity. If you omit it, the indexer uses the search service's system-assigned identity.

  + Create and approve a shared private link for each protected model endpoint. Use the `openai_account` group ID for Azure OpenAI endpoints and `foundry_account` for Foundry resource endpoints.

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

+ A knowledge source can ingest from exactly one table or one view.
+ The source table or view must have a single-valued primary key. Composite keys aren't supported.
+ The primary key is auto-discovered and can't be overridden.
+ `contentExtractionMode` supports only `"minimal"`.
+ Image extraction and image verbalization aren't supported.
+ Real-time synchronization isn't supported. The generated indexer is schedule-based.
+ Real-time SQL retrieval isn't supported. The knowledge source is indexed, not remote.

## Prepare the generated indexer

An indexed Azure SQL knowledge source automatically creates an indexer to drive ingestion. Review the following details before you create the knowledge source.

### Change detection

The generated indexer uses standard [Azure SQL indexer change detection](search-how-to-index-sql-database.md#indexing-new-changed-and-deleted-rows):

+ **Tables:** The service applies [SQL integrated change tracking](search-how-to-index-sql-database.md#sql-integrated-change-tracking-policy) automatically. Enable [SQL change tracking](https://learn.microsoft.com/sql/relational-databases/track-changes/about-change-tracking-sql-server) on the source table before you create the knowledge source.

+ **Views:** The service applies [high-water-mark change detection](search-how-to-index-sql-database.md#high-water-mark-change-detection-policy). Specify the column to use in `highWaterMarkColumn`. A `rowversion` column is strongly recommended. To detect deletions in a view, include a soft-delete marker column in the view as described in [Soft delete column deletion detection policy](search-how-to-index-sql-database.md#soft-delete-column-deletion-detection-policy).

### Authentication

The generated indexer supports two authentication options:

+ **SQL authentication:** Provide a username and password in the connection string.

+ **Managed identity authentication:** Use a system-assigned or user-assigned managed identity that has Azure RBAC and database-level roles on the SQL resource.

For connection string formats, role requirements, and setup steps, see the [Azure SQL indexer prerequisites](search-how-to-index-sql-database.md#prerequisites) and [Connect through a managed identity](search-how-to-managed-identities.md).

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




The following JSON is an example response for an indexed Azure SQL knowledge source.

```json
{
  "name": "indexedsqlks",
  "kind": "indexedSql",
  "description": "Sample indexed Azure SQL knowledge source.",
  "encryptionKey": null,
  "indexedSqlParameters": {
    "connectionString": "<sql-connection-string>",
    "tableOrView": "dbo.tbl_hotels",
    "contentColumns": [
      { "name": "hotelName", "sourceField": "HotelName", "searchFieldType": "Edm.String" },
      { "name": "description", "sourceField": "Description", "searchFieldType": "Edm.String" }
    ],
    "embeddingColumns": [
      { "name": "descriptionVector", "sourceField": "Description" }
    ],
    "ingestionParameters": {
      "contentExtractionMode": "minimal",
      "embeddingModel": {
        "kind": "azureOpenAI",
        "azureOpenAIParameters": {
          "resourceUri": "<aoai-endpoint>",
          "deploymentId": "text-embedding-3-large",
          "modelName": "text-embedding-3-large"
        }
      },
      "createdResources": {
        "datasource": "indexedsqlks-datasource",
        "indexer": "indexedsqlks-indexer",
        "skillset": "indexedsqlks-skillset",
        "index": "indexedsqlks-index"
      }
    }
  }
}
```

## Create a knowledge source

Run the following code to create an indexed Azure SQL knowledge source.

**Applies to: csharp**


```csharp
using Azure.Identity;
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Search.Documents.KnowledgeBases.Models;

var indexClient = new SearchIndexClient(new Uri(searchEndpoint), new DefaultAzureCredential());

var embeddingParams = new AzureOpenAIVectorizerParameters
{
    ResourceUri = new Uri(aoaiEndpoint),
    DeploymentName = aoaiEmbeddingDeployment,
    ModelName = aoaiEmbeddingModel
};

var ingestionParams = new KnowledgeSourceIngestionParameters
{
    NetworkAccessMode = KnowledgeSourceNetworkAccessMode.Public,
    ContentExtractionMode = "minimal",
    EmbeddingModel = new KnowledgeSourceAzureOpenAIVectorizer
    {
        AzureOpenAIParameters = embeddingParams
    }
};

var sqlParams = new IndexedSqlKnowledgeSourceParameters(
    connectionString: sqlConnectionString,
    tableOrView: "dbo.tbl_hotels")
{
    ContentColumns =
    {
        new ContentColumnMapping("hotelName", "HotelName", "Edm.String"),
        new ContentColumnMapping("description", "Description", "Edm.String")
    },
    EmbeddingColumns =
    {
        new EmbeddingColumnMapping("descriptionVector", "Description")
    },
    IngestionParameters = ingestionParams
};

var knowledgeSource = new IndexedSqlKnowledgeSource(
    name: "indexedsqlks",
    indexedSqlParameters: sqlParams)
{
    Description = "Indexed Azure SQL knowledge source."
};

await indexClient.CreateOrUpdateKnowledgeSourceAsync(knowledgeSource);
Console.WriteLine($"Knowledge source '{knowledgeSource.Name}' created or updated successfully.");
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient?view=azure-dotnet-preview\&preserve-view=true), [IndexedSqlKnowledgeSource](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.indexedsqlknowledgesource?view=azure-dotnet-preview\&preserve-view=true)



**Applies to: python**


```python
from azure.identity import DefaultAzureCredential
from azure.search.documents.indexes import SearchIndexClient
from azure.search.documents.indexes.models import (
    AzureOpenAIVectorizerParameters,
    ContentColumnMapping,
    EmbeddingColumnMapping,
    IndexedSqlKnowledgeSource,
    IndexedSqlKnowledgeSourceParameters,
)
from azure.search.documents.knowledgebases.models import (
    KnowledgeSourceAzureOpenAIVectorizer,
    KnowledgeSourceIngestionParameters,
    KnowledgeSourceNetworkAccessMode,
)

index_client = SearchIndexClient(endpoint="<search-endpoint>", credential=DefaultAzureCredential())

embedding_params = AzureOpenAIVectorizerParameters(
    resource_url="<aoai-endpoint>",
    deployment_name="<aoai-embedding-deployment>",
    model_name="<aoai-embedding-model>",
)

ingestion_params = KnowledgeSourceIngestionParameters(
    network_access_mode=KnowledgeSourceNetworkAccessMode.PUBLIC,
    content_extraction_mode="minimal",
    embedding_model=KnowledgeSourceAzureOpenAIVectorizer(
        azure_open_ai_parameters=embedding_params
    ),
)

knowledge_source = IndexedSqlKnowledgeSource(
    name="indexedsqlks",
    description="Indexed Azure SQL knowledge source.",
    indexed_sql_parameters=IndexedSqlKnowledgeSourceParameters(
        connection_string="Server=tcp:{server}.database.windows.net,1433;Database={db};...;",
        table_or_view="dbo.tbl_hotels",
        content_columns=[
            ContentColumnMapping(
                name="hotelName",
                source_field="HotelName",
                search_field_type="Edm.String",
            ),
            ContentColumnMapping(
                name="description",
                source_field="Description",
                search_field_type="Edm.String",
            ),
        ],
        embedding_columns=[
            EmbeddingColumnMapping(
                name="descriptionVector",
                source_field="Description",
            )
        ],
        ingestion_parameters=ingestion_params,
    ),
)

index_client.create_or_update_knowledge_source(knowledge_source=knowledge_source)
print(f"Knowledge source '{knowledge_source.name}' created or updated successfully.")
```

**Reference:** [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient?view=azure-python-preview\&preserve-view=true)



**Applies to: rest**


```http
### Create an indexed Azure SQL knowledge source
PUT {{search-endpoint}}/knowledgesources/indexedsqlks?api-version=2026-08-01-preview
Authorization: Bearer {{search-access-token}}
Content-Type: application/json

{
  "name": "indexedsqlks",
  "kind": "indexedSql",
  "description": "Indexed Azure SQL knowledge source.",
  "indexedSqlParameters": {
    "connectionString": "Server=tcp:{server}.database.windows.net,1433;Database={db};...;",
    "tableOrView": "dbo.tbl_hotels",
    "contentColumns": [
      { "name": "hotelName", "sourceField": "HotelName", "searchFieldType": "Edm.String" },
      { "name": "description", "sourceField": "Description", "searchFieldType": "Edm.String" }
    ],
    "embeddingColumns": [
      { "name": "descriptionVector", "sourceField": "Description" }
    ],
    "ingestionParameters": {
      "networkAccessMode": "public",
      "contentExtractionMode": "minimal",
      "embeddingModel": {
        "kind": "azureOpenAI",
        "azureOpenAIParameters": {
          "resourceUri": "{{aoai-endpoint}}",
          "deploymentId": "{{aoai-embedding-deployment}}",
          "modelName": "{{aoai-embedding-model}}"
        }
      }
    }
  }
}
```

**Reference:** [Knowledge Sources - Create or Update](https://learn.microsoft.com/rest/api/searchservice/knowledge-sources/create-or-update?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)



Use `indexedSqlParameters` to identify the SQL table or view to ingest and to define the column mappings that become fields in the generated index. For views, specify the high-water-mark column used for change detection.

### Column mapping

Use `contentColumns` to map SQL text columns into searchable fields in the generated Azure AI Search index. Each content column mapping names the target index field, the source SQL column, and the Azure AI Search field type. For `contentColumns`, use `Edm.String`.

### Embedding mapping

Use `embeddingColumns` to map SQL text columns into generated vector fields. Specify an embedding model in `ingestionParameters` when you use embedding columns.

For indexed Azure SQL knowledge sources, `contentExtractionMode` must be `"minimal"` because SQL ingestion is row-based and doesn't extract content from binary documents. Image extraction and image verbalization aren't supported, so `chatCompletionModel`, `assetStore`, `aiServices`, and image-related settings have no effect.

### Defaulting and validation rules

The following defaults apply when you create an indexed Azure SQL knowledge source.

+ If you omit `contentColumns`, the service automatically maps SQL columns that can be safely represented as text to `Edm.String` fields in the generated index, using a 1:1 mapping where `name` equals `sourceField`.

+ If you omit `embeddingColumns`, the service doesn't create vector fields and doesn't configure an embedding skill.

+ `embeddingColumns` is independent of `contentColumns`. To make vectors correspond to retrievable text, include the same SQL column in both arrays.

+ The primary key of the source table or view is auto-discovered. Explicit overrides aren't supported, and the source must have a single-valued primary key.

### Restrict ingestion to a private network

Starting with the `2026-08-01-preview` API version, `networkAccessMode` controls the network environment in which the generated indexer for an indexed Azure SQL knowledge source runs. This setting affects ingestion only and doesn't change knowledge base retrieve requests or responses.

`networkAccessMode` defaults to `public`, which preserves existing public network behavior. When `networkAccessMode` is `private`, the generated indexer runs in the [private execution environment](search-howto-run-reset-indexers.md#indexer-execution-environment). It uses approved [shared private links](search-indexer-howto-access-private.md) to access the Azure SQL Database or SQL Managed Instance source connection and supported Azure dependencies, such as Azure OpenAI models and Microsoft Foundry resources.

To configure and verify private network access:


1. Complete the [private network prerequisites](#prerequisites).

1. Set `networkAccessMode` to `private` in the knowledge source creation request. You can only set this property during creation. To change it later, delete and recreate the knowledge source.

   Creation can fail if the service tier or runtime doesn't support private execution or if a required shared private link doesn't exist.

1. Confirm that the generated indexer's `executionEnvironment` is `private`.

1. Confirm that each required shared private link is approved and targets the correct dependency. Successful creation alone doesn't confirm link approval or targeting.

1. Poll the knowledge source status until `lastSynchronizationState.endTime` has a value. Confirm that `itemsUpdatesFailed` is `0`, and then verify the connector-specific source content. Synchronization fails if a dependency isn't reachable.


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

## Query a knowledge base

After the knowledge base is configured, [call the retrieve action or MCP endpoint](agentic-retrieval-how-to-retrieve.md) to query the knowledge source.

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
+ [Azure SQL indexer in Azure AI Search](search-how-to-index-sql-database.md)
