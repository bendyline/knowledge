---
description: "Learn more about: How to: Use Arrays of Blocking Collections in a Pipeline"
title: "How to: Use Arrays of Blocking Collections in a Pipeline"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
helpviewer_keywords:
  - "thread-safe collections, blocking collections in pipeline"
ms.assetid: a39c7ec3-3ad7-4f4d-8fe4-b3e9dbabe2ed
---
# How to: Use Arrays of Blocking Collections in a Pipeline

The following example shows how to use arrays of [System.Collections.Concurrent.BlockingCollection`1](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601) objects with static methods such as [System.Collections.Concurrent.BlockingCollection`1.TryAddToAny*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryAddToAny*) and [System.Collections.Concurrent.BlockingCollection`1.TryTakeFromAny*](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent.BlockingCollection%601.TryTakeFromAny*) to implement fast and flexible data transfer between components.

## Example

 The following example demonstrates a basic pipeline implementation in which each object is concurrently taking data from the input collection, transforming it, and passing it to the output collection.

 [CDS_BlockingCollection#07 (complete source file; reference: ../../../../samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/example07.cs#07)](../../../../_code/samples/snippets/csharp/VS_Snippets_Misc/cds_blockingcollection/cs/example07.cs.md)
 [CDS_BlockingCollection#07 (complete source file; reference: ../../../../samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/bcpipeline.vb#07)](../../../../_code/samples/snippets/visualbasic/VS_Snippets_Misc/cds_blockingcollection/vb/bcpipeline.vb.md)

## See also

- [System.Collections.Concurrent](https://learn.microsoft.com/search/?terms=System.Collections.Concurrent)
- [Thread-Safe Collections](index.md)
