---
title: Azure Digital Twins query language reference - FROM clause
titleSuffix: Azure Digital Twins
description: Reference documentation for the Azure Digital Twins query language FROM clause
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
---

# Azure Digital Twins query language reference: FROM clause

This document contains reference information on the *FROM clause* for the [Azure Digital Twins query language](concepts-query-language.md).

The FROM clause is the second part of a query. It specifies the collection and any joins that the query will act on.

This clause is required for all queries.

## SELECT ... FROM DIGITALTWINS

Use `FROM DIGITALTWINS` (not case sensitive) to refer to the entire collection of digital twins in an instance.

You can optionally add a name to the collection of digital twins by adding the name to the end of the statement.

### Syntax

Basic:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

To name the collection:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

### Examples

Here's a basic query. The following query returns all digital twins in the instance. 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

Here's a query with a named collection. The following query assigns a name `T` to the collection, and still returns all digital twins in the instance.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

## SELECT ... FROM RELATIONSHIPS

Use `FROM RELATIONSHIPS` (not case sensitive) to refer to the entire collection of relationships in an instance.

You can optionally add a name to the collection of relationships by adding the name to the end of the statement.

>**Note:**
> This feature cannot be combined with `JOIN`.

### Syntax

Basic:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

To name the collection:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

### Examples

Here's a query that returns all relationships in the instance. 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

Here's a query that returns all relationships coming from twins `A`, `B`, `C`, or `D`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

## Using FROM and JOIN together

The `FROM` clause can be combined with the `JOIN` clause to express cross-entity traversals in the Azure Digital Twins graph.

For more information on the `JOIN` clause and crafting graph traversal queries, see [Azure Digital Twins query language reference: JOIN clause](reference-query-clause-join.md).

## Limitations

The following limits apply to queries using `FROM`.
* [No subqueries](#no-subqueries)
* [Choose FROM RELATIONSHIPS or JOIN](#choose-from-relationships-or-join)

For more information, see the following sections.

### No subqueries

No subqueries are supported within the `FROM` statement.

#### Example (negative)

The following query illustrates the impossible action that **cannot** can't be done as per this limitation.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-from.md)

### Choose FROM RELATIONSHIPS or JOIN

The `FROM RELATIONSHIPS` feature cannot be combined with `JOIN`. You'll have to select which of these options works best for the information you'd like to select.
