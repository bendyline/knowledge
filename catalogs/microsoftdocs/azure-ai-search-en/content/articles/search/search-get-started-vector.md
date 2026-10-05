---
title: 'Quickstart: Vector Search'
description: Learn how to call the Search REST and Azure SDK APIs for vector workloads in Azure AI Search.
author: mattwojo
ms.author: mattwoj
ms.service: azure-ai-search
ms.custom:
  - ignite-2023
  - dev-focus
ms.topic: quickstart
ms.date: 07/21/2026
ai-usage: ai-assisted
zone_pivot_groups: search-sdks-rest
---

# Quickstart: Vector search


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


> **Note:**
> For embedding models in vector search workflows, Azure AI Search supports `text-embedding-ada-002`, `text-embedding-3-small`, and `text-embedding-3-large` from Azure OpenAI. For AI-enriched workflows using chat completion models, see [Model retirement schedules](https://learn.microsoft.com/azure/foundry/openai/concepts/model-retirement-schedule) to check deprecation status of GPT-4 family models.

**Applies to: csharp**



In this quickstart, you use the [Azure AI Search client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/search) to create, load, and query a [vector index](vector-store.md). The .NET client library provides an abstraction over the REST APIs for index operations.

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-dotnet-samples/tree/main/quickstart-vector-search) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [.NET 8](https://dotnet.microsoft.com/download) or later.

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.



## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-dotnet-samples
   ```

1. Navigate to the quickstart folder.

   ```bash
   cd azure-search-dotnet-samples/quickstart-vector-search
   ```

1. In `VectorSearchCreatePopulateIndex/appsettings.json`, replace the placeholder value for `Endpoint` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Repeat the previous step for `VectorSearchExamples/appsettings.json`.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

1. Run the first project to create and populate the index.

    ```bash
    cd VectorSearchCreatePopulateIndex
    dotnet run
    ```

1. In `VectorSearchExamples/Program.cs`, uncomment the query methods you want to run.

1. Run the second project to execute those queries against the index.

    ```bash
    cd ..\VectorSearchExamples
    dotnet run
    ```

### Output

The output of the first project includes confirmation of index creation and successful document uploads.

```output
Creating or updating index 'hotels-vector-quickstart'...
Index 'hotels-vector-quickstart' updated.

Key: 1, Succeeded: True
Key: 2, Succeeded: True
Key: 3, Succeeded: True
Key: 4, Succeeded: True
Key: 48, Succeeded: True
Key: 49, Succeeded: True
Key: 13, Succeeded: True
```

The output of the second project shows the search results for each enabled query method. The following example shows single vector search results.

```output
Single Vector Search Results:
Score: 0.6605852, HotelId: 48, HotelName: Nordick's Valley Motel
Score: 0.6333684, HotelId: 13, HotelName: Luxury Lion Resort
Score: 0.605672, HotelId: 4, HotelName: Sublime Palace Hotel
Score: 0.6026341, HotelId: 49, HotelName: Swirling Currents Hotel
Score: 0.57902366, HotelId: 2, HotelName: Old Century Hotel
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The following code in `VectorSearchCreatePopulateIndex/Program.cs` creates the index schema, including the vector field `DescriptionVector`.

```csharp
static async Task CreateSearchIndex(string indexName, SearchIndexClient indexClient)
{
    var addressField = new ComplexField("Address");
    addressField.Fields.Add(new SearchableField("StreetAddress") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft });
    addressField.Fields.Add(new SearchableField("City") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true });
    addressField.Fields.Add(new SearchableField("StateProvince") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true });
    addressField.Fields.Add(new SearchableField("PostalCode") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true });
    addressField.Fields.Add(new SearchableField("Country") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true });

    var allFields = new List<SearchField>()
    {
        new SimpleField("HotelId", SearchFieldDataType.String) { IsKey = true, IsFacetable = true, IsFilterable = true },
        new SearchableField("HotelName") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft },
        new SearchableField("Description") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft },
        new VectorSearchField("DescriptionVector", 1536, "my-vector-profile"),
        new SearchableField("Category") { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true },
        new SearchableField("Tags", collection: true) { AnalyzerName = LexicalAnalyzerName.EnMicrosoft, IsFacetable = true, IsFilterable = true },
        new SimpleField("ParkingIncluded", SearchFieldDataType.Boolean) { IsFacetable = true, IsFilterable = true },
        new SimpleField("LastRenovationDate", SearchFieldDataType.DateTimeOffset) { IsSortable = true },
        new SimpleField("Rating", SearchFieldDataType.Double) { IsFacetable = true, IsFilterable = true, IsSortable = true },
        addressField,
        new SimpleField("Location", SearchFieldDataType.GeographyPoint) { IsFilterable = true, IsSortable = true },
    };

    // Create the suggester configuration
    var suggester = new SearchSuggester("sg", new[] { "Address/City", "Address/Country" });

    // Create the semantic search
    var semanticSearch = new SemanticSearch()
    {
        Configurations =
        {
            new SemanticConfiguration(
                name: "semantic-config",
                prioritizedFields: new SemanticPrioritizedFields
                {
                    TitleField = new SemanticField("HotelName"),
                    KeywordsFields = { new SemanticField("Category") },
                    ContentFields = { new SemanticField("Description") }
                })
        }
    };

    // Add vector search configuration
    var vectorSearch = new VectorSearch();
    vectorSearch.Algorithms.Add(new HnswAlgorithmConfiguration(name: "my-hnsw-vector-config-1"));
    vectorSearch.Profiles.Add(new VectorSearchProfile(name: "my-vector-profile", algorithmConfigurationName: "my-hnsw-vector-config-1"));

    var definition = new SearchIndex(indexName)
    {
        Fields = allFields,
        Suggesters = { suggester },
        VectorSearch = vectorSearch,
        SemanticSearch = semanticSearch
    };

    // Create or update the index
    Console.WriteLine($"Creating or updating index '{indexName}'...");
    var result = await indexClient.CreateOrUpdateIndexAsync(definition);
    Console.WriteLine($"Index '{result.Value.Name}' updated.");
    Console.WriteLine();
}
```

Key takeaways:

+ You define an index by creating a list of fields.

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (`SearchableField`)

    + [Vector search](vector-search-overview.md) (`VectorSearchField`)

    + [Semantic ranking](semantic-search-overview.md) (`SemanticSearch`)

    + [Faceted search](search-faceted-navigation.md) (fields marked with `IsFacetable`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `SearchFieldDataType.GeographyPoint`)

    + [Filtering](search-filters.md) and sorting (fields marked with `IsFilterable` and `IsSortable`)

+ The second parameter in `VectorSearchField` specifies `vectorSearchDimensions`, which must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `VectorSearch` configuration defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents with precomputed vectors. In production scenarios, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

The following code uploads documents from `HotelData.json` to your search service.

```csharp
static async Task UploadDocs(SearchClient searchClient)
{
    var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "HotelData.json");

    // Read and parse hotel data
    var json = await File.ReadAllTextAsync(jsonPath);
    List<Hotel> hotels = new List<Hotel>();
    try
    {
        using var doc = JsonDocument.Parse(json);
        if (doc.RootElement.ValueKind != JsonValueKind.Array)
        {
            Console.WriteLine("HotelData.json root is not a JSON array.");
        }
        // Deserialize all hotel objects
        hotels = doc.RootElement.EnumerateArray()
            .Select(e => JsonSerializer.Deserialize<Hotel>(e.GetRawText()))
            .Where(h => h != null)
            .ToList();
    }
    catch (JsonException ex)
    {
        Console.WriteLine($"Failed to parse HotelData.json: {ex.Message}");
    }

    try
    {
        // Upload hotel documents to Azure Search
        var result = await searchClient.UploadDocumentsAsync(hotels);
        foreach (var r in result.Value.Results)
        {
            Console.WriteLine($"Key: {r.Key}, Succeeded: {r.Succeeded}");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Failed to upload documents: " + ex);
    }
}
```

Your code interacts with a specific search index hosted in your Azure AI Search service through the `SearchClient`, which is the main object provided by the [`Azure.Search.Documents`](https://learn.microsoft.com/dotnet/api/overview/azure/search.documents-readme) package. The `SearchClient` provides access to index operations, such as:

+ Data ingestion: `UploadDocuments()`, `MergeDocuments()`, `DeleteDocuments()`

+ Search operations: `Search()`, `Autocomplete()`, `Suggest()`

### Query the index

The queries in `VectorSearchExamples` demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

The `SearchSingleVector` method demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. `VectorizedQuery` configures the vector search:

+ `KNearestNeighborsCount` limits how many results are returned based on vector similarity.
+ `Fields` specifies the vector field to search against.

```csharp
public static async Task SearchSingleVector(SearchClient searchClient, ReadOnlyMemory<float> precalculatedVector)
{
    SearchResults<Hotel> response = await searchClient.SearchAsync<Hotel>(
        new SearchOptions
        {
            VectorSearch = new()
            {
                Queries = { new VectorizedQuery(precalculatedVector) { KNearestNeighborsCount = 5, Fields = { "DescriptionVector" } } }
            },
            Select = { "HotelId", "HotelName", "Description", "Category", "Tags" },
        });

    Console.WriteLine($"Single Vector Search Results:");
    await foreach (SearchResult<Hotel> result in response.GetResultsAsync())
    {
        Hotel doc = result.Document;
        Console.WriteLine($"Score: {result.Score}, HotelId: {doc.HotelId}, HotelName: {doc.HotelName}");
    }
    Console.WriteLine();
}
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. The `SearchSingleVectorWithFilter` method filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```csharp
public static async Task SearchSingleVectorWithFilter(SearchClient searchClient, ReadOnlyMemory<float> precalculatedVector)
{
    SearchResults<Hotel> responseWithFilter = await searchClient.SearchAsync<Hotel>(
        new SearchOptions
        {
            VectorSearch = new()
            {
                Queries = { new VectorizedQuery(precalculatedVector) { KNearestNeighborsCount = 5, Fields = { "DescriptionVector" } } }
            },
            Filter = "Tags/any(tag: tag eq 'free wifi')",
            Select = { "HotelId", "HotelName", "Description", "Category", "Tags" }
        });

    Console.WriteLine($"Single Vector Search With Filter Results:");
    await foreach (SearchResult<Hotel> result in responseWithFilter.GetResultsAsync())
    {
        Hotel doc = result.Document;
        Console.WriteLine($"Score: {result.Score}, HotelId: {doc.HotelId}, HotelName: {doc.HotelName}, Tags: {string.Join(String.Empty, doc.Tags)}");
    }
    Console.WriteLine();
}
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. The `SingleSearchWithGeoFilter` method specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. By default, filters run after the vector search.

```csharp
public static async Task SingleSearchWithGeoFilter(SearchClient searchClient, ReadOnlyMemory<float> precalculatedVector)
{
    SearchResults<Hotel> responseWithGeoFilter = await searchClient.SearchAsync<Hotel>(
        new SearchOptions
        {
            VectorSearch = new()
            {
                Queries = { new VectorizedQuery(precalculatedVector) { KNearestNeighborsCount = 5, Fields = { "DescriptionVector" } } }
            },
            Filter = "geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300",
            Select = { "HotelId", "HotelName", "Description", "Address", "Category", "Tags" },
            Facets = { "Address/StateProvince" },
        });

    Console.WriteLine($"Vector query with a geo filter:");
    await foreach (SearchResult<Hotel> result in responseWithGeoFilter.GetResultsAsync())
    {
        Hotel doc = result.Document;
        Console.WriteLine($"HotelId: {doc.HotelId}");
        Console.WriteLine($"HotelName: {doc.HotelName}");
        Console.WriteLine($"Score: {result.Score}");
        Console.WriteLine($"City/State: {doc.Address.City}/{doc.Address.StateProvince}");
        Console.WriteLine($"Description: {doc.Description}");
        Console.WriteLine();
    }
    Console.WriteLine();
}
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. The `SearchHybridVectorAndText` method runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```csharp
public static async Task<SearchResults<Hotel>> SearchHybridVectorAndText(SearchClient searchClient, ReadOnlyMemory<float> precalculatedVector)
{
    SearchResults<Hotel> responseWithFilter = await searchClient.SearchAsync<Hotel>(
        "historic hotel walk to restaurants and shopping",
        new SearchOptions
        {
            VectorSearch = new()
            {
                Queries = { new VectorizedQuery(precalculatedVector) { KNearestNeighborsCount = 5, Fields = { "DescriptionVector" } } }
            },
            Select = { "HotelId", "HotelName", "Description", "Category", "Tags" },
            Size = 5,
        });

    Console.WriteLine($"Hybrid search results:");
    await foreach (SearchResult<Hotel> result in responseWithFilter.GetResultsAsync())
    {
        Hotel doc = result.Document;
        Console.WriteLine($"Score: {result.Score}");
        Console.WriteLine($"HotelId: {doc.HotelId}");
        Console.WriteLine($"HotelName: {doc.HotelName}");
        Console.WriteLine($"Description: {doc.Description}");
        Console.WriteLine($"Category: {doc.Category}");
        Console.WriteLine($"Tags: {string.Join(String.Empty, doc.Tags)}");
        Console.WriteLine();
    }
    Console.WriteLine();
    return responseWithFilter;
}
```

#### Semantic hybrid search

The `SearchHybridVectorAndSemantic` method demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```csharp
public static async Task SearchHybridVectorAndSemantic(SearchClient searchClient, ReadOnlyMemory<float> precalculatedVector)
{
    SearchResults<Hotel> responseWithFilter = await searchClient.SearchAsync<Hotel>(
        "historic hotel walk to restaurants and shopping",
        new SearchOptions
        {
            IncludeTotalCount = true,
            VectorSearch = new()
            {
                Queries = { new VectorizedQuery(precalculatedVector) { KNearestNeighborsCount = 5, Fields = { "DescriptionVector" } } }
            },
            Select = { "HotelId", "HotelName", "Description", "Category", "Tags" },
            SemanticSearch = new SemanticSearchOptions
            {
                SemanticConfigurationName = "semantic-config"
            },
            QueryType = SearchQueryType.Semantic,
            Size = 5
        });

    Console.WriteLine($"Hybrid search results:");
    await foreach (SearchResult<Hotel> result in responseWithFilter.GetResultsAsync())
    {
        Hotel doc = result.Document;
        Console.WriteLine($"Score: {result.Score}");
        Console.WriteLine($"HotelId: {doc.HotelId}");
        Console.WriteLine($"HotelName: {doc.HotelName}");
        Console.WriteLine($"Description: {doc.Description}");
        Console.WriteLine($"Category: {doc.Category}");
        Console.WriteLine();
    }
    Console.WriteLine();
}
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

+ Actual results include more detail, including semantic captions and highlights. This quickstart modifies results for readability. To get the full structure of the response, use REST to run the request.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.





**Applies to: java**



In this quickstart, you use the [Azure AI Search client library for Java](https://learn.microsoft.com/java/api/overview/azure/search-documents-readme) to create, load, and query a [vector index](vector-store.md). The Java client library provides an abstraction over the REST APIs for index operations.

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-java-samples/tree/main/quickstart-vector-search) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [Java 21 (LTS)](https://learn.microsoft.com/java/openjdk/install) and [Maven](https://maven.apache.org/download.cgi).

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.



## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-java-samples
   ```

1. Navigate to the quickstart folder.

   ```bash
   cd azure-search-java-samples/quickstart-vector-search
   ```

1. In `src/main/resources/application.properties`, replace the placeholder value for `azure.search.endpoint` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Install the dependencies.

   ```bash
   mvn clean dependency:copy-dependencies
   ```

   When the build completes, you should see a `target/dependency` folder in the project directory.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

1. Create a vector index.

    ```bash
    mvn compile exec:java "-Dexec.mainClass=com.example.search.CreateIndex"
    ```

1. Load documents that contain precomputed embeddings.

    ```bash
    mvn compile exec:java "-Dexec.mainClass=com.example.search.UploadDocuments"
    ```

1. Run a vector search query.

    ```bash
    mvn compile exec:java "-Dexec.mainClass=com.example.search.SearchSingle"
    ```

1. (Optional) Run additional query variations.

    ```bash
    mvn compile exec:java "-Dexec.mainClass=com.example.search.SearchSingleWithFilter"
    mvn compile exec:java "-Dexec.mainClass=com.example.search.SearchSingleWithFilterGeo"
    mvn compile exec:java "-Dexec.mainClass=com.example.search.SearchHybrid"
    mvn compile exec:java "-Dexec.mainClass=com.example.search.SearchSemanticHybrid"
    ```

### Output

The output of `CreateIndex.java` shows the index name and confirmation.

```output
Using Azure Search endpoint: https://<search-service-name>.search.windows.net
Using Azure Search index: hotels-vector-quickstart
Creating index...
hotels-vector-quickstart created
```

The output of `UploadDocuments.java` shows the success status for each indexed document.

```output
Uploading documents...
Key: 1, Succeeded: true, ErrorMessage: none
Key: 2, Succeeded: true, ErrorMessage: none
Key: 3, Succeeded: true, ErrorMessage: none
Key: 4, Succeeded: true, ErrorMessage: none
Key: 48, Succeeded: true, ErrorMessage: none
Key: 49, Succeeded: true, ErrorMessage: none
Key: 13, Succeeded: true, ErrorMessage: none
Waiting for indexing... Current count: 0
All documents indexed successfully.
```

The output of `SearchSingle.java` shows vector search results ranked by similarity score.

```output
Single Vector search found 5
- HotelId: 48, HotelName: Nordick's Valley Motel, Tags: ["continental breakfast","air conditioning","free wifi"], Score 0.6605852
- HotelId: 13, HotelName: Luxury Lion Resort, Tags: ["bar","concierge","restaurant"], Score 0.6333684
- HotelId: 4, HotelName: Sublime Palace Hotel, Tags: ["concierge","view","air conditioning"], Score 0.605672
- HotelId: 49, HotelName: Swirling Currents Hotel, Tags: ["air conditioning","laundry service","24-hour front desk service"], Score 0.6026341
- HotelId: 2, HotelName: Old Century Hotel, Tags: ["pool","free wifi","air conditioning","concierge"], Score 0.57902366
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The following code in `CreateIndex.java` creates the index schema, including the vector field `DescriptionVector`.

```java
// Define fields
List<SearchField> fields = Arrays.asList(
    new SearchField("HotelId", SearchFieldDataType.STRING)
        .setKey(true)
        .setFilterable(true),
    new SearchField("HotelName", SearchFieldDataType.STRING)
        .setSortable(true)
        .setSearchable(true),
    new SearchField("Description", SearchFieldDataType.STRING)
        .setSearchable(true),
    new SearchField("DescriptionVector",
        SearchFieldDataType.collection(SearchFieldDataType.SINGLE))
        .setSearchable(true)
        .setVectorSearchDimensions(1536)
        .setVectorSearchProfileName("my-vector-profile"),
    new SearchField("Category", SearchFieldDataType.STRING)
        .setSortable(true)
        .setFilterable(true)
        .setFacetable(true)
        .setSearchable(true),
    new SearchField("Tags", SearchFieldDataType.collection(
        SearchFieldDataType.STRING))
        .setSearchable(true)
        .setFilterable(true)
        .setFacetable(true),
    // Additional fields: ParkingIncluded, LastRenovationDate, Rating, Address, Location
);

var searchIndex = new SearchIndex(indexName, fields);

// Define vector search configuration
var hnswParams = new HnswParameters()
    .setM(16)
    .setEfConstruction(200)
    .setEfSearch(128);
var hnsw = new HnswAlgorithmConfiguration("hnsw-vector-config");
hnsw.setParameters(hnswParams);

var vectorProfile = new VectorSearchProfile(
    "my-vector-profile",
    "hnsw-vector-config");
var vectorSearch = new VectorSearch()
    .setAlgorithms(Arrays.asList(hnsw))
    .setProfiles(Arrays.asList(vectorProfile));
searchIndex.setVectorSearch(vectorSearch);

// Define semantic configuration
var prioritizedFields = new SemanticPrioritizedFields()
    .setTitleField(new SemanticField("HotelName"))
    .setContentFields(Arrays.asList(new SemanticField("Description")))
    .setKeywordsFields(Arrays.asList(new SemanticField("Category")));
var semanticConfig = new SemanticConfiguration(
    "semantic-config",
    prioritizedFields);
var semanticSearch = new SemanticSearch()
    .setConfigurations(Arrays.asList(semanticConfig));
searchIndex.setSemanticSearch(semanticSearch);

// Define suggesters
var suggester = new SearchSuggester("sg", Arrays.asList("HotelName"));
searchIndex.setSuggesters(Arrays.asList(suggester));

// Create the search index
SearchIndex result = searchIndexClient.createOrUpdateIndex(searchIndex);
```

Key takeaways:

+ You define an index by creating a list of fields.

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (`setSearchable`)

    + [Vector search](vector-search-overview.md) (`DescriptionVector` with `setVectorSearchProfileName`)

    + [Semantic ranking](semantic-search-overview.md) (`SemanticConfiguration`)

    + [Faceted search](search-faceted-navigation.md) (fields marked with `setFacetable`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `SearchFieldDataType.GEOGRAPHY_POINT`)

    + [Filtering](search-filters.md) and sorting (fields marked with `setFilterable` and `setSortable`)

+ The `setVectorSearchDimensions()` value must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `VectorSearch` configuration defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents with precomputed vectors. In production scenarios, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

The following code in `UploadDocuments.java` uploads documents to your search service.

```java
// Documents contain hotel data with 1536-dimension vectors for DescriptionVector
static final List<Map<String, Object>> DOCUMENTS = Arrays.asList(
    new HashMap<>() {{
        put("@search.action", "mergeOrUpload");
        put("HotelId", "1");
        put("HotelName", "Stay-Kay City Hotel");
        put("Description", "This classic hotel is fully-refurbished...");
        put("DescriptionVector", Arrays.asList(/* 1536 float values */));
        put("Category", "Boutique");
        put("Tags", Arrays.asList("view", "air conditioning", "concierge"));
        // Additional fields...
    }}
    // Additional hotel documents
);

// Upload documents to the index
IndexDocumentsResult result = searchClient.uploadDocuments(DOCUMENTS);
for (IndexingResult r : result.getResults()) {
    System.out.println("Key: %s, Succeeded: %s".formatted(r.getKey(), r.isSucceeded()));
}
```

Your code interacts with a specific search index hosted in your Azure AI Search service through the `SearchClient`, which is the main object provided by the [`azure-search-documents`](https://learn.microsoft.com/java/api/overview/azure/search-documents-readme) package. The `SearchClient` provides access to operations such as:

+ Data ingestion: `uploadDocuments`, `mergeDocuments`, `deleteDocuments`

+ Search operations: `search`, `autocomplete`, `suggest`

### Query the index

The queries in the search files demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

`SearchSingle.java` demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. `VectorizedQuery` configures the vector search:

+ `setKNearestNeighborsCount()` limits how many results are returned based on vector similarity.
+ `setFields()` specifies the vector field to search against.

```java
var vectorQuery = new VectorizedQuery(QueryVector.getVectorList())
    .setKNearestNeighborsCount(5)
    .setFields("DescriptionVector")
    .setExhaustive(true);

var vectorSearchOptions = new VectorSearchOptions()
    .setQueries(vectorQuery)
    .setFilterMode(VectorFilterMode.POST_FILTER);

var searchOptions = new SearchOptions()
    .setTop(7)
    .setIncludeTotalCount(true)
    .setSelect("HotelId", "HotelName", "Description", "Category", "Tags")
    .setVectorSearchOptions(vectorSearchOptions);

var results = searchClient.search("*", searchOptions, Context.NONE);

for (SearchResult result : results) {
    SearchDocument document = result.getDocument(SearchDocument.class);
    System.out.println("HotelId: %s, HotelName: %s, Score: %s".formatted(
        document.get("HotelId"), document.get("HotelName"), result.getScore()));
}
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. `SearchSingleWithFilter.java` filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```java
var vectorQuery = new VectorizedQuery(QueryVector.getVectorList())
    .setKNearestNeighborsCount(5)
    .setFields("DescriptionVector")
    .setExhaustive(true);

var vectorSearchOptions = new VectorSearchOptions()
    .setQueries(vectorQuery)
    .setFilterMode(VectorFilterMode.POST_FILTER);

// Add filter for "free wifi" tag
var searchOptions = new SearchOptions()
    .setTop(7)
    .setIncludeTotalCount(true)
    .setSelect("HotelId", "HotelName", "Description", "Category", "Tags")
    .setFilter("Tags/any(tag: tag eq 'free wifi')")
    .setVectorSearchOptions(vectorSearchOptions);

var results = searchClient.search("*", searchOptions, Context.NONE);
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. `SearchSingleWithGeoFilter.java` specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. The `setFilterMode` method, called on `VectorSearchOptions`, determines when the filter runs. In this case, `POST_FILTER` runs the filter after the vector search.

```java
var searchOptions = new SearchOptions()
    .setTop(5)
    .setIncludeTotalCount(true)
    .setSelect("HotelId", "HotelName", "Category", "Description",
               "Address/City", "Address/StateProvince")
    .setFacets("Address/StateProvince")
    .setFilter("geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300")
    .setVectorSearchOptions(vectorSearchOptions);
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. `SearchHybrid.java` runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```java
var vectorQuery = new VectorizedQuery(QueryVector.getVectorList())
    .setKNearestNeighborsCount(5)
    .setFields("DescriptionVector")
    .setExhaustive(true);

var vectorSearchOptions = new VectorSearchOptions()
    .setQueries(vectorQuery)
    .setFilterMode(VectorFilterMode.POST_FILTER);

var searchOptions = new SearchOptions()
    .setTop(5)
    .setIncludeTotalCount(true)
    .setSelect("HotelId", "HotelName", "Description", "Category", "Tags")
    .setVectorSearchOptions(vectorSearchOptions);

// Pass both text query and vector search options
var results = searchClient.search(
    "historic hotel walk to restaurants and shopping",
    searchOptions, Context.NONE);
```

#### Semantic hybrid search

`SearchSemanticHybrid.java` demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```java
var vectorQuery = new VectorizedQuery(QueryVector.getVectorList())
    .setKNearestNeighborsCount(5)
    .setFields("DescriptionVector")
    .setExhaustive(true);

var vectorSearchOptions = new VectorSearchOptions()
    .setQueries(vectorQuery)
    .setFilterMode(VectorFilterMode.POST_FILTER);

SemanticSearchOptions semanticSearchOptions = new SemanticSearchOptions()
    .setSemanticConfigurationName("semantic-config");

var searchOptions = new SearchOptions()
    .setTop(5)
    .setIncludeTotalCount(true)
    .setSelect("HotelId", "HotelName", "Category", "Description")
    .setQueryType(QueryType.SEMANTIC)
    .setSemanticSearchOptions(semanticSearchOptions)
    .setVectorSearchOptions(vectorSearchOptions);

var results = searchClient.search(
    "historic hotel walk to restaurants and shopping",
    searchOptions, Context.NONE);
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

+ Actual results include more detail, including semantic captions and highlights. This quickstart modifies results for readability. To get the full structure of the response, use REST to run the request.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.


Otherwise, run the following command to delete the index you created in this quickstart.

```bash
mvn compile exec:java "-Dexec.mainClass=com.example.search.DeleteIndex"
```




**Applies to: javascript**



In this quickstart, you use the [Azure AI Search client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) to create, load, and query a [vector index](vector-store.md). The JavaScript client library provides an abstraction over the REST APIs for index operations.

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-javascript-samples/tree/main/quickstart-vector-js) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [Node.js 20 LTS](https://nodejs.org/en/download/) or later.

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.



## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-javascript-samples
   ```

1. Navigate to the quickstart folder.

   ```bash
   cd azure-search-javascript-samples/quickstart-vector-js
   ```

1. In `sample.env`, replace the placeholder value for `AZURE_SEARCH_ENDPOINT` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Rename `sample.env` to `.env`.

   ```bash
   mv sample.env .env
   ```

1. Install the dependencies.

   ```bash
   npm install
   ```

   When the installation completes, you should see a `node_modules` folder in the project directory.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

1. Create a vector index.

    ```bash
    node -r dotenv/config src/createIndex.js
    ```

1. Load documents that contain precomputed embeddings.

    ```bash
    node -r dotenv/config src/uploadDocuments.js
    ```

1. Run a vector search query.

    ```bash
    node -r dotenv/config src/searchSingle.js
    ```

1. (Optional) Run additional query variations.

    ```bash
    node -r dotenv/config src/searchSingleWithFilter.js
    node -r dotenv/config src/searchSingleWithFilterGeo.js
    node -r dotenv/config src/searchHybrid.js
    node -r dotenv/config src/searchSemanticHybrid.js
    ```

### Output

The output of `createIndex.js` shows the index name and confirmation.

```output
Using Azure Search endpoint: https://<search-service-name>.search.windows.net
Using Azure Search index: hotels-vector-quickstart
Creating index...
hotels-vector-quickstart created
```

The output of `uploadDocuments.js` shows the success status for each indexed document.

```output
Uploading documents...
Key: 1, Succeeded: true, ErrorMessage: none
Key: 2, Succeeded: true, ErrorMessage: none
Key: 3, Succeeded: true, ErrorMessage: none
Key: 4, Succeeded: true, ErrorMessage: none
Key: 48, Succeeded: true, ErrorMessage: none
Key: 49, Succeeded: true, ErrorMessage: none
Key: 13, Succeeded: true, ErrorMessage: none
Waiting for indexing... Current count: 0
All documents indexed successfully.
```

The output of `searchSingle.js` shows vector search results ranked by similarity score.

```output
Single Vector search found 5
- HotelId: 48, HotelName: Nordick's Valley Motel, Tags: ["continental breakfast","air conditioning","free wifi"], Score 0.6605852
- HotelId: 13, HotelName: Luxury Lion Resort, Tags: ["bar","concierge","restaurant"], Score 0.6333684
- HotelId: 4, HotelName: Sublime Palace Hotel, Tags: ["concierge","view","air conditioning"], Score 0.605672
- HotelId: 49, HotelName: Swirling Currents Hotel, Tags: ["air conditioning","laundry service","24-hour front desk service"], Score 0.6026341
- HotelId: 2, HotelName: Old Century Hotel, Tags: ["pool","free wifi","air conditioning","concierge"], Score 0.57902366
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The following code in `createIndex.js` creates the index schema, including the vector field `DescriptionVector`.

```javascript
const searchFields = [
    { name: "HotelId", type: "Edm.String", key: true, sortable: true, filterable: true, facetable: true },
    { name: "HotelName", type: "Edm.String", searchable: true, filterable: true },
    { name: "Description", type: "Edm.String", searchable: true },
    {
        name: "DescriptionVector",
        type: "Collection(Edm.Single)",
        searchable: true,
        vectorSearchDimensions: 1536,
        vectorSearchProfileName: "vector-profile"
    },
    { name: "Category", type: "Edm.String", filterable: true, facetable: true },
    { name: "Tags", type: "Collection(Edm.String)", filterable: true },
    // Additional fields: ParkingIncluded, LastRenovationDate, Rating, Address, Location
];

const vectorSearch = {
    profiles: [
        {
            name: "vector-profile",
            algorithmConfigurationName: "vector-search-algorithm"
        }
    ],
    algorithms: [
        {
            name: "vector-search-algorithm",
            kind: "hnsw",
            parameters: { m: 4, efConstruction: 400, efSearch: 1000, metric: "cosine" }
        }
    ]
};

const semanticSearch = {
    configurations: [
        {
            name: "semantic-config",
            prioritizedFields: {
                contentFields: [{ name: "Description" }],
                keywordsFields: [{ name: "Category" }],
                titleField: { name: "HotelName" }
            }
        }
    ]
};

const searchIndex = {
    name: indexName,
    fields: searchFields,
    vectorSearch: vectorSearch,
    semanticSearch: semanticSearch,
    suggesters: [{ name: "sg", searchMode: "analyzingInfixMatching", sourceFields: ["HotelName"] }]
};

const result = await indexClient.createOrUpdateIndex(searchIndex);
```

Key takeaways:

+ You define an index by creating a list of fields.

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (`searchable: true`)

    + [Vector search](vector-search-overview.md) (`DescriptionVector` with `vectorSearchProfileName`)

    + [Semantic ranking](semantic-search-overview.md) (`semanticSearch`)

    + [Faceted search](search-faceted-navigation.md) (fields marked with `facetable`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `Edm.GeographyPoint`)

    + [Filtering](search-filters.md) and sorting (fields marked with `filterable` and `sortable`)

+ The `vectorSearchDimensions` property must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `vectorSearch` configuration defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents with precomputed vectors. In production scenarios, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

The following code in `uploadDocuments.js` uploads documents to your search service.

```javascript
const DOCUMENTS = [
    // Array of hotel documents with embedded 1536-dimension vectors
    // Each document contains: HotelId, HotelName, Description, DescriptionVector,
    // Category, Tags, ParkingIncluded, LastRenovationDate, Rating, Address, Location
];

const searchClient = new SearchClient(searchEndpoint, indexName, credential);

const result = await searchClient.uploadDocuments(DOCUMENTS);
for (const r of result.results) {
    console.log(`Key: ${r.key}, Succeeded: ${r.succeeded}`);
}
```

Your code interacts with a specific search index hosted in your Azure AI Search service through the `SearchClient`, which is the main object provided by the [`@azure/search-documents`](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) package. The `SearchClient` provides access to index operations, such as:

+ Data ingestion: `uploadDocuments`, `mergeDocuments`, `deleteDocuments`

+ Search operations: `search`, `autocomplete`, `suggest`

### Query the index

The queries in the search files demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

`searchSingle.js` demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. The `vectorQuery` object configures the vector search:

+ `kNearestNeighborsCount` limits how many results are returned based on vector similarity.
+ `fields` specifies the vector field to search against.

```javascript
const vectorQuery = {
    vector: vector,
    kNearestNeighborsCount: 5,
    fields: ["DescriptionVector"],
    kind: "vector",
    exhaustive: true
};

const searchOptions = {
    top: 7,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"],
    includeTotalCount: true,
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const results = await searchClient.search("*", searchOptions);

for await (const result of results.results) {
    const doc = result.document;
    console.log(`HotelId: ${doc.HotelId}, HotelName: ${doc.HotelName}, Score: ${result.score}`);
}
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. `searchSingleWithFilter.js` filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```javascript
const searchOptions = {
    top: 7,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"],
    includeTotalCount: true,
    filter: "Tags/any(tag: tag eq 'free wifi')", // Adding filter for "free wifi" tag
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const results = await searchClient.search("*", searchOptions);
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. `searchSingleWithGeoFilter.js` specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. The `filterMode` property determines when the filter runs. In this case, `postFilter` runs the filter after the vector search.

```javascript
const searchOptions = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Category", "Description", "Address/City", "Address/StateProvince"],
    facets: ["Address/StateProvince"],
    filter: "geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300",
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. `searchHybrid.js` runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```javascript
const vectorQuery = {
    vector: vector,
    kNearestNeighborsCount: 5,
    fields: ["DescriptionVector"],
    kind: "vector",
    exhaustive: true
};

const searchOptions = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"],
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

// Use search text for keyword search (hybrid search = vector + keyword)
const searchText = "historic hotel walk to restaurants and shopping";
const results = await searchClient.search(searchText, searchOptions);
```

#### Semantic hybrid search

`searchSemanticHybrid.js` demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```javascript
const searchOptions = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Category", "Description"],
    queryType: "semantic",
    semanticSearchOptions: {
        configurationName: "semantic-config"
    },
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const searchText = "historic hotel walk to restaurants and shopping";
const results = await searchClient.search(searchText, searchOptions);

for await (const result of results.results) {
    console.log(`Score: ${result.score}, Re-ranker Score: ${result.rerankerScore}`);
}
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

+ Actual results include more detail, including semantic captions and highlights. This quickstart modifies results for readability. To get the full structure of the response, use REST to run the request.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.


Otherwise, run the following command to delete the index you created in this quickstart.

```bash
node -r dotenv/config src/deleteIndex.js
```




**Applies to: python**



In this quickstart, you use the [Azure AI Search client library for Python](https://learn.microsoft.com/python/api/overview/azure/search-documents-readme) to create, load, and query a [vector index](vector-store.md). The Python client library provides an abstraction over the REST APIs for index operations.

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-python-samples/tree/main/Quickstart-Vector-Search) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [Python 3.8](https://www.python.org/downloads/) or later.

- [Visual Studio Code](https://code.visualstudio.com/download) with the [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions.

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.



## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-python-samples
   ```

1. Navigate to the quickstart folder and open it in Visual Studio Code.

   ```bash
   cd azure-search-python-samples/Quickstart-Vector-Search
   code .
   ```

1. In `sample.env`, replace the placeholder value for `AZURE_SEARCH_ENDPOINT` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Rename `sample.env` to `.env`.

   ```bash
   mv sample.env .env
   ```

1. Open `vector-search-quickstart.ipynb`.

1. Press **Ctrl+Shift+P**, select **Notebook: Select Notebook Kernel**, and follow the prompts to create a virtual environment. Select **requirements.txt** for the dependencies.

   When complete, you should see a `.venv` folder in the project directory.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

1. Run the `Install packages and set variables` cell to install the required packages and load environment variables.

1. Run the remaining cells sequentially to create a vector index, upload documents, and run different types of vector queries.

### Output

Each code cell prints its output to the notebook. The following example is the output of `Single vector search`, which shows vector search results ranked by similarity score.

```output
Total results: 7
- HotelId: 48, HotelName: Nordick's Valley Motel, Category: Boutique
- HotelId: 13, HotelName: Luxury Lion Resort, Category: Luxury
- HotelId: 4, HotelName: Sublime Palace Hotel, Category: Boutique
- HotelId: 49, HotelName: Swirling Currents Hotel, Category: Suite
- HotelId: 2, HotelName: Old Century Hotel, Category: Boutique
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The `Create an index` cell in the notebook creates the index schema, including the vector field `DescriptionVector`.

```python
fields = [
    SimpleField(name="HotelId", type=SearchFieldDataType.String, key=True, filterable=True),
    SearchableField(name="HotelName", type=SearchFieldDataType.String, sortable=True),
    SearchableField(name="Description", type=SearchFieldDataType.String),
    SearchField(
        name="DescriptionVector",
        type=SearchFieldDataType.Collection(SearchFieldDataType.Single),
        searchable=True,
        vector_search_dimensions=1536,
        vector_search_profile_name="my-vector-profile"
    ),
    SearchableField(name="Category", type=SearchFieldDataType.String, sortable=True, filterable=True, facetable=True),
    SearchField(name="Tags", type=SearchFieldDataType.Collection(SearchFieldDataType.String), searchable=True, filterable=True, facetable=True),
    # Additional fields omitted for brevity
]
```

Key takeaways:

+ You define an index by creating a list of fields. Each field is created using a helper method that defines the field type and its settings.

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (`SearchableField`)

    + [Vector search](vector-search-overview.md) (`DescriptionVector` with `vector_search_profile_name`)

    + [Semantic ranking](semantic-search-overview.md) (`SemanticConfiguration`)

    + [Faceted search](search-faceted-navigation.md) (fields marked with `facetable`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `SearchFieldDataType.GeographyPoint`)

    + [Filtering](search-filters.md) and sorting (fields marked with `filterable` and `sortable`)

+ The `vector_search_dimensions` property must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `VectorSearch` configuration defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents with precomputed vectors. In production scenarios, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

The `Create documents payload` and `Upload the documents` cells load documents into the index.

```python
documents = [
    # List of hotel documents with embedded 1536-dimension vectors
    # Each document contains: HotelId, HotelName, Description, DescriptionVector,
    # Category, Tags, ParkingIncluded, LastRenovationDate, Rating, Address, Location
]

search_client = SearchClient(
    endpoint=search_endpoint,
    index_name=index_name,
    credential=credential
)

result = search_client.upload_documents(documents=documents)
for r in result:
    print(f"Key: {r.key}, Succeeded: {r.succeeded}, ErrorMessage: {r.error_message}")
```

Your code interacts with a specific search index hosted in your Azure AI Search service through the `SearchClient`, which is the main object provided by the [`azure-search-documents`](https://learn.microsoft.com/python/api/overview/azure/search-documents-readme) package. The `SearchClient` provides access to index operations, such as:

+ Data ingestion: `upload_documents()`, `merge_documents()`, `delete_documents()`

+ Search operations: `search()`, `autocomplete()`, `suggest()`

### Query the index

The queries in the notebook demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

The `Single vector search` cell demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. `VectorizedQuery` configures the vector search:

+ `k_nearest_neighbors` limits how many results are returned based on vector similarity.
+ `fields` specifies the vector field to search against.

```python
vector_query = VectorizedQuery(
    vector=vector,
    k_nearest_neighbors=5,
    fields="DescriptionVector",
    kind="vector",
    exhaustive=True
)

results = search_client.search(
    vector_queries=[vector_query],
    select=["HotelId", "HotelName", "Description", "Category", "Tags"],
    top=5,
    include_total_count=True
)
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. The `Single vector search with filter` cell filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```python
# vector_query omitted for brevity

results = search_client.search(
    vector_queries=[vector_query],
    filter="Tags/any(tag: tag eq 'free wifi')",
    select=["HotelId", "HotelName", "Description", "Category", "Tags"],
    top=7,
    include_total_count=True
)
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. The `Single vector search with geo filter` cell specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. The `vector_filter_mode` parameter determines when the filter runs. In this case, `postFilter` runs the filter after the vector search.

```python
# vector_query omitted for brevity

results = search_client.search(
    include_total_count=True,
    top=5,
    select=[
        "HotelId", "HotelName", "Category", "Description", "Address/City", "Address/StateProvince"
    ],
    facets=["Address/StateProvince"],
    filter="geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300",
    vector_filter_mode="postFilter",
    vector_queries=[vector_query]
)
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. The `Hybrid search` cell runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```python
# vector_query omitted for brevity

results = search_client.search(
    search_text="historic hotel walk to restaurants and shopping",
    vector_queries=[vector_query],
    select=["HotelId", "HotelName", "Description", "Category", "Tags"],
    top=5,
    include_total_count=True
)
```

#### Semantic hybrid search

The `Semantic hybrid search` cell demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```python
# vector_query omitted for brevity

results = search_client.search(
    search_text="historic hotel walk to restaurants and shopping",
    vector_queries=[vector_query],
    select=["HotelId", "HotelName", "Category", "Description"],
    query_type="semantic",
    semantic_configuration_name="my-semantic-config",
    top=5,
    include_total_count=True
)
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

+ Actual results include more detail, including semantic captions and highlights. This quickstart modifies results for readability. To get the full structure of the response, use REST to run the request.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.


Otherwise, you can run the `Clean up` code cell to delete the index you created in this quickstart.




**Applies to: typescript**



In this quickstart, you use the [Azure AI Search client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) (compatible with TypeScript) to create, load, and query a [vector index](vector-store.md). The JavaScript client library provides an abstraction over the REST APIs for index operations.

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-javascript-samples/tree/main/quickstart-vector-ts) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [Node.js 20 LTS](https://nodejs.org/en/download/) or later to run the compiled code.

- [TypeScript](https://www.typescriptlang.org/download/) to compile TypeScript to JavaScript.

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.

 

## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-javascript-samples
   ```

1. Navigate to the quickstart folder.

   ```bash
   cd azure-search-javascript-samples/quickstart-vector-ts
   ```

1. In `sample.env`, replace the placeholder value for `AZURE_SEARCH_ENDPOINT` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Rename `sample.env` to `.env`.

   ```bash
   mv sample.env .env
   ```

1. Install the dependencies.

   ```bash
   npm install
   ```

   When the installation completes, you should see a `node_modules` folder in the project directory.

1. Compile the TypeScript files to JavaScript.

   ```bash
   npm run build
   ```

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

1. Create a vector index.

    ```bash
    node -r dotenv/config dist/createIndex.js
    ```

1. Load documents that contain precomputed embeddings.

    ```bash
    node -r dotenv/config dist/uploadDocuments.js
    ```

1. Run a vector search query.

    ```bash
    node -r dotenv/config dist/searchSingle.js
    ```

1. (Optional) Run additional query variations.

    ```bash
    node -r dotenv/config dist/searchSingleWithFilter.js
    node -r dotenv/config dist/searchSingleWithFilterGeo.js
    node -r dotenv/config dist/searchHybrid.js
    node -r dotenv/config dist/searchSemanticHybrid.js
    ```

    > **Note:**
    > These commands run the compiled `.js` files from the `dist` folder. TypeScript code must be transpiled to JavaScript before Node.js can execute it, which is why you previously ran `npm run build`.

### Output

The output of `createIndex.ts` shows the index name and confirmation.

```output
Using Azure Search endpoint: https://<search-service-name>.search.windows.net
Using index name: hotels-vector-quickstart
Creating index...
hotels-vector-quickstart created
```

The output of `uploadDocuments.ts` shows the success status for each indexed document.

```output
Uploading documents...
Key: 1, Succeeded: true, ErrorMessage: none
Key: 2, Succeeded: true, ErrorMessage: none
Key: 3, Succeeded: true, ErrorMessage: none
Key: 4, Succeeded: true, ErrorMessage: none
Key: 48, Succeeded: true, ErrorMessage: none
Key: 49, Succeeded: true, ErrorMessage: none
Key: 13, Succeeded: true, ErrorMessage: none
All documents indexed successfully.
```

The output of `searchSingle.ts` shows vector search results ranked by similarity score.

```output
Single Vector search found 5
- HotelId: 48, HotelName: Nordick's Valley Motel, Tags: ["continental breakfast","air conditioning","free wifi"], Score 0.6605852
- HotelId: 13, HotelName: Luxury Lion Resort, Tags: ["bar","concierge","restaurant"], Score 0.6333684
- HotelId: 4, HotelName: Sublime Palace Hotel, Tags: ["concierge","view","air conditioning"], Score 0.605672
- HotelId: 49, HotelName: Swirling Currents Hotel, Tags: ["air conditioning","laundry service","24-hour front desk service"], Score 0.6026341
- HotelId: 2, HotelName: Old Century Hotel, Tags: ["pool","free wifi","air conditioning","concierge"], Score 0.57902366
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The following code in `createIndex.ts` creates the index schema, including the vector field `DescriptionVector`.

```typescript
const searchFields: SearchField[] = [
    { name: "HotelId", type: "Edm.String", key: true, sortable: true, filterable: true, facetable: true },
    { name: "HotelName", type: "Edm.String", searchable: true, filterable: true },
    { name: "Description", type: "Edm.String", searchable: true },
    {
        name: "DescriptionVector",
        type: "Collection(Edm.Single)",
        searchable: true,
        vectorSearchDimensions: 1536,
        vectorSearchProfileName: "vector-profile"
    },
    { name: "Category", type: "Edm.String", filterable: true, facetable: true },
    { name: "Tags", type: "Collection(Edm.String)", filterable: true },
    // Additional fields: ParkingIncluded, LastRenovationDate, Rating, Address, Location
];

const vectorSearch: VectorSearch = {
    profiles: [
        {
            name: "vector-profile",
            algorithmConfigurationName: "vector-search-algorithm"
        }
    ],
    algorithms: [
        {
            name: "vector-search-algorithm",
            kind: "hnsw",
            parameters: { m: 4, efConstruction: 400, efSearch: 1000, metric: "cosine" }
        }
    ]
};

const semanticSearch: SemanticSearch = {
    configurations: [
        {
            name: "semantic-config",
            prioritizedFields: {
                contentFields: [{ name: "Description" }],
                keywordsFields: [{ name: "Category" }],
                titleField: { name: "HotelName" }
            }
        }
    ]
};

const searchIndex: SearchIndex = {
    name: indexName,
    fields: searchFields,
    vectorSearch: vectorSearch,
    semanticSearch: semanticSearch,
    suggesters: [{ name: "sg", searchMode: "analyzingInfixMatching", sourceFields: ["HotelName"] }]
};

const result = await indexClient.createOrUpdateIndex(searchIndex);
```

Key takeaways:

+ You define an index by creating a list of fields.

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (`searchable: true`)

    + [Vector search](vector-search-overview.md) (`DescriptionVector` with `vectorSearchProfileName`)

    + [Semantic ranking](semantic-search-overview.md) (`semanticSearch`)

    + [Faceted search](search-faceted-navigation.md) (fields marked with `facetable`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `Edm.GeographyPoint`)

    + [Filtering](search-filters.md) and sorting (fields marked with `filterable` and `sortable`)

+ The `vectorSearchDimensions` property must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `vectorSearch` configuration defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents with precomputed vectors. In production scenarios, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

The following code in `uploadDocuments.ts` uploads documents to your search service.

```typescript
const DOCUMENTS = [
    // Array of hotel documents with embedded 1536-dimension vectors
    // Each document contains: HotelId, HotelName, Description, DescriptionVector,
    // Category, Tags, ParkingIncluded, LastRenovationDate, Rating, Address, Location
];

const searchClient = new SearchClient(searchEndpoint, indexName, credential);

const result = await searchClient.uploadDocuments(DOCUMENTS);
for (const r of result.results) {
    console.log(`Key: ${r.key}, Succeeded: ${r.succeeded}`);
}
```

Your code interacts with a specific search index hosted in your Azure AI Search service through the `SearchClient`, which is the main object provided by the [`@azure/search-documents`](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) package. The `SearchClient` provides access to index operations, such as:

+ Data ingestion: `uploadDocuments`, `mergeDocuments`, `deleteDocuments`

+ Search operations: `search`, `autocomplete`, `suggest`

### Query the index

The queries in the search files demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

`searchSingle.ts` demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. The `VectorQuery` object configures the vector search:

+ `kNearestNeighborsCount` limits how many results are returned based on vector similarity.
+ `fields` specifies the vector field to search against.

```typescript
const vectorQuery: VectorQuery<HotelDocument> = {
    vector: vector,
    kNearestNeighborsCount: 5,
    fields: ["DescriptionVector"],
    kind: "vector",
    exhaustive: true
};

const searchOptions: SearchOptions<HotelDocument> = {
    top: 7,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"] as const,
    includeTotalCount: true,
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const results: SearchDocumentsResult<HotelDocument> = await searchClient.search("*", searchOptions);

for await (const result of results.results) {
    const doc = result.document;
    console.log(`HotelId: ${doc.HotelId}, HotelName: ${doc.HotelName}, Score: ${result.score}`);
}
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. `searchSingleWithFilter.ts` filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```typescript
const searchOptions: SearchOptions<HotelDocument> = {
    top: 7,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"] as const,
    includeTotalCount: true,
    filter: "Tags/any(tag: tag eq 'free wifi')", // Adding filter for "free wifi" tag
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const results: SearchDocumentsResult<HotelDocument> = await searchClient.search("*", searchOptions);
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. `searchSingleWithGeoFilter.ts` specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. The `filterMode` property determines when the filter runs. In this case, `postFilter` runs the filter after the vector search.

```typescript
const searchOptions: SearchOptions<HotelDocument> = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Category", "Description", "Address/City", "Address/StateProvince"] as const,
    facets: ["Address/StateProvince"],
    filter: "geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300",
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. `searchHybrid.ts` runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```typescript
const vectorQuery: VectorQuery<HotelDocument> = {
    vector: vector,
    kNearestNeighborsCount: 5,
    fields: ["DescriptionVector"],
    kind: "vector",
    exhaustive: true
};

const searchOptions: SearchOptions<HotelDocument> = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Description", "Category", "Tags"] as const,
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

// Use search text for keyword search (hybrid search = vector + keyword)
const searchText = "historic hotel walk to restaurants and shopping";
const results: SearchDocumentsResult<HotelDocument> = await searchClient.search(searchText, searchOptions);
```

#### Semantic hybrid search

`searchSemanticHybrid.ts` demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```typescript
const searchOptions: SearchOptions<HotelDocument> = {
    top: 5,
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Category", "Description"] as const,
    queryType: "semantic" as const,
    semanticSearchOptions: {
        configurationName: "semantic-config"
    },
    vectorSearchOptions: {
        queries: [vectorQuery],
        filterMode: "postFilter"
    }
};

const searchText = "historic hotel walk to restaurants and shopping";
const results: SearchDocumentsResult<HotelDocument> = await searchClient.search(searchText, searchOptions);

for await (const result of results.results) {
    console.log(`Score: ${result.score}, Re-ranker Score: ${result.rerankerScore}`);
}
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

+ Actual results include more detail, including semantic captions and highlights. This quickstart modifies results for readability. To get the full structure of the response, use REST to run the request.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.


Otherwise, run the following command to delete the index you created in this quickstart.

```bash
npm run build && node -r dotenv/config dist/deleteIndex.js
```




**Applies to: rest**



In this quickstart, you use the [Azure AI Search REST APIs](https://learn.microsoft.com/rest/api/searchservice) to create, load, and query a [vector index](vector-store.md).

In Azure AI Search, a vector index has an index schema that defines vector and nonvector fields, a vector search configuration for algorithms that create the embedding space, and settings on vector field definitions that are evaluated at query time. [Indexes - Create or Update](https://learn.microsoft.com/rest/api/searchservice/indexes/create-or-update) (REST API) creates the vector index.

> **Tip:**
> + Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-rest-samples/tree/main/Quickstart-vectors) on GitHub.
> + This quickstart omits the vectorization step and provides inline embeddings. For [integrated vectorization](vector-search-integrated-vectorization.md) over your own content, try the [**Import data** wizard](search-get-started-portal-import-vectors.md).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use the Free tier for most of this quickstart, but we recommend Basic or higher for larger data files.

- [Visual Studio Code](https://code.visualstudio.com/download) with the [REST Client extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client).

- [Git](https://git-scm.com/downloads) to clone the sample repository.

- The [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) for keyless authentication with Microsoft Entra ID.

## Configure access


Before you begin, make sure you have permissions to access content and operations in Azure AI Search. This quickstart uses Microsoft Entra ID for authentication and role-based access for authorization. You must be an **Owner** or **User Access Administrator** to assign roles. If roles aren't feasible, use [key-based authentication](search-security-api-keys.md) instead.

To configure the recommended role-based access:

1. [Enable role-based access](search-security-enable-roles.md) for your search service.

1. [Assign the following roles](search-security-rbac.md) to your user account.

    + **Search Service Contributor**

    + **Search Index Data Contributor**

    + **Search Index Data Reader**


## Get endpoint


Each Azure AI Search service has an *endpoint*, which is a unique URL that identifies and provides network access to the service. In a later section, you specify this endpoint to connect to your search service programmatically.

To get the endpoint:

1. Go to your search service in the [Azure portal](https://portal.azure.com).

1. From the left pane, select **Overview**.

1. Make a note of the endpoint, which should look like `https://my-service.search.windows.net`.



## Set up the environment

1. Use Git to clone the sample repository.

   ```bash
   git clone https://github.com/Azure-Samples/azure-search-rest-samples
   ```

1. Navigate to the quickstart folder and open it in Visual Studio Code.

   ```bash
   cd azure-search-rest-samples/Quickstart-vectors
   code .
   ```

1. In `az-search-quickstart-vectors.rest`, replace the placeholder value for `@baseUrl` with the URL you obtained in [Get endpoint](#get-endpoint).

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

1. For keyless authentication with Microsoft Entra ID, generate an access token.

    ```azurecli
    az account get-access-token --scope https://search.azure.com/.default --query accessToken -o tsv
    ```

1. Replace the placeholder value for `@token` with the token from the previous step.

## Run the code

1. Under `### List existing indexes by name`, select **Send Request** to verify your connection.

   A response should appear in an adjacent pane. If you have existing indexes, they're listed. Otherwise, the list is empty. If the HTTP code is `200 OK`, you're ready to proceed.

1. Send the remaining requests sequentially to create a vector index, upload documents, and run different types of vector queries.

### Output

Each query request returns JSON results. The following example is the output of the `### Run a single vector query` request, which shows vector search results ranked by similarity score.

```json
{
  "@odata.count": 5,
  "value": [
    {
      "@search.score": 0.6605852,
      "HotelId": "48",
      "HotelName": "Nordick's Valley Motel",
      "Description": "Only 90 miles (about 2 hours) from the nation's capital and nearby most everything the historic valley has to offer. Hiking? Wine Tasting? Exploring the caverns? It's all nearby and we have specially priced packages to help make our B&B your home base for fun while visiting the valley.",
      "Category": "Boutique",
      "Tags": [
        "continental breakfast",
        "air conditioning",
        "free wifi"
      ]
    },
    {
      "@search.score": 0.6333684,
      "HotelId": "13",
      "HotelName": "Luxury Lion Resort",
      "Description": "Unmatched Luxury. Visit our downtown hotel to indulge in luxury accommodations. Moments from the stadium and transportation hubs, we feature the best in convenience and comfort.",
      "Category": "Luxury",
      "Tags": [
        "bar",
        "concierge",
        "restaurant"
      ]
    },
    {
      "@search.score": 0.605672,
      "HotelId": "4",
      "HotelName": "Sublime Palace Hotel",
      "Description": "Sublime Palace Hotel is located in the heart of the historic center of Sublime in an extremely vibrant and lively area within short walking distance to the sites and landmarks of the city and is surrounded by the extraordinary beauty of churches, buildings, shops and monuments. Sublime Cliff is part of a lovingly restored 19th century resort, updated for every modern convenience.",
      "Category": "Boutique",
      "Tags": [
        "concierge",
        "view",
        "air conditioning"
      ]
    },
    {
      "@search.score": 0.6026341,
      "HotelId": "49",
      "HotelName": "Swirling Currents Hotel",
      "Description": "Spacious rooms, glamorous suites and residences, rooftop pool, walking access to shopping, dining, entertainment and the city center. Each room comes equipped with a microwave, a coffee maker and a minifridge. In-room entertainment includes complimentary W-Fi and flat-screen TVs.",
      "Category": "Suite",
      "Tags": [
        "air conditioning",
        "laundry service",
        "24-hour front desk service"
      ]
    },
    {
      "@search.score": 0.57902366,
      "HotelId": "2",
      "HotelName": "Old Century Hotel",
      "Description": "The hotel is situated in a nineteenth century plaza, which has been expanded and renovated to the highest architectural standards to create a modern, functional and first-class hotel in which art and unique historical elements coexist with the most modern comforts. The hotel also regularly hosts events like wine tastings, beer dinners, and live music.",
      "Category": "Boutique",
      "Tags": [
        "pool",
        "free wifi",
        "air conditioning",
        "concierge"
      ]
    }
  ]
}
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a vector index](#create-a-vector-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a vector index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured. This quickstart calls [Indexes - Create (REST API)](https://learn.microsoft.com/rest/api/searchservice/indexes/create) to build a vector index named `hotels-vector-quickstart` and its physical data structures on your search service.

The index schema is organized around hotel content. Sample data consists of vector and nonvector descriptions of fictitious hotels. The following excerpt shows the key structure of the `### Create a new index` request.

```http
PUT {{baseUrl}}/indexes/hotels-vector-quickstart?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "name": "hotels-vector-quickstart",
    "fields": [
        { "name": "HotelId", "type": "Edm.String", "key": true, "filterable": true },
        { "name": "HotelName", "type": "Edm.String", "searchable": true },
        { "name": "Description", "type": "Edm.String", "searchable": true },
        {
            "name": "DescriptionVector",
            "type": "Collection(Edm.Single)",
            "searchable": true,
            "dimensions": 1536,
            "vectorSearchProfile": "my-vector-profile"
        },
        { "name": "Category", "type": "Edm.String", "filterable": true, "facetable": true },
        { "name": "Tags", "type": "Collection(Edm.String)", "filterable": true, "facetable": true }
        // Additional fields omitted for brevity
    ],
    "vectorSearch": {
        "algorithms": [
            { "name": "hnsw-vector-config", "kind": "hnsw" }
        ],
        "profiles": [
            { "name": "my-vector-profile", "algorithm": "hnsw-vector-config" }
        ]
    },
    "semantic": {
        "configurations": [
            {
                "name": "semantic-config",
                "prioritizedFields": {
                    "titleField": { "fieldName": "HotelName" },
                    "prioritizedContentFields": [{ "fieldName": "Description" }]
                }
            }
        ]
    }
}
```

Key takeaways:

+ This particular index supports multiple search capabilities:

    + [Full-text search](search-lucene-query-architecture.md) (fields with `searchable` set to `true`)

    + [Vector search](vector-search-overview.md) (`DescriptionVector` with `vectorSearchProfile`)

    + [Semantic ranking](semantic-search-overview.md) (`semantic` configuration)

    + [Faceted search](search-faceted-navigation.md) (fields with `facetable` set to `true`)

    + [Geo-spatial search](search-query-odata-geo-spatial-functions.md) (`Location` field with `Edm.GeographyPoint`)

    + [Filtering](search-filters.md) and sorting (fields with `filterable` and `sortable` set to `true`)

+ The `dimensions` property must match the output size of your embedding model. This quickstart uses 1,536 dimensions to match the `text-embedding-ada-002` model.

+ The `vectorSearch` section defines the Approximate Nearest Neighbor (ANN) algorithm. Supported algorithms include Hierarchical Navigable Small World (HNSW) and exhaustive K-Nearest Neighbor (KNN). For more information, see [Relevance in vector search](vector-search-ranking.md).

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents as inline JSON. In production scenarios, however, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

This quickstart calls [Documents - Index (REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/) to add sample hotel documents to your index. The following excerpt shows the structure of the `### Upload 7 documents` request.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/index?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "value": [
        {
            "@search.action": "mergeOrUpload",
            "HotelId": "1",
            "HotelName": "Stay-Kay City Hotel",
            "Description": "This classic hotel is ideally located on the main commercial artery of the city...",
            "DescriptionVector": [-0.0347, 0.0289, ... ],  // 1536 floats
            "Category": "Boutique",
            "Tags": ["view", "air conditioning", "concierge"],
            "ParkingIncluded": false,
            "Rating": 3.60,
            "Address": { "City": "New York", "StateProvince": "NY" },
            "Location": { "type": "Point", "coordinates": [-73.975403, 40.760586] }
        }
        // Additional documents omitted for brevity
    ]
}
```

Key takeaways:

+ Each document in the `value` array represents a hotel and contains fields that match the index schema. The `@search.action` parameter specifies the operation to perform for each document. This quickstart uses `mergeOrUpload`, which adds the document if it doesn't exist or updates the document if it does exist.

+ Documents in the payload consist of fields defined in the index schema.

### Query the index

The queries in the sample file demonstrate different search patterns. The example vector queries are based on two strings:

+ Full-text search string: `"historic hotel walk to restaurants and shopping"`

+ Vector query string: `"quintessential lodging near running trails, eateries, retail"` (vectorized into a mathematical representation)

The vector query string is semantically similar to the full-text search string, but it includes terms that don't exist in the index. A keyword-only search for the vector query string returns zero results. However, vector search finds relevant matches based on meaning rather than exact keywords.

The following examples start with a basic vector query and progressively add filters, keyword search, and semantic reranking.

#### Single vector search

The `### Run a single vector query` request demonstrates a basic scenario where you want to find document descriptions that closely match the vector query string. The `vectorQueries` array configures the vector search:

+ `k` limits how many results are returned based on vector similarity.
+ `fields` specifies the vector field to search against.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "count": true,
    "select": "HotelId, HotelName, Description, Category, Tags",
    "vectorQueries": [
        {
            "vector": [ ... ],  // 1536-dimensional vector of "quintessential lodging near running trails, eateries, retail"
            "k": 5,
            "fields": "DescriptionVector",
            "kind": "vector",
            "exhaustive": true
        }
    ]
}
```

#### Single vector search with a filter

In Azure AI Search, [filters](vector-search-filters.md) apply to nonvector fields in an index. The `### Run a vector query with a filter` request filters on the `Tags` field to filter out any hotels that don't provide free Wi-Fi.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "count": true,
    "select": "HotelId, HotelName, Description, Category, Tags",
    "filter": "Tags/any(tag: tag eq 'free wifi')",
    "vectorFilterMode": "postFilter",
    "vectorQueries": [
        {
            "vector": [ ... ],  // 1536-dimensional vector
            "k": 7,
            "fields": "DescriptionVector",
            "kind": "vector",
            "exhaustive": true
        }
    ]
}
```

#### Single vector search with a geo filter

You can specify a [geo-spatial filter](search-query-odata-geo-spatial-functions.md) to limit results to a specific geographic area. The `### Run a vector query with a geo filter` request specifies a geographic point (Washington D.C., using longitude and latitude coordinates) and returns hotels within 300 kilometers. The `vectorFilterMode` parameter determines when the filter runs. In this case, `postFilter` runs the filter after the vector search.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "count": true,
    "select": "HotelId, HotelName, Address/City, Address/StateProvince, Description",
    "filter": "geo.distance(Location, geography'POINT(-77.03241 38.90166)') le 300",
    "vectorFilterMode": "postFilter",
    "top": 5,
    "facets": [ "Address/StateProvince"],
    "vectorQueries": [
        {
            "vector": [ ... ],  // 1536-dimensional vector
            "k": 5,
            "fields": "DescriptionVector",
            "kind": "vector",
            "exhaustive": true
        }
    ]
}
```

#### Hybrid search

[Hybrid search](hybrid-search-overview.md) combines full-text and vector queries in a single request. The `### Run a hybrid query` request runs both query types concurrently, and then uses Reciprocal Rank Fusion (RRF) to merge the results into a unified ranking. RRF uses the inverse of result rankings from each result set to produce a merged ranking. Notice that hybrid search scores are uniformly smaller than single-query scores.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "count": true,
    "search": "historic hotel walk to restaurants and shopping",
    "select": "HotelId, HotelName, Category, Tags, Description",
    "top": 5,
    "vectorQueries": [
        {
            "vector": [ ... ],  // 1536-dimensional vector
            "k": 5,
            "fields": "DescriptionVector",
            "kind": "vector",
            "exhaustive": true
        }
    ]
}
```

#### Semantic hybrid search

The `### Run a hybrid query with semantic reranking` request demonstrates [semantic ranking](semantic-search-overview.md), which reranks results based on language understanding.

```http
POST {{baseUrl}}/indexes/hotels-vector-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "count": true,
    "search": "historic hotel walk to restaurants and shopping",
    "select": "HotelId, HotelName, Category, Description",
    "queryType": "semantic",
    "semanticConfiguration": "semantic-config",
    "top": 5,
    "vectorQueries": [
        {
            "vector": [ ... ],  // 1536-dimensional vector
            "k": 7,
            "fields": "DescriptionVector",
            "kind": "vector",
            "exhaustive": true
        }
    ]
}
```

Compare these results with the hybrid search results from the previous query. Without semantic reranking, Sublime Palace Hotel ranks first because Reciprocal Rank Fusion (RRF) combines the text and vector scores to produce a merged result. After semantic reranking, Swirling Currents Hotel moves to the top spot.

The semantic ranker uses machine comprehension models to evaluate how well each result matches the intent of the query. Swirling Currents Hotel's description mentions `"walking access to shopping, dining, entertainment and the city center"`, which aligns closely with the search query's `"walk to restaurants and shopping"`. This semantic match for nearby dining and shopping elevates it above Sublime Palace Hotel, which doesn't emphasize walkable amenities in its description.

Key takeaways:

+ In a hybrid search, you can integrate vector search with full-text search over keywords. Filters and semantic ranking apply to textual content only, not vectors.

## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.


Otherwise, you can send the `### Delete an index` request to delete the index you created in this quickstart.





## Related content

+ [Vector search in Azure AI Search](vector-search-overview.md)
+ [azure-search-vector-samples](https://github.com/Azure/azure-search-vector-samples) GitHub repository
