---
title: 'Quickstart: Full-Text Search'
description: "Learn how to create, load, and query a search index programmatically."
author: mattwojo
ms.author: mattwoj
ms.service: azure-ai-search
ms.custom:
  - devx-track-dotnet
  - devx-track-extended-java
  - devx-track-js
  - devx-track-ts
  - devx-track-python
  - ignite-2023
ms.topic: quickstart
zone_pivot_groups: search-sdks-rest-powershell
ms.date: 07/20/2026
ai-usage: ai-assisted
---

# Quickstart: Full-text search


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


**Applies to: csharp**



In this quickstart, you use the [Azure AI Search client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/search) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-dotnet-samples/tree/main/quickstart-keyword-search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-dotnet-samples/quickstart-keyword-search/AzureSearchQuickstart
    ```

1. In `Program.cs`, replace the placeholder value for `serviceEndpoint` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Install the dependencies from `AzureSearchQuickstart.csproj`.

    ```bash
    dotnet restore
    ```

    When the restore completes, verify that no errors appear in the output.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

Build and run the application.

```bash
dotnet run
```

### Output

The output should be similar to the following:

```
Deleting index...

Creating index...

Uploading documents...

Waiting for indexing...

Starting queries...

Query #1: Search on empty term '*' to return all documents, showing a subset of fields...

HotelId: 3
Name: Gastronomic Landscape Hotel
Rating: 4.8

HotelId: 2
Name: Old Century Hotel
Rating: 3.6

HotelId: 4
Name: Sublime Palace Hotel
Rating: 4.6

HotelId: 1
Name: Stay-Kay City Hotel
Rating: 3.6


Query #2: Search on 'hotels', filter on 'Rating gt 4', sort by Rating in descending order...

HotelId: 3
Name: Gastronomic Landscape Hotel
Rating: 4.8

HotelId: 4
Name: Sublime Palace Hotel
Rating: 4.6


Query #3: Limit search to specific fields (pool in Tags field)...

HotelId: 2
Name: Old Century Hotel
Tags: [ pool, free wifi, concierge ]


Query #4: Facet on 'Category'...

HotelId: 3
Name: Gastronomic Landscape Hotel
Category: Suite

HotelId: 2
Name: Old Century Hotel
Category: Boutique

HotelId: 4
Name: Sublime Palace Hotel
Category: Boutique

HotelId: 1
Name: Stay-Kay City Hotel
Category: Boutique


Query #5: Look up a specific document...

3
Query #6: Call Autocomplete on HotelName...

san
sarasota

Complete. Press any key to end this program...
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search client](#create-a-search-client)
1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search client

In `Program.cs`, you create two clients:

- [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient) creates the index.
- [SearchClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient) loads and queries an existing index.

Both clients require the service endpoint and a credential for authentication. In this quickstart, you use [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) for keyless authentication with Microsoft Entra ID.

### Create a search index

This quickstart builds a hotels index that you load with hotel data and execute queries against. In this step, you define the fields in the index. Each field definition includes a name, data type, and attributes that determine how the field is used.

This example uses synchronous methods of the [SearchIndexClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient) class for simplicity and readability. However, for production scenarios, use asynchronous methods to keep your app scalable and responsive. For example, use [CreateIndexAsync](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient.createindexasync) instead of [CreateIndex](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient.createindex).

#### Define the structures

You create two helper classes, `Hotel.cs` and `Address.cs`, to define the structure of a hotel document and its address. The `Hotel` class includes fields for a hotel ID, name, description, category, tags, parking, renovation date, rating, and address. The `Address` class includes fields for street address, city, state/province, postal code, and country/region.

In the Azure.Search.Documents client library, you can use [SearchableField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchablefield) and [SimpleField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.simplefield) to streamline field definitions. Both are helper classes that generate a [SearchField](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield) and can potentially simplify your code:

- `SimpleField` can be any data type, is always nonsearchable (ignored for full-text search queries), and is retrievable (not hidden). Other attributes are off by default, but can be enabled. You might use a `SimpleField` for document IDs or fields used only in filters, facets, or scoring profiles. If so, apply any attributes that are necessary for the scenario, such as `IsKey = true` for a document ID.

- `SearchableField` must be a string, and is always searchable and retrievable. Other attributes are off by default, but can be enabled. Because this field type is searchable, it supports synonyms and the full complement of analyzer properties.

Whether you use the basic `SearchField` API or either one of the helper models, you must explicitly enable filter, facet, and sort attributes. For example, [IsFilterable](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield.isfilterable), [IsSortable](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield.issortable), and [IsFacetable](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield.isfacetable) must be explicitly set, as shown in the previous sample.

#### Create the search index

In `Program.cs`, you create a [SearchIndex](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchindex) object, and then call the [CreateOrUpdateIndex](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient.createorupdateindex) method to express the index in your search service. The index also includes a [SearchSuggester](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchsuggester) to enable autocomplete on the specified fields.

```csharp
// Create hotels-quickstart index
private static void CreateIndex(string indexName, SearchIndexClient searchIndexClient)
{
    FieldBuilder fieldBuilder = new FieldBuilder();
    var searchFields = fieldBuilder.Build(typeof(Hotel));

    var definition = new SearchIndex(indexName, searchFields);

    var suggester = new SearchSuggester("sg", new[] { "HotelName", "Category", "Address/City", "Address/StateProvince" });
    definition.Suggesters.Add(suggester);

    searchIndexClient.CreateOrUpdateIndex(definition);
}
```

### Upload documents to the index

Azure AI Search searches over content stored in the service. In this step, you load JSON documents that conform to the hotel index you created.

In Azure AI Search, search documents are data structures that are both inputs to indexing and outputs from queries. As obtained from an external data source, document inputs might be rows in a database, blobs in Azure Blob Storage, or JSON documents on disk. In this example, you take a shortcut and embed JSON documents for four hotels directly.

When uploading documents, you must use an [IndexDocumentsBatch](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.indexdocumentsbatch-1) object. An `IndexDocumentsBatch` object contains a collection of [Actions](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.indexdocumentsbatch-1.actions), each of which contains a document and a property telling Azure AI Search what action to perform ([upload, merge, delete, and mergeOrUpload](https://learn.microsoft.com/azure/search/search-what-is-data-import#indexing-actions)).

In `Program.cs`, you create an array of documents and index actions, and then pass the array to `IndexDocumentsBatch`. The following documents conform to the hotels-quickstart index, as defined by the hotel class.

```csharp
// Upload documents in a single Upload request.
private static void UploadDocuments(SearchClient searchClient)
{
    IndexDocumentsBatch<Hotel> batch = IndexDocumentsBatch.Create(
        IndexDocumentsAction.Upload(
            new Hotel()
            {
                HotelId = "1",
                HotelName = "Stay-Kay City Hotel",
                Description = "This classic hotel is fully-refurbished and ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Times Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
                Category = "Boutique",
                Tags = new[] { "view", "air conditioning", "concierge" },
                ParkingIncluded = false,
                LastRenovationDate = new DateTimeOffset(2022, 1, 18, 0, 0, 0, TimeSpan.Zero),
                Rating = 3.6,
                Address = new Address()
                {
                    StreetAddress = "677 5th Ave",
                    City = "New York",
                    StateProvince = "NY",
                    PostalCode = "10022",
                    Country = "USA"
                }
            }),
        // REDACTED FOR BREVITY
}
```

The `UploadDocuments` method creates an [IndexDocumentsBatch](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.indexdocumentsbatch-1) and calls [IndexDocuments](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient.indexdocuments) on a [SearchClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient) to upload the documents. This quickstart obtains `SearchClient` from `SearchIndexClient` using [GetSearchClient](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient.getsearchclient), which reuses the same credentials.

```csharp
SearchClient ingesterClient = searchIndexClient.GetSearchClient(indexName);

// Load documents
Console.WriteLine("{0}", "Uploading documents...\n");
UploadDocuments(ingesterClient);
```

Because this console app runs all commands sequentially, the code adds a two-second wait time between indexing and queries.

```csharp
// Wait 2 seconds for indexing to complete before starting queries (for demo and console-app purposes only)
Console.WriteLine("Waiting for indexing...\n");
System.Threading.Thread.Sleep(2000);
```

The two-second delay compensates for indexing, which is asynchronous, so that all documents can be indexed before the queries are executed. Coding in a delay is typically only necessary in demos, tests, and sample applications.

### Query the index

You can get query results as soon as the first document is indexed, but actual testing of your index should wait until all documents are indexed.

This section adds two pieces of functionality: query logic and results. For queries, use the [Search](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient.search) method. This method takes search text (the query string) and other [options](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchoptions).

The [SearchResults](https://learn.microsoft.com/dotnet/api/azure.search.documents.models.searchresults-1) class represents the results.

In `Program.cs`, the `WriteDocuments` method prints search results to the console.

```csharp
// Write search results to console
private static void WriteDocuments(SearchResults<Hotel> searchResults)
{
    foreach (SearchResult<Hotel> result in searchResults.GetResults())
    {
        Console.WriteLine(result.Document);
    }

    Console.WriteLine();
}

private static void WriteDocuments(AutocompleteResults autoResults)
{
    foreach (AutocompleteItem result in autoResults.Results)
    {
        Console.WriteLine(result.Text);
    }

    Console.WriteLine();
}
```

#### Query example 1

The `RunQueries` method executes queries and returns results. Results are Hotel objects. This sample shows the method signature and the first query. This query demonstrates the `Select` parameter that lets you compose the result using selected fields from the document.

```csharp
// Run queries, use WriteDocuments to print output
private static void RunQueries(SearchClient searchClient)
{
    SearchOptions options;
    SearchResults<Hotel> response;
    
    // Query 1
    Console.WriteLine("Query #1: Search on empty term '*' to return all documents, showing a subset of fields...\n");

    options = new SearchOptions()
    {
        IncludeTotalCount = true,
        Filter = "",
        OrderBy = { "" }
    };

    options.Select.Add("HotelId");
    options.Select.Add("HotelName");
    options.Select.Add("Rating");

    response = searchClient.Search<Hotel>("*", options);
    WriteDocuments(response);
    // REDACTED FOR BREVITY
}
```

#### Query example 2

In the second query, search on a term, add a filter that selects documents where `Rating` is greater than 4, and then sort by `Rating` in descending order. A filter is a boolean expression evaluated over [IsFilterable](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.models.searchfield.isfilterable) fields in an index. Filter queries either include or exclude values. As such, there's no relevance score associated with a filter query.

```csharp
// Query 2
Console.WriteLine("Query #2: Search on 'hotels', filter on 'Rating gt 4', sort by Rating in descending order...\n");

options = new SearchOptions()
{
    Filter = "Rating gt 4",
    OrderBy = { "Rating desc" }
};

options.Select.Add("HotelId");
options.Select.Add("HotelName");
options.Select.Add("Rating");

response = searchClient.Search<Hotel>("hotels", options);
WriteDocuments(response);
```

#### Query example 3

The third query demonstrates `searchFields`, used to scope a full-text search operation to specific fields.

```csharp
// Query 3
Console.WriteLine("Query #3: Limit search to specific fields (pool in Tags field)...\n");

options = new SearchOptions()
{
    SearchFields = { "Tags" }
};

options.Select.Add("HotelId");
options.Select.Add("HotelName");
options.Select.Add("Tags");

response = searchClient.Search<Hotel>("pool", options);
WriteDocuments(response);
```

#### Query example 4

The fourth query demonstrates `facets`, which can be used to structure a faceted navigation structure.

```csharp
// Query 4
Console.WriteLine("Query #4: Facet on 'Category'...\n");

options = new SearchOptions()
{
    Filter = ""
};

options.Facets.Add("Category");

options.Select.Add("HotelId");
options.Select.Add("HotelName");
options.Select.Add("Category");

response = searchClient.Search<Hotel>("*", options);
WriteDocuments(response);
```

#### Query example 5

In the fifth query, return a specific document. A document lookup is a typical response to an `OnClick` event in a result set.

```csharp
// Query 5
Console.WriteLine("Query #5: Look up a specific document...\n");

Response<Hotel> lookupResponse;
lookupResponse = searchClient.GetDocument<Hotel>("3");

Console.WriteLine(lookupResponse.Value.HotelId);
```

#### Query example 6

The last query shows the syntax for autocomplete, simulating a partial user input of *sa* that resolves to two possible matches in the `sourceFields` associated with the suggester you defined in the index.

```csharp
// Query 6
Console.WriteLine("Query #6: Call Autocomplete on HotelName...\n");

var autoresponse = searchClient.Autocomplete("sa", "sg");
WriteDocuments(autoresponse);
```

#### Summary of queries

The previous queries show multiple [ways of matching terms in a query](https://learn.microsoft.com/azure/search/search-query-overview#types-of-queries): full-text search, filters, and autocomplete.

The [SearchClient.Search](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient.search) method performs full-text search and filters. You can pass a search query in the `searchText` string, while you pass a filter expression in the [Filter](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchoptions.filter) property of the [SearchOptions](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchoptions) class. To filter without searching, just pass `"*"` for the `searchText` parameter of the [Search](https://learn.microsoft.com/dotnet/api/azure.search.documents.searchclient.search) method. To search without filtering, leave the `Filter` property unset, or don't pass in a `SearchOptions` instance at all.





**Applies to: java**



In this quickstart, you use the [Azure AI Search client library for Java](https://learn.microsoft.com/java/api/overview/azure/search-documents-readme) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-java-samples/tree/main/quickstart-keyword-search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-java-samples/quickstart-keyword-search
    ```

1. In `src/main/java/azure/search/sample/App.java`, replace the placeholder value for `searchServiceEndpoint` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Install the dependencies.

    ```bash
    mvn clean dependency:copy-dependencies
    ```

    When the build completes, verify that no errors appear in the output.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

Compile and run the application.

### [Windows](#tab/windows)

```bash
javac -d target/classes -cp "target/dependency/*" src/main/java/azure/search/sample/*.java
java -cp "target/classes;target/dependency/*" azure.search.sample.App
```

### [macOS](#tab/macos)

```bash
javac -d target/classes -cp "target/dependency/*" src/main/java/azure/search/sample/*.java
java -cp "target/classes:target/dependency/*" azure.search.sample.App
```

### [Linux](#tab/linux)

```bash
javac -d target/classes -cp "target/dependency/*" src/main/java/azure/search/sample/*.java
java -cp "target/classes:target/dependency/*" azure.search.sample.App
```

---

### Output

The output should be similar to the following:

```
Waiting for indexing...

Starting queries...

Query #1: Search on empty term '*' to return all documents, showing a subset of fields...

{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Address":{"City":"Atlanta"}}
{"HotelId":"2","HotelName":"Old Century Hotel","Address":{"City":"Sarasota"}}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Address":{"City":"San Antonio"}}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Address":{"City":"New York"}}

Query #2: Search on 'hotels', filter on 'Rating gt 4', sort by Rating in descending order...

{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Rating":4.8}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}

Query #3: Limit search to specific fields (pool in Tags field)...

{"HotelId":"2","HotelName":"Old Century Hotel","Tags":["pool","free wifi","concierge"]}

Query #4: Facet on 'Category'...

{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Category":"Suite"}
{"HotelId":"2","HotelName":"Old Century Hotel","Category":"Boutique"}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Category":"Boutique"}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Category":"Boutique"}

Query #5: Look up a specific document...

3

Query #6: Call Autocomplete on HotelName that starts with 's'...

stay
sublime

Complete.
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search client](#create-a-search-client)
1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search client

In `App.java`, you create two clients:

- [SearchIndexClient](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.searchindexclient) creates the index.
- [SearchClient](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) loads and queries an existing index.

Both clients require the service endpoint and a credential for authentication. In this quickstart, you use [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) for keyless authentication with Microsoft Entra ID.

### Create a search index

This quickstart builds a hotels index that you load with hotel data and execute queries against. In this step, you define the fields in the index. Each field definition includes a name, data type, and attributes that determine how the field is used.

This example uses synchronous methods of the [SearchIndexClient](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.searchindexclient) class for simplicity and readability. However, for production scenarios, use the [SearchIndexAsyncClient](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.searchindexasyncclient) class to keep your app scalable and responsive.

#### Define the structures

You create two helper classes, `Hotel.java` and `Address.java`, to define the structure of a hotel document and its address. The `Hotel` class includes fields for a hotel ID, name, description, category, tags, parking, renovation date, rating, and address. The `Address` class includes fields for street address, city, state/province, postal code, and country/region.

In the azure-search-documents client library, you can use [SearchableField](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes) and [SimpleField](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes) to streamline field definitions. Both are annotations that you can apply to fields or methods to generate a [SearchField](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchfield):

- `SimpleField` can be any data type, is always nonsearchable (ignored for full-text search queries), and is retrievable (not hidden). Other attributes are off by default, but can be enabled. You might use a `SimpleField` for document IDs or fields used only in filters, facets, or scoring profiles. If so, apply any attributes that are necessary for the scenario, such as `isKey = true` for a document ID.
- `SearchableField` must be a string, and is always searchable and retrievable. Other attributes are off by default, but can be enabled. Because this field type is searchable, it supports synonyms and the full complement of analyzer properties.

Whether you use the basic `SearchField` API or either one of the helper models, you must explicitly enable filter, facet, and sort attributes. For example, [isFilterable](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchfield), [isSortable](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchfield), and [isFacetable](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchfield) must be explicitly set, as shown in the previous sample.

#### Create the search index

In `App.java`, you create a [SearchIndex](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchindex) object, and then call the [createOrUpdateIndex](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.searchindexclient) method to express the index in your search service. The index also includes a [SearchSuggester](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchsuggester) to enable autocomplete on the specified fields.

```java
// Create Search Index for Hotel model
searchIndexClient.createOrUpdateIndex(
    new SearchIndex(indexName, SearchIndexClient.buildSearchFields(Hotel.class, null))
    .setSuggesters(new SearchSuggester("sg", Arrays.asList("HotelName"))));
```

### Upload documents to the index

Azure AI Search searches over content stored in the service. In this step, you load JSON documents that conform to the hotel index you created.

In Azure AI Search, search documents are data structures that are both inputs to indexing and outputs from queries. As obtained from an external data source, document inputs might be rows in a database, blobs in Azure Blob Storage, or JSON documents on disk. In this example, you take a shortcut and embed JSON documents for four hotels directly.

When uploading documents, you must use an [IndexDocumentsBatch](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models) object. An `IndexDocumentsBatch` object contains a collection of [IndexActions](https://learn.microsoft.com/java/api/com.azure.search.documents.models.indexaction), each of which contains a document and a property telling Azure AI Search what action to perform ([upload, merge, delete, and mergeOrUpload](https://learn.microsoft.com/azure/search/search-what-is-data-import#indexing-actions)).

In `App.java`, you create an array of documents and index actions, and then pass the array to `IndexDocumentsBatch`. The following documents conform to the hotels-quickstart index, as defined by the hotel class.

```java
private static void uploadDocuments(SearchClient searchClient)
{
    var hotelList = new ArrayList<Hotel>();

    var hotel = new Hotel();
    hotel.hotelId = "1";
    hotel.hotelName = "Stay-Kay City Hotel";
    hotel.description = "This classic hotel is fully-refurbished and ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Times Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
    hotel.category = "Boutique";
    hotel.tags = new String[] { "view", "air conditioning", "concierge" };
    hotel.parkingIncluded = false;
    hotel.lastRenovationDate = OffsetDateTime.of(LocalDateTime.of(LocalDate.of(2022, 1, 18), LocalTime.of(0, 0)), ZoneOffset.UTC);
    hotel.rating = 3.6;
    hotel.address = new Address();
    hotel.address.streetAddress = "677 5th Ave";
    hotel.address.city = "New York";
    hotel.address.stateProvince = "NY";
    hotel.address.postalCode = "10022";
    hotel.address.country = "USA";
    hotelList.add(hotel);
    
    // REDACTED FOR BREVITY

    var batch = new IndexDocumentsBatch<Hotel>();
    batch.addMergeOrUploadActions(hotelList);
    try
    {
        searchClient.indexDocuments(batch);
    }
    catch (Exception e)
    {
        e.printStackTrace();
        // If for some reason any documents are dropped during indexing, you can compensate by delaying and
        // retrying. This simple demo just logs failure and continues
        System.err.println("Failed to index some of the documents");
    }
}
```

The `uploadDocuments` method creates an [IndexDocumentsBatch](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models) and calls [indexDocuments](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) on a [SearchClient](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) to upload the documents. This quickstart creates `SearchClient` independently using [SearchClientBuilder](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclientbuilder), which requires configuring the endpoint and credentials separately.

```java
uploadDocuments(searchClient);
```

Because this console app runs all commands sequentially, the code adds a two-second wait time between indexing and queries.

```java
// Wait 2 seconds for indexing to complete before starting queries (for demo and console-app purposes only)
System.out.println("Waiting for indexing...\n");
try
{
    Thread.sleep(2000);
}
catch (InterruptedException e)
{
}
```

The two-second delay compensates for indexing, which is asynchronous, so that all documents can be indexed before the queries are executed. Coding in a delay is typically only necessary in demos, tests, and sample applications.

### Query the index

You can get query results as soon as the first document is indexed, but actual testing of your index should wait until all documents are indexed.

This section adds two pieces of functionality: query logic and results. For queries, use the [search](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) method. This method takes search text (the query string) and other [options](https://learn.microsoft.com/java/api/com.azure.search.documents.models.searchoptions).

The [SearchPagedIterable](https://learn.microsoft.com/java/api/com.azure.search.documents.models.searchpagediterable) class represents the results.

In `App.java`, the `WriteDocuments` method prints search results to the console.

```java
// Write search results to console
private static void WriteSearchResults(SearchPagedIterable searchResults)
{
    searchResults.iterator().forEachRemaining(result ->
    {
        Hotel hotel = result.getDocument(Hotel.class);
        System.out.println(hotel);
    });

    System.out.println();
}

// Write autocomplete results to console
private static void WriteAutocompleteResults(AutocompletePagedIterable autocompleteResults)
{
    autocompleteResults.iterator().forEachRemaining(result ->
    {
        String text = result.getText();
        System.out.println(text);
    });

    System.out.println();
}
```

#### Query example 1

The `RunQueries` method executes queries and returns results. Results are Hotel objects. This sample shows the method signature and the first query. This query demonstrates the `Select` parameter that lets you compose the result using selected fields from the document.

```java
// Run queries, use WriteDocuments to print output
private static void RunQueries(SearchClient searchClient)
{
    // Query 1
    System.out.println("Query #1: Search on empty term '*' to return all documents, showing a subset of fields...\n");

    SearchOptions options = new SearchOptions();
    options.setIncludeTotalCount(true);
    options.setFilter("");
    options.setOrderBy("");
    options.setSelect("HotelId", "HotelName", "Address/City");

    WriteSearchResults(searchClient.search("*", options, Context.NONE));
}
```

#### Query example 2

In the second query, search on a term, add a filter that selects documents where `Rating` is greater than 4, and then sort by `Rating` in descending order. A filter is a boolean expression evaluated over [isFilterable](https://learn.microsoft.com/java/api/com.azure.search.documents.indexes.models.searchfield) fields in an index. Filter queries either include or exclude values. As such, there's no relevance score associated with a filter query.

```java
// Query 2
System.out.println("Query #2: Search on 'hotels', filter on 'Rating gt 4', sort by Rating in descending order...\n");

options = new SearchOptions();
options.setFilter("Rating gt 4");
options.setOrderBy("Rating desc");
options.setSelect("HotelId", "HotelName", "Rating");

WriteSearchResults(searchClient.search("hotels", options, Context.NONE));
```

#### Query example 3

The third query demonstrates `searchFields`, used to scope a full-text search operation to specific fields.

```java
// Query 3
System.out.println("Query #3: Limit search to specific fields (pool in Tags field)...\n");

options = new SearchOptions();
options.setSearchFields("Tags");

options.setSelect("HotelId", "HotelName", "Tags");

WriteSearchResults(searchClient.search("pool", options, Context.NONE));
```

#### Query example 4

The fourth query demonstrates `facets`, which can be used to structure a faceted navigation structure.

```java
// Query 4
System.out.println("Query #4: Facet on 'Category'...\n");

options = new SearchOptions();
options.setFilter("");
options.setFacets("Category");
options.setSelect("HotelId", "HotelName", "Category");

WriteSearchResults(searchClient.search("*", options, Context.NONE));
```

#### Query example 5

In the fifth query, return a specific document. A document lookup is a typical response to an `OnClick` event in a result set.

```java
// Query 5
System.out.println("Query #5: Look up a specific document...\n");

Hotel lookupResponse = searchClient.getDocument("3", Hotel.class);
System.out.println(lookupResponse.hotelId);
System.out.println();
```

#### Query example 6

The last query shows the syntax for autocomplete, simulating a partial user input of *s* that resolves to two possible matches in the `sourceFields` associated with the suggester you defined in the index.

```java
// Query 6
System.out.println("Query #6: Call Autocomplete on HotelName that starts with 's'...\n");

WriteAutocompleteResults(searchClient.autocomplete("s", "sg"));
```

#### Summary of queries

The previous queries show multiple [ways of matching terms in a query](https://learn.microsoft.com/azure/search/search-query-overview#types-of-queries): full-text search, filters, and autocomplete.

The [SearchClient.search](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) method performs full-text search and filters. You can pass a search query in the `searchText` string, while you pass a filter expression in the [filter](https://learn.microsoft.com/java/api/com.azure.search.documents.models.searchoptions) property of the [SearchOptions](https://learn.microsoft.com/java/api/com.azure.search.documents.models.searchoptions) class. To filter without searching, just pass `"*"` for the `searchText` parameter of the [search](https://learn.microsoft.com/java/api/com.azure.search.documents.searchclient) method. To search without filtering, leave the `filter` property unset, or don't pass in a `SearchOptions` instance at all.





**Applies to: javascript**



In this quickstart, you use the [Azure AI Search client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-javascript-samples/tree/main/quickstart-keyword-search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-javascript-samples/quickstart-keyword-search
    ```

1. In `sample.env`, replace the placeholder value for `SEARCH_API_ENDPOINT` with the URL you obtained in [Get endpoint](#get-endpoint).

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

Run the application.

```bash
node index.js
```

### Output

The output should be similar to the following:

```
Running Azure AI Search JavaScript quickstart...
Checking if index exists...
Deleting index...
Creating index...
Index named hotels-quickstart-js has been created.
Uploading documents...
Index operations succeeded: true
Querying the index...

Query #1 - search everything:
{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Rating":4.8}
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Rating":3.6}
Result count: 4

Query #2 - search with filter, orderBy, and select:
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}

Query #3 - limit searchFields:
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}

Query #4 - limit searchFields and use facets:
{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Rating":4.8}
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Rating":3.6}

Query #5 - Lookup document:
HotelId: 3; HotelName: Gastronomic Landscape Hotel
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search client](#create-a-search-client)
1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search client

In `index.js`, you create two clients:

- [SearchIndexClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchindexclient) creates the index.
- [SearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchclient) loads and queries an existing index.

Both clients require the service endpoint and a credential for authentication. In this quickstart, you use [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) for keyless authentication with Microsoft Entra ID.

```javascript
const credential = new DefaultAzureCredential();
const indexClient = new SearchIndexClient(endpoint, credential);
```

### Create a search index

This quickstart builds a hotels index that you load with hotel data and execute queries against. In this step, you import an index definition from a JSON file and create the index on your search service.

The `hotels_quickstart_index.json` file defines the index schema, including the fields and their attributes. Each field is identified by a `name` and has a specified `type`. Each field also has a series of index attributes that specify whether Azure AI Search can search, filter, sort, and facet upon the field. Most of the fields are simple data types, but some, like `Address`, are complex types that allow you to create rich data structures in your index. You can read more about [supported data types](https://learn.microsoft.com/rest/api/searchservice/supported-data-types) and index attributes described in [Create Index (REST)](https://learn.microsoft.com/rest/api/searchservice/indexes/create).

The following code imports `hotels_quickstart_index.json` at the top of `index.js` so the main function can access the index definition.

```javascript
const indexDefinition = require('./hotels_quickstart_index.json');
```

This quickstart deletes the index if it already exists, which is a common practice for test/demo code. The following function tries to delete the index.

```javascript
async function deleteIndexIfExists(indexClient, indexName) {
    try {
        await indexClient.deleteIndex(indexName);
        console.log('Deleting index...');
    } catch {
        console.log('Index does not exist yet.');
    }
}
```

The following code extracts the index name from the index definition and passes the `indexName` along with the `indexClient` to the `deleteIndexIfExists()` function.

```javascript
const indexName = indexDefinition["name"];

console.log('Checking if index exists...');
await deleteIndexIfExists(indexClient, indexName);
```

After that, you create the index with the `createIndex()` method.

```javascript
console.log('Creating index...');
let index = await indexClient.createIndex(indexDefinition);

console.log(`Index named ${index.name} has been created.`);
```

### Upload documents to the index

In Azure AI Search, documents are data structures that are both inputs to indexing and outputs from queries. You can push such data to the index or use an [indexer](https://learn.microsoft.com/azure/search/search-indexer-overview). In this quickstart, you programmatically push the documents to the index.

Document inputs might be rows in a database, blobs in Azure Blob Storage, or JSON documents on disk, as in this quickstart. Similar to the `indexDefinition`, you import `hotels.json` at the top of `index.js` so that the data can be accessed in the main function.

```javascript
const hotelData = require('./hotels.json');
```

To index data into the search index, you create a [SearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchclient). While `SearchIndexClient` creates and manages an index, `SearchClient` uploads documents and queries the index.

This quickstart obtains `SearchClient` from `SearchIndexClient` using [getSearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchindexclient#@azure-search-documents-searchindexclient-getsearchclient), which reuses the same credentials.

```javascript
const searchClient = indexClient.getSearchClient(indexName);
```

The following code uploads the documents into the search index using the `mergeOrUploadDocuments()` method, which uploads the documents or merges them with an existing document if a document with the same key already exists.

```javascript
console.log('Uploading documents...');
let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(hotelData['value']);

console.log(`Index operations succeeded: ${JSON.stringify(indexDocumentsResult.results[0].succeeded)}`);
```

### Query the index

With an index created and documents uploaded, you're ready to send queries to the index. This section sends five different queries to the search index to demonstrate different pieces of query functionality available to you.

The queries are written in a `sendQueries()` function called in the main function as follows:

```javascript
await sendQueries(searchClient);
```

The `search()` method of `searchClient` sends queries. The first parameter is the search text and the second parameter specifies search options.

#### Query example 1

The first query searches `*`, which is equivalent to searching everything and selects three of the fields in the index. It's a best practice to only `select` the fields you need because pulling back unnecessary data can add latency to your queries.

The `searchOptions` for this query also has `includeTotalCount` set to `true`, which returns the number of matching results found.

```javascript
async function sendQueries(searchClient) {
    console.log('Query #1 - search everything:');
    let searchOptions = {
        includeTotalCount: true,
        select: ["HotelId", "HotelName", "Rating"]
    };

    let searchResults = await searchClient.search("*", searchOptions);
    for await (const result of searchResults.results) {
        console.log(`${JSON.stringify(result.document)}`);
    }
    console.log(`Result count: ${searchResults.count}`);

    // remaining queries go here
}
```

The remaining queries outlined below should also be added to the `sendQueries()` function. They're separated here for readability.

#### Query example 2

The next query specifies the search term `"wifi"` and includes a filter to only return results where the state is equal to `'FL'`. Results are also ordered by the Hotel's `Rating`. A filter is a boolean expression evaluated over filterable fields in an index. Filter queries either include or exclude values. As such, there's no relevance score associated with a filter query.

```javascript
console.log('Query #2 - Search with filter, orderBy, and select:');
let state = 'FL';
searchOptions = {
    filter: odata`Address/StateProvince eq ${state}`,
    orderBy: ["Rating desc"],
    select: ["HotelId", "HotelName", "Rating"]
};

searchResults = await searchClient.search("wifi", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 3

The third query limits the search to a single searchable field using the `searchFields` parameter. This approach is a great option to make your query more efficient if you know you're only interested in matches in certain fields.

```javascript
console.log('Query #3 - Limit searchFields:');
searchOptions = {
    select: ["HotelId", "HotelName", "Rating"],
    searchFields: ["HotelName"]
};

searchResults = await searchClient.search("sublime cliff", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 4

Another common option to include in a query is `facets`. Facets allow you to build out filters on your UI to make it easy for users to know what values they can filter down to. This query also limits the search to the `HotelName` field.

```javascript
console.log('Query #4 - limit searchFields and use facets:');
searchOptions = {
    facets: ["Category"],
    select: ["HotelId", "HotelName", "Rating"],
    searchFields: ["HotelName"]
};

searchResults = await searchClient.search("*", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 5

The final query uses the `getDocument()` method of the `searchClient`. This allows you to efficiently retrieve a document by its key.

```javascript
console.log('Query #5 - Lookup document:');
let documentResult = await searchClient.getDocument(key='3')
console.log(`HotelId: ${documentResult.HotelId}; HotelName: ${documentResult.HotelName}`)
```

#### Summary of queries

The previous queries show multiple ways of matching terms in a query: full-text search, filters, and document lookup.

The `searchClient.search` method performs full-text search and filters. You can pass a search query in the `searchText` string, while you pass a filter expression in the `filter` property of the `SearchOptions` class. To filter without searching, just pass `"*"` for the `searchText` parameter of the `search` method. To search without filtering, leave the `filter` property unset, or don't pass in a `SearchOptions` instance at all.




**Applies to: python**



In this quickstart, you use the [Azure AI Search client library for Python](https://learn.microsoft.com/python/api/overview/azure/search-documents-readme) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-python-samples/tree/main/Quickstart-Keyword-Search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-python-samples/Quickstart-Keyword-Search
    code .
    ```

1. Open `azure-search-quickstart.ipynb`.

1. Press **Ctrl+Shift+P**, select **Notebook: Select Notebook Kernel**, and follow the prompts to create a virtual environment.

   When complete, you should see a `.venv` folder in the project directory.

1. Run the first code cell to install the required packages.

1. In the second code cell, replace the placeholder value for `search_endpoint` with the URL you obtained in [Get endpoint](#get-endpoint), and run the cell.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

Run the remaining code cells sequentially to create an index, upload documents, and query the index.

### Output

Each code cell prints its output to the notebook. The following example is the output of the first query, an empty search that returns all documents in the index.

```
Total Documents Matching Query: 4
1.0
Gastronomic Landscape Hotel
['restaurant', 'bar', 'continental breakfast']
Description: The Gastronomic Hotel stands out for its culinary excellence under the management of William Dough, who advises on and oversees all of the Hotel’s restaurant services.
1.0
Old Century Hotel
['pool', 'free wifi', 'concierge']
Description: The hotel is situated in a nineteenth century plaza, which has been expanded and renovated to the highest architectural standards to create a modern, functional and first-class hotel in which art and unique historical elements coexist with the most modern comforts. The hotel also regularly hosts events like wine tastings, beer dinners, and live music.
1.0
Sublime Palace Hotel
['concierge', 'view', 'air conditioning']
Description: Sublime Palace Hotel is located in the heart of the historic center of Sublime in an extremely vibrant and lively area within short walking distance to the sites and landmarks of the city and is surrounded by the extraordinary beauty of churches, buildings, shops and monuments. Sublime Cliff is part of a lovingly restored 19th century resort, updated for every modern convenience.
1.0
Stay-Kay City Hotel
['view', 'air conditioning', 'concierge']
Description: This classic hotel is fully-refurbished and ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Times Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create the clients](#create-the-clients)
1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)
1. [Remove the index](#remove-the-index)

### Create the clients

The notebook creates two clients:

- [SearchIndexClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient) creates and manages indexes.
- [SearchClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.searchclient) loads documents and runs queries.

Both clients require the service endpoint and a credential. In this quickstart, you use [DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) for keyless authentication with Microsoft Entra ID.

### Create a search index

This quickstart builds a hotels index that you load with hotel data and run queries against. In this step, you define the fields in the index. Each field definition includes a name, data type, and attributes that determine how the field is used.

The notebook uses `SimpleField`, `SearchableField`, and `ComplexField` from the [models package](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.models) to define the schema. You can read more about [supported data types](https://learn.microsoft.com/rest/api/searchservice/supported-data-types) and index attributes described in [Create Index (REST)](https://learn.microsoft.com/rest/api/searchservice/indexes/create).

```python
# Create a search schema
index_client = SearchIndexClient(
    endpoint=search_endpoint, credential=credential)
fields = [
        SimpleField(name="HotelId", type=SearchFieldDataType.String, key=True),
        SearchableField(name="HotelName", type=SearchFieldDataType.String, sortable=True),
        SearchableField(name="Description", type=SearchFieldDataType.String, analyzer_name="en.lucene"),
        SearchableField(name="Category", type=SearchFieldDataType.String, facetable=True, filterable=True, sortable=True),

        SearchableField(name="Tags", collection=True, type=SearchFieldDataType.String, facetable=True, filterable=True),

        SimpleField(name="ParkingIncluded", type=SearchFieldDataType.Boolean, facetable=True, filterable=True, sortable=True),
        SimpleField(name="LastRenovationDate", type=SearchFieldDataType.DateTimeOffset, facetable=True, filterable=True, sortable=True),
        SimpleField(name="Rating", type=SearchFieldDataType.Double, facetable=True, filterable=True, sortable=True),

        ComplexField(name="Address", fields=[
            SearchableField(name="StreetAddress", type=SearchFieldDataType.String),
            SearchableField(name="City", type=SearchFieldDataType.String, facetable=True, filterable=True, sortable=True),
            SearchableField(name="StateProvince", type=SearchFieldDataType.String, facetable=True, filterable=True, sortable=True),
            SearchableField(name="PostalCode", type=SearchFieldDataType.String, facetable=True, filterable=True, sortable=True),
            SearchableField(name="Country", type=SearchFieldDataType.String, facetable=True, filterable=True, sortable=True),
        ])
    ]

scoring_profiles = []
suggester = [{'name': 'sg', 'source_fields': ['Tags', 'Address/City', 'Address/Country']}]

# Create the search index=
index = SearchIndex(name=index_name, fields=fields, suggesters=suggester, scoring_profiles=scoring_profiles)
result = index_client.create_or_update_index(index)
print(f' {result.name} created')
```

### Upload documents to the index

Azure AI Search searches over content stored in the service. In this step, you load JSON documents that conform to the hotel index you created.

In Azure AI Search, documents are data structures that are both inputs to indexing and outputs from queries. The notebook defines a documents payload as a list of dictionaries containing hotel data.

```python
# Create a documents payload
documents = [
    {
    "@search.action": "upload",
    "HotelId": "1",
    "HotelName": "Stay-Kay City Hotel",
    "Description": "This classic hotel is fully-refurbished and ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Times Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
    "Category": "Boutique",
    "Tags": [ "view", "air conditioning", "concierge" ],
    "ParkingIncluded": "false",
    "LastRenovationDate": "2020-01-18T00:00:00Z",
    "Rating": 3.60,
    "Address": {
        "StreetAddress": "677 5th Ave",
        "City": "New York",
        "StateProvince": "NY",
        "PostalCode": "10022",
        "Country": "USA"
        }
    },
    {
    "@search.action": "upload",
    "HotelId": "2",
    "HotelName": "Old Century Hotel",
    "Description": "The hotel is situated in a nineteenth century plaza, which has been expanded and renovated to the highest architectural standards to create a modern, functional and first-class hotel in which art and unique historical elements coexist with the most modern comforts. The hotel also regularly hosts events like wine tastings, beer dinners, and live music.",
    "Category": "Boutique",
    "Tags": [ "pool", "free wifi", "concierge" ],
    "ParkingIncluded": "false",
    "LastRenovationDate": "2019-02-18T00:00:00Z",
    "Rating": 3.60,
    "Address": {
        "StreetAddress": "140 University Town Center Dr",
        "City": "Sarasota",
        "StateProvince": "FL",
        "PostalCode": "34243",
        "Country": "USA"
        }
    },
    {
    "@search.action": "upload",
    "HotelId": "3",
    "HotelName": "Gastronomic Landscape Hotel",
    "Description": "The Gastronomic Hotel stands out for its culinary excellence under the management of William Dough, who advises on and oversees all of the Hotel’s restaurant services.",
    "Category": "Suite",
    "Tags": [ "restaurant", "bar", "continental breakfast" ],
    "ParkingIncluded": "true",
    "LastRenovationDate": "2015-09-20T00:00:00Z",
    "Rating": 4.80,
    "Address": {
        "StreetAddress": "3393 Peachtree Rd",
        "City": "Atlanta",
        "StateProvince": "GA",
        "PostalCode": "30326",
        "Country": "USA"
        }
    },
    {
    "@search.action": "upload",
    "HotelId": "4",
    "HotelName": "Sublime Palace Hotel",
    "Description": "Sublime Palace Hotel is located in the heart of the historic center of Sublime in an extremely vibrant and lively area within short walking distance to the sites and landmarks of the city and is surrounded by the extraordinary beauty of churches, buildings, shops and monuments. Sublime Cliff is part of a lovingly restored 19th century resort, updated for every modern convenience.",
    "Category": "Boutique",
    "Tags": [ "concierge", "view", "air conditioning" ],
    "ParkingIncluded": "true",
    "LastRenovationDate": "2020-02-06T00:00:00Z",
    "Rating": 4.60,
    "Address": {
        "StreetAddress": "7400 San Pedro Ave",
        "City": "San Antonio",
        "StateProvince": "TX",
        "PostalCode": "78216",
        "Country": "USA"
        }
    }
]
```

The `upload_documents` method adds documents to the index, creating them if they don't exist or updating them if they do.

```python
search_client = SearchClient(endpoint=search_endpoint,
                      index_name=index_name,
                      credential=credential)

try:
    result = search_client.upload_documents(documents=documents)
    print("Upload of new document succeeded: {}".format(result[0].succeeded))
except Exception as ex:
    print (ex.message)
```

### Query the index

You can get query results as soon as the first document is indexed, but actual testing of your index should wait until all documents are indexed.

Use the `search` method of [SearchClient](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.searchclient) to run queries.

The sample queries in the notebook demonstrate common patterns:

- **Empty search**: Executes an empty search (`search_text="*"`), returning an unranked list (search score = 1.0) of arbitrary documents. Because there are no criteria, all documents are included in results.

- **Term search**: Adds whole terms to the search expression (`search_text="wifi"`). This query specifies that results contain only those fields in the `select` parameter. Limiting the fields that come back minimizes the amount of data sent back over the wire and reduces search latency.

- **Filtered search**: Adds a filter expression, returning only those hotels with a rating greater than four, sorted in descending order.

- **Fielded search**: Adds `search_fields` to scope query execution to specific fields.

- **Faceted search**: Generates facets for positive matches found in search results. There are no zero matches. If search results don't include the term "wifi", then "wifi" doesn't appear in the faceted navigation structure.

- **Document lookup**: Returns a document based on its key. This operation is useful if you want to provide drillthrough when a user selects an item in a search result.

- **Autocomplete**: Provides potential matches as the user types into the search box. Autocomplete uses a suggester (`sg`) to know which fields contain potential matches to suggester requests. In this quickstart, those fields are `Tags`, `Address/City`, and `Address/Country`. To simulate autocomplete, pass in the letters "sa" as a partial string. The `autocomplete` method of `SearchClient` sends back potential term matches.

### Remove the index

If you're finished with this index, you can delete it by running the `Clean up` code cell. Deleting unnecessary indexes frees up space for stepping through more quickstarts and tutorials.

```python
try:
    result = index_client.delete_index(index_name)
    print ('Index', index_name, 'Deleted')
except Exception as ex:
    print (ex)
```



**Applies to: typescript**



In this quickstart, you use the [Azure AI Search client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/search-documents-readme) (compatible with TypeScript) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-javascript-samples/tree/main/quickstart-keyword-search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-javascript-samples/quickstart-keyword-search
    ```

1. In `sample.env`, replace the placeholder value for `SEARCH_API_ENDPOINT` with the URL you obtained in [Get endpoint](#get-endpoint).

1. Rename `sample.env` to `.env`.

    ```bash
    mv sample.env .env
    ```

1. Install the dependencies.

    ```bash
    npm install
    npm install typescript @types/node --save-dev
    npm pkg set type=module
    ```

    When the installation completes, you should see a `node_modules` folder in the project directory.

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

## Run the code

The sample code uses JavaScript by default. To run the code with TypeScript:

1. Create a file named `tsconfig.json`, and then paste the following code into it.

    ```json
    {
      "compilerOptions": {
        "module": "NodeNext",
        "target": "ES2022",
        "moduleResolution": "NodeNext",
        "skipLibCheck": true,
        "strict": true,
        "resolveJsonModule": true
      },
      "include": ["*.ts"],
      "exclude": ["node_modules"]
    }
    ```

1. Rename the `index.js` file to `index.ts`, and then replace the contents with the following code. This code converts the CommonJS syntax to ES module imports, which are required for TypeScript compilation.

    ```typescript
    // Import from the @azure/search-documents library
    import {
        SearchIndexClient,
        SearchClient,
        SearchFieldDataType,
        odata,
        SearchIndex
    } from "@azure/search-documents";
    
    // Import from the Azure Identity library
    import { DefaultAzureCredential } from "@azure/identity";
    
    // Importing the hotels sample data
    import hotelData from './hotels.json' with { type: "json" };
    
    // Load the .env file if it exists
    import "dotenv/config";
    
    // Defining the index definition
    const indexDefinition: SearchIndex = {
    	"name": "hotels-quickstart",
    	"fields": [
    		{
    			"name": "HotelId",
    			"type": "Edm.String" as SearchFieldDataType,
    			"key": true,
    			"filterable": true
    		},
    		{
    			"name": "HotelName",
    			"type": "Edm.String" as SearchFieldDataType,
    			"searchable": true,
    			"filterable": false,
    			"sortable": true,
    			"facetable": false
    		},
    		{
    			"name": "Description",
    			"type": "Edm.String" as SearchFieldDataType,
    			"searchable": true,
    			"filterable": false,
    			"sortable": false,
    			"facetable": false,
    			"analyzerName": "en.lucene"
    		},
    		{
    			"name": "Category",
    			"type": "Edm.String" as SearchFieldDataType,
    			"searchable": true,
    			"filterable": true,
    			"sortable": true,
    			"facetable": true
    		},
    		{
    			"name": "Tags",
    			"type": "Collection(Edm.String)",
    			"searchable": true,
    			"filterable": true,
    			"sortable": false,
    			"facetable": true
    		},
    		{
    			"name": "ParkingIncluded",
    			"type": "Edm.Boolean",
    			"filterable": true,
    			"sortable": true,
    			"facetable": true
    		},
    		{
    			"name": "LastRenovationDate",
    			"type": "Edm.DateTimeOffset",
    			"filterable": true,
    			"sortable": true,
    			"facetable": true
    		},
    		{
    			"name": "Rating",
    			"type": "Edm.Double",
    			"filterable": true,
    			"sortable": true,
    			"facetable": true
    		},
    		{
    			"name": "Address",
    			"type": "Edm.ComplexType",
    			"fields": [
    				{
    					"name": "StreetAddress",
    					"type": "Edm.String" as SearchFieldDataType,
    					"filterable": false,
    					"sortable": false,
    					"facetable": false,
    					"searchable": true
    				},
    				{
    					"name": "City",
    					"type": "Edm.String" as SearchFieldDataType,
    					"searchable": true,
    					"filterable": true,
    					"sortable": true,
    					"facetable": true
    				},
    				{
    					"name": "StateProvince",
    					"type": "Edm.String" as SearchFieldDataType,
    					"searchable": true,
    					"filterable": true,
    					"sortable": true,
    					"facetable": true
    				},
    				{
    					"name": "PostalCode",
    					"type": "Edm.String" as SearchFieldDataType,
    					"searchable": true,
    					"filterable": true,
    					"sortable": true,
    					"facetable": true
    				},
    				{
    					"name": "Country",
    					"type": "Edm.String" as SearchFieldDataType,
    					"searchable": true,
    					"filterable": true,
    					"sortable": true,
    					"facetable": true
    				}
    			]
    		}
    	],
    	"suggesters": [
    		{
    			"name": "sg",
    			"searchMode": "analyzingInfixMatching",
    			"sourceFields": [
    				"HotelName"
    			]
    		}
    	]
    };
    
    async function main() {
    
    	// Your search service endpoint (from .env file)
    	const searchServiceEndpoint = process.env.SEARCH_API_ENDPOINT || "";
    
    	// Use the recommended keyless credential instead of the AzureKeyCredential credential.
    	const credential = new DefaultAzureCredential();
    	//const credential = new AzureKeyCredential(Your search service admin key);
    
    	// Create a SearchIndexClient to send create/delete index commands
    	const searchIndexClient: SearchIndexClient = new SearchIndexClient(
    		searchServiceEndpoint,
    		credential
    	);
    
    	// Creating a search client to upload documents and issue queries
    	const indexName: string  = "hotels-quickstart";
        const searchClient: SearchClient<any> = searchIndexClient.getSearchClient(indexName);
    
        console.log('Checking if index exists...');
        await deleteIndexIfExists(searchIndexClient, indexName);
    
        console.log('Creating index...');
        let index: SearchIndex = await searchIndexClient.createIndex(indexDefinition);
        console.log(`Index named ${index.name} has been created.`);
    
        console.log('Uploading documents...');
        let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(hotelData['value']);
        console.log(`Index operations succeeded: ${JSON.stringify(indexDocumentsResult.results[0].succeeded)} `);
    
        // waiting one second for indexing to complete (for demo purposes only)
        await sleep(1000);
    
        console.log('Querying the index...');
        console.log();
        await sendQueries(searchClient);
    }
    
    async function deleteIndexIfExists(searchIndexClient: SearchIndexClient, indexName: string) {
        try {
            await searchIndexClient.deleteIndex(indexName);
            console.log('Deleting index...');
        } catch {
            console.log('Index does not exist yet.');
        }
    }
    
    async function sendQueries(searchClient: SearchClient<any>) {
        // Query 1
        console.log('Query #1 - search everything:');
        let searchOptions: any = {
            includeTotalCount: true,
            select: ["HotelId", "HotelName", "Rating"]
        };
    
        let searchResults = await searchClient.search("*", searchOptions);
        for await (const result of searchResults.results) {
            console.log(`${JSON.stringify(result.document)}`);
        }
        console.log(`Result count: ${searchResults.count}`);
        console.log();
    
    
        // Query 2
        console.log('Query #2 - search with filter, orderBy, and select:');
        let state = 'FL';
        searchOptions = {
            filter: odata`Address/StateProvince eq ${state}`,
            orderBy: ["Rating desc"],
            select: ["HotelId", "HotelName", "Rating"]
        };
    
        searchResults = await searchClient.search("wifi", searchOptions);
        for await (const result of searchResults.results) {
            console.log(`${JSON.stringify(result.document)}`);
        }
        console.log();
    
        // Query 3
        console.log('Query #3 - limit searchFields:');
        searchOptions = {
            select: ["HotelId", "HotelName", "Rating"],
            searchFields: ["HotelName"]
        };
    
        searchResults = await searchClient.search("sublime palace", searchOptions);
        for await (const result of searchResults.results) {
            console.log(`${JSON.stringify(result.document)}`);
        }
        console.log();
    
        // Query 4
        console.log('Query #4 - limit searchFields and use facets:');
        searchOptions = {
            facets: ["Category"],
            select: ["HotelId", "HotelName", "Rating"],
            searchFields: ["HotelName"]
        };
    
        searchResults = await searchClient.search("*", searchOptions);
        for await (const result of searchResults.results) {
            console.log(`${JSON.stringify(result.document)}`);
        }
        console.log();
    
        // Query 5
        console.log('Query #5 - Lookup document:');
        let documentResult = await searchClient.getDocument('3');
        console.log(`HotelId: ${documentResult.HotelId}; HotelName: ${documentResult.HotelName}`);
        console.log();
    }
    
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    main().catch((err) => {
        console.error("The sample encountered an error:", err);
    });
    ```

1. Transpile from TypeScript to JavaScript.

    ```bash
    npx tsc
    ```

1. Run the application.

    ```bash
    node index.js
    ```

### Output

The output should be similar to the following:

```
Checking if index exists...
Deleting index...
Creating index...
Index named hotels-quickstart has been created.
Uploading documents...
Index operations succeeded: true 
Querying the index...

Query #1 - search everything:
{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Rating":4.8}
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Rating":3.6}
Result count: 4

Query #2 - search with filter, orderBy, and select:
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}

Query #3 - limit searchFields:
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}

Query #4 - limit searchFields and use facets:
{"HotelId":"3","HotelName":"Gastronomic Landscape Hotel","Rating":4.8}
{"HotelId":"2","HotelName":"Old Century Hotel","Rating":3.6}
{"HotelId":"4","HotelName":"Sublime Palace Hotel","Rating":4.6}
{"HotelId":"1","HotelName":"Stay-Kay City Hotel","Rating":3.6}

Query #5 - Lookup document:
HotelId: 3; HotelName: Gastronomic Landscape Hotel
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search client](#create-a-search-client)
1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search client

In `index.ts`, you create two clients:

- [SearchIndexClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchindexclient) creates the index.
- [SearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchclient) loads and queries an existing index.

Both clients require the service endpoint and a credential for authentication. In this quickstart, you use [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) for keyless authentication with Microsoft Entra ID.

```typescript
const credential = new DefaultAzureCredential();
const searchIndexClient: SearchIndexClient = new SearchIndexClient(
    searchServiceEndpoint,
    credential
);
```

### Create a search index

This quickstart builds a hotels index that you load with hotel data and execute queries against. In this step, you define the fields in the index.

The `indexDefinition` object defines how Azure AI Search works with the documents you load in the next step. Each field is identified by a `name` and has a specified `type`. Each field also has a series of index attributes that specify whether Azure AI Search can search, filter, sort, and facet upon the field. Most of the fields are simple data types, but some, like `Address`, are complex types that allow you to create rich data structures in your index. You can read more about [supported data types](https://learn.microsoft.com/rest/api/searchservice/supported-data-types) and index attributes described in [Create Index (REST)](https://learn.microsoft.com/rest/api/searchservice/indexes/create).

```typescript
const indexDefinition: SearchIndex = {
    "name": "hotels-quickstart",
    "fields": [
        {
            "name": "HotelId",
            "type": "Edm.String" as SearchFieldDataType,
            "key": true,
            "filterable": true
        },
        {
            "name": "HotelName",
            "type": "Edm.String" as SearchFieldDataType,
            "searchable": true,
            "filterable": false,
            "sortable": true,
            "facetable": false
        },
        // REDACTED FOR BREVITY
    ],
    "suggesters": [
        {
            "name": "sg",
            "searchMode": "analyzingInfixMatching",
            "sourceFields": ["HotelName"]
        }
    ]
};
```

This quickstart deletes the index if it already exists, which is a common practice for test/demo code.

```typescript
async function deleteIndexIfExists(searchIndexClient: SearchIndexClient, indexName: string) {
    try {
        await searchIndexClient.deleteIndex(indexName);
        console.log('Deleting index...');
    } catch {
        console.log('Index does not exist yet.');
    }
}
```

After that, the index is created with the `createIndex()` method.

```typescript
let index: SearchIndex = await searchIndexClient.createIndex(indexDefinition);
```

### Upload documents to the index

In Azure AI Search, documents are data structures that are both inputs to indexing and outputs from queries. You can push such data to the index or use an [indexer](https://learn.microsoft.com/azure/search/search-indexer-overview). In this quickstart, you programmatically push the documents to the index.

Document inputs might be rows in a database, blobs in Azure Blob Storage, or JSON documents on disk, as in this quickstart. The hotel data is imported at the top of the file.

```typescript
import hotelData from './hotels.json' with { type: "json" };
```

To index data into the search index, you create a [SearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchclient). While `SearchIndexClient` creates and manages an index, `SearchClient` uploads documents and queries the index.

This quickstart obtains `SearchClient` from `SearchIndexClient` using [getSearchClient](https://learn.microsoft.com/javascript/api/@azure/search-documents/searchindexclient#@azure-search-documents-searchindexclient-getsearchclient), which reuses the same credentials.

```typescript
const searchClient: SearchClient<any> = searchIndexClient.getSearchClient(indexName);
```

The `mergeOrUploadDocuments()` method uploads the documents or merges them with an existing document if a document with the same key already exists.

```typescript
let indexDocumentsResult = await searchClient.mergeOrUploadDocuments(hotelData['value']);
```

### Query the index

With an index created and documents uploaded, you're ready to send queries to the index. This section sends five different queries to the search index to demonstrate different pieces of query functionality available to you.

The queries are written in a `sendQueries()` function that is called in the main function.

```typescript
await sendQueries(searchClient);
```

Queries are sent using the `search()` method of `searchClient`. The first parameter is the search text and the second parameter specifies search options.

#### Query example 1

The first query searches `*`, which is equivalent to searching everything, and selects three of the fields in the index. It's a best practice to only `select` the fields you need because pulling back unnecessary data can add latency to your queries.

The `searchOptions` for this query also has `includeTotalCount` set to `true`, which returns the number of matching results found.

```typescript
console.log('Query #1 - search everything:');
let searchOptions: any = {
    includeTotalCount: true,
    select: ["HotelId", "HotelName", "Rating"]
};

let searchResults = await searchClient.search("*", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
console.log(`Result count: ${searchResults.count}`);
```

#### Query example 2

In the next query, the search term `"wifi"` is specified with a filter to only return results where the state is equal to `'FL'`. Results are also ordered by the Hotel's `Rating`.

```typescript
console.log('Query #2 - search with filter, orderBy, and select:');
let state = 'FL';
searchOptions = {
    filter: odata`Address/StateProvince eq ${state}`,
    orderBy: ["Rating desc"],
    select: ["HotelId", "HotelName", "Rating"]
};

searchResults = await searchClient.search("wifi", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 3

The search is limited to a single searchable field using the `searchFields` parameter. This approach is a great option to make your query more efficient if you know you're only interested in matches in certain fields.

```typescript
console.log('Query #3 - limit searchFields:');
searchOptions = {
    select: ["HotelId", "HotelName", "Rating"],
    searchFields: ["HotelName"]
};

searchResults = await searchClient.search("sublime palace", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 4

Another common option to include in a query is `facets`. Facets allow you to provide self-directed drilldown from the results in your UI. The facets results can be turned into checkboxes in the result pane.

```typescript
console.log('Query #4 - limit searchFields and use facets:');
searchOptions = {
    facets: ["Category"],
    select: ["HotelId", "HotelName", "Rating"],
    searchFields: ["HotelName"]
};

searchResults = await searchClient.search("*", searchOptions);
for await (const result of searchResults.results) {
    console.log(`${JSON.stringify(result.document)}`);
}
```

#### Query example 5

The final query uses the `getDocument()` method of the `searchClient`. This allows you to efficiently retrieve a document by its key.

```typescript
console.log('Query #5 - Lookup document:');
let documentResult = await searchClient.getDocument('3');
console.log(`HotelId: ${documentResult.HotelId}; HotelName: ${documentResult.HotelName}`);
```

#### Summary of queries

The previous queries show multiple ways of matching terms in a query: full-text search, filters, and document lookup.

The `searchClient.search` method performs full-text search and filters. You can pass a search query in the `searchText` string, while you pass a filter expression in the `filter` property of the `SearchOptions` class. To filter without searching, just pass `"*"` for the `searchText` parameter of the `search` method. To search without filtering, leave the `filter` property unset, or don't pass in a `SearchOptions` instance at all.




**Applies to: rest**



In this quickstart, you use the [Azure AI Search REST APIs](https://learn.microsoft.com/rest/api/searchservice) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-rest-samples/tree/main/Quickstart-keyword-search) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

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
    cd azure-search-rest-samples/Quickstart-keyword-search
    code .
    ```

1. In `az-search-quickstart.rest`, replace the placeholder value for `@baseUrl` with the URL you obtained in [Get endpoint](#get-endpoint).

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

1. Send the remaining requests sequentially to create an index, upload documents, and query the index.

### Output

Each request returns different JSON based on the operation. The key output is from `### Run a query`, which should look similar to the following:

```json
{
  "value": [
    {
      "@search.score": 0.5575875,
      "HotelId": "3",
      "HotelName": "Gastronomic Landscape Hotel",
      "Description": "The Gastronomic Hotel stands out for its culinary excellence under the management of William Dough, who advises on and oversees all of the Hotel's restaurant services.",
      "Tags": [
        "restaurant",
        "bar",
        "continental breakfast"
      ]
    }
  ]
}
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured. An index is conceptually similar to a table in a relational database, but it's specifically designed for search operations, such as full-text search.

This quickstart calls [Indexes - Create (REST API)](https://learn.microsoft.com/rest/api/searchservice/indexes/create) to build a search index named `hotels-quickstart` and its physical data structures on your search service.

Within the index schema, the `fields` collection defines the structure of hotel documents. Each field has a `name`, data `type`, and attributes that determine its behavior during indexing and queries. The `HotelId` field is marked as the key, which Azure AI Search requires to uniquely identify each document in an index.

```http
### Create a new index
POST {{baseUrl}}/indexes?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "name": "hotels-quickstart",  
    "fields": [
        {"name": "HotelId", "type": "Edm.String", "key": true, "filterable": true},
        {"name": "HotelName", "type": "Edm.String", "searchable": true, "filterable": false, "sortable": true, "facetable": false},
        {"name": "Description", "type": "Edm.String", "searchable": true, "filterable": false, "sortable": false, "facetable": false, "analyzer": "en.lucene"},
        {"name": "Category", "type": "Edm.String", "searchable": true, "filterable": true, "sortable": true, "facetable": true},
        {"name": "Tags", "type": "Collection(Edm.String)", "searchable": true, "filterable": true, "sortable": false, "facetable": true},
        {"name": "ParkingIncluded", "type": "Edm.Boolean", "filterable": true, "sortable": true, "facetable": true},
        {"name": "LastRenovationDate", "type": "Edm.DateTimeOffset", "filterable": true, "sortable": true, "facetable": true},
        {"name": "Rating", "type": "Edm.Double", "filterable": true, "sortable": true, "facetable": true},
        {"name": "Address", "type": "Edm.ComplexType", 
            "fields": [
            {"name": "StreetAddress", "type": "Edm.String", "filterable": false, "sortable": false, "facetable": false, "searchable": true},
            {"name": "City", "type": "Edm.String", "searchable": true, "filterable": true, "sortable": true, "facetable": true},
            {"name": "StateProvince", "type": "Edm.String", "searchable": true, "filterable": true, "sortable": true, "facetable": true},
            {"name": "PostalCode", "type": "Edm.String", "searchable": true, "filterable": true, "sortable": true, "facetable": true},
            {"name": "Country", "type": "Edm.String", "searchable": true, "filterable": true, "sortable": true, "facetable": true}
            ]
        }
    ]
}
```

Key points about the index schema:

- Use string fields (`Edm.String`) to make numeric data full-text searchable. Other [supported data types](https://learn.microsoft.com/rest/api/searchservice/supported-data-types), such as `Edm.Int32`, are filterable, sortable, facetable, and retrievable but aren't searchable.

- Most of the fields are simple data types, but you can define complex types to represent nested data, such as the `Address` field.

- Field attributes determine allowed actions. The REST APIs allow [many actions by default](https://learn.microsoft.com/rest/api/searchservice/indexes/create#request-body). For example, all strings are searchable and retrievable. With the REST APIs, you might only use attributes if you need to disable a behavior.

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents as inline JSON. In production scenarios, however, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

This quickstart calls [Documents - Index (REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/index) to add four sample hotel documents to your index. Compared to the previous request, the URI is extended to include the `docs` collection and `index` operation.

Each document in the `value` array represents a hotel and contains fields that match the index schema. The `@search.action` parameter specifies the operation to perform for each document. This example uses `upload`, which adds the document if it doesn't exist or updates the document if it does exist.

```http
### Upload documents
POST {{baseUrl}}/indexes/hotels-quickstart/docs/index?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "value": [
        {
            "@search.action": "upload",
            "HotelId": "1",
            "HotelName": "Stay-Kay City Hotel",
            "Description": "This classic hotel is fully-refurbished and ideally located on the main commercial artery of the city in the heart of New York. A few minutes away is Times Square and the historic centre of the city, as well as other places of interest that make New York one of America's most attractive and cosmopolitan cities.",
            "Category": "Boutique",
            "Tags": [ "view", "air conditioning", "concierge" ],
            "ParkingIncluded": false,
            "LastRenovationDate": "2022-01-18T00:00:00Z",
            "Rating": 3.60,
            "Address": 
            {
                "StreetAddress": "677 5th Ave",
                "City": "New York",
                "StateProvince": "NY",
                "PostalCode": "10022",
                "Country": "USA"
            } 
        },
        {
            "@search.action": "upload",
            "HotelId": "2",
            "HotelName": "Old Century Hotel",
            "Description": "The hotel is situated in a nineteenth century plaza, which has been expanded and renovated to the highest architectural standards to create a modern, functional and first-class hotel in which art and unique historical elements coexist with the most modern comforts. The hotel also regularly hosts events like wine tastings, beer dinners, and live music.",
            "Category": "Boutique",
            "Tags": [ "pool", "free wifi", "concierge" ],
            "ParkingIncluded": false,
            "LastRenovationDate": "2019-02-18T00:00:00Z",
            "Rating": 3.60,
            "Address": 
            {
                "StreetAddress": "140 University Town Center Dr",
                "City": "Sarasota",
                "StateProvince": "FL",
                "PostalCode": "34243",
                "Country": "USA"
            } 
        },
        {
            "@search.action": "upload",
            "HotelId": "3",
            "HotelName": "Gastronomic Landscape Hotel",
            "Description": "The Gastronomic Hotel stands out for its culinary excellence under the management of William Dough, who advises on and oversees all of the Hotel’s restaurant services.",
            "Category": "Suite",
            "Tags": [ "restaurant", "bar", "continental breakfast" ],
            "ParkingIncluded": true,
            "LastRenovationDate": "2015-09-20T00:00:00Z",
            "Rating": 4.80,
            "Address": 
            {
                "StreetAddress": "3393 Peachtree Rd",
                "City": "Atlanta",
                "StateProvince": "GA",
                "PostalCode": "30326",
                "Country": "USA"
            } 
        },
        {
            "@search.action": "upload",
            "HotelId": "4",
            "HotelName": "Sublime Palace Hotel",
            "Description": "Sublime Palace Hotel is located in the heart of the historic center of Sublime in an extremely vibrant and lively area within short walking distance to the sites and landmarks of the city and is surrounded by the extraordinary beauty of churches, buildings, shops and monuments. Sublime Cliff is part of a lovingly restored 19th century resort, updated for every modern convenience.",
            "Tags": [ "concierge", "view", "air conditioning" ],
            "ParkingIncluded": true,
            "LastRenovationDate": "2020-02-06T00:00:00Z",
            "Rating": 4.60,
            "Address": 
            {
                "StreetAddress": "7400 San Pedro Ave",
                "City": "San Antonio",
                "StateProvince": "TX",
                "PostalCode": "78216",
                "Country": "USA"
            }
        }
    ]
}
```

### Query the index

Now that documents are loaded into your index, you can use full-text search to find specific terms or phrases within their fields.

This quickstart calls [Documents - Search Post (REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/search-post) to find hotel documents that match your search criteria. The URI now targets the `/docs/search` operation.

Full-text search requests always include a `search` parameter that contains the query text. The query text can include one or more terms, phrases, or operators. In addition to `search`, you can specify other parameters to refine the search behavior and results.

The query searches for the terms "attached restaurant" in the `Description` and `Tags` fields of each hotel document. The `select` parameter limits the fields returned in the response to `HotelId`, `HotelName`, `Tags`, and `Description`. The `count` parameter requests the total number of matching documents.

```http
### Run a query
POST {{baseUrl}}/indexes/hotels-quickstart/docs/search?api-version={{api-version}}  HTTP/1.1
Content-Type: application/json
Authorization: Bearer {{token}}

{
    "search": "attached restaurant",
    "select": "HotelId, HotelName, Tags, Description",
    "searchFields": "Description, Tags",
    "count": true
}
```



**Applies to: powershell**



In this quickstart, you use PowerShell and the [Azure AI Search REST APIs](https://learn.microsoft.com/rest/api/searchservice/) to create, load, and query a search index for [full-text search](search-lucene-query-architecture.md), also known as keyword search.

Full-text search uses Apache Lucene for indexing and queries and the BM25 ranking algorithm for scoring results. This quickstart uses fictional hotel data from the [azure-search-sample-data](https://github.com/Azure-Samples/azure-search-sample-data/tree/main/hotels/hotel-json-documents) GitHub repository to populate the index.

> **Tip:**
> Want to get started right away? Download the [source code](https://github.com/Azure-Samples/azure-search-powershell-samples/tree/main/Quickstart) on GitHub.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

- An [Azure AI Search service](search-create-service-portal.md). You can use a free service for this quickstart.

- [PowerShell 7](https://github.com/PowerShell/PowerShell) or later.

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

    ```powershell
    git clone https://github.com/Azure-Samples/azure-search-powershell-samples
    ```

1. Navigate to the quickstart folder.

    ```powershell
    cd azure-search-powershell-samples/Quickstart
    ```

1. For keyless authentication with Microsoft Entra ID, sign in to your Azure account. If you have multiple subscriptions, select the one that contains your Azure AI Search service.

   ```azurecli
   az login
   ```

1. In `azure-search-quickstart.ps1`, replace the placeholder value for `$baseUrl` with the URL you obtained in [Get endpoint](#get-endpoint).

## Run the code

In the same terminal, run the following PowerShell script to execute this quickstart.

```powershell
.\azure-search-quickstart.ps1
```

### Output

The script deletes any existing index, creates a new index, uploads documents, and runs multiple full-text search queries. The output shows the full HTTP requests and responses for each operation. The following example shows the response when searching for "restaurant wifi".

```json
{
  "value": [
    {
      "@search.score": 0.6931472,
      "HotelName": "Old Century Hotel",
      "Description": "The hotel is situated in a nineteenth century plaza, which has been expanded and renovated to the highest architectural standards to create a modern, functional and first-class hotel in which art and unique historical elements coexist with the most modern comforts. The hotel also regularly hosts events like wine tastings, beer dinners, and live music.",
      "Tags": ["pool", "free wifi", "concierge"]
    },
    {
      "@search.score": 0.5575875,
      "HotelName": "Gastronomic Landscape Hotel",
      "Description": "The Gastronomic Hotel stands out for its culinary excellence under the management of William Dough, who advises on and oversees all of the Hotel's restaurant services.",
      "Tags": ["restaurant", "bar", "continental breakfast"]
    }
  ]
}
```

## Understand the code


> **Note:**
> The code snippets in this section might have been modified for readability. For a complete working example, see the source code.

Now that you've run the code, let's break down the key steps:

1. [Create a search index](#create-a-search-index)
1. [Upload documents to the index](#upload-documents-to-the-index)
1. [Query the index](#query-the-index)

### Create a search index

Before you add content to Azure AI Search, you must create an index to define how the content is stored and structured. An index is conceptually similar to a table in a relational database, but it's specifically designed for search operations, such as full-text search.

This quickstart first deletes any existing index with the same name, which is a common practice for test/demo code that runs repeatedly.

```powershell
Send-Request DELETE "$baseUrl/indexes/hotels-quickstart?api-version=2026-04-01" $headers
```

This quickstart then calls [Indexes - Create (REST API)](https://learn.microsoft.com/rest/api/searchservice/indexes/create) to build a search index named `hotels-quickstart` and its physical data structures on your search service.

```powershell
$body = @"
{
    "name": "hotels-quickstart",
    "fields": [
        {"name": "HotelId", "type": "Edm.String", "key": true, "filterable": true},
        {"name": "HotelName", "type": "Edm.String", "searchable": true, "filterable": false, "sortable": true, "facetable": false},
        {"name": "Description", "type": "Edm.String", "searchable": true, "filterable": false, "sortable": false, "facetable": false, "analyzer": "en.lucene"},
        ...
    ]
}
"@

Send-RequestWithBody POST "$baseUrl/indexes?api-version=2026-04-01" $headers $body
```

Within the index schema, the `fields` collection defines the structure of hotel documents. Each field has a `name`, data `type`, and attributes that determine its behavior during indexing and queries. The `HotelId` field is marked as the key, which Azure AI Search requires to uniquely identify each document in an index.

Key points about the index schema:

- Use string fields (`Edm.String`) to make numeric data full-text searchable. Other [supported data types](https://learn.microsoft.com/rest/api/searchservice/supported-data-types), such as `Edm.Int32`, are filterable, sortable, facetable, and retrievable but aren't searchable.

- Most of the fields are simple data types, but you can define complex types to represent nested data, such as the `Address` field.

- Field attributes determine allowed actions. The REST APIs allow [many actions by default](https://learn.microsoft.com/rest/api/searchservice/indexes/create#request-body). For example, all strings are searchable and retrievable. With the REST APIs, you might only use attributes if you need to disable a behavior.

### Upload documents to the index

Newly created indexes are empty. To populate an index and make it searchable, you must upload JSON documents that conform to the index schema.

In Azure AI Search, documents serve as both inputs for indexing and outputs for queries. For simplicity, this quickstart provides sample hotel documents as inline JSON. In production scenarios, however, content is often pulled from connected data sources and transformed into JSON using [indexers](search-indexer-overview.md).

This quickstart calls [Documents - Index (REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/) to add four sample hotel documents to your index. Compared to the previous request, the URI is extended to include the `docs` collection and `index` operation.

```powershell
$body = @"
{
    "value": [
        {
            "@search.action": "upload",
            "HotelId": "1",
            "HotelName": "Stay-Kay City Hotel",
            "Description": "This classic hotel is...",
            ...
        },
        ...
    ]
}
"@

Send-RequestWithBody POST "$baseUrl/indexes/hotels-quickstart/docs/index?api-version=2026-04-01" $headers $body
```

Each document in the `value` array represents a hotel and contains fields that match the index schema. The `@search.action` parameter specifies the operation to perform for each document. This example uses `upload`, which adds the document if it doesn't exist or updates the document if it does exist.

### Query the index

Now that documents are loaded into your index, you can use full-text search to find specific terms or phrases within their fields.

This quickstart calls [Documents - Search Post (REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/search-post) to find hotel documents that match your search criteria. The URI targets the `/docs/search` operation.

Full-text search requests include a `search` parameter with the query text, which can contain terms, phrases, or operators. The query searches across all searchable fields in each document. The following examples demonstrate common query patterns.

#### Query example 1

The following query searches for the terms "restaurant wifi" across all searchable fields. By default, Azure AI Search returns documents that match any of the search terms.

```powershell
$body = @"
{
    "search": "restaurant wifi",
    "select": "HotelName, Description, Tags"
}
"@

Send-RequestWithBody POST "$baseUrl/indexes/hotels-quickstart/docs/search?api-version=2026-04-01" $headers $body
```

The `select` parameter limits the fields returned in the response to `HotelName`, `Description`, and `Tags`.

#### Query example 2

The following query uses a `filter` expression to return only hotels with a rating greater than 4.

```powershell
$body = @"
{
    "search": "*",
    "filter": "Rating gt 4",
    "select": "HotelName,Rating"
}
"@

Send-RequestWithBody POST "$baseUrl/indexes/hotels-quickstart/docs/search?api-version=2026-04-01" $headers $body
```

The `search` parameter is set to `*`, which matches all documents. The `filter` parameter applies a boolean condition to narrow the results.

#### Query example 3

The following query searches for "boutique" and uses `top` to return only the first two results.

```powershell
$body = @"
{
    "search": "boutique",
    "select": "HotelName,Category",
    "top": 2
}
"@

Send-RequestWithBody POST "$baseUrl/indexes/hotels-quickstart/docs/search?api-version=2026-04-01" $headers $body
```

#### Query example 4

The following query searches for "pool" and uses `orderby` to sort results by `Rating` in descending order.

```powershell
$body = @"
{
    "search": "pool",
    "select": "HotelName,Description,Tags,Rating",
    "orderby": "Rating desc"
}
"@

Send-RequestWithBody POST "$baseUrl/indexes/hotels-quickstart/docs/search?api-version=2026-04-01" $headers $body
```




## Clean up resources


When you work in your own subscription, it's a good idea to finish a project by removing the resources you no longer need. Resources that are left running can cost you money.

In the Azure portal, select **All resources** or **Resource groups** from the left pane to find and manage resources. You can delete resources individually or delete the resource group to remove all resources at once.

If you're using a free search service, remember that you're limited to three indexes, indexers, and data sources. You can [delete individual items](search-how-to-manage-index.md) in the portal to stay under the limit.


## Related content

+ [Full-text search in Azure AI Search](search-lucene-query-architecture.md)
+ [Examples of simple search queries](search-query-simple-examples.md)
+ [Examples of full Lucene search syntax](search-query-lucene-examples.md)
