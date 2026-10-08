---
description: "Learn more about: System.Object Methods"
title: "System.Object Methods"
ms.date: "03/30/2017"
ms.assetid: 5397fca0-689e-443e-802f-e1cbdc866427
---
# System.Object Methods

LINQ to SQL
 supports the following [System.Object](https://learn.microsoft.com/search/?terms=System.Object) methods:

- [System.Object.Equals%28System.Object%29](https://learn.microsoft.com/search/?terms=System.Object.Equals%2528System.Object%2529)
- [System.Object.Equals%28System.Object%2CSystem.Object%29](https://learn.microsoft.com/search/?terms=System.Object.Equals%2528System.Object%252CSystem.Object%2529)
- [System.Object.ToString](https://learn.microsoft.com/search/?terms=System.Object.ToString)

 LINQ to SQL
 does not support the following [System.Object](https://learn.microsoft.com/search/?terms=System.Object) methods:

- [System.Object.GetHashCode](https://learn.microsoft.com/search/?terms=System.Object.GetHashCode)
- [System.Object.ReferenceEquals%28System.Object%2CSystem.Object%29](https://learn.microsoft.com/search/?terms=System.Object.ReferenceEquals%2528System.Object%252CSystem.Object%2529)
- [System.Object.MemberwiseClone](https://learn.microsoft.com/search/?terms=System.Object.MemberwiseClone)
- [System.Object.GetType](https://learn.microsoft.com/search/?terms=System.Object.GetType)
- [System.Object.ToString](https://learn.microsoft.com/search/?terms=System.Object.ToString) for binary types such as `BINARY`, `VARBINARY`, `IMAGE`, and `TIMESTAMP`.

## Differences from .NET

 The output of [System.Object.ToString](https://learn.microsoft.com/search/?terms=System.Object.ToString) for double uses SQL `CONVERT`(NVARCHAR(30), @x, 2) on SQL. SQL always uses 16 digits and scientific notation in this case (for example, "0.000000000000000e+000" for 0). As a result, [System.Object.ToString](https://learn.microsoft.com/search/?terms=System.Object.ToString) conversion does not produce the same string as [System.Convert.ToString*](https://learn.microsoft.com/search/?terms=System.Convert.ToString*) in the .NET Framework.

## See also

- [Data Types and Functions](data-types-and-functions.md)
