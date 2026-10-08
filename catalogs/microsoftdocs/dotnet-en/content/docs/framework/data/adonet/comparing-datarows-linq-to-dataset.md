---
description: "Learn more about: Comparing DataRows (LINQ to DataSet)"
title: "Comparing DataRows (LINQ to DataSet)"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 8fe0eadf-297b-487c-8d4b-7816753c2883
---
# Comparing DataRows (LINQ to DataSet)

Language-Integrated Query (LINQ) defines various set operators to compare source elements to see if they are equal. LINQ provides the following set operators:

- [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*)

- [System.Linq.Enumerable.Union*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Union*)

- [System.Linq.Enumerable.Intersect*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Intersect*)

- [System.Linq.Enumerable.Except*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Except*)

 These operators compare source elements by calling the [System.Collections.Generic.IEqualityComparer`1.GetHashCode*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEqualityComparer%601.GetHashCode*) and [System.Collections.Generic.IEqualityComparer`1.Equals*](https://learn.microsoft.com/search/?terms=System.Collections.Generic.IEqualityComparer%601.Equals*) methods on each collection of elements. In the case of a [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow), these operators perform a reference comparison, which is generally not the ideal behavior for set operations over tabular data. For set operations, you usually want to determine whether the element values are equal and not the element references. Therefore, the [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer) class has been added to LINQ to DataSet. This class can be used to compare row values.

 The [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer) class contains a value comparison implementation for [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow), so this class can be used for set operations such as [System.Linq.Enumerable.Distinct*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Distinct*). This class cannot be directly instantiated; instead, the [System.Data.DataRowComparer.Default](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer.Default) property must be used to return an instance of the [System.Data.DataRowComparer`1](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer%601). The [System.Data.DataRowComparer`1.Equals*](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer%601.Equals*) method is then called and the two [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects to be compared are passed in as input parameters. The [System.Data.DataRowComparer`1.Equals*](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer%601.Equals*) method returns `true` if the ordered set of column values in both [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects are equal; otherwise, `false`.

## Example

 This example uses `Intersect` to return contacts that appear in both tables.

 [DP LINQ to DataSet Examples#Intersect2 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs#intersect2)](<../../../../_code/samples/snippets/csharp/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/CS/Program.cs.md>)
 [DP LINQ to DataSet Examples#Intersect2 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#intersect2)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

### Example

 The following example compares two rows and gets their hash codes.

 [DP LINQ to DataSet Examples#CompareDifferentRows (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb#comparedifferentrows)](<../../../../_code/samples/snippets/visualbasic/VS_Snippets_ADO.NET/DP LINQ to DataSet Examples/VB/Module1.vb.md>)

## See also

- [System.Data.DataRowComparer](https://learn.microsoft.com/search/?terms=System.Data.DataRowComparer)
- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
