---
description: "Learn more about: Sequence Operators"
title: "Sequence Operators"
ms.date: "03/30/2017"
ms.assetid: 4d332d32-3806-4451-b7af-25af269194ae
---
# Sequence Operators

Generally speaking, LINQ to SQL
 does not support sequence operators that have one or more of the following qualities:

- Take a lambda with an index parameter.

- Rely on the properties of sequential rows, such as [System.Linq.Queryable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.TakeWhile*).

- Rely on an arbitrary CLR implementation, such as [System.Collections.Generic.IComparer`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IComparer%601).

| Examples of Unsupported |
| --- |
| [System.Linq.Enumerable.Where``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Int32%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Where%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Int32%252CSystem.Boolean%257D%2529) |
| [System.Linq.Enumerable.Select``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Int32%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Int32%252C%60%601%257D%2529) |
| [System.Linq.Enumerable.Select``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Select%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%2529) |
| [System.Linq.Enumerable.TakeWhile``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Boolean%257D%2529) |
| [System.Linq.Enumerable.TakeWhile``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Int32%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Int32%252CSystem.Boolean%257D%2529) |
| [System.Linq.Enumerable.SkipWhile``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Boolean%257D%2529) |
| [System.Linq.Enumerable.SkipWhile``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2CSystem.Int32%2CSystem.Boolean%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252CSystem.Int32%252CSystem.Boolean%257D%2529) |
| [System.Linq.Enumerable.GroupBy``3%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%2CSystem.Func%7B``0%2C``2%7D%2CSystem.Collections.Generic.IEqualityComparer%7B``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy%60%603%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%252CSystem.Func%257B%60%600%252C%60%602%257D%252CSystem.Collections.Generic.IEqualityComparer%257B%60%601%257D%2529) |
| [System.Linq.Enumerable.GroupBy``4%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``1%7D%2CSystem.Func%7B``0%2C``2%7D%2CSystem.Func%7B``1%2CSystem.Collections.Generic.IEnumerable%7B``2%7D%2C``3%7D%2CSystem.Collections.Generic.IEqualityComparer%7B``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy%60%604%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%601%257D%252CSystem.Func%257B%60%600%252C%60%602%257D%252CSystem.Func%257B%60%601%252CSystem.Collections.Generic.IEnumerable%257B%60%602%257D%252C%60%603%257D%252CSystem.Collections.Generic.IEqualityComparer%257B%60%601%257D%2529) |
| [System.Linq.Enumerable.Reverse``1%28System.Collections.Generic.IEnumerable%7B``0%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Reverse%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%2529) |
| [System.Linq.Enumerable.DefaultIfEmpty``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2C``0%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.DefaultIfEmpty%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252C%60%600%2529) |
| [System.Linq.Enumerable.ElementAt``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAt%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Int32%2529) |
| [System.Linq.Enumerable.ElementAtOrDefault``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ElementAtOrDefault%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Int32%2529) |
| [System.Linq.Enumerable.Range%28System.Int32%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Range%2528System.Int32%252CSystem.Int32%2529) |
| [System.Linq.Enumerable.Repeat``1%28``0%2CSystem.Int32%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Repeat%60%601%2528%60%600%252CSystem.Int32%2529) |
| [System.Linq.Enumerable.Empty``1](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Empty%60%601) |
| [System.Linq.Enumerable.Contains``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2C``0%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Contains%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252C%60%600%2529) |
| [System.Linq.Enumerable.Aggregate``1%28System.Collections.Generic.IEnumerable%7B``0%7D%2CSystem.Func%7B``0%2C``0%2C``0%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate%60%601%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252CSystem.Func%257B%60%600%252C%60%600%252C%60%600%257D%2529) |
| [System.Linq.Enumerable.Aggregate``2%28System.Collections.Generic.IEnumerable%7B``0%7D%2C``1%2CSystem.Func%7B``1%2C``0%2C``1%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate%60%602%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252C%60%601%252CSystem.Func%257B%60%601%252C%60%600%252C%60%601%257D%2529) |
| [System.Linq.Enumerable.Aggregate``3%28System.Collections.Generic.IEnumerable%7B``0%7D%2C``1%2CSystem.Func%7B``1%2C``0%2C``1%7D%2CSystem.Func%7B``1%2C``2%7D%29](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate%60%603%2528System.Collections.Generic.IEnumerable%257B%60%600%257D%252C%60%601%252CSystem.Func%257B%60%601%252C%60%600%252C%60%601%257D%252CSystem.Func%257B%60%601%252C%60%602%257D%2529) |
| [System.Linq.Enumerable.SequenceEqual*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SequenceEqual*) |

## Differences from .NET

 All supported sequence operators work as expected in the common language runtime (CLR) except for `Average`. `Average` returns a value of the same type as the type being averaged, whereas in the CLR `Average` always returns either a [System.Double](https://learn.microsoft.com/search/?terms=System.Double) or a [System.Decimal](https://learn.microsoft.com/search/?terms=System.Decimal). If the source argument is explicitly cast to double / decimal or the selector casts to double / decimal, the resulting SQL will also have such a conversion and the result will be as expected.

## See also

- [Data Types and Functions](data-types-and-functions.md)
