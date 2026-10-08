---
description: "Learn more about: Aggregation Operations (Visual Basic)"
title: "Aggregation Operations"
ms.date: 07/20/2015
ms.assetid: 0f47e92c-5dd2-4007-baf4-c5fe5dc3b4a8
---
# Aggregation Operations (Visual Basic)

An aggregation operation computes a single value from a collection of values. An example of an aggregation operation is calculating the average daily temperature from a month's worth of daily temperature values.

 The following illustration shows the results of two different aggregation operations on a sequence of numbers. The first operation sums the numbers. The second operation returns the maximum value in the sequence.

 Illustration that shows LINQ aggregation operations.

 The standard query operator methods that perform aggregation operations are listed in the following section.

## Methods

| Method Name | Description | Visual Basic Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| Aggregate | Performs a custom aggregation operation on the values of a collection. | Not applicable. | [System.Linq.Enumerable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Aggregate*)<br /><br /> [System.Linq.Queryable.Aggregate*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Aggregate*) |
| Average | Calculates the average value of a collection of values. | `Aggregate … In … Into Average()` | [System.Linq.Enumerable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Average*)<br /><br /> [System.Linq.Queryable.Average*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Average*) |
| Count | Counts the elements in a collection, optionally only those elements that satisfy a predicate function. | `Aggregate … In … Into Count()` | [System.Linq.Enumerable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Count*)<br /><br /> [System.Linq.Queryable.Count*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Count*) |
| LongCount | Counts the elements in a large collection, optionally only those elements that satisfy a predicate function. | `Aggregate … In … Into LongCount()` | [System.Linq.Enumerable.LongCount*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.LongCount*)<br /><br /> [System.Linq.Queryable.LongCount*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.LongCount*) |
| Max or MaxBy | Determines the maximum value in a collection. | `Aggregate … In … Into Max()` | [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*)<br />[System.Linq.Enumerable.MaxBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.MaxBy*)<br />[System.Linq.Queryable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Max*)<br />[System.Linq.Queryable.MaxBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MaxBy*) |
| Min or MinBy | Determines the minimum value in a collection. | `Aggregate … In … Into Min()` | [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*)<br />[System.Linq.Enumerable.MinBy*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.MinBy*)<br />[System.Linq.Queryable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Min*)<br />[System.Linq.Queryable.MinBy*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.MinBy*) |
| Sum | Calculates the sum of the values in a collection. | `Aggregate … In … Into Sum()` | [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*)<br /><br /> [System.Linq.Queryable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Sum*) |

## Query Expression Syntax Examples

### Average

 The following code example uses the `Aggregate Into Average` clause in Visual Basic to calculate the average temperature in an array of numbers that represent temperatures.

 [CsLINQAggregating#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

### Count

 The following code example uses the `Aggregate Into Count` clause in Visual Basic to count the number of values in an array that are greater than or equal to 80.

 [CsLINQAggregating#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

### LongCount

 The following code example uses the `Aggregate Into LongCount` clause to count the number of values in an array.

 [CsLINQAggregating#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

### Max

 The following code example uses the `Aggregate Into Max` clause  to calculate the maximum temperature in an array of numbers that represent temperatures.

 [CsLINQAggregating#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#4)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

### Min

 The following code example uses the `Aggregate Into Min` clause  to calculate the minimum temperature in an array of numbers that represent temperatures.

 [CsLINQAggregating#5 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#5)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

### Sum

 The following code example uses the `Aggregate Into Sum` clause  to calculate the total expense amount from an array of values that represent expenses.

 [CsLINQAggregating#6 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb#6)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQAggregating/VB/Aggregating.vb.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Aggregate Clause](../../../language-reference/queries/aggregate-clause.md)
- [How to: Compute Column Values in a CSV Text File (LINQ) (Visual Basic)](how-to-compute-column-values-in-a-csv-text-file-linq.md)
- [How to: Count, Sum, or Average Data](../../language-features/linq/how-to-count-sum-or-average-data-by-using-linq.md)
- [How to: Find the Minimum or Maximum Value in a Query Result](../../language-features/linq/how-to-find-the-minimum-or-maximum-value-in-a-query-result.md)
- [How to: Query for the Largest File or Files in a Directory Tree (LINQ) (Visual Basic)](how-to-query-for-the-largest-file-or-files-in-a-directory-tree.md)
- [How to: Query for the Total Number of Bytes in a Set of Folders (LINQ) (Visual Basic)](how-to-query-for-the-total-number-of-bytes-in-a-set-of-folders.md)
