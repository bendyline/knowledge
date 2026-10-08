---
title: Query the twin graph
titleSuffix: Azure Digital Twins
description: See how to query the Azure Digital Twins twin graph for information.
author: baanders
ms.author: baanders
ms.date: 03/06/2025
ms.topic: how-to
ms.service: azure-digital-twins
---

# Query the Azure Digital Twins twin graph

This article offers query examples and instructions for using the *Azure Digital Twins query language* to query your [twin graph](concepts-twins-graph.md) for information. (For an introduction to the query language, see [Query language](concepts-query-language.md).)

The article contains sample queries that illustrate the query language structure and common query operations for digital twins. It also describes how to run your queries after you write them, using the [Azure Digital Twins Query API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/query) or an [SDK](concepts-apis-sdks.md#data-plane-overview).

> **Note:**
> If you run the following sample queries with an API or SDK call, you need to condense the query text into a single line.


## Reference documentation

The Query language reference can be found under **Reference** in the left table of contents for the Azure Digital Twins documentation. You can also go directly to the reference sections using the links below:
* Clauses
    * [SELECT](reference-query-clause-select.md)
    * [FROM](reference-query-clause-from.md)
    * [MATCH](reference-query-clause-match.md)
    * [JOIN](reference-query-clause-join.md)
    * [WHERE](reference-query-clause-where.md)
* [Functions](reference-query-functions.md)
* [Operators](reference-query-operators.md)
* [Reserved keywords](reference-query-reserved.md)

## Show all digital twins

Here's the basic query that returns a list of all digital twins in the instance:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Query by property

Get digital twins by properties (including ID and metadata):

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

As shown in the previous query, the ID of a digital twin is queried using the metadata field `$dtId`.

>**Tip:**
> If you're using Cloud Shell to run a query with metadata fields that begin with `$`, you should escape the `$` with a backslash to let Cloud Shell know it's not a variable and should be consumed as a literal in the query text.

You can also get twins based on whether a certain property is defined. Here's a query that gets twins that have a defined `Location` property:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

This query can help you get twins by their `tag` properties, as described in [Add tags to digital twins](how-to-use-tags.md). Here's a query that gets all twins tagged with `red`:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also get twins based on the type of a property. Here's a query that gets twins whose `Temperature` property is a number:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

### Query Map properties

If a property is of the complex type `Map`, you can use the map keys and values directly in the query, like this:
[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

If the map key starts with a numeric character, you need to wrap the key in double square brackets (`[[<mapKey>]]`) to escape it in the query, similar to the strategy for [querying with reserved keywords](reference-query-reserved.md#escaping-reserved-keywords-in-queries).

## Query by model

The `IS_OF_MODEL` operator can be used to filter based on the twin's [model](concepts-models.md).

It considers [inheritance](concepts-models.md#model-inheritance) and model [versioning](how-to-manage-model.md#update-models), and evaluates to `true` for a given twin if the twin meets either of these conditions:

* The twin directly implements the model provided to `IS_OF_MODEL()`, and the version number of the model on the twin is greater than or equal to the version number of the provided model
* The twin implements a model that extends the model provided to `IS_OF_MODEL()`, and the twin's extended model version number is greater than or equal to the version number of the provided model

So for example, if you query for twins of the model `dtmi:example:widget;4`, the query returns all twins based on version 4 or greater of the widget model, and also twins based on version 4 or greater of any models that inherit from widget.

`IS_OF_MODEL` can take several different parameters, and the rest of this section is dedicated to its different overload options.

The simplest use of `IS_OF_MODEL` takes only a `twinTypeName` parameter: `IS_OF_MODEL(twinTypeName)`.
Here's a query example that passes a value in this parameter:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

To specify a twin collection to search when there's more than one (like when a `JOIN` is used), add the `twinCollection` parameter: `IS_OF_MODEL(twinCollection, twinTypeName)`.
Here's a query example that adds a value for this parameter:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

To do an exact match, add the `exact` parameter: `IS_OF_MODEL(twinTypeName, exact)`.
Here's a query example that adds a value for this parameter:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also pass all three arguments together: `IS_OF_MODEL(twinCollection, twinTypeName, exact)`.
Here's a query example specifying a value for all three parameters:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Query by relationship

To query based on digital twins' relationships, the Azure Digital Twins query language provides a special syntax.

Relationships are pulled into the query scope in the `FROM` clause. Unlike in "classical" SQL-type languages, each expression in the `FROM` clause isn't a table; rather, the `FROM` clause expresses a cross-entity relationship traversal. To traverse across relationships, Azure Digital Twins uses a custom version of `JOIN`.

Recall that with the Azure Digital Twins [model](concepts-models.md) capabilities, relationships don't exist independently of twins. The result is that relationships can't be queried independently and must be tied to a twin.
To reflect this fact, the keyword `RELATED` is used in the `JOIN` clause to pull in the set of a certain type of relationship coming from the twin collection. The query must then filter in the `WHERE` clause, to indicate which specific twins to use in the relationship query (using the twins' `$dtId` values).

The following sections give examples of what this looks like.

### Basic relationship query

Here's a sample relationship-based query. This code snippet selects all digital twins with an `ID` property of `ABC`, and all digital twins related to these digital twins via a `contains` relationship.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

The type of the relationship (`contains` in the previous example) is indicated using the relationship's `name` field from its [DTDL definition](concepts-models.md#basic-relationship-example).

> **Note:**
> The developer doesn't need to correlate this `JOIN` with a key value in the `WHERE` clause (or specify a key value inline with the `JOIN` definition). The system automatically computes this correlation, as the relationship properties themselves identify the target entity.

### Query by the source or target of a relationship

You can use the relationship query structure to identify a digital twin that's the source or the target of a relationship.

For instance, you can start with a source twin and follow its relationships to find the target twins of the relationships. Here's an example of a query that finds the target twins of the `feeds` relationships coming from the twin source-twin.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also start with the target of the relationship and trace the relationship back to find the source twin. Here's an example of a query that finds the source twin of a `feeds` relationship to the twin target-twin.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

### Query the properties of a relationship

Similar to the way that digital twins have properties described via DTDL, relationships can also have properties. You can query twins based on the properties of their relationships. The Azure Digital Twins query language allows filtering and projection of relationships, by assigning an alias to the relationship within the `JOIN` clause.

As an example, consider a `servicedBy` relationship that has a `reportedCondition` property. In the following query, this relationship is given an alias of `R` to reference its property.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

In the previous example, note how `reportedCondition` is a property of the `servicedBy` relationship itself (NOT of some digital twin that has a `servicedBy` relationship).

### Query with multiple JOINs

Up to five `JOIN`s are supported in a single query, which allows you to traverse multiple levels of relationships at once. 

To query on multiple levels of relationships, use a single `FROM` statement followed by N `JOIN` statements, where the `JOIN` statements express relationships on the result of a previous `FROM` or `JOIN` statement.

Here's an example of a multi-join query, which gets all the light bulbs contained in the light panels in rooms 1 and 2.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Count items

You can count the number of items in a result set using the `Select COUNT` clause:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

Add a `WHERE` clause to count the number of items that meet a certain criteria. The following examples demonstrate counting with an applied filter based on the type of twin model. For more information on this syntax, see [Query by model](#query-by-model).

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also use `COUNT` along with the `JOIN` clause. Here's a query that counts all the light bulbs contained in the light panels of rooms 1 and 2:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Filter results: select top items

You can select the several "top" items in a query using the `Select TOP` clause.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Filter results: specify return set with projections

By using projections in the `SELECT` statement, you can choose which columns a query returns. Projection is now supported for both primitive and complex properties. For more information about projections with Azure Digital Twins, see the [SELECT clause reference documentation](reference-query-clause-select.md#select-columns-with-projections).

Here's an example of a query that uses projection to return twins and relationships. The following query projects the Consumer, Factory, and Edge from a scenario where a Factory with an ID of `ABC` is related to the Consumer through a relationship of `Factory.customer`, and that relationship is presented as the `Edge`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also use projection to return a property of a twin. The following query projects the `Name` property of the Consumers that are related to the Factory with an ID of `ABC` through a relationship of `Factory.customer`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also use projection to return a property of a relationship. Like in the previous example, the following query projects the `Name` property of the Consumers related to the Factory with an ID of `ABC` through a relationship of `Factory.customer`; but now it also returns two properties of that relationship, `prop1` and `prop2`. The query returns those two properties by naming the relationship `Edge` and gathering its properties.  

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

You can also use aliases to simplify queries with projection.

The following query does the same operations as the previous example, but it aliases the property names to `consumerName`, `first`, `second`, and `factoryArea`.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

Here's a similar query that queries the same set as the previous query, but projects only the `Consumer.name` property as `consumerName`, and projects the complete Factory as a twin.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Build efficient queries with the IN operator

You can significantly reduce the number of queries you need by building an array of twins and querying with the `IN` operator. 

For example, consider a scenario in which Buildings contain Floors and Floors contain Rooms. To search for rooms within a building that are hot, one way is to follow these steps.

1. Find floors in the building based on the `contains` relationship.

    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

2. To find rooms, instead of considering the floors one-by-one and running a `JOIN` query to find the rooms for each one, you can query with a collection of the floors in the building (named `Floor` in the following query).

    In client app:
    
    ```csharp
    var floors = "['floor1','floor2', ..'floorn']"; 
    ```
    
    In query:
    
    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Other compound query examples

You can combine any of the previously described types of query using combination operators to include more detail in a single query. Here are some other examples of compound queries that query for more than one type of twin descriptor at once.

* Out of the devices that Room 123 has, return the MxChip devices that serve the role of Operator
    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)
* Get twins that have a relationship named `Contains` with another twin that has an ID of `id1`
    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)
* Get all the rooms of this room model that are contained by floor11
    [Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/queries/examples.sql](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Run queries with the API

Once you decide on a query string, you execute it by making a call to the [Query API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/query).

You can call the API directly, or use one of the [SDKs](concepts-apis-sdks.md#data-plane-overview) available for Azure Digital Twins.

The following code snippet illustrates the [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme) call from a client app:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/queries.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

The query used in this call returns a list of digital twins, which the previous example represents with [BasicDigitalTwin](https://learn.microsoft.com/dotnet/api/azure.digitaltwins.core.basicdigitaltwin?view=azure-dotnet\&preserve-view=true) objects. The return type of your data for each query depends on what terms you specify with the `SELECT` statement:
* Queries that begin with `SELECT * FROM ...` return a list of digital twins (which can be serialized as `BasicDigitalTwin` objects, or other custom digital twin types that you might create).
* Queries that begin in the format `SELECT <A>, <B>, <C> FROM ...` return a dictionary with keys `<A>`, `<B>`, and `<C>`.
* Other formats of `SELECT` statements can be crafted to return custom data. You might consider creating your own classes to handle customized result sets. 

### Query with paging

Query calls support paging. Here's a complete example using `BasicDigitalTwin` as query result type with error handling and paging:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/queries.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-query-graph.md)

## Next steps

Learn more about the [Azure Digital Twins APIs and SDKs](concepts-apis-sdks.md), including the Query API that is used to run the queries from this article.
