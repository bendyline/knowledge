---
title: Page Through Azure AI Search List Results
description: Learn how to page through Azure AI Search list operations using cursor pagination and service-provided continuation URLs.
ms.service: azure-ai-search
ms.topic: how-to
ms.date: 08/17/2026
ms.custom:
  - doc-kit-assisted
  - dev-focus
ai-usage: ai-assisted
zone_pivot_groups: search-csharp-python-rest
---

# Page through Azure AI Search list results (preview)


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).



> **Important:**
> Features, capabilities, or properties marked (preview) aren't covered by a service-level agreement, aren't recommended for production workloads, and might change or be constrained before they become generally available. The [Azure AI Search preview terms](https://learn.microsoft.com/azure/search/search-preview-terms) apply to all preview functionality, whether it's standalone or part of a generally available feature.


Starting with the `2026-08-01-preview` REST API, use cursor pagination (preview) to enumerate supported service resources one page at a time. The service returns an opaque continuation URL when more results are available.

This article explains the cursor contract and demonstrates how to page through existing indexes.

## Prerequisites

+ An [Azure AI Search service](search-create-service-portal.md) that contains resources for one of the supported list operations.

+ Permission to list service resources. Configure [keyless authentication](search-get-started-rbac.md) with the **Search Service Contributor** role assigned to your user account (recommended) or use an [admin API key](search-security-api-keys.md).

**Applies to: csharp**


+ The latest [`Azure.Search.Documents`](https://www.nuget.org/packages/Azure.Search.Documents) preview package: `dotnet add package Azure.Search.Documents --prerelease`

+ For keyless authentication, the [`Azure.Identity`](https://www.nuget.org/packages/Azure.Identity) package: `dotnet add package Azure.Identity`

  > **Note:**
  > The client library must support the `2026-08-01-preview` version of the Search Service REST API. Earlier versions don't expose the cursor parameters shown in this article.



**Applies to: python**


+ The latest [`azure-search-documents`](https://pypi.org/project/azure-search-documents/#history) preview package: `pip install --pre azure-search-documents`

+ For keyless authentication, the [`azure-identity`](https://pypi.org/project/azure-identity/) package: `pip install azure-identity`

  > **Note:**
  > The client library must support the `2026-08-01-preview` version of the Search Service REST API. Earlier versions don't expose the cursor parameters shown in this article.



**Applies to: rest**


+ The [2026-08-01-preview](https://learn.microsoft.com/rest/api/searchservice/operation-groups?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) version of the Search Service REST API.

+ For keyless authentication, include a [Microsoft Entra ID token](search-get-started-rbac.md?pivots=rest#get-token) in the `Authorization` header of each HTTP request.



## Choose a list operation

The `2026-08-01-preview` cursor contract applies to the following list operations:

| Operation | Resource path |
| --- | --- |
| List Aliases | `/aliases` |
| [List Data Sources](https://learn.microsoft.com/rest/api/searchservice/data-sources/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) | `/datasources` |
| [List Indexers](https://learn.microsoft.com/rest/api/searchservice/indexers/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) | `/indexers` |
| [List Indexes](https://learn.microsoft.com/rest/api/searchservice/indexes/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) | `/indexes` |
| List Index Statistics | `/indexstats` |
| List Knowledge Bases | `/knowledgebases` |
| List Knowledge Sources | `/knowledgesources` |
| List Knowledge Source Files | `/knowledgesources('{knowledge-source-name}')/files` |
| [List Skillsets](https://learn.microsoft.com/rest/api/searchservice/skillsets/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true) | `/skillsets` |
| List Synonym Maps | `/synonymmaps` |

## Request and follow pages

**Applies to: csharp**


The following example lists indexes whose names start with `hotels` and requests up to 50 indexes per page. Iterating the `AsyncPageable<SearchIndex>` result automatically requests each subsequent page.

```csharp
using System;
using Azure;
using Azure.Identity;
using Azure.Search.Documents;
using Azure.Search.Documents.Indexes;
using Azure.Search.Documents.Indexes.Models;
using Azure.Search.Documents.Models;

string endpoint = Environment.GetEnvironmentVariable(
    "AZURE_SEARCH_ENDPOINT")!;

var options = new SearchClientOptions(
    SearchClientOptions.ServiceVersion.V2026_08_01_Preview);
var client = new SearchIndexClient(
    new Uri(endpoint),
    new AzureCliCredential(),
    options);

AsyncPageable<SearchIndex> indexes = client.GetIndexesAsync(
    search: "hotels",
    pageSize: 50,
    searchType: ListingSearchType.Prefix);

await foreach (SearchIndex index in indexes)
{
    Console.WriteLine(index.Name);
}
```

**Reference:** [SearchIndexClient.GetIndexesAsync](https://learn.microsoft.com/dotnet/api/azure.search.documents.indexes.searchindexclient.getindexesasync?view=azure-dotnet-preview\&preserve-view=true)



**Applies to: python**


The following example lists indexes whose names start with `hotels` and requests up to 50 indexes per page. Iterating the `ItemPaged` result automatically requests each subsequent page.

```python
import os

from azure.identity import AzureCliCredential
from azure.search.documents.indexes import SearchIndexClient

endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")

with SearchIndexClient(
    endpoint,
    AzureCliCredential(),
    api_version="2026-08-01-preview",
) as client:
    indexes = client.list_indexes(
        select=["name"],
        search="hotels",
        page_size=50,
        search_type="prefix",
    )
    for index in indexes:
        print(index.name)
```

**Reference:** [SearchIndexClient.list_indexes](https://learn.microsoft.com/python/api/azure-search-documents/azure.search.documents.indexes.searchindexclient?view=azure-python-preview\&preserve-view=true#azure-search-documents-indexes-searchindexclient-list-indexes)



**Applies to: rest**


Send an initial request to list indexes whose names start with `hotels`. The request returns up to 50 index names:

```http
GET https://<search-service-name>.search.windows.net/indexes?api-version=2026-08-01-preview&search=hotels&searchType=prefix&pageSize=50&$select=name
Authorization: Bearer <access-token>
Accept: application/json
```

**Reference:** [List Indexes](https://learn.microsoft.com/rest/api/searchservice/indexes/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)

When more than 50 matching indexes exist, the response includes `@odata.nextLink`, which contains the complete continuation URL and an opaque token. The following response is abbreviated:

```json
{
  "value": [
    {
      "name": "<index-name>"
    }
  ],
  "@odata.nextLink": "https://<search-service-name>.search.windows.net/indexes?api-version=2026-08-01-preview&searchType=prefix&%24select=name&%24skiptoken=<opaque-token>"
}
```

To request the next page, send a GET request to the complete `@odata.nextLink` value exactly as returned. Keep the same authentication header:

```http
GET <complete-@odata.nextLink-value>
Authorization: Bearer <access-token>
Accept: application/json
```

**Reference:** [List Indexes](https://learn.microsoft.com/rest/api/searchservice/indexes/list?view=rest-searchservice-2026-08-01-preview\&preserve-view=true)

The terminal response contains the final index names and omits `@odata.nextLink`, indicating that no more pages are available. Result order isn't part of the cursor contract:

```json
{
  "value": [
    {
      "name": "<next-index-name>"
    }
  ]
}
```



## Handle cursor behavior

+ **Detect the final page:** Continue paging only while the response contains `@odata.nextLink`. The terminal page omits this property, and responses don't include `@odata.count`.

+ **Preserve continuation state:** Use the complete `@odata.nextLink` exactly as returned. Don't construct, modify, decode, or reuse its `$skiptoken`. The token supports forward paging only.

+ **Change request parameters:** Start a new initial request to change the resource path, API version, search prefix, selected properties, or page size. Combining `$skiptoken` with `search` or `pageSize` returns HTTP 400.

+ **Account for collection changes:** Forward paging is stable only while the collection remains unchanged. Adding, updating, or deleting resources during enumeration can produce duplicate or omitted results.

## Related content

+ [Manage Azure AI Search using REST APIs](search-manage-rest.md)
+ [Manage an index in Azure AI Search](search-how-to-manage-index.md)
