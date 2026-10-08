---
description: "Learn more about: How to: Retrieve Information As Read-Only"
title: "How to: Retrieve Information As Read-Only"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: fb09e298-0b53-47e5-97fb-ab318bcd4fad
---
# How to: Retrieve Information As Read-Only

When you do not intend to change the data, you can increase the performance of queries by seeking read-only results.

 You implement read-only processing by setting [System.Data.Linq.DataContext.ObjectTrackingEnabled*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ObjectTrackingEnabled*) to `false`.

> **Note:**
> When [System.Data.Linq.DataContext.ObjectTrackingEnabled*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.ObjectTrackingEnabled*) is set to `false`, [System.Data.Linq.DataContext.DeferredLoadingEnabled*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.DeferredLoadingEnabled*) is implicitly set to `false`.

## Example

 The following code retrieves a read-only collection of employee hire dates.

 [DLinqQuerying#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQuerying/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQuerying/cs/Program.cs.md)
 [DLinqQuerying#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQuerying/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQuerying/vb/Module1.vb.md)

## See also

- [Query Concepts](query-concepts.md)
- [Querying the Database](querying-the-database.md)
- [Deferred versus Immediate Loading](deferred-versus-immediate-loading.md)
