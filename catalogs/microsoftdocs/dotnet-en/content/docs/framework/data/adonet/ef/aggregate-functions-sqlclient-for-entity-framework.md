---
description: "Learn more about: Aggregate Functions (SqlClient for Entity Framework)"
title: "Aggregate Functions (SqlClient for Entity Framework)"
ms.topic: reference
ms.date: "03/30/2017"
ms.assetid: 03303f01-b591-4efc-9875-f9c608edff0b
---
# Aggregate Functions (SqlClient for Entity Framework)

The .NET Framework Data Provider for SQL Server (SqlClient) provides aggregate functions. Aggregate functions perform calculations on a set of input values and return a value. These functions are in the SqlServer namespace, which is available when you use SqlClient. A provider's namespace property allows the Entity Framework to discover which prefix is used by this provider for specific constructs, such as types and functions.  
  
 The following are the SqlClient aggregate functions.  

## AVG(expression)

Returns the average of the values in a collection. Null values are ignored.

**Arguments**

An `Int32`, `Int64`, `Double`, and `Decimal`.

**Return Value**

The type of `expression`.

**Example**

[DP EntityServices Concepts#SQLSERVER_AVG (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_avg)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## CHECKSUM_AGG(collection)

 Returns the checksum of the values in a collection. Null values are ignored.

 **Arguments**

 A Collection(`Int32`).

 **Return Value**

 An `Int32`.

 **Example**

[DP EntityServices Concepts#SQLSERVER_CHECKSUM (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_checksum)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## COUNT(expression)

Returns the number of items in a collection as an `Int32`.

**Arguments**

A Collection\<T>, where T is one of the following types:

- `Boolean`
- `Double`
- `DateTime`
- `DateTimeOffset`
- `Time`
- `String`
- `Binary`
- `Guid` (not returned in SQL Server 2000)

**Return Value**

An `Int32`.

**Example**

[DP EntityServices Concepts#SQLSERVER_COUNT (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_count)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## COUNT_BIG(expression)

Returns the number of items in a collection as a `bigint`.

 **Arguments**

 A Collection(T), where T is one of the following types:

- `Boolean`
- `Double`
- `DateTime`
- `DateTimeOffset`
- `Time`
- `String`
- `Binary`
- `Guid` (not returned in SQL Server 2000)

**Return Value**

An `Int64`.

**Example**

[DP EntityServices Concepts#SQLSERVER_COUNTBIG (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_countbig)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## MAX(expression)

Returns the maximum value the collection.

**Arguments**

A Collection(T), where T is one of the following types:

- `Boolean`
- `Double`
- `DateTime`
- `DateTimeOffset`
- `Time`
- `String`
- `Binary`

**Return Value**

The type of `expression`.

**Example**

[DP EntityServices Concepts#SQLSERVER_MAX (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_max)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## MIN(expression)

Returns the minimum value in a collection.

**Arguments**

A Collection(T), where T is one of the following types:

- `Boolean`
- `Double`
- `DateTime`
- `DateTimeOffset`
- `Time`
- `String`
- `Binary`

**Return Value**

The type of `expression`.

**Example**

[DP EntityServices Concepts#SQLSERVER_MIN (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_min)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## STDEV(expression)

Returns the statistical standard deviation of all values in the specified expression.

**Arguments**

A Collection(`Double`).

**Return Value**

A `Double`.

**Example**

[DP EntityServices Concepts#SQLSERVER_STDEV (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_stdev)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## STDEVP(expression)

Returns the statistical standard deviation for the population for all values in the specified expression.

**Arguments**

A Collection(`Double`).

**Return Value**

A `Double`.

**Example**

[DP EntityServices Concepts#SQLSERVER_STDEVP (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_stdevp)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## SUM(expression)

Returns the sum of all the values in the collection.

**Arguments**

A Collection(T) where T is one of the following types: `Int32`, `Int64`, `Double`, `Decimal`.

**Return Value**

The type of `expression`.

**Example**

[DP EntityServices Concepts#SQLSERVER_SUM (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_sum)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## VAR(expression)

Returns the statistical variance of all values in the specified expression.

**Arguments**

A Collection(`Double`).

**Return Value**

A `Double`.

**Example**

[DP EntityServices Concepts#SQLSERVER_VAR (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_var)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## VARP(expression)

Returns the statistical variance for the population for all values in the specified expression.

**Arguments**

A Collection(`Double`).

**Return Value**

A `Double`.

**Example**

[DP EntityServices Concepts#SQLSERVER_VARP (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#sqlserver_varp)](<../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)
  
## See also

- [Aggregate Functions (Transact-SQL)](https://learn.microsoft.com/sql/t-sql/functions/aggregate-functions-transact-sql)
- [Entity SQL Language](language-reference/entity-sql-language.md)
- [Aggregate Canonical Functions](language-reference/aggregate-canonical-functions.md)
