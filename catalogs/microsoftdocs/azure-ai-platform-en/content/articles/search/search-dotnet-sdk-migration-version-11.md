---
title: Upgrade to .NET SDK Version 11
description: Migrate your search application code from older SDK versions to the Azure AI Search .NET SDK version 11.
ms.service: azure-ai-search
ms.devlang: csharp
ms.topic: upgrade-and-migration-article
ms.date: 08/31/2026
ms.update-cycle: 365-days
ai-usage: ai-assisted
ms.custom:
  - devx-track-csharp
  - devx-track-dotnet
  - ignite-2023
---

# Upgrade to Azure AI Search .NET SDK version 11


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


If you built your search solution on the [**Azure SDK for .NET**](https://learn.microsoft.com/dotnet/azure/), this article helps you migrate your code from earlier versions of [**Microsoft.Azure.Search**](https://learn.microsoft.com/dotnet/api/overview/azure/search) to version 11 of the [**Azure.Search.Documents**](https://learn.microsoft.com/dotnet/api/overview/azure/search.documents-readme) client library. Version 11 is a fully redesigned client library produced by the Azure SDK development team. Previous versions were produced by the Azure AI Search development team.

All features from version 10 are implemented in version 11. Key differences include:

+ One package (**Azure.Search.Documents**) instead of four
+ Three clients instead of two: SearchClient, SearchIndexClient, SearchIndexerClient
+ Naming differences across a range of APIs and small structural differences that simplify some tasks

The client library's [changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) has an itemized list of updates. You can review a [summarized version](#WhatsNew) in this article.

> **Important:**
> This article provides version 10-to-version 11 API mappings. For new development, use the current stable version of **Azure.Search.Documents**.

## Why upgrade?

The benefits of upgrading are summarized as follows:

+ New features are added to **Azure.Search.Documents** only. The previous version, Microsoft.Azure.Search, is now retired. Updates to deprecated libraries are limited to high priority bug fixes only.

+ Consistency with other Azure client libraries. **Azure.Search.Documents** takes a dependency on [Azure.Core](https://learn.microsoft.com/dotnet/api/azure.core) and [System.Text.Json](https://learn.microsoft.com/dotnet/api/system.text.json), and follows conventional approaches for common tasks such as client connections and authorization.

**Microsoft.Azure.Search** is officially retired. Migrate to **Azure.Search.Documents**. If you're moving across several legacy versions, update incrementally to help identify and resolve blocking issues. For guidance, see [Previous version docs](https://learn.microsoft.com/previous-versions/azure/search/).

## Package comparison

Version 11 consolidates and simplifies package management so that there are fewer to manage.

| Version 10 and earlier | Version 11 |
| --- | --- |
| [Microsoft.Azure.Search](https://www.nuget.org/packages/Microsoft.Azure.Search/) </br>[Microsoft.Azure.Search.Service](https://www.nuget.org/packages/Microsoft.Azure.Search.Service/) </br>[Microsoft.Azure.Search.Data](https://www.nuget.org/packages/Microsoft.Azure.Search.Data/) </br>[Microsoft.Azure.Search.Common](https://www.nuget.org/packages/Microsoft.Azure.Search.Common/) | [Azure.Search.Documents package](https://www.nuget.org/packages/Azure.Search.Documents/) |

## Client comparison

Where applicable, the following table maps the client libraries between the two versions.

| Client operations | Microsoft.Azure.Search&nbsp;(v10) | Azure.Search.Documents&nbsp;(v11) |
| --- | --- | --- |
| Targets the documents collection of an index (queries and data import) | [SearchIndexClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchindexclient) | [SearchClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient) |
| Targets index-related objects (indexes, analyzers, synonym maps | [SearchServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchserviceclient) | [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient) |
| Targets indexer-related objects (indexers, data sources, skillsets) | [SearchServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchserviceclient) | [SearchIndexerClient (**new**)](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexerclient) |

> **Caution:**
> `SearchIndexClient` exists in both versions but targets different operations. In version 10, it targets the documents collection. In version 11, it creates indexes and other schema objects. To avoid confusion when updating code, update client references in the sequence in [Steps to upgrade](#UpgradeSteps).

<a name="naming-differences"></a>

## Naming and other API differences

Besides the client differences (noted previously and thus omitted here), multiple other APIs have been renamed and in some cases redesigned. The following sections summarize class name differences. This list isn't exhaustive, but it groups API changes by task, which can be helpful for revisions on specific code blocks. For an itemized list of API updates, see the [changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) for `Azure.Search.Documents` on GitHub.

### Authentication and encryption

| Version 10 | Version 11 equivalent |
| --- | --- |
| [SearchCredentials](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchcredentials) | [AzureKeyCredential](https://learn.microsoft.com/dotnet/api/azure.azurekeycredential) |
| EncryptionKey (Undocumented in API reference. Support for this API transitioned to generally available in v10, but was only available in the [preview SDK](https://www.nuget.org/packages/Microsoft.Azure.Search/8.0.0-preview)) | [SearchResourceEncryptionKey](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchresourceencryptionkey) |

### Indexes, analyzers, synonym maps

| Version 10 | Version 11 equivalent |
| --- | --- |
| [Index](https://learn.microsoft.com/dotnet/api/microsoft.azure.documents.index) | [SearchIndex](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindex) |
| [Field](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.field) | [SearchField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield) |
| [DataType](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.datatype) | [SearchFieldDataType](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfielddatatype) |
| [ItemError](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.itemerror) | [SearchIndexerError](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexererror) |
| [Analyzer](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.analyzer) | [LexicalAnalyzer](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.lexicalanalyzer) (also, `AnalyzerName` to `LexicalAnalyzerName`) |
| [AnalyzeRequest](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.analyzerequest) | [AnalyzeTextOptions](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.analyzetextoptions) |
| [StandardAnalyzer](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.standardanalyzer) | [LuceneStandardAnalyzer](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.lucenestandardanalyzer) |
| [StandardTokenizer](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.standardtokenizer) | [LuceneStandardTokenizer](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.lucenestandardtokenizer) (also, `StandardTokenizerV2` to `LuceneStandardTokenizerV2`) |
| [TokenInfo](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.tokeninfo) | [AnalyzedTokenInfo](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.analyzedtokeninfo) |
| [Tokenizer](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.tokenizer) | [LexicalTokenizer](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.lexicaltokenizer) (also, `TokenizerName` to `LexicalTokenizerName`) |
| [SynonymMap.Format](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.synonymmap.format) | None. Remove references to `Format`. |

Field definitions are streamlined: [SearchableField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchablefield), [SimpleField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.simplefield), [ComplexField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.complexfield) are new APIs for creating field definitions.

### Indexers, data sources, and skillsets

| Version 10 | Version 11 equivalent |
| --- | --- |
| [Indexer](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.indexer) | [SearchIndexer](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexer) |
| [DataSource](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.datasource) | [SearchIndexerDataSourceConnection](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexerdatasourceconnection) |
| [Skill](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.skill) | [SearchIndexerSkill](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexerskill) |
| [Skillset](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.skillset) | [SearchIndexerSkillset](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexerskillset) |
| [DataSourceType](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.datasourcetype) | [SearchIndexerDataSourceType](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexerdatasourcetype) |

### Data import

| Version 10 | Version 11 equivalent |
| --- | --- |
| [IndexAction](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.indexaction) | [IndexDocumentsAction](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.indexdocumentsaction) |
| [IndexBatch](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.indexbatch) | [IndexDocumentsBatch](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.indexdocumentsbatch) |
| [IndexBatchException.FindFailedActionsToRetry()](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.indexbatchexception.findfailedactionstoretry) | [SearchIndexingBufferedSender](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchindexingbufferedsender-1) |

### Query requests and responses

| Version 10 | Version 11 equivalent |
| --- | --- |
| [DocumentsOperationsExtensions.SearchAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.documentsoperationsextensions.searchasync) | [SearchClient.SearchAsync](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient.searchasync) |
| [DocumentSearchResult](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.documentsearchresult-1) | [SearchResult](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.searchresult-1) or [SearchResults](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.searchresults-1), depending on whether the result is a single document or multiple. |
| [DocumentSuggestResult](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.documentsuggestresult-1) | [SuggestResults](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.suggestresults-1) |
| [SearchParameters](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.searchparameters) | [SearchOptions](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchoptions) |
| [SuggestParameters](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.suggestparameters) | [SuggestOptions](https://learn.microsoft.com/dotnet/api/azure.search.documents.suggestoptions) |
| [SearchParameters.Filter](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.searchparameters.filter) | [SearchFilter](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchfilter) (a new class for constructing OData filter expressions) |

### JSON serialization

By default, the Azure SDK uses [System.Text.Json](https://learn.microsoft.com/dotnet/api/system.text.json) for JSON serialization, relying on the capabilities of those APIs to handle text transformations previously implemented through a native [SerializePropertyNamesAsCamelCaseAttribute](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.models.serializepropertynamesascamelcaseattribute) class, which has no counterpart in the new library.

To serialize property names into camelCase, you can use the [JsonPropertyNameAttribute](https://learn.microsoft.com/dotnet/api/system.text.json.serialization.jsonpropertynameattribute) (similar to [this example](https://github.com/Azure/azure-sdk-for-net/tree/d263f23aa3a28ff4fc4366b8dee144d4c0c3ab10/sdk/search/Azure.Search.Documents#use-c-types-for-search-results)).

Alternatively, you can set a [JsonNamingPolicy](https://learn.microsoft.com/dotnet/api/system.text.json.jsonnamingpolicy) provided in [JsonSerializerOptions](https://learn.microsoft.com/dotnet/api/system.text.json.jsonserializeroptions). The following System.Text.Json code example, taken from the [Microsoft.Azure.Core.Spatial readme](https://github.com/Azure/azure-sdk-for-net/blob/259df3985d9710507e2454e1591811f8b3a7ad5d/sdk/core/Microsoft.Azure.Core.Spatial/README.md#deserializing-documents) demonstrates the use of camelCase without having to attribute every property:

```csharp
// Get the Azure AI Search service endpoint and read-only API key.
Uri endpoint = new Uri(Environment.GetEnvironmentVariable("SEARCH_ENDPOINT"));
AzureKeyCredential credential = new AzureKeyCredential(Environment.GetEnvironmentVariable("SEARCH_API_KEY"));

// Create serializer options with our converter to deserialize geographic points.
JsonSerializerOptions serializerOptions = new JsonSerializerOptions
{
    Converters =
    {
        new MicrosoftSpatialGeoJsonConverter()
    },
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

SearchClientOptions clientOptions = new SearchClientOptions
{
    Serializer = new JsonObjectSerializer(serializerOptions)
};

SearchClient client = new SearchClient(endpoint, "mountains", credential, clientOptions);
Response<SearchResults<Mountain>> results = client.Search<Mountain>("Rainier");
```

If you're using Newtonsoft.Json for JSON serialization, you can pass in global naming policies using similar attributes, or by using properties on [JsonSerializerSettings](https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_JsonSerializerSettings.htm). For an example equivalent to the previous one, see the [Deserializing documents example](https://github.com/Azure/azure-sdk-for-net/blob/259df3985d9710507e2454e1591811f8b3a7ad5d/sdk/core/Microsoft.Azure.Core.Spatial.NewtonsoftJson/README.md) in the Newtonsoft.Json readme.

<a name="WhatsNew"></a>

## Inside v11

Each version of an Azure AI Search client library targets a corresponding version of the REST API. The REST API is foundational to the service, with individual SDKs wrapping a version of the REST API. As a .NET developer, it can be helpful to review the more verbose [REST API documentation](https://learn.microsoft.com/rest/api/searchservice/) for more in-depth coverage of specific objects or operations. Version 11 targets the [2020-06-30 search service specification](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/search/data-plane/Search/stable/2020-06-30).

Version 11.0 fully supports the following objects and operations:

+ Index creation and management
+ Synonym map creation and management
+ Indexer creation and management
+ Indexer data source creation and management
+ Skillset creation and management
+ All query types and syntax

Version 11.1 additions ([changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md#1110-2020-08-11) details):

+ [FieldBuilder](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.fieldbuilder) (added in 11.1)
+ [Serializer property](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclientoptions.serializer) (added in 11.1) to support custom serialization

Version 11.2 additions ([changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md#1120-2021-02-10) details):

+ [EncryptionKey](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindexer.encryptionkey) property added indexers, data sources, and skillsets
+ [IndexingParameters.IndexingParametersConfiguration](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.indexingparametersconfiguration) property support
+ [Geospatial types](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfielddatatype.geographypoint) are natively supported in [FieldBuilder](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.fieldbuilder.build). [SearchFilter](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchfilter) can encode geometric types from Microsoft.Spatial without an explicit assembly dependency.

  You can also continue to explicitly declare a dependency on [Microsoft.Spatial](https://www.nuget.org/packages/Microsoft.Spatial/). Examples of this technique are available for [System.Text.Json](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Microsoft.Azure.Core.Spatial/README.md) and [Newtonsoft.Json](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Microsoft.Azure.Core.Spatial.NewtonsoftJson/README.md).

Version 11.3 additions ([changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md#1130-2021-06-08) details):

+ [KnowledgeStore](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.knowledgestore)
+ Added support for Azure.Core.GeoJson types in [SearchDocument](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.searchdocument), [SearchFilter](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchfilter) and [FieldBuilder](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.fieldbuilder).
+ Added EventSource based logging. Event source name is Azure-Search-Documents. Current set of events are focused on tuning batch sizes for [SearchIndexingBufferedSender](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchindexingbufferedsender-1).
+ Added [CustomEntityLookupSkill](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.customentitylookupskill) and [DocumentExtractionSkill](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.documentextractionskill). Added DefaultCountryHint in [LanguageDetectionSkill](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.languagedetectionskill).

## Before upgrading

+ Quickstarts, tutorials, and [C# samples](samples-dotnet.md) have been updated to use the Azure.Search.Documents package. We recommend reviewing the samples and walkthroughs to learn about the new APIs before embarking on a migration exercise.

+ [How to use Azure.Search.Documents](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-howto-dotnet-sdk.md) introduces the most commonly used APIs. Even experienced users of Azure AI Search might want to review this introduction to the new library as a precursor to migration.

<a name="UpgradeSteps"></a>

## Steps to upgrade

The following steps get you started on a code migration by walking through the first set of required tasks, especially regarding client references.

1. Install the [Azure.Search.Documents package](https://www.nuget.org/packages/Azure.Search.Documents/) by right-clicking on your project references and selecting "Manage NuGet Packages..." in Visual Studio.

1. Replace using directives for Microsoft.Azure.Search with the following using statements:

   ```csharp
   using Azure;
   using Azure.Search.Documents;
   using Azure.Search.Documents.Indexes;
   using Azure.Search.Documents.Indexes.Models;
   using Azure.Search.Documents.Models;
   ```

1. For classes that require JSON serialization, replace `using Newtonsoft.Json` with `using System.Text.Json.Serialization`.

1. Revise client authentication code. In previous versions, you would use properties on the client object to set the API key (for example, the [SearchServiceClient.Credentials](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchserviceclient.credentials) property). In the current version, use the [AzureKeyCredential](https://learn.microsoft.com/dotnet/api/azure.azurekeycredential) class to pass the key as a credential, so that if needed, you can update the API key without creating new client objects.

   Client properties have been streamlined to just `Endpoint`, `ServiceName`, and `IndexName` (where appropriate). The following example uses the system [Uri](https://learn.microsoft.com/dotnet/api/system.uri) class to provide the endpoint and the [Environment](https://learn.microsoft.com/dotnet/api/system.environment) class to read in the key value:

   ```csharp
   Uri endpoint = new Uri(Environment.GetEnvironmentVariable("SEARCH_ENDPOINT"));
   AzureKeyCredential credential = new AzureKeyCredential(
      Environment.GetEnvironmentVariable("SEARCH_API_KEY"));
   SearchIndexClient indexClient = new SearchIndexClient(endpoint, credential);
   ```

1. Add new client references for indexer-related objects. If you're using indexers, data sources, or skillsets, change the client references to [SearchIndexerClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexerclient). This client is new in version 11 and has no antecedent.

1. Revise collections and lists. In the new SDK, all lists are read-only to avoid downstream issues if the list happens to contain null values. The code change is to add items to a list. For example, instead of assigning strings to a Select property, you would add them as follows:

   ```csharp
   var options = new SearchOptions
    {
       SearchMode = SearchMode.All,
       IncludeTotalCount = true
    };

    // Select fields to return in results.
    options.Select.Add("HotelName");
    options.Select.Add("Description");
    options.Select.Add("Tags");
    options.Select.Add("Rooms");
    options.Select.Add("Rating");
    options.Select.Add("LastRenovationDate");
   ```

   Select, Facets, SearchFields, SourceFields, ScoringParameters, and OrderBy are all lists that now need to be reconstructed.

1. Update client references for queries and data import. Instances of [SearchIndexClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchindexclient) should be changed to [SearchClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient). To avoid name confusion, make sure you catch all instances before proceeding to the next step.

1. Update client references for index, synonym map, and analyzer objects. Instances of [SearchServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchserviceclient) should be changed to [SearchIndexClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.search.searchindexclient). 

1. For the remainder of your code, update classes, methods, and properties to use the APIs of the new library. The [naming differences](#naming-differences) section is a place to start, but you can also review the [changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md).

   If you have trouble finding equivalent APIs, we suggest logging an issue on [https://github.com/MicrosoftDocs/azure-docs/issues](https://github.com/MicrosoftDocs/azure-docs/issues) so that we can improve the documentation or investigate the problem.

1. Rebuild the solution. After fixing any build errors or warnings, you can make additional changes to your application to take advantage of [new functionality](#WhatsNew).

<a name="ListOfChanges"></a>

## Breaking changes

Given the sweeping changes to libraries and APIs, an upgrade to version 11 is non-trivial and constitutes a breaking change in the sense that your code is no longer backward compatible with version 10 and earlier. For a thorough review of the differences, see the [changelog](https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/search/Azure.Search.Documents/CHANGELOG.md) for `Azure.Search.Documents`.

In terms of service version updates, where code changes in version 11 relate to existing functionality (and not just a refactoring of the APIs), you'll find the following behavior changes:

+ [BM25 ranking algorithm](index-ranking-similarity.md) replaces the previous ranking algorithm with newer technology. New services use this algorithm automatically. For existing services, you must set parameters to use the new algorithm.

+ [Ordered results](search-query-odata-orderby.md) for null values have changed in this version, with null values appearing first if the sort is `asc` and last if the sort is `desc`. If you wrote code to handle how null values are sorted, you should review and potentially remove that code if it's no longer necessary.

Due to these behavior changes, it's likely that there are slight variations in ranked results.

## Next steps

+ [How to use Azure.Search.Documents in a C# .NET Application](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/search-howto-dotnet-sdk.md)
+ [Tutorial: Add search to web apps](tutorial-csharp-overview.md)
+ [Azure.Search.Documents package](https://www.nuget.org/packages/Azure.Search.Documents/)
+ [Samples on GitHub](https://github.com/azure/azure-sdk-for-net/tree/Azure.Search.Documents_11.0.0/sdk/search/Azure.Search.Documents/samples)
+ [Azure.Search.Document API reference](https://learn.microsoft.com/dotnet/api/overview/azure/search.documents-readme)
