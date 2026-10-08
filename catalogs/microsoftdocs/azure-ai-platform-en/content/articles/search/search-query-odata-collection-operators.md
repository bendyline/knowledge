---
title: OData Collection Operator Reference
description: When creating filter expressions in Azure AI Search queries, use "any" and "all" operators in lambda expressions when the filter is on a collection or complex collection field.
ms.service: azure-ai-search
ms.custom:
  - ignite-2023
ms.topic: concept-article
ms.date: 02/19/2026
ms.update-cycle: 365-days
---

# OData collection operators in Azure AI Search - `any` and `all`


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


When writing an [OData filter expression](query-odata-filter-orderby-syntax.md) to use with Azure AI Search, it's often useful to filter on collection fields. You can achieve this using the `any` and `all` operators.

## Syntax

The following EBNF ([Extended Backus-Naur Form](https://en.wikipedia.org/wiki/Extended_Backus–Naur_form)) defines the grammar of an OData expression that uses `any` or `all`.

<!-- Upload this EBNF using https://bottlecaps.de/rr/ui to create a downloadable railroad diagram. -->

```
collection_filter_expression ::=
    field_path'/all(' lambda_expression ')'
    | field_path'/any(' lambda_expression ')'
    | field_path'/any()'

lambda_expression ::= identifier ':' boolean_expression
```

An interactive syntax diagram is also available:

> 
> [OData syntax diagram for Azure AI Search](https://azuresearch.github.io/odata-syntax-diagram/#collection_filter_expression)

> **Note:**
> See [OData expression syntax reference for Azure AI Search](search-query-odata-syntax-reference.md) for the complete EBNF.

There are three forms of expression that filter collections.

- The first two iterate over a collection field, applying a predicate given in the form of a lambda expression to each element of the collection.
  - An expression using `all` returns `true` if the predicate is true for every element of the collection.
  - An expression using `any` returns `true` if the predicate is true for at least one element of the collection.
- The third form of collection filter uses `any` without a lambda expression to test whether a collection field is empty. If the collection has any elements, it returns `true`. If the collection is empty, it returns `false`.

A **lambda expression** in a collection filter is like the body of a loop in a programming language. It defines a variable, called the **range variable**, that holds the current element of the collection during iteration. It also defines another boolean expression that is the filter criteria to apply to the range variable for each element of the collection.

## Examples

Match documents whose `tags` field contains exactly the string "wifi":

```text
tags/any(t: t eq 'wifi')
```

Match documents where every element of the `ratings` field falls between 3 and 5, inclusive:

```text
ratings/all(r: r ge 3 and r le 5)
```

Match documents where any of the geo coordinates in the `locations` field is within the given polygon:

```text
locations/any(loc: geo.intersects(loc, geography'POLYGON((-122.031577 47.578581, -122.031577 47.678581, -122.131577 47.678581, -122.031577 47.578581))'))
```

Match documents where the `rooms` field is empty:

```text
not rooms/any()
```

Match documents where (for all rooms) the `rooms/amenities` field contains "tv", and `rooms/baseRate` is less than 100:

```text
rooms/all(room: room/amenities/any(a: a eq 'tv') and room/baseRate lt 100.0)
```

## Limitations

Not every feature of filter expressions is available inside the body of a lambda expression. The limitations differ depending on the data type of the collection field that you want to filter. The following table summarizes the limitations.


| Data type | Features allowed in lambda expressions with `any` | Features allowed in lambda expressions with `all` |
| --- | --- | --- |
| `Collection(Edm.ComplexType)` | Everything except `search.ismatch` and `search.ismatchscoring` | Same |
| `Collection(Edm.String)` | Comparisons with `eq` or `search.in` <br/><br/> Combining sub-expressions with `or` | Comparisons with `ne` or `not search.in()` <br/><br/> Combining sub-expressions with `and` |
| `Collection(Edm.Boolean)` | Comparisons with `eq` or `ne` | Same |
| `Collection(Edm.GeographyPoint)` | Using `geo.distance` with `lt` or `le` <br/><br/> `geo.intersects` <br/><br/> Combining sub-expressions with `or` | Using `geo.distance` with `gt` or `ge` <br/><br/> `not geo.intersects(...)` <br/><br/> Combining sub-expressions with `and` |
| `Collection(Edm.DateTimeOffset)`, `Collection(Edm.Double)`, `Collection(Edm.Int32)`, `Collection(Edm.Int64)` | Comparisons using `eq`, `ne`, `lt`, `gt`, `le`, or `ge` <br/><br/> Combining comparisons with other sub-expressions using `or` <br/><br/> Combining comparisons except `ne` with other sub-expressions using `and` <br/><br/> Expressions using combinations of `and` and `or` in [Disjunctive Normal Form (DNF)](https://en.wikipedia.org/wiki/Disjunctive_normal_form) | Comparisons using `eq`, `ne`, `lt`, `gt`, `le`, or `ge` <br/><br/> Combining comparisons with other sub-expressions using `and` <br/><br/> Combining comparisons except `eq` with other sub-expressions using `or` <br/><br/> Expressions using combinations of `and` and `or` in [Conjunctive Normal Form (CNF)](https://en.wikipedia.org/wiki/Conjunctive_normal_form) |


For more details on these limitations as well as examples, see [Troubleshooting collection filters in Azure AI Search](search-query-troubleshoot-collection-filters.md). For more in-depth information on why these limitations exist, see [Understanding collection filters in Azure AI Search](search-query-understand-collection-filters.md).

## Next steps  

- [Filters in Azure AI Search](search-filters.md)
- [OData expression language overview for Azure AI Search](query-odata-filter-orderby-syntax.md)
- [OData expression syntax reference for Azure AI Search](search-query-odata-syntax-reference.md)
- [Search Documents (Azure AI Search REST API)](https://learn.microsoft.com/rest/api/searchservice/documents/search-post)
