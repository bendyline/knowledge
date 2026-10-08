---
title: Thread-Safe collections
description: Get started with thread-safe collections using the System.Collections.Concurrent namespace in .NET, which includes thread-safe and scalable collection classes.
ms.date: 10/21/2025
ms.custom: devdivchpfy22
helpviewer_keywords:
  - "thread-safe collections, overview"
ai-usage: ai-assisted
---
# Thread-safe collections

The [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace includes several collection classes that are both thread-safe and scalable. Multiple threads can safely and efficiently add or remove items from these collections, without requiring additional synchronization in user code. When you write new code, use the concurrent collection classes to write multiple threads to the collection concurrently. If you're only reading from a shared collection, use the classes in the [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) namespace.

## System.Collections and System.Collections.Generic

 The collection classes in the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) namespace include [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) and [System.Collections.Hashtable](https://learn.microsoft.com/search/?terms=System.Collections.Hashtable). These classes provide some thread safety through the `Synchronized` property, which returns a thread-safe wrapper around the collection. The wrapper works by locking the entire collection on every add or remove operation. Therefore, each thread that's attempting to access the collection must wait for its turn to take the one lock. This process isn't scalable and can cause significant performance degradation for large collections. Also, the design isn't protected from race conditions. For more information, see [Synchronization in Generic Collections](https://learn.microsoft.com/archive/blogs/bclteam/synchronization-in-generic-collections-brian-grunkemeyer).

 The collection classes in the [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) namespace include [System.Collections.Generic.List`1](https://learn.microsoft.com/search/?terms=System.Collections.Generic.List%601) and [System.Collections.Generic.Dictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Generic.Dictionary%602). These classes provide improved type safety and performance compared to the [System.Collections](https://learn.microsoft.com/search/?terms=System.Collections) classes. However, the [System.Collections.Generic](https://learn.microsoft.com/search/?terms=System.Collections.Generic) classes don't provide any thread synchronization; user code must provide all synchronization when items are added or removed on multiple threads concurrently.

 We recommend using the concurrent collections classes in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace because they provide type safety and also more efficient and complete thread safety.

## Fine-grained locking and lock-free mechanisms

 Some of the concurrent collection types use lightweight synchronization mechanisms such as [System.Threading.SpinLock](https://learn.microsoft.com/search/?terms=System.Threading.SpinLock), [System.Threading.SpinWait](https://learn.microsoft.com/search/?terms=System.Threading.SpinWait), [System.Threading.SemaphoreSlim](https://learn.microsoft.com/search/?terms=System.Threading.SemaphoreSlim), and [System.Threading.CountdownEvent](https://learn.microsoft.com/search/?terms=System.Threading.CountdownEvent). These synchronization types typically use *busy spinning* for brief periods before they put the thread into a true `Wait` state. When wait times are expected to be short, spinning is far less computationally expensive than waiting, which involves an expensive kernel transition. For collection classes that use spinning, this efficiency means that multiple threads can add and remove items at a high rate. For more information about spinning versus blocking, see [SpinLock](../../threading/spinlock.md) and [SpinWait](../../threading/spinwait.md).

 The [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) and [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601) classes don't use locks at all. Instead, they rely on [System.Threading.Interlocked](https://learn.microsoft.com/search/?terms=System.Threading.Interlocked) operations to achieve thread safety.

> **Note:**
> Because the concurrent collections classes support [System.Collections.ICollection](https://learn.microsoft.com/search/?terms=System.Collections.ICollection), they provide implementations for the [System.Collections.ICollection.IsSynchronized](https://learn.microsoft.com/search/?terms=System.Collections.ICollection.IsSynchronized) and [System.Collections.ICollection.SyncRoot](https://learn.microsoft.com/search/?terms=System.Collections.ICollection.SyncRoot) properties, even though these properties are irrelevant. `IsSynchronized` always returns `false` and, `SyncRoot` is always `null` (`Nothing` in Visual Basic).

The following table lists the collection types in the [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent) namespace:

| Type | Description |
| --- | --- |
| [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) | Provides bounding and blocking functionality for any type that implements [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601). For more information, see [BlockingCollection Overview](blockingcollection-overview.md). |
| [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) | Thread-safe implementation of a dictionary of key-value pairs. |
| [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) | Thread-safe implementation of a FIFO (first-in, first-out) queue. |
| [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601) | Thread-safe implementation of a LIFO (last-in, first-out) stack. |
| [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) | Thread-safe implementation of an unordered collection of elements. |
| [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601) | The interface that a type must implement to be used in a `BlockingCollection`. |

## Related articles

| Title | Description |
| --- | --- |
| [BlockingCollection Overview](blockingcollection-overview.md) | Describes the functionality provided by the [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) type. |
| [How to: Add and Remove Items from a ConcurrentDictionary](how-to-add-and-remove-items.md) | Describes how to add and remove elements from a [System.Collections.Concurrent.ConcurrentDictionary`2](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentDictionary%602) |
| [How to: Add and Take Items Individually from a BlockingCollection](how-to-add-and-take-items.md) | Describes how to add and retrieve items from a blocking collection without using the read-only enumerator. |
| [How to: Add Bounding and Blocking Functionality to a Collection](how-to-add-bounding-and-blocking.md) | Describes how to use any collection class as the underlying storage mechanism for an [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601) collection. |
| [How to: Use ForEach to Remove Items in a BlockingCollection](how-to-use-foreach-to-remove.md) | Describes how to use `foreach` (`For Each` in Visual Basic) to remove all items in a blocking collection. |
| [How to: Use Arrays of Blocking Collections in a Pipeline](how-to-use-arrays-of-blockingcollections.md) | Describes how to use multiple blocking collections at the same time to implement a pipeline. |
| [How to: Create an Object Pool by Using a ConcurrentBag](how-to-create-an-object-pool.md) | Shows how to use a concurrent bag to improve performance in scenarios where you can reuse objects instead of continually creating new ones. |

## Reference

- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
