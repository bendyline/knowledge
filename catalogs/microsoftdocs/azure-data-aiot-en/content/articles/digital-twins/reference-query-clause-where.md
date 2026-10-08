---
title: Azure Digital Twins query language reference - WHERE clause
titleSuffix: Azure Digital Twins
description: Reference documentation for the Azure Digital Twins query language WHERE clause
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
---

# Azure Digital Twins query language reference: WHERE clause

This document contains reference information on the *WHERE clause* for the [Azure Digital Twins query language](concepts-query-language.md).

The WHERE clause is the last part of a query. It's used to filter the items that are returned based on specific conditions.

This clause is optional while querying.

## Core syntax: WHERE

The WHERE clause is used along with a Boolean condition to filter query results. 

A condition can be a [function](reference-query-functions.md) that evaluates to a Boolean result. You can also create your own Boolean statement using the properties of twins and relationships (accessed with `.`) with a comparison or contains-type [operator](reference-query-operators.md).

### Syntax

With properties and operators:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-where.md)

With a function:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-where.md)

### Arguments

A condition evaluating to a `Boolean` value.

### Examples

Here's an example using properties and operators. The following query specifies in the WHERE clause to only return the twin with a `$dtId` value of Room1.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-where.md)

Here's an example using a function. The following query uses the `IS_OF_MODEL` function to specify in the WHERE clause to only return the twins with a model of `dtmi:sample:Room;1`. For more about the `IS_OF_MODEL` function, see [Azure Digital Twins query language reference: Functions](reference-query-functions.md#is_of_model).

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-where.md)
