---
title: Azure Digital Twins query language reference - SELECT clause
titleSuffix: Azure Digital Twins
description: Reference documentation for the Azure Digital Twins query language SELECT clause
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: reference
ms.service: azure-digital-twins
---

# Azure Digital Twins query language reference: SELECT clause

This document contains reference information on the *SELECT clause* for the [Azure Digital Twins query language](concepts-query-language.md).

The SELECT clause is the first part of a query. It specifies the list of columns that the query will return.

This clause is required for all queries.

## SELECT *

Use the `*` character in a select statement to project the digital twin document as is, without assigning it to a property in the result set.

>**Note:**
> `SELECT *` is only valid syntax when the query does not use a `JOIN`. For more information on queries using `JOIN`, see [Azure Digital Twins query language reference: JOIN clause](reference-query-clause-join.md).

### Syntax

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

### Returns

The set of properties that are returned from the query.

### Example

The following query returns all digital twins in the instance. 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

## SELECT columns with projections

You can use projections in the SELECT clause to choose which columns a query will return. You can specify named collections of twins and relationships, or properties of twins and relationships.

Projection is now supported for both [primitive properties and complex properties](concepts-models.md#schema).

### Syntax

To project a collection:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

To project a property:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

### Returns

A collection of twins, properties, or relationships specified in the projection.

If a property included in the projection isn't present for a particular data row, the property will similarly not be present in the result set. For an example of this behavior, see [Project property example: Property not present for a data row](#project-property-example-property-not-present-for-a-data-row).

### Examples

#### Example scenario

For the following examples, consider a twin graph that contains the following data elements:
* A Factory twin called FactoryA
    - Contains a property called `name` with a value of `FactoryA`
* A Consumer twin called Contoso
    - Contains a property called `name` with a value of `Contoso`
* A consumerRelationship relationship from FactoryA to Contoso, called `FactoryA-consumerRelationship-Contoso`
    - Contains a property called `managedBy` with a value of `Jeff`

Here's a diagram illustrating this scenario:

Diagram showing the sample graph described above.

#### Project collection example

Below is an example query that projects a collection from this graph. The following query returns all digital twins in the instance, by naming the entire twin collection `T` and projecting `T` as the collection to return. 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

Here's the JSON payload that's returned from this query:

```json
{
  "value": [
    {
      "result": [
        {
          "T": {
            "$dtId": "FactoryA",
            "$etag": "W/\"d22267a0-fd4f-4f6b-916d-4946a30453c9\"",
            "$metadata": {
              "$model": "dtmi:contosocom:DigitalTwins:Factory;1",
              "name": {
                "lastUpdateTime": "2021-04-19T17:15:54.4977151Z"
              }
            },
            "name": "FactoryA"
          }
        },
        {
          "T": {
            "$dtId": "Contoso",
            "$etag": "W/\"a96dc85e-56ae-4061-866b-058a149e03d8\"",
            "$metadata": {
              "$model": "dtmi:com:contoso:Consumer;1",
              "name": {
                "lastUpdateTime": "2021-04-19T17:16:30.2154166Z"
              }
            },
            "name": "Contoso"
          }
        }
      ]
    }
  ],
  "continuationToken": "null"
}
```

#### Project with JOIN example

Projection is commonly used to return a collection specified in a `JOIN`. The following query uses projection to return the data of the Consumer, Factory, and Relationship. For more about the `JOIN` syntax used in the example, see [Azure Digital Twins query language reference: JOIN clause](reference-query-clause-join.md).

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

Here's the JSON payload that's returned from this query:

```json
{
  "value": [
    {
      "result": [
        {
          "Consumer": {
            "$dtId": "Contoso",
            "$etag": "W/\"a96dc85e-56ae-4061-866b-058a149e03d8\"",
            "$metadata": {
              "$model": "dtmi:com:contoso:Consumer;1",
              "name": {
                "lastUpdateTime": "2021-04-19T17:16:30.2154166Z"
              }
            },
            "name": "Contoso"
          },
          "Factory": {
            "$dtId": "FactoryA",
            "$etag": "W/\"d22267a0-fd4f-4f6b-916d-4946a30453c9\"",
            "$metadata": {
              "$model": "dtmi:contosocom:DigitalTwins:Factory;1",
              "name": {
                "lastUpdateTime": "2021-04-19T17:15:54.4977151Z"
              }
            },
            "name": "FactoryA"
          },
          "Relationship": {
            "$etag": "W/\"f01e07c1-19e4-4bbe-a12d-f5761e86d3e8\"",
            "$relationshipId": "FactoryA-consumerRelationship-Contoso",
            "$relationshipName": "consumerRelationship",
            "$sourceId": "FactoryA",
            "$targetId": "Contoso",
            "managedBy": "Jeff"
          }
        }
      ]
    }
  ],
  "continuationToken": "null"
}
```

#### Project property example

Here's an example that projects a property. The following query uses projection to return the `name` property of the Consumer twin, and the `managedBy` property of the relationship.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

Here's the JSON payload that's returned from this query:

```json
{
  "value": [
    {
      "result": [
        {
          "managedBy": "Jeff",
          "name": "Contoso"
        }
      ]
    }
  ],
  "continuationToken": "null"
}
```

#### Project property example: Property not present for a data row

If a property included in the projection isn't present for a particular data row, the property will similarly not be present in the result set.

Consider for this example a set of twins that represent people. Some of the twins have ages associated with them, but others don't.

Here's a query that projects the `name` and `age` properties:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

The result might look something like this, with the `age` property missing from some twins in the result where the twins don't have this property.

```json
{
  "value": [
    {
      "result": [
        {
          "name": "John",
          "age": 27
        },
        {
          "name": "Keanu"
        }
      ]
    }
  ],
  "continuationToken": "null"
}
```

## SELECT COUNT

Use this method to count the number of items in the result set and return that number.

### Syntax

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

### Arguments

None.

### Returns

An `int` value.

### Example

The following query returns the count of all digital twins in the instance.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

The following query returns the count of all relationships in the instance.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

## SELECT TOP

Use this method to return only some of the top items that meet the query requirements.

### Syntax

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)

### Arguments

An `int` value specifying the number of top items to select.

### Returns

A collection of twins.

### Example

The following query returns only the first five digital twins in the instance.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/reference.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/reference-query-clause-select.md)
