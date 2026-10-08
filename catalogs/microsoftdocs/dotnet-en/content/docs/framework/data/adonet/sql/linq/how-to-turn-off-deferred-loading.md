---
description: "Learn more about: How to: Turn Off Deferred Loading"
title: "How to: Turn Off Deferred Loading"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 1b84b852-3cad-41a7-8077-149a70d50c8b
---
# How to: Turn Off Deferred Loading

You can turn off deferred loading by setting [System.Data.Linq.DataContext.DeferredLoadingEnabled*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.DeferredLoadingEnabled*) to `false`. For more information, see [Deferred versus Immediate Loading](deferred-versus-immediate-loading.md).

> **Note:**
> Deferred loading is turned off by implication when object tracking is turned off. For more information, see [How to: Retrieve Information As Read-Only](how-to-retrieve-information-as-read-only.md).

## Example

 The following example shows how to turn off deferred loading by setting [System.Data.Linq.DataContext.DeferredLoadingEnabled*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.DeferredLoadingEnabled*) to `false`.

 [DLinqQuerying#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqQuerying/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqQuerying/cs/Program.cs.md)
 [DLinqQuerying#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqQuerying/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqQuerying/vb/Module1.vb.md)

## See also

- [Query Concepts](query-concepts.md)
- [Querying the Database](querying-the-database.md)
