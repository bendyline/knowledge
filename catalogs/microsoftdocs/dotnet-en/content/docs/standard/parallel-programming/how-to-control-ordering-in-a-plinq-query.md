---
description: "Learn more about: How to: Control Ordering in a PLINQ Query"
title: "How to: Control Ordering in a PLINQ Query"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "PLINQ queries, how to control ordering"
ms.assetid: c67eccc7-004d-4b2f-987e-919cbbd62ef7
---
# How to: Control Ordering in a PLINQ Query

These examples show how to control the ordering in a PLINQ query by using the [System.Linq.ParallelEnumerable.AsOrdered*](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable.AsOrdered*) extension method.

> **Warning:**
> These examples are primarily intended to demonstrate usage, and may or may not run faster than the equivalent sequential LINQ to Objects queries.

## Example 1

 The following example preserves the ordering of the source sequence. This is sometimes necessary; for example some query operators require an ordered source sequence to produce correct results.

 [PLINQ#12 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#12)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
 [PLINQ#12 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#12)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

## Example 2

 The following example shows some query operators whose source sequence is probably expected to be ordered. These operators will work on unordered sequences, but they might produce unexpected results.

 [PLINQ#14 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#14)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
 [PLINQ#14 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#14)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

 To run this method, paste it into the PLINQDataSample class in the [PLINQ Data Sample](plinq-data-sample.md) project and press F5.

## Example 3

 The following example shows how to preserve ordering for the first part of a query, then remove the ordering to increase the performance of a join clause, and then reapply ordering to the final result sequence.

 [PLINQ#15 (complete source file; reference: ../../../samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs#15)](../../../_code/samples/snippets/csharp/VS_Snippets_Misc/plinq/cs/plinqsamples.cs.md)
 [PLINQ#15 (complete source file; reference: ../../../samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb#15)](../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/plinq/vb/plinqsnippets1.vb.md)

 To run this method, paste it into the PLINQDataSample class in the [PLINQ Data Sample](plinq-data-sample.md) project and press F5.

## See also

- [System.Linq.ParallelEnumerable](https://learn.microsoft.com/search/?terms=System.Linq.ParallelEnumerable)
- [Parallel LINQ (PLINQ)](introduction-to-plinq.md)
