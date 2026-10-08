---
title: Azure Digital Twins query language reference - MATCH clause
titleSuffix: Azure Digital Twins
description: Reference documentation for the Azure Digital Twins query language MATCH clause
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
ms.custom: engagement-fy23
---

# Azure Digital Twins query language reference: MATCH clause

This document contains reference information on the *MATCH clause* for the [Azure Digital Twins query language](concepts-query-language.md).

The `MATCH` clause is used in the Azure Digital Twins query language as part of the [FROM clause](reference-query-clause-from.md). `MATCH` allows you to specify which pattern should be followed while traversing relationships in the Azure Digital Twins graph (this is also known as a "variable hop" query pattern).

This clause is optional while querying.

## Core syntax: MATCH

`MATCH` supports any query that finds a path between twins within a range of hops, based on certain relationship conditions. 

The relationship condition can include one or more of the following details:
* [Relationship direction](#specify-relationship-direction) (left-to-right, right-to-left, or non-directional)
* [relationship name](#specify-relationship-name) (single name or a list of possibilities)
* [Number of "hops"](#specify-number-of-hops) from one twin to another (exact number or range)
* [A query variable assignment](#assign-query-variable-to-relationship-and-specify-relationship-properties) to represent the relationship within the query text. This will also allow you to filter on relationship properties.

A query with a `MATCH` clause must also use the [WHERE clause](reference-query-clause-where.md) to specify the `$dtId` for at least one of the twins it references.

>**Note:**
>`MATCH` is a superset of all `JOIN` queries that can be performed in the query store.

### Syntax

Here's the basic `MATCH` syntax. 

It contains these placeholders:
* `twin_or_twin_collection` (x2): The `MATCH` clause requires one operand to represent a single twin. The other operand can represent another single twin, or a collection of twins.
* `relationship_condition`: In this space, define a condition that describes the relationship between the twins or twin collections. The condition can [specify relationship direction](#specify-relationship-direction), [specify relationship name](#specify-relationship-name), [specify number of hops](#specify-number-of-hops), [specify relationship properties](#assign-query-variable-to-relationship-and-specify-relationship-properties), or [any combination of these options](#combine-match-operations).
* `twin_ID`: Here, specify a `$dtId` within one of the twin collections so that one of the operands represents a single twin.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

You can leave one of the twin collections blank in order to allow any twin to work in that spot.

You can also change the number of relationship conditions, to have multiple [chained](#combine-match-operations) relationship conditions or no relationship condition at all:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

For more detail about each type of relationship condition and how to combine them, see the other sections of this document.

### Example

Here is an example query using `MATCH`.

The query specifies a [relationship direction](#specify-relationship-direction), and searches for Building and Sensor twins where...
* the Sensor is targeted by any relationship from a Building twin with a `$dtId` of Building21, and 
* the Sensor has a temperature above 50.
The Building and Sensor are both included in the query result.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Specify relationship direction

Use the relationship condition in the `MATCH` clause to specify a relationship direction between the twins. Possible directions include left-to-right, right-to-left, or non-directional. Cyclic relationships are automatically detected, so that a relationship is traversed only once.

> **Note:**
> It's possible to represent bi-directional relationships by using [chaining](#combine-match-operations).

### Syntax

>**Note:**
> The examples in this section focus on relationship direction. They don't specify relationship names, they default to a single hop, and they don't assign query variables to the relationships. For instructions on how to do more with these other conditions, see [Specify relationship name](#specify-relationship-name), [Specify number of hops](#specify-number-of-hops), and [Assign query variable to relationship](#assign-query-variable-to-relationship-and-specify-relationship-properties). For information about how to use several of these together in the same query, see [Combine MATCH operations](#combine-match-operations).

Directional relationship descriptions use a visual depiction of an arrow to indicate the direction of the relationship. The arrow includes a space set aside by square brackets (`[]`) for an optional [relationship name](#specify-number-of-hops). 

This section shows the syntax for different directions of relationships. The placeholder values that should be replaced with your values are `source_twin_or_twin_collection` and `target_twin_or_twin_collection`.

For a *left-to-right* relationship, use the following syntax.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

For a *right-to-left* relationship, use the following syntax.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

For a *non-directional* relationship, use the following syntax. This will not specify a direction for the relationship, so relationships of any direction will be included in the result.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

>**Tip:**
>Non-directional queries require additional processing, which may result in increased latency and cost.

### Examples

The first example shows a left-to-right directional traversal. This query finds twins Room and Factory where...
* Room targets Factory (with any name of relationship)
* Room has a temperature value that's greater than 50
* Factory has a `$dtId` of 'ABC'

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

>**Note:**
> MATCH queries that contain `$dtId` filters on any twin other than the starting twin for the MATCH traversal may show empty results. This applies to `factory.$dtId` in the above example. For more information, see [Limitations](#limitations).

The following example shows a right-to-left directional traversal. This query looks similar to the one above, but the direction of the relationship between Room and Factory is reversed. This query finds twins Room and Factory where...
* Factory targets Room (with any name of relationship)
* Factory has a `$dtId` of 'ABC'
* Room has a temperature value that's greater than 50

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example shows a non-directional traversal. This query finds twins Room and Factory where...
* Room and Factory share any name of relationship, going in either direction
* Factory has a `$dtId` of 'ABC'
* Room has a humidity value that's greater than 70

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Specify relationship name

Optionally, you can use the relationship condition in the `MATCH` clause to specify names for the relationships between the twins. You can specify a single name, or a list of possible names. The optional relationship name is included as part of the [arrow syntax to specify relationship direction](#specify-relationship-direction).

If you don't provide a relationship name, the query will include all relationship names by default.

>**Tip:**
>Specifying relationship names in the query can improve performance and make results more predictable.

### Syntax

>**Note:**
> The examples in this section focus on relationship name. They all show non-directional relationships, they default to a single hop, and they don't assign query variables to the relationships. For instructions on how to do more with these other conditions, see [Specify relationship direction](#specify-relationship-direction), [Specify number of hops](#specify-number-of-hops), and [Assign query variable to relationship](#assign-query-variable-to-relationship-and-specify-relationship-properties). For information about how to use several of these together in the same query, see [Combine MATCH operations](#combine-match-operations).

Specify the name of a relationship to traverse in the `MATCH` clause within square brackets (`[]`), after a colon (`:`). This section shows the syntax of specifying named relationships.

For a single name, use the following syntax. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1`, `relationship_name`, and `twin_or_twin_collection_2`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

For multiple possible names use the following syntax. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1`, `relationship_name_option_1`, `relationship_name_option_2`, `twin_or_twin_collection_2`, and the note to continue the pattern as needed for the number of relationship names you want to enter.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

>**Important:**
> The colon (`:`) within the square brackets is a required part of the syntax for specifying a relationship name in a `MATCH` query. If you don't include the colon, your query doesn't specify a relationship name. Instead, you have a query that [assigns a query variable to the relationship](#assign-query-variable-to-relationship-and-specify-relationship-properties).

(Default) To leave name unspecified, leave the brackets empty of name information, like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

### Examples

The following example shows a single relationship name. This query finds twins Building and Sensor where...
* Building has a 'contains' relationship to Sensor (going in either direction)
* Building has a `$dtId` of 'Seattle21'

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example shows multiple possible relationship names. This query looks similar to the one above, but there are multiple possible relationship names that are included in the result. This query finds twins Building and Sensor where...
* Building has either a 'contains' or 'isAssociatedWith' relationship to Sensor (going in either direction)
* Building has a `$dtId` of 'Seattle21'

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example has no specified relationship name. As a result, relationships with any name will be included in the query result. This query finds twins Building and Sensor where...
* Building has a relationship to Sensor with any name (and going in either direction)
* Building has a `$dtId` of 'Seattle21'

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Specify number of hops

Optionally, you can use the relationship condition in the `MATCH` clause to specify the number of hops for the relationships between the twins. You can specify an exact number or a range. This optional value is included as part of the [arrow syntax to specify relationship direction](#specify-relationship-direction).

If you don't provide a number of hops, the query will default to one hop.

>**Important:**
>If you specify a number of hops that is greater than one, you can't [assign a query variable to the relationship](#assign-query-variable-to-relationship-and-specify-relationship-properties). Only one of these conditions can be used within the same query. 

### Syntax

>**Note:**
>The examples in this section focus on number of hops. They all show non-directional relationships without specifying names. For instructions on how to do more with these other conditions, see [Specify relationship direction](#specify-relationship-direction) and [Specify relationship name](#specify-relationship-name). For information about how to use several of these together in the same query, see [Combine MATCH operations](#combine-match-operations).

Specify the number of hops to traverse in the `MATCH` clause within the square brackets (`[]`).

To specify an exact number of hops, use the following syntax. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1`, `number_of_hops`, and `twin_or_twin_collection_2`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

To specify a range of hops, use the following syntax. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1`, `starting_limit`,  `ending_limit` and `twin_or_twin_collection_2`. The starting limit isn't included in the range, while the ending limit is included.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

You can also leave out the starting limit to indicate "anything up to" (and including) the ending limit. An ending limit must always be provided.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

(Default) To default to one hop, leave the brackets empty of hop information, like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

### Examples

The following example specifies an exact number of hops. The query will only return relationships between twins Floor and Room that are exactly 3 hops.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example specifies a range of hops. The query will return relationships between twins Floor and Room that are between 1 and 3 hops (meaning the number of hops is either 2 or 3).

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

You can also show a range by providing only one boundary. In the following example, the query will return relationships between twins Floor and Room that are at most 2 hops (meaning the number of hops is either 1 or 2).

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example has no specified number of hops, so will default to one hop between twins Floor and Room.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Assign query variable to relationship (and specify relationship properties)

Optionally, you can assign a query variable to the relationship referenced in the `MATCH` clause, so that you can refer to it by name in the query text.

A useful result of doing this is the ability to filter on relationship properties in your `WHERE` clause.

>**Important:**
> Assigning a query variable to the relationship is only supported when the query specifies a single hop. Within a query, you must choose between specifying a relationship variable and [specifying a greater number of hops](#specify-number-of-hops).

### Syntax

>**Note:**
>The examples in this section focus on a query variable for the relationship. They all show non-directional relationships without specifying names. For instructions on how to do more with these other conditions, see [Specify relationship direction](#specify-relationship-direction) and [Specify relationship name](#specify-relationship-name). For information about how to use several of these together in the same query, see [Combine MATCH operations](#combine-match-operations).

To assign a query variable to the relationship, put the variable name in the square brackets (`[]`). The placeholder values shown below that should be replaced with your values are `twin_or_twin_collection_1`, `relationship_variable`, and `twin_or_twin_collection_2`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

### Examples

The following example assigns a query variable 'Rel' to the relationship. Later, in the `WHERE` clause, it uses the variable to specify that the relationship Rel should have a name property with a value of 'child'.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Combine MATCH operations

You can combine multiple relationship conditions in the same query. You can also chain multiple relationship conditions to express bi-directional relationships or other larger combinations.

### Syntax

In a single query, you can combine [relationship direction](#specify-relationship-direction), [relationship name](#specify-number-of-hops), and one of either [number of hops](#specify-number-of-hops) or [a query variable assignment](#assign-query-variable-to-relationship-and-specify-relationship-properties).

The following syntax examples show how these attributes can be combined. You can also leave out any of the optional details shown in placeholders to omit that part of the condition.

To specify relationship direction, relationship name, and number of hops within a single query, use the following syntax within the relationship condition. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1` and `twin_or_twin_collection_2`, `optional_left_angle_bracket` and `optional_right_angle_bracket`, `relationship_name(s)`, and `number_of_hops`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

To specify relationship direction, relationship name, and a query variable for the relationship within a single query, use the following syntax within the relationship condition. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1` and `twin_or_twin_collection_2`, `optional_left_angle_bracket` and `optional_right_angle_bracket`, `relationship_variable`, and `relationship_name(s)`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

>**Note:**
>As per the options for [specifying relationship direction](#specify-relationship-direction), you must pick between a left angle bracket for a left-to-right relationship or a right angle bracket for a right-to-left relationship. You can't include both on the same arrow, but can represent bi-directional relationships by chaining.

You can chain multiple relationship conditions together, like this. The placeholder values that should be replaced with your values are `twin_or_twin_collection_1`, all instances of `relationship_condition`, and `twin_or_twin_collection_2`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

### Examples

Here's an example that combines relationship direction, relationship name, and number of hops. The following query finds twins Floor and Room where the relationship between Floor and Room meets these conditions:
* the relationship is left-to-right, with Floor as the source and Room as the target
* the relationship has a name of either 'contains' or 'isAssociatedWith'
* the relationship has either 4 or 5 hops

The query also specifies that twin Floor has a `$dtId` of 'thermostat-15'.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

Here's an example that combines relationship direction, relationship name, and a named query variable for the relationship. The following query finds twins Floor and Room where the relationship between Floor and Room is assigned to a query variable `r` and meets these conditions:
* the relationship is left-to-right, with Floor as the source and Room as the target
* the relationship has a name of either 'contains' or 'isAssociatedWith'
* the relationship, which is given a query variable `r`, has a length property equal to 10

The query also specifies that twin Floor has a `$dtId` of 'thermostat-15'.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

The following example illustrates *chained* relationship conditions. The query finds twins Floor, Cafe, and Room, where...
* the relationship between Floor and Room meets these conditions:
    - the relationship is left-to-right, with Floor as the source and Cafe as the target
    - the relationship has a name of either 'contains' or 'isAssociatedWith'
    - the relationship, which is given query variable `r`, has a length property equal to 10
* the relationship between Cafe and Room meets these conditions:
    - the relationship is right-to-left, with Room as the source and Cafe as the target
    - the relationship has a name of either 'has' or 'includes'
    - the relationship has up to 3 (so 1, 2, or 3) hops

The query also specifies that twin Floor has a `$dtId` of 'thermostat-15' and twin Cafe has a temperature of 55.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

You can also use chained relationship conditions to express bi-directional relationships. The following query finds twins Floor, Room, and Building, where...
* the relationship between Building and Floor meets these conditions:
    - the relationship is left-to-right, with Building as the source and Floor as the target
    - the relationship has a name of 'isAssociatedWith'
    - the relationship is given a query variable `r1`
* the relationship between Floor and Room meets these conditions:
    - the relationship is right-to-left, with Room as the source and Floor as the target
    - the relationship has a name of 'isAssociatedWith'
    - the relationship is given a query variable `r2`

The query also specifies that twin Building has a `$dtId` of 'building-3' and Room has a temperature greater than 50.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-match.md)

## Limitations

The following limits apply to queries using `MATCH`:
* Only one `MATCH` expression is supported per query statement.
* `$dtId` is required in the `WHERE` clause.
* Assigning a query variable to the relationship is only supported when the query specifies a single hop.
* The maximum hops supported in a query is 10.
* MATCH queries that contain `$dtId` filters on any twin other than the starting twin for the MATCH traversal may show empty results. For example, the following query is subject to this limitation:

    ```sql
    SELECT A, B, C FROM DIGITALTWINS 
    MATCH A-[contains]->B-[is_part_of]->C 
    WHERE B.$dtId = 'Device01'
    ```

    If your scenario requires you to use `$dtId` on other twins, consider using the [JOIN clause](reference-query-clause-join.md) instead.
* MATCH queries that traverse the same twin multiple times may unexpectedly remove this twin from results.
