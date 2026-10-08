---
description: "Learn more about: Create an object pool by using a ConcurrentBag"
title: "Create an object pool by using a ConcurrentBag"
ms.date: 05/01/2020
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "object pool, in .NET Framework"
ms.assetid: 0480e7ff-b6f9-480e-a889-2ed4264d8372
---

# Create an object pool by using a ConcurrentBag

This example shows how to use a [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) to implement an object pool. Object pools can improve application performance in situations where you require multiple instances of a class and the class is expensive to create or destroy. When a client program requests a new object, the object pool first attempts to provide one that has already been created and returned to the pool. If none is available, only then is a new object created.

The [System.Collections.Concurrent.ConcurrentBag`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentBag%601) is used to store the objects because it supports fast insertion and removal, especially when the same thread is both adding and removing items. This example could be further augmented to be built around a [System.Collections.Concurrent.IProducerConsumerCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.IProducerConsumerCollection%601), which the bag data structure implements, as do [System.Collections.Concurrent.ConcurrentQueue`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentQueue%601) and [System.Collections.Concurrent.ConcurrentStack`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.ConcurrentStack%601).

> **Tip:**
> This article defines how to write your own implementation of an object pool with an underlying concurrent type to store objects for reuse. However, the [Microsoft.Extensions.ObjectPool.ObjectPool`1](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool.ObjectPool%601) type already exists under the [Microsoft.Extensions.ObjectPool](https://learn.microsoft.com/search/?terms=Microsoft.Extensions.ObjectPool) namespace. Consider using the available type before creating your own implementation, which includes many additional features.

## Example

[CDS#04 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Misc/cds/cs/objectpool.cs#04)](../../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds/cs/objectpool.cs.md)
[CDS#04 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds/vb/objectpool04.vb#04)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds/vb/objectpool04.vb.md)

## See also

- [Thread-Safe Collections](index.md)
