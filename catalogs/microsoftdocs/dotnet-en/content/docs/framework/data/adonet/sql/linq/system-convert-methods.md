---
description: "Learn more about: System.Convert Methods"
title: "System.Convert Methods"
ms.date: "03/30/2017"
ms.assetid: 3ca6c5b6-ea5d-4ab0-b675-f082135b342c
---
# System.Convert Methods

LINQ to SQL
 does not support the following [System.Convert](https://learn.microsoft.com/search/?terms=System.Convert) methods.

- Versions with an [System.IFormatProvider](https://learn.microsoft.com/search/?terms=System.IFormatProvider) parameter.

- Methods that involve char arrays or byte arrays:

  - [System.Convert.FromBase64CharArray*](https://learn.microsoft.com/search/?terms=System.Convert.FromBase64CharArray*)

  - [System.Convert.ToBase64CharArray*](https://learn.microsoft.com/search/?terms=System.Convert.ToBase64CharArray*)

  - [System.Convert.FromBase64String*](https://learn.microsoft.com/search/?terms=System.Convert.FromBase64String*)

  - [System.Convert.ToBase64String*](https://learn.microsoft.com/search/?terms=System.Convert.ToBase64String*)

- The following methods:

  - `public static <Type2> To<Type2>(<Type1> value);` where

    `Type1` and `Type2` are each one of `sbyte`, `uint`, `ulong`, or `ushort`.

  - C#:

    `int To<int type>(string value, int fromBase),`

    `ToString(... value, int toBase)`

  - Visual Basic:

    `Function To(Of [Numeric])(value as String, fromBase As Integer)`

    `As [Numeric], ToString( value As …, toBase As Integer)`

  - [System.Convert.IsDBNull*](https://learn.microsoft.com/search/?terms=System.Convert.IsDBNull*)

  - [System.Convert.GetTypeCode*](https://learn.microsoft.com/search/?terms=System.Convert.GetTypeCode*)

  - [System.Convert.ChangeType*](https://learn.microsoft.com/search/?terms=System.Convert.ChangeType*)

## See also

- [Data Types and Functions](data-types-and-functions.md)
