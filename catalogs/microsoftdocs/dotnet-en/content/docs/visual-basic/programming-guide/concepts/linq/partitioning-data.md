---
description: "Learn more about: Partitioning Data (Visual Basic)"
title: Partitioning data
ms.date: 12/20/2021
ms.assetid: 69c59379-b66e-422c-b324-5b5c07760ef7
---
# Partitioning Data (Visual Basic)

Partitioning in LINQ refers to the operation of dividing an input sequence into two sections, without rearranging the elements, and then returning one of the sections.

 The following illustration shows the results of three different partitioning operations on a sequence of characters. The first operation returns the first three elements in the sequence. The second operation skips the first three elements and returns the remaining elements. The third operation skips the first two elements in the sequence and returns the next three elements.

 Illustration that shows three LINQ partitioning operations.

 The standard query operator methods that partition sequences are listed in the following section.

## Operators

| Operator Name | Description | Visual Basic Query Expression Syntax | More Information |
| --- | --- | --- | --- |
| Skip | Skips elements up to a specified position in a sequence. | `Skip` | [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*)<br /><br /> [System.Linq.Queryable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Skip*) |
| SkipWhile | Skips elements based on a predicate function until an element does not satisfy the condition. | `Skip While` | [System.Linq.Enumerable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.SkipWhile*)<br /><br /> [System.Linq.Queryable.SkipWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SkipWhile*) |
| Take | Takes elements up to a specified position in a sequence. | `Take` | [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*)<br /><br /> [System.Linq.Queryable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Take*) |
| TakeWhile | Takes elements based on a predicate function until an element does not satisfy the condition. | `Take While` | [System.Linq.Enumerable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.TakeWhile*)<br /><br /> [System.Linq.Queryable.TakeWhile*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.TakeWhile*) |
| Chunk | Splits the elements of a sequence into chunks of a specified maximum size. |  | [System.Linq.Enumerable.Chunk*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Chunk*)<br />[System.Linq.Queryable.Chunk*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Chunk*) |

## Query Expression Syntax Examples

### Skip

 The following code example uses the `Skip` clause in Visual Basic to skip over the first four strings in an array of strings before returning the remaining strings in the array.

 [CsLINQPartitioning#1 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb#1)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb.md)

### SkipWhile

 The following code example uses the `Skip While` clause in Visual Basic to skip over the strings in an array while the first letter of the string is "a". The remaining strings in the array are returned.

 [CsLINQPartitioning#2 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb#2)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb.md)

### Take

 The following code example uses the `Take` clause in Visual Basic to return the first two strings in an array of strings.

 [CsLINQPartitioning#3 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb#3)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb.md)

### TakeWhile

 The following code example uses the `Take While` clause in Visual Basic to return strings from an array while the length of the string is five or less.

 [CsLINQPartitioning#4 (complete source file; reference: \~/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb#4)](../../../../../_code/samples/snippets/visualbasic/VS_Snippets_VBCSharp/CsLINQPartitioning/VB/Partitioning.vb.md)

## See also

- [System.Linq](https://learn.microsoft.com/search/?terms=System.Linq)
- [Standard Query Operators Overview (Visual Basic)](standard-query-operators-overview.md)
- [Skip Clause](../../../language-reference/queries/skip-clause.md)
- [Skip While Clause](../../../language-reference/queries/skip-while-clause.md)
- [Take Clause](../../../language-reference/queries/take-clause.md)
- [Take While Clause](../../../language-reference/queries/take-while-clause.md)
