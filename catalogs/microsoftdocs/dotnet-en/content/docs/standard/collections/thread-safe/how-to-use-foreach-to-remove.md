---
description: "Learn more about: Use foreach to remove items in a BlockingCollection"
title: "Use foreach to remove items in a BlockingCollection"
ms.date: 05/04/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "thread-safe collections, how to enumerate blocking collection"
ms.assetid: 2096103c-22f7-420d-b631-f102bc33a6dd
---

# Use foreach to remove items in a BlockingCollection

In addition to taking items from a [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) by using the [System.Collections.Concurrent.BlockingCollection`1.Take*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.Take*) and [System.Collections.Concurrent.BlockingCollection`1.TryTake*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryTake*) method, you can also use a [foreach](../../../csharp/language-reference/statements/iteration-statements.md#the-foreach-statement) ([For Each](../../../visual-basic/language-reference/statements/for-each-next-statement.md) in Visual Basic) with the [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) to remove items until adding is completed and the collection is empty. This is called a *mutating enumeration* or *consuming enumeration* because, unlike a typical `foreach` (`For Each`) loop, this enumerator modifies the source collection by removing items.

## Example

The following example shows how to remove all the items in a [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) by using a `foreach` (`For Each`) loop.

[CDS_BlockingCollection#03 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/example03.cs#03)](../../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/example03.cs.md)
[CDS_BlockingCollection#03 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/enumeratebc.vb#03)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/enumeratebc.vb.md)

This example uses a `foreach` loop with the [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) method in the consuming thread, which causes each item to be removed from the collection as it is enumerated. [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) limits the maximum number of items that are in the collection at any time. Enumerating the collection in this way blocks the consumer thread if no items are available or if the collection is empty. In this example blocking is not a concern because the producer thread adds items faster than they can be consumed.

The [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) returns an `IEnumerable<T>`, thus order cannot be guaranteed. However, internally a [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) is used as the underlying collection type - which will dequeue objects following first-in-first-out (FIFO) ordering. If concurrent calls to [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) are made, they will compete. One item consumed (dequeued) in one enumeration cannot be observed in the other.

To enumerate the collection without modifying it, just use `foreach` (`For Each`) without the [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) method. However, it is important to understand that this kind of enumeration represents a snapshot of the collection at a precise point in time. If other threads are adding or removing items concurrently while you are executing the loop, then the loop might not represent the actual state of the collection.

## See also

- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
- [Parallel Programming](../../parallel-programming/index.md)
