---
description: "Learn more about: Math Canonical Functions"
title: "Math Canonical Functions"
ms.topic: reference
ms.date: "03/30/2017"
ms.assetid: 6f6cddc6-b561-4ebe-84b6-841ef5b4113b
---
# Math Canonical Functions

Entity SQL includes the following math canonical functions:
  
## Abs(value)

Returns the absolute value of `value`.

**Arguments**

An `Int16`, `Int32`, `Int64`, `Byte`, `Single`, `Double`, and `Decimal`.

**Return Value**

The type of `value`.

**Example**

`Abs(-2)`

## Ceiling(value)

Returns the smallest integer that is not less than `value`.

**Arguments**

A `Single`, `Double`, and `Decimal`.

**Return Value**

The type of `value`.

**Example**

[DP EntityServices Concepts#EDM_CEILING (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/entitysql.cs#edm_ceiling)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/entitysql.cs.md>)
[DP EntityServices Concepts#EDM_CEILING (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#edm_ceiling)](<../../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## Floor(value)

Returns the largest integer that is not greater than `value`.

**Arguments**

A `Single`, `Double`, and `Decimal`.

**Return Value**

The type of `value`.

**Example**

[DP EntityServices Concepts#EDM_FLOOR (complete source file; reference: \~/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/entitysql.cs#edm_floor)](<../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/dp entityservices concepts/cs/entitysql.cs.md>)
[DP EntityServices Concepts#EDM_FLOOR (complete source file; reference: \~/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql#edm_floor)](<../../../../../../_code/samples/snippets/tsql/VS_Snippets_Data/dp entityservices concepts/tsql/entitysql.sql.md>)

## Power(value, exponent)

Returns the result of the specified `value` to the specified `exponent`.

**Arguments**

| Parameter | Type |
| --- | --- |
| `value` | `Int32`, `Int64`, `Double`, or `Decimal`. |
| `exponent` | `Int64`, `Double`, or `Decimal`. |

**Return Value**

The type of `value`.

**Example**

`Power(748.58,2)`

## Round(value)

Returns the integer portion of `value`, rounded to the nearest integer.

**Arguments**

A `Single`, `Double`, and `Decimal`.

**Return Value**

The type of `value`.

**Example**

`Round(748.58)`

## Round(value, digits)

Returns the `value`, rounded to the nearest specified `digits`.

**Arguments**

| Parameter | Type |
| --- | --- |
| `value` | `Double` or `Decimal`. |
| `digits` | `Int16` or `Int32`. |

**Return Value**

The type of `value`.

**Example**

`Round(748.58,1)`

## Truncate(value, digits)

Returns the `value`, truncated to the nearest specified `digits`.

**Arguments**

| Parameter | Type |
| --- | --- |
| `value` | `Double` or `Decimal`. |
| `digits` | `Int16` or `Int32`. |

**Return Value**

The type of `value`.

**Example**

`Truncate(748.58,1)`  
  
 These functions will return `null` if given `null` input.  
  
 Equivalent functionality is available in the Microsoft SQL Client Managed Provider. For more information, see [SqlClient for Entity Framework Functions](../sqlclient-for-ef-functions.md).  
  
## See also

- [Canonical Functions](canonical-functions.md)
