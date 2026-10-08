---
description: "Learn more about: System.String Methods"
title: "System.String Methods"
ms.date: "03/30/2017"
ms.assetid: ce307f14-87e6-4816-8694-8a4147f6b784
---
# System.String Methods

LINQ to SQL
 does not support the following [System.String](https://learn.microsoft.com/search/?terms=System.String) methods.

## Unsupported System.String Methods in General

 Unsupported [System.String](https://learn.microsoft.com/search/?terms=System.String) methods in general:

- Culture-aware overloads (methods that take a `CultureInfo` / `StringComparison` / `IFormatProvider`).

- Methods that take or produce a `char` array.

## Unsupported System.String Static Methods

| Unsupported System.String Static Methods |
| --- |
| [System.String.Copy%28System.String%29](https://learn.microsoft.com/search/?terms=System.String.Copy%2528System.String%2529) |
| [System.String.Compare%28System.String%2CSystem.String%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.String%252CSystem.Boolean%2529) |
| [System.String.Compare%28System.String%2CSystem.String%2CSystem.Boolean%2CSystem.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.String%252CSystem.Boolean%252CSystem.Globalization.CultureInfo%2529) |
| [System.String.Compare%28System.String%2CSystem.Int32%2CSystem.String%2CSystem.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.Int32%252CSystem.String%252CSystem.Int32%252CSystem.Int32%2529) |
| [System.String.Compare%28System.String%2CSystem.Int32%2CSystem.String%2CSystem.Int32%2CSystem.Int32%2CSystem.Boolean%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.Int32%252CSystem.String%252CSystem.Int32%252CSystem.Int32%252CSystem.Boolean%2529) |
| [System.String.Compare%28System.String%2CSystem.Int32%2CSystem.String%2CSystem.Int32%2CSystem.Int32%2CSystem.Boolean%2CSystem.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.Compare%2528System.String%252CSystem.Int32%252CSystem.String%252CSystem.Int32%252CSystem.Int32%252CSystem.Boolean%252CSystem.Globalization.CultureInfo%2529) |
| [System.String.CompareOrdinal%28System.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal%2528System.String%252CSystem.String%2529) |
| [System.String.CompareOrdinal%28System.String%2CSystem.Int32%2CSystem.String%2CSystem.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.String.CompareOrdinal%2528System.String%252CSystem.Int32%252CSystem.String%252CSystem.Int32%252CSystem.Int32%2529) |
| [System.String.Format*](https://learn.microsoft.com/search/?terms=System.String.Format*) |
| [System.String.Join*](https://learn.microsoft.com/search/?terms=System.String.Join*) |

## Unsupported System.String Non-static Methods

| Unsupported System.String Non-static Methods |
| --- |
| [System.String.IndexOfAny%28System.Char%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.IndexOfAny%2528System.Char%255B%255D%2529) |
| [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) |
| [System.String.ToCharArray](https://learn.microsoft.com/search/?terms=System.String.ToCharArray) |
| [System.String.ToUpper%28System.Globalization.CultureInfo%29](https://learn.microsoft.com/search/?terms=System.String.ToUpper%2528System.Globalization.CultureInfo%2529) |
| [System.String.TrimEnd%28System.Char%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.TrimEnd%2528System.Char%255B%255D%2529) |
| [System.String.TrimStart%28System.Char%5B%5D%29](https://learn.microsoft.com/search/?terms=System.String.TrimStart%2528System.Char%255B%255D%2529) |

## Differences from .NET

- Queries do not account for SQL Server collations that might be in effect on the server, and therefore will provide culture-sensitive, case-insensitive comparisons by default. This behavior differs from the default, case-sensitive semantics of the .NET Framework.

- When `LastIndexOf` returns 0, either the string is `NULL` or the found position is 0.

- Unexpected results might be returned from concatenation or other operations on fixed-length strings (`CHAR`, `NCHAR`), because these types automatically have padding applied in the database.

- Because many methods, such as `Replace`, `ToLower`, `ToUpper`, and the character indexer, have no valid translation for `TEXT` or `NTEXT` columns and XML, `SqlExceptions` occur if translated normally. This behavior is considered acceptable for these types. However, all string operations must match common language runtime (CLR) semantics for `VARCHAR`, `NVARCHAR`, `VARCHAR(max)`, and `NVARCHAR(max)`.

## See also

- [Data Types and Functions](data-types-and-functions.md)
