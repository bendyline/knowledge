---
title: Azure Digital Twins query language reference - Operators
titleSuffix: Azure Digital Twins
description: Reference documentation for the Azure Digital Twins query language operators
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
---

# Azure Digital Twins query language reference: Operators

This document contains reference information on *operators* for the [Azure Digital Twins query language](concepts-query-language.md).

## Comparison operators

The following operators from the comparison family are supported.

* `=`, `!=`: Used to compare equality of expressions.
* `<`, `>`: Used for ordered comparison of expressions.
* `<=`, `>=`: Used for ordered comparison of expressions, including equality.

### Example

Here's an example using `=`. The following query returns twins whose Temperature value is equal to 80.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

Here's an example using `<`. The following query returns twins whose Temperature value is less than 80.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

Here's an example using `<=`. The following query returns twins whose Temperature value is less than or equal to 80.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

## Contains operators

The following operators from the contains family are supported.

* `IN`: Evaluates to true if a given value is in a set of values.
* `NIN`: Evaluates to true if a given value isn't in a set of values.

### Example

Here's an example using `IN`. The following query returns twins whose `owner` property is one of several options from a list.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

## Logical operators

The following operators from the logical family are supported:
* `AND`: Used to connect two expressions, evaluates to true if they're both true.
* `OR`: Used to connect two expressions, evaluates to true if at least one of them is true.
* `NOT`: Used to negate an expression, evaluates to true if the expression condition isn't met.

### Example

Here's an example using `AND`. The following query returns twins who meet both conditions of Temperature less than 80 and Humidity less than 50.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

Here's an example using `OR`. The following query returns twins who meet at least one of the conditions of Temperature less than 80 and Humidity less than 50.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

Here's an example using `NOT`. The following query returns twins who don't meet the conditions of Temperature less than 80.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-operators.md)

## Limitations

The following limits apply to queries using operators.
* Contains operators: The limit for the number of values that can be included in an `IN` or `NIN` set is 100 values.
