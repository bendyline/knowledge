---
title: OData Select Reference
description: Syntax and language reference for explicit selection of fields to return in the search results of Azure AI Search queries.
ms.service: azure-ai-search
ms.custom:
  - ignite-2023
ms.topic: concept-article
ms.date: 02/19/2026
ms.update-cycle: 365-days
---

# OData $select syntax in Azure AI Search


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


In Azure AI Search, the **$select** parameter specifies which fields to include in search results. This article describes the OData syntax of **$select** and provides examples.

Field path construction and constants are described in the [OData language overview in Azure AI Search](query-odata-filter-orderby-syntax.md). For more information about search result composition, see [How to work with search results in Azure AI Search](search-pagination-page-layout.md).

## Syntax

The **$select** parameter determines which fields for each document are returned in the query result set. The following EBNF ([Extended Backus-Naur Form](https://en.wikipedia.org/wiki/Extended_Backus–Naur_form)) defines the grammar for the **$select** parameter:

<!-- Upload this EBNF using https://bottlecaps.de/rr/ui to create a downloadable railroad diagram. -->

```
select_expression ::= '*' | field_path(',' field_path)*

field_path ::= identifier('/'identifier)*
```

An interactive syntax diagram is also available:

> 
> [OData syntax diagram for Azure AI Search](https://azuresearch.github.io/odata-syntax-diagram/#select_expression)

> **Note:**
> See [OData expression syntax reference for Azure AI Search](search-query-odata-syntax-reference.md) for the complete EBNF.

The **$select** parameter comes in two forms:

1. A single star (`*`), indicating that all retrievable fields should be returned, or
1. A comma-separated list of field paths, identifying which fields should be returned.

When using the second form, you may only specify retrievable fields in the list.

If you list a complex field without specifying its subfields explicitly, all retrievable subfields will be included in the query result set. For example, assume your index has an `Address` field with `Street`, `City`, and `Country` subfields that are all retrievable. If you specify `Address` in **$select**, the query results will include all three subfields.

## Examples

Include the `HotelId`, `HotelName`, and `Rating` top-level fields in the results, and include the `City` subfield of `Address`:

```odata-filter-expr
    $select=HotelId, HotelName, Rating, Address/City
```

An example result might look like this:

```json
{
  "HotelId": "1",
  "HotelName": "Stay-Kay City Hotel",
  "Rating": 4,
  "Address": {
    "City": "New York"
  }
}
```

Include the `HotelName` top-level field in the results. Include all subfields of `Address`. Include the `Type` and `BaseRate` subfields of each object in the `Rooms` collection:

```odata-filter-expr
    $select=HotelName, Address, Rooms/Type, Rooms/BaseRate
```

An example result might look like this:

```json
{
  "HotelName": "Stay-Kay City Hotel",
  "Rating": 4,
  "Address": {
    "StreetAddress": "677 5th Ave",
    "City": "New York",
    "StateProvince": "NY",
    "Country": "USA",
    "PostalCode": "10022"
  },
  "Rooms": [
    {
      "Type": "Budget Room",
      "BaseRate": 9.69
    },
    {
      "Type": "Budget Room",
      "BaseRate": 8.09
    }
  ]
}
```

## Next steps  

- [How to work with search results in Azure AI Search](search-pagination-page-layout.md)
- [OData expression language overview for Azure AI Search](query-odata-filter-orderby-syntax.md)
- [OData expression syntax reference for Azure AI Search](search-query-odata-syntax-reference.md)
- [Search Documents (Azure AI Search REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/search-post)
