---
title: "BlockingCollection Overview"
description: Read about BlockingCollection<T>, a thread-safe collection class in .NET. This class offers features like concurrent adding & taking of items from many threads.
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "BlockingCollection, overview"
ms.assetid: 987ea3d7-0ad5-4238-8b64-331ce4eb3f0b
---
# BlockingCollection Overview

[System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) is a thread-safe collection class that provides the following features:

- An implementation of the Producer-Consumer pattern.

- Concurrent adding and taking of items from multiple threads.

- Optional maximum capacity.

- Insertion and removal operations that block when collection is empty or full.

- Insertion and removal "try" operations that do not block or that block up to a specified period of time.

- Encapsulates any collection type that implements [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601)

- Cancellation with cancellation tokens.

- Two kinds of enumeration with `foreach` (`For Each` in Visual Basic):

    1. Read-only enumeration.

    2. Enumeration that removes items as they are enumerated.

## Bounding and Blocking Support

 [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) supports bounding and blocking. Bounding means you can set the maximum capacity of the collection. Bounding is important in certain scenarios because it enables you to control the maximum size of the collection in memory, and it prevents the producing threads from moving too far ahead of the consuming threads.

 Multiple threads or tasks can add items to the collection concurrently, and if the collection reaches its specified maximum capacity, the producing threads will block until an item is removed. Multiple consumers can remove items concurrently, and if the collection becomes empty, the consuming threads will block until a producer adds an item. A producing thread can call [System.Collections.Concurrent.BlockingCollection`1.CompleteAdding*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.CompleteAdding*) to indicate that no more items will be added. Consumers monitor the [System.Collections.Concurrent.BlockingCollection`1.IsCompleted](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.IsCompleted) property to know when the collection is empty and no more items will be added. The following example shows a simple BlockingCollection with a bounded capacity of 100. A producer task adds items to the collection as long as some external condition is true, and then calls [System.Collections.Concurrent.BlockingCollection`1.CompleteAdding*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.CompleteAdding*). The consumer task takes items until the [System.Collections.Concurrent.BlockingCollection`1.IsCompleted](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.IsCompleted) property is true.

 [CDS_BlockingCollection#04 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/blockingcollection.cs#04)](../../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/blockingcollection.cs.md)
 [CDS_BlockingCollection#04 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/introsnippetsbc.vb#04)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/introsnippetsbc.vb.md)

 For a complete example, see [How to: Add and Take Items Individually from a BlockingCollection](how-to-add-and-take-items.md).

## Timed Blocking Operations

 In timed blocking [System.Collections.Concurrent.BlockingCollection`1.TryAdd*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryAdd*) and [System.Collections.Concurrent.BlockingCollection`1.TryTake*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryTake*) operations on bounded collections, the method tries to add or take an item. If an item is available it is placed into the variable that was passed in by reference, and the method returns true. If no item is retrieved after a specified time-out period the method returns false. The thread is then free to do some other useful work before trying again to access the collection. For an example of timed blocking access, see the second example in [How to: Add and Take Items Individually from a BlockingCollection](how-to-add-and-take-items.md).

## Cancelling Add and Take Operations

 Add and Take operations are typically performed in a loop. You can cancel a loop by passing in a [System.Threading.CancellationToken](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken) to the [System.Collections.Concurrent.BlockingCollection`1.TryAdd*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryAdd*) or [System.Collections.Concurrent.BlockingCollection`1.TryTake*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryTake*) method, and then checking the value of the token's [System.Threading.CancellationToken.IsCancellationRequested](https://learn.microsoft.com/search/?terms=System.Threading.CancellationToken.IsCancellationRequested) property on each iteration. If the value is true, then it is up to you to respond to the cancellation request by cleaning up any resources and exiting the loop. The following example shows an overload of [System.Collections.Concurrent.BlockingCollection`1.TryAdd*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryAdd*) that takes a cancellation token, and the code that uses it:

 [CDS_BlockingCollection#05 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/blockingcollection.cs#05)](../../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/blockingcollection.cs.md)
 [CDS_BlockingCollection#05 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/introsnippetsbc.vb#05)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/introsnippetsbc.vb.md)

 For an example of how to add cancellation support, see the second example in [How to: Add and Take Items Individually from a BlockingCollection](how-to-add-and-take-items.md).

## Specifying the Collection Type

 When you create a [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601), you can specify not only the bounded capacity but also the type of collection to use. For example, you could specify a [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) for first in-first out (FIFO) behavior, or a [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601) for last in-first out (LIFO) behavior. You can use any collection class that implements the [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601) interface. The default collection type for [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) is [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601). The following code example shows how to create a [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) of strings that has a capacity of 1000 and uses a [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601):

```vb
Dim bc = New BlockingCollection(Of String)(New ConcurrentBag(Of String()), 1000)
```

```csharp
BlockingCollection<string> bc = new BlockingCollection<string>(new ConcurrentBag<string>(), 1000 );
```

 For more information, see [How to: Add Bounding and Blocking Functionality to a Collection](how-to-add-bounding-and-blocking.md).

## IEnumerable Support

 [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) provides a [System.Collections.Concurrent.BlockingCollection`1.GetConsumingEnumerable*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.GetConsumingEnumerable*) method that enables consumers to use `foreach` (`For Each` in Visual Basic) to remove items until the collection is completed, which means it is empty and no more items will be added. For more information, see [How to: Use ForEach to Remove Items in a BlockingCollection](how-to-use-foreach-to-remove.md).

## Using Many BlockingCollections As One

 For scenarios in which a consumer needs to take items from multiple collections simultaneously, you can create arrays of [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) and use the static methods such as [System.Collections.Concurrent.BlockingCollection`1.TakeFromAny*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TakeFromAny*) and [System.Collections.Concurrent.BlockingCollection`1.AddToAny*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.AddToAny*) that will add to or take from any of the collections in the array. If one collection is blocking, the method immediately tries another until it finds one that can perform the operation. For more information, see [How to: Use Arrays of Blocking Collections in a Pipeline](how-to-use-arrays-of-blockingcollections.md).

## See also

- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
- [Collections and Data Structures](../index.md)
- [Thread-Safe Collections](index.md)
