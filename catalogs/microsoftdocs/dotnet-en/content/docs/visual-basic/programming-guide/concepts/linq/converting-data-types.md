---
description: "Learn more about: Converting Data Types (Visual Basic)"
title: "Converting Data Types"
ms.date: 07/20/2015
ms.assetid: 9b0cf1ab-de48-4c6e-9f00-05b40fade46e
---
# Converting Data Types (Visual Basic)

Conversion methods change the type of input objects.

 Conversion operations in LINQ queries are useful in a variety of applications. The following are some examples:

- The [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) method can be used to hide a type's custom implementation of a standard query operator.

- The [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*) method can be used to enable non-parameterized collections for LINQ querying.

- The [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*), [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*), [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*), and [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) methods can be used to force immediate query execution instead of deferring it until the query is enumerated.

## Methods

The following table lists the standard query operator methods that perform data-type conversions.

The conversion methods in this table whose names start with "As" change the static type of the source collection but do not enumerate it. The methods whose names start with "To" enumerate the source collection and put the items into the corresponding collection type.

| Method Name | Description | Visual Basic Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| AsEnumerable | Returns the input typed as [System.Collections.Generic.IEnumerable`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEnumerable%601). | Not applicable. | [System.Linq.Enumerable.AsEnumerable*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.AsEnumerable*) |
| AsQueryable | Converts a (generic) [System.Collections.IEnumerable](https://learn.microsoft.com/search/?terms=System.Collections.IEnumerable) to a (generic) [System.Linq.IQueryable](https://learn.microsoft.com/search/?terms=System.Linq.IQueryable). | Not applicable. | [System.Linq.Queryable.AsQueryable*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.AsQueryable*) |
| Cast | Casts the elements of a collection to a specified type. | `From … As …` | [System.Linq.Enumerable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Cast*)<br /><br /> [System.Linq.Queryable.Cast*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Cast*) |
| OfType | Filters values, depending on their ability to be cast to a specified type. | Not applicable. | [System.Linq.Enumerable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.OfType*)<br /><br /> [System.Linq.Queryable.OfType*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.OfType*) |
| ToArray | Converts a collection to an array. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToArray*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToArray*) |
| ToDictionary | Puts elements into a [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602) based on a key selector function. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToDictionary*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToDictionary*) |
| ToList | Converts a collection to a [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601). This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToList*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToList*) |
| ToLookup | Puts elements into a [System.Linq.Lookup`2](https://learn.microsoft.com/search/?terms=System.Linq.Lookup%602) (a one-to-many dictionary) based on a key selector function. This method forces query execution. | Not applicable. | [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) |

## Query Expression Syntax Example

The following code example uses the `From As` clause to cast a type to a subtype before accessing a member that is available only on the subtype.

```vb
Class Plant
    Public Property Name As String
End Class

Class CarnivorousPlant
    Inherits Plant
    Public Property TrapType As String
End Class

Sub Cast()

    Dim plants() As Plant = {
        New CarnivorousPlant With {.Name = "Venus Fly Trap", .TrapType = "Snap Trap"},
        New CarnivorousPlant With {.Name = "Pitcher Plant", .TrapType = "Pitfall Trap"},
        New CarnivorousPlant With {.Name = "Sundew", .TrapType = "Flypaper Trap"},
        New CarnivorousPlant With {.Name = "Waterwheel Plant", .TrapType = "Snap Trap"}}

    Dim query = From plant As CarnivorousPlant In plants
                Where plant.TrapType = "Snap Trap"
                Select plant

    Dim sb As New System.Text.StringBuilder()
    For Each plant In query
        sb.AppendLine(plant.Name)
    Next

    ' Display the results.
    MsgBox(sb.ToString())

    ' This code produces the following output:

    ' Venus Fly Trap
    ' Waterwheel Plant

End Sub
```

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [From Clause](../../../language-reference/queries/from-clause.md)
- [How to: Query an ArrayList with LINQ (Visual Basic)](how-to-query-an-arraylist-with-linq.md)
