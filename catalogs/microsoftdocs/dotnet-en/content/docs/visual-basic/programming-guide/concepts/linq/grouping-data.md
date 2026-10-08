---
description: "Learn more about: Grouping Data (Visual Basic)"
title: "Grouping Data"
ms.date: 07/20/2015
ms.assetid: 8f3a0871-6958-4aef-8f6f-493e189fd57d
---
# Grouping Data (Visual Basic)

Grouping refers to the operation of putting data into groups so that the elements in each group share a common attribute.

 The following illustration shows the results of grouping a sequence of characters. The key for each group is the character.

 Diagram that shows a LINQ Grouping operation.

 The standard query operator methods that group data elements are listed in the following section.

## Methods

| Method Name | Description | Visual Basic Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| GroupBy | Groups elements that share a common attribute. Each group is represented by an [System.Linq.IGrouping`2](https://learn.microsoft.com/search/?terms=System.Linq.IGrouping%602) object. | `Group … By … Into …` | [System.Linq.Enumerable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.GroupBy*)<br /><br /> [System.Linq.Queryable.GroupBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.GroupBy*) |
| ToLookup | Inserts elements into a [System.Linq.Lookup`2](https://learn.microsoft.com/search/?terms=System.Linq.Lookup%602) (a one-to-many dictionary) based on a key selector function. | Not applicable. | [System.Linq.Enumerable.ToLookup*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.ToLookup*) |

## Query Expression Syntax Example

 The following code example uses the `Group By` clause to group integers in a list according to whether they are even or odd.

```vb
Dim numbers As New System.Collections.Generic.List(Of Integer)(
     New Integer() {35, 44, 200, 84, 3987, 4, 199, 329, 446, 208})

Dim query = From number In numbers
            Group By Remainder = (number Mod 2) Into Group

Dim sb As New System.Text.StringBuilder()
For Each group In query
    sb.AppendLine(If(group.Remainder = 0, vbCrLf & "Even numbers:", vbCrLf & "Odd numbers:"))
    For Each num In group.Group
        sb.AppendLine(num)
    Next
Next

' Display the results.
MsgBox(sb.ToString())

' This code produces the following output:

' Odd numbers:
' 35
' 3987
' 199
' 329

' Even numbers:
' 44
' 200
' 84
' 4
' 446
' 208
```

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Group By Clause](../../../language-reference/queries/group-by-clause.md)
- [How to: Group Files by Extension (LINQ) (Visual Basic)](how-to-group-files-by-extension-linq.md)
- [How to: Split a File Into Many Files by Using Groups (LINQ) (Visual Basic)](how-to-split-a-file-into-many-files-by-using-groups-linq.md)
